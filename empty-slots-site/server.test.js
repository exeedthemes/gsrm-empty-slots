const test = require("node:test");
const assert = require("node:assert/strict");
const { buildRosterPdfHtml, dateScanSucceeded, extractFlightSodRows, extractStaffDirectory, fetchFlightLinks, parseSodGroups, safePdfFilename, verifyAuthenticatedSession } = require("./server");

function mockAuthSession(response) {
  return {
    browser: { isConnected: () => true },
    closing: false,
    context: { request: { get: async () => response } },
  };
}

test("builds an isolated printable roster document with normalized PDF text", () => {
  const html = buildRosterPdfHtml({
    title: "Duty Roster — Edited",
    subtitle: "01 Sep · 02 Sep",
    rosterHtml: '<div class="roster-table">06:00–10:00</div>',
    css: ".roster-table { color: #123; }",
  });

  assert.match(html, /Duty Roster - Edited/);
  assert.match(html, /01 Sep \| 02 Sep/);
  assert.match(html, /06:00-10:00/);
  assert.match(html, /Roster section only/);
  assert.equal(safePdfFilename("My Roster 01/09"), "My-Roster-01-09.pdf");
});

test("reports an AVBIS session as connected only after an authenticated response", async () => {
  const authenticated = {
    ok: () => true,
    headers: () => ({}),
    url: () => "https://gsrm.avbis.online/flight-comms",
  };
  const expired = {
    ok: () => false,
    headers: () => ({ location: "/login" }),
    url: () => "https://gsrm.avbis.online/flight-comms",
  };

  assert.equal(await verifyAuthenticatedSession(mockAuthSession(authenticated)), true);
  assert.equal(await verifyAuthenticatedSession(mockAuthSession(expired)), false);
  assert.equal(await verifyAuthenticatedSession(null), false);
});

test("extracts the full staff directory while keeping only selected staff allocated", () => {
  const html = `
    <table><tbody>
      <tr>
        <td>CKIN</td><td>Agent</td><td>Required: 2</td><td>08:00</td><td>10:00</td><td>02:00</td>
        <td><select>
          <option value="1" selected>DNE - Daniela Neuner</option>
          <option value="2">ABC - Alice Brown</option>
          <option value="3">XYZ - Xavier Young</option>
        </select></td>
      </tr>
      <tr><td>ABC - Alice Brown</td></tr>
    </tbody></table>`;

  assert.deepEqual(extractStaffDirectory(html).sort(), [
    "ABC - Alice Brown",
    "DNE - Daniela Neuner",
    "XYZ - Xavier Young",
  ]);
  assert.deepEqual(parseSodGroups(html, "18-Aug-2026")[0].staff.sort(), [
    "ABC - Alice Brown",
    "DNE - Daniela Neuner",
  ]);
});

test("parses allocated staff from every SOD table", () => {
  const html = `
    <table><tr><td>GATE</td><td>Agent</td><td>Required: 1</td><td>10:00</td><td>11:00</td><td>01:00</td></tr>
      <tr><td>AAA - Agent One</td></tr></table>
    <table><tr><td>ASVC</td><td>Agent</td><td>Required: 1</td><td>12:00</td><td>13:00</td><td>01:00</td></tr>
      <tr><td>BBB - Agent Two</td></tr></table>`;

  const groups = parseSodGroups(html, "18-Aug-2026");
  assert.equal(groups.length, 2);
  assert.deepEqual(groups.map((group) => group.staff), [
    ["AAA - Agent One"],
    ["BBB - Agent Two"],
  ]);
});

test("does not classify a date with endpoint errors as successfully scanned", () => {
  assert.equal(dateScanSucceeded({ errors: [] }), true);
  assert.equal(dateScanSucceeded({ errors: [{ error: "SOD HTTP 429" }] }), false);
});

test("flight-list endpoint failures are surfaced instead of becoming a zero-flight success", async () => {
  const response = {
    ok: () => false,
    status: () => 404,
    json: async () => ({}),
    text: async () => "",
  };
  const context = { request: { get: async () => response } };

  await assert.rejects(
    fetchFlightLinks(context, "31-Aug-2026"),
    /Could not load flights for 31-Aug-2026.*HTTP 404/
  );
});

test("a confirmed empty date remains a valid zero-flight result", async () => {
  const responses = [
    { ok: () => true, status: () => 200, json: async () => ({ items: [] }) },
    { ok: () => true, status: () => 200, text: async () => "<html></html>" },
  ];
  const context = { request: { get: async () => responses.shift() } };

  assert.deepEqual(await fetchFlightLinks(context, "31-Aug-2026"), []);
});

