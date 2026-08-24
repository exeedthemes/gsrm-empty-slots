const form = document.getElementById("scanForm");
const runBtn = document.getElementById("runBtn");
const refreshScanBtn = document.getElementById("refreshScanBtn");
const controlsPanel = document.querySelector(".controls-panel");
const setupToggleBtn = document.getElementById("setupToggleBtn");
const setupSummary = document.getElementById("setupSummary");
const airlinesBtn = document.getElementById("airlinesBtn");
const csvBtn = document.getElementById("csvBtn");
const message = document.getElementById("message");
const resultsBody = document.getElementById("resultsBody");
const resultCount = document.getElementById("resultCount");
const flightCount = document.getElementById("flightCount");
const dateCount = document.getElementById("dateCount");
const airlinesSelect = document.getElementById("airlines");
const slasSelect = document.getElementById("slas");
const progressPanel = document.getElementById("progressPanel");
const progressDate = document.getElementById("progressDate");
const progressFlight = document.getElementById("progressFlight");
const progressElapsed = document.getElementById("progressElapsed");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const progressDates = document.getElementById("progressDates");
const connectBtn = document.getElementById("connectBtn");
const connectionState = document.getElementById("connectionState");
const connectionHint = document.getElementById("connectionHint");
const cancelScanBtn = document.getElementById("cancelScanBtn");
const gapValidationState = document.getElementById("gapValidationState");
const contextTitle = document.getElementById("contextTitle");
const contextHint = document.getElementById("contextHint");

const tabGaps = document.getElementById("tabGaps");
const tabReplacements = document.getElementById("tabReplacements");
const tabRoster = document.getElementById("tabRoster");
const tabInsights = document.getElementById("tabInsights");
const tabHistory = document.getElementById("tabHistory");
const replacementFields = document.getElementById("replacementFields");
const gapsTableWrap = document.getElementById("gapsTableWrap");
const replacementsLayout = document.getElementById("replacementsLayout");
const rosterLayout = document.getElementById("rosterLayout");
const insightsLayout = document.getElementById("insightsLayout");
const historyLayout = document.getElementById("historyLayout");
const opsCsvBtn = document.getElementById("opsCsvBtn");
const gapPlanner = document.getElementById("gapPlanner");
const gapPlannerTitle = document.getElementById("gapPlannerTitle");
const gapPlannerDetails = document.getElementById("gapPlannerDetails");
const gapCandidates = document.getElementById("gapCandidates");
const gapActionStatus = document.getElementById("gapActionStatus");
const gapActionNotes = document.getElementById("gapActionNotes");
const gapSimulation = document.getElementById("gapSimulation");
const myInitialsInput = document.getElementById("myInitials");
const maxDutyGapInput = document.getElementById("maxDutyGap");
const maxDutyGapUnit = document.getElementById("maxDutyGapUnit");
const rosterDate = document.getElementById("rosterStartDate");
const rosterEndDate = document.getElementById("rosterEndDate");
const rosterStartTime = document.getElementById("rosterStartTime");
const rosterEndTime = document.getElementById("rosterEndTime");
const rosterStaffSearch = document.getElementById("rosterStaffSearch");
const rosterStatus = document.getElementById("rosterStatus");
const rosterSla = document.getElementById("rosterSla");
const rosterLocalTimeToggle = document.getElementById("rosterLocalTimeToggle");
const rosterTimeModeLabel = document.getElementById("rosterTimeModeLabel");
const rosterFilterHint = document.getElementById("rosterFilterHint");
const rosterClearFilters = document.getElementById("rosterClearFilters");
const rosterFilterToggle = document.getElementById("rosterFilterToggle");
const rosterBody = document.getElementById("rosterBody");
const rosterHead = document.getElementById("rosterHead");
const rosterFreeCount = document.getElementById("rosterFreeCount");
const rosterDutyCount = document.getElementById("rosterDutyCount");
const rosterFreeLabel = document.getElementById("rosterFreeLabel");
const rosterDutyLabel = document.getElementById("rosterDutyLabel");
const rosterWindowText = document.getElementById("rosterWindowText");
const resultCountLabel = document.getElementById("resultCountLabel");
const tableFilterBar = document.getElementById("tableFilterBar");
const staffOptions = document.getElementById("staffOptions");
const replacementStaffName = document.getElementById("replacementStaffName");
const replacementStaffSummary = document.getElementById("replacementStaffSummary");
const replacementCandidatesHeader = document.getElementById("replacementCandidatesHeader");
const rosterFullscreenBtn = document.getElementById("rosterFullscreenBtn");
const rosterTotalsBtn = document.getElementById("rosterTotalsBtn");
const rosterStaffViewBtn = document.getElementById("rosterStaffViewBtn");
const rosterAirlineViewBtn = document.getElementById("rosterAirlineViewBtn");
const rosterStaffView = document.getElementById("rosterStaffView");
const rosterAirlineView = document.getElementById("rosterAirlineView");
const rosterViewHint = document.getElementById("rosterViewHint");
const rosterBoardActions = document.getElementById("rosterBoardActions");
const flightScheduleAirlineFilter = document.getElementById("flightScheduleAirlineFilter");
const flightScheduleCoverageFilter = document.getElementById("flightScheduleCoverageFilter");
const flightScheduleDirectionFilter = document.getElementById("flightScheduleDirectionFilter");
const flightScheduleSearch = document.getElementById("flightScheduleSearch");
const scanStartDate = document.getElementById("startDate");
const scanEndDate = document.getElementById("endDate");
const scanDayInputs = [...form.querySelectorAll('input[name="days"]')];
const holidayPreviewTitle = document.getElementById("holidayPreviewTitle");
const holidayPreviewList = document.getElementById("holidayPreviewList");
const scanPeriodMode = document.getElementById("scanPeriodMode");
const scanMonthField = document.getElementById("scanMonthField");
const scanMonth = document.getElementById("scanMonth");
const rosterPeriodMode = document.getElementById("rosterPeriodMode");
const rosterMonthField = document.getElementById("rosterMonthField");
const rosterMonth = document.getElementById("rosterMonth");
const rosterHoursBody = document.getElementById("rosterHoursBody");
const rosterTotalHours = document.getElementById("rosterTotalHours");
const rosterWeekdayHours = document.getElementById("rosterWeekdayHours");
const rosterSaturdayHours = document.getElementById("rosterSaturdayHours");
const rosterSundayHours = document.getElementById("rosterSundayHours");
const rosterHolidayHours = document.getElementById("rosterHolidayHours");
const autoPlannerRun = document.getElementById("autoPlannerRun");
const autoPlannerToggle = document.getElementById("autoPlannerToggle");
const autoPlannerClear = document.getElementById("autoPlannerClear");
const autoPlannerSelectAll = document.getElementById("autoPlannerSelectAll");
const autoPlannerStaffSearch = document.getElementById("autoPlannerStaffSearch");
const autoPlannerStaffList = document.getElementById("autoPlannerStaffList");
const autoPlannerResult = document.getElementById("autoPlannerResult");
const availabilityStaff = document.getElementById("availabilityStaff");
const availabilityPeriod = document.getElementById("availabilityPeriod");
const availabilityDate = document.getElementById("availabilityDate");
const availabilityEnd = document.getElementById("availabilityEnd");
const availabilityMonth = document.getElementById("availabilityMonth");
const availabilityCalendarMonth = document.getElementById("availabilityCalendarMonth");
const availabilityCalendar = document.getElementById("availabilityCalendar");
const availabilityDatesQuick = document.getElementById("availabilityDatesQuick");
const availabilityShift = document.getElementById("availabilityShift");
const availabilityFrom = document.getElementById("availabilityFrom");
const availabilityTo = document.getElementById("availabilityTo");
const availabilityRulesEl = document.getElementById("availabilityRules");
const plannerSlas = document.getElementById("plannerSlas");
const plannerOptionIds = ["plannerMaxHours", "plannerMaxSpan", "plannerBuffer", "plannerBreakAfter", "plannerBreakLength", "plannerWeeklyHours", "plannerWeeklyDays", "plannerMonthlyHours"];

let latestRows = [];
let latestScannedDates = [];
let latestStaffDirectory = [];
let filteredRows = [];
let progressTimer = null;
let activeTab = "gaps";
let selectedReplacementDuty = null;
let selectedGap = null;
let activeScanId = "";
let connectedEmail = "";
let showRosterDutyTotals = false;
let rosterViewMode = localStorage.getItem("gsrmRosterViewMode") === "airline" ? "airline" : "staff";
let currentAutoPlan = null;
let selectedPlannerStaff = new Set();
let plannerAvailabilityRules = [];
let selectedAvailabilityDates = new Set();
const HISTORY_KEY = "gsrmScanHistoryV1";
const ACTIONS_KEY = "gsrmGapActionsV1";

const today = getLocalIsoDate();
scanStartDate.value = today;
scanEndDate.value = today;
scanMonth.value = today.slice(0, 7);
rosterMonth.value = today.slice(0, 7);
availabilityDate.value = today;
availabilityEnd.value = today;
availabilityMonth.value = today.slice(0, 7);
availabilityCalendarMonth.value = today.slice(0, 7);
renderHolidayPreview();

runBtn.addEventListener("click", () => runScan(false));
refreshScanBtn.addEventListener("click", () => runScan(true));
connectBtn.addEventListener("click", connectToAvbis);
cancelScanBtn.addEventListener("click", cancelActiveScan);
setupToggleBtn.addEventListener("click", () => setSetupCollapsed(!form.hidden));
scanStartDate.addEventListener("change", handleManualScanDateChange);
scanEndDate.addEventListener("change", handleManualScanDateChange);
scanPeriodMode.addEventListener("change", applyScanPeriodMode);
scanMonth.addEventListener("input", applyScanPeriodMode);
airlinesBtn.addEventListener("click", refreshAirlines);
opsCsvBtn.addEventListener("click", downloadOperationalCsv);
document.getElementById("gapPlannerClose").addEventListener("click", closeGapPlanner);
document.getElementById("clearHistoryBtn").addEventListener("click", clearScanHistory);
gapActionStatus.addEventListener("change", saveSelectedGapAction);
gapActionNotes.addEventListener("input", saveSelectedGapAction);
form.email.addEventListener("input", handleCredentialChange);
form.password.addEventListener("input", handleCredentialChange);
csvBtn.addEventListener("click", () => {
  if (activeTab === "replacements") {
    downloadReplacementsCsv();
  } else if (activeTab === "roster") {
    downloadRosterCsv();
  } else {
    downloadCsv(filteredRows);
  }
});

tabGaps.addEventListener("click", () => switchTab("gaps"));
tabReplacements.addEventListener("click", () => switchTab("replacements"));
tabRoster.addEventListener("click", () => switchTab("roster"));
tabInsights.addEventListener("click", () => switchTab("insights"));
tabHistory.addEventListener("click", () => switchTab("history"));

myInitialsInput.addEventListener("input", (e) => {
  localStorage.setItem("myInitials", e.target.value);
  applyFilters();
});
function refreshReplacementCandidates() {
  if (selectedReplacementDuty) showCandidatesForDuty(selectedReplacementDuty);
  else applyFilters();
}
maxDutyGapInput.addEventListener("input", refreshReplacementCandidates);
let previousDutyGapUnit = maxDutyGapUnit.value;
maxDutyGapUnit.addEventListener("change", () => {
  const value = Number(maxDutyGapInput.value);
  if (maxDutyGapInput.value.trim() && Number.isFinite(value)) {
    const convertedValue = previousDutyGapUnit === "hours" ? value * 60 : value / 60;
    maxDutyGapInput.value = String(Number(convertedValue.toFixed(4)));
  }
  previousDutyGapUnit = maxDutyGapUnit.value;
  refreshReplacementCandidates();
});
[rosterDate, rosterEndDate, rosterStartTime, rosterEndTime, rosterStatus, rosterSla].forEach((control) => control.addEventListener("input", applyFilters));
rosterStaffSearch.addEventListener("input", applyFilters);
rosterPeriodMode.addEventListener("change", applyRosterPeriodMode);
rosterMonth.addEventListener("input", applyRosterPeriodMode);
rosterDate.addEventListener("change", () => {
  rosterPeriodMode.value = "custom";
  rosterMonthField.hidden = true;
  if (rosterEndDate.value && rosterEndDate.value < rosterDate.value) rosterEndDate.value = rosterDate.value;
  applyFilters();
});
rosterEndDate.addEventListener("change", () => {
  rosterPeriodMode.value = "custom";
  rosterMonthField.hidden = true;
  if (rosterDate.value && rosterDate.value > rosterEndDate.value) rosterDate.value = rosterEndDate.value;
  applyFilters();
});
rosterLocalTimeToggle.addEventListener("change", () => {
  rosterTimeModeLabel.textContent = rosterLocalTimeToggle.checked ? "Local" : "Zulu";
  applyFilters();
});
rosterClearFilters.addEventListener("click", resetRosterFilters);
rosterFilterToggle.addEventListener("click", () => setRosterFiltersCollapsed(!rosterLayout.classList.contains("filters-collapsed")));
rosterFullscreenBtn.addEventListener("click", toggleRosterFullscreen);
rosterTotalsBtn.addEventListener("click", () => {
  showRosterDutyTotals = !showRosterDutyTotals;
  rosterTotalsBtn.textContent = showRosterDutyTotals ? "Hide duty hours" : "Show duty hours";
  rosterTotalsBtn.setAttribute("aria-pressed", String(showRosterDutyTotals));
  renderRoster();
});
rosterStaffViewBtn.addEventListener("click", () => setRosterViewMode("staff"));
rosterAirlineViewBtn.addEventListener("click", () => setRosterViewMode("airline"));
document.getElementById("rosterExpandAll").addEventListener("click", () => setAllAirlineSections(true));
document.getElementById("rosterCollapseAll").addEventListener("click", () => setAllAirlineSections(false));
if (flightScheduleAirlineFilter) flightScheduleAirlineFilter.addEventListener("change", renderRoster);
if (flightScheduleCoverageFilter) flightScheduleCoverageFilter.addEventListener("change", renderRoster);
if (flightScheduleDirectionFilter) flightScheduleDirectionFilter.addEventListener("change", renderRoster);
if (flightScheduleSearch) flightScheduleSearch.addEventListener("input", renderRoster);
autoPlannerRun.addEventListener("click", buildAutomaticPlan);
autoPlannerToggle.addEventListener("click", () => {
  const collapsed = autoPlannerToggle.closest(".auto-planner").classList.toggle("collapsed");
  autoPlannerToggle.textContent = collapsed ? "Show planner" : "Hide planner";
  autoPlannerToggle.setAttribute("aria-expanded", String(!collapsed));
  localStorage.setItem("gsrmAutoPlannerCollapsed", String(collapsed));
});
autoPlannerClear.addEventListener("click", clearAutomaticPlan);
autoPlannerSelectAll.addEventListener("click", toggleAllPlannerStaff);
autoPlannerStaffSearch.addEventListener("input", renderPlannerStaffList);
for (const id of plannerOptionIds) document.getElementById(id).addEventListener("change", savePlannerOptions);
availabilityPeriod.addEventListener("change", updateAvailabilityFields);
availabilityShift.addEventListener("change", updateAvailabilityFields);
availabilityStaff.addEventListener("change", () => {
  renderAvailabilityRules();
  updateAvailabilityFields();
});
for (const input of [availabilityDate, availabilityEnd, availabilityMonth, availabilityCalendarMonth, availabilityDatesQuick]) input.addEventListener("input", renderAvailabilityPreview);
for (const input of document.querySelectorAll('#availabilityWeekdays input')) input.addEventListener("change", renderAvailabilityPreview);
document.getElementById("availabilityAdd").addEventListener("click", addAvailabilityRule);
availabilityCalendarMonth.addEventListener("input", renderAvailabilityCalendar);
document.getElementById("availabilityCalendarPrev").addEventListener("click", () => shiftAvailabilityCalendar(-1));
document.getElementById("availabilityCalendarNext").addEventListener("click", () => shiftAvailabilityCalendar(1));
plannerSlas.addEventListener("change", savePlannerOptions);

// Step section collapsible handlers for Auto Planner
document.querySelectorAll(".step-toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    const card = document.getElementById(targetId);
    if (!card) return;
    const isCollapsed = card.classList.toggle("collapsed");
    btn.textContent = isCollapsed ? "Expand" : "Collapse";
    btn.setAttribute("aria-expanded", String(!isCollapsed));
  });
});

// Preset View Filter chips for Roster
const rosterPresetBtns = document.querySelectorAll("#rosterPresetFilterGroup .preset-chip");
rosterPresetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    rosterPresetBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const preset = btn.dataset.preset;
    if (preset === "all") {
      rosterStatus.value = "";
    } else if (preset === "duty") {
      rosterStatus.value = "duty";
    } else if (preset === "free") {
      rosterStatus.value = "free";
    }
    applyFilters();
  });
});

// Collapsible Insights section toggles
const workloadSectionToggle = document.getElementById("workloadSectionToggle");
if (workloadSectionToggle) {
  workloadSectionToggle.addEventListener("click", () => {
    const section = document.getElementById("insightsWorkloadSection");
    if (!section) return;
    const isCollapsed = section.classList.toggle("collapsed");
    workloadSectionToggle.textContent = isCollapsed ? "Expand workload" : "Collapse workload";
    workloadSectionToggle.setAttribute("aria-expanded", String(!isCollapsed));
  });
}

const warningsSectionToggle = document.getElementById("warningsSectionToggle");
if (warningsSectionToggle) {
  warningsSectionToggle.addEventListener("click", () => {
    const section = document.getElementById("insightsWarningsSection");
    if (!section) return;
    const isCollapsed = section.classList.toggle("collapsed");
    warningsSectionToggle.textContent = isCollapsed ? "Expand" : "Collapse";
    warningsSectionToggle.setAttribute("aria-expanded", String(!isCollapsed));
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && rosterLayout.classList.contains("fullscreen")) toggleRosterFullscreen(false);
});

// Load saved initials
if (localStorage.getItem("myInitials")) {
  myInitialsInput.value = localStorage.getItem("myInitials");
}
updateRosterFilters();
setRosterViewMode(rosterViewMode, false);
refreshConnectionState();

function applyScanPeriodMode() {
  const isMonth = scanPeriodMode.value === "month";
  scanMonthField.hidden = !isMonth;
  if (!isMonth) return;
  const month = StaffUtils.getUtcMonthRange(`${scanMonth.value || today.slice(0, 7)}-01`);
  if (!month) return;
  scanStartDate.value = month.startDate;
  scanEndDate.value = month.endDate;
  for (const input of scanDayInputs) input.checked = true;
  renderHolidayPreview();
  setMessage(`Full calendar month selected: ${month.startDate} to ${month.endDate}, including Saturdays and Sundays.`);
}

function handleManualScanDateChange() {
  scanPeriodMode.value = "custom";
  scanMonthField.hidden = true;
  renderHolidayPreview();
}

function renderHolidayPreview() {
  const startDate = scanStartDate.value;
  const endDate = scanEndDate.value || startDate;
  const holidays = HolidayUtils.getHolidaysForSelectedMonths(startDate, endDate);
  const startMonth = formatHolidayMonth(startDate);
  const endMonth = formatHolidayMonth(endDate);

  holidayPreviewTitle.textContent = startMonth
    ? `Public holidays · ${startMonth}${endMonth && endMonth !== startMonth ? ` – ${endMonth}` : ""}`
    : "Public holidays for selected month";

  holidayPreviewList.innerHTML = holidays.length
    ? holidays.map((entry) => `
      <div class="holiday-item">
        <time datetime="${entry.date}">${formatHolidayDate(entry.date)}</time>
        <span class="holiday-name">${escapeHtml(entry.name)}</span>
        <span class="holiday-scope">${escapeHtml(entry.scope)}</span>
      </div>
    `).join("")
    : '<span class="holiday-empty">No German or Bavarian public holidays in this month.</span>';
}

