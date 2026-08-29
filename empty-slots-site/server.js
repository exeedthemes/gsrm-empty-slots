const http = require("http");
const path = require("path");
const fs = require("fs/promises");
const { chromium } = require("playwright");
const { getGermanBavarianHolidays } = require("./public/holiday-utils");
const db = require("./db");

const PORT = Number(process.env.PORT || 4173);
const BASE_URL = "https://gsrm.avbis.online";
const PUBLIC_DIR = path.join(__dirname, "public");
const FLIGHT_CONCURRENCY = positiveInteger(process.env.FLIGHT_CONCURRENCY, 3);
const FLIGHT_REQUEST_DELAY_MS = nonNegativeInteger(process.env.FLIGHT_REQUEST_DELAY_MS, 100);
const FLIGHT_REQUEST_JITTER_MS = nonNegativeInteger(process.env.FLIGHT_REQUEST_JITTER_MS, 100);
const REQUEST_RETRIES = Number(process.env.REQUEST_RETRIES || 2);
const SESSION_IDLE_MS = positiveInteger(process.env.SESSION_IDLE_MS, 15 * 60 * 1000);
const SCAN_PROGRESS_TTL_MS = positiveInteger(process.env.SCAN_PROGRESS_TTL_MS, 30 * 60 * 1000);
const DATE_SCAN_CACHE_TTL_MS = positiveInteger(process.env.DATE_SCAN_CACHE_TTL_MS, 6 * 60 * 60 * 1000);
const DATE_SCAN_CACHE_MAX_ENTRIES = positiveInteger(process.env.DATE_SCAN_CACHE_MAX_ENTRIES, 120);
const FLIGHT_SOD_CACHE_TTL_MS = positiveInteger(process.env.FLIGHT_SOD_CACHE_TTL_MS, 30 * 60 * 1000);
const FLIGHT_SOD_CACHE_MAX_ENTRIES = positiveInteger(process.env.FLIGHT_SOD_CACHE_MAX_ENTRIES, 5000);

let authSession = null;
let authSessionPromise = null;
let authSessionIdleTimer = null;
const scanProgress = new Map();
const dateScanCache = new Map();
const flightSodCache = new Map();

// In-memory cache for handling airport IDs
const airportCache = new Map();

function getCachedAirportId(flightId) {
  return airportCache.get(flightId);
}

function cacheAirportId(flightId, airportId) {
  if (airportCache.size > 2000) {
    airportCache.clear();
  }
  airportCache.set(flightId, airportId);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/connect") {
      const payload = await readJson(req);
      if (!payload.email || !payload.password) throw new Error("Email and password are required.");
      const session = await acquireAuthenticatedSession(String(payload.email), String(payload.password));
      releaseAuthSession(session);
      sendJson(res, 200, { connected: true, email: String(payload.email), idleMinutes: Math.round(SESSION_IDLE_MS / 60000) });
      return;
    }

    if (req.method === "POST" && req.url === "/api/cancel") {
      const payload = await readJson(req);
      sendJson(res, 200, requestScanCancellation(payload.scanId));
      return;
    }

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

    if (req.method === "GET" && req.url.startsWith("/api/progress")) {
      const scanId = new URL(req.url, `http://localhost:${PORT}`).searchParams.get("scanId");
      sendJson(res, 200, getScanProgress(scanId));
      return;
    }

    if (req.method === "GET" && req.url === "/api/session") {
      const connected = await verifyAuthenticatedSession(authSession);
      if (!connected && authSession) await closeAuthSession();
      sendJson(res, 200, { connected, email: connected ? authSession.email : "" });
      return;
    }

    if (req.method === "GET" && req.url === "/api/notes") {
      sendJson(res, 200, db.getAllGapNotes());
      return;
    }

    if (req.method === "POST" && req.url === "/api/notes") {
      const payload = await readJson(req);
      if (payload.gapId) {
        db.saveGapNote(payload.gapId, payload);
      } else if (payload.notes) {
        db.saveAllGapNotes(payload.notes);
      }
      sendJson(res, 200, { success: true });
      return;
    }

    if (req.method === "GET" && req.url === "/api/availability") {
      sendJson(res, 200, db.getStaffAvailability() || {});
      return;
    }

    if (req.method === "POST" && req.url === "/api/availability") {
      const payload = await readJson(req);
      db.saveStaffAvailability(payload);
      sendJson(res, 200, { success: true });
      return;
    }

    if (req.method === "GET" && req.url === "/api/history") {
      sendJson(res, 200, db.getScanHistory());
      return;
    }

    if (req.method === "POST" && req.url === "/api/history") {
      const payload = await readJson(req);
      if (Array.isArray(payload)) {
        db.saveScanHistory(payload);
      } else if (payload && payload.id) {
        db.saveScanItem(payload);
      }
      sendJson(res, 200, { success: true });
      return;
    }

    if (req.method === "DELETE" && req.url.startsWith("/api/history")) {
      const urlObj = new URL(req.url, `http://localhost:${PORT}`);
      const id = urlObj.searchParams.get("id");
      if (id) {
        db.deleteScanItem(id);
      } else {
        db.clearScanHistory();
      }
      sendJson(res, 200, { success: true });
      return;
    }

    if (req.method === "GET" && req.url === "/api/cache/stats") {
      sendJson(res, 200, db.getCacheStats());
      return;
    }

    if (req.method === "POST" && req.url === "/api/cache/clear") {
      db.clearSodCache();
      dateScanCache.clear();
      flightSodCache.clear();
      sendJson(res, 200, { success: true });
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

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Empty Slots app running at http://localhost:${PORT}`);
  });
}

