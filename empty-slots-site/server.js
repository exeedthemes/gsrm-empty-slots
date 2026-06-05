const http = require("http");
const path = require("path");
const fs = require("fs/promises");
const { chromium } = require("playwright");

const PORT = Number(process.env.PORT || 4173);
const BASE_URL = "https://gsrm.avbis.online";
const PUBLIC_DIR = path.join(__dirname, "public");
const FLIGHT_CONCURRENCY = Number(process.env.FLIGHT_CONCURRENCY || 1);
const REQUEST_RETRIES = Number(process.env.REQUEST_RETRIES || 4);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/extract") {
      const payload = await readJson(req);
      const result = await extractEmptySlots(payload);
      sendJson(res, 200, result);
      return;
    }

    if (req.method === "POST" && req.url === "/api/airlines") {
      const payload = await readJson(req);
      const result = await extractAirlines(payload);
      sendJson(res, 200, result);
      return;
    }

    if (req.method !== "GET") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    const urlPath = new URL(req.url, `http://localhost:${PORT}`).pathname;
    const filePath = path.join(PUBLIC_DIR, urlPath === "/" ? "index.html" : urlPath);
    if (!filePath.startsWith(PUBLIC_DIR)) {
      sendJson(res, 403, { error: "Forbidden" });
      return;
    }

    const body = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
    res.end(body);
  } catch (error) {
    const status = error.code === "ENOENT" ? 404 : 500;
    sendJson(res, status, { error: error.message || String(error) });
  }
});

server.listen(PORT, () => {
  console.log(`Empty Slots app running at http://localhost:${PORT}`);
});

async function extractEmptySlots(payload) {
  const config = normalizePayload(payload);
  const dates = selectedDates(config);

  if (!dates.length) {
    return { rows: [], errors: [], scannedFlights: 0, scannedDates: [], airlines: [] };
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await login(page, config.email, config.password);

    const rows = [];
    const errors = [];
    const airlines = new Set();
    let scannedFlights = 0;

    for (const date of dates) {
      const avbisDate = formatAvbisDate(date);
      const result = await extractDateViaHttp(context, avbisDate, date, config);

      scannedFlights += result.scannedFlights;
      rows.push(...result.rows);
      errors.push(...result.errors);
      for (const airline of result.airlines) airlines.add(airline);
    }

    rows.sort((a, b) => {
      const byStart = a.start_utc.localeCompare(b.start_utc);
      return byStart || a.flight.localeCompare(b.flight);
    });

    return {
      rows,
      errors,
      scannedFlights,
      scannedDates: dates.map(formatIsoDate),
      airlines: [...airlines].sort(),
    };
  } finally {
    await browser.close();
  }
}

async function extractAirlines(payload) {
  const config = normalizePayload({ ...payload, airlines: "" });
  const dates = selectedDates(config);

  if (!dates.length) {
    return { airlines: [], scannedDates: [], scannedFlights: 0 };
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await login(page, config.email, config.password);

    const airlines = new Set();
    let scannedFlights = 0;

    for (const date of dates) {
      const avbisDate = formatAvbisDate(date);
      const flights = await fetchFlightLinks(context, avbisDate);
      scannedFlights += flights.length;
      for (const flight of flights) {
        const code = airlineCodeFromFlight(flight);
        if (code) airlines.add(code);
      }
    }

    return {
      airlines: [...airlines].sort(),
      scannedDates: dates.map(formatIsoDate),
      scannedFlights,
    };
  } finally {
    await browser.close();
  }
}

async function extractDateViaHttp(context, avbisDate, date, config) {
  const html = await fetchFlightCommsHtml(context, avbisDate);
  const csrf = extractCsrf(html);
  const visibleFlights = await fetchFlightLinks(context, avbisDate);
  const airlines = [...new Set(visibleFlights.map(airlineCodeFromFlight).filter(Boolean))];
  const flights = visibleFlights.filter((flight) => airlineMatches(flight, config.airlines));
  const periodStart = dateWithTime(date, config.startTime);
  const periodEnd = dateWithTime(date, config.endTime);

  const results = await mapLimit(flights, FLIGHT_CONCURRENCY, (flight) =>
    extractFlightSodRows(context, flight, avbisDate, csrf, periodStart, periodEnd)
  );
  const rows = results.flatMap((result) => result.rows);
  const errors = results.flatMap((result) => result.errors);

  return { rows, errors, scannedFlights: flights.length, airlines };
}