function formatHolidayMonth(isoDate) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate || "")) return "";
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${isoDate.slice(0, 7)}-01T00:00:00Z`));
}

function formatHolidayDate(isoDate) {
  return new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "2-digit", month: "short", timeZone: "UTC" })
    .format(new Date(`${isoDate}T00:00:00Z`));
}

function applyRosterPeriodMode() {
  const isMonth = rosterPeriodMode.value === "month";
  rosterMonthField.hidden = !isMonth;
  if (!isMonth || !latestScannedDates.length) {
    applyFilters();
    return;
  }
  const month = StaffUtils.getUtcMonthRange(`${rosterMonth.value || latestScannedDates[0].slice(0, 7)}-01`);
  if (!month) return;
  const monthDates = latestScannedDates.filter((date) => date >= month.startDate && date <= month.endDate).sort();
  if (!monthDates.length) {
    setMessage(`No scanned dates are available for ${rosterMonth.value}.`, "warn");
    return;
  }
  rosterDate.value = monthDates[0];
  rosterEndDate.value = monthDates[monthDates.length - 1];
  applyFilters();
}

function switchTab(tab) {
  activeTab = tab;
  if (tab !== "gaps") closeGapPlanner();
  if (tab !== "roster" && rosterLayout.classList.contains("fullscreen")) toggleRosterFullscreen(false);
  tabGaps.classList.toggle("active", tab === "gaps");
  tabReplacements.classList.toggle("active", tab === "replacements");
  tabRoster.classList.toggle("active", tab === "roster");
  tabInsights.classList.toggle("active", tab === "insights");
  tabHistory.classList.toggle("active", tab === "history");
  replacementFields.style.display = tab === "replacements" ? "grid" : "none";
  gapsTableWrap.style.display = tab === "gaps" ? "block" : "none";
  replacementsLayout.style.display = tab === "replacements" ? "grid" : "none";
  rosterLayout.style.display = tab === "roster" ? "block" : "none";
  insightsLayout.style.display = tab === "insights" ? "block" : "none";
  historyLayout.style.display = tab === "history" ? "block" : "none";
  tableFilterBar.style.display = ["gaps", "replacements"].includes(tab) ? "flex" : "none";
  replacementDateFilterGroup.hidden = tab !== "replacements";
  resultsMissingFilterGroup.hidden = tab === "replacements";
  resultsSearch.placeholder = tab === "replacements"
    ? "Search duties by flight, route, date, or SLA"
    : "Filter output results (flight, route, date...)";
  updateResultTimeFilterLabels();
  resultCountLabel.textContent = tab === "gaps" ? "empty slot groups" : tab === "replacements" ? "scheduled duties" : tab === "roster" ? (rosterViewMode === "airline" ? "flights shown" : "staff shown") : tab === "insights" ? "warnings" : "saved scans";
  updateContextToolbar(tab);
  if (tab === "roster" && !rosterDate.value) rosterDate.value = document.getElementById("startDate").value;
  if (tab === "roster" && !rosterEndDate.value) rosterEndDate.value = rosterDate.value;
  applyFilters();
}

function updateContextToolbar(tab) {
  const copy = {
    gaps: ["Empty Slots", "Coverage gaps in the current scan"],
    replacements: ["Replacements", "Duties and conflict-free replacement candidates"],
    roster: ["Duty Roster", rosterViewMode === "airline" ? "Daily airline and flight allocation board" : "Availability and duties for the selected window"],
    insights: ["Coverage Insights", "Pressure, workload, and roster warnings"],
    history: ["Scan History", "Restore, rerun, compare, or export saved snapshots"],
  }[tab];
  contextTitle.textContent = copy[0];
  contextHint.textContent = copy[1];
  csvBtn.hidden = ["insights", "history"].includes(tab);
  opsCsvBtn.hidden = tab !== "gaps";
  csvBtn.textContent = tab === "roster" ? "Download roster CSV" : tab === "replacements" ? "Download replacements CSV" : "Download gaps CSV";
}

function toggleRosterFullscreen(force) {
  const enabled = typeof force === "boolean" ? force : !rosterLayout.classList.contains("fullscreen");
  rosterLayout.classList.toggle("fullscreen", enabled);
  document.body.classList.toggle("roster-mode-fullscreen", enabled);
  rosterFullscreenBtn.textContent = enabled ? "Close full screen" : "Full screen";
  rosterFullscreenBtn.setAttribute("aria-pressed", String(enabled));
  if (!enabled) setRosterFiltersCollapsed(false);
  if (!enabled) rosterFullscreenBtn.focus();
}

function setRosterFiltersCollapsed(collapsed) {
  const enabled = Boolean(collapsed) && rosterLayout.classList.contains("fullscreen");
  rosterLayout.classList.toggle("filters-collapsed", enabled);
  rosterFilterToggle.textContent = enabled ? "Show filters" : "Hide filters";
  rosterFilterToggle.setAttribute("aria-expanded", String(!enabled));
}

const resultsSearch = document.getElementById("resultsSearch");
const resultsDateFilter = document.getElementById("resultsDateFilter");
const replacementDateFilterGroup = document.getElementById("replacementDateFilterGroup");
const resultsSlaFilter = document.getElementById("resultsSlaFilter");
const resultsDirectionFilter = document.getElementById("resultsDirectionFilter");
const resultsMissingFilter = document.getElementById("resultsMissingFilter");
const resultsMissingFilterGroup = document.getElementById("resultsMissingFilterGroup");
const resultsStartTimeFilter = document.getElementById("resultsStartTimeFilter");
const resultsEndTimeFilter = document.getElementById("resultsEndTimeFilter");
const resultsLocalTimeToggle = document.getElementById("resultsLocalTimeToggle");
const resultsClearFilters = document.getElementById("resultsClearFilters");

resultsSearch.addEventListener("input", applyFilters);
resultsDateFilter.addEventListener("input", applyFilters);
resultsSlaFilter.addEventListener("change", applyFilters);
resultsDirectionFilter.addEventListener("change", applyFilters);
resultsMissingFilter.addEventListener("change", applyFilters);
resultsStartTimeFilter.addEventListener("input", applyFilters);
resultsEndTimeFilter.addEventListener("input", applyFilters);
resultsLocalTimeToggle.addEventListener("change", () => {
  updateResultTimeFilterLabels();
  applyFilters();
});
resultsClearFilters.addEventListener("click", clearResultFilters);

function updateResultTimeFilterLabels() {
  const zone = resultsLocalTimeToggle.checked ? "Local" : "UTC";
  const prefix = activeTab === "replacements" ? "Duty " : "";
  const fromLabel = document.querySelector('label[for="resultsStartTimeFilter"]');
  const toLabel = document.querySelector('label[for="resultsEndTimeFilter"]');
  if (fromLabel) fromLabel.textContent = `${prefix}From ${zone}`;
  if (toLabel) toLabel.textContent = `${prefix}To ${zone}`;
}

function clearResultFilters() {
  resultsSearch.value = "";
  resultsSlaFilter.value = "";
  resultsDirectionFilter.value = "";
  resultsStartTimeFilter.value = "";
  resultsEndTimeFilter.value = "";
  resultsLocalTimeToggle.checked = false;
  if (activeTab === "replacements") resultsDateFilter.value = "";
  else resultsMissingFilter.value = "";
  updateResultTimeFilterLabels();
  applyFilters();
}

function handleCredentialChange() {
  if (connectedEmail && form.email.value.trim().toLowerCase() !== connectedEmail.toLowerCase()) {
    updateConnectionState(false, "Credentials changed — reconnect to AVBIS");
  }
}

function updateConnectionState(connected, label = "") {
  connectionState.classList.toggle("connected", connected);
  connectionState.classList.toggle("disconnected", !connected);
  connectionState.querySelector("strong").textContent = label || (connected ? `Connected to AVBIS as ${connectedEmail}` : "Not connected to AVBIS");
}

async function refreshConnectionState() {
  try {
    const response = await fetch("/api/session", { cache: "no-store" });
    const state = await response.json();
    connectedEmail = state.connected ? state.email : "";
    updateConnectionState(state.connected);
  } catch {
    updateConnectionState(false);
  }
}

async function connectToAvbis() {
  if (!form.reportValidity()) return;
  connectBtn.disabled = true;
  connectBtn.textContent = "Connecting…";
  connectionHint.textContent = "Checking your AVBIS credentials…";
  try {
    const payload = readForm();
    const response = await fetch("/api/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: payload.email, password: payload.password }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`);
    connectedEmail = result.email;
    updateConnectionState(true);
    connectionHint.textContent = `Session stays available for about ${result.idleMinutes} minutes when idle.`;
    setMessage("Connected to AVBIS. Configure the scan range when you are ready.");
  } catch (error) {
    connectedEmail = "";
    updateConnectionState(false, "AVBIS connection failed");
    connectionHint.textContent = error.message || String(error);
    setMessage(error.message || String(error), "error");
  } finally {
    connectBtn.disabled = false;
    connectBtn.textContent = "Connect to AVBIS";
  }
}

async function cancelActiveScan() {
  if (!activeScanId) return;
  cancelScanBtn.disabled = true;
  cancelScanBtn.textContent = "Cancelling…";
  try {
    const response = await fetch("/api/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scanId: activeScanId }),
    });
    const result = await response.json();
    if (!response.ok || !result.accepted) throw new Error(result.message || "Scan is no longer running.");
    progressText.textContent = "Cancellation requested. Completed dates will be preserved.";
  } catch (error) {
    setMessage(error.message || String(error), "warn");
  }
}

async function runScan(forceRefresh = false) {
  if (!form.reportValidity()) return;
  const payload = readForm();
  payload.forceRefresh = forceRefresh;
  if (!rosterDate.value || rosterDate.value < payload.startDate || rosterDate.value > payload.endDate) {
    rosterDate.value = payload.startDate;
  }
  if (!rosterEndDate.value || rosterEndDate.value < rosterDate.value || rosterEndDate.value > payload.endDate) {
    rosterEndDate.value = payload.endDate;
  }
  payload.scanId = createScanId();
  activeScanId = payload.scanId;
  setBusy(true);
  setMessage(forceRefresh ? "Refreshing the selected dates from AVBIS..." : "Loading cached dates and scanning only missing data...");
  resetProgress(payload.scanId);
  startProgressPolling(payload.scanId);

  // Reset filter inputs
  resultsSearch.value = "";
  resultsDateFilter.value = "";
  resultsSlaFilter.value = "";
  resultsDirectionFilter.value = "";
  resultsMissingFilter.value = "";
  resultsStartTimeFilter.value = "";
  resultsEndTimeFilter.value = "";
  resultsLocalTimeToggle.checked = false;
  latestRows = [];
  latestScannedDates = [];
  latestStaffDirectory = [];
  updateStaffOptions();
  updateResultsSlaFilter();
  updateRosterFilters();
  applyFilters();

  try {
    const response = await fetch("/api/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`);

    latestRows = result.rows || [];
    latestScannedDates = result.scannedDates || [];
    latestStaffDirectory = result.staffDirectory || [];
    saveScanSnapshot(result, payload);
    connectedEmail = payload.email;
    updateConnectionState(true);
    updateStaffOptions();
    populateAirlines(result.airlines || [], payload.airlines);
    populateSlas(result.slas || [], payload.slas);
    updateResultsSlaFilter();
    updateRosterFilters();
    applyFilters();
    flightCount.textContent = result.scannedFlights || 0;
    dateCount.textContent = (result.scannedDates || []).length;

    const errorSuffix = result.errors?.length ? ` ${result.errors.length} endpoint request(s) failed.` : "";
    const incompleteSuffix = result.incompleteDates?.length
      ? ` ${result.incompleteDates.length} date(s) remain incomplete and were not cached: ${result.incompleteDates.join(", ")}. Rerun to try them again.`
      : "";
    const cache = result.cache || {};
    const cacheSuffix = cache.cachedDates
      ? ` Reused ${cache.cachedDates} cached date(s); fetched ${cache.freshDates || 0} date(s) from AVBIS.`
      : ` Fetched ${cache.freshDates ?? latestScannedDates.length} date(s) from AVBIS.`;
    const assignedStaffCount = getAssignedStaffStrings().size;
    const completionLead = result.cancelled ? "Scan cancelled." : "Done.";
    const preserved = result.cancelled ? ` Preserved ${latestScannedDates.length} completed date(s); rerun to continue from cache.` : "";
    setMessage(`${completionLead}${preserved}${cacheSuffix} Found ${latestStaffDirectory.length} known staff member(s), ${assignedStaffCount} allocated staff member(s), and ${latestRows.length} duty group(s).${errorSuffix}${incompleteSuffix}`, result.cancelled || result.errors?.length ? "warn" : "");
    const finalProgress = await pollProgress(payload.scanId);
    renderFinishedProgress(result, finalProgress);
    setSetupCollapsed(true, payload);
    console.log("Empty SOD slot JSON:", result);
  } catch (error) {
    latestRows = [];
    latestScannedDates = [];
    latestStaffDirectory = [];
    updateStaffOptions();
    updateResultsSlaFilter();
    updateRosterFilters();
    applyFilters();
    flightCount.textContent = "0";
    dateCount.textContent = "0";
    setSetupCollapsed(false);
    setMessage(error.message || String(error), "error");
  } finally {
    stopProgressPolling();
    setBusy(false);
    activeScanId = "";
  }
}

function setSetupCollapsed(collapsed, payload = readForm()) {
  form.hidden = collapsed;
  controlsPanel.classList.toggle("compact", collapsed);
  setupToggleBtn.textContent = collapsed ? "Edit setup" : "Hide setup";
  setupToggleBtn.setAttribute("aria-expanded", String(!collapsed));

  if (!collapsed) {
    setupSummary.hidden = true;
    return;
  }

  const selectedDayInputs = [...form.querySelectorAll('input[name="days"]:checked')];
  const selectedDayValues = selectedDayInputs.map((input) => input.value);
  const selectedDayLabels = selectedDayInputs
    .map((input) => input.nextElementSibling?.textContent?.trim())
    .filter(Boolean);
  const isWeekdays = selectedDayValues.length === 5 && ["1", "2", "3", "4", "5"].every((day) => selectedDayValues.includes(day));
  const selectedDays = selectedDayValues.length === 7 ? "Every day" : isWeekdays ? "Weekdays" : selectedDayLabels.join(", ");
  const airlineText = payload.airlines?.length ? payload.airlines.join(", ") : "All airlines";
  const slaText = payload.slas?.length ? payload.slas.join(", ") : "All SLAs";
  setupSummary.innerHTML = `
    <span class="summary-primary"><strong>Dates</strong>${escapeHtml(payload.startDate)} – ${escapeHtml(payload.endDate)}</span>
    <span><strong>Time</strong>${escapeHtml(payload.startTime)}–${escapeHtml(payload.endTime)} UTC</span>
    <span><strong>Days</strong>${escapeHtml(selectedDays || "No days")}</span>
    <span><strong>Airlines</strong>${escapeHtml(airlineText)}</span>
    <span><strong>SLA</strong>${escapeHtml(slaText)}</span>
  `;
  setupSummary.hidden = false;
}

async function refreshAirlines() {
  const payload = readForm();
  setAirlinesBusy(true);
  setMessage("Loading visible airlines from Flight Comms...");

  try {
    const response = await fetch("/api/airlines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`);

    populateAirlines(result.airlines || [], payload.airlines);
    flightCount.textContent = result.scannedFlights || 0;
    dateCount.textContent = (result.scannedDates || []).length;
    setMessage(`Loaded ${(result.airlines || []).length} airline filter option(s).`);
  } catch (error) {
    setMessage(error.message || String(error), "error");
  } finally {
    setAirlinesBusy(false);
  }
}

function readForm() {
  const data = new FormData(form);
  return {
    email: data.get("email"),
    password: data.get("password"),
    startDate: data.get("startDate"),
    endDate: data.get("endDate"),
    startTime: data.get("startTime"),
    endTime: data.get("endTime"),
    days: data.getAll("days"),
    includePublicHolidays: data.get("includePublicHolidays") === "on",
    publicHolidays: data.get("publicHolidays"),
    airlines: data.getAll("airlines").filter(Boolean),
    slas: data.getAll("slas").filter(Boolean),
    allSlots: true,
  };
}

function populateAirlines(airlines, selected = []) {
  const selectedValues = new Set(Array.isArray(selected) ? selected : [selected].filter(Boolean));
  const options = ["", ...airlines.filter(Boolean)];
  airlinesSelect.innerHTML = "";

  for (const code of options) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = code || "All airlines";
    airlinesSelect.appendChild(option);
  }

  for (const option of airlinesSelect.options) {
    option.selected = selectedValues.size ? selectedValues.has(option.value) : option.value === "";
  }
}

function populateSlas(slas, selected = []) {
  const selectedValues = new Set(Array.isArray(selected) ? selected : [selected].filter(Boolean));
  const optionValues = new Set(["ASVC", "CKIN", "GATE", "LOFO", "QH-CKI", "QH-GATE", "SECS", ...slas.filter(Boolean).map((code) => code.toUpperCase())]);
  const options = ["", ...[...optionValues].sort()];
  slasSelect.innerHTML = "";

  for (const code of options) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = code || "All SLAs";
    slasSelect.appendChild(option);
  }

  for (const option of slasSelect.options) {
    option.selected = selectedValues.size ? selectedValues.has(option.value) : option.value === "";
  }
}

function renderRows(rows) {
  resultsBody.innerHTML = "";

  if (!rows.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td colspan="11" class="empty">No empty slots found.</td>';
    resultsBody.appendChild(tr);
    return;
  }

  const useLocal = resultsLocalTimeToggle.checked;
  const startHeader = document.getElementById("thStart");
  const releaseHeader = document.getElementById("thRelease");
  if (startHeader) startHeader.textContent = useLocal ? "Start Local" : "Start UTC";
  if (releaseHeader) releaseHeader.textContent = useLocal ? "Release Local" : "Release UTC";

  for (const row of rows) {
    const tr = document.createElement("tr");
    const displayStart = getDisplayTime(row.date, row.start_utc, useLocal);
    const displayRelease = getDisplayTime(row.date, row.release_utc, useLocal);

    // Fallback or format duration calculation
    let duration = row.duration || "";
    if (duration) {
      duration = duration.replace(/act/gi, "").replace(/>/g, "").replace(/^[-\s()]+|[-\s()]+$/g, "").trim();
    }
    if (duration && duration.includes(":")) {
      const match = duration.trim().match(/^(\d+):(\d+)$/);
      if (match) {
        const hrs = parseInt(match[1], 10);
        const mins = parseInt(match[2], 10);
        duration = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
      }
    } else if (!duration && row.start_utc && row.release_utc) {
      const startObj = parseUtcTime(row.date, row.start_utc);
      const releaseObj = parseUtcTime(row.date, row.release_utc);
      if (startObj && releaseObj) {
        const diffMs = releaseObj - startObj;
        if (diffMs > 0) {
          const diffMins = Math.round(diffMs / (1000 * 60));
          const hrs = Math.floor(diffMins / 60);
          const mins = diffMins % 60;
          duration = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
        }
      }
    }

    tr.innerHTML = `
      <td>${escapeHtml(row.date)}</td>
      <td>${escapeHtml(row.flight)} <span class="muted">${escapeHtml(row.direction || "")}</span></td>
      <td>${escapeHtml(row.route)}</td>
      <td><span class="badge badge-${escapeHtml(row.sla).toLowerCase().replace(/[^a-z0-9]/g, "-")}">${escapeHtml(row.sla)}</span></td>
      <td>${escapeHtml(row.required)}</td>
      <td>${escapeHtml(row.assigned)}</td>
      <td class="missing">${escapeHtml(row.missing)}</td>
      <td>${escapeHtml(displayStart)}</td>
      <td>${escapeHtml(displayRelease)}</td>
      <td>${escapeHtml(duration)}</td>
      <td><button type="button" class="compact-action-btn">Fill gap</button></td>
    `;
    tr.querySelector(".compact-action-btn").addEventListener("click", () => openGapPlanner(row));
    resultsBody.appendChild(tr);
  }
}