async function extractEmptySlots(payload) {
  const config = normalizePayload(payload);
  const dates = selectedDates(config);
  const scanId = normalizeScanId(payload.scanId) || `scan-${Date.now().toString(36)}`;

  if (!dates.length) {
    return { rows: [], errors: [], scannedFlights: 0, scannedDates: [], airlines: [], staffDirectory: [] };
  }

  startScanProgress(scanId, dates);
  console.log(`[${scanId}] Starting scan for ${dates.length} date(s).`);
  let session = null;

  try {
    const rows = [];
    const errors = [];
    const airlines = new Set();
    const slas = new Set();
    const staffDirectory = new Set();
    let scannedFlights = 0;
    let fetchedFlights = 0;
    let cacheHits = 0;
    let freshDates = 0;
    let cancelled = false;
    const completedDates = [];
    const incompleteDates = [];

    const cachedResults = new Map();
    if (!config.forceRefresh) {
      for (const date of dates) {
        const cached = getCachedDateScan(config, date);
        if (cached) cachedResults.set(formatIsoDate(date), cached);
      }
    }
    if (cachedResults.size < dates.length) {
      session = await acquireAuthenticatedSession(config.email, config.password);
    }
    const context = session?.context;

    for (const date of dates) {
      if (isScanCancellationRequested(scanId)) {
        cancelled = true;
        break;
      }
      const avbisDate = formatAvbisDate(date);
      const isoDate = formatIsoDate(date);
      const startedAt = Date.now();
      updateScanProgress(scanId, {
        stage: "date",
        currentDate: avbisDate,
        currentDateStartedAt: startedAt,
        currentFlight: "",
        currentDirection: "",
        currentFlightIndex: 0,
        currentFlightTotal: 0,
        message: `Loading ${avbisDate}...`,
      });
      let result = cachedResults.get(isoDate);
      const cached = Boolean(result);
      if (cached) {
        cacheHits += 1;
        updateScanProgress(scanId, { message: `${avbisDate}: loaded from local cache.` });
        console.log(`[${scanId}] ${avbisDate}: using cached roster data.`);
      } else {
        console.log(`[${scanId}] Loading ${avbisDate} from AVBIS...`);
        try {
          result = await extractDateViaHttp(
            context,
            avbisDate,
            date,
            config,
            (patch) => updateScanProgress(scanId, patch),
            () => isScanCancellationRequested(scanId)
          );
        } catch (error) {
          result = failedDateResult(avbisDate, error);
        }
        if (!result) {
          cancelled = true;
          break;
        }
        freshDates += 1;
        fetchedFlights += result.scannedFlights;
        if (dateScanSucceeded(result)) setCachedDateScan(config, date, result);
      }

      scannedFlights += result.scannedFlights;
      rows.push(...result.rows);
      errors.push(...result.errors);
      for (const airline of result.airlines) airlines.add(airline);
      for (const sla of result.slas) slas.add(sla);
      for (const staff of result.staffDirectory) staffDirectory.add(staff);
      if (dateScanSucceeded(result)) completedDates.push(isoDate);
      else incompleteDates.push(isoDate);
      completeProgressDate(scanId, {
        date: avbisDate,
        scannedFlights: result.scannedFlights,
        rows: result.rows.length,
        errors: result.errors.length,
        elapsedMs: Date.now() - startedAt,
        cached,
      });
      console.log(
        `[${scanId}] ${avbisDate}: scanned ${result.scannedFlights} flight(s), found ${result.rows.length} empty slot group(s), ` +
        `${result.errors.length} error(s), ${Math.round((Date.now() - startedAt) / 1000)}s.`
      );
    }

    rows.sort((a, b) => {
      const byStart = a.start_utc.localeCompare(b.start_utc);
      return byStart || a.flight.localeCompare(b.flight);
    });

    const response = {
      rows,
      errors,
      scannedFlights,
      scannedDates: completedDates,
      incompleteDates,
      airlines: [...airlines].sort(),
      slas: [...slas].sort(),
      staffDirectory: [...staffDirectory].sort(),
      cache: {
        cachedDates: cacheHits,
        freshDates,
        fetchedFlights,
        ttlMinutes: Math.round(DATE_SCAN_CACHE_TTL_MS / 60000),
        forced: config.forceRefresh,
      },
      cancelled,
    };
    if (cancelled) cancelScanProgress(scanId, response);
    else finishScanProgress(scanId, response);
    return response;
  } catch (error) {
    failScanProgress(scanId, error);
    throw error;
  } finally {
    if (session) releaseAuthSession(session);
  }
}