async function extractFlightSodRows(context, flight, avbisDate, csrf, periodStart, periodEnd) {
  const meta = parseFlightText(flight.text);

  try {
    const airportResponse = await requestGetWithRetry(context, `${BASE_URL}/api/flight-watch/get-handling-airport?flight_id=${flight.id}`, {
      headers: { Accept: "application/json", "X-CSRF-TOKEN": csrf },
      timeout: 15000,
    });
    const airport = await airportResponse.json().catch(() => null);
    if (!airportResponse.ok() || !airport?.status || !airport?.airport_id) {
      throw new Error(`handling airport HTTP ${airportResponse.status()}`);
    }

    const params = new URLSearchParams({
      flight_id: flight.id,
      airport_id: String(airport.airport_id),
      date: avbisDate,
    });
    const sodResponse = await requestGetWithRetry(context, `${BASE_URL}/flight-comm/get_sod_form?${params.toString()}`, {
      headers: { Accept: "text/html", "X-CSRF-TOKEN": csrf },
      timeout: 15000,
    });
    const sodHtml = await sodResponse.text();
    if (!sodResponse.ok()) throw new Error(`SOD HTTP ${sodResponse.status()}`);

    const rows = parseSodGroups(sodHtml, avbisDate)
      .filter((group) => group.missing > 0 && overlaps(group.startDate, group.releaseDate, periodStart, periodEnd))
      .map((group) => ({
        date: avbisDate,
        flight_id: flight.id,
        flight: meta.flight,
        route: meta.route,
        aircraft: meta.aircraft,
        direction: meta.direction,
        scheduled_utc: meta.scheduled,
        sla: group.sla,
        type: group.type,
        movement: group.movement,
        required: group.required,
        assigned: group.assigned,
        missing: group.missing,
        start_utc: group.start,
        release_utc: group.release,
        duration: group.duration,
      }));

    return { rows, errors: [] };
  } catch (error) {
    return {
      rows: [],
      errors: [{
        date: avbisDate,
        flight_id: flight.id,
        flight: meta.flight,
        route: meta.route,
        direction: meta.direction,
        error: error.message || String(error),
      }],
    };
  }
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workerCount = Math.min(limit, items.length);

  await Promise.all(Array.from({ length: workerCount }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }));

  return results;
}

async function fetchFlightLinks(context, avbisDate) {
  const data = await fetchFlightCommsData(context, avbisDate).catch(() => null);
  const flights = extractFlightLinksFromData(data);
  if (flights.length) return flights;
  return extractFlightLinks(await fetchFlightCommsHtml(context, avbisDate));
}

async function fetchFlightCommsData(context, avbisDate) {
  const response = await requestGetWithRetry(context, `${BASE_URL}/flight-comms-data-new?date=${encodeURIComponent(avbisDate)}`, {
    headers: { Accept: "application/json" },
    timeout: 30000,
  });

  if (!response.ok()) {
    throw new Error(`Flight Comms data ${avbisDate} returned HTTP ${response.status()}`);
  }

  return response.json();
}

function extractFlightLinksFromData(data) {
  const allFlights = Array.isArray(data?.all_flights) ? data.all_flights : [];
  return allFlights
    .map((flight) => ({
      id: String(flight.flight_id || ""),
      text: extractTimelineFlightText(flight.timeline_item || ""),
    }))
    .filter((flight) => /^\d+$/.test(flight.id) && flight.text);
}