function setBusy(isBusy) {
  runBtn.disabled = isBusy;
  refreshScanBtn.disabled = isBusy;
  airlinesBtn.disabled = isBusy;
  connectBtn.disabled = isBusy;
  cancelScanBtn.hidden = !isBusy;
  cancelScanBtn.disabled = false;
  cancelScanBtn.textContent = "Cancel scan";
  runBtn.textContent = isBusy ? "Running..." : "Run";
  refreshScanBtn.textContent = isBusy ? "Please wait..." : "Refresh range";
}

function setAirlinesBusy(isBusy) {
  airlinesBtn.disabled = isBusy;
  runBtn.disabled = isBusy;
  refreshScanBtn.disabled = isBusy;
  airlinesBtn.textContent = isBusy ? "Loading..." : "Refresh";
}

function setMessage(text, kind = "") {
  message.textContent = text;
  message.className = `message ${kind}`.trim();
}

function createScanId() {
  const bytes = new Uint32Array(2);
  crypto.getRandomValues(bytes);
  return `scan_${Date.now().toString(36)}_${[...bytes].map((value) => value.toString(36)).join("_")}`;
}

function getLocalIsoDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function resetProgress(scanId) {
  progressPanel.hidden = false;
  progressPanel.dataset.scanId = scanId;
  progressDate.textContent = "-";
  progressFlight.textContent = "-";
  progressElapsed.textContent = "0s";
  progressBar.style.width = "0%";
  progressText.textContent = "Starting...";
  progressDates.innerHTML = "";
  cancelScanBtn.hidden = false;
}

function startProgressPolling(scanId) {
  stopProgressPolling();
  progressTimer = setInterval(() => pollProgress(scanId), 1000);
  pollProgress(scanId);
}

function stopProgressPolling() {
  if (progressTimer) clearInterval(progressTimer);
  progressTimer = null;
}

async function pollProgress(scanId) {
  try {
    const response = await fetch(`/api/progress?scanId=${encodeURIComponent(scanId)}`, { cache: "no-store" });
    const progress = await response.json();
    if (!progress.found) return null;
    renderProgress(progress);
    if (progress.done) stopProgressPolling();
    return progress;
  } catch (error) {
    console.warn("Progress polling failed:", error);
    return null;
  }
}

function renderProgress(progress) {
  const completedDates = Number(progress.completedDates || 0);
  const processedDates = Number(progress.processedDates ?? completedDates);
  const totalDates = Number(progress.totalDates || 0);
  const currentFlightIndex = Number(progress.currentFlightIndex || 0);
  const currentFlightTotal = Number(progress.currentFlightTotal || 0);
  const datePart = progress.currentDate || (progress.done ? "Complete" : "-");
  const flightPart = [progress.currentFlight, progress.currentDirection].filter(Boolean).join(" ") || "-";
  const datePercent = totalDates ? (processedDates / totalDates) * 100 : 0;
  const flightPercent = currentFlightTotal ? (currentFlightIndex / currentFlightTotal) * (100 / Math.max(1, totalDates)) : 0;
  const percent = Math.min(100, progress.done ? 100 : datePercent + flightPercent);

  progressDate.textContent = totalDates ? `${datePart} (${processedDates}/${totalDates}; ${completedDates} complete)` : datePart;
  progressFlight.textContent = currentFlightTotal ? `${flightPart} (${currentFlightIndex}/${currentFlightTotal})` : flightPart;
  progressElapsed.textContent = progress.elapsedLabel || "0s";
  progressBar.style.width = `${percent}%`;
  progressText.textContent = progress.message || "Scanning...";
  renderProgressDates(progress.dateSummaries || []);
}

function renderFinishedProgress(result, progress = null) {
  const scannedDates = result.scannedDates || [];
  const incompleteDates = result.incompleteDates || [];
  progressPanel.hidden = false;
  progressDate.textContent = result.cancelled
    ? `Cancelled (${scannedDates.length} completed)`
    : incompleteDates.length
      ? `Finished (${scannedDates.length} complete; ${incompleteDates.length} incomplete)`
      : `Complete (${scannedDates.length}/${scannedDates.length})`;
  progressFlight.textContent = "-";
  progressElapsed.textContent = progress?.elapsedLabel || progressElapsed.textContent || "0s";
  if (!result.cancelled) progressBar.style.width = "100%";
  progressText.textContent = progress?.message || `Done. ${latestRows.length} empty slot group(s), ${result.scannedFlights || 0} flight(s).`;
  if (progress?.dateSummaries) renderProgressDates(progress.dateSummaries);
  cancelScanBtn.hidden = true;
}

function renderProgressDates(summaries) {
  progressDates.innerHTML = "";
  for (const summary of summaries) {
    const item = document.createElement("div");
    item.className = "progress-date";
    item.innerHTML = `
      <strong>${escapeHtml(summary.date)}</strong>
      <span>${escapeHtml(summary.scannedFlights)} flights</span>
      <span>${escapeHtml(summary.rows)} slots</span>
      <span>${escapeHtml(summary.errors)} errors</span>
      <span>${summary.cached ? "Cached" : escapeHtml(summary.elapsedLabel || "")}</span>
    `;
    progressDates.appendChild(item);
  }
}

function downloadCsv(rows) {
  const useLocal = resultsLocalTimeToggle.checked;
  const headers = [
    "date",
    "flight_id",
    "flight",
    "direction",
    "route",
    "aircraft",
    "scheduled_utc",
    "sla",
    "type",
    "movement",
    "required",
    "assigned",
    "missing",
    "start_utc",
    "release_utc",
    "duration",
  ];
  if (useLocal) {
    headers.push("start_local", "release_local");
  }

  const csv = [
    headers.join(","),
    ...rows.map((row) => {
      const line = headers.map((header) => {
        if (header === "start_local") {
          return csvCell(getDisplayTime(row.date, row.start_utc, true));
        }
        if (header === "release_local") {
          return csvCell(getDisplayTime(row.date, row.release_utc, true));
        }
        if (header === "duration") {
          let duration = row.duration || "";
          if (duration) {
            duration = duration.replace(/act/gi, "").replace(/>/g, "").replace(/^[-\s()]+|[-\s()]+$/g, "").trim();
          }
          if (duration && duration.includes(":")) {
            const match = duration.trim().match(/^(\d+):(\d+)$/);
            if (match) {
              const hrs = parseInt(match[1], 10);
              const mins = parseInt(match[2], 10);
              duration = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
            }
          } else if (!duration && row.start_utc && row.release_utc) {
            const startObj = parseUtcTime(row.date, row.start_utc);
            const releaseObj = parseUtcTime(row.date, row.release_utc);
            if (startObj && releaseObj) {
              const diffMs = releaseObj - startObj;
              if (diffMs > 0) {
                const diffMins = Math.round(diffMs / (1000 * 60));
                const hrs = Math.floor(diffMins / 60);
                const mins = diffMins % 60;
                duration = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
              }
            }
          }
          return csvCell(duration);
        }
        return csvCell(row[header]);
      });
      return line.join(",");
    }),
  ].join("\n");
  downloadBlob("gsrm-empty-sod-slots.csv", csv, "text/csv;charset=utf-8");
}

function downloadBlob(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  const text = value == null ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function getGermanyTimeParts(dateObj) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  });
  const parts = formatter.formatToParts(dateObj);
  const map = {};
  for (const part of parts) {
    map[part.type] = part.value;
  }
  return {
    year: parseInt(map.year, 10),
    month: parseInt(map.month, 10) - 1, // 0-based
    day: parseInt(map.day, 10),
    hour: map.hour,
    minute: map.minute
  };
}

function parseUtcTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;
  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months.indexOf(parts[1]);
  const year = parseInt(parts[2], 10);

  const match = timeStr.trim().match(/^(?:(\d{2})\s+([A-Za-z]{3})\s+)?(\d{2}):(\d{2})$/);
  if (!match) return null;

  let slotDay = day;
  let slotMonth = month;

  if (match[1] && match[2]) {
    slotDay = parseInt(match[1], 10);
    const m = months.findIndex((name) => name.toLowerCase() === match[2].toLowerCase());
    if (m !== -1) slotMonth = m;
  }

  const hours = parseInt(match[3], 10);
  const minutes = parseInt(match[4], 10);

  if (isNaN(slotDay) || slotMonth === -1 || isNaN(year) || isNaN(hours) || isNaN(minutes)) return null;

  return new Date(Date.UTC(year, slotMonth, slotDay, hours, minutes));
}

