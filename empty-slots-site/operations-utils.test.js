const test = require("node:test");
const assert = require("node:assert/strict");
const OperationsUtils = require("./public/operations-utils");

const baseDuty = {
  date: "18-Aug-2026", flight_id: "1", flight: "LH100", sla: "GATE",
  start_utc: "10:00", release_utc: "11:00", required: 2, assigned: 1, missing: 1,
  staff: ["AAA - Alice Agent"],
};

test("gap candidates include fully free staff and reject overlapping staff", () => {
  const rows = [
    baseDuty,
    { ...baseDuty, flight_id: "2", flight: "LH200", start_utc: "09:00", release_utc: "09:45", required: 1, assigned: 1, missing: 0, staff: ["BBB - Bob Before"] },
    { ...baseDuty, flight_id: "3", flight: "LH300", start_utc: "10:30", release_utc: "12:00", required: 1, assigned: 1, missing: 0, staff: ["CCC - Carol Conflict"] },
  ];
  const directory = ["AAA - Alice Agent", "BBB - Bob Before", "CCC - Carol Conflict", "DDD - Dana Free"];
  const candidates = OperationsUtils.rankCandidates(baseDuty, rows, directory, { maxGapMinutes: 120, excludedKey: "ALICE AGENT" });

  assert.deepEqual(candidates.map((person) => person.name), ["Bob Before", "Dana Free"]);
  assert.equal(candidates[0].connectionGapMinutes, 15);
  assert.equal(candidates[1].freeAllDay, true);
});

test("coverage simulation recalculates gaps, workload, short turnarounds, and planned conflicts", () => {
  const rows = [
    baseDuty,
    { ...baseDuty, flight_id: "2", flight: "LH200", start_utc: "08:00", release_utc: "09:45", required: 1, assigned: 1, missing: 0, staff: ["BBB - Bob Before"] },
    { ...baseDuty, flight_id: "3", flight: "LH300", start_utc: "10:30", release_utc: "11:30", required: 1, assigned: 0, missing: 1, staff: [] },
  ];
  const simulation = OperationsUtils.simulateCoverage(
    baseDuty,
    { initials: "BBB", name: "Bob Before" },
    rows,
    [{ rowKey: OperationsUtils.rowKey(rows[2]), candidateKey: "BOB BEFORE", candidateLabel: "BBB - Bob Before" }]
  );

  assert.equal(simulation.target.missing, 0);
  assert.equal(simulation.beforeMissing, 2);
  assert.equal(simulation.afterMissing, 0);
  assert.equal(simulation.dayDutyCount, 3);
  assert.equal(simulation.totalMinutes, 225);
  assert.equal(simulation.shortGaps[0].minutes, 15);
  assert.equal(simulation.conflicts.length, 1);
});

test("airline roster groups allocations by workday, airline, and flight", () => {
  const rows = [
    { ...baseDuty, flight_id: "lh1", flight: "LH 100", route: "MUC-FRA", sla: "GATE", required: 2, assigned: 1, missing: 1, staff: ["AAA - Alice Agent"] },
    { ...baseDuty, flight_id: "lh1", flight: "LH 100", route: "MUC-FRA", sla: "CKIN", start_utc: "09:00", release_utc: "10:00", required: 1, assigned: 1, missing: 0, staff: ["BBB - Bob Before"] },
    { ...baseDuty, flight_id: "xq1", flight: "XQ 715", route: "MUC-AYT", sla: "GATE", required: 1, assigned: 1, missing: 0, staff: ["CCC - Carol Crew"] },
  ];
  const windows = [{ isoDate: "2026-08-18", start: new Date("2026-08-18T00:00:00Z"), end: new Date("2026-08-19T00:00:00Z") }];
  const days = OperationsUtils.buildAirlineRoster(rows, windows);

  assert.equal(days[0].flightCount, 2);
  assert.deepEqual(days[0].airlines.map((airline) => airline.code), ["LH", "XQ"]);
  assert.equal(days[0].airlines[0].flights[0].duties.length, 2);
  assert.equal(days[0].airlines[0].periods[0].label, "Morning");
  assert.equal(days[0].airlines[0].required, 3);
  assert.equal(days[0].airlines[0].missing, 1);
  assert.deepEqual(OperationsUtils.buildAirlineRoster(rows, windows, { query: "Carol" })[0].airlines.map((airline) => airline.code), ["XQ"]);
});

test("daily flight schedule is chronological and does not group by airline or direction", () => {
  const rows = [
    { ...baseDuty, flight_id: "late", flight: "LH 200", direction: "Departure", scheduled_utc: "15:20", route: "MUC-FRA" },
    { ...baseDuty, flight_id: "early", flight: "XQ 100", direction: "Arrival", scheduled_utc: "06:10", route: "AYT-MUC" },
  ];
  const windows = [{ isoDate: "2026-08-18", start: new Date("2026-08-18T00:00:00Z"), end: new Date("2026-08-19T00:00:00Z") }];
  const days = OperationsUtils.buildFlightSchedule(rows, windows);

  assert.deepEqual(days[0].flights.map((flight) => flight.flight), ["XQ 100", "LH 200"]);
  assert.equal(days[0].flightCount, 2);
  assert.deepEqual(OperationsUtils.buildFlightSchedule(rows, windows, { direction: "arr" })[0].flights.map((flight) => flight.flight), ["XQ 100"]);
  assert.deepEqual(OperationsUtils.buildFlightSchedule(rows, windows, { airline: "LH", coverage: "gaps" })[0].flights.map((flight) => flight.flight), ["LH 200"]);
});

test("automatic planner honors SLA selection, availability, buffers, and hour limits", () => {
  const gaps = [
    { ...baseDuty, flight_id: "gate", flight: "LH100", sla: "GATE", start_utc: "10:00", release_utc: "12:00", staff: [], assigned: 0, missing: 1 },
    { ...baseDuty, flight_id: "ckin", flight: "LH101", sla: "CKIN", start_utc: "12:15", release_utc: "14:15", staff: [], assigned: 0, missing: 1 },
  ];
  const directory = ["BBB - Bob Before", "CCC - Carol Crew"];
  const windows = [{ isoDate: "2026-08-18", start: new Date("2026-08-18T00:00:00Z"), end: new Date("2026-08-19T00:00:00Z") }];
  const plan = OperationsUtils.buildAutoPlan(gaps, directory, ["BOB BEFORE", "CAROL CREW"], windows, {
    allowedSlas: ["GATE"],
    bufferMinutes: 30,
    maxDutyHours: 8,
    maxSpanHours: 10,
    breakAfterHours: 6,
    breakMinutes: 30,
    maxWeeklyHours: 40,
    maxWorkingDaysPerWeek: 5,
    maxMonthlyHours: 160,
    availabilityRules: [{ personKey: "BOB BEFORE", startDate: "2026-08-18", endDate: "2026-08-18", shift: "unavailable" }],
  });

  assert.equal(plan.requestedPositions, 1);
  assert.equal(plan.assignments.length, 1);
  assert.equal(plan.assignments[0].person.name, "Carol Crew");
});