function dateScanCacheKey(config, date) {
  return JSON.stringify({
    account: String(config.email || "").trim().toLowerCase(),
    date: formatIsoDate(date),
    start: `${config.startTime.hour}:${config.startTime.minute}`,
    end: `${config.endTime.hour}:${config.endTime.minute}`,
    airlines: [...config.airlines].sort(),
    slas: [...config.slas].sort(),
    allSlots: config.allSlots,
  });
}

function getCachedDateScan(config, date) {
  cleanupDateScanCache();
  const key = dateScanCacheKey(config, date);
  const cached = dateScanCache.get(key);
  if (cached?.result) return cached.result;
  const dbCached = db.getCachedSod(key);
  if (dbCached) {
    dateScanCache.set(key, { createdAt: Date.now(), result: dbCached });
    return dbCached;
  }
  return null;
}

function setCachedDateScan(config, date, result) {
  cleanupDateScanCache();
  const key = dateScanCacheKey(config, date);
  if (dateScanCache.size >= DATE_SCAN_CACHE_MAX_ENTRIES) {
    const oldestKey = dateScanCache.keys().next().value;
    if (oldestKey) dateScanCache.delete(oldestKey);
  }
  dateScanCache.set(key, { createdAt: Date.now(), result });
  db.setCachedSod(key, formatIsoDate(date), result);
}

function cleanupDateScanCache() {
  const cutoff = Date.now() - DATE_SCAN_CACHE_TTL_MS;
  for (const [key, cached] of dateScanCache) {
    if (cached.createdAt < cutoff) dateScanCache.delete(key);
  }
}

function flightSodCacheKey(account, avbisDate, flightId) {
  return JSON.stringify({
    account: String(account || "").trim().toLowerCase(),
    date: avbisDate,
    flightId: String(flightId),
  });
}

function getCachedFlightSod(account, avbisDate, flightId) {
  cleanupFlightSodCache();
  return flightSodCache.get(flightSodCacheKey(account, avbisDate, flightId))?.result || null;
}

function setCachedFlightSod(account, avbisDate, flightId, result) {
  cleanupFlightSodCache();
  if (flightSodCache.size >= FLIGHT_SOD_CACHE_MAX_ENTRIES) {
    const oldestKey = flightSodCache.keys().next().value;
    if (oldestKey) flightSodCache.delete(oldestKey);
  }
  flightSodCache.set(flightSodCacheKey(account, avbisDate, flightId), { createdAt: Date.now(), result });
}

function cleanupFlightSodCache() {
  const cutoff = Date.now() - FLIGHT_SOD_CACHE_TTL_MS;
  for (const [key, cached] of flightSodCache) {
    if (cached.createdAt < cutoff) flightSodCache.delete(key);
  }
}