function getDisplayTime(dateStr, timeStr, useLocal) {
  if (!useLocal) return timeStr;
  const dateObj = parseUtcTime(dateStr, timeStr);
  if (!dateObj) return timeStr;

  const ger = getGermanyTimeParts(dateObj);
  const hours = ger.hour;
  const minutes = ger.minute;

  const utcMs = Date.UTC(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate());
  const localMs = Date.UTC(ger.year, ger.month, ger.day);
  const diffDays = Math.round((localMs - utcMs) / (1000 * 60 * 60 * 24));

  let suffix = "";
  if (diffDays > 0) {
    suffix = ` (+${diffDays}d)`;
  } else if (diffDays < 0) {
    suffix = ` (${diffDays}d)`;
  }

  return `${hours}:${minutes}${suffix}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function applyFilters() {
  if (activeTab === "replacements") {
    renderReplacements();
    csvBtn.disabled = latestRows.length === 0;
    return;
  }

  if (activeTab === "roster") {
    renderRoster();
    return;
  }

  if (activeTab === "insights") {
    renderInsights();
    return;
  }

  if (activeTab === "history") {
    renderHistory();
    return;
  }

  const searchVal = resultsSearch.value.toLowerCase().trim();
  const slaVal = resultsSlaFilter.value;
  const directionVal = resultsDirectionFilter.value;
  const missingVal = Math.max(0, parseInt(resultsMissingFilter.value || "0", 10));
  const startTimeVal = resultsStartTimeFilter.value;
  const endTimeVal = resultsEndTimeFilter.value;
  const useLocal = resultsLocalTimeToggle.checked;

  updateResultTimeFilterLabels();

  filteredRows = latestRows.filter((row) => {
    if (activeTab === "gaps" && row.missing <= 0) return false;

    if (searchVal) {
      const matchText = [
        row.date,
        row.flight,
        row.direction,
        row.route,
        row.sla,
        row.aircraft,
        row.scheduled_utc,
        row.start_utc,
        row.release_utc
      ].join(" ").toLowerCase();
      if (!matchText.includes(searchVal)) return false;
    }

    if (slaVal && row.sla !== slaVal) return false;

    if (directionVal) {
      const dirLower = String(row.direction || "").toLowerCase();
      const filterLower = directionVal.toLowerCase();
      if (filterLower === "arr" || filterLower === "arrival") {
        if (dirLower !== "arr" && dirLower !== "arrival") return false;
      } else if (filterLower === "dep" || filterLower === "departure") {
        if (dirLower !== "dep" && dirLower !== "departure") return false;
      } else {
        if (dirLower !== filterLower) return false;
      }
    }
    if (missingVal && Number(row.missing || 0) < Number(missingVal)) return false;

    // Timing Filter
    if (startTimeVal || endTimeVal) {
      let startComp = "";
      let releaseComp = "";

      const startDateObj = parseUtcTime(row.date, row.start_utc);
      const releaseDateObj = parseUtcTime(row.date, row.release_utc);

      if (useLocal) {
        if (startDateObj) {
          const ger = getGermanyTimeParts(startDateObj);
          startComp = `${ger.hour}:${ger.minute}`;
        }
        if (releaseDateObj) {
          const ger = getGermanyTimeParts(releaseDateObj);
          releaseComp = `${ger.hour}:${ger.minute}`;
        }
      } else {
        if (startDateObj) {
          startComp = `${String(startDateObj.getUTCHours()).padStart(2, "0")}:${String(startDateObj.getUTCMinutes()).padStart(2, "0")}`;
        }
        if (releaseDateObj) {
          releaseComp = `${String(releaseDateObj.getUTCHours()).padStart(2, "0")}:${String(releaseDateObj.getUTCMinutes()).padStart(2, "0")}`;
        }
      }

      if (startTimeVal && releaseComp < startTimeVal) return false;
      if (endTimeVal && startComp > endTimeVal) return false;
    }

    return true;
  });

  renderRows(filteredRows);

  if (latestRows.length === 0) {
    resultCount.textContent = "0";
  } else if (filteredRows.length === latestRows.length) {
    resultCount.textContent = latestRows.length;
  } else {
    resultCount.textContent = `${filteredRows.length} of ${latestRows.length}`;
  }

  csvBtn.disabled = filteredRows.length === 0;
  opsCsvBtn.disabled = !latestRows.some((row) => Number(row.missing || 0) > 0);
}

function updateResultsSlaFilter() {
  const currentVal = resultsSlaFilter.value;
  const uniqueSlas = [...new Set(latestRows.map((r) => r.sla).filter(Boolean))].sort();

  resultsSlaFilter.innerHTML = '<option value="">All SLAs</option>';
  for (const sla of uniqueSlas) {
    const opt = document.createElement("option");
    opt.value = sla;
    opt.textContent = sla;
    resultsSlaFilter.appendChild(opt);
  }

  if (uniqueSlas.includes(currentVal)) {
    resultsSlaFilter.value = currentVal;
  } else {
    resultsSlaFilter.value = "";
  }
}

function updateRosterFilters() {
  const scannedDates = [...latestScannedDates].sort();
  const firstDate = scannedDates[0] || "";
  const lastDate = scannedDates[scannedDates.length - 1] || "";

  for (const input of [rosterDate, rosterEndDate]) {
    input.min = firstDate;
    input.max = lastDate;
    input.disabled = !scannedDates.length;
  }
  rosterStatus.disabled = !scannedDates.length;
  rosterSla.disabled = !scannedDates.length;
  rosterStaffSearch.disabled = !scannedDates.length;
  rosterStartTime.disabled = !scannedDates.length;
  rosterEndTime.disabled = !scannedDates.length;
  rosterLocalTimeToggle.disabled = !scannedDates.length;
  rosterClearFilters.disabled = !scannedDates.length;
  rosterPeriodMode.disabled = !scannedDates.length;
  rosterMonth.disabled = !scannedDates.length;
  rosterMonth.min = firstDate ? firstDate.slice(0, 7) : "";
  rosterMonth.max = lastDate ? lastDate.slice(0, 7) : "";

  if (!scannedDates.length) {
    rosterDate.value = "";
    rosterEndDate.value = "";
    rosterFilterHint.textContent = "Run a scan to choose from the scanned dates.";
  } else {
    if (!rosterDate.value || rosterDate.value < firstDate || rosterDate.value > lastDate) rosterDate.value = firstDate;
    if (!rosterEndDate.value || rosterEndDate.value < rosterDate.value || rosterEndDate.value > lastDate) rosterEndDate.value = lastDate;
    const countLabel = scannedDates.length === 1 ? "1 scanned date" : `${scannedDates.length} scanned dates`;
    rosterFilterHint.textContent = `${countLabel} available · ${firstDate}${firstDate === lastDate ? "" : ` to ${lastDate}`}`;
    if (!rosterMonth.value || rosterMonth.value < firstDate.slice(0, 7) || rosterMonth.value > lastDate.slice(0, 7)) {
      rosterMonth.value = firstDate.slice(0, 7);
    }
  }

  const currentSla = rosterSla.value;
  const slas = [...new Set(latestRows.map((row) => row.sla).filter(Boolean))].sort();
  rosterSla.innerHTML = '<option value="">All SLAs</option>';
  for (const sla of slas) {
    const option = document.createElement("option");
    option.value = sla;
    option.textContent = sla;
    rosterSla.appendChild(option);
  }
  rosterSla.value = slas.includes(currentSla) ? currentSla : "";
}

function resetRosterFilters() {
  const scannedDates = [...latestScannedDates].sort();
  rosterDate.value = scannedDates[0] || "";
  rosterEndDate.value = scannedDates[scannedDates.length - 1] || "";
  rosterStartTime.value = "00:00";
  rosterEndTime.value = "23:59";
  rosterStaffSearch.value = "";
  rosterStatus.value = "";
  rosterSla.value = "";
  rosterLocalTimeToggle.checked = false;
  rosterTimeModeLabel.textContent = "Zulu";
  rosterPeriodMode.value = "custom";
  rosterMonthField.hidden = true;

  if (flightScheduleAirlineFilter) flightScheduleAirlineFilter.value = "all";
  if (flightScheduleCoverageFilter) flightScheduleCoverageFilter.value = "all";
  if (flightScheduleDirectionFilter) flightScheduleDirectionFilter.value = "all";
  if (flightScheduleSearch) flightScheduleSearch.value = "";

  document.querySelectorAll("#rosterPresetFilterGroup .preset-chip").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.preset === "all");
  });

  applyFilters();
}

function renderReplacements() {
  selectedReplacementDuty = null;
  const dutiesList = document.getElementById("dutiesList");
  const candidatesList = document.getElementById("candidatesList");
  dutiesList.innerHTML = "";
  candidatesList.innerHTML = `<div class="empty-selection">Select a duty on the left to see people who can replace you.</div>`;
  replacementCandidatesHeader.textContent = "Available Replacements";

  const initials = myInitialsInput.value.trim().toUpperCase();
  if (!initials) {
    replacementStaffName.textContent = "Select a staff member";
    replacementStaffSummary.textContent = "Type a name above to load their duties.";
    dutiesList.innerHTML = `<div class="empty-list">Please enter your initials/name to see your duties.</div>`;
    return;
  }

  const selectedIdentity = resolveStaffIdentity(initials);
  replacementStaffName.textContent = selectedIdentity?.name || myInitialsInput.value.trim();

  // Find all of my duties
  const myDuties = latestRows.filter(row => {
    if (!row.staff) return false;
    return row.staff.some(s => matchStaffMember(s, initials));
  });
  replacementStaffSummary.textContent = myDuties.length === 1
    ? "1 scheduled duty found in the current scan."
    : `${myDuties.length} scheduled duties found in the current scan.`;

  // Apply active filters to my duties
  const searchVal = resultsSearch.value.toLowerCase().trim();
  const dateVal = resultsDateFilter.value;
  const slaVal = resultsSlaFilter.value;
  const directionVal = resultsDirectionFilter.value;
  const startTimeVal = resultsStartTimeFilter.value;
  const endTimeVal = resultsEndTimeFilter.value;
  const useLocal = resultsLocalTimeToggle.checked;

  const filteredDuties = myDuties.filter(row => {
    if (dateVal && row.date !== dateVal) return false;
    if (slaVal && row.sla !== slaVal) return false;

    if (searchVal) {
      const matchText = [
        row.date,
        row.flight,
        row.direction,
        row.route,
        row.sla,
        row.aircraft,
        row.scheduled_utc,
        row.start_utc,
        row.release_utc
      ].join(" ").toLowerCase();
      if (!matchText.includes(searchVal)) return false;
    }

    if (directionVal) {
      const dirLower = String(row.direction || "").toLowerCase();
      const filterLower = directionVal.toLowerCase();
      if (filterLower === "arr" || filterLower === "arrival") {
        if (dirLower !== "arr" && dirLower !== "arrival") return false;
      } else if (filterLower === "dep" || filterLower === "departure") {
        if (dirLower !== "dep" && dirLower !== "departure") return false;
      } else {
        if (dirLower !== filterLower) return false;
      }
    }

    if (startTimeVal || endTimeVal) {
      let startComp = "";
      let releaseComp = "";

      const startDateObj = parseUtcTime(row.date, row.start_utc);
      const releaseDateObj = parseUtcTime(row.date, row.release_utc);

      if (useLocal) {
        if (startDateObj) {
          const ger = getGermanyTimeParts(startDateObj);
          startComp = `${ger.hour}:${ger.minute}`;
        }
        if (releaseDateObj) {
          const ger = getGermanyTimeParts(releaseDateObj);
          releaseComp = `${ger.hour}:${ger.minute}`;
        }
      } else {
        if (startDateObj) {
          startComp = `${String(startDateObj.getUTCHours()).padStart(2, "0")}:${String(startDateObj.getUTCMinutes()).padStart(2, "0")}`;
        }
        if (releaseDateObj) {
          releaseComp = `${String(releaseDateObj.getUTCHours()).padStart(2, "0")}:${String(releaseDateObj.getUTCMinutes()).padStart(2, "0")}`;
        }
      }

      if (startTimeVal && releaseComp < startTimeVal) return false;
      if (endTimeVal && startComp > endTimeVal) return false;
    }

    return true;
  });

  if (!filteredDuties.length) {
    dutiesList.innerHTML = `<div class="empty-list">No duties found for "${escapeHtml(initials)}"${myDuties.length ? " matching the active filters" : ""}.</div>`;
    return;
  }

  filteredDuties.forEach((duty, index) => {
    const card = document.createElement("div");
    card.className = "duty-card";
    card.dataset.index = index;

    const displayStart = getDisplayTime(duty.date, duty.start_utc, useLocal);
    const displayRelease = getDisplayTime(duty.date, duty.release_utc, useLocal);

    let duration = duty.duration || "";
    if (duration) {
      duration = duration.replace(/act/gi, "").replace(/>/g, "").replace(/^[-\s()]+|[-\s()]+$/g, "").trim();
    }
    if (duration && duration.includes(":")) {
      const match = duration.trim().match(/^(\d+):(\d+)$/);
      if (match) {
        const hrs = parseInt(match[1], 10);
        const mins = parseInt(match[2], 10);
        duration = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
      }
    } else if (!duration && duty.start_utc && duty.release_utc) {
      const startObj = parseUtcTime(duty.date, duty.start_utc);
      const releaseObj = parseUtcTime(duty.date, duty.release_utc);
      if (startObj && releaseObj) {
        const diffMs = releaseObj - startObj;
        if (diffMs > 0) {
          const diffMins = Math.round(diffMs / (1000 * 60));
          const hrs = Math.floor(diffMins / 60);
          const mins = diffMins % 60;
          duration = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
        }
      }
    }

    card.innerHTML = `
      <div class="duty-card-header">
        <span class="duty-card-date">${escapeHtml(duty.date)}</span>
        <span class="badge badge-${escapeHtml(duty.sla).toLowerCase().replace(/[^a-z0-9]/g, "-")}">${escapeHtml(duty.sla)}</span>
      </div>
      <div class="duty-card-flight">${escapeHtml(duty.flight)} <span class="muted">${escapeHtml(duty.direction || "")}</span></div>
      <div class="duty-card-route">${escapeHtml(duty.route)}</div>
      <div class="duty-card-time">
        <svg style="width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>${escapeHtml(displayStart)} - ${escapeHtml(displayRelease)} ${useLocal ? "Local" : "Zulu"} (${escapeHtml(duration)})</span>
      </div>
    `;

    card.addEventListener("click", () => {
      document.querySelectorAll(".duty-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      showCandidatesForDuty(duty);
    });

    dutiesList.appendChild(card);
  });

  if (myDuties.length === 0) {
    resultCount.textContent = "0";
  } else if (filteredDuties.length === myDuties.length) {
    resultCount.textContent = `${myDuties.length} duty(s)`;
  } else {
    resultCount.textContent = `${filteredDuties.length} of ${myDuties.length} duty(s)`;
  }
}

function getRosterRows() {
  if (!rosterDate.value || !rosterEndDate.value || !rosterStartTime.value || !rosterEndTime.value) return null;
  const firstDay = new Date(`${rosterDate.value}T00:00:00Z`);
  const lastDay = new Date(`${rosterEndDate.value}T00:00:00Z`);
  if (Number.isNaN(firstDay.getTime()) || Number.isNaN(lastDay.getTime()) || lastDay < firstDay) return null;

  const dailyWindows = [];
  const scannedDateSet = new Set(latestScannedDates);
  for (let day = new Date(firstDay); day <= lastDay; day = new Date(day.getTime() + 24 * 60 * 60 * 1000)) {
    const isoDate = day.toISOString().slice(0, 10);
    if (!scannedDateSet.has(isoDate)) continue;
    const start = new Date(`${isoDate}T${rosterStartTime.value}:00Z`);
    let end = new Date(`${isoDate}T${rosterEndTime.value}:00Z`);
    if (end <= start) end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
    dailyWindows.push({ isoDate, start, end });
  }
  if (!dailyWindows.length) return null;
  const selectedPeriodEnd = new Date(lastDay.getTime() + 24 * 60 * 60 * 1000);

  const staff = new Map();
  for (const staffString of latestStaffDirectory) {
    const identity = parseStaffIdentity(staffString);
    if (identity && !staff.has(identity.key)) staff.set(identity.key, { ...identity, assignments: [] });
  }
  for (const assignment of latestRows) {
    for (const staffString of assignment.staff || []) {
      const identity = parseStaffIdentity(staffString);
      if (!identity) continue;
      if (!staff.has(identity.key)) staff.set(identity.key, { ...identity, assignments: [] });
      staff.get(identity.key).assignments.push(assignment);
    }
  }

  const rows = [...staff.values()].map((person) => {
    const timedAssignments = person.assignments.map((assignment) => ({
      assignment,
      start: parseUtcTime(assignment.date, assignment.start_utc),
      end: parseUtcTime(assignment.date, assignment.release_utc),
    })).filter((item) => item.start && item.end);
    const overlapping = timedAssignments.filter((item) => dailyWindows.some((window) => item.start < window.end && item.end > window.start));
    const selectedDates = timedAssignments.filter((item) => item.start < selectedPeriodEnd && item.end > firstDay);
    const byDay = dailyWindows.map((window) => timedAssignments
      .filter((item) => item.start < window.end && item.end > window.start)
      .map((item) => item.assignment));
    return {
      ...person,
      status: overlapping.length ? "duty" : "free",
      overlapping: overlapping.map((item) => item.assignment),
      otherDayAssignments: selectedDates.filter((item) => !overlapping.includes(item)).map((item) => item.assignment),
      byDay,
    };
  });

  rows.sort((a, b) => a.name.localeCompare(b.name) || a.initials.localeCompare(b.initials));
  return { rows, dailyWindows };
}

function setRosterViewMode(mode, shouldRender = true) {
  rosterViewMode = mode === "airline" ? "airline" : "staff";
  localStorage.setItem("gsrmRosterViewMode", rosterViewMode);
  const isAirline = rosterViewMode === "airline";
  rosterStaffViewBtn.setAttribute("aria-pressed", String(!isAirline));
  rosterAirlineViewBtn.setAttribute("aria-pressed", String(isAirline));
  rosterStaffView.hidden = isAirline;
  rosterAirlineView.hidden = !isAirline;
  rosterLayout.classList.toggle("airline-view", isAirline);
  rosterBoardActions.hidden = !isAirline;
  rosterTotalsBtn.hidden = isAirline;
  rosterStatus.disabled = isAirline || !latestScannedDates.length;
  rosterStatus.title = isAirline ? "Availability applies to the staff roster view." : "";
  rosterViewHint.textContent = isAirline
    ? "All arrivals and departures in one chronological daily schedule, without airline grouping."
    : "People by day, including free staff and individual allocations.";
  rosterFreeLabel.textContent = isAirline ? "Days" : "Free";
  rosterDutyLabel.textContent = isAirline ? "Flights" : "On duty";
  if (activeTab === "roster") contextHint.textContent = isAirline
    ? "Chronological daily flight and staffing schedule"
    : "Availability and duties for the selected window";
  if (activeTab === "roster") resultCountLabel.textContent = isAirline ? "flights shown" : "staff shown";
  if (shouldRender) renderRoster();
}

function setAllAirlineSections(open) {
  for (const section of rosterAirlineView.querySelectorAll("details.airline-flight-card")) section.open = open;
  for (const list of rosterAirlineView.querySelectorAll(".flight-schedule-list")) list.classList.toggle("day-collapsed", !open);
  for (const btn of rosterAirlineView.querySelectorAll(".day-toggle-btn")) {
    btn.textContent = open ? "Collapse day" : "Expand day";
    btn.setAttribute("aria-expanded", String(open));
  }
}

function updateAirlineFilterOptions() {
  if (!flightScheduleAirlineFilter) return;
  const currentSelection = flightScheduleAirlineFilter.value || "all";
  const uniqueAirlines = [...new Set(latestRows.map((r) => OperationsUtils.airlineCode(r)).filter(Boolean))].sort();

  flightScheduleAirlineFilter.innerHTML = `<option value="all">All airlines (${uniqueAirlines.length})</option>` +
    uniqueAirlines.map((code) => `<option value="${escapeHtml(code)}" ${code === currentSelection ? "selected" : ""}>${escapeHtml(code)}</option>`).join("");
}

function getAirlineRosterDays(roster) {
  const scheduleQuery = (flightScheduleSearch?.value || "").trim() || (rosterStaffSearch?.value || "").trim();
  return OperationsUtils.buildFlightSchedule(latestRows, roster.dailyWindows, {
    query: scheduleQuery,
    sla: rosterSla.value,
    coverage: flightScheduleCoverageFilter?.value || "all",
    direction: flightScheduleDirectionFilter?.value || "all",
    airline: flightScheduleAirlineFilter?.value || "all",
  });
}

function renderRoster() {
  updateAirlineFilterOptions();
  const roster = getRosterRows();
  rosterBody.innerHTML = "";
  rosterAirlineView.innerHTML = "";

  if (!latestScannedDates.length) {
    rosterFreeCount.textContent = "0";
    rosterDutyCount.textContent = "0";
    rosterWindowText.textContent = "Run a scan to load the duty roster.";
    renderRosterHeader([]);
    rosterBody.innerHTML = '<tr><td colspan="2" class="empty">No scan run yet.</td></tr>';
    rosterAirlineView.innerHTML = '<div class="empty-selection">Run a scan to load the daily flight schedule.</div>';
    resultCount.textContent = "0";
    csvBtn.disabled = true;
    return;
  }
  if (!latestRows.length && !latestStaffDirectory.length) {
    rosterFreeCount.textContent = "0";
    rosterDutyCount.textContent = "0";
    rosterWindowText.textContent = "The scan completed, but no staff allocations were found.";
    renderRosterHeader([]);
    rosterBody.innerHTML = '<tr><td colspan="2" class="empty">No staff allocations found in the scanned dates.</td></tr>';
    rosterAirlineView.innerHTML = '<div class="empty-selection">No scheduled flight allocations were found in the scanned dates.</div>';
    resultCount.textContent = "0";
    csvBtn.disabled = true;
    return;
  }
  if (!roster) {
    renderRosterHeader([]);
    rosterBody.innerHTML = '<tr><td colspan="2" class="empty">Choose a roster date and time window that was included in the scan.</td></tr>';
    rosterAirlineView.innerHTML = '<div class="empty-selection">Choose a roster date and time window that was included in the scan.</div>';
    resultCount.textContent = "0";
    csvBtn.disabled = true;
    return;
  }

  const freeCount = roster.rows.filter((person) => person.status === "free").length;
  const dutyCount = roster.rows.length - freeCount;
  rosterFreeCount.textContent = freeCount;
  rosterDutyCount.textContent = dutyCount;
  const overnightSuffix = rosterEndTime.value <= rosterStartTime.value ? " (+1 day)" : "";
  const dateLabel = rosterDate.value === rosterEndDate.value ? rosterDate.value : `${rosterDate.value} to ${rosterEndDate.value}`;
  const displayZone = rosterLocalTimeToggle.checked ? "Local (Europe/Berlin)" : "Zulu (UTC)";
  rosterWindowText.textContent = `${dateLabel} · availability window ${rosterStartTime.value}–${rosterEndTime.value}${overnightSuffix} UTC · duty times shown in ${displayZone}. “Free” means no allocation overlaps the selected timeframe.`;
  const shown = filterRosterPeople(roster.rows);
  renderRosterHeader(roster.dailyWindows);

  if (rosterViewMode === "airline") {
    renderAirlineRoster(roster);
    return;
  }

  if (!shown.length) {
    rosterBody.innerHTML = `<tr><td colspan="${roster.dailyWindows.length + 1 + (showRosterDutyTotals ? 1 : 0)}" class="empty">No staff match the current roster filters.</td></tr>`;
  } else {
    for (const person of shown) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="roster-person-cell">
          <strong>${escapeHtml(person.name)}</strong>
          <span>${escapeHtml(person.initials)}</span>
        </td>
        ${person.byDay.map((assignments, index) => renderRosterDayCell(assignments, roster.dailyWindows[index], showRosterDutyTotals)).join("")}
        ${showRosterDutyTotals ? `<td class="roster-total-cell"><span class="roster-range-total" title="Duty hours in selected range">${formatHours(OperationsUtils.summarizeDutyHours(person.overlapping, roster.dailyWindows).totalMinutes)}h</span></td>` : ""}
      `;
      const personDuties = person.byDay.flat();
      tr.querySelectorAll(".compact-duty").forEach((button, index) => {
        button.addEventListener("click", () => openRosterInlineReplacement(personDuties[index], person));
      });
      rosterBody.appendChild(tr);
    }
  }

  resultCount.textContent = shown.length === roster.rows.length ? String(shown.length) : `${shown.length} of ${roster.rows.length}`;
  resultCount.title = "";
  csvBtn.disabled = shown.length === 0;
  rosterBody.dataset.visibleStaffKeys = JSON.stringify(shown.map((person) => person.key));
}

function renderAirlineRoster(roster) {
  const days = getAirlineRosterDays(roster);
  const visibleFlights = days.reduce((sum, day) => sum + day.flightCount, 0);
  const visibleDuties = days.reduce((sum, day) => sum + day.dutyCount, 0);
  const visibleMissing = days.reduce((sum, day) => sum + day.missing, 0);
  const dutyRefs = [];
  const staffRefs = [];
  const weekdayFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "long", timeZone: "UTC" });
  const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" });
  const useLocal = rosterLocalTimeToggle.checked;
  const zoneLabel = useLocal ? "Local" : "Z";

  rosterFreeCount.textContent = String(days.length);
  rosterDutyCount.textContent = String(visibleFlights);
  const overnightSuffix = rosterEndTime.value <= rosterStartTime.value ? " (+1 day)" : "";
  const dateLabel = rosterDate.value === rosterEndDate.value ? rosterDate.value : `${rosterDate.value} to ${rosterEndDate.value}`;
  rosterWindowText.textContent = `${dateLabel} · ${visibleDuties} visible SLA duties · ${visibleMissing} missing positions · ${rosterStartTime.value}–${rosterEndTime.value}${overnightSuffix} UTC work window.`;

  rosterAirlineView.innerHTML = days.map((day) => {
    const date = new Date(`${day.isoDate}T12:00:00Z`);
    const dayHeadingId = `flight-day-${day.isoDate}`;
    const flightCards = day.flights.length ? day.flights.map((flight) => {
        const dutyRows = flight.duties.map((duty) => {
          const dutyIndex = dutyRefs.push(duty) - 1;
          const staff = (duty.staff || []).length ? duty.staff.map((label) => {
            const identity = parseStaffIdentity(label);
            const staffIndex = staffRefs.push({ label, identity, duty }) - 1;
            const displayName = identity?.name || label;
            const stationTag = identity?.initials && identity.initials !== displayName ? identity.initials : "";
            return `<button type="button" class="board-staff-btn" data-staff-index="${staffIndex}" title="Find a replacement for ${escapeHtml(displayName)}"><strong>${escapeHtml(displayName)}</strong>${stationTag ? `<small>${escapeHtml(stationTag)}</small>` : ""}</button>`;
          }).join("") : '<span class="board-unassigned">Unassigned</span>';
          const planned = currentAutoPlan?.slots.filter((slot) => slot.personKey && OperationsUtils.rowKey(slot.row) === OperationsUtils.rowKey(duty)) || [];
          const plannedStaff = planned.map((slot) => {
            const person = getPlannerPeople().find((item) => item.key === slot.personKey);
            return `<span class="board-planned-staff">+ ${escapeHtml(person?.name || person?.initials || slot.personKey)} <small>planned</small></span>`;
          }).join("");
          const remaining = Math.max(0, Number(duty.missing || 0) - planned.length);
          const plannedAssigned = Number(duty.assigned || 0) + planned.length;
          const role = [duty.type, duty.movement].filter(Boolean).join(" · ") || "—";
          return `<tr class="${remaining ? "allocation-gap-row" : ""}">
            <td><strong>${escapeHtml(duty.sla || "—")}</strong><small>${escapeHtml(role)}</small></td>
            <td>${escapeHtml(getDisplayTime(duty.date, duty.start_utc, useLocal))}–${escapeHtml(getDisplayTime(duty.date, duty.release_utc, useLocal))} ${zoneLabel}</td>
            <td><span class="allocation-coverage ${remaining ? "has-gap" : "covered"}">${plannedAssigned}/${escapeHtml(duty.required)}</span>${remaining ? `<small>${remaining} missing</small>` : planned.length ? "<small>Covered by local plan</small>" : ""}</td>
            <td><div class="board-staff-list">${staff}${plannedStaff}</div></td>
            <td>
              ${Number(duty.missing || 0) ? `<button type="button" class="secondary-btn board-plan-btn" data-duty-index="${dutyIndex}">${remaining ? "Plan gap" : "Review plan"}</button>` : '<span class="board-covered-label">Covered</span>'}
              <button type="button" class="board-add-btn" data-add-duty-index="${dutyIndex}" title="Quick add or replace staff in place">+ Add</button>
            </td>
          </tr>`;
        }).join("");
        return `<details class="airline-flight-card ${flight.missing ? "has-gap" : "covered"}" ${flight.missing ? "open" : ""}>
          <summary class="airline-flight-head">
            <time>${escapeHtml(flight.scheduled || "--:--")}</time>
            <div><strong>${escapeHtml(flight.flight)}</strong><span>${escapeHtml(flight.direction || "Flight")} · ${escapeHtml(flight.route || "Route unavailable")}</span></div>
            <div class="flight-meta"><span>${escapeHtml(flight.aircraft || "Aircraft unavailable")}</span><b class="${flight.missing ? "has-gap" : "covered"}">${flight.assigned}/${flight.required}${flight.missing ? ` · ${flight.missing} missing` : " · covered"}</b></div>
          </summary>
          <div class="airline-duty-table-wrap"><table class="airline-duty-table">
            <thead><tr><th>SLA / role</th><th>Duty window</th><th>Coverage</th><th>Allocated staff</th><th>Action</th></tr></thead>
            <tbody>${dutyRows}</tbody>
          </table></div>
        </details>`;
    }).join("") : '<div class="empty-selection">No flights match the current search and SLA filters for this workday.</div>';
    return `<section class="airline-day-section" aria-labelledby="${dayHeadingId}">
      <header class="airline-day-head">
        <div><span>${escapeHtml(weekdayFormatter.format(date))}</span><h3 id="${dayHeadingId}">${escapeHtml(dateFormatter.format(date))}</h3></div>
        <dl><div><dt>Flights</dt><dd>${day.flightCount}</dd></div><div><dt>SLA duties</dt><dd>${day.dutyCount}</dd></div><div><dt>Allocated</dt><dd>${day.assigned}/${day.required}</dd></div><div class="${day.missing ? "has-gap" : "covered"}"><dt>Missing</dt><dd>${day.missing}</dd></div></dl>
        <button type="button" class="secondary-btn day-toggle-btn" data-day-iso="${day.isoDate}" aria-expanded="true">Collapse day</button>
      </header>
      <div class="flight-schedule-list" id="day-list-${day.isoDate}">${flightCards}</div>
    </section>`;
  }).join("");

  rosterAirlineView.querySelectorAll(".day-toggle-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const dayIso = button.dataset.dayIso;
      const list = document.getElementById(`day-list-${dayIso}`);
      if (!list) return;
      const isCollapsed = list.classList.toggle("day-collapsed");
      button.textContent = isCollapsed ? "Expand day" : "Collapse day";
      button.setAttribute("aria-expanded", String(!isCollapsed));
    });
  });

  rosterAirlineView.querySelectorAll(".board-plan-btn").forEach((button) => button.addEventListener("click", () => {
    const duty = dutyRefs[Number(button.dataset.dutyIndex)];
    if (!duty) return;
    openRosterInlineReplacement(duty, null);
  }));
  rosterAirlineView.querySelectorAll(".board-add-btn").forEach((button) => button.addEventListener("click", () => {
    const duty = dutyRefs[Number(button.dataset.addDutyIndex)];
    if (!duty) return;
    openRosterInlineReplacement(duty, null);
  }));
  rosterAirlineView.querySelectorAll(".board-staff-btn").forEach((button) => button.addEventListener("click", () => {
    const item = staffRefs[Number(button.dataset.staffIndex)];
    if (!item?.identity) return;
    openRosterInlineReplacement(item.duty, item.identity);
  }));

  resultCount.textContent = String(visibleFlights);
  resultCount.title = `${visibleDuties} visible SLA duties · ${visibleMissing} missing positions`;
  csvBtn.disabled = visibleDuties === 0;
}