test("automatic planner enforces the 10-hour weekly Minijob limit", () => {
  const rows = [
    { ...baseDuty, date: "17-Aug-2026", flight_id: "existing", start_utc: "08:00", release_utc: "16:00", staff: ["DDD - Dana Duty"], assigned: 1, missing: 0 },
    { ...baseDuty, date: "18-Aug-2026", flight_id: "gap", start_utc: "08:00", release_utc: "12:00", staff: [], assigned: 0, missing: 1 },
  ];
  const windows = [{ isoDate: "2026-08-18", start: new Date("2026-08-18T00:00:00Z"), end: new Date("2026-08-19T00:00:00Z") }];
  const plan = OperationsUtils.buildAutoPlan(rows, ["DDD - Dana Duty"], ["DANA DUTY"], windows, {
    maxWeeklyHours: 40,
    maxMonthlyHours: 160,
    staffContracts: { "DANA DUTY": "MJ" },
  });

  assert.equal(plan.assignments.length, 0);
  assert.equal(plan.unfilled.length, 1);
});

test("availability rules can target exact non-consecutive calendar dates", () => {
  const rule = [{
    personKey: "BOB BEFORE",
    startDate: "2026-08-01",
    endDate: "2026-08-03",
    dates: ["2026-08-01", "2026-08-03"],
    shift: "unavailable",
  }];
  const first = { ...baseDuty, date: "01-Aug-2026" };
  const middle = { ...baseDuty, date: "02-Aug-2026" };

  assert.equal(OperationsUtils.isAvailableForDuty("BOB BEFORE", first, rule), false);
  assert.equal(OperationsUtils.isAvailableForDuty("BOB BEFORE", middle, rule), true);
});

test("period workload enforces weekly hours, monthly hours, and working days", () => {
  const rows = [0, 1, 2].map((offset) => ({
    ...baseDuty,
    flight_id: `day-${offset}`,
    date: `${18 + offset}-Aug-2026`,
    start_utc: "08:00",
    release_utc: "16:00",
  }));
  const result = OperationsUtils.inspectPeriodWorkload(rows, { maxWeeklyHours: 20, maxWorkingDaysPerWeek: 2, maxMonthlyHours: 20 });

  assert.equal(result.valid, false);
  assert.deepEqual(result.violations.sort(), ["monthlyHours", "weeklyDays", "weeklyHours"]);
});

test("analytics totals missing staff-hours and detects overlapping allocations", () => {
  const rows = [
    baseDuty,
    { ...baseDuty, flight_id: "4", flight: "LH400", start_utc: "10:30", release_utc: "12:00", required: 1, assigned: 1, missing: 0 },
  ];
  const analytics = OperationsUtils.buildAnalytics(rows, ["AAA - Alice Agent"]);

  assert.equal(analytics.gapGroups, 1);
  assert.equal(analytics.missingHours, 1);
  assert.ok(analytics.warnings.some((warning) => warning.type === "Overlap"));
});

test("scan comparison reports opened, resolved, and changed gaps", () => {
  const previous = { gaps: [{ key: "a", missing: 1 }, { key: "b", missing: 1, required: 2, assigned: 1, staff: ["AAA - Alice Agent"] }, { key: "c", missing: 1, required: 2, assigned: 1 }] };
  const current = { gaps: [{ key: "b", missing: 1, required: 2, assigned: 1, staff: ["BBB - Bob Agent"] }, { key: "c", missing: 2, required: 3, assigned: 1 }, { key: "d", missing: 1 }] };
  const result = OperationsUtils.compareSnapshots(current, previous);

  assert.deepEqual(result.opened.map((gap) => gap.key), ["d"]);
  assert.deepEqual(result.resolved.map((gap) => gap.key), ["a"]);
  assert.deepEqual(result.changed.map((gap) => gap.key), ["b", "c"]);
});

