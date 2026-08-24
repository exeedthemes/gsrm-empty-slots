(function exposeStaffUtils(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.StaffUtils = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createStaffUtils() {
  function parseStaffIdentity(staffString) {
    const match = String(staffString || "").trim().match(/^([A-Z0-9]+)\s+-\s+(.+)$/i);
    if (!match) return null;
    const name = match[2].trim();
    return { key: name.toUpperCase(), initials: match[1].toUpperCase(), name };
  }

  function getUtcMonthRange(isoDate) {
    const match = String(isoDate || "").match(/^(\d{4})-(\d{2})-\d{2}$/);
    if (!match) return null;
    const year = Number(match[1]);
    const monthIndex = Number(match[2]) - 1;
    if (monthIndex < 0 || monthIndex > 11) return null;
    const startDate = `${match[1]}-${match[2]}-01`;
    const lastDay = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
    return { startDate, endDate: `${match[1]}-${match[2]}-${String(lastDay).padStart(2, "0")}` };
  }

  return { parseStaffIdentity, getUtcMonthRange };
});