function filterRosterPeople(rows) {
  const query = rosterStaffSearch.value.trim().toLowerCase();
  return rows.filter((person) => {
    if (rosterStatus.value && person.status !== rosterStatus.value) return false;
    if (rosterSla.value && !person.overlapping.some((row) => row.sla === rosterSla.value)) return false;
    const visibleAssignments = person.byDay.flat();
    const searchable = [person.initials, person.name, ...visibleAssignments.flatMap((row) => [row.flight, row.route, row.sla])].join(" ").toLowerCase();
    return !query || searchable.includes(query);
  });
}

function getRosterHolidayDates(windows) {
  const dates = new Set(
    String(document.getElementById("publicHolidays").value || "")
      .split(/[\s,;]+/)
      .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
  );
  const years = new Set(windows.map((window) => Number(window.isoDate.slice(0, 4))));
  for (const year of years) {
    for (const holiday of HolidayUtils.getGermanBavarianHolidays(year)) dates.add(holiday.date);
  }
  return dates;
}

function renderRosterHoursOverview(people, windows) {
  const holidayDates = getRosterHolidayDates(windows);
  const summaries = people.map((person) => ({
    person,
    totals: OperationsUtils.summarizeDutyHours(person.overlapping, windows, holidayDates),
  })).sort((a, b) => b.totals.totalMinutes - a.totals.totalMinutes || a.person.name.localeCompare(b.person.name));
  const combined = summaries.reduce((totals, item) => {
    for (const key of ["dutyCount", "totalMinutes", "weekdayMinutes", "saturdayMinutes", "sundayMinutes", "holidayMinutes"]) {
      totals[key] += item.totals[key];
    }
    return totals;
  }, { dutyCount: 0, totalMinutes: 0, weekdayMinutes: 0, saturdayMinutes: 0, sundayMinutes: 0, holidayMinutes: 0 });

  rosterTotalHours.textContent = formatHours(combined.totalMinutes);
  rosterWeekdayHours.textContent = formatHours(combined.weekdayMinutes);
  rosterSaturdayHours.textContent = formatHours(combined.saturdayMinutes);
  rosterSundayHours.textContent = formatHours(combined.sundayMinutes);
  rosterHolidayHours.textContent = formatHours(combined.holidayMinutes);

  rosterHoursBody.innerHTML = summaries.length ? summaries.map(({ person, totals }) => {
    const workload = getPersonWorkloadMeta(person.overlapping);
    return `
    <tr>
      <td><strong>${escapeHtml(person.name)}</strong><span class="muted"> ${escapeHtml(person.initials)}</span></td>
      <td>${totals.dutyCount}</td>
      <td>${formatHours(totals.totalMinutes)}h</td>
      <td>${formatHours(totals.weekdayMinutes)}h</td>
      <td>${formatHours(totals.saturdayMinutes)}h</td>
      <td>${formatHours(totals.sundayMinutes)}h</td>
      <td>${formatHours(totals.holidayMinutes)}h</td>
      <td>${escapeHtml(workload.slas.join(", ") || "—")}</td>
      <td>${workload.longestSpanHours.toFixed(1)}h</td>
    </tr>
  `;
  }).join("") : '<tr><td colspan="9" class="empty">No staff match the current roster filters.</td></tr>';
}

function getPersonWorkloadMeta(assignments) {
  const slas = [...new Set(assignments.map((row) => row.sla).filter(Boolean))].sort();
  const byDate = new Map();
  for (const row of assignments) {
    const start = parseUtcTime(row.date, row.start_utc);
    const end = parseUtcTime(row.date, row.release_utc);
    if (!start || !end) continue;
    if (!byDate.has(row.date)) byDate.set(row.date, []);
    byDate.get(row.date).push({ start, end });
  }
  let longestSpanHours = 0;
  for (const duties of byDate.values()) {
    duties.sort((a, b) => a.start - b.start);
    longestSpanHours = Math.max(longestSpanHours, (duties.at(-1).end - duties[0].start) / 3600000);
  }
  return { slas, longestSpanHours };
}

function clearRosterHoursOverview(emptyText) {
  for (const element of [rosterTotalHours, rosterWeekdayHours, rosterSaturdayHours, rosterSundayHours, rosterHolidayHours]) {
    element.textContent = "0.0";
  }
  rosterHoursBody.innerHTML = `<tr><td colspan="9" class="empty">${escapeHtml(emptyText)}</td></tr>`;
}

function formatHours(minutes) {
  return (Number(minutes || 0) / 60).toFixed(1);
}

function renderRosterHeader(windows) {
  const table = rosterHead.closest("table");
  table.classList.toggle("single-day", windows.length === 1);
  if (!windows.length) {
    table.style.minWidth = "100%";
    rosterHead.innerHTML = "<tr><th>Staff member</th><th>Duty list by day</th></tr>";
    return;
  }
  table.style.minWidth = windows.length === 1 ? "100%" : `${190 + (windows.length * 180) + (showRosterDutyTotals ? 90 : 0)}px`;
  const weekdayFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "UTC" });
  const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
  rosterHead.innerHTML = `<tr><th>Staff member</th>${windows.map((window) => `
    <th class="roster-date-heading">
      <span>${escapeHtml(weekdayFormatter.format(window.start))}</span>
      <strong>${escapeHtml(dateFormatter.format(window.start))}</strong>
    </th>
  `).join("")}${showRosterDutyTotals ? '<th class="roster-date-heading"><span>Selected</span><strong>Range hours</strong></th>' : ""}</tr>`;
}

function renderRosterDayCell(assignments, window, showTotal = false) {
  const dutyHours = showTotal ? formatHours(OperationsUtils.summarizeDutyHours(assignments, [window]).totalMinutes) : "";
  if (!assignments.length) return `<td class="roster-day-cell free-day"><div class="roster-free-day-content">${showTotal ? '<span class="roster-day-total">0.0h</span>' : ""}<span>Free</span></div></td>`;
  const useLocal = rosterLocalTimeToggle.checked;
  const zoneLabel = useLocal ? "Local" : "Z";
  const duties = assignments.map((row) => `
    <button type="button" class="compact-duty" title="Find a replacement · ${escapeHtml(`${row.route || ""} · ${row.start_utc || ""}–${row.release_utc || ""} UTC`)}">
      <strong>${escapeHtml(row.flight)}</strong>
      <span class="compact-sla">${escapeHtml(row.sla)}</span>
      <small>${escapeHtml(getDisplayTime(row.date, row.start_utc, useLocal))}–${escapeHtml(getDisplayTime(row.date, row.release_utc, useLocal))} ${zoneLabel}</small>
    </button>
  `).join("");
  return `<td class="roster-day-cell">${showTotal ? `<span class="roster-day-total">${dutyHours}h</span>` : ""}<div class="duty-strip">${duties}</div></td>`;
}

function openReplacementFinder(person, duty) {
  myInitialsInput.value = person.name;
  localStorage.setItem("myInitials", person.name);
  switchTab("replacements");
  showCandidatesForDuty(duty);
  setMessage(`Showing agents available to replace ${person.name} on ${duty.flight} (${duty.sla}).`);
}

function openRosterInlineReplacement(duty, personToReplace = null) {
  const drawer = document.getElementById("rosterInlineReplacementDrawer");
  const titleEl = document.getElementById("rosterInlineTitle");
  const subtitleEl = document.getElementById("rosterInlineSubtitle");
  const contentEl = document.getElementById("rosterInlineCandidatesContent");
  const closeBtn = document.getElementById("rosterInlineCloseBtn");

  if (!drawer || !contentEl) return;

  const replaceName = personToReplace ? (personToReplace.name || personToReplace.initials) : "Unassigned Position";
  titleEl.innerHTML = `Replacement Candidates for <strong>${escapeHtml(duty.flight || "")} · ${escapeHtml(duty.sla || "")}</strong>`;
  subtitleEl.textContent = `Target Duty: ${duty.date} (${duty.start_utc}–${duty.release_utc} UTC) · Replacing: ${replaceName}`;

  drawer.hidden = false;
  drawer.scrollIntoView({ behavior: "smooth", block: "nearest" });

  if (closeBtn) {
    closeBtn.onclick = () => { drawer.hidden = true; };
  }

  const candidates = OperationsUtils.getDutyGapCandidates(duty, latestRows, latestStaffDirectory, getPlannerOptions());

  if (!candidates || !candidates.length) {
    contentEl.innerHTML = `<div class="empty-selection" style="grid-column: 1 / -1;">No available staff members meet the criteria for this duty window.</div>`;
    return;
  }

  contentEl.innerHTML = candidates.map((cand) => {
    const bufferHours = formatHours(cand.connectionGapMinutes);
    const statusText = cand.freeAllDay
      ? "Free all day"
      : cand.adjacent
      ? `Back-to-back shift (${bufferHours}h buffer)`
      : `Free window (${bufferHours}h buffer)`;

    const slaExpText = cand.slaExperience ? ` · ${cand.slaExperience} ${duty.sla} duties prior` : "";

    return `
      <div class="inline-candidate-card">
        <div class="inline-candidate-info">
          <strong>${escapeHtml(cand.name)} <small>(${escapeHtml(cand.initials)})</small></strong>
          <span>${escapeHtml(statusText)}</span>
          <small>${escapeHtml(`${cand.sameDayDuties ? cand.sameDayDuties.length : 0} shifts scheduled today${slaExpText}`)}</small>
        </div>
        <button type="button" class="inline-assign-btn" data-assign-key="${escapeHtml(cand.key)}" data-assign-name="${escapeHtml(cand.name)}">+ Assign</button>
      </div>
    `;
  }).join("");

  contentEl.querySelectorAll("button[data-assign-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const candidateKey = btn.dataset.assignKey;
      const candidateName = btn.dataset.assignName;

      if (!currentAutoPlan) {
        currentAutoPlan = {
          slots: [],
          gapCount: 1,
          requestedPositions: Number(duty.missing || 1),
          assignments: [],
          unfilled: [],
        };
      }

      const targetIndex = currentAutoPlan.slots.findIndex((slot) => OperationsUtils.rowKey(slot.row) === OperationsUtils.rowKey(duty) && !slot.personKey);
      const proposedSlots = currentAutoPlan.slots.map((slot, index) => ({
        row: slot.row,
        personKey: index === targetIndex ? candidateKey : slot.personKey,
      })).filter((item) => item.personKey);
      if (targetIndex < 0) proposedSlots.push({ row: duty, personKey: candidateKey });

      const validation = OperationsUtils.validateAutoAssignments(latestRows, latestStaffDirectory, proposedSlots, getPlannerOptions());
      if (!validation.valid) {
        return setMessage(`Cannot assign ${candidateName}: ${plannerViolationText(validation)}.`, "warn");
      }

      selectedPlannerStaff.add(candidateKey);
      if (targetIndex >= 0) {
        currentAutoPlan.slots[targetIndex].personKey = candidateKey;
      } else {
        currentAutoPlan.slots.push({ row: duty, personKey: candidateKey, position: 1 });
      }

      renderAutomaticPlan();
      renderRoster();
      setMessage(`Assigned ${candidateName} to ${duty.flight} (${duty.sla}).`, "success");
      drawer.hidden = true;
    });
  });
}

function parseStaffIdentity(staffString) {
  return StaffUtils.parseStaffIdentity(staffString);
}

function getKnownStaffStrings() {
  const staff = new Set(latestStaffDirectory.map((value) => value.trim()).filter(Boolean));
  for (const row of latestRows) {
    for (const value of row.staff || []) staff.add(value.trim());
  }
  return staff;
}

function updateStaffOptions() {
  if (!staffOptions) return;
  const people = [...getKnownStaffStrings()]
    .map(parseStaffIdentity)
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
  const seen = new Set();
  staffOptions.innerHTML = "";
  for (const person of people) {
    if (seen.has(person.key)) continue;
    seen.add(person.key);
    const option = document.createElement("option");
    option.value = person.name;
    option.label = `${person.initials} - ${person.name}`;
    staffOptions.appendChild(option);
  }
  renderPlannerStaffList();
}

function getPlannerPeople() {
  const seen = new Set();
  return [...getKnownStaffStrings()].map(parseStaffIdentity).filter((person) => {
    if (!person || seen.has(person.key)) return false;
    seen.add(person.key);
    return true;
  }).sort((a, b) => a.name.localeCompare(b.name));
}

function renderPlannerStaffList() {
  const query = autoPlannerStaffSearch.value.trim().toLowerCase();
  const people = getPlannerPeople();
  const visible = people.filter((person) => !query || `${person.initials} ${person.name}`.toLowerCase().includes(query));
  selectedPlannerStaff = new Set([...selectedPlannerStaff].filter((key) => people.some((person) => person.key === key)));
  autoPlannerStaffList.innerHTML = visible.length ? visible.map((person) => `
    <label><input type="checkbox" value="${escapeHtml(person.key)}" ${selectedPlannerStaff.has(person.key) ? "checked" : ""}><span><strong>${escapeHtml(person.name)}</strong><small>${escapeHtml(person.initials)}</small></span></label>
  `).join("") : `<span class="muted">${people.length ? "No staff match this search." : "Run a scan to load staff."}</span>`;
  for (const input of autoPlannerStaffList.querySelectorAll('input[type="checkbox"]')) input.addEventListener("change", () => {
    if (input.checked) {
      selectedPlannerStaff.add(input.value);
      availabilityStaff.value = input.value;
      renderAvailabilityRules();
      updateAvailabilityFields();
    } else {
      selectedPlannerStaff.delete(input.value);
    }
    currentAutoPlan = null;
    autoPlannerResult.textContent = `${selectedPlannerStaff.size} staff selected. Build a new plan to apply the change.`;
  });
  const staffBadge = document.getElementById("plannerStaffBadge");
  if (staffBadge) staffBadge.textContent = `${selectedPlannerStaff.size} selected`;
  autoPlannerSelectAll.textContent = people.length && selectedPlannerStaff.size === people.length ? "Clear all" : "Select all";
  const previousAvailabilityStaff = availabilityStaff.value;
  availabilityStaff.innerHTML = `<option value="">Select staff</option>${people.map((person) => `<option value="${escapeHtml(person.key)}">${escapeHtml(person.initials)} — ${escapeHtml(person.name)}</option>`).join("")}`;
  if (people.some((person) => person.key === previousAvailabilityStaff)) {
    availabilityStaff.value = previousAvailabilityStaff;
  } else if (people.length) {
    const defaultStaff = people.find((person) => selectedPlannerStaff.has(person.key)) || people[0];
    if (defaultStaff) {
      availabilityStaff.value = defaultStaff.key;
      renderAvailabilityRules();
      updateAvailabilityFields();
    }
  }
  renderPlannerSlaOptions();
}

function toggleAllPlannerStaff() {
  const people = getPlannerPeople();
  selectedPlannerStaff = selectedPlannerStaff.size === people.length ? new Set() : new Set(people.map((person) => person.key));
  currentAutoPlan = null;
  renderPlannerStaffList();
  autoPlannerResult.textContent = `${selectedPlannerStaff.size} staff selected.`;
}

function getPlannerOptions() {
  return {
    maxDutyHours: Number(document.getElementById("plannerMaxHours").value) || 8,
    maxSpanHours: Number(document.getElementById("plannerMaxSpan").value) || 10,
    bufferMinutes: Math.max(0, Number(document.getElementById("plannerBuffer").value) || 0),
    breakAfterHours: Number(document.getElementById("plannerBreakAfter").value) || 6,
    breakMinutes: Math.max(0, Number(document.getElementById("plannerBreakLength").value) || 0),
    maxWeeklyHours: Number(document.getElementById("plannerWeeklyHours").value) || 0,
    maxWorkingDaysPerWeek: Number(document.getElementById("plannerWeeklyDays").value) || 7,
    maxMonthlyHours: Number(document.getElementById("plannerMonthlyHours").value) || 0,
    availabilityRules: plannerAvailabilityRules,
    allowedSlas: [...plannerSlas.selectedOptions].map((option) => option.value),
  };
}

function savePlannerOptions() {
  localStorage.setItem("gsrmAutoPlannerOptionsV1", JSON.stringify(getPlannerOptions()));
  if (currentAutoPlan) autoPlannerResult.insertAdjacentHTML("afterbegin", '<div class="planner-notice">Rules changed. Build the plan again to recalculate assignments.</div>');
}

function loadPlannerOptions() {
  try {
    const saved = JSON.parse(localStorage.getItem("gsrmAutoPlannerOptionsV1") || "{}");
    const values = [saved.maxDutyHours, saved.maxSpanHours, saved.bufferMinutes, saved.breakAfterHours, saved.breakMinutes, saved.maxWeeklyHours, saved.maxWorkingDaysPerWeek, saved.maxMonthlyHours];
    plannerOptionIds.forEach((id, index) => { if (Number.isFinite(Number(values[index]))) document.getElementById(id).value = values[index]; });
    if (Array.isArray(saved.allowedSlas)) for (const option of plannerSlas.options) option.selected = saved.allowedSlas.includes(option.value);
  } catch {}
  try { plannerAvailabilityRules = JSON.parse(localStorage.getItem("gsrmPlannerAvailabilityV1") || "[]"); } catch { plannerAvailabilityRules = []; }
  renderAvailabilityRules();
  updateAvailabilityFields();
}

function updateAvailabilityFields() {
  const mode = availabilityPeriod.value;
  document.getElementById("availabilityDateField").hidden = ["month", "dates"].includes(mode);
  document.getElementById("availabilityEndField").hidden = !["range", "weekly"].includes(mode);
  document.getElementById("availabilityMonthField").hidden = mode !== "month";
  document.getElementById("availabilityDatesField").hidden = mode !== "dates";
  document.getElementById("availabilityWeekdays").hidden = mode !== "weekly";
  if (mode === "dates") renderAvailabilityCalendar();
  const custom = availabilityShift.value === "custom";
  document.getElementById("availabilityFromField").hidden = !custom;
  document.getElementById("availabilityToField").hidden = !custom;
  renderAvailabilityPreview();
}

function addAvailabilityRule() {
  if (!availabilityStaff.value) return setMessage("Select a staff member before adding an availability rule.", "warn");
  const mode = availabilityPeriod.value;
  let startDate = availabilityDate.value;
  let endDate = mode === "day" ? startDate : availabilityEnd.value;
  let dates = [];
  if (mode === "month") {
    const range = StaffUtils.getUtcMonthRange(`${availabilityMonth.value}-01`);
    startDate = range?.startDate || "";
    endDate = range?.endDate || "";
  }
  if (mode === "dates") {
    dates = [...new Set([...selectedAvailabilityDates, ...parseAvailabilityDates(availabilityDatesQuick.value)])].sort();
    startDate = dates[0] || "";
    endDate = dates.at(-1) || "";
  }
  const weekdays = mode === "weekly" ? [...document.querySelectorAll('#availabilityWeekdays input:checked')].map((input) => input.value) : [];
  if (!startDate || !endDate || endDate < startDate) return setMessage("Enter a valid availability period.", "warn");
  if (mode === "weekly" && !weekdays.length) return setMessage("Select at least one weekday for the weekly availability rule.", "warn");
  plannerAvailabilityRules.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    personKey: availabilityStaff.value,
    startDate,
    endDate,
    weekdays,
    dates,
    shift: availabilityShift.value,
    from: availabilityFrom.value,
    to: availabilityTo.value,
  });
  localStorage.setItem("gsrmPlannerAvailabilityV1", JSON.stringify(plannerAvailabilityRules));
  if (mode === "dates") {
    selectedAvailabilityDates = new Set();
    availabilityDatesQuick.value = "";
    renderAvailabilityCalendar();
  }
  currentAutoPlan = null;
  renderAvailabilityRules();
  autoPlannerResult.textContent = "Availability updated. Build a new plan to apply it.";
}

