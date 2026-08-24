const test = require("node:test");
const assert = require("node:assert/strict");
const { parseStaffIdentity, getUtcMonthRange } = require("./public/staff-utils");

test("staff at the same station remain separate people", () => {
  const staff = [
    "MUC - Daniela Neuner",
    "MUC - Alice Brown",
    "MUC - Xavier Young",
  ].map(parseStaffIdentity);

  assert.equal(new Set(staff.map((person) => person.key)).size, 3);
  assert.deepEqual(staff.map((person) => person.name), [
    "Daniela Neuner",
    "Alice Brown",
    "Xavier Young",
  ]);
});

test("builds a complete calendar-month range", () => {
  assert.deepEqual(getUtcMonthRange("2026-08-18"), {
    startDate: "2026-08-01",
    endDate: "2026-08-31",
  });
  assert.deepEqual(getUtcMonthRange("2028-02-10"), {
    startDate: "2028-02-01",
    endDate: "2028-02-29",
  });
  assert.equal(getUtcMonthRange("not-a-date"), null);
});
