/*
  GSRM Empty SOD Slots in-page app

  Use this on an already logged-in https://gsrm.avbis.online/flight-comms page.
  It does not log in and does not open each flight detail. It uses the current
  browser session and the same JSON/HTML endpoints used by Flight Comms.
*/

(() => {
  if (document.getElementById("gsrm-empty-slots-app")) {
    document.getElementById("gsrm-empty-slots-app").remove();
  }

  const app = document.createElement("div");
  app.id = "gsrm-empty-slots-app";
  app.innerHTML = `
    <style>
      #gsrm-empty-slots-app{position:fixed;z-index:2147483647;inset:18px auto auto 18px;width:min(720px,calc(100vw - 36px));max-height:calc(100vh - 36px);overflow:auto;background:#fff;border:1px solid #cfd7e3;border-radius:8px;box-shadow:0 18px 48px rgba(20,31,43,.22);font:13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#17212b}
      #gsrm-empty-slots-app *{box-sizing:border-box}
      #gsrm-empty-slots-app header{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:12px 14px;border-bottom:1px solid #d8e0ea;background:#f5f7fa;position:sticky;top:0;z-index:1}
      #gsrm-empty-slots-app h2{margin:0;font-size:18px;letter-spacing:0}
      #gsrm-empty-slots-app .body{padding:12px 14px}
      #gsrm-empty-slots-app .grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:10px}
      #gsrm-empty-slots-app label span,#gsrm-empty-slots-app legend{display:block;color:#637082;font-size:12px;font-weight:700;margin-bottom:4px}
      #gsrm-empty-slots-app input[type=date],#gsrm-empty-slots-app input[type=time],#gsrm-empty-slots-app input[type=text]{width:100%;height:34px;border:1px solid #cfd7e3;border-radius:6px;padding:0 9px}
      #gsrm-empty-slots-app fieldset{border:0;padding:0;margin:0 0 10px;display:flex;flex-wrap:wrap;gap:7px}
      #gsrm-empty-slots-app fieldset legend{width:100%}
      #gsrm-empty-slots-app fieldset label{position:relative}
      #gsrm-empty-slots-app fieldset input{position:absolute;opacity:0}
      #gsrm-empty-slots-app fieldset label span{display:grid;place-items:center;min-width:48px;height:30px;margin:0;border:1px solid #cfd7e3;border-radius:6px;color:#17212b;background:#f7f9fb;font-size:12px}
      #gsrm-empty-slots-app fieldset input:checked+span{border-color:#126c64;background:#dff1ed;color:#0f5a54}
      #gsrm-empty-slots-app .row{display:grid;grid-template-columns:180px 1fr;gap:10px;align-items:end;margin-bottom:10px}
      #gsrm-empty-slots-app .toggle{display:flex;gap:8px;align-items:center;min-height:34px}
      #gsrm-empty-slots-app .actions{display:flex;gap:8px;align-items:center;margin:10px 0}
      #gsrm-empty-slots-app button{height:34px;border-radius:6px;border:1px solid #cfd7e3;background:#fff;padding:0 12px;font-weight:700;cursor:pointer}
      #gsrm-empty-slots-app .primary{background:#126c64;border-color:#126c64;color:#fff}
      #gsrm-empty-slots-app .danger{color:#b42318}
      #gsrm-empty-slots-app .status{color:#637082;margin-left:auto}
      #gsrm-empty-slots-app table{width:100%;border-collapse:collapse;min-width:680px}
      #gsrm-empty-slots-app th,#gsrm-empty-slots-app td{padding:7px 8px;border-bottom:1px solid #e1e6ee;text-align:left;white-space:nowrap}
      #gsrm-empty-slots-app th{background:#f3f6f8;font-size:12px;position:sticky;top:52px}
      #gsrm-empty-slots-app .table-wrap{overflow:auto;max-height:300px;border:1px solid #e1e6ee;border-radius:6px}
      @media(max-width:760px){#gsrm-empty-slots-app .grid,#gsrm-empty-slots-app .row{grid-template-columns:1fr}}
    </style>
    <header>
      <h2>Empty SOD Slots</h2>
      <button id="gsrm-close" class="danger">Close</button>
    </header>
    <div class="body">
      <div class="grid">
        <label><span>Start date</span><input id="gsrm-start-date" type="date" value="${todayIso()}"></label>
        <label><span>End date</span><input id="gsrm-end-date" type="date" value="${todayIso()}"></label>
        <label><span>From UTC</span><input id="gsrm-start-time" type="time" value="00:00"></label>
        <label><span>To UTC</span><input id="gsrm-end-time" type="time" value="23:59"></label>
      </div>
      <fieldset>
        <legend>Days</legend>
        <label><input type="checkbox" name="gsrm-day" value="1" checked><span>Mon</span></label>
        <label><input type="checkbox" name="gsrm-day" value="2" checked><span>Tue</span></label>
        <label><input type="checkbox" name="gsrm-day" value="3" checked><span>Wed</span></label>
        <label><input type="checkbox" name="gsrm-day" value="4" checked><span>Thu</span></label>
        <label><input type="checkbox" name="gsrm-day" value="5" checked><span>Fri</span></label>
        <label><input type="checkbox" name="gsrm-day" value="6"><span>Sat</span></label>
        <label><input type="checkbox" name="gsrm-day" value="0"><span>Sun</span></label>
      </fieldset>
      <div class="row">
        <label class="toggle"><input id="gsrm-include-holidays" type="checkbox"><span>Public holidays</span></label>
        <label><span>Holiday dates</span><input id="gsrm-holidays" type="text" placeholder="2026-01-01, 2026-12-25"></label>
      </div>
      <label><span>Airlines</span><input id="gsrm-airlines" type="text" placeholder="All airlines, or BA, IB, UX"></label>
      <div class="actions">
        <button id="gsrm-run" class="primary">Run scan</button>
        <button id="gsrm-download" disabled>Download CSV</button>
        <span id="gsrm-status" class="status">Ready.</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Flight</th><th>Route</th><th>SLA</th><th>Req</th><th>Asg</th><th>Miss</th><th>Start</th><th>Release</th></tr></thead>
          <tbody id="gsrm-results"><tr><td colspan="9">No scan run yet.</td></tr></tbody>
        </table>
      </div>
    </div>`;
  document.body.appendChild(app);

  let latestRows = [];

  $("#gsrm-close").onclick = () => app.remove();
  $("#gsrm-run").onclick = run;
  $("#gsrm-download").onclick = () => {
    downloadCsv(latestRows);
  };

  async function run() {
    const config = readConfig();
    latestRows = [];
    setStatus("Scanning...");
    $("#gsrm-run").disabled = true;
    $("#gsrm-download").disabled = true;

    try {
      const dates = selectedDates(config);
      let scannedFlights = 0;
      for (const date of dates) {
        const avbisDate = formatAvbisDate(date);
        const html = await getText(`/flight-comms?date=${encodeURIComponent(avbisDate)}`);
        const flights = extractFlightLinks(html).filter((flight) => airlineMatches(flight, config.airlines));
        scannedFlights += flights.length;
        const csrf = extractCsrf(html);
        const periodStart = dateWithTime(date, config.startTime);
        const periodEnd = dateWithTime(date, config.endTime);
        for (const flight of flights) {
          const meta = parseFlightText(flight.text);
          const airport = await getJson(`/api/flight-watch/get-handling-airport?flight_id=${flight.id}`, csrf);
          if (!airport?.status || !airport?.airport_id) continue;
          const params = new URLSearchParams({ flight_id: flight.id, airport_id: String(airport.airport_id), date: avbisDate });
          const sod = await getText(`/flight-comm/get_sod_form?${params.toString()}`, csrf);
          for (const group of parseSodGroups(sod, avbisDate)) {
            if (group.missing <= 0) continue;
            if (!overlaps(group.startDate, group.releaseDate, periodStart, periodEnd)) continue;
            latestRows.push({ date: avbisDate, flight_id: flight.id, ...meta, sla: group.sla, type: group.type, movement: group.movement, required: group.required, assigned: group.assigned, missing: group.missing, start_utc: group.start, release_utc: group.release, duration: group.duration });
          }
        }
      }
      latestRows.sort((a, b) => a.start_utc.localeCompare(b.start_utc) || a.flight.localeCompare(b.flight));
      render(latestRows);
      $("#gsrm-download").disabled = latestRows.length === 0;
      setStatus(`${latestRows.length} empty group(s), ${scannedFlights} flight(s), ${dates.length} date(s).`);
      console.log("GSRM empty SOD slot JSON", latestRows);
    } catch (error) {
      setStatus(error.message || String(error));
      console.error(error);
    } finally {
      $("#gsrm-run").disabled = false;
    }
  }

  function readConfig() {
    return {
      startDate: parseIsoDate($("#gsrm-start-date").value),
      endDate: parseIsoDate($("#gsrm-end-date").value),
      startTime: parseTime($("#gsrm-start-time").value),
      endTime: parseTime($("#gsrm-end-time").value),
      days: [...document.querySelectorAll('input[name="gsrm-day"]:checked')].map((el) => Number(el.value)),
      includePublicHolidays: $("#gsrm-include-holidays").checked,
      publicHolidays: new Set($("#gsrm-holidays").value.split(/[\s,;]+/).map((x) => x.trim()).filter(Boolean)),
      airlines: $("#gsrm-airlines").value.split(/[\s,;]+/).map((x) => x.trim().toUpperCase()).filter(Boolean),
    };
  }

  function render(rows) {
    $("#gsrm-results").innerHTML = rows.length ? rows.map((row) => `
      <tr><td>${esc(row.date)}</td><td>${esc(row.flight)} ${esc(row.direction)}</td><td>${esc(row.route)}</td><td>${esc(row.sla)}</td><td>${row.required}</td><td>${row.assigned}</td><td>${row.missing}</td><td>${esc(row.start_utc)}</td><td>${esc(row.release_utc)}</td></tr>
    `).join("") : '<tr><td colspan="9">No empty slots found.</td></tr>';
  }

  function getText(url, csrf = "") {
    return xhr(url, "text", csrf);
  }

  function getJson(url, csrf = "") {
    return xhr(url, "json", csrf);
  }

  function xhr(url, type, csrf) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.setRequestHeader("Accept", type === "json" ? "application/json" : "text/html");
      if (csrf) req.setRequestHeader("X-CSRF-TOKEN", csrf);
      req.onload = () => {
        if (req.status < 200 || req.status >= 300) return reject(new Error(`${url} HTTP ${req.status}`));
        if (type === "json") {
          try { resolve(JSON.parse(req.responseText)); } catch (error) { reject(error); }
        } else {
          resolve(req.responseText);
        }
      };
      req.onerror = () => reject(new Error(`${url} network error`));
      req.send();
    });
  }

  function extractFlightLinks(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const byId = new Map();
    [...doc.querySelectorAll("a.flightContainer[id]")].forEach((a) => {
      if (/^\d+$/.test(a.id) && !byId.has(a.id)) byId.set(a.id, clean(a.textContent));
    });
    return [...byId.entries()].map(([id, text]) => ({ id, text }));
  }

  function parseSodGroups(html, flightDate) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const table = doc.querySelector("table");
    if (!table) return [];
    const rows = [...table.querySelectorAll("tr")].map((tr) => [...tr.cells].map((td) => clean(td.textContent))).filter((r) => r.length);
    const groups = [];
    let current = null;
    for (const cells of rows) {
      if (cells[0] === "SLA") continue;
      const requiredCell = cells.find((cell) => /Required\s*:/i.test(cell));
      if (requiredCell) {
        if (current) groups.push(finishGroup(current));
        current = { sla: cells[0] || "", type: cells[1] || "", movement: (requiredCell.split(/Required\s*:/i)[0] || "").trim(), required: Number((requiredCell.match(/Required\s*:\s*(\d+)/i) || [])[1] || 0), start: stripSla(cells[3] || ""), release: stripSla(cells[4] || ""), duration: (cells[5] || "").replace(/act/gi, "").replace(/>/g, "").replace(/^[-\s()]+|[-\s()]+$/g, "").trim(), staff: [], flightDate };
      } else if (current && /^[A-Z]{3}\s+-\s+/.test(cells[2] || "")) {
        current.staff.push(cells[2]);
      }
    }
    if (current) groups.push(finishGroup(current));
    return groups;
  }

  function finishGroup(group) {
    const assigned = group.staff.length;
    return { ...group, assigned, missing: Math.max(0, group.required - assigned), startDate: parseSodUtc(group.start, group.flightDate), releaseDate: parseSodUtc(group.release, group.flightDate) };
  }

  function parseFlightText(text) {
    const parts = text.split("|").map((x) => x.trim()).filter(Boolean);
    const flight = (parts[0] || "").replace(/^[^A-Z0-9]*/, "").trim();
    const rest = parts.slice(3).join(" | ");
    const scheduled = rest.match(/\b(STA|STD)\s*(\d{2}\s+\d{2}:\d{2})/);
    return { flight, route: parts[1] || "", aircraft: parts[2] || "", direction: scheduled?.[1] === "STA" ? "Arrival" : scheduled?.[1] === "STD" ? "Departure" : "", scheduled_utc: scheduled ? `${scheduled[1]} ${scheduled[2]}` : "" };
  }

  function selectedDates(config) {
    const out = [];
    const cur = new Date(config.startDate);
    while (cur <= config.endDate) {
      const iso = cur.toISOString().slice(0, 10);
      if (config.days.includes(cur.getUTCDay()) || (config.includePublicHolidays && config.publicHolidays.has(iso))) out.push(new Date(cur));
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
    return out;
  }

  function airlineMatches(flight, airlines) {
    if (!airlines.length) return true;
    return airlines.includes(parseFlightText(flight.text).flight.split(/\s+/)[0]?.toUpperCase() || "");
  }

  function extractCsrf(html) {
    return new DOMParser().parseFromString(html, "text/html").querySelector('meta[name="csrf-token"]')?.content || "";
  }

  function parseIsoDate(value) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  }

  function parseTime(value) {
    const [hour, minute] = value.split(":").map(Number);
    return { hour, minute };
  }

  function dateWithTime(date, time) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), time.hour, time.minute));
  }

  function formatAvbisDate(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${String(date.getUTCDate()).padStart(2, "0")}-${months[date.getUTCMonth()]}-${date.getUTCFullYear()}`;
  }

  function parseSodUtc(value, flightDate) {
    const year = Number(flightDate.slice(-4));
    const m = value.match(/^(\d{2})\s+([A-Za-z]{3})\s+(\d{2}):(\d{2})$/);
    if (!m) return null;
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].findIndex((x) => x.toLowerCase() === m[2].toLowerCase());
    return new Date(Date.UTC(year, month, Number(m[1]), Number(m[3]), Number(m[4])));
  }

  function overlaps(a, b, start, end) { return a && b && a <= end && b >= start; }
  function stripSla(v) { return clean(v).replace(/\s*SLA\s*$/i, "").trim(); }
  function clean(v) { return String(v || "").replace(/\s+/g, " ").trim(); }
  function todayIso() { return new Date().toISOString().slice(0, 10); }
  function setStatus(text) { $("#gsrm-status").textContent = text; }
  function $(sel) { return app.querySelector(sel); }
  function esc(v) { return String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c])); }
  function download(name, body, type) { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([body], { type })); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); }
  function downloadCsv(rows) {
    const headers = ["date", "flight_id", "flight", "direction", "route", "aircraft", "scheduled_utc", "sla", "type", "movement", "required", "assigned", "missing", "start_utc", "release_utc", "duration"];
    const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => csvCell(r[h])).join(","))].join("\n");
    download("gsrm-empty-sod-slots.csv", csv, "text/csv");
  }
  function csvCell(v) { const s = v == null ? "" : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }
})();
