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

  // 3. Clean 1-way transfer to Dana (free all day)
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