async function extractAirlines(payload) {
  const config = normalizePayload({ ...payload, airlines: "" });
  const dates = selectedDates(config);
  const scanId = `airlines-${Date.now().toString(36)}`;

  if (!dates.length) {
    return { airlines: [], scannedDates: [], scannedFlights: 0 };
  }

  console.log(`[${scanId}] Loading airlines for ${dates.length} date(s).`);
  const session = await acquireAuthenticatedSession(config.email, config.password);
  const { context } = session;

  try {
    const airlines = new Set();
    let scannedFlights = 0;

    for (const date of dates) {
      const avbisDate = formatAvbisDate(date);
      const flights = await fetchFlightLinks(context, avbisDate);
      console.log(`[${scanId}] ${avbisDate}: loaded ${flights.length} visible flight(s).`);
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
    releaseAuthSession(session);
  }
}

async function acquireAuthenticatedSession(email, password) {
  const sessionKey = `${email}\0${password}`;

  while (true) {
    if (authSession?.sessionKey === sessionKey && !authSession.closing && authSession.browser?.isConnected()) {
      if (await verifyAuthenticatedSession(authSession)) {
        clearAuthSessionTimer();
        authSession.active += 1;
        return authSession;
      }
      await closeAuthSession();
    }

    if (authSessionPromise) {
      const creatingSession = authSessionPromise;
      await creatingSession.promise.catch(() => null);
      continue;
    }

    const previousSession = authSession;
    if (previousSession) {
      authSession = null;
      if (previousSession.active > 0) {
        previousSession.closeWhenIdle = true;
      } else {
        await closeSession(previousSession);
      }
    }

    const promise = createAuthenticatedSession(sessionKey, email, password);
    authSessionPromise = { sessionKey, promise };

    try {
      const session = await promise;
      if (!session.closing) {
        clearAuthSessionTimer();
        session.active += 1;
        return session;
      }
    } finally {
      if (authSessionPromise?.promise === promise) authSessionPromise = null;
    }
  }
}

async function verifyAuthenticatedSession(session) {
  if (!session || session.closing || !session.browser?.isConnected() || !session.context) return false;

  try {
    const response = await session.context.request.get(`${BASE_URL}/flight-comms`, {
      headers: { Accept: "text/html" },
      failOnStatusCode: false,
      maxRedirects: 0,
      timeout: 5000,
    });
    const location = String(response.headers()?.location || "");
    const responseUrl = String(response.url?.() || "");
    return response.ok()
      && !/\/login(?:[/?#]|$)/i.test(location)
      && !/\/login(?:[/?#]|$)/i.test(responseUrl);
  } catch {
    return false;
  }
}

async function createAuthenticatedSession(sessionKey, email, password) {
  await closeAuthSession();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await login(page, email, password);
    authSession = { browser, context, sessionKey, email: String(email), active: 0, closeWhenIdle: false, closing: false };
    return authSession;
  } catch (error) {
    await browser.close().catch(() => {});
    throw error;
  } finally {
    await page.close().catch(() => {});
  }
}

function releaseAuthSession(session) {
  session.active = Math.max(0, session.active - 1);
  if (session.active > 0) return;

  if (session.closeWhenIdle || authSession !== session) {
    closeSession(session).catch(() => {});
    return;
  }

  touchAuthSession(session);
}

function touchAuthSession(session = authSession) {
  if (!session || session.active > 0 || session.closing || authSession !== session) return;
  if (authSessionIdleTimer) clearTimeout(authSessionIdleTimer);
  authSessionIdleTimer = setTimeout(() => {
    closeAuthSession().catch(() => {});
  }, SESSION_IDLE_MS);
  authSessionIdleTimer.unref?.();
}

function clearAuthSessionTimer() {
  if (authSessionIdleTimer) clearTimeout(authSessionIdleTimer);
  authSessionIdleTimer = null;
}

async function closeAuthSession() {
  clearAuthSessionTimer();

  const session = authSession;
  authSession = null;
  if (!session) return;
  if (session.active > 0) {
    session.closeWhenIdle = true;
    return;
  }
  await closeSession(session);
}

async function closeSession(session) {
  if (session.closing) return;
  session.closing = true;
  if (authSession === session) authSession = null;
  await session.browser.close().catch(() => {});
}

async function extractDateViaHttp(context, avbisDate, date, config, onProgress = () => {}, shouldCancel = () => false) {
  const visibleFlights = await fetchFlightLinks(context, avbisDate);
  const airlines = [...new Set(visibleFlights.map(airlineCodeFromFlight).filter(Boolean))];
  const flights = visibleFlights.filter((flight) => airlineMatches(flight, config.airlines));
  const periodStart = dateWithTime(date, config.startTime);
  const periodEnd = dateWithTime(date, config.endTime);
  onProgress({
    currentFlightTotal: flights.length,
    message: `${avbisDate}: scanning ${flights.length} flight(s)...`,
  });

  const results = await mapLimit(flights, FLIGHT_CONCURRENCY, (flight, index) =>
    extractFlightSodRowsWithProgress(context, flight, avbisDate, periodStart, periodEnd, config.slas, index, flights.length, onProgress, config.allSlots, config.email, config.forceRefresh)
  , shouldCancel);
  if (shouldCancel()) return null;
  const failedIndexes = results
    .map((result, index) => result.errors.length ? index : -1)
    .filter((index) => index >= 0);

  if (failedIndexes.length > 0) {
    await mapLimit(failedIndexes, FLIGHT_CONCURRENCY, async (index) => {
      const flight = flights[index];
      const meta = parseFlightText(flight.text);
      onProgress({
        currentFlight: meta.flight,
        currentDirection: meta.direction,
        currentFlightIndex: index + 1,
        retrying: true,
        message: `${avbisDate}: retrying ${formatFlightLabel(meta)}...`,
      });
      const retryResult = await extractFlightSodRows(context, flight, avbisDate, periodStart, periodEnd, config.slas, config.allSlots, config.email, config.forceRefresh);
      if (!retryResult.errors.length) results[index] = retryResult;
    }, shouldCancel);
    if (shouldCancel()) return null;
  }

  const rows = results.flatMap((result) => result.rows);
  const errors = results.flatMap((result) => result.errors);
  const slas = [...new Set(results.flatMap((result) => result.slas))].sort();
  const staffDirectory = [...new Set(results.flatMap((result) => result.staffDirectory || []))].sort();

  return { rows, errors, scannedFlights: flights.length, airlines, slas, staffDirectory };
}

async function extractFlightSodRowsWithProgress(context, flight, avbisDate, periodStart, periodEnd, selectedSlas, index, total, onProgress, allSlots = false, account = "", forceRefresh = false) {
  const meta = parseFlightText(flight.text);
  onProgress({
    currentFlight: meta.flight,
    currentDirection: meta.direction,
    currentFlightIndex: index + 1,
    currentFlightTotal: total,
    retrying: false,
    message: `${avbisDate}: scanning ${formatFlightLabel(meta)} (${index + 1}/${total})...`,
  });
  return extractFlightSodRows(context, flight, avbisDate, periodStart, periodEnd, selectedSlas, allSlots, account, forceRefresh);
}

async function extractFlightSodRows(context, flight, avbisDate, periodStart, periodEnd, selectedSlas = [], allSlots = false, account = "", forceRefresh = false) {
  const meta = parseFlightText(flight.text);

  try {
    let parsedSod = forceRefresh ? null : getCachedFlightSod(account, avbisDate, flight.id);
    if (!parsedSod) {
      let airportId = getCachedAirportId(flight.id);
      if (!airportId) {
        const airportResponse = await requestGetWithRetry(context, `${BASE_URL}/api/flight-watch/get-handling-airport?flight_id=${flight.id}`, {
          headers: { Accept: "application/json" },
          timeout: 15000,
        });
        const airport = await airportResponse.json().catch(() => null);
        if (!airportResponse.ok() || !airport?.status || !airport?.airport_id) {
          throw new Error(`handling airport HTTP ${airportResponse.status()}`);
        }
        airportId = airport.airport_id;
        cacheAirportId(flight.id, airportId);
      }

      const params = new URLSearchParams({
        flight_id: flight.id,
        airport_id: String(airportId),
        date: avbisDate,
      });
      const sodResponse = await requestGetWithRetry(context, `${BASE_URL}/flight-comm/get_sod_form?${params.toString()}`, {
        headers: { Accept: "text/html" },
        timeout: 15000,
      });
      const sodHtml = await sodResponse.text();
      if (!sodResponse.ok()) throw new Error(`SOD HTTP ${sodResponse.status()}`);

      parsedSod = {
        groups: parseSodGroups(sodHtml, avbisDate),
        staffDirectory: extractStaffDirectory(sodHtml),
      };
      setCachedFlightSod(account, avbisDate, flight.id, parsedSod);
    }

    const { groups, staffDirectory } = parsedSod;
    const slas = [...new Set(groups.map((group) => group.sla).filter(Boolean))].sort();
    const rows = groups
      .filter((group) => (allSlots || group.missing > 0) && overlaps(group.startDate, group.releaseDate, periodStart, periodEnd))
      .filter((group) => slaMatches(group.sla, selectedSlas))
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
        staff: group.staff,
      }));

    return { rows, errors: [], slas, staffDirectory };
  } catch (error) {
    return {
      rows: [],
      slas: [],
      staffDirectory: [],
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

async function mapLimit(items, limit, mapper, shouldStop = () => false) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workerCount = Math.min(limit, items.length);

  await Promise.all(Array.from({ length: workerCount }, async () => {
    while (nextIndex < items.length) {
      if (shouldStop()) break;
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
      if (nextIndex < items.length) await sleep(flightRequestDelay());
    }
  }));

  return results;
}

async function fetchFlightLinks(context, avbisDate, fallbackHtml = "") {
  let dataError = null;
  const data = await fetchFlightCommsData(context, avbisDate).catch((err) => {
    dataError = err;
    console.warn(`fetchFlightCommsData error for ${avbisDate}:`, err.message);
    return null;
  });
  const flights = extractFlightLinksFromData(data);
  if (flights.length) return flights;
  let htmlError = null;
  const html = fallbackHtml || await fetchFlightCommsHtml(context, avbisDate).catch((err) => {
    htmlError = err;
    console.warn(`fetchFlightCommsHtml error for ${avbisDate}:`, err.message);
    return "";
  });
  if (htmlError) {
    const reasons = [dataError, htmlError].filter(Boolean).map((error) => error.message || String(error));
    throw new Error(`Could not load flights for ${avbisDate}: ${reasons.join("; ")}`);
  }
  const htmlFlights = extractFlightLinks(html);
  console.warn(`Flight Comms JSON returned no flights for ${avbisDate}; HTML fallback found ${htmlFlights.length}.`);
  return htmlFlights;
}

function dateScanSucceeded(result) {
  return Array.isArray(result?.errors) && result.errors.length === 0;
}

function failedDateResult(avbisDate, error) {
  return {
    rows: [],
    errors: [{
      date: avbisDate,
      flight_id: "",
      flight: "",
      route: "",
      direction: "",
      error: error?.message || String(error),
    }],
    scannedFlights: 0,
    airlines: [],
    slas: [],
    staffDirectory: [],
  };
}

function positiveInteger(value, fallback) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

function nonNegativeInteger(value, fallback) {
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : fallback;
}

function flightRequestDelay() {
  const jitter = FLIGHT_REQUEST_JITTER_MS > 0
    ? Math.floor(Math.random() * (FLIGHT_REQUEST_JITTER_MS + 1))
    : 0;
  return FLIGHT_REQUEST_DELAY_MS + jitter;
}

async function fetchFlightCommsData(context, avbisDate) {
  const response = await requestGetWithRetry(context, `${BASE_URL}/flight-comms-data-new?date=${encodeURIComponent(avbisDate)}`, {
    headers: { Accept: "application/json" },
    timeout: 15000,
  });

  if (!response.ok()) {
    throw new Error(`Flight Comms data ${avbisDate} returned HTTP ${response.status()}`);
  }

  return response.json();
}

function extractFlightLinksFromData(data) {
  const rawList = Array.isArray(data?.items)
    ? data.items
    : (data?.items && typeof data.items === "object")
      ? Object.values(data.items)
      : (Array.isArray(data?.all_flights) ? data.all_flights : []);

  return rawList
    .map((flight) => ({
      id: String(flight.flight_id || flight.id || flight.flightId || ""),
      text: extractTimelineFlightText(flight.timeline_item || flight.html || flight.text || flight.content || ""),
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
    timeout: 15000,
  });

  if (!pageResponse.ok()) {
    throw new Error(`Flight Comms ${avbisDate} returned HTTP ${pageResponse.status()}`);
  }

  return pageResponse.text();
}

async function requestGetWithRetry(context, url, options = {}) {
  let lastResponse = null;
  let lastError = null;

  for (let attempt = 0; attempt <= REQUEST_RETRIES; attempt += 1) {
    if (attempt > 0) await sleep(requestRetryDelay(lastResponse, attempt));

    try {
      lastResponse = await context.request.get(url, options);
    } catch (error) {
      lastError = error;
      if (error.message && error.message.includes("closed")) break;
      continue;
    }

    if (!isRetryableStatus(lastResponse.status())) return lastResponse;
  }

  if (!lastResponse && lastError) throw lastError;
  return lastResponse;
}

function isRetryableStatus(status) {
  return status === 408 || status === 425 || status === 429 || status >= 500;
}

function requestRetryDelay(response, attempt) {
  const retryAfter = Number(response?.headers()?.["retry-after"]);
  if (Number.isFinite(retryAfter) && retryAfter > 0) return retryAfter * 1000;
  return Math.min(15000, 1000 * attempt * attempt);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeScanId(value) {
  const scanId = String(value || "").trim();
  return /^[a-zA-Z0-9_-]{8,80}$/.test(scanId) ? scanId : "";
}

function startScanProgress(scanId, dates) {
  cleanupScanProgress();
  const now = Date.now();
  scanProgress.set(scanId, {
    scanId,
    stage: "starting",
    message: `Starting scan for ${dates.length} date(s)...`,
    startedAt: now,
    updatedAt: now,
    elapsedMs: 0,
    totalDates: dates.length,
    processedDates: 0,
    completedDates: 0,
    currentDate: "",
    currentDateStartedAt: 0,
    currentFlight: "",
    currentDirection: "",
    currentFlightIndex: 0,
    currentFlightTotal: 0,
    scannedFlights: 0,
    foundRows: 0,
    errors: 0,
    dateSummaries: [],
    cancelRequested: false,
    cancelled: false,
    done: false,
  });
}

function requestScanCancellation(scanId) {
  const progress = normalizeScanId(scanId) ? scanProgress.get(scanId) : null;
  if (!progress || progress.done) return { accepted: false, message: "Scan is no longer running." };
  progress.cancelRequested = true;
  progress.stage = "cancelling";
  progress.updatedAt = Date.now();
  progress.message = "Cancellation requested. Finishing active requests and preserving completed dates…";
  return { accepted: true, completedDates: progress.completedDates };
}

function isScanCancellationRequested(scanId) {
  return Boolean(scanProgress.get(scanId)?.cancelRequested);
}

function updateScanProgress(scanId, patch) {
  const progress = scanProgress.get(scanId);
  if (!progress) return;
  const now = Date.now();
  Object.assign(progress, patch, {
    updatedAt: now,
    elapsedMs: now - progress.startedAt,
  });
}

function completeProgressDate(scanId, summary) {
  const progress = scanProgress.get(scanId);
  if (!progress) return;
  const now = Date.now();
  progress.processedDates += 1;
  if (!summary.errors) progress.completedDates += 1;
  progress.scannedFlights += summary.scannedFlights;
  progress.foundRows += summary.rows;
  progress.errors += summary.errors;
  progress.dateSummaries.push(summary);
  progress.updatedAt = now;
  progress.elapsedMs = now - progress.startedAt;
  progress.message = summary.errors
    ? `${summary.date}: incomplete with ${summary.errors} endpoint error(s); it was not cached.`
    : `${summary.date}: scanned ${summary.scannedFlights} flight(s), found ${summary.rows} empty slot group(s) in ${formatDuration(summary.elapsedMs)}.`;
}

function finishScanProgress(scanId, result) {
  const progress = scanProgress.get(scanId);
  if (!progress) return;
  const now = Date.now();
  progress.stage = "done";
  progress.done = true;
  progress.processedDates = progress.totalDates;
  progress.completedDates = result.scannedDates.length;
  progress.scannedFlights = result.scannedFlights;
  progress.foundRows = result.rows.length;
  progress.errors = result.errors.length;
  progress.updatedAt = now;
  progress.elapsedMs = now - progress.startedAt;
  const incomplete = result.incompleteDates?.length || 0;
  progress.message = `Done in ${formatDuration(progress.elapsedMs)}. ${result.rows.length} empty slot group(s), ${result.scannedFlights} flight(s), ${result.errors.length} endpoint error(s)${incomplete ? `; ${incomplete} date(s) incomplete and not cached` : ""}.`;
}

function cancelScanProgress(scanId, result) {
  const progress = scanProgress.get(scanId);
  if (!progress) return;
  const now = Date.now();
  progress.stage = "cancelled";
  progress.done = true;
  progress.cancelled = true;
  progress.scannedFlights = result.scannedFlights;
  progress.foundRows = result.rows.length;
  progress.errors = result.errors.length;
  progress.updatedAt = now;
  progress.elapsedMs = now - progress.startedAt;
  progress.message = `Cancelled after ${progress.completedDates} of ${progress.totalDates} date(s). Completed dates were preserved for a faster rerun.`;
}

function failScanProgress(scanId, error) {
  const progress = scanProgress.get(scanId);
  if (!progress) return;
  const now = Date.now();
  progress.stage = "error";
  progress.done = true;
  progress.updatedAt = now;
  progress.elapsedMs = now - progress.startedAt;
  progress.message = error.message || String(error);
}

function getScanProgress(scanId) {
  cleanupScanProgress();
  const progress = normalizeScanId(scanId) ? scanProgress.get(scanId) : null;
  if (!progress) return { found: false };
  return {
    found: true,
    ...progress,
    elapsedLabel: formatDuration(progress.elapsedMs),
    currentDateElapsedLabel: progress.currentDateStartedAt ? formatDuration(Date.now() - progress.currentDateStartedAt) : "",
    dateSummaries: progress.dateSummaries.map((summary) => ({
      ...summary,
      elapsedLabel: formatDuration(summary.elapsedMs),
    })),
  };
}

function cleanupScanProgress() {
  const now = Date.now();
  for (const [scanId, progress] of scanProgress) {
    if (now - progress.updatedAt > SCAN_PROGRESS_TTL_MS) scanProgress.delete(scanId);
  }
}

function formatFlightLabel(meta) {
  return [meta.flight, meta.direction].filter(Boolean).join(" ");
}

function formatDuration(ms) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return minutes ? `${minutes}m ${String(remainder).padStart(2, "0")}s` : `${remainder}s`;
}

async function login(page, email, password) {
  await gotoWithRetry(page, `${BASE_URL}/login`);
  if (!page.url().includes("/login")) return;

  await page.getByPlaceholder("Email").waitFor({ state: "visible", timeout: 30000 });
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

  if (page.url().includes("/login")) {
    throw new Error("Login did not complete. Check the credentials.");
  }
}

async function gotoWithRetry(page, url) {
  let lastError = null;

  for (let attempt = 0; attempt <= REQUEST_RETRIES; attempt += 1) {
    if (attempt > 0) await sleep(2000 * attempt);

    try {
      return await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    } catch (error) {
      lastError = error;
      console.warn(`Navigation to ${url} failed on attempt ${attempt + 1}: ${error.message.split("\n")[0]}`);
    }
  }

  throw lastError;
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
      for (const holiday of getGermanBavarianHolidays(year)) publicHolidays.add(holiday.date);
    }
  }

  const airlines = normalizeCodes(payload.airlines, /^all(?:\s+airlines?)?$/i);
  const slas = normalizeCodes(payload.slas, /^all(?:\s+slas?)?$/i);
  const allSlots = Boolean(payload.allSlots);
  const forceRefresh = Boolean(payload.forceRefresh);

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
    slas,
    allSlots,
    forceRefresh,
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

function slaMatches(sla, slas) {
  if (!slas.length) return true;
  return slas.includes(String(sla || "").trim().toUpperCase());
}

function normalizeCodes(value, allPattern) {
  const values = Array.isArray(value) ? value : String(value || "").split(/[\s,;]+/);
  return values
    .flatMap((item) => String(item || "").split(/[\s,;]+/))
    .map((code) => code.trim().toUpperCase())
    .filter((code) => code && !allPattern.test(code));
}

function airlineCodeFromFlight(flight) {
  return parseFlightText(flight.text).flight.split(/\s+/)[0]?.toUpperCase() || "";
}

function extractFlightLinks(html) {
  const byId = new Map();

  // Try pattern 1: <a ... class="...flightContainer..." id="12345"...>
  const anchorRe = /<a\b[^>]*\bid=["']?(\d+)["']?[^>]*>[\s\S]*?<\/a>/gi;
  let match;

  while ((match = anchorRe.exec(html))) {
    const anchor = match[0];
    const id = match[1];
    const attrs = parseAttributes(anchor);
    if (attrs.class && String(attrs.class).includes("flightContainer")) {
      if (!byId.has(id)) byId.set(id, cleanText(stripTags(anchor)));
    }
  }

  if (!byId.size) {
    // Try pattern 2: id="(\d+)" class="...flightContainer..."
    const genericRe = /<(?:a|div|tr)\b[^>]*\bid=["']?(\d+)["']?[^>]*class=["'][^"']*\bflightContainer\b[^"']*["'][^>]*>([\s\S]*?)<\/(?:a|div|tr)>/gi;
    while ((match = genericRe.exec(html))) {
      const id = match[1];
      if (!byId.has(id)) byId.set(id, cleanText(stripTags(match[2])));
    }
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
        duration: (cells[5] || "").replace(/act/gi, "").replace(/>/g, "").replace(/^[-\s()]+|[-\s()]+$/g, "").trim(),
        staff: [],
        flightDate,
      };
    }

    if (current) {
      for (const staffCell of extractStaffLabelsFromCells(cells)) current.staff.push(staffCell);
    }
  }

  if (current) groups.push(finishGroup(current));
  return groups;
}

function extractStaffDirectory(html) {
  const staff = new Set();
  const optionRe = /<option\b[^>]*>([\s\S]*?)<\/option>/gi;
  let match;
  while ((match = optionRe.exec(String(html)))) {
    const label = cleanText(stripTags(match[1]));
    if (/^[A-Z0-9]{2,10}\s+-\s+\S+/i.test(label)) staff.add(label);
  }
  return [...staff];
}

function finishGroup(group) {
  const staff = [...new Set(group.staff)];
  const assigned = staff.length;
  return {
    ...group,
    staff,
    assigned,
    missing: Math.max(0, group.required - assigned),
    startDate: parseSodUtc(group.start, group.flightDate),
    releaseDate: parseSodUtc(group.release, group.flightDate),
  };
}

function extractTableRows(html) {
  const tables = String(html).match(/<table\b[\s\S]*?<\/table>/gi) || [];
  const rows = [];
  const trRe = /<tr\b[\s\S]*?<\/tr>/gi;
  for (const table of tables) {
    let trMatch;
    while ((trMatch = trRe.exec(table))) {
      const cells = [];
      const embeddedStaff = [];
      const cellRe = /<(?:td|th)\b[\s\S]*?<\/(?:td|th)>/gi;
      let cellMatch;
      while ((cellMatch = cellRe.exec(trMatch[0]))) {
        cells.push(cleanText(stripTags(cellMatch[0])));
        embeddedStaff.push(...extractSelectedStaffLabels(cellMatch[0]));
      }
      cells.push(...embeddedStaff);
      if (cells.length) rows.push(cells);
    }
  }

  return rows;
}

function extractSelectedStaffLabels(cellHtml) {
  const labels = new Set();
  const selectedOptionRe = /<option\b[^>]*\bselected(?:\s*=\s*["'][^"']*["'])?[^>]*>([\s\S]*?)<\/option>/gi;
  let match;
  while ((match = selectedOptionRe.exec(cellHtml))) {
    const label = cleanText(stripTags(match[1]));
    if (isStaffLabel(label)) labels.add(label);
  }
  const inputRe = /<input\b[^>]*\bvalue\s*=\s*(["'])(.*?)\1[^>]*>/gi;
  while ((match = inputRe.exec(cellHtml))) {
    const label = cleanText(decodeHtml(match[2]));
    if (isStaffLabel(label)) labels.add(label);
  }
  return [...labels];
}

function extractStaffLabelsFromCells(cells) {
  const labels = new Set();
  for (const cell of cells) {
    const label = cleanText(cell).replace(/\s+(?:Remove|Delete|Unassign|×)\s*$/i, "").trim();
    if (isStaffLabel(label)) labels.add(label);
  }
  return [...labels];
}

function isStaffLabel(label) {
  const text = String(label || "").trim();
  const identityMarkers = text.match(/(?:^|\s)[A-Z0-9]{2,10}\s+-\s+/gi) || [];
  return identityMarkers.length === 1 && /^[A-Z0-9]{2,10}\s+-\s+\S.+$/i.test(text);
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
  const scheduledMatch = rest.match(/\b(STA|STD)\s*((?:\d{2}\s+)?\d{2}:\d{2})/);
  const direction = scheduledMatch?.[1] === "STA"
    ? "Arrival"
    : scheduledMatch?.[1] === "STD"
      ? "Departure"
      : directionFromRoute(route);

  return {
    flight,
    route,
    aircraft,
    direction,
    scheduled: scheduledMatch ? `${scheduledMatch[1]} ${scheduledMatch[2]}` : "",
  };
}

function directionFromRoute(route) {
  const airports = String(route || "").toUpperCase().split("-").map((part) => part.trim()).filter(Boolean);
  if (airports[0] === "MUC") return "Departure";
  if (airports[airports.length - 1] === "MUC") return "Arrival";
  return "";
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

module.exports = { dateScanSucceeded, extractFlightSodRows, extractStaffDirectory, extractTableRows, fetchFlightLinks, parseSodGroups, verifyAuthenticatedSession };