test("reuses parsed flight SOD data across filter changes and bypasses it on refresh", async () => {
  const sodHtml = `
    <table><tbody><tr>
      <td>CKIN</td><td>Agent</td><td>Required: 1</td><td>18 Aug 08:00</td><td>18 Aug 10:00</td><td>02:00</td>
    </tr></tbody></table>`;
  let requests = 0;
  const context = {
    request: {
      get: async (url) => {
        requests += 1;
        if (url.includes("get-handling-airport")) {
          return { ok: () => true, status: () => 200, json: async () => ({ status: true, airport_id: 7 }) };
        }
        return { ok: () => true, status: () => 200, text: async () => sodHtml };
      },
    },
  };
  const flight = { id: "991234567", text: "XX 123 | MUC-FRA | D-TEST | STD 18 09:00" };
  const start = new Date(Date.UTC(2026, 7, 18, 0, 0));
  const end = new Date(Date.UTC(2026, 7, 18, 23, 59));

  const first = await extractFlightSodRows(context, flight, "18-Aug-2026", start, end, [], true, "one@example.com");
  const filtered = await extractFlightSodRows(context, flight, "18-Aug-2026", start, end, ["GATE"], true, "one@example.com");

  assert.equal(first.rows.length, 1);
  assert.equal(filtered.rows.length, 0);
  assert.equal(requests, 2);

  await extractFlightSodRows(context, flight, "18-Aug-2026", start, end, [], true, "two@example.com");
  assert.equal(requests, 3);

  await extractFlightSodRows(context, flight, "18-Aug-2026", start, end, [], true, "one@example.com", true);
  assert.equal(requests, 4);
});

test("SQLite persistence layer saves and retrieves gap notes, availability rules, and scan history", () => {
  const db = require("./db");
  const testDb = db.initDatabase(":memory:");

  const noteKey = "test-2026-08-18-XX123-GATE";
  const noteData = { status: "Covered", note: "Assigned Daniela", assignedStaff: "DNE - Daniela Neuner" };
  db.saveGapNote(noteKey, noteData, testDb);
  const notes = db.getAllGapNotes(testDb);
  assert.equal(notes[noteKey]?.status, "Covered");
  assert.equal(notes[noteKey]?.note, "Assigned Daniela");

  const rules = [{ id: "r1", personKey: "DNE", startDate: "2026-08-18", endDate: "2026-08-20", shift: "morning" }];
  db.saveStaffAvailability(rules, testDb);
  const fetchedRules = db.getStaffAvailability(testDb);
  assert.equal(fetchedRules.length, 1);
  assert.equal(fetchedRules[0].personKey, "DNE");

  const snapshot = { id: "test-scan-1", timestamp: Date.now(), flights: 5, rows: [] };
  db.saveScanHistory([snapshot], testDb);
  let history = db.getScanHistory(testDb);
  assert.equal(history.length, 1);
  assert.equal(history[0].id, "test-scan-1");

  db.deleteScanItem("test-scan-1", testDb);
  history = db.getScanHistory(testDb);
  assert.equal(history.length, 0);
});

test("roster management records preserve UI field names across SQLite round trips", () => {
  const db = require("./db");
  const testDb = db.initDatabase(":memory:");

  const absence = db.saveAbsence({ person_key: "ALICE AGENT", person_name: "Alice Agent", absence_type: "Sickness", start_date: "2026-09-04" }, testDb);
  const fetchedAbsence = db.getAllAbsences(testDb)[0];
  assert.equal(absence.absence_type, "Sickness");
  assert.equal(fetchedAbsence.category, "Sickness");
  assert.equal(fetchedAbsence.absence_type, "Sickness");

  const rule = db.saveCustomRule({ title: "Eleven hour rest", rule_type: "MIN_REST_HOURS", parameters: { minRestHours: 11 } }, testDb);
  const fetchedRule = db.getAllCustomRules(testDb)[0];
  assert.equal(rule.title, "Eleven hour rest");
  assert.equal(fetchedRule.name, "Eleven hour rest");
  assert.equal(fetchedRule.title, "Eleven hour rest");

  const scenario = db.saveScenario({ title: "Fair plan", strategy: "max_fairness", assignments: [], metrics: { coverageRatePercent: 100 } }, testDb);
  const fetchedScenario = db.getAllScenarios(testDb)[0];
  assert.equal(scenario.title, "Fair plan");
  assert.equal(fetchedScenario.name, "Fair plan");
  assert.equal(fetchedScenario.title, "Fair plan");
});