function parseAvailabilityDates(value) {
  const fallbackYear = Number((rosterDate.value || today).slice(0, 4));
  return [...new Set(String(value || "").split(/[;,\s]+/).map((part) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(part)) return part;
    const match = part.match(/^(\d{1,2})\.(\d{1,2})(?:\.(\d{4}))?$/);
    if (!match) return "";
    const candidate = `${match[3] || fallbackYear}-${String(Number(match[2])).padStart(2, "0")}-${String(Number(match[1])).padStart(2, "0")}`;
    const date = new Date(`${candidate}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === candidate ? candidate : "";
  }).filter(Boolean))].sort();
}

function shiftAvailabilityCalendar(months) {
  const current = new Date(`${availabilityCalendarMonth.value || today.slice(0, 7)}-01T00:00:00Z`);
  current.setUTCMonth(current.getUTCMonth() + months);
  availabilityCalendarMonth.value = current.toISOString().slice(0, 7);
  renderAvailabilityCalendar();
}

function renderAvailabilityCalendar() {
  if (!availabilityCalendar) return;
  const monthValue = availabilityCalendarMonth.value || today.slice(0, 7);
  const first = new Date(`${monthValue}-01T00:00:00Z`);
  if (Number.isNaN(first.getTime())) return;
  const daysInMonth = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  const mondayOffset = (first.getUTCDay() + 6) % 7;
  const headings = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => `<span class="calendar-weekday">${day}</span>`).join("");
  const blanks = Array.from({ length: mondayOffset }, () => "<span></span>").join("");
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const isoDate = `${monthValue}-${String(day).padStart(2, "0")}`;
    return `<button type="button" data-calendar-date="${isoDate}" class="${selectedAvailabilityDates.has(isoDate) ? "selected" : ""}" aria-pressed="${selectedAvailabilityDates.has(isoDate)}">${day}</button>`;
  }).join("");
  availabilityCalendar.innerHTML = headings + blanks + days;
  for (const button of availabilityCalendar.querySelectorAll("button[data-calendar-date]")) button.addEventListener("click", () => {
    if (selectedAvailabilityDates.has(button.dataset.calendarDate)) selectedAvailabilityDates.delete(button.dataset.calendarDate);
    else selectedAvailabilityDates.add(button.dataset.calendarDate);
    renderAvailabilityCalendar();
  });
  const selected = [...selectedAvailabilityDates].sort();
  document.getElementById("availabilitySelectedDates").textContent = selected.length ? `${selected.length} selected · ${selected.join(", ")}` : "No dates selected";
  renderAvailabilityPreview();
}

function renderAvailabilityPreview() {
  const target = document.getElementById("availabilityPreviewCalendar");
  if (!target) return;
  const mode = availabilityPeriod.value;
  const monthValue = mode === "month" ? (availabilityMonth.value || today.slice(0, 7))
    : mode === "dates" ? (availabilityCalendarMonth.value || today.slice(0, 7))
    : (availabilityDate.value || today).slice(0, 7);
  const first = new Date(`${monthValue}-01T00:00:00Z`);
  if (Number.isNaN(first.getTime())) return;
  const count = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  const offset = (first.getUTCDay() + 6) % 7;
  const selected = new Set();
  const pastedDates = mode === "dates" ? parseAvailabilityDates(availabilityDatesQuick.value) : [];
  const selectedWeekdays = new Set([...document.querySelectorAll('#availabilityWeekdays input:checked')].map((input) => Number(input.value)));
  for (let day = 1; day <= count; day += 1) {
    const isoDate = `${monthValue}-${String(day).padStart(2, "0")}`;
    const date = new Date(`${isoDate}T00:00:00Z`);
    const active = mode === "month"
      || (mode === "day" && isoDate === availabilityDate.value)
      || (mode === "range" && isoDate >= availabilityDate.value && isoDate <= availabilityEnd.value)
      || (mode === "weekly" && isoDate >= availabilityDate.value && isoDate <= availabilityEnd.value && selectedWeekdays.has(date.getUTCDay()))
      || (mode === "dates" && (selectedAvailabilityDates.has(isoDate) || pastedDates.includes(isoDate)));
    if (active) selected.add(isoDate);
  }
  document.getElementById("availabilityPreviewMonth").textContent = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(first);
  target.innerHTML = ["M", "T", "W", "T", "F", "S", "S"].map((day) => `<span class="calendar-weekday">${day}</span>`).join("")
    + Array.from({ length: offset }, () => "<span></span>").join("")
    + Array.from({ length: count }, (_, index) => {
      const isoDate = `${monthValue}-${String(index + 1).padStart(2, "0")}`;
      return `<span class="calendar-day ${selected.has(isoDate) ? "selected" : ""}">${index + 1}</span>`;
    }).join("");
}

function renderAvailabilityRules() {
  const people = new Map(getPlannerPeople().map((person) => [person.key, person]));
  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const rulesBadge = document.getElementById("plannerRulesBadge");
  if (rulesBadge) rulesBadge.textContent = `${plannerAvailabilityRules.length} rule${plannerAvailabilityRules.length === 1 ? "" : "s"}`;
  availabilityRulesEl.innerHTML = plannerAvailabilityRules.length ? plannerAvailabilityRules.map((rule) => {
    const person = people.get(rule.personKey);
    const period = rule.dates?.length ? rule.dates.join(", ") : rule.startDate === rule.endDate ? rule.startDate : `${rule.startDate}–${rule.endDate}`;
    const days = rule.weekdays?.length ? ` · ${rule.weekdays.map((day) => weekdayNames[Number(day)]).join(", ")}` : "";
    const shifts = { full: "All day", morning: "Morning 04:00–12:00", evening: "Evening 12:00–23:59", unavailable: "Unavailable", custom: `${rule.from}–${rule.to} UTC` };
    return `<div class="availability-rule"><span><strong>${escapeHtml(person?.name || rule.personKey)}</strong><small>${escapeHtml(period + days)} · ${escapeHtml(shifts[rule.shift] || rule.shift)}</small></span><button type="button" data-rule-id="${escapeHtml(rule.id)}" title="Remove availability rule">×</button></div>`;
  }).join("") : '<span class="muted">No availability rules yet; staff are treated as available.</span>';
  for (const button of availabilityRulesEl.querySelectorAll("button[data-rule-id]")) button.addEventListener("click", () => {
    plannerAvailabilityRules = plannerAvailabilityRules.filter((rule) => rule.id !== button.dataset.ruleId);
    localStorage.setItem("gsrmPlannerAvailabilityV1", JSON.stringify(plannerAvailabilityRules));
    currentAutoPlan = null;
    renderAvailabilityRules();
  });
}

function renderPlannerSlaOptions() {
  const values = [...new Set(latestRows.map((row) => row.sla).filter(Boolean))].sort();
  let saved = null;
  try {
    const options = JSON.parse(localStorage.getItem("gsrmAutoPlannerOptionsV1") || "{}");
    if (Array.isArray(options.allowedSlas)) saved = new Set(options.allowedSlas);
  } catch {}
  plannerSlas.innerHTML = values.length
    ? values.map((sla) => `<option value="${escapeHtml(sla)}" ${!saved || saved.has(sla) ? "selected" : ""}>${escapeHtml(sla)}</option>`).join("")
    : '<option value="" disabled>Run a scan to load SLAs</option>';
}

function buildAutomaticPlan() {
  const roster = getRosterRows();
  if (!roster) return setMessage("Choose a scanned roster date and time window before building a plan.", "warn");
  if (!selectedPlannerStaff.size) return setMessage("Select at least one eligible staff member for automatic planning.", "warn");
  if (!plannerSlas.selectedOptions.length) return setMessage("Select at least one SLA for the automatic planner.", "warn");
  const generated = OperationsUtils.buildAutoPlan(latestRows, latestStaffDirectory, [...selectedPlannerStaff], roster.dailyWindows, getPlannerOptions());
  const assignmentBySlot = new Map(generated.assignments.map((item) => [`${OperationsUtils.rowKey(item.row)}|${item.position}`, item.person.key]));
  const slots = [];
  const allowedSlas = new Set(getPlannerOptions().allowedSlas);
  for (const row of latestRows.filter((item) => Number(item.missing || 0) > 0)) {
    if (!allowedSlas.has(row.sla)) continue;
    const start = OperationsUtils.parseDutyTime(row.date, row.start_utc);
    const end = OperationsUtils.parseDutyTime(row.date, row.release_utc);
    if (!start || !end || !roster.dailyWindows.some((window) => start < window.end && end > window.start)) continue;
    for (let position = 1; position <= Number(row.missing || 0); position += 1) slots.push({ row, position, personKey: assignmentBySlot.get(`${OperationsUtils.rowKey(row)}|${position}`) || "" });
  }
  currentAutoPlan = { ...generated, slots };
  renderAutomaticPlan();
  if (rosterViewMode === "airline") renderRoster();
  setMessage(`Automatic plan filled ${generated.assignments.length} of ${generated.requestedPositions} missing position(s).`);
}

function clearAutomaticPlan() {
  currentAutoPlan = null;
  autoPlannerResult.textContent = "Plan cleared. Select eligible staff, adjust the rules, then build a plan.";
  if (rosterViewMode === "airline") renderRoster();
}

function plannerViolationText(result) {
  const labels = { staff: "unknown staff", availability: "outside staff availability", sla: "not eligible for this SLA", duplicate: "already assigned to this duty", overlap: "overlapping duties", buffer: "buffer too short", hours: "daily hours exceeded", span: "day span exceeded", break: "required break missing", weeklyHours: "weekly hours exceeded", weeklyDays: "weekly working days exceeded", monthlyHours: "monthly hours exceeded" };
  return [...new Set(result.violations.flatMap((item) => item.codes || []).map((code) => labels[code] || code))].join(", ");
}

function applyPlanToRosterBoard() {
  if (!currentAutoPlan) return;
  setRosterViewMode("airline");
  setAllAirlineSections(true);
  renderRoster();
  const filledCount = currentAutoPlan.slots.filter((s) => s.personKey).length;
  setMessage(`Applied ${filledCount} planned assignments to the Flight Schedule view.`, "success");
  const board = document.getElementById("rosterAirlineView");
  if (board) board.scrollIntoView({ behavior: "smooth" });
}

function exportAutoPlanCsv() {
  if (!currentAutoPlan || !currentAutoPlan.slots || !currentAutoPlan.slots.length) {
    return setMessage("No automatic plan available to export.", "warn");
  }
  const peopleByKey = new Map(getPlannerPeople().map((p) => [p.key, p]));
  const headers = ["Flight", "SLA Role", "Date", "Start UTC", "Release UTC", "Position", "Assigned Staff Initials", "Assigned Staff Name", "Status"];
  const rows = currentAutoPlan.slots.map((slot) => {
    const person = peopleByKey.get(slot.personKey);
    return [
      `"${(slot.row.flight || "").replace(/"/g, '""')}"`,
      `"${(slot.row.sla || "").replace(/"/g, '""')}"`,
      `"${(slot.row.date || "").replace(/"/g, '""')}"`,
      `"${(slot.row.start_utc || "").replace(/"/g, '""')}"`,
      `"${(slot.row.release_utc || "").replace(/"/g, '""')}"`,
      slot.position,
      `"${person ? person.initials : ""}"`,
      `"${person ? person.name.replace(/"/g, '""') : ""}"`,
      `"${slot.personKey ? "FILLED" : "UNFILLED"}"`,
    ].join(",");
  });

  const csvContent = [headers.join(","), ...rows].join("\n");
  const stamp = new Date().toISOString().slice(0, 10);
  downloadBlob(`gsrm-auto-plan-${stamp}.csv`, csvContent, "text/csv;charset=utf-8");
  setMessage("Downloaded automatic planning schedule report (CSV).");
}

function renderAutomaticPlan(errorText = "") {
  if (!currentAutoPlan) return;
  const people = getPlannerPeople().filter((person) => selectedPlannerStaff.has(person.key));
  const assignedSlots = currentAutoPlan.slots.filter((slot) => slot.personKey);
  const assignedCount = assignedSlots.length;
  const totalSlots = currentAutoPlan.slots.length;
  const coveragePercent = totalSlots > 0 ? Math.round((assignedCount / totalSlots) * 100) : 0;

  const staffTotals = new Map();
  for (const slot of assignedSlots) {
    staffTotals.set(slot.personKey, (staffTotals.get(slot.personKey) || 0) + OperationsUtils.dutyMinutes(slot.row));
  }
  const totalWorkloadMinutes = [...staffTotals.values()].reduce((sum, m) => sum + m, 0);
  const unfilledSlots = currentAutoPlan.slots.filter((slot) => !slot.personKey);

  autoPlannerResult.innerHTML = `
    ${errorText ? `<div class="planner-notice error">${escapeHtml(errorText)}</div>` : ""}
    <div class="auto-planner-outcome-dashboard">
      <div class="auto-plan-hero-kpis">
        <div class="auto-plan-kpi-card ${coveragePercent === 100 ? "success" : coveragePercent > 0 ? "warning" : "info"}">
          <span>Coverage Rate</span>
          <strong>${coveragePercent}%</strong>
          <div class="auto-plan-progress-bar"><div class="auto-plan-progress-fill" style="width: ${coveragePercent}%;"></div></div>
        </div>
        <div class="auto-plan-kpi-card success">
          <span>Positions Planned</span>
          <strong>${assignedCount} / ${totalSlots}</strong>
        </div>
        <div class="auto-plan-kpi-card info">
          <span>Staff Deployed</span>
          <strong>${staffTotals.size} Members</strong>
        </div>
        <div class="auto-plan-kpi-card">
          <span>Total Workload</span>
          <strong>${formatHours(totalWorkloadMinutes)}h</strong>
        </div>
      </div>

      <div class="auto-plan-action-bar">
        <div>
          <strong style="color:var(--ink); font-size:14px;">Automatic Duty Plan Outcome</strong>
          <span style="display:block; font-size:11px; color:var(--muted);">${assignedCount} filled, ${unfilledSlots.length} unfilled across ${currentAutoPlan.gapCount} gap duties</span>
        </div>
        <div class="auto-plan-action-buttons">
          <button type="button" class="primary-btn" id="applyAutoPlanBtn">Apply Plan to Roster</button>
          <button type="button" class="secondary-btn" id="exportAutoPlanBtn">Export CSV</button>
          <button type="button" class="secondary-btn" id="clearAutoPlanBtn">Clear</button>
        </div>
      </div>

      <div class="auto-plan-slots-table">
        ${currentAutoPlan.slots.map((slot, index) => `
          <div class="auto-plan-slot-card ${slot.personKey ? "filled" : "unfilled"}">
            <div class="auto-plan-slot-info">
              <strong>${escapeHtml(slot.row.flight)} · ${escapeHtml(slot.row.sla)} <small style="color:var(--muted); font-weight:normal;">(Position ${slot.position})</small></strong>
              <span>${escapeHtml(slot.row.date)} · ${escapeHtml(slot.row.start_utc)}–${escapeHtml(slot.row.release_utc)} UTC (${OperationsUtils.dutyMinutes(slot.row)} min)</span>
            </div>
            <div class="auto-plan-slot-select">
              <label><span class="sr-only">Assigned staff</span>
                <select data-plan-slot="${index}">
                  <option value="">Unfilled position</option>
                  ${people.map((person) => `<option value="${escapeHtml(person.key)}" ${person.key === slot.personKey ? "selected" : ""}>${escapeHtml(person.initials)} — ${escapeHtml(person.name)}</option>`).join("")}
                </select>
              </label>
            </div>
          </div>
        `).join("")}
      </div>

      ${unfilledSlots.length ? `
        <div class="unfilled-diagnostics-card">
          <strong>Diagnostic Note: ${unfilledSlots.length} position(s) could not be filled automatically</strong>
          <span>Reasons may include daily/weekly hour limits, overlapping shift windows, or custom availability exclusions. Try selecting additional staff in Step 1 or adjusting shift buffers in Step 2.</span>
        </div>
      ` : ""}

      <div class="auto-plan-workload">
        <strong style="font-size:12px; color:var(--ink);">Planned Workload per Staff Member:</strong>
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:6px;">
          ${people.filter((person) => staffTotals.has(person.key)).map((person) => `<span style="padding:4px 8px; background:#f1f5f9; border-radius:6px; font-size:11px; font-weight:700;"><strong>${escapeHtml(person.name)}</strong>: +${formatHours(staffTotals.get(person.key))}h planned</span>`).join("") || "<span class=\"muted\">No assignments.</span>"}
        </div>
      </div>
    </div>
  `;

  for (const select of autoPlannerResult.querySelectorAll("select[data-plan-slot]")) {
    select.addEventListener("change", () => updateManualPlanSlot(Number(select.dataset.planSlot), select.value));
  }
  document.getElementById("applyAutoPlanBtn")?.addEventListener("click", applyPlanToRosterBoard);
  document.getElementById("exportAutoPlanBtn")?.addEventListener("click", exportAutoPlanCsv);
  document.getElementById("clearAutoPlanBtn")?.addEventListener("click", clearAutomaticPlan);
}

function updateManualPlanSlot(index, personKey) {
  const proposed = currentAutoPlan.slots.map((slot, slotIndex) => ({ row: slot.row, personKey: slotIndex === index ? personKey : slot.personKey })).filter((item) => item.personKey);
  const validation = OperationsUtils.validateAutoAssignments(latestRows, latestStaffDirectory, proposed, getPlannerOptions());
  if (!validation.valid) return renderAutomaticPlan(`Cannot make that assignment: ${plannerViolationText(validation)}.`);
  currentAutoPlan.slots[index].personKey = personKey;
  renderAutomaticPlan();
  if (rosterViewMode === "airline") renderRoster();
}

loadPlannerOptions();
if (localStorage.getItem("gsrmAutoPlannerCollapsed") === "true") autoPlannerToggle.click();

function resolveStaffIdentity(query) {
  for (const staffString of getKnownStaffStrings()) {
    if (matchStaffMember(staffString, query)) return parseStaffIdentity(staffString);
  }
  return null;
}

function getMaxDutyGap() {
  const enteredValue = Number(maxDutyGapInput.value);
  const unit = maxDutyGapUnit.value === "minutes" ? "minutes" : "hours";
  const fallbackValue = unit === "hours" ? 2 : 120;
  const value = Number.isFinite(enteredValue) && enteredValue >= 0 ? enteredValue : fallbackValue;
  const minutes = unit === "hours" ? value * 60 : value;
  const singularUnit = unit === "hours" ? "hour" : "minute";
  const labelUnit = value === 1 ? singularUnit : unit;
  return { minutes, label: `${value} ${labelUnit}` };
}

function getAssignedStaffStrings() {
  const staff = new Set();
  for (const row of latestRows) {
    for (const value of row.staff || []) staff.add(value.trim());
  }
  return staff;
}

function downloadRosterCsv() {
  const roster = getRosterRows();
  if (!roster) return;
  if (rosterViewMode === "airline") {
    downloadAirlineRosterCsv(roster);
    return;
  }
  const visible = new Set(JSON.parse(rosterBody.dataset.visibleStaffKeys || "[]"));
  const rows = roster.rows.filter((person) => visible.has(person.key));
  const csv = [
    ["Status", "Initials", "Staff Name", "Date", "Flight", "Direction", "Route", "SLA", "Start UTC", "Release UTC"].join(","),
    ...rows.flatMap((person) => (person.overlapping.length ? person.overlapping : [null]).map((allocation) => [
      person.status === "free" ? "Free" : "On duty", person.initials, person.name,
      allocation?.date || "", allocation?.flight || "", allocation?.direction || "", allocation?.route || "",
      allocation?.sla || "", allocation?.start_utc || "", allocation?.release_utc || "",
    ].map(csvCell).join(","))),
  ].join("\n");
  const dateSuffix = rosterDate.value === rosterEndDate.value ? rosterDate.value : `${rosterDate.value}-to-${rosterEndDate.value}`;
  downloadBlob(`gsrm-duty-roster-${dateSuffix}.csv`, csv, "text/csv;charset=utf-8");
}