function extractTimelineFlightText(html) {
  const flight = classText(html, "flightNum");
  if (!flight) return "";

  const route = classText(html, "sectorAirport").replace(/^\|\s*/, "");
  const aircraft = classText(html, "aircraftReg").replace(/^\|\s*/, "");
  const movement = ((html.match(/<div\b[^>]*class=["'][^"']*\bbadge\b[^"']*["'][^>]*>\s*(STA|STD)\s*<\/div>/i) || [])[1] || "").toUpperCase();
  const scheduled = classText(html, "time-span-position");

  return [flight, route, aircraft, [movement, scheduled].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(" | ");
}

function classText(html, className) {
  const re = new RegExp(`<[^>]+class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`, "i");
  return cleanText(stripTags((String(html).match(re) || [])[1] || ""));
}

async function fetchFlightCommsHtml(context, avbisDate) {
  const pageResponse = await requestGetWithRetry(context, `${BASE_URL}/flight-comms?date=${encodeURIComponent(avbisDate)}`, {
    headers: { Accept: "text/html" },
    timeout: 30000,
  });

  if (!pageResponse.ok()) {
    throw new Error(`Flight Comms ${avbisDate} returned HTTP ${pageResponse.status()}`);
  }

  return pageResponse.text();
}

async function requestGetWithRetry(context, url, options) {
  let lastResponse = null;

  for (let attempt = 0; attempt <= REQUEST_RETRIES; attempt += 1) {
    if (attempt > 0) await sleep(2000 * attempt);
    lastResponse = await context.request.get(url, options);
    if (lastResponse.status() !== 429) return lastResponse;
  }

  return lastResponse;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function login(page, email, password) {
  await page.goto(`${BASE_URL}/login`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(1000);
  if (!page.url().includes("/login")) return;

  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill(password);

  const button = page.getByRole("button", { name: "Sign In" });
  if ((await button.count()) === 0) {
    throw new Error("Sign In button was not available on the login page.");
  }
  await button.click();
  await page.waitForURL((url) => !url.toString().includes("/login"), {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  }).catch(() => null);
  await page.waitForTimeout(2000);

  if (page.url().includes("/login")) {
    throw new Error("Login did not complete. Check the credentials.");
  }
}

function normalizePayload(payload) {
  const startDate = parseIsoDate(payload.startDate);
  const endDate = parseIsoDate(payload.endDate);
  if (!startDate || !endDate || endDate < startDate) throw new Error("Invalid date range.");
  if (!payload.email || !payload.password) throw new Error("Email and password are required.");

  const startTime = parseTime(payload.startTime || "00:00");
  const endTime = parseTime(payload.endTime || "23:59");
  if (!startTime || !endTime) throw new Error("Invalid time window.");

  const days = Array.isArray(payload.days) ? payload.days.map(Number) : [];
  const publicHolidays = parseHolidayDates(payload.publicHolidays);
  const includePublicHolidays = Boolean(payload.includePublicHolidays);

  if (includePublicHolidays) {
    for (let year = startDate.getUTCFullYear(); year <= endDate.getUTCFullYear(); year += 1) {
      for (const holiday of germanBavarianHolidayDates(year)) publicHolidays.add(holiday);
    }
  }

  const airlines = normalizeAirlines(payload.airlines);

  return {
    email: String(payload.email),
    password: String(payload.password),
    startDate,
    endDate,
    startTime,
    endTime,
    days,
    includePublicHolidays,
    publicHolidays,
    airlines,
  };
}

function parseHolidayDates(value) {
  return new Set(
    String(value || "")
      .split(/[\s,;]+/)
      .map((date) => date.trim())
      .filter(Boolean)
  );
}

function germanBavarianHolidayDates(year) {
  const easter = easterSunday(year);
  return [
    dateIso(year, 1, 1),
    dateIso(year, 1, 6),
    addDaysIso(easter, -2),
    addDaysIso(easter, 1),
    dateIso(year, 5, 1),
    addDaysIso(easter, 39),
    addDaysIso(easter, 50),
    addDaysIso(easter, 60),
    dateIso(year, 8, 15),
    dateIso(year, 10, 3),
    dateIso(year, 11, 1),
    dateIso(year, 12, 25),
    dateIso(year, 12, 26),
  ];
}

function easterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

function addDaysIso(date, days) {
  const copy = new Date(date);
  copy.setUTCDate(copy.getUTCDate() + days);
  return formatIsoDate(copy);
}

function dateIso(year, month, day) {
  return formatIsoDate(new Date(Date.UTC(year, month - 1, day)));
}

function selectedDates(config) {
  const dates = [];
  const cursor = new Date(config.startDate);

  while (cursor <= config.endDate) {
    const iso = formatIsoDate(cursor);
    const weekdayMatch = config.days.includes(cursor.getUTCDay());
    const holidayMatch = config.includePublicHolidays && config.publicHolidays.has(iso);
    if (weekdayMatch || holidayMatch) dates.push(new Date(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return dates;
}

function parseIsoDate(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function parseTime(value) {
  const match = String(value || "").match(/^(\d{2}):(\d{2})$/);
  if (!match) return null;
  return { hour: Number(match[1]), minute: Number(match[2]) };
}

function dateWithTime(date, time) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), time.hour, time.minute));
}

function formatIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function formatAvbisDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${day}-${months[date.getUTCMonth()]}-${date.getUTCFullYear()}`;
}

function airlineMatches(flight, airlines) {
  if (!airlines.length) return true;
  return airlines.includes(airlineCodeFromFlight(flight));
}

function normalizeAirlines(value) {
  const text = String(value || "").trim();
  if (!text || /^all(?:\s+airlines?)?$/i.test(text)) return [];
  return text
    .split(/[\s,;]+/)
    .map((code) => code.trim().toUpperCase())
    .filter(Boolean);
}

function airlineCodeFromFlight(flight) {
  return parseFlightText(flight.text).flight.split(/\s+/)[0]?.toUpperCase() || "";
}

function extractCsrf(html) {
  return (html.match(/<meta[^>]+name=["']csrf-token["'][^>]+content=["']([^"']+)["']/i) || [])[1] || "";
}

function extractFlightLinks(html) {
  const byId = new Map();
  const anchorRe = /<a\b[^>]*>[\s\S]*?<\/a>/gi;
  let match;

  while ((match = anchorRe.exec(html))) {
    const anchor = match[0];
    const attrs = parseAttributes(anchor);
    if (!/^\d+$/.test(attrs.id || "")) continue;
    if (!String(attrs.class || "").split(/\s+/).includes("flightContainer")) continue;
    if (!byId.has(attrs.id)) byId.set(attrs.id, cleanText(stripTags(anchor)));
  }

  return [...byId.entries()].map(([id, text]) => ({ id, text }));
}

function parseSodGroups(html, flightDate) {
  const rows = extractTableRows(html);
  const groups = [];
  let current = null;

  for (const cells of rows) {
    if (cells[0] === "SLA") continue;
    const requiredCell = cells.find((cell) => /Required\s*:/i.test(cell));

    if (requiredCell) {
      if (current) groups.push(finishGroup(current));
      current = {
        sla: cells[0] || "",
        type: cells[1] || "",
        movement: (requiredCell.split(/Required\s*:/i)[0] || "").trim(),
        required: Number((requiredCell.match(/Required\s*:\s*(\d+)/i) || [])[1] || 0),
        start: stripSla(cells[3] || ""),
        release: stripSla(cells[4] || ""),
        duration: cells[5] || "",
        staff: [],
        flightDate,
      };
    } else if (current) {
      const staffCell = cells[2] || "";
      if (/^[A-Z]{3}\s+-\s+/.test(staffCell)) current.staff.push(staffCell);
    }
  }

  if (current) groups.push(finishGroup(current));
  return groups;
}

function finishGroup(group) {
  const assigned = group.staff.length;
  return {
    ...group,
    assigned,
    missing: Math.max(0, group.required - assigned),
    startDate: parseSodUtc(group.start, group.flightDate),
    releaseDate: parseSodUtc(group.release, group.flightDate),
  };
}

function extractTableRows(html) {
  const table = (html.match(/<table\b[\s\S]*?<\/table>/i) || [])[0] || "";
  const rows = [];
  const trRe = /<tr\b[\s\S]*?<\/tr>/gi;
  let trMatch;

  while ((trMatch = trRe.exec(table))) {
    const cells = [];
    const cellRe = /<(?:td|th)\b[\s\S]*?<\/(?:td|th)>/gi;
    let cellMatch;
    while ((cellMatch = cellRe.exec(trMatch[0]))) {
      cells.push(cleanText(stripTags(cellMatch[0])));
    }
    if (cells.length) rows.push(cells);
  }

  return rows;
}

function parseAttributes(tag) {
  const attrs = {};
  const attrRe = /([A-Za-z_:][-A-Za-z0-9_:.]*)\s*=\s*(["'])(.*?)\2/g;
  let match;
  while ((match = attrRe.exec(tag))) attrs[match[1]] = decodeHtml(match[3]);
  return attrs;
}

function parseFlightText(text) {
  const parts = text.split("|").map((part) => part.trim()).filter(Boolean);
  const flight = (parts[0] || "").replace(/^[^A-Z0-9]*/, "").trim();
  const route = parts[1] || "";
  const aircraft = parts[2] || "";
  const rest = parts.slice(3).join(" | ");
  const scheduledMatch = rest.match(/\b(STA|STD)\s*(\d{2}\s+\d{2}:\d{2})/);
  const direction = scheduledMatch?.[1] === "STA" ? "Arrival" : scheduledMatch?.[1] === "STD" ? "Departure" : "";

  return {
    flight,
    route,
    aircraft,
    direction,
    scheduled: scheduledMatch ? `${scheduledMatch[1]} ${scheduledMatch[2]}` : "",
  };
}

function parseSodUtc(value, flightDate) {
  const year = Number(flightDate.slice(-4));
  const match = String(value).trim().match(/^(\d{2})\s+([A-Za-z]{3})\s+(\d{2}):(\d{2})$/);
  if (!match) return null;
  const [, day, mon, hour, minute] = match;
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    .findIndex((name) => name.toLowerCase() === mon.toLowerCase());
  if (month < 0) return null;
  return new Date(Date.UTC(year, month, Number(day), Number(hour), Number(minute)));
}

function overlaps(start, end, periodStart, periodEnd) {
  if (!start || !end) return false;
  return start <= periodEnd && end >= periodStart;
}

function stripSla(value) {
  return cleanText(value).replace(/\s*SLA\s*$/i, "").trim();
}

function stripTags(html) {
  return decodeHtml(String(html).replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " "));
}

function decodeHtml(value) {
  return String(value)
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/&#39;/gi, "'");
}

function cleanText(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}