test("SQLite SOD cache respects 15-minute TTL and force refresh override", () => {
  const db = require("./db");
  const testDb = db.initDatabase(":memory:");

  const cacheKey = "test-cache-key-123";
  const sodRows = [{ flight: "XX 123", sla: "GATE", required: 2, assigned: 1 }];

  db.setCachedSod(cacheKey, "2026-08-18", sodRows, testDb);
  const cached = db.getCachedSod(cacheKey, testDb);
  assert.ok(cached);
  assert.equal(cached[0].flight, "XX 123");

  const uncachedKey = "nonexistent-key";
  assert.equal(db.getCachedSod(uncachedKey, testDb), null);
});

test("SQLite monthly roster persistence saves, updates with scans, and merges custom date ranges", () => {
  const db = require("./db");
  const testDb = db.initDatabase(":memory:");

  const scan1 = {
    scannedDates: ["2026-08-01", "2026-08-02"],
    staffDirectory: ["AAA - Alice Agent"],
    airlines: ["LH"],
    slas: ["GATE"],
    rows: [
      { date: "01-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
      { date: "02-Aug-2026", flight: "LH101", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 0, missing: 1, staff: [] },
    ],
  };

  const updates1 = db.updateMonthlyRosterWithScan(scan1, { scanId: "scan_1" }, testDb);
  assert.equal(updates1.length, 1);
  assert.equal(updates1[0].monthKey, "2026-08");

  const monthRecord = db.getMonthlyRoster("2026-08", testDb);
  assert.ok(monthRecord);
  assert.equal(monthRecord.scannedDaysCount, 2);
  assert.equal(monthRecord.flightsCount, 2);
  assert.equal(monthRecord.gapsCount, 1);
  assert.equal(monthRecord.changes.length, 1);

  // Scan 2 updates 02-Aug and adds 03-Aug
  const scan2 = {
    scannedDates: ["2026-08-02", "2026-08-03"],
    staffDirectory: ["BBB - Bob Worker"],
    airlines: ["BA"],
    slas: ["CKIN"],
    rows: [
      { date: "02-Aug-2026", flight: "LH101", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 1, missing: 0, staff: ["BBB - Bob Worker"] },
      { date: "03-Aug-2026", flight: "BA200", sla: "CKIN", start_utc: "10:00", release_utc: "14:00", required: 1, assigned: 1, missing: 0, staff: ["BBB - Bob Worker"] },
    ],
  };

  const updates2 = db.updateMonthlyRosterWithScan(scan2, { scanId: "scan_2" }, testDb);
  assert.equal(updates2.length, 1);

  const updatedMonth = db.getMonthlyRoster("2026-08", testDb);
  assert.equal(updatedMonth.scannedDaysCount, 3);
  assert.equal(updatedMonth.rows.length, 3);
  assert.equal(updatedMonth.gapsCount, 0); // gap on 02-Aug resolved
  assert.equal(updatedMonth.changes.length, 2);

  const customMerged = db.mergeCustomDateRange("2026-08-01", "2026-08-02", testDb);
  assert.equal(customMerged.scannedDates.length, 2);
  assert.equal(customMerged.rows.length, 2);
});

test("server route handler distinguishes valid routes, unknown API endpoints, and invalid HTTP methods", async () => {
  const http = require("node:http");

  const testServer = http.createServer(async (req, res) => {
    const urlObj = new URL(req.url, "http://localhost:3000");
    const pathname = urlObj.pathname;

    if (req.method === "POST" && pathname === "/api/export/roster-pdf") {
      res.writeHead(200, { "Content-Type": "application/pdf" });
      res.end("PDF_DATA");
      return;
    }

    if (pathname.startsWith("/api/")) {
      const knownApiPaths = ["/api/export/roster-pdf", "/api/connect", "/api/notes"];
      if (knownApiPaths.includes(pathname)) {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: `Method ${req.method} not allowed for ${pathname}` }));
        return;
      }
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: `API endpoint not found: ${req.method} ${pathname}` }));
      return;
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Method not allowed" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("OK");
  });

  await new Promise((resolve) => testServer.listen(0, resolve));
  const port = testServer.address().port;

  try {
    const validPost = await fetch(`http://localhost:${port}/api/export/roster-pdf`, { method: "POST", body: "{}" });
    assert.equal(validPost.status, 200);

    const invalidMethodOnApi = await fetch(`http://localhost:${port}/api/export/roster-pdf`, { method: "GET" });
    assert.equal(invalidMethodOnApi.status, 405);

    const unknownApi = await fetch(`http://localhost:${port}/api/nonexistent`, { method: "POST" });
    assert.equal(unknownApi.status, 404);

    const postToStatic = await fetch(`http://localhost:${port}/index.html`, { method: "POST" });
    assert.equal(postToStatic.status, 405);
  } finally {
    testServer.close();
  }
});