function downloadAirlineRosterCsv(roster) {
  const days = getAirlineRosterDays(roster);
  const people = new Map(getPlannerPeople().map((person) => [person.key, person]));
  const csv = [
    ["Workday", "Flight", "Direction", "Route", "Aircraft", "Scheduled UTC", "SLA", "Type", "Movement", "Start UTC", "Release UTC", "Required", "Assigned", "Missing", "Allocated Staff", "Locally Planned Staff"].join(","),
    ...days.flatMap((day) => day.flights.flatMap((flight) => flight.duties.map((duty) => {
      const planned = currentAutoPlan?.slots.filter((slot) => slot.personKey && OperationsUtils.rowKey(slot.row) === OperationsUtils.rowKey(duty)).map((slot) => people.get(slot.personKey)?.name || slot.personKey) || [];
      return [
      day.isoDate, duty.flight, duty.direction, duty.route, duty.aircraft, duty.scheduled_utc,
      duty.sla, duty.type, duty.movement, duty.start_utc, duty.release_utc,
      duty.required, duty.assigned, duty.missing, (duty.staff || []).join(" | "), planned.join(" | "),
    ].map(csvCell).join(","); }))),
  ].join("\n");
  const dateSuffix = rosterDate.value === rosterEndDate.value ? rosterDate.value : `${rosterDate.value}-to-${rosterEndDate.value}`;
  downloadBlob(`gsrm-flight-schedule-${dateSuffix}.csv`, csv, "text/csv;charset=utf-8");
}

function showCandidatesForDuty(duty) {
  const candidatesList = document.getElementById("candidatesList");
  candidatesList.innerHTML = "";
  selectedReplacementDuty = duty;

  const initials = myInitialsInput.value.trim().toUpperCase();
  const { minutes: maxGapMinutes, label: maxGapLabel } = getMaxDutyGap();
  const maxGapMs = maxGapMinutes * 60 * 1000;
  const selectedIdentity = resolveStaffIdentity(initials);
  const useLocal = resultsLocalTimeToggle.checked;
  const zoneLabel = useLocal ? "Local" : "Zulu";
  replacementCandidatesHeader.textContent = `Available for ${duty.flight} · ${duty.sla}`;

  const dutyContext = document.createElement("div");
  dutyContext.className = "replacement-duty-context";
  dutyContext.innerHTML = `
    <span>Replacing</span>
    <strong>${escapeHtml(selectedIdentity?.name || myInitialsInput.value.trim())}</strong>
    <b>${escapeHtml(duty.date)} · ${escapeHtml(duty.flight)} · ${escapeHtml(duty.sla)}</b>
    <small>${escapeHtml(getDisplayTime(duty.date, duty.start_utc, useLocal))}–${escapeHtml(getDisplayTime(duty.date, duty.release_utc, useLocal))} ${zoneLabel} · ${escapeHtml(duty.route)}</small>
  `;
  candidatesList.appendChild(dutyContext);

  const staffSet = getKnownStaffStrings();

  const dutyStart = parseUtcTime(duty.date, duty.start_utc);
  const dutyRelease = parseUtcTime(duty.date, duty.release_utc);

  if (!dutyStart || !dutyRelease) {
    candidatesList.innerHTML = `<div class="empty-selection">Error: Invalid duty times.</div>`;
    return;
  }

  const candidates = [];

  [...staffSet].forEach(candStr => {
    const identity = parseStaffIdentity(candStr);
    if (!identity) return;
    const candInitials = identity.initials;
    const candName = identity.name;

    if (matchStaffMember(candStr, initials)) return;

    const shifts = latestRows.filter(row => {
      return row.staff && row.staff.some(s => parseStaffIdentity(s)?.key === identity.key);
    });

    let overlappingShift = null;
    for (const shift of shifts) {
      const start = parseUtcTime(shift.date, shift.start_utc);
      const release = parseUtcTime(shift.date, shift.release_utc);
      if (start && release && start < dutyRelease && release > dutyStart) {
        overlappingShift = shift;
        break;
      }
    }

    if (overlappingShift) return;

    const shiftsOnSameDay = shifts.filter(s => s.date === duty.date);
    const isWorkingOnDay = shiftsOnSameDay.length > 0;
    const slaExperience = shifts.filter(s => s.sla === duty.sla).length;
    let closestGapMs = Infinity;
    let closestDuty = null;
    let closestPosition = "";

    let adjacentType = "";
    let adjacentDetails = "";
    for (const shift of shiftsOnSameDay) {
      const start = parseUtcTime(shift.date, shift.start_utc);
      const release = parseUtcTime(shift.date, shift.release_utc);
      if (start && release) {
        if (release <= dutyStart && dutyStart - release < closestGapMs) {
          closestGapMs = dutyStart - release;
          closestDuty = shift;
          closestPosition = "before";
        }
        if (start >= dutyRelease && start - dutyRelease < closestGapMs) {
          closestGapMs = start - dutyRelease;
          closestDuty = shift;
          closestPosition = "after";
        }
        const diffBeforeMs = Math.abs(dutyStart - release);
        const diffAfterMs = Math.abs(start - dutyRelease);

        if (diffBeforeMs <= 30 * 60 * 1000) {
          adjacentType = adjacentType === "after" ? "both" : "before";
          adjacentDetails = `Ends shift at ${getDisplayTime(shift.date, shift.release_utc, useLocal)} ${zoneLabel}`;
        }
        if (diffAfterMs <= 30 * 60 * 1000) {
          adjacentType = adjacentType === "before" ? "both" : "after";
          adjacentDetails = `Starts shift at ${getDisplayTime(shift.date, shift.start_utc, useLocal)} ${zoneLabel}`;
        }
      }
    }

    const freeAllDay = shiftsOnSameDay.length === 0;
    if (!freeAllDay && (!closestDuty || closestGapMs > maxGapMs)) return;

    let score = 0;
    score += freeAllDay ? 4 : 5;
    if (slaExperience > 0) score += 3;
    if (adjacentType) score += 2;

    candidates.push({
      initials: candInitials,
      name: candName,
      score,
      isWorkingOnDay,
      shiftsOnSameDay,
      slaExperience,
      adjacentType,
      adjacentDetails,
      closestDuty,
      closestPosition,
      freeAllDay,
      connectionGapMinutes: Number.isFinite(closestGapMs) ? Math.round(closestGapMs / 60000) : null
    });
  });

  candidates.sort((a, b) => b.score - a.score || (a.connectionGapMinutes ?? Infinity) - (b.connectionGapMinutes ?? Infinity) || a.name.localeCompare(b.name));

  const summaryEl = document.createElement("div");
  summaryEl.className = "candidates-summary";
  summaryEl.style.padding = "8px 12px";
  summaryEl.style.fontSize = "0.85rem";
  summaryEl.style.color = "var(--text-light)";
  summaryEl.style.borderBottom = "1px solid var(--border)";
  summaryEl.style.marginBottom = "10px";
  summaryEl.innerHTML = `Found <strong>${candidates.length}</strong> available candidate(s): fully free staff plus people with another duty within <strong>${escapeHtml(maxGapLabel)}</strong>.`;
  candidatesList.appendChild(summaryEl);

  if (!candidates.length) {
    const emptyEl = document.createElement("div");
    emptyEl.className = "empty-selection";
    emptyEl.textContent = `No available agents were found in the scanned allocation window.`;
    candidatesList.appendChild(emptyEl);
    return;
  }

  candidates.forEach(cand => {
    const card = document.createElement("div");
    card.className = "candidate-card";

    let scoreClass = "low";
    if (cand.score >= 8) scoreClass = "high";
    else if (cand.score >= 5) scoreClass = "med";

    let detailsHtml = "";
    if (cand.isWorkingOnDay) {
      detailsHtml += renderCandidateShiftStrip(cand.shiftsOnSameDay, duty, cand.closestDuty, useLocal);
    } else {
      detailsHtml += `<div class="candidate-shifts-panel"><div class="candidate-shifts-title">Today's duties</div><div class="candidate-no-shifts">No duties today</div></div>`;
    }

    detailsHtml += `<div class="candidate-detail-item"><strong>SLA Experience:</strong> Worked ${cand.slaExperience} shift(s) of type "${escapeHtml(duty.sla)}"</div>`;

    if (cand.adjacentType) {
      detailsHtml += `<div class="candidate-detail-item" style="color: var(--accent-strong)"><strong>Adjacent shift:</strong> ${escapeHtml(cand.adjacentDetails)}</div>`;
    }

    if (cand.closestDuty) {
      const connectedRaw = cand.closestPosition === "before" ? cand.closestDuty.release_utc : cand.closestDuty.start_utc;
      const connectedAt = getDisplayTime(cand.closestDuty.date, connectedRaw, useLocal);
      detailsHtml += `<div class="candidate-detail-item connection-detail"><strong>Closest duty:</strong> ${escapeHtml(cand.closestDuty.flight)} ${escapeHtml(cand.closestDuty.sla)} · ${escapeHtml(cand.connectionGapMinutes)} min ${escapeHtml(cand.closestPosition)} (${escapeHtml(connectedAt)} ${zoneLabel})</div>`;
    } else {
      detailsHtml += `<div class="candidate-detail-item connection-detail"><strong>Availability:</strong> No allocated duties on this date.</div>`;
    }

    card.innerHTML = `
      <div class="candidate-card-header">
        <span class="candidate-name">${escapeHtml(cand.initials)} - ${escapeHtml(cand.name)}</span>
        <span class="score-badge ${scoreClass}">Match: ${cand.score}/10</span>
      </div>
      <div class="candidate-status-row">
        <span class="status-dot"></span>
        <span>${cand.freeAllDay ? "Free all day in scan" : "Available to cover"}</span>
      </div>
      <div class="candidate-details-grid">
        ${detailsHtml}
      </div>
    `;

    candidatesList.appendChild(card);
  });
}

