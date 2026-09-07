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
        <label><input type="checkbox" name="gsrm-day" value="6" checked><span>Sat</span></label>
        <label><input type="checkbox" name="gsrm-day" value="0" checked><span>Sun</span></label>
      </fieldset>
      <div class="row">
        <label class="toggle"><input id="gsrm-mode" type="checkbox"><span>Find replacements</span></label>
        <label><span>My Initials / Name</span><input id="gsrm-initials" type="text" placeholder="e.g. ABC or Vithanage" value="Vithanage"></label>
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
    const isReplacements = $("#gsrm-mode").checked;
    if (isReplacements) {
      downloadReplacementsCsv(latestRows);
    } else {
      downloadCsv(latestRows);
    }
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
            if (!overlaps(group.startDate, group.releaseDate, periodStart, periodEnd)) continue;
            latestRows.push({ date: avbisDate, flight_id: flight.id, ...meta, sla: group.sla, type: group.type, movement: group.movement, required: group.required, assigned: group.assigned, missing: group.missing, start_utc: group.start, release_utc: group.release, duration: group.duration, staff: group.staff });
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
      days: [...app.querySelectorAll('input[name="gsrm-day"]:checked')].map((el) => Number(el.value)),
      includePublicHolidays: $("#gsrm-include-holidays")?.checked || false,
      publicHolidays: new Set(($("#gsrm-holidays")?.value || "").split(/[\s,;]+/).map((x) => x.trim()).filter(Boolean)),
      airlines: $("#gsrm-airlines").value.split(/[\s,;]+/).map((x) => x.trim().toUpperCase()).filter(Boolean),
    };
  }

  function render(rows) {
    const isReplacements = $("#gsrm-mode").checked;
    const initials = $("#gsrm-initials").value.trim().toUpperCase();

    if (isReplacements && initials) {
      const myDuties = rows.filter(row => row.staff && row.staff.some(s => matchStaff(s, initials)));

      if (!myDuties.length) {
        $("#gsrm-results").innerHTML = `<tr><td colspan="9" style="text-align:center;color:#637082">No duties found for "${esc(initials)}" in the scanned range.</td></tr>`;
        return;
      }

      const staffSet = new Set();
      rows.forEach(r => {
        if (r.staff) r.staff.forEach(s => staffSet.add(s.trim()));
      });

      $("#gsrm-results").innerHTML = myDuties.map((duty) => {
        const dutyStart = parseSodUtc(duty.start_utc, duty.date);
        const dutyRelease = parseSodUtc(duty.release_utc, duty.date);

        const candidates = [];
        if (dutyStart && dutyRelease) {
          [...staffSet].forEach(candStr => {
            const match = candStr.match(/^([A-Z0-9]+)\s+-\s+(.+)$/i);
            if (!match) return;
            const candInitials = match[1].toUpperCase();
            const candName = match[2];
            if (matchStaff(candStr, initials)) return;

            const shifts = rows.filter(r => r.staff && r.staff.some(s => s.trim().toUpperCase().startsWith(candInitials + " -")));
            let overlapsShift = false;
            for (const shift of shifts) {
              const start = parseSodUtc(shift.start_utc, shift.date);
              const release = parseSodUtc(shift.release_utc, shift.date);
              if (start && release && start < dutyRelease && release > dutyStart) {
                overlapsShift = true;
                break;
              }
            }
            if (overlapsShift) return;

            const shiftsOnSameDay = shifts.filter(s => s.date === duty.date);
            const isWorkingOnDay = shiftsOnSameDay.length > 0;
            const slaExperience = shifts.filter(s => s.sla === duty.sla).length;

            let adjacentType = false;
            for (const shift of shiftsOnSameDay) {
              const start = parseSodUtc(shift.start_utc, shift.date);
              const release = parseSodUtc(shift.release_utc, shift.date);
              if (start && release) {
                if (Math.abs(dutyStart - release) <= 30 * 60 * 1000 || Math.abs(start - dutyRelease) <= 30 * 60 * 1000) {
                  adjacentType = true;
                }
              }
            }

            let score = 0;
            if (isWorkingOnDay) score += 5;
            if (slaExperience > 0) score += 3;
            if (adjacentType) score += 2;

            candidates.push({ initials: candInitials, name: candName, score });
          });
        }

        candidates.sort((a, b) => b.score - a.score);
        const candListHtml = candidates.length
          ? candidates.map(c => `<span title="${esc(c.name)}" style="background:${c.score >= 8 ? '#dff1ed' : c.score >= 5 ? '#fff9e6' : '#f3f6f8'};color:${c.score >= 8 ? '#0f5a54' : c.score >= 5 ? '#8a6d1c' : '#555'};padding:2px 5px;border-radius:4px;font-size:11px;font-weight:bold;margin-right:4px">${c.initials} (${c.score})</span>`).join("")
          : `<span style="color:#637082">None (out of ${staffSet.size} staff)</span>`;

        return `
          <tr>
            <td>${esc(duty.date)}</td>
            <td>${esc(duty.flight)} ${esc(duty.direction)}</td>
            <td>${esc(duty.route)}</td>
            <td><span style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-weight:600">${esc(duty.sla)}</span></td>
            <td>${esc(duty.start_utc)}</td>
            <td>${esc(duty.release_utc)}</td>
            <td colspan="3">${candListHtml}</td>
          </tr>
        `;
      }).join("");
      return;
    }

    const activeRows = rows.filter(row => row.missing > 0);
    $("#gsrm-results").innerHTML = activeRows.length ? activeRows.map((row) => `
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
    const tables = [...doc.querySelectorAll("table")];
    if (!tables.length) return [];
    const groups = [];
    let current = null;
    for (const table of tables) {
      const rows = [...table.querySelectorAll("tr")].map((tr) => {
        const cells = [...tr.cells].map((td) => {
          const text = clean(td.textContent);
          if (text) return text;
          const input = td.querySelector("input[value]");
          return input ? clean(input.value) : "";
        });
        const selectedStaff = [...tr.querySelectorAll("option:checked, input[value]")]
          .map(el => clean(el.value || el.textContent))
          .filter(v => /^[A-Z0-9]{2,10}\s+-\s+\S/i.test(v));
        cells.push(...selectedStaff);
        return cells;
      }).filter((r) => r.length);

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
            staff_details: [],
            flightDate,
          };
        } else if (current) {
          const staffNames = cells.filter(cell => /^[A-Z0-9]{2,10}\s+-\s+\S/i.test((cell || "").trim()));
          for (const staffName of [...new Set(staffNames)]) {
            current.staff.push(staffName);
            const timeCells = cells.filter(c => /^(?:\d{1,2}\s+[A-Za-z]{3}\s+)?\d{1,2}:\d{2}$/.test(stripSla(c || "").trim()));
            let sTime = timeCells[0] ? stripSla(timeCells[0]) : current.start;
            let rTime = timeCells[1] ? stripSla(timeCells[1]) : current.release;
            if (/^\d{1,2}:\d{2}$/.test(sTime) && /^(\d{1,2}\s+[A-Za-z]{3})\s+/.test(current.start)) {
              sTime = `${current.start.match(/^(\d{1,2}\s+[A-Za-z]{3})\s+/)[1]} ${sTime}`;
            }
            if (/^\d{1,2}:\d{2}$/.test(rTime) && /^(\d{1,2}\s+[A-Za-z]{3})\s+/.test(current.release)) {
              rTime = `${current.release.match(/^(\d{1,2}\s+[A-Za-z]{3})\s+/)[1]} ${rTime}`;
            }
            const sDate = parseSodUtc(sTime, flightDate);
            const rDate = parseSodUtc(rTime, flightDate);
            const gSDate = parseSodUtc(current.start, flightDate);
            const gRDate = parseSodUtc(current.release, flightDate);
            const isShorter = Boolean((gSDate && sDate && sDate > gSDate) || (gRDate && rDate && rDate < gRDate));
            current.staff_details.push({
              name: staffName,
              start_utc: sTime,
              release_utc: rTime,
              duration: cells[5] || current.duration,
              is_shorter: isShorter,
            });
          }
        }
      }
    }
    if (current) groups.push(finishGroup(current));
    return groups;
  }

  function finishGroup(group) {
    const staff = [...new Set(group.staff)];
    const assigned = staff.length;
    const staff_details = staff.map(name => (group.staff_details || []).find(d => d.name === name) || {
      name,
      start_utc: group.start,
      release_utc: group.release,
      duration: group.duration,
      is_shorter: false,
    });
    const has_shorter_assignment = staff_details.some(d => d.is_shorter);
    return {
      ...group,
      staff,
      staff_details,
      has_shorter_assignment,
      assigned,
      missing: Math.max(0, group.required - assigned),
      startDate: parseSodUtc(group.start, group.flightDate),
      releaseDate: parseSodUtc(group.release, group.flightDate),
    };
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
    const activeRows = rows.filter(r => r.missing > 0);
    const csv = [headers.join(","), ...activeRows.map((r) => headers.map((h) => csvCell(r[h])).join(","))].join("\n");
    download("gsrm-empty-sod-slots.csv", csv, "text/csv");
  }
  function downloadReplacementsCsv(rows) {
    const initials = $("#gsrm-initials").value.trim().toUpperCase();
    if (!initials) return;

    const myDuties = rows.filter(row => row.staff && row.staff.some(s => matchStaff(s, initials)));
    const staffSet = new Set();
    rows.forEach(r => {
      if (r.staff) r.staff.forEach(s => staffSet.add(s.trim()));
    });

    const csvHeaders = ["Date", "Flight", "Direction", "Route", "SLA", "Start UTC", "Release UTC", "Duration", "Num Candidates", "Top Candidates"];
    const csvRows = [csvHeaders.join(",")];

    for (const duty of myDuties) {
      const dutyStart = parseSodUtc(duty.start_utc, duty.date);
      const dutyRelease = parseSodUtc(duty.release_utc, duty.date);

      const candidates = [];
      if (dutyStart && dutyRelease) {
        [...staffSet].forEach(candStr => {
          const match = candStr.match(/^([A-Z0-9]+)\s+-\s+(.+)$/i);
          if (!match) return;
          const candInitials = match[1].toUpperCase();
          const candName = match[2];
          if (matchStaff(candStr, initials)) return;

          const shifts = rows.filter(r => r.staff && r.staff.some(s => s.trim().toUpperCase().startsWith(candInitials + " -")));
          let overlapsShift = false;
          for (const shift of shifts) {
            const start = parseSodUtc(shift.start_utc, shift.date);
            const release = parseSodUtc(shift.release_utc, shift.date);
            if (start && release && start < dutyRelease && release > dutyStart) {
              overlapsShift = true;
              break;
            }
          }
          if (overlapsShift) return;

          const shiftsOnSameDay = shifts.filter(s => s.date === duty.date);
          const isWorkingOnDay = shiftsOnSameDay.length > 0;
          const slaExperience = shifts.filter(s => s.sla === duty.sla).length;

          let adjacentType = false;
          for (const shift of shiftsOnSameDay) {
            const start = parseSodUtc(shift.start_utc, shift.date);
            const release = parseSodUtc(shift.release_utc, shift.date);
            if (start && release) {
              if (Math.abs(dutyStart - release) <= 30 * 60 * 1000 || Math.abs(start - dutyRelease) <= 30 * 60 * 1000) {
                adjacentType = true;
              }
            }
          }

          let score = 0;
          if (isWorkingOnDay) score += 5;
          if (slaExperience > 0) score += 3;
          if (adjacentType) score += 2;

          candidates.push({ initials: candInitials, name: candName, score });
        });
      }

      candidates.sort((a, b) => b.score - a.score);
      const topCandidatesStr = candidates.slice(0, 3).map(c => `${c.initials} (${c.score}/10)`).join(" | ");

      csvRows.push([
        csvCell(duty.date),
        csvCell(duty.flight),
        csvCell(duty.direction),
        csvCell(duty.route),
        csvCell(duty.sla),
        csvCell(duty.start_utc),
        csvCell(duty.release_utc),
        csvCell(duty.duration || ""),
        csvCell(candidates.length),
        csvCell(topCandidatesStr)
      ].join(","));
    }

    download(`gsrm-duty-replacements-${initials}.csv`, csvRows.join("\n"), "text/csv");
  }
  function csvCell(v) { const s = v == null ? "" : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }
  function matchStaff(staffStr, searchInput) {
    if (!staffStr || !searchInput) return false;
    const target = String(staffStr).trim().toUpperCase();
    const query = String(searchInput).trim().toUpperCase();
    if (target.startsWith(query + " -")) return true;
    const match = target.match(/^([A-Z0-9]+)\s+-\s+(.+)$/i);
    if (match) {
      const initials = match[1].toUpperCase();
      const name = match[2].toUpperCase();
      if (initials === query || name.includes(query)) return true;
    }
    return false;
  }
})();