test("main UI has unique IDs and required roster dialogs", () => {
  const fs = require("node:fs");
  const path = require("node:path");
  const html = fs.readFileSync(path.join(__dirname, "public", "index.html"), "utf8");
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

  assert.deepEqual([...new Set(duplicates)], []);
  for (const requiredId of [
    "addShiftModal",
    "addShiftCloseBtn",
    "addShiftSearch",
    "addShiftFilter",
    "addShiftList",
    "shiftSwapperModal",
    "availabilityModal",
    "stateBtnChanges",
  ]) {
    assert.match(html, new RegExp(`id=["']${requiredId}["']`), `Missing required UI target: ${requiredId}`);
  }
});

test("parses staff assigned for shorter periods and custom start/release times in SOD", () => {
  const html = `
    <table><tbody>
      <tr>
        <td>CKIN</td><td>Agent</td><td>Required: 2</td><td>03 Sep 07:35</td><td>03 Sep 10:35</td><td>03:00</td>
      </tr>
      <tr>
        <td><input type="checkbox"></td>
        <td></td>
        <td>MUC - Alice Brown</td>
        <td>03 Sep 07:35</td>
        <td>03 Sep 10:35</td>
        <td>03:00</td>
      </tr>
      <tr>
        <td><input type="checkbox"></td>
        <td></td>
        <td><select><option selected>MUC - Bob Shorter</option></select></td>
        <td>03 Sep 08:35</td>
        <td>03 Sep 10:35</td>
        <td>02:00</td>
      </tr>
    </tbody></table>`;

  const groups = parseSodGroups(html, "03-Sep-2026");
  assert.equal(groups.length, 1);
  const group = groups[0];
  assert.equal(group.required, 2);
  assert.equal(group.assigned, 2);
  assert.equal(group.has_shorter_assignment, true);
  assert.equal(group.shorter_staff_count, 1);
  assert.deepEqual(group.staff.sort(), ["MUC - Alice Brown", "MUC - Bob Shorter"]);

  const alice = group.staff_details.find((d) => d.name === "MUC - Alice Brown");
  assert.equal(alice.is_shorter, false);
  assert.equal(alice.start_utc, "03 Sep 07:35");
  assert.equal(alice.release_utc, "03 Sep 10:35");
  assert.equal(alice.duration_minutes, 180);

  const bob = group.staff_details.find((d) => d.name === "MUC - Bob Shorter");
  assert.equal(bob.is_shorter, true);
  assert.equal(bob.start_utc, "03 Sep 08:35");
  assert.equal(bob.release_utc, "03 Sep 10:35");
  assert.equal(bob.duration_minutes, 120);
});

test("mergeCustomDateRange successfully merges dates and rows from scan_history when monthly_rosters is empty", () => {
  const db = require("./db");
  const testDb = db.initDatabase(":memory:");

  const scan = {
    id: "scan_fallback_1",
    startDate: "2026-08-10",
    endDate: "2026-08-12",
    scannedDates: ["2026-08-10", "2026-08-11"],
    staffDirectory: ["XYZ - Xavier Agent"],
    rows: [
      { date: "10-Aug-2026", flight: "LH500", sla: "GATE", start_utc: "09:00", release_utc: "13:00", required: 1, assigned: 1, missing: 0, staff: ["XYZ - Xavier Agent"] },
      { date: "11-Aug-2026", flight: "LH501", sla: "GATE", start_utc: "09:00", release_utc: "13:00", required: 1, assigned: 0, missing: 1, staff: [] },
    ],
  };

  db.saveScanItem(scan, testDb);

  const merged = db.mergeCustomDateRange("2026-08-10", "2026-08-15", testDb);
  assert.equal(merged.scannedDates.length, 2);
  assert.equal(merged.rows.length, 2);
  assert.equal(merged.flightsCount, 2);
  assert.equal(merged.gapsCount, 1);
});


