(function exposeHolidayUtils(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.HolidayUtils = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createHolidayUtils() {
  function getGermanBavarianHolidays(year) {
    const numericYear = Number(year);
    if (!Number.isInteger(numericYear)) return [];
    const easter = easterSunday(numericYear);

    return [
      holiday(dateIso(numericYear, 1, 1), "New Year's Day", "Germany"),
      holiday(dateIso(numericYear, 1, 6), "Epiphany", "Bavaria"),
      holiday(addDaysIso(easter, -2), "Good Friday", "Germany"),
      holiday(addDaysIso(easter, 1), "Easter Monday", "Germany"),
      holiday(dateIso(numericYear, 5, 1), "Labour Day", "Germany"),
      holiday(addDaysIso(easter, 39), "Ascension Day", "Germany"),
      holiday(addDaysIso(easter, 50), "Whit Monday", "Germany"),
      holiday(addDaysIso(easter, 60), "Corpus Christi", "Bavaria"),
      holiday(dateIso(numericYear, 8, 15), "Assumption Day", "Bavaria · municipality-dependent"),
      holiday(dateIso(numericYear, 10, 3), "German Unity Day", "Germany"),
      holiday(dateIso(numericYear, 11, 1), "All Saints' Day", "Bavaria"),
      holiday(dateIso(numericYear, 12, 25), "Christmas Day", "Germany"),
      holiday(dateIso(numericYear, 12, 26), "Second Day of Christmas", "Germany"),
    ].sort((a, b) => a.date.localeCompare(b.date));
  }

  function getHolidaysForSelectedMonths(startDate, endDate = startDate) {
    const startMonth = parseIsoMonth(startDate);
    const endMonth = parseIsoMonth(endDate) || startMonth;
    if (!startMonth || !endMonth || endMonth.key < startMonth.key) return [];

    const holidays = [];
    for (let year = startMonth.year; year <= endMonth.year; year += 1) {
      holidays.push(...getGermanBavarianHolidays(year));
    }
    return holidays.filter((entry) => {
      const monthKey = entry.date.slice(0, 7);
      return monthKey >= startMonth.key && monthKey <= endMonth.key;
    });
  }

  function holiday(date, name, scope) {
    return { date, name, scope };
  }

  function parseIsoMonth(value) {
    const match = String(value || "").match(/^(\d{4})-(\d{2})-\d{2}$/);
    if (!match) return null;
    const month = Number(match[2]);
    if (month < 1 || month > 12) return null;
    return { year: Number(match[1]), key: `${match[1]}-${match[2]}` };
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

  function formatIsoDate(date) {
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
  }

  return { getGermanBavarianHolidays, getHolidaysForSelectedMonths };
});
