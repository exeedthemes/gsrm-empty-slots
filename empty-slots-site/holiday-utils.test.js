const test = require("node:test");
const assert = require("node:assert/strict");
const { getGermanBavarianHolidays, getHolidaysForSelectedMonths } = require("./public/holiday-utils");

test("calculates German and Bavarian public holidays for 2026", () => {
  const holidays = getGermanBavarianHolidays(2026);
  assert.deepEqual(holidays.map(({ date, name }) => [date, name]), [
    ["2026-01-01", "New Year's Day"],
    ["2026-01-06", "Epiphany"],
    ["2026-04-03", "Good Friday"],
    ["2026-04-06", "Easter Monday"],
    ["2026-05-01", "Labour Day"],
    ["2026-05-14", "Ascension Day"],
    ["2026-05-25", "Whit Monday"],
    ["2026-06-04", "Corpus Christi"],
    ["2026-08-15", "Assumption Day"],
    ["2026-10-03", "German Unity Day"],
    ["2026-11-01", "All Saints' Day"],
    ["2026-12-25", "Christmas Day"],
    ["2026-12-26", "Second Day of Christmas"],
  ]);
});

test("returns holidays for every selected calendar month", () => {
  assert.deepEqual(
    getHolidaysForSelectedMonths("2026-04-20", "2026-05-02").map((entry) => entry.date),
    ["2026-04-03", "2026-04-06", "2026-05-01", "2026-05-14", "2026-05-25"],
  );
});