test("scan comparison restricts analysis to overlapping dates when snapshots have different date ranges", () => {
  const previous = {
    rows: [
      { date: "18-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "10:00", required: 1, assigned: 0, missing: 1 },
      { date: "19-Aug-2026", flight: "LH200", sla: "GATE", start_utc: "10:00", release_utc: "12:00", required: 1, assigned: 0, missing: 1 },
    ],
    gaps: [
      { key: "18-Aug-2026|LH100|GATE", date: "18-Aug-2026", flight: "LH100", sla: "GATE", required: 1, assigned: 0, missing: 1 },
      { key: "19-Aug-2026|LH200|GATE", date: "19-Aug-2026", flight: "LH200", sla: "GATE", required: 1, assigned: 0, missing: 1 },
    ],
  };

  const current = {
    rows: [
      // 18-Aug gap is resolved in current scan
      { date: "18-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "10:00", required: 1, assigned: 1, missing: 0 },
      { date: "19-Aug-2026", flight: "LH200", sla: "GATE", start_utc: "10:00", release_utc: "12:00", required: 1, assigned: 0, missing: 1 },
      // 20-Aug is extra in current scan (should be ignored since previous scan did not scan 20-Aug)
      { date: "20-Aug-2026", flight: "LH300", sla: "GATE", start_utc: "14:00", release_utc: "16:00", required: 1, assigned: 0, missing: 1 },
    ],
    gaps: [
      { key: "19-Aug-2026|LH200|GATE", date: "19-Aug-2026", flight: "LH200", sla: "GATE", required: 1, assigned: 0, missing: 1 },
      { key: "20-Aug-2026|LH300|GATE", date: "20-Aug-2026", flight: "LH300", sla: "GATE", required: 1, assigned: 0, missing: 1 },
    ],
  };

  const result = OperationsUtils.compareSnapshots(current, previous);

  assert.deepEqual(result.overlappingDates.sort(), ["18-Aug-2026", "19-Aug-2026"]);
  assert.equal(result.opened.length, 0); // 20-Aug gap is NOT flagged as opened
  assert.deepEqual(result.resolved.map((g) => g.key), ["18-Aug-2026|LH100|GATE"]);
});

test("duty-hours overview splits weekend and public-holiday minutes in Berlin time", () => {
  const rows = [
    { ...baseDuty, flight_id: "sun", date: "16-Aug-2026", start_utc: "08:00", release_utc: "10:30" },
    { ...baseDuty, flight_id: "holiday", date: "25-Dec-2026", start_utc: "07:00", release_utc: "09:00" },
  ];
  const windows = [
    { start: new Date("2026-08-16T00:00:00Z"), end: new Date("2026-08-17T00:00:00Z") },
    { start: new Date("2026-12-25T00:00:00Z"), end: new Date("2026-12-26T00:00:00Z") },
  ];
  const totals = OperationsUtils.summarizeDutyHours(rows, windows, new Set(["2026-12-25"]));

  assert.equal(totals.dutyCount, 2);
  assert.equal(totals.totalMinutes, 270);
  assert.equal(totals.sundayMinutes, 150);
  assert.equal(totals.weekdayMinutes, 120);
  assert.equal(totals.holidayMinutes, 120);
});

test("autoAdjustRoster resolves short break violations by reassigning duties to best movement candidates", () => {
  const rows = [
    { ...baseDuty, flight_id: "d1", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "10:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
    { ...baseDuty, flight_id: "d2", flight: "LH101", sla: "GATE", start_utc: "10:15", release_utc: "12:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
  ];
  const directory = ["AAA - Alice Agent", "BBB - Bob Available"];

  const result = OperationsUtils.autoAdjustRoster(rows, directory, { minBreakMinutes: 30 });

  assert.equal(result.initialViolationsCount, 1);
  assert.equal(result.reassignments.length, 1);
  assert.equal(result.reassignments[0].fromPerson.name, "Alice Agent");
  assert.equal(result.reassignments[0].toPerson.name, "Bob Available");
  assert.equal(result.resolvedViolationsCount, 1);
  assert.equal(result.remainingViolationsCount, 0);
  assert.deepEqual(result.adjustedRows[1].staff, ["BBB - Bob Available"]);
});

test("autoAdjustRoster respects resolveConflictType filters", () => {
  const rows = [
    { ...baseDuty, flight_id: "d1", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "10:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
    { ...baseDuty, flight_id: "d2", flight: "LH101", sla: "GATE", start_utc: "10:15", release_utc: "12:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
  ];
  const directory = ["AAA - Alice Agent", "BBB - Bob Available"];

  // When conflictType is overlaps_only, 15m break gap (not overlap) should be ignored
  const overlapsOnlyResult = OperationsUtils.autoAdjustRoster(rows, directory, { minBreakMinutes: 30, resolveConflictType: "overlaps_only" });
  assert.equal(overlapsOnlyResult.reassignments.length, 0);
  assert.equal(overlapsOnlyResult.initialViolationsCount, 0);

  // When conflictType is breaks_only or both, it should be resolved
  const breaksOnlyResult = OperationsUtils.autoAdjustRoster(rows, directory, { minBreakMinutes: 30, resolveConflictType: "breaks_only" });
  assert.equal(breaksOnlyResult.reassignments.length, 1);
});

test("validateShiftSwap validates clean 2-way swaps, 1-way transfers, and flags conflicts", () => {
  const rows = [
    { ...baseDuty, flight_id: "s1", flight: "LH100", date: "18-Aug-2026", start_utc: "08:00", release_utc: "12:00", staff: ["AAA - Alice Agent"] },
    { ...baseDuty, flight_id: "s2", flight: "LH200", date: "18-Aug-2026", start_utc: "13:00", release_utc: "17:00", staff: ["BBB - Bob Before"] },
    { ...baseDuty, flight_id: "s3", flight: "LH300", date: "18-Aug-2026", start_utc: "11:00", release_utc: "15:00", staff: ["CCC - Carol Crew"] },
  ];
  const directory = ["AAA - Alice Agent", "BBB - Bob Before", "CCC - Carol Crew", "DDD - Dana Free"];

  // 1. Clean 2-way swap between Alice (08-12) and Bob (13-17)
  const cleanSwap = OperationsUtils.validateShiftSwap(
    rows[0],
    { key: "ALICE AGENT", name: "Alice Agent" },
    rows[1],
    { key: "BOB BEFORE", name: "Bob Before" },
    rows,
    directory,
    { maxDutyHours: 8, bufferMinutes: 30 }
  );
  assert.equal(cleanSwap.valid, true);
  assert.equal(cleanSwap.isTwoWaySwap, true);
  assert.equal(cleanSwap.staffA.valid, true);
  assert.equal(cleanSwap.staffB.valid, true);

  // 2. Conflicting 2-way swap: If Carol already has duty 11:00-15:00, swapping Alice's 08:00-12:00 to Carol creates an overlap (11:00-12:00)
  const conflictSwap = OperationsUtils.validateShiftSwap(
    rows[0],
    { key: "ALICE AGENT", name: "Alice Agent" },
    null, // Transfer duty 1 to Carol who has duty 3
    { key: "CAROL CREW", name: "Carol Crew" },
    rows,
    directory,
    { maxDutyHours: 8, bufferMinutes: 30 }
  );
  assert.equal(conflictSwap.valid, false);
  assert.equal(conflictSwap.isTwoWaySwap, false);
  assert.equal(conflictSwap.staffB.valid, false);
  assert.ok(conflictSwap.staffB.violations.some((v) => v.includes("overlap")));

  const transfer = OperationsUtils.validateShiftSwap(
    rows[0],
    { key: "ALICE AGENT", name: "Alice Agent" },
    null,
    { key: "DANA FREE", name: "Dana Free" },
    rows,
    directory,
    { maxDutyHours: 8, bufferMinutes: 30 }
  );
  assert.equal(transfer.valid, true);
  assert.equal(transfer.isTwoWaySwap, false);
  assert.equal(transfer.staffA.simulatedDutiesCount, 0);
  assert.equal(transfer.staffB.simulatedDutiesCount, 1);
});

test("comparePersonRosters provides staff-centric audit details, replacement tracking, and workload deltas", () => {
  const previous = {
    staffDirectory: ["AAA - Alice Agent", "BBB - Bob Before", "CCC - Carol Crew"],
    rows: [
      { ...baseDuty, flight_id: "1", flight: "LH100", start_utc: "08:00", release_utc: "12:00", staff: ["AAA - Alice Agent"] },
      { ...baseDuty, flight_id: "2", flight: "LH200", start_utc: "13:00", release_utc: "17:00", staff: ["BBB - Bob Before"] },
    ],
  };

  const current = {
    staffDirectory: ["AAA - Alice Agent", "BBB - Bob Before", "CCC - Carol Crew"],
    rows: [
      // Flight 1: Alice was replaced by Carol Crew
      { ...baseDuty, flight_id: "1", flight: "LH100", start_utc: "08:00", release_utc: "12:00", staff: ["CCC - Carol Crew"] },
      // Flight 2: Bob's shift timing extended by 1 hour (13:00-18:00)
      { ...baseDuty, flight_id: "2", flight: "LH200", start_utc: "13:00", release_utc: "18:00", staff: ["BBB - Bob Before"] },
      // Flight 3: New duty added for Alice
      { ...baseDuty, flight_id: "3", flight: "LH300", start_utc: "19:00", release_utc: "21:00", staff: ["AAA - Alice Agent"] },
    ],
  };

  const audit = OperationsUtils.comparePersonRosters(current, previous);

  assert.equal(audit.allStaff.length, 3);
  assert.deepEqual(audit.allStaff.map((s) => s.name), ["Alice Agent", "Bob Before", "Carol Crew"]);

  // Test Alice Agent Audit
  const aliceSummary = audit.getStaffAuditSummary("ALICE AGENT");
  assert.equal(aliceSummary.prevTotalHours, 4.0);
  assert.equal(aliceSummary.currTotalHours, 2.0);
  assert.equal(aliceSummary.netHoursDelta, -2.0);
  assert.equal(aliceSummary.replacedCount, 1);
  assert.equal(aliceSummary.addedCount, 1);

  const aliceReplacedEntry = aliceSummary.entries.find((e) => e.personKind === "REPLACED");
  assert.ok(aliceReplacedEntry);
  assert.ok(aliceReplacedEntry.personDetail.includes("Replaced by: Carol Crew"));

  // Test Carol Crew Audit (Replaced In)
  const carolSummary = audit.getStaffAuditSummary("CAROL CREW");
  assert.equal(carolSummary.prevTotalHours, 0);
  assert.equal(carolSummary.currTotalHours, 4.0);
  assert.equal(carolSummary.netHoursDelta, 4.0);
  assert.equal(carolSummary.replacedCount, 1);
  const carolReplacedEntry = carolSummary.entries.find((e) => e.personKind === "REPLACED");
  assert.ok(carolReplacedEntry);
  assert.ok(carolReplacedEntry.personDetail.includes("Replaced: Alice Agent"));

  // Test Bob Before Audit (Hours Modified)
  const bobSummary = audit.getStaffAuditSummary("BOB BEFORE");
  assert.equal(bobSummary.prevTotalHours, 4.0);
  assert.equal(bobSummary.currTotalHours, 5.0);
  assert.equal(bobSummary.netHoursDelta, 1.0);
  assert.equal(bobSummary.modifiedHoursCount, 1);
});

test("comparePersonRosters matches duties by Day of Week when scan dates do not overlap", () => {
  const previous = {
    id: "prev-aug",
    startDate: "2026-08-18", // Tuesday
    endDate: "2026-08-18",
    rows: [
      { date: "18-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "12:00", durationMinutes: 240, staff: ["AAA - Alice Agent"] },
    ],
  };

  const current = {
    id: "curr-sep",
    startDate: "2026-09-01", // Tuesday (2 weeks later, no date overlap)
    endDate: "2026-09-01",
    rows: [
      { date: "01-Sep-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "12:00", durationMinutes: 240, staff: ["BBB - Bob Agent"] },
    ],
  };

  const audit = OperationsUtils.comparePersonRosters(current, previous);
  const aliceSummary = audit.getStaffAuditSummary("ALICE AGENT");
  assert.equal(aliceSummary.replacedCount, 1);
  assert.ok(aliceSummary.entries[0].personDetail.includes("Replaced by: Bob Agent"));

  const bobSummary = audit.getStaffAuditSummary("BOB AGENT");
  assert.equal(bobSummary.replacedCount, 1);
  assert.ok(bobSummary.entries[0].personDetail.includes("Replaced: Alice Agent"));
});

test("generates Google Flights airline logo URLs and HTML image elements", () => {
  assert.equal(
    OperationsUtils.getAirlineLogoUrl("LH"),
    "https://www.gstatic.com/flights/airline_logos/70px/LH.png"
  );
  assert.equal(
    OperationsUtils.getAirlineLogoUrl({ flight: "DE 1402" }, 35, true),
    "https://www.gstatic.com/flights/airline_logos/35px/dark/DE.png"
  );
  const img = OperationsUtils.getAirlineLogoImg("XQ", { size: 28 });
  assert.ok(img.includes('src="https://www.gstatic.com/flights/airline_logos/35px/XQ.png"'));
  assert.ok(img.includes('alt="XQ"'));
  assert.ok(img.includes('style="width:28px; height:28px;'));
});

test("contract hours limit supports PT, FT, and Minijob", () => {
  const ptLimit = OperationsUtils.getContractHoursLimit("ALICE", { ALICE: "PT" });
  assert.equal(ptLimit.contract, "PT");
  assert.equal(ptLimit.weeklyHours, 20);
  assert.equal(ptLimit.monthlyHours, 80);

  const defaultLimit = OperationsUtils.getContractHoursLimit("BOB", {});
  assert.equal(defaultLimit.contract, "PT");

  const ftLimit = OperationsUtils.getContractHoursLimit("CAROL", { CAROL: "FT" });
  assert.equal(ftLimit.contract, "FT");
  assert.equal(ftLimit.weeklyHours, 40);
  assert.equal(ftLimit.monthlyHours, 160);

  const minijobLimit = OperationsUtils.getContractHoursLimit("DANA", { DANA: "MJ" });
  assert.equal(minijobLimit.contract, "MJ");
  assert.equal(minijobLimit.weeklyHours, 10);
  assert.equal(minijobLimit.monthlyHours, 40);
});

test("German break compliance flags 8-hour continuous shifts without required break", () => {
  // 8-hour continuous duty (08:00 to 16:00) with no break
  const continuous8h = [{ date: "18-Aug-2026", start_utc: "08:00", release_utc: "16:00" }];
  const inspContinuous = OperationsUtils.inspectDaySchedule(continuous8h, { breakAfterHours: 6, breakMinutes: 30, maxDutyHours: 8 });
  assert.equal(inspContinuous.valid, false);
  assert.ok(inspContinuous.violations.includes("break"));

  // 8-hour duty split into two 4-hour shifts with a 30-min break (08:00-12:00, 12:30-16:30)
  const split8hWithBreak = [
    { date: "18-Aug-2026", start_utc: "08:00", release_utc: "12:00" },
    { date: "18-Aug-2026", start_utc: "12:30", release_utc: "16:30" }
  ];
  const inspBreak = OperationsUtils.inspectDaySchedule(split8hWithBreak, { breakAfterHours: 6, breakMinutes: 30, maxDutyHours: 8 });
  assert.equal(inspBreak.valid, true);
  assert.equal(inspBreak.violations.length, 0);
});

test("buildAutoPlan balances Sunday shifts equally among available staff", () => {
  // 16-Aug-2026 and 23-Aug-2026 are Sundays
  const rows = [
    { date: "16-Aug-2026", flight: "LH50", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
    { date: "23-Aug-2026", flight_id: "sun1", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 0, missing: 1, staff: [] },
  ];
  const directory = ["AAA - Alice Agent", "BBB - Bob Worker"];
  const windows = [{ isoDate: "2026-08-23", start: new Date("2026-08-23T00:00:00Z"), end: new Date("2026-08-24T00:00:00Z") }];

  const plan = OperationsUtils.buildAutoPlan(rows, directory, ["ALICE AGENT", "BOB WORKER"], windows, {
    allowedSlas: ["GATE"],
    staffContracts: { "ALICE AGENT": "FT", "BOB WORKER": "PT" }
  });

  assert.equal(plan.assignments.length, 1);
  // Should select Bob Worker because Alice Agent already has a Sunday shift on 16-Aug
  assert.equal(plan.assignments[0].person.key, "BOB WORKER");
});

test("calculateStaffRequirements computes required FTE/PTE headcount and Sunday metrics", () => {
  const rows = [
    { date: "18-Aug-2026", flight: "LH100", required: 2, start_utc: "08:00", release_utc: "16:00" }, // Tue: 16 hrs total
    { date: "23-Aug-2026", flight: "LH200", required: 1, start_utc: "10:00", release_utc: "18:00" }, // Sun: 8 hrs total
  ];
  const directory = ["AAA - Alice Agent", "BBB - Bob Worker", "CCC - Carol Crew"];
  const reqs = OperationsUtils.calculateStaffRequirements(rows, directory, {
    staffContracts: { "ALICE AGENT": "FT", "BOB WORKER": "PT", "CAROL CREW": "PT" }
  });

  assert.equal(reqs.totalStaff, 3);
  assert.equal(reqs.ftCount, 1);
  assert.equal(reqs.ptCount, 2);
  assert.equal(reqs.totalDutyHours, 24);
  assert.equal(reqs.totalSundayHours, 8);
  assert.equal(reqs.sundayShiftCount, 1);
  assert.equal(reqs.monthlyStaffCapacityHours, 320); // (2*80) + (1*160) = 320
  assert.equal(reqs.fteNeeded, 0.15); // 24 / 160 = 0.15
  assert.equal(reqs.pteNeeded, 0.3); // 24 / 80 = 0.3
});

test("vacation availability rules block staff allocation during vacation periods", () => {
  const vacationRule = {
    personKey: "ALICE AGENT",
    startDate: "2026-08-15",
    endDate: "2026-08-25",
    shift: "vacation",
  };
  const rowInVacation = { date: "18-Aug-2026", start_utc: "08:00", release_utc: "16:00" };
  const rowOutsideVacation = { date: "28-Aug-2026", start_utc: "08:00", release_utc: "16:00" };

  assert.equal(OperationsUtils.isAvailableForDuty("ALICE AGENT", rowInVacation, [vacationRule]), false);
  assert.equal(OperationsUtils.isAvailableForDuty("ALICE AGENT", rowOutsideVacation, [vacationRule]), true);
});

test("autoAdjustRoster automatically reassigns shifts when available days or vacation rules change", () => {
  const rows = [
    { date: "18-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "14:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
  ];
  const directory = ["AAA - Alice Agent", "BBB - Bob Worker"];

  // Alice adds a vacation rule covering 18-Aug-2026
  const newAvailabilityRules = [
    { personKey: "ALICE AGENT", startDate: "2026-08-15", endDate: "2026-08-20", shift: "vacation" }
  ];

  const result = OperationsUtils.autoAdjustRoster(rows, directory, {
    availabilityRules: newAvailabilityRules,
  });

  assert.equal(result.reassignments.length, 1);
  assert.equal(result.reassignments[0].fromPerson.key, "ALICE AGENT");
  assert.equal(result.reassignments[0].toPerson.key, "BOB WORKER");
  assert.ok(result.reassignments[0].reason.includes("Resolved availability / vacation conflict"));
});

test("buildAutoPlan prioritizes consistent shift timing (Morning vs Evening comfort) over double shifts", () => {
  const rows = [
    // Alice has a morning shift on 18-Aug (08:00 - 12:00)
    { date: "18-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
    // An evening gap opens on 18-Aug (14:00 - 18:00)
    { date: "18-Aug-2026", flight_id: "eve1", flight: "DE200", sla: "GATE", start_utc: "14:00", release_utc: "18:00", required: 1, assigned: 0, missing: 1, staff: [] },
  ];
  const directory = ["AAA - Alice Agent", "BBB - Bob Worker"];
  const windows = [{ isoDate: "2026-08-18", start: new Date("2026-08-18T00:00:00Z"), end: new Date("2026-08-19T00:00:00Z") }];

  const plan = OperationsUtils.buildAutoPlan(rows, directory, ["ALICE AGENT", "BOB WORKER"], windows, {
    allowedSlas: ["GATE"],
  });

  assert.equal(plan.assignments.length, 1);
  // Should select Bob Worker for the evening shift to avoid giving Alice a mixed morning+evening double shift
  assert.equal(plan.assignments[0].person.key, "BOB WORKER");
});

test("hasOverlappingShifts detects overlapping duties correctly", () => {
  const cleanDuties = [
    { date: "18-Aug-2026", start_utc: "08:00", release_utc: "12:00" },
    { date: "18-Aug-2026", start_utc: "13:00", release_utc: "17:00" },
  ];
  const overlappingDuties = [
    { date: "18-Aug-2026", start_utc: "08:00", release_utc: "12:00" },
    { date: "18-Aug-2026", start_utc: "11:30", release_utc: "15:00" },
  ];

  assert.equal(OperationsUtils.hasOverlappingShifts(cleanDuties), false);
  assert.equal(OperationsUtils.hasOverlappingShifts(overlappingDuties), true);
});

test("buildFlightSchedule filters flights by overlapping shifts coverage", () => {
  const rows = [
    { ...baseDuty, flight_id: "f1", flight: "LH 100", scheduled_utc: "08:00", start_utc: "08:00", release_utc: "12:00", staff: ["AAA - Alice Agent"] },
    { ...baseDuty, flight_id: "f2", flight: "LH 200", scheduled_utc: "11:00", start_utc: "11:00", release_utc: "15:00", staff: ["AAA - Alice Agent"] },
    { ...baseDuty, flight_id: "f3", flight: "LH 300", scheduled_utc: "16:00", start_utc: "16:00", release_utc: "20:00", staff: ["BBB - Bob Clean"] },
  ];
  const windows = [{ isoDate: "2026-08-18", start: new Date("2026-08-18T00:00:00Z"), end: new Date("2026-08-19T00:00:00Z") }];

  const overlapsSchedule = OperationsUtils.buildFlightSchedule(rows, windows, { coverage: "overlaps" });
  assert.equal(overlapsSchedule[0].flights.length, 2);
  assert.deepEqual(overlapsSchedule[0].flights.map((f) => f.flight).sort(), ["LH 100", "LH 200"]);
});

test("duties for the same flight on the same date are not marked as overlaps", () => {
  const sameFlightDuties = [
    { date: "18-Aug-2026", flight: "LH 100", sla: "ARR", start_utc: "08:00", release_utc: "10:00" },
    { date: "18-Aug-2026", flight: "LH 100", sla: "DEP", start_utc: "09:30", release_utc: "11:30" },
  ];
  const differentFlightDuties = [
    { date: "18-Aug-2026", flight: "LH 100", sla: "ARR", start_utc: "08:00", release_utc: "10:00" },
    { date: "18-Aug-2026", flight: "LH 200", sla: "DEP", start_utc: "09:30", release_utc: "11:30" },
  ];

  assert.equal(OperationsUtils.hasOverlappingShifts(sameFlightDuties), false);
  assert.equal(OperationsUtils.hasOverlappingShifts(differentFlightDuties), true);
  
  const sameFlightInsp = OperationsUtils.inspectDaySchedule(sameFlightDuties);
  assert.equal(sameFlightInsp.violations.includes("overlap"), false);
  
  const diffFlightInsp = OperationsUtils.inspectDaySchedule(differentFlightDuties);
  assert.equal(diffFlightInsp.violations.includes("overlap"), true);
});

test("buildAirlineRoster and buildFlightSchedule support array of SLAs for multi-select filtering", () => {
  const rows = [
    { ...baseDuty, flight_id: "lh1", flight: "LH 100", sla: "GATE" },
    { ...baseDuty, flight_id: "lh2", flight: "LH 200", sla: "CKIN" },
    { ...baseDuty, flight_id: "lh3", flight: "LH 300", sla: "LOFO" },
  ];
  const windows = [{ isoDate: "2026-08-18", start: new Date("2026-08-18T00:00:00Z"), end: new Date("2026-08-19T00:00:00Z") }];

  const multiAirline = OperationsUtils.buildAirlineRoster(rows, windows, { sla: ["GATE", "LOFO"] });
  const flightsInMultiAirline = multiAirline[0].airlines.flatMap((a) => a.flights.map((f) => f.flight));
  assert.deepEqual(flightsInMultiAirline.sort(), ["LH 100", "LH 300"]);

  const multiSchedule = OperationsUtils.buildFlightSchedule(rows, windows, { sla: ["GATE", "CKIN"] });
  assert.deepEqual(multiSchedule[0].flights.map((f) => f.flight).sort(), ["LH 100", "LH 200"]);
});

test("autoAdjustRoster prioritizes and resolves overlapping shifts for staff", () => {
  const rows = [
    { date: "18-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "14:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
    { date: "18-Aug-2026", flight: "LH200", sla: "CKIN", start_utc: "12:00", release_utc: "18:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
  ];
  const directory = ["AAA - Alice Agent", "BBB - Bob Worker"];

  const result = OperationsUtils.autoAdjustRoster(rows, directory, {
    resolveConflictType: "both",
    minBreakMinutes: 30,
  });

  assert.equal(result.reassignments.length, 1);
  assert.equal(result.reassignments[0].fromPerson.key, "ALICE AGENT");
  assert.equal(result.reassignments[0].toPerson.key, "BOB WORKER");
  assert.ok(result.reassignments[0].reason.includes("Resolved overlap"));
});

test("autoAdjustRoster respects overlaps_only mode by resolving overlaps while ignoring break violations", () => {
  const rows = [
    // Overlapping shift pair for Alice
    { date: "18-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "14:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
    { date: "18-Aug-2026", flight: "LH200", sla: "CKIN", start_utc: "12:00", release_utc: "18:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
    // Short break pair for Bob (15 min gap < 30 min minBreak)
    { date: "18-Aug-2026", flight: "LH300", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 1, missing: 0, staff: ["BBB - Bob Worker"] },
    { date: "18-Aug-2026", flight: "LH400", sla: "CKIN", start_utc: "12:15", release_utc: "16:00", required: 1, assigned: 1, missing: 0, staff: ["BBB - Bob Worker"] },
  ];
  const directory = ["AAA - Alice Agent", "BBB - Bob Worker", "CCC - Charlie Crew"];

  const resultOverlapsOnly = OperationsUtils.autoAdjustRoster(rows, directory, {
    resolveConflictType: "overlaps_only",
    minBreakMinutes: 30,
  });

  assert.equal(resultOverlapsOnly.reassignments.length, 1);
  assert.equal(resultOverlapsOnly.reassignments[0].fromPerson.key, "ALICE AGENT");
  assert.ok(resultOverlapsOnly.reassignments[0].reason.includes("Resolved overlap"));
});

test("evaluateScenarioMetrics calculates coverage rate, uncovered hours, and conflict count", () => {
  const rows = [
    { ...baseDuty, flight_id: "1", required: 2, assigned: 1, missing: 1, staff: ["AAA - Alice Agent"] },
    { ...baseDuty, flight_id: "2", required: 1, assigned: 1, missing: 0, start_utc: "10:00", release_utc: "12:00", staff: ["BBB - Bob Worker"] },
  ];
  const directory = ["AAA - Alice Agent", "BBB - Bob Worker"];
  const metrics = OperationsUtils.evaluateScenarioMetrics(rows, [], directory);

  assert.equal(metrics.totalDuties, 2);
  assert.equal(metrics.uncoveredGapsCount, 1);
  assert.equal(metrics.uncoveredHours, 1.0);
  assert.equal(metrics.coverageRatePercent, 67);
  assert.equal(metrics.totalDutyHours, 3.0);
});

test("automatic planner excludes absent staff and enforces custom rest and duty-count rules", () => {
  const gap = { ...baseDuty, date: "18-Aug-2026", flight_id: "gap", flight: "LH200", start_utc: "08:00", release_utc: "10:00", staff: [], assigned: 0, missing: 1 };
  const rows = [
    { ...baseDuty, date: "17-Aug-2026", flight_id: "late", flight: "LH100", start_utc: "20:00", release_utc: "23:00", staff: ["AAA - Alice Agent"], assigned: 1, missing: 0 },
    gap,
  ];
  const windows = [{ isoDate: "2026-08-18", start: new Date("2026-08-18T00:00:00Z"), end: new Date("2026-08-19T00:00:00Z") }];
  const directory = ["AAA - Alice Agent"];

  const absentPlan = OperationsUtils.buildAutoPlan(rows, directory, ["ALICE AGENT"], windows, {
    absences: [{ person_key: "ALICE AGENT", start_date: "2026-08-18", end_date: "2026-08-18" }],
  });
  assert.equal(absentPlan.assignments.length, 0);

  const restPlan = OperationsUtils.buildAutoPlan(rows, directory, ["ALICE AGENT"], windows, {
    customRules: [{ enabled: true, rule_type: "MIN_REST_HOURS", target: "GLOBAL", parameters: { minRestHours: 11 } }],
  });
  assert.equal(restPlan.assignments.length, 0);

  const sameDayRows = [
    { ...baseDuty, date: "18-Aug-2026", flight_id: "early", flight: "LH101", start_utc: "05:00", release_utc: "07:00", staff: ["AAA - Alice Agent"], assigned: 1, missing: 0 },
    gap,
  ];
  const dutyLimitPlan = OperationsUtils.buildAutoPlan(sameDayRows, directory, ["ALICE AGENT"], windows, {
    bufferMinutes: 0,
    customRules: [{ enabled: true, rule_type: "MAX_DUTIES_PER_DAY", target: "GLOBAL", parameters: { maxDuties: 1 } }],
  });
  assert.equal(dutyLimitPlan.assignments.length, 0);
});

test("scenario metrics accept automatic-planner assignment objects", () => {
  const row = { ...baseDuty, flight_id: "scenario-gap", required: 1, assigned: 0, missing: 1, staff: [] };
  const assignments = [{ row, position: 1, person: { initials: "AAA", name: "Alice Agent", key: "ALICE AGENT" } }];
  const metrics = OperationsUtils.evaluateScenarioMetrics([row], assignments, ["AAA - Alice Agent"]);
  assert.equal(metrics.coverageRatePercent, 100);
  assert.equal(metrics.unfilledPositions, 0);
});

test("generateIcsCalendar produces valid iCalendar content", () => {
  const rows = [
    { date: "18-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "12:00", staff: ["AAA - Alice Agent"] },
  ];
  const ics = OperationsUtils.generateIcsCalendar(rows, { title: "Test Roster" });

  assert.ok(ics.includes("BEGIN:VCALENDAR"));
  assert.ok(ics.includes("SUMMARY:[GATE] LH100"));
  assert.ok(ics.includes("DTSTART:20260818T080000Z"));
  assert.ok(ics.includes("DTEND:20260818T120000Z"));
  assert.ok(ics.includes("END:VCALENDAR"));
});

test("generateHandoverSummary aggregates gaps, absences, and custom notes", () => {
  const rows = [
    { date: "18-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 0, missing: 1 },
  ];
  const absences = [
    { person_key: "ALICE AGENT", person_name: "Alice Agent", absence_type: "Vacation", start_date: "2026-08-15", end_date: "2026-08-20" }
  ];
  const summary = OperationsUtils.generateHandoverSummary(rows, {}, [], absences, "Test supervisor note");

  assert.equal(summary.totalDuties, 1);
  assert.equal(summary.unresolvedGapsCount, 1);
  assert.equal(summary.coverageRatePercent, 0);
  assert.equal(summary.activeAbsences.length, 1);
  assert.equal(summary.customNotes, "Test supervisor note");
});

test("mergeRosterRows replaces updated dates and preserves untouched dates", () => {
  const existing = [
    { date: "18-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 0, missing: 1, staff: [] },
    { date: "19-Aug-2026", flight: "LH200", sla: "CKIN", start_utc: "09:00", release_utc: "13:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
  ];
  const updatedScan = [
    // 18-Aug rescanned with Alice assigned to LH100
    { date: "18-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
    // New flight on 20-Aug
    { date: "20-Aug-2026", flight: "LH300", sla: "LOFO", start_utc: "10:00", release_utc: "14:00", required: 1, assigned: 0, missing: 1, staff: [] },
  ];

  const merged = OperationsUtils.mergeRosterRows(existing, updatedScan, ["2026-08-18", "2026-08-20"]);
  assert.equal(merged.length, 3);
  
  // 18-Aug is updated
  const aug18 = merged.find((r) => r.date === "18-Aug-2026");
  assert.equal(aug18.missing, 0);
  assert.deepEqual(aug18.staff, ["AAA - Alice Agent"]);

  // 19-Aug is preserved
  const aug19 = merged.find((r) => r.date === "19-Aug-2026");
  assert.ok(aug19);
  assert.equal(aug19.flight, "LH200");

  // 20-Aug is added
  const aug20 = merged.find((r) => r.date === "20-Aug-2026");
  assert.ok(aug20);
  assert.equal(aug20.flight, "LH300");
});

test("detectRosterChanges identifies added/removed flights, staff changes, and resolved/new gaps", () => {
  const oldRows = [
    { date: "18-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 0, missing: 1, staff: [] },
    { date: "18-Aug-2026", flight: "LH150", sla: "CKIN", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
    { date: "18-Aug-2026", flight: "LH999", sla: "LOFO", start_utc: "14:00", release_utc: "18:00", required: 1, assigned: 1, missing: 0, staff: ["BBB - Bob Worker"] },
  ];
  const newRows = [
    // LH100 gap resolved by assigning Alice
    { date: "18-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
    // LH150 staff reassigned from Alice to Bob, and became a gap
    { date: "18-Aug-2026", flight: "LH150", sla: "CKIN", start_utc: "08:00", release_utc: "12:00", required: 2, assigned: 1, missing: 1, staff: ["BBB - Bob Worker"] },
    // LH999 removed
    // LH200 newly added flight
    { date: "18-Aug-2026", flight: "LH200", sla: "GATE", start_utc: "10:00", release_utc: "14:00", required: 1, assigned: 0, missing: 1, staff: [] },
  ];

  const diff = OperationsUtils.detectRosterChanges(oldRows, newRows, ["2026-08-18"]);
  assert.equal(diff.hasChanges, true);
  assert.equal(diff.addedFlights.length, 1);
  assert.equal(diff.removedFlights.length, 1);
  assert.equal(diff.resolvedGaps.length, 1); // LH100
  assert.equal(diff.newGaps.length, 2); // LH150 missing + LH200
  assert.equal(diff.staffReassignments.length, 2); // LH100 assigned + LH150 swapped
  assert.ok(diff.summary.includes("flight"));
});

test("mergeScans combines multiple scan snapshots into a unified master roster dataset", () => {
  const scan1 = {
    id: "scan1",
    createdAt: "2026-08-18T10:00:00Z",
    scannedDates: ["2026-08-01", "2026-08-02"],
    staffDirectory: ["AAA - Alice Agent"],
    airlines: ["LH"],
    slas: ["GATE"],
    rows: [
      { date: "01-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 1, missing: 0, staff: ["AAA - Alice Agent"] },
      { date: "02-Aug-2026", flight: "LH101", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 0, missing: 1, staff: [] },
    ],
  };
  const scan2 = {
    id: "scan2",
    createdAt: "2026-08-18T11:00:00Z",
    scannedDates: ["2026-08-02", "2026-08-03"],
    staffDirectory: ["BBB - Bob Worker"],
    airlines: ["LH", "BA"],
    slas: ["GATE", "CKIN"],
    rows: [
      // Updates 02-Aug: Bob fills the gap
      { date: "02-Aug-2026", flight: "LH101", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 1, missing: 0, staff: ["BBB - Bob Worker"] },
      { date: "03-Aug-2026", flight: "BA200", sla: "CKIN", start_utc: "10:00", release_utc: "14:00", required: 1, assigned: 1, missing: 0, staff: ["BBB - Bob Worker"] },
    ],
  };

  const merged = OperationsUtils.mergeScans([scan1, scan2]);
  assert.equal(merged.scannedDates.length, 3);
  assert.deepEqual(merged.scannedDates, ["2026-08-01", "2026-08-02", "2026-08-03"]);
  assert.equal(merged.rows.length, 3);
  assert.equal(merged.gapsCount, 0); // 02-Aug gap was resolved by scan2
  assert.deepEqual(merged.airlines, ["BA", "LH"]);
  assert.deepEqual(merged.staffDirectory, ["AAA - Alice Agent", "BBB - Bob Worker"]);
});

test("summarizeMonthRoster calculates days scanned, coverage percent, and missing dates", () => {
  const rows = [
    { date: "01-Aug-2026", flight: "LH100", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 1, missing: 0 },
    { date: "02-Aug-2026", flight: "LH101", sla: "GATE", start_utc: "08:00", release_utc: "12:00", required: 1, assigned: 0, missing: 1 },
  ];
  const summary = OperationsUtils.summarizeMonthRoster(rows, ["2026-08-01", "2026-08-02"], "2026-08");

  assert.equal(summary.monthKey, "2026-08");
  assert.equal(summary.daysInMonth, 31);
  assert.equal(summary.scannedDaysCount, 2);
  assert.equal(summary.coveragePercent, Math.round((2 / 31) * 100)); // 6%
  assert.equal(summary.missingDates.length, 29);
  assert.equal(summary.flightsCount, 2);
  assert.equal(summary.gapsCount, 1);
  assert.equal(summary.isComplete, false);
});

test("detectStaffVacations identifies staff with unallocated streaks of full week or configurable days", () => {
  const dates = [
    "2026-08-01", "2026-08-02", "2026-08-03", "2026-08-04",
    "2026-08-05", "2026-08-06", "2026-08-07", "2026-08-08",
    "2026-08-09", "2026-08-10"
  ];

  // Alice has no duties for all 10 days
  const aliceAssignments = [];
  const aliceResult = OperationsUtils.detectStaffVacations(aliceAssignments, dates, 7);
  assert.equal(aliceResult.isGuessedVacation, true);
  assert.equal(aliceResult.maxConsecutiveFreeDays, 10);
  assert.equal(aliceResult.longestSpan.startDate, "2026-08-01");
  assert.equal(aliceResult.longestSpan.endDate, "2026-08-10");

  // Bob has duty on 2026-08-04, splitting into 3 days free and 6 days free (neither >= 7)
  const bobAssignments = [{ date: "04-Aug-2026", flight: "LH100" }];
  const bobResult7 = OperationsUtils.detectStaffVacations(bobAssignments, dates, 7);
  assert.equal(bobResult7.isGuessedVacation, false);
  assert.equal(bobResult7.maxConsecutiveFreeDays, 6);

  // But with configurable threshold = 5 days, Bob has 6 consecutive free days (05-Aug to 10-Aug) -> guessed vacation!
  const bobResult5 = OperationsUtils.detectStaffVacations(bobAssignments, dates, 5);
  assert.equal(bobResult5.isGuessedVacation, true);
  assert.equal(bobResult5.vacationSpans.length, 1);
  assert.equal(bobResult5.vacationSpans[0].startDate, "2026-08-05");
  assert.equal(bobResult5.vacationSpans[0].endDate, "2026-08-10");
});

test("calculates exact workload hours and avoids false overlaps for staff assigned shorter periods", () => {
  const rowShorter = {
    date: "18-Aug-2026",
    flight_id: "vn1",
    flight: "VN 34",
    sla: "CKIN",
    start_utc: "07:35",
    release_utc: "10:35",
    duration: "03:00",
    required: 2,
    assigned: 2,
    missing: 0,
    staff: ["MUC - Alice Full", "MUC - Bob Short"],
    staff_details: [
      { name: "MUC - Alice Full", start_utc: "07:35", release_utc: "10:35", duration: "03:00", duration_minutes: 180, is_shorter: false },
      { name: "MUC - Bob Short", start_utc: "08:35", release_utc: "10:35", duration: "02:00", duration_minutes: 120, is_shorter: true },
    ],
    has_shorter_assignment: true,
  };

  const rowMorning = {
    date: "18-Aug-2026",
    flight_id: "lh1",
    flight: "LH 100",
    sla: "GATE",
    start_utc: "06:30",
    release_utc: "08:00",
    duration: "01:30",
    required: 1,
    assigned: 1,
    missing: 0,
    staff: ["MUC - Bob Short"],
  };

  // Check dutyMinutes for individual staff
  assert.equal(OperationsUtils.dutyMinutes(rowShorter, "ALICE FULL"), 180);
  assert.equal(OperationsUtils.dutyMinutes(rowShorter, "BOB SHORT"), 120);

  // Check workload hours: Alice = 3.0h, Bob = 2.0h (from VN 34) + 1.5h (from LH 100) = 3.5h
  const workload = OperationsUtils.buildWorkload([rowShorter, rowMorning], ["MUC - Alice Full", "MUC - Bob Short"]);
  const aliceWorkload = workload.find((p) => p.name === "Alice Full");
  const bobWorkload = workload.find((p) => p.name === "Bob Short");
  assert.equal(aliceWorkload.hours, 3);
  assert.equal(bobWorkload.hours, 3.5);

  // Check overlap detection:
  // LH 100 is 06:30–08:00.
  // VN 34 group is 07:35–10:35, BUT Bob is assigned 08:35–10:35!
  // So Bob is NOT overlapping between 08:00 and 08:35!
  assert.equal(OperationsUtils.hasOverlappingShifts([rowMorning, rowShorter], "BOB SHORT"), false);
});