function renderCandidateShiftStrip(shifts, replacementDuty, closestDuty, useLocal) {
  const replacementStart = parseUtcTime(replacementDuty.date, replacementDuty.start_utc);
  const replacementRelease = parseUtcTime(replacementDuty.date, replacementDuty.release_utc);
  const seen = new Set();
  const zoneLabel = useLocal ? "Local" : "Z";
  const cards = shifts.filter((shift) => {
    const key = [shift.flight, shift.sla, shift.start_utc, shift.release_utc].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map((shift) => {
    const start = parseUtcTime(shift.date, shift.start_utc);
    const release = parseUtcTime(shift.date, shift.release_utc);
    let position = "Same day";
    if (release && replacementStart && release <= replacementStart) position = "Before";
    else if (start && replacementRelease && start >= replacementRelease) position = "After";
    const isClosest = shift === closestDuty;
    return `
      <div class="candidate-shift-chip${isClosest ? " closest" : ""}">
        <div class="candidate-shift-top">
          <strong>${escapeHtml(shift.flight)}</strong>
          <span>${escapeHtml(shift.sla)}</span>
        </div>
        <small>${escapeHtml(getDisplayTime(shift.date, shift.start_utc, useLocal))}–${escapeHtml(getDisplayTime(shift.date, shift.release_utc, useLocal))} ${zoneLabel}</small>
        <em>${isClosest ? "Closest · " : ""}${escapeHtml(position)}</em>
      </div>
    `;
  }).join("");

  return `
    <div class="candidate-shifts-panel">
      <div class="candidate-shifts-title">Today's duties <span>${seen.size}</span></div>
      <div class="candidate-shift-strip">${cards}</div>
    </div>
  `;
}

function downloadReplacementsCsv() {
  const initials = myInitialsInput.value.trim().toUpperCase();
  if (!initials) return;
  const { minutes: maxGapMinutes } = getMaxDutyGap();
  const maxGapMs = maxGapMinutes * 60 * 1000;

  const myDuties = latestRows.filter(row => {
    if (!row.staff) return false;
    return row.staff.some(s => matchStaffMember(s, initials));
  });

  const csvHeaders = ["Date", "Flight", "Direction", "Route", "SLA", "Start UTC", "Release UTC", "Duration", "Num Candidates", "Top Candidates"];
  const csvRows = [csvHeaders.join(",")];

  for (const duty of myDuties) {
    const dutyStart = parseUtcTime(duty.date, duty.start_utc);
    const dutyRelease = parseUtcTime(duty.date, duty.release_utc);
    const staffSet = getKnownStaffStrings();

    const candidates = [];
    [...staffSet].forEach(candStr => {
      const identity = parseStaffIdentity(candStr);
      if (!identity) return;
      const candInitials = identity.initials;
      const candName = identity.name;
      if (matchStaffMember(candStr, initials)) return;

      const shifts = latestRows.filter(row => {
        return row.staff && row.staff.some(s => parseStaffIdentity(s)?.key === identity.key);
      });

      let overlapsShift = false;
      for (const shift of shifts) {
        const start = parseUtcTime(shift.date, shift.start_utc);
        const release = parseUtcTime(shift.date, shift.release_utc);
        if (start && release && start < dutyRelease && release > dutyStart) {
          overlapsShift = true;
          break;
        }
      }
      if (overlapsShift) return;

      const shiftsOnSameDay = shifts.filter(s => s.date === duty.date);
      const isWorkingOnDay = shiftsOnSameDay.length > 0;
      const slaExperience = shifts.filter(s => s.sla === duty.sla).length;
      let closestGapMs = Infinity;

      let adjacentType = "";
      for (const shift of shiftsOnSameDay) {
        const start = parseUtcTime(shift.date, shift.start_utc);
        const release = parseUtcTime(shift.date, shift.release_utc);
        if (start && release) {
          if (release <= dutyStart) closestGapMs = Math.min(closestGapMs, dutyStart - release);
          if (start >= dutyRelease) closestGapMs = Math.min(closestGapMs, start - dutyRelease);
          if (Math.abs(dutyStart - release) <= 30 * 60 * 1000 || Math.abs(start - dutyRelease) <= 30 * 60 * 1000) {
            adjacentType = "yes";
          }
        }
      }

      const freeAllDay = shiftsOnSameDay.length === 0;
      if (!freeAllDay && (!Number.isFinite(closestGapMs) || closestGapMs > maxGapMs)) return;

      let score = 0;
      score += freeAllDay ? 4 : 5;
      if (slaExperience > 0) score += 3;
      if (adjacentType) score += 2;

      candidates.push({ initials: candInitials, name: candName, score, freeAllDay, connectionGapMinutes: Number.isFinite(closestGapMs) ? Math.round(closestGapMs / 60000) : null });
    });

    candidates.sort((a, b) => b.score - a.score || (a.connectionGapMinutes ?? Infinity) - (b.connectionGapMinutes ?? Infinity));
    const topCandidatesStr = candidates.slice(0, 3).map(c => `${c.name} (${c.freeAllDay ? "free all day" : `${formatHours(c.connectionGapMinutes)}h gap`})`).join(" | ");

    csvRows.push([
      csvCell(duty.date),
      csvCell(duty.flight),
      csvCell(duty.direction),
      csvCell(duty.route),
      csvCell(duty.sla),
      csvCell(duty.start_utc),
      csvCell(duty.release_utc),
      csvCell(duty.duration),
      csvCell(candidates.length),
      csvCell(topCandidatesStr)
    ].join(","));
  }

  downloadBlob(`gsrm-duty-replacements-${initials}.csv`, csvRows.join("\n"), "text/csv;charset=utf-8");
}

function openGapPlanner(row) {
  selectedGap = row;
  gapPlanner.hidden = false;
  const key = OperationsUtils.rowKey(row);
  const action = getGapActions()[key] || { status: "Open", notes: "" };
  gapActionStatus.value = action.status;
  gapActionNotes.value = action.notes;
  renderGapValidationState(action);
  gapPlannerTitle.textContent = `${row.date} · ${row.flight} · ${row.sla}`;
  const assigned = (row.staff || []).map((label) => parseStaffIdentity(label)?.name || label).join(", ") || "None";
  gapPlannerDetails.innerHTML = `
    <div class="planner-detail-grid">
      <div><span>Route</span><strong>${escapeHtml(row.route || "—")}</strong></div>
      <div><span>Aircraft</span><strong>${escapeHtml(row.aircraft || "—")}</strong></div>
      <div><span>Scheduled UTC</span><strong>${escapeHtml(row.scheduled_utc || "—")}</strong></div>
      <div><span>Duty window</span><strong>${escapeHtml(row.start_utc)}–${escapeHtml(row.release_utc)} UTC</strong></div>
      <div><span>Type / movement</span><strong>${escapeHtml([row.type, row.movement].filter(Boolean).join(" · ") || "—")}</strong></div>
      <div><span>Coverage</span><strong>${escapeHtml(row.assigned)}/${escapeHtml(row.required)} assigned · ${escapeHtml(row.missing)} missing</strong></div>
    </div>
    <div class="assigned-staff"><span>Currently assigned</span><strong>${escapeHtml(assigned)}</strong></div>`;
  const candidates = OperationsUtils.rankCandidates(row, latestRows, latestStaffDirectory, { maxGapMinutes: 240 });
  gapCandidates.innerHTML = `<div class="planner-candidates-head"><strong>${candidates.length} candidate(s)</strong><span>Ranked by availability, proximity, and observed SLA experience</span></div>`;
  if (!candidates.length) {
    gapCandidates.insertAdjacentHTML("beforeend", '<div class="empty-selection">No conflict-free candidates found in this scan.</div>');
  }
  for (const candidate of candidates) {
    const availability = candidate.freeAllDay ? "Free all day" : `${formatHours(candidate.connectionGapMinutes)}h ${candidate.closestPosition} nearest duty`;
    const card = document.createElement("div");
    const isSelected = action.assignedCandidateKey === candidate.key;
    card.className = `planner-candidate-card${isSelected ? " selected" : ""}`;
    card.innerHTML = `
      <div><strong>${escapeHtml(candidate.initials)} — ${escapeHtml(candidate.name)}</strong><span>${escapeHtml(availability)}</span></div>
      <div class="planner-candidate-actions">
        <div class="planner-tags"><span>Match ${candidate.score}/10</span><span>${candidate.slaExperience} observed ${escapeHtml(row.sla)} duty(s)</span></div>
        <button type="button" class="secondary-btn candidate-select-btn">${isSelected ? "Selected" : "Select candidate"}</button>
      </div>`;
    card.querySelector(".candidate-select-btn").addEventListener("click", () => selectGapCandidate(candidate));
    gapCandidates.appendChild(card);
  }
  renderCoverageSimulation(row, action, candidates);
  gapPlanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function closeGapPlanner() {
  gapPlanner.hidden = true;
  selectedGap = null;
}

function getGapActions() {
  try { return JSON.parse(localStorage.getItem(ACTIONS_KEY) || "{}"); } catch { return {}; }
}

function storeGapAction(key, action, actions = getGapActions()) {
  actions[key] = action;
  localStorage.setItem(ACTIONS_KEY, JSON.stringify(actions));
  const history = getScanHistory();
  const latest = history.find((snapshot) => (snapshot.rows || []).some((row) => OperationsUtils.rowKey(row) === key));
  if (latest) {
    latest.actions = { ...(latest.actions || {}), [key]: action };
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch (error) { console.warn("Could not update snapshot action:", error); }
  }
}

function selectGapCandidate(candidate) {
  if (!selectedGap) return;
  const actions = getGapActions();
  const key = OperationsUtils.rowKey(selectedGap);
  const current = actions[key] || { status: "Open", notes: "" };
  const updated = {
    ...current,
    assignedCandidateKey: candidate.key,
    assignedCandidate: `${candidate.initials} - ${candidate.name}`,
    validation: null,
    updatedAt: new Date().toISOString(),
  };
  storeGapAction(key, updated, actions);
  openGapPlanner(selectedGap);
}

function clearGapCandidate() {
  if (!selectedGap) return;
  const actions = getGapActions();
  const key = OperationsUtils.rowKey(selectedGap);
  const current = actions[key] || { status: "Open", notes: "" };
  const { assignedCandidateKey, assignedCandidate, validation, ...rest } = current;
  storeGapAction(key, { ...rest, updatedAt: new Date().toISOString() }, actions);
  openGapPlanner(selectedGap);
}

function getPlannedCoverageAssignments(actions = getGapActions()) {
  const rowKeys = new Set(latestRows.map((item) => OperationsUtils.rowKey(item)));
  return Object.entries(actions)
    .filter(([key, item]) => rowKeys.has(key) && item?.assignedCandidateKey && item?.assignedCandidate)
    .map(([key, item]) => ({ rowKey: key, candidateKey: item.assignedCandidateKey, candidateLabel: item.assignedCandidate }));
}

function renderCoverageSimulation(row, action, candidates) {
  if (!action.assignedCandidateKey || !action.assignedCandidate) {
    gapSimulation.className = "coverage-simulation empty-state";
    gapSimulation.innerHTML = `<div class="simulation-heading"><div><span>What-if simulation</span><strong>Select a candidate to preview the impact</strong></div><small>No AVBIS changes will be made.</small></div>`;
    return;
  }

  const identity = parseStaffIdentity(action.assignedCandidate);
  const selected = candidates.find((candidate) => candidate.key === action.assignedCandidateKey) || {
    key: action.assignedCandidateKey,
    initials: identity?.initials || "",
    name: identity?.name || action.assignedCandidate,
    label: action.assignedCandidate,
  };
  const plannedAssignments = getPlannedCoverageAssignments();
  const simulation = OperationsUtils.simulateCoverage(row, selected, latestRows, plannedAssignments);
  if (!simulation) {
    gapSimulation.className = "coverage-simulation invalid";
    gapSimulation.textContent = "The selected candidate could not be simulated because their staff identity is invalid.";
    return;
  }

  const targetMissing = Number(simulation.target?.missing || 0);
  const warningItems = [];
  if (simulation.conflicts.length) {
    warningItems.push(`<li class="danger"><strong>${simulation.conflicts.length} overlap${simulation.conflicts.length === 1 ? "" : "s"}</strong><span>Includes this and other planned assignments.</span></li>`);
  } else {
    warningItems.push('<li class="safe"><strong>No overlaps</strong><span>Conflict-free within the scanned allocation window.</span></li>');
  }
  if (simulation.shortGaps.length) {
    const shortest = Math.min(...simulation.shortGaps.map((gap) => gap.minutes));
    warningItems.push(`<li class="warning"><strong>${simulation.shortGaps.length} short turnaround${simulation.shortGaps.length === 1 ? "" : "s"}</strong><span>Shortest connection is ${escapeHtml(shortest)} minutes.</span></li>`);
  } else {
    warningItems.push('<li class="safe"><strong>No short turnarounds</strong><span>At least 30 minutes between consecutive duties.</span></li>');
  }
  if (simulation.longSpan) {
    warningItems.push(`<li class="warning"><strong>Long daily span</strong><span>${formatHours(simulation.spanMinutes)} hours from first start to final release.</span></li>`);
  }

  gapSimulation.className = "coverage-simulation";
  gapSimulation.innerHTML = `
    <div class="simulation-heading">
      <div><span>What-if simulation</span><strong>${escapeHtml(simulation.candidate.name)} added to this duty</strong></div>
      <button type="button" class="secondary-btn simulation-clear-btn">Remove simulation</button>
    </div>
    <div class="simulation-metrics">
      <div><span>This gap</span><strong>${targetMissing ? `${targetMissing} still missing` : "Covered"}</strong></div>
      <div><span>All planned gaps</span><strong>${simulation.afterMissing} remaining</strong><small>${simulation.filledPositions} position${simulation.filledPositions === 1 ? "" : "s"} filled in simulation</small></div>
      <div><span>Candidate workload</span><strong>${formatHours(simulation.totalMinutes)}h</strong><small>${simulation.dayDutyCount} duties that day</small></div>
      <div><span>Daily span</span><strong>${formatHours(simulation.spanMinutes)}h</strong><small>First start to final release</small></div>
    </div>
    <ul class="simulation-warnings">${warningItems.join("")}</ul>
    <p>Simulation only—nothing is written to AVBIS. Results use ${plannedAssignments.length} selected assignment${plannedAssignments.length === 1 ? "" : "s"} from the current scan.</p>`;
  gapSimulation.querySelector(".simulation-clear-btn").addEventListener("click", clearGapCandidate);
}

function renderGapValidationState(action = {}) {
  if (!action.assignedCandidate) {
    gapValidationState.className = "gap-validation-state";
    gapValidationState.textContent = "Select a candidate before marking this gap Covered.";
    return;
  }
  if (action.validation?.valid) {
    gapValidationState.className = "gap-validation-state valid";
    gapValidationState.textContent = `${action.assignedCandidate} was revalidated as conflict-free at ${new Date(action.validation.checkedAt).toLocaleString()}.`;
    return;
  }
  gapValidationState.className = "gap-validation-state pending";
  gapValidationState.textContent = `${action.assignedCandidate} selected. Availability will be revalidated when status changes to Covered.`;
}

function saveSelectedGapAction() {
  if (!selectedGap) return;
  const actions = getGapActions();
  const key = OperationsUtils.rowKey(selectedGap);
  const current = actions[key] || { status: "Open", notes: "" };
  let validation = current.validation || null;
  if (gapActionStatus.value === "Covered") {
    const candidates = OperationsUtils.rankCandidates(selectedGap, latestRows, latestStaffDirectory, { maxGapMinutes: 240 });
    const candidate = candidates.find((item) => item.key === current.assignedCandidateKey);
    const simulation = candidate
      ? OperationsUtils.simulateCoverage(selectedGap, candidate, latestRows, getPlannedCoverageAssignments(actions))
      : null;
    if (!candidate || simulation?.conflicts.length) {
      gapActionStatus.value = current.status === "Covered" ? "Contacted" : current.status;
      const reason = simulation?.conflicts.length
        ? "Candidate conflicts with another planned assignment."
        : "Candidate is no longer conflict-free in the current scan.";
      validation = { valid: false, checkedAt: new Date().toISOString(), reason };
      gapValidationState.className = "gap-validation-state invalid";
      gapValidationState.textContent = current.assignedCandidate
        ? `${current.assignedCandidate} ${simulation?.conflicts.length ? "conflicts with another planned assignment" : "is no longer conflict-free"}. Coverage was not marked complete.`
        : "Select a candidate before marking this gap Covered.";
      return;
    }
    validation = { valid: true, checkedAt: new Date().toISOString(), scanId: activeScanId || getScanHistory()[0]?.id || "current" };
  }
  const updated = { ...current, status: gapActionStatus.value, notes: gapActionNotes.value.trim(), validation, updatedAt: new Date().toISOString() };
  storeGapAction(key, updated, actions);
  renderGapValidationState(updated);
}

function renderInsights() {
  const analytics = OperationsUtils.buildAnalytics(latestRows, latestStaffDirectory);
  document.getElementById("insightCards").innerHTML = [
    [analytics.gapGroups, "Gap groups"],
    [analytics.missingPositions, "Missing positions"],
    [analytics.missingHours.toFixed(1), "Missing staff-hours"],
    [analytics.warnings.length, "Roster warnings"],
  ].map(([value, label]) => `<div class="insight-card"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`).join("");
  renderMetricBars(document.getElementById("coverageByDate"), analytics.byDate);
  renderMetricBars(document.getElementById("coverageBySla"), analytics.bySla);
  renderMetricBars(document.getElementById("coverageByHour"), analytics.byHour.map((item) => ({ ...item, key: `${item.key}:00` })));
  const warnings = document.getElementById("rosterWarnings");
  warnings.innerHTML = analytics.warnings.length ? analytics.warnings.slice(0, 50).map((warning) => `<div class="warning-item ${escapeHtml(warning.severity)}"><strong>${escapeHtml(warning.type)}</strong><span>${escapeHtml(warning.text)}</span></div>`).join("") : '<div class="empty-selection">No overlap, short-gap, long-span, or invalid-time warnings found.</div>';
  const roster = getRosterRows();
  if (!latestScannedDates.length) {
    clearRosterHoursOverview("Run a scan to calculate workload.");
  } else if (!roster) {
    clearRosterHoursOverview("Choose a valid Duty Roster period to calculate workload.");
  } else {
    const people = filterRosterPeople(roster.rows);
    renderRosterHoursOverview(people, roster.dailyWindows);
    const rosterHoursHint = document.getElementById("rosterHoursHint");
    const range = rosterDate.value === rosterEndDate.value ? rosterDate.value : `${rosterDate.value} to ${rosterEndDate.value}`;
    rosterHoursHint.textContent = `${range} · Uses the selected Duty Roster time window and filters. Hours are classified by Europe/Berlin calendar day; public-holiday hours may also be weekday or weekend hours.`;
  }
  resultCount.textContent = String(analytics.warnings.length);
  csvBtn.disabled = latestRows.length === 0;
  opsCsvBtn.disabled = !latestRows.some((row) => Number(row.missing || 0) > 0);
}

function renderMetricBars(container, items) {
  if (!items.length) {
    container.innerHTML = '<div class="empty-selection">No gaps in this scan.</div>';
    return;
  }
  const max = Math.max(...items.map((item) => item.missing), 1);
  container.innerHTML = `<div class="metric-bars">${items.map((item) => `<div class="metric-bar-row"><span>${escapeHtml(item.key)}</span><div><i style="width:${Math.max(3, item.missing / max * 100)}%"></i></div><strong>${item.missing}<small>${(item.missingMinutes / 60).toFixed(1)}h</small></strong></div>`).join("")}</div>`;
}

function snapshotGap(row) {
  return { key: OperationsUtils.rowKey(row), date: row.date, flight: row.flight, route: row.route, sla: row.sla, required: Number(row.required || 0), assigned: Number(row.assigned || 0), missing: Number(row.missing || 0), start_utc: row.start_utc, release_utc: row.release_utc };
}

function getScanHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
}

function saveScanSnapshot(result, payload) {
  const rowKeys = new Set((result.rows || []).map((row) => OperationsUtils.rowKey(row)));
  const snapshotActions = Object.fromEntries(Object.entries(getGapActions()).filter(([key]) => rowKeys.has(key)));
  const snapshot = {
    id: payload.scanId,
    createdAt: new Date().toISOString(),
    startDate: payload.startDate,
    endDate: payload.endDate,
    scannedDates: result.scannedDates || [],
    incompleteDates: result.incompleteDates || [],
    flights: Number(result.scannedFlights || 0),
    staffCount: (result.staffDirectory || []).length,
    errors: (result.errors || []).length,
    cancelled: Boolean(result.cancelled),
    gaps: (result.rows || []).filter((row) => Number(row.missing || 0) > 0).map(snapshotGap),
    rows: result.rows || [],
    staffDirectory: result.staffDirectory || [],
    actions: snapshotActions,
    config: {
      startDate: payload.startDate,
      endDate: payload.endDate,
      startTime: payload.startTime,
      endTime: payload.endTime,
      days: payload.days || [],
      includePublicHolidays: Boolean(payload.includePublicHolidays),
      publicHolidays: payload.publicHolidays || "",
      airlines: payload.airlines || [],
      slas: payload.slas || [],
    },
  };
  const history = [snapshot, ...getScanHistory().filter((item) => item.id !== snapshot.id)].slice(0, 8);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.warn("Could not save scan history:", error);
  }
}

function clearScanHistory() {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
}

function applySnapshotConfig(snapshot) {
  const config = snapshot.config || snapshot;
  scanStartDate.value = config.startDate || snapshot.startDate || today;
  scanEndDate.value = config.endDate || snapshot.endDate || scanStartDate.value;
  document.getElementById("startTime").value = config.startTime || "00:00";
  document.getElementById("endTime").value = config.endTime || "23:59";
  document.getElementById("includePublicHolidays").checked = Boolean(config.includePublicHolidays);
  document.getElementById("publicHolidays").value = config.publicHolidays || "";
  const days = new Set((config.days || ["0", "1", "2", "3", "4", "5", "6"]).map(String));
  for (const input of scanDayInputs) input.checked = days.has(input.value);
  populateAirlines([...new Set([...(config.airlines || []), ...[...airlinesSelect.options].map((option) => option.value).filter(Boolean)])], config.airlines || []);
  populateSlas([...new Set([...(config.slas || []), ...[...slasSelect.options].map((option) => option.value).filter(Boolean)])], config.slas || []);
  scanPeriodMode.value = "custom";
  scanMonthField.hidden = true;
  renderHolidayPreview();
}

function rerunSnapshot(snapshot) {
  applySnapshotConfig(snapshot);
  setSetupCollapsed(false);
  setMessage(`Restored scan settings from ${new Date(snapshot.createdAt).toLocaleString()}. Starting rerun…`);
  runScan(false);
}

function restoreSnapshot(snapshot) {
  if (!Array.isArray(snapshot.rows)) {
    setMessage("This older snapshot contains summary data only and cannot be restored. Rerun it instead.", "warn");
    return;
  }
  applySnapshotConfig(snapshot);
  latestRows = snapshot.rows;
  latestScannedDates = snapshot.scannedDates || [];
  latestStaffDirectory = snapshot.staffDirectory || [];
  if (snapshot.actions) localStorage.setItem(ACTIONS_KEY, JSON.stringify({ ...getGapActions(), ...snapshot.actions }));
  flightCount.textContent = String(snapshot.flights || 0);
  dateCount.textContent = String(latestScannedDates.length);
  updateStaffOptions();
  updateResultsSlaFilter();
  updateRosterFilters();
  switchTab("gaps");
  setSetupCollapsed(true, readForm());
  setMessage(`Restored snapshot from ${new Date(snapshot.createdAt).toLocaleString()}. No AVBIS request was made.`);
}

function exportSnapshot(snapshot) {
  const safeStamp = snapshot.createdAt.replace(/[:.]/g, "-");
  const currentActions = getGapActions();
  const rowKeys = new Set((snapshot.rows || []).map((row) => OperationsUtils.rowKey(row)));
  const actions = Object.fromEntries(Object.entries(currentActions).filter(([key]) => rowKeys.has(key)));
  downloadBlob(`gsrm-scan-snapshot-${safeStamp}.json`, JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), snapshot: { ...snapshot, actions: { ...(snapshot.actions || {}), ...actions } } }, null, 2), "application/json;charset=utf-8");
}

function renderHistory() {
  const history = getScanHistory();
  const list = document.getElementById("historyList");
  const comparisonEl = document.getElementById("historyComparison");
  if (!history.length) {
    comparisonEl.innerHTML = "";
    list.innerHTML = '<div class="empty-selection">No saved scans yet.</div>';
    resultCount.textContent = "0";
    return;
  }
  list.innerHTML = history.map((snapshot, index) => `<div class="history-card" data-snapshot-id="${escapeHtml(snapshot.id)}"><div class="history-card-summary"><strong>${escapeHtml(new Date(snapshot.createdAt).toLocaleString())}</strong><span>${escapeHtml(snapshot.startDate)} → ${escapeHtml(snapshot.endDate)}</span><small><b>${snapshot.gaps.length}</b> gaps · <b>${snapshot.flights}</b> flights · <b>${snapshot.staffCount}</b> staff${snapshot.cancelled ? " · interrupted" : ""}${index === 0 ? '<em>Latest</em>' : ""}</small></div><div class="history-card-actions"><button type="button" class="secondary-btn" data-action="restore">Restore</button><button type="button" class="secondary-btn" data-action="rerun">Rerun</button><button type="button" class="secondary-btn" data-action="export">Export snapshot</button></div></div>`).join("");
  for (const card of list.querySelectorAll(".history-card")) {
    const snapshot = history.find((item) => item.id === card.dataset.snapshotId);
    card.querySelector('[data-action="restore"]').addEventListener("click", () => restoreSnapshot(snapshot));
    card.querySelector('[data-action="rerun"]').addEventListener("click", () => rerunSnapshot(snapshot));
    card.querySelector('[data-action="export"]').addEventListener("click", () => exportSnapshot(snapshot));
  }
  if (history.length > 1) {
    const comparison = OperationsUtils.compareSnapshots(history[0], history[1]);
    comparisonEl.innerHTML = `<div class="comparison-head"><strong>Latest vs previous scan</strong><span>Matched by date, flight, SLA, and duty window</span></div><div class="comparison-cards"><div class="opened"><strong>${comparison.opened.length}</strong><span>New gaps</span></div><div class="resolved"><strong>${comparison.resolved.length}</strong><span>Resolved</span></div><div class="changed"><strong>${comparison.changed.length}</strong><span>Coverage changed</span></div></div>${renderComparisonDetails(comparison)}`;
  } else {
    comparisonEl.innerHTML = '<div class="empty-selection">Run another scan to see what changed.</div>';
  }
  resultCount.textContent = String(history.length);
  csvBtn.disabled = true;
  opsCsvBtn.disabled = !latestRows.some((row) => Number(row.missing || 0) > 0);
}

function renderComparisonDetails(comparison) {
  const rows = [
    ...comparison.opened.map((gap) => ["New", gap]),
    ...comparison.resolved.map((gap) => ["Resolved", gap]),
    ...comparison.changed.map((gap) => ["Changed", gap]),
  ].slice(0, 30);
  if (!rows.length) return '<div class="comparison-empty">No gap changes detected.</div>';
  return `<div class="comparison-list">${rows.map(([kind, gap]) => `<div><span class="change-${kind.toLowerCase()}">${kind}</span><strong>${escapeHtml(gap.date)} · ${escapeHtml(gap.flight)} · ${escapeHtml(gap.sla)}</strong><small>${escapeHtml(gap.start_utc)}–${escapeHtml(gap.release_utc)} UTC · ${gap.missing} missing</small></div>`).join("")}</div>`;
}

function downloadOperationalCsv() {
  const actions = getGapActions();
  const gaps = latestRows.filter((row) => Number(row.missing || 0) > 0);
  const headers = ["Status", "Date", "Flight", "Direction", "Route", "Aircraft", "Scheduled UTC", "SLA", "Type", "Movement", "Required", "Assigned", "Missing", "Start UTC", "Release UTC", "Assigned Staff", "Candidate Count", "Top Candidates", "Notes"];
  const lines = [headers.map(csvCell).join(",")];
  for (const row of gaps) {
    const action = actions[OperationsUtils.rowKey(row)] || { status: "Open", notes: "" };
    const candidates = OperationsUtils.rankCandidates(row, latestRows, latestStaffDirectory, { maxGapMinutes: 240 });
    const top = candidates.slice(0, 5).map((person) => `${person.name} [${person.freeAllDay ? "free all day" : `${person.connectionGapMinutes}m ${person.closestPosition}`}; ${person.slaExperience} observed ${row.sla}]`).join(" | ");
    lines.push([action.status, row.date, row.flight, row.direction, row.route, row.aircraft, row.scheduled_utc, row.sla, row.type, row.movement, row.required, row.assigned, row.missing, row.start_utc, row.release_utc, (row.staff || []).join(" | "), candidates.length, top, action.notes].map(csvCell).join(","));
  }
  downloadBlob(`gsrm-staffing-actions-${getLocalIsoDate()}.csv`, lines.join("\n"), "text/csv;charset=utf-8");
}

function matchStaffMember(staffStr, searchInput) {
  if (!staffStr || !searchInput) return false;
  const target = staffStr.trim().toUpperCase();
  const query = searchInput.trim().toUpperCase();

  // 1. Direct match or startsWith initials + " -"
  if (target.startsWith(query + " -")) return true;

  // 2. Extract initials and name parts
  const match = target.match(/^([A-Z0-9]+)\s+-\s+(.+)$/i);
  if (match) {
    const initials = match[1].toUpperCase();
    const name = match[2].toUpperCase();
    if (initials === query || name.includes(query)) {
      return true;
    }
  }

  return false;
}
