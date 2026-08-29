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
const pdfBtn = document.getElementById("pdfBtn");
const resultsSlaBtn = document.getElementById("resultsSlaBtn");
const resultsSlaBtnText = document.getElementById("resultsSlaBtnText");
const resultsSlaMenu = document.getElementById("resultsSlaMenu");
const resultsSlaCheckboxes = document.getElementById("resultsSlaCheckboxes");
const resultsSlaAllBtn = document.getElementById("resultsSlaAllBtn");
const resultsSlaClearBtn = document.getElementById("resultsSlaClearBtn");
const slaChipsContainer = document.getElementById("slaChipsContainer");

let latestRows = [];
let originalRows = [];
let rosterStateMode = "edited";
let latestScannedDates = [];
let latestStaffDirectory = [];
let filteredRows = [];
let selectedResultsSlas = [];
let currentSortCol = "date";
let currentSortDir = "asc";
let progressTimer = null;
let activeTab = "gaps";
let selectedReplacementDuty = null;
let selectedGap = null;
let activeScanId = "";
let connectedEmail = "";
let showRosterDutyTotals = localStorage.getItem("gsrmRosterDutyTotals") === "true";
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

if (pdfBtn) pdfBtn.addEventListener("click", exportPdf);

document.querySelectorAll("#rosterStateToggleGroup .state-toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => setRosterStateMode(btn.dataset.stateMode));
});

const replaceAllShiftsBtn = document.getElementById("replaceAllShiftsBtn");
if (replaceAllShiftsBtn) {
  replaceAllShiftsBtn.addEventListener("click", executeBulkReplacement);
}

if (resultsSlaBtn) {
  resultsSlaBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!resultsSlaMenu) return;
    const isHidden = resultsSlaMenu.hidden;
    resultsSlaMenu.hidden = !isHidden;
    resultsSlaBtn.setAttribute("aria-expanded", String(!isHidden));
  });
}

document.addEventListener("click", (e) => {
  if (resultsSlaMenu && !resultsSlaMenu.hidden) {
    const wrap = document.getElementById("resultsSlaDropdownWrap");
    if (wrap && !wrap.contains(e.target)) {
      resultsSlaMenu.hidden = true;
      if (resultsSlaBtn) resultsSlaBtn.setAttribute("aria-expanded", "false");
    }
  }
});

if (resultsSlaAllBtn) {
  resultsSlaAllBtn.addEventListener("click", () => {
    const uniqueSlas = [...new Set(latestRows.map((r) => r.sla).filter(Boolean))];
    selectedResultsSlas = [...uniqueSlas];
    updateResultsSlaFilter();
    applyFilters();
  });
}

if (resultsSlaClearBtn) {
  resultsSlaClearBtn.addEventListener("click", () => {
    selectedResultsSlas = [];
    updateResultsSlaFilter();
    applyFilters();
  });
}

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
document.getElementById("coveragePlannerBtn")?.addEventListener("click", openCoveragePlannerWorkspace);
document.getElementById("plannerAvailabilityBtn")?.addEventListener("click", openAvailabilityModal);
document.getElementById("modalAvailabilityClose")?.addEventListener("click", closeAvailabilityModal);
document.getElementById("modalAvailabilityDone")?.addEventListener("click", closeAvailabilityModal);

const availModalOverlay = document.getElementById("availabilityModal");
if (availModalOverlay) {
  availModalOverlay.addEventListener("click", (e) => {
    if (e.target === availModalOverlay) closeAvailabilityModal();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && availModalOverlay && !availModalOverlay.hidden) {
    closeAvailabilityModal();
  }
});

document.getElementById("gapPlannerClose").addEventListener("click", closeGapPlanner);
document.getElementById("rosterInlineCloseBtn")?.addEventListener("click", closeRosterInlineReplacement);
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
  } else if (activeTab === "insights") {
    downloadInsightsCsv();
  } else if (activeTab === "history") {
    downloadHistoryCsv();
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
  if (gapStaffSearch) gapStaffSearch.value = e.target.value;
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
  localStorage.setItem("gsrmRosterDutyTotals", String(showRosterDutyTotals));
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
document.getElementById("autoPlannerSelectFree")?.addEventListener("click", selectFreePlannerStaff);
autoPlannerStaffSearch.addEventListener("input", renderPlannerStaffList);
for (const id of plannerOptionIds) document.getElementById(id).addEventListener("change", savePlannerOptions);
availabilityPeriod.addEventListener("change", updateAvailabilityFields);
availabilityShift.addEventListener("change", updateAvailabilityFields);
availabilityStaff.addEventListener("change", () => {
  renderAvailabilityRules();
  updateAvailabilityFields();
});
document.getElementById("availabilityUseEligible")?.addEventListener("click", () => selectAvailabilityStaff(selectedPlannerStaff));
document.getElementById("availabilityClearStaff")?.addEventListener("click", () => selectAvailabilityStaff([]));
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

function syncRosterPresetChips() {
  const currentStatus = rosterStatus ? rosterStatus.value : "";
  const presetBtns = document.querySelectorAll("#rosterPresetFilterGroup .preset-chip");
  presetBtns.forEach((btn) => {
    const preset = btn.dataset.preset;
    if (preset === "all") {
      btn.classList.toggle("active", currentStatus === "");
    } else if (preset === "duty") {
      btn.classList.toggle("active", currentStatus === "duty");
    } else if (preset === "free") {
      btn.classList.toggle("active", currentStatus === "free" || currentStatus === "free-window");
    }
  });
}

// Preset View Filter chips for Roster
const rosterPresetBtns = document.querySelectorAll("#rosterPresetFilterGroup .preset-chip");
rosterPresetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (rosterViewMode === "airline") return;
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
  if (event.key === "Escape") {
    const drawer = document.getElementById("rosterInlineReplacementDrawer");
    if (drawer && !drawer.hidden) {
      drawer.hidden = true;
      return;
    }
    if (rosterLayout.classList.contains("fullscreen")) {
      toggleRosterFullscreen(false);
      return;
    }
    if (resultsPanel.classList.contains("results-fullscreen")) {
      toggleResultsFullscreen(false);
    }
  }
});

// Load saved preferences
if (localStorage.getItem("myInitials")) {
  myInitialsInput.value = localStorage.getItem("myInitials");
}
if (showRosterDutyTotals) {
  rosterTotalsBtn.textContent = "Hide duty hours";
  rosterTotalsBtn.setAttribute("aria-pressed", "true");
}
if (localStorage.getItem("gsrmRosterFiltersCollapsed") === "true") {
  setRosterFiltersCollapsed(true);
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
  if (tab !== "gaps" && document.querySelector(".table-panel")?.classList.contains("results-fullscreen")) toggleResultsFullscreen(false);
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
  tableFilterBar.style.display = ["gaps", "replacements"].includes(tab) ? "grid" : "none";
  replacementDateFilterGroup.hidden = tab !== "replacements";
  resultsMissingFilterGroup.hidden = tab === "replacements";
  resultsFullscreenBtn.hidden = tab !== "gaps";
  gapStaffSearch.closest(".personal-shift-picker").hidden = tab !== "gaps";
  gapSuitableOnlyToggle.closest(".suitable-only-toggle").hidden = tab !== "gaps";
  resultsFilterTitle.textContent = tab === "replacements" ? "Duty filters" : "Shift opportunity filters";
  resultsFilterHint.textContent = tab === "replacements"
    ? "Narrow duties by date, flight, SLA, direction, or time."
    : "Find uncovered shifts that fit your schedule.";
  resultsSearch.placeholder = tab === "replacements"
    ? "Search duties by flight, route, date, or SLA"
    : "Search flight, route, date, SLA, or aircraft";
  updateResultTimeFilterLabels();
  resultCountLabel.textContent = tab === "gaps" ? "empty slot groups" : tab === "replacements" ? "scheduled duties" : tab === "roster" ? (rosterViewMode === "airline" ? "flights shown" : "staff shown") : tab === "insights" ? "warnings" : "saved scans";
  updateContextToolbar(tab);
  if (tab === "roster" && !rosterDate.value) rosterDate.value = document.getElementById("startDate").value;
  if (tab === "roster" && !rosterEndDate.value) rosterEndDate.value = rosterDate.value;
  applyFilters();
}

function updateContextToolbar(tab) {
  const copy = {
    gaps: ["Empty Slots", "Unassigned coverage shifts you can ask to cover"],
    replacements: ["Replacements", "Duties and conflict-free replacement candidates"],
    roster: ["Duty Roster", rosterViewMode === "airline" ? "Daily airline and flight allocation board" : "Availability and duties for the selected window"],
    insights: ["Coverage Insights", "Pressure, workload, and roster warnings"],
    history: ["Scan History", "Restore, rerun, compare, or export saved snapshots"],
  }[tab];
  contextTitle.textContent = copy[0];
  contextHint.textContent = copy[1];
  csvBtn.hidden = false;
  if (pdfBtn) pdfBtn.hidden = false;
  opsCsvBtn.hidden = tab !== "gaps";
  const rosterStateToggleGroup = document.getElementById("rosterStateToggleGroup");
  if (rosterStateToggleGroup) rosterStateToggleGroup.hidden = tab !== "roster";

  const csvLabels = {
    gaps: "Download gaps CSV",
    replacements: "Download replacements CSV",
    roster: rosterViewMode === "airline" ? "Download schedule CSV" : "Download roster CSV",
    insights: "Download insights CSV",
    history: "Download history CSV",
  };
  csvBtn.textContent = csvLabels[tab] || "Download CSV";

  const pdfLabels = {
    gaps: "Export gaps PDF",
    replacements: "Export replacements PDF",
    roster: rosterViewMode === "airline" ? "Export schedule PDF" : "Export roster PDF",
    insights: "Export insights PDF",
    history: "Export history PDF",
  };
  if (pdfBtn) pdfBtn.textContent = pdfLabels[tab] || "Export PDF";

  updateExportButtonsState();
}

function updateExportButtonsState() {
  if (activeTab === "history") {
    const history = getScanHistory();
    csvBtn.disabled = history.length === 0;
    if (pdfBtn) pdfBtn.disabled = history.length === 0;
  } else if (activeTab === "insights") {
    csvBtn.disabled = latestRows.length === 0;
    if (pdfBtn) pdfBtn.disabled = latestRows.length === 0;
  } else if (activeTab === "roster") {
    csvBtn.disabled = latestRows.length === 0;
    if (pdfBtn) pdfBtn.disabled = latestRows.length === 0;
  } else if (activeTab === "replacements") {
    const initials = myInitialsInput.value.trim().toUpperCase();
    const myDuties = latestRows.filter((r) => (r.staff || []).some((s) => matchStaffMember(s, initials)));
    csvBtn.disabled = myDuties.length === 0;
    if (pdfBtn) pdfBtn.disabled = myDuties.length === 0;
  } else {
    csvBtn.disabled = filteredRows.length === 0;
    if (pdfBtn) pdfBtn.disabled = filteredRows.length === 0 && latestRows.length === 0;
  }
}

function toggleRosterFullscreen(force) {
  const enabled = typeof force === "boolean" ? force : !rosterLayout.classList.contains("fullscreen");
  const planner = rosterLayout.querySelector(".auto-planner");
  if (enabled && planner) {
    const wasExpanded = !planner.classList.contains("collapsed");
    rosterLayout.dataset.fullscreenPlannerWasExpanded = String(wasExpanded);
    if (wasExpanded) {
      planner.classList.add("collapsed");
      autoPlannerToggle.textContent = "Show planner";
      autoPlannerToggle.setAttribute("aria-expanded", "false");
    }
  }
  rosterLayout.classList.toggle("fullscreen", enabled);
  document.body.classList.toggle("roster-mode-fullscreen", enabled);
  rosterFullscreenBtn.textContent = enabled ? "Close full screen" : "Full screen";
  rosterFullscreenBtn.setAttribute("aria-pressed", String(enabled));
  if (!enabled) {
    if (planner && rosterLayout.dataset.fullscreenPlannerWasExpanded === "true") {
      planner.classList.remove("collapsed");
      autoPlannerToggle.textContent = "Hide planner";
      autoPlannerToggle.setAttribute("aria-expanded", "true");
    }
    delete rosterLayout.dataset.fullscreenPlannerWasExpanded;
    const savedCollapsed = localStorage.getItem("gsrmRosterFiltersCollapsed") === "true";
    setRosterFiltersCollapsed(savedCollapsed);
    rosterFullscreenBtn.focus();
  }
}

function setRosterFiltersCollapsed(collapsed) {
  const enabled = Boolean(collapsed);
  rosterLayout.classList.toggle("filters-collapsed", enabled);
  rosterFilterToggle.textContent = enabled ? "Show filters" : "Hide filters";
  rosterFilterToggle.setAttribute("aria-expanded", String(!enabled));
  localStorage.setItem("gsrmRosterFiltersCollapsed", String(enabled));
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
const resultsFilterTitle = document.getElementById("resultsFilterTitle");
const resultsFilterHint = document.getElementById("resultsFilterHint");
const resultsFilterToggle = document.getElementById("resultsFilterToggle");
const resultsFullscreenBtn = document.getElementById("resultsFullscreenBtn");
const resultsMatchSummary = document.getElementById("resultsMatchSummary");
const gapStaffSearch = document.getElementById("gapStaffSearch");
const gapSuitableOnlyToggle = document.getElementById("gapSuitableOnlyToggle");
const resultsPanel = tableFilterBar.closest(".table-panel");
const accountDutySummary = document.getElementById("accountDutySummary");
const accountDutyTitle = document.getElementById("accountDutyTitle");
const accountDutyChips = document.getElementById("accountDutyChips");
const accountDutyRosterBtn = document.getElementById("accountDutyRosterBtn");

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
resultsFilterToggle.addEventListener("click", () => setResultFiltersCollapsed(!tableFilterBar.classList.contains("filters-collapsed")));
resultsFullscreenBtn.addEventListener("click", () => toggleResultsFullscreen());
gapStaffSearch.addEventListener("input", () => {
  myInitialsInput.value = gapStaffSearch.value;
  localStorage.setItem("myInitials", gapStaffSearch.value);
  applyFilters();
});
gapSuitableOnlyToggle.addEventListener("change", () => {
  if (gapSuitableOnlyToggle.checked && !resolveStaffIdentity(gapStaffSearch.value.trim())) {
    gapSuitableOnlyToggle.checked = false;
    setMessage("Select your staff name or initials before filtering suitable shifts.", "warn");
    gapStaffSearch.focus();
  }
  applyFilters();
});
accountDutyRosterBtn?.addEventListener("click", openAccountOwnerRoster);

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
  selectedResultsSlas = [];
  resultsSlaFilter.value = "";
  resultsDirectionFilter.value = "";
  resultsStartTimeFilter.value = "";
  resultsEndTimeFilter.value = "";
  resultsLocalTimeToggle.checked = false;
  gapSuitableOnlyToggle.checked = false;
  if (activeTab === "replacements") resultsDateFilter.value = "";
  else resultsMissingFilter.value = "";
  updateResultTimeFilterLabels();
  updateResultsSlaFilter();
  applyFilters();
}

function setResultFiltersCollapsed(collapsed) {
  const enabled = Boolean(collapsed);
  tableFilterBar.classList.toggle("filters-collapsed", enabled);
  resultsFilterToggle.textContent = enabled ? "Show filters" : "Hide filters";
  resultsFilterToggle.setAttribute("aria-expanded", String(!enabled));
  localStorage.setItem("gsrmResultFiltersCollapsed", String(enabled));
}

function toggleResultsFullscreen(force) {
  const enabled = typeof force === "boolean" ? force : !resultsPanel.classList.contains("results-fullscreen");
  resultsPanel.classList.toggle("results-fullscreen", enabled);
  document.body.classList.toggle("results-mode-fullscreen", enabled);
  resultsFullscreenBtn.textContent = enabled ? "Close full screen" : "Full screen";
  resultsFullscreenBtn.setAttribute("aria-pressed", String(enabled));
  if (enabled) {
    resultsPanel.scrollIntoView({ block: "start" });
  } else {
    resultsFullscreenBtn.focus();
  }
}

function getActiveResultFilterCount() {
  return [
    resultsSearch.value.trim(),
    selectedResultsSlas.length ? "sla" : resultsSlaFilter.value,
    resultsDirectionFilter.value,
    activeTab === "replacements" ? resultsDateFilter.value : resultsMissingFilter.value,
    resultsStartTimeFilter.value,
    resultsEndTimeFilter.value,
    resultsLocalTimeToggle.checked ? "local" : "",
    activeTab === "gaps" && gapSuitableOnlyToggle.checked ? "suitable" : "",
  ].filter(Boolean).length;
}

function syncResultFilterUi(total, shown) {
  const activeCount = getActiveResultFilterCount();
  resultsClearFilters.disabled = activeCount === 0;
  resultsMatchSummary.textContent = total
    ? `${shown} of ${total} shown${activeCount ? ` · ${activeCount} active filter${activeCount === 1 ? "" : "s"}` : ""}`
    : "No scan results yet";

}

gapStaffSearch.value = localStorage.getItem("myInitials") || "";
setResultFiltersCollapsed(localStorage.getItem("gsrmResultFiltersCollapsed") === "true");
updateResultsSlaFilter();
syncResultFilterUi(0, 0);

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
  const force = forceRefresh || Boolean(document.getElementById("forceRefreshToggle")?.checked);
  payload.forceRefresh = force;
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
  selectedResultsSlas = [];
  resultsSlaFilter.value = "";
  resultsDirectionFilter.value = "";
  resultsMissingFilter.value = "";
  resultsStartTimeFilter.value = "";
  resultsEndTimeFilter.value = "";
  resultsLocalTimeToggle.checked = false;
  latestRows = [];
  originalRows = [];
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
    originalRows = JSON.parse(JSON.stringify(result.rows || []));
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
    originalRows = [];
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
    const activeFilters = getActiveResultFilterCount();
    const hasScanRows = latestRows.length > 0;
    const title = !hasScanRows ? "Run a scan to find coverage gaps" : activeFilters ? "No gaps match these filters" : "No coverage gaps found";
    const hint = !hasScanRows
      ? "Connect to AVBIS, confirm the scan period, then select Run."
      : activeFilters
        ? "Reset or adjust the filters to see more results."
        : "Every scanned position is currently covered for this period.";
    tr.innerHTML = `<td colspan="11" class="empty results-empty-cell"><div class="results-empty-state"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(hint)}</span></div></td>`;
    resultsBody.appendChild(tr);
    return;
  }

  const useLocal = resultsLocalTimeToggle.checked;
  const startHeader = document.getElementById("thStart");
  const releaseHeader = document.getElementById("thRelease");
  if (startHeader) startHeader.textContent = useLocal ? "Start Local" : "Start UTC";
  if (releaseHeader) releaseHeader.textContent = useLocal ? "Release Local" : "Release UTC";

  // Sort rows based on currentSortCol & currentSortDir
  const sortedRows = [...rows].sort((a, b) => {
    let valA = a[currentSortCol] ?? "";
    let valB = b[currentSortCol] ?? "";

    if (currentSortCol === "required" || currentSortCol === "assigned" || currentSortCol === "missing") {
      valA = Number(valA) || 0;
      valB = Number(valB) || 0;
    } else if (currentSortCol === "duration") {
      const startA = parseUtcTime(a.date, a.start_utc);
      const relA = parseUtcTime(a.date, a.release_utc);
      valA = (startA && relA) ? (relA - startA) : 0;

      const startB = parseUtcTime(b.date, b.start_utc);
      const relB = parseUtcTime(b.date, b.release_utc);
      valB = (startB && relB) ? (relB - startB) : 0;
    } else {
      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();
    }

    if (valA < valB) return currentSortDir === "asc" ? -1 : 1;
    if (valA > valB) return currentSortDir === "asc" ? 1 : -1;
    return 0;
  });

  for (const row of sortedRows) {
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

    const personalFit = getPersonalGapFit(row);
    const fitLabel = personalFit.state === "eligible"
      ? `<span class="opportunity-fit fit-good">Good fit · ${escapeHtml(personalFit.candidate.score)}/10</span>`
      : personalFit.state === "assigned"
        ? '<span class="opportunity-fit fit-assigned">Already assigned</span>'
        : personalFit.state === "conflict"
          ? '<span class="opportunity-fit fit-conflict">Not suitable</span>'
          : "";
    tr.classList.toggle("personal-opportunity", personalFit.state === "eligible");

    const missingVal = Number(row.missing || 0);
    const missingBadgeHtml = missingVal > 0
      ? `<span class="missing-badge${missingVal >= 2 ? " critical" : ""}">${missingVal}</span>`
      : `<span class="badge badge-covered">0</span>`;

    const directionText = row.direction
      ? `<span class="flight-dir">${escapeHtml(row.direction)}</span>`
      : "";

    tr.innerHTML = `
      <td class="col-date">${escapeHtml(row.date)}</td>
      <td class="col-flight">
        <strong>${escapeHtml(row.flight)}</strong>
        ${directionText}
      </td>
      <td class="col-route">${escapeHtml(row.route || "-")}</td>
      <td><span class="badge badge-${escapeHtml(row.sla).toLowerCase().replace(/[^a-z0-9]/g, "-")}">${escapeHtml(row.sla)}</span></td>
      <td class="col-num">${escapeHtml(row.required)}</td>
      <td class="col-num">${escapeHtml(row.assigned)}</td>
      <td class="col-num">${missingBadgeHtml}</td>
      <td class="col-time">${escapeHtml(displayStart)}</td>
      <td class="col-time">${escapeHtml(displayRelease)}</td>
      <td class="col-duration">${escapeHtml(duration)}</td>
      <td class="opportunity-cell">
        ${fitLabel}
        <button type="button" class="plan-gap-btn">
          <svg style="width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:2" viewBox="0 0 24 24">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="17" y1="11" x2="23" y2="11"></line>
          </svg>
          <span>Plan / Assign</span>
        </button>
      </td>
    `;
    tr.querySelector(".plan-gap-btn").addEventListener("click", () => openGapPlanner(row));
    resultsBody.appendChild(tr);
  }

  // Bind table header sort events once table rendered
  document.querySelectorAll("#gapsTable th.sortable-th").forEach((th) => {
    th.onclick = () => {
      const col = th.dataset.sort;
      if (!col) return;
      if (currentSortCol === col) {
        currentSortDir = currentSortDir === "asc" ? "desc" : "asc";
      } else {
        currentSortCol = col;
        currentSortDir = "asc";
      }
      document.querySelectorAll("#gapsTable th .sort-icon").forEach((s) => (s.textContent = ""));
      const iconSpan = th.querySelector(".sort-icon");
      if (iconSpan) iconSpan.textContent = currentSortDir === "asc" ? " ▲" : " ▼";
      applyFilters();
    };
  });
}

function getPersonalGapFit(row) {
  const query = gapStaffSearch?.value.trim();
  if (!query) return { state: "none", eligible: false };
  const identity = resolveStaffIdentity(query);
  if (!identity) return { state: "unknown", eligible: false };
  const assigned = (row.staff || []).some((value) => parseStaffIdentity(value)?.key === identity.key);
  if (assigned) return { state: "assigned", eligible: false, identity };
  const candidate = OperationsUtils.rankCandidates(row, latestRows, latestStaffDirectory, { maxGapMinutes: 240 })
    .find((person) => person.key === identity.key);
  return candidate
    ? { state: "eligible", eligible: true, identity, candidate }
    : { state: "conflict", eligible: false, identity };
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

function setRosterStateMode(mode) {
  rosterStateMode = ["original", "compare"].includes(mode) ? mode : "edited";
  document.querySelectorAll("#rosterStateToggleGroup .state-toggle-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.stateMode === rosterStateMode);
  });
  if (activeTab === "roster") renderRoster();
}

function getRosterSourceRows() {
  return rosterStateMode === "original" && originalRows.length ? originalRows : latestRows;
}

function getOriginalDuty(row) {
  const key = OperationsUtils.rowKey(row);
  return originalRows.find((item) => OperationsUtils.rowKey(item) === key) || null;
}

function staffByKey(row) {
  const people = new Map();
  for (const label of row?.staff || []) {
    const identity = parseStaffIdentity(label);
    if (identity) people.set(identity.key, identity);
  }
  return people;
}

function getDutyRosterChange(row) {
  const original = getOriginalDuty(row);
  if (!original) return { changed: false, added: [], removed: [] };
  const before = staffByKey(original);
  const after = staffByKey(latestRows.find((item) => OperationsUtils.rowKey(item) === OperationsUtils.rowKey(row)) || row);
  const added = [...after.entries()].filter(([key]) => !before.has(key)).map(([, person]) => person);
  const removed = [...before.entries()].filter(([key]) => !after.has(key)).map(([, person]) => person);
  return { changed: added.length > 0 || removed.length > 0, added, removed };
}

function formatRosterChange(change) {
  const removed = change.removed.map((person) => person.name).join(", ");
  const added = change.added.map((person) => person.name).join(", ");
  if (removed && added) return `${removed} → ${added}`;
  if (added) return `Added ${added}`;
  if (removed) return `Removed ${removed}`;
  return "";
}

function formatStaffLabel(person) {
  return `${person.initials || person.key} - ${person.name || person.initials || person.key}`;
}

function renderAccountOwnerDuties() {
  if (!accountDutySummary) return;
  if (activeTab !== "gaps") {
    accountDutySummary.hidden = true;
    return;
  }
  const query = gapStaffSearch.value.trim();
  const owner = resolveStaffIdentity(query);
  if (!owner || !latestRows.length) {
    accountDutySummary.hidden = true;
    return;
  }
  const duties = latestRows
    .filter((row) => (row.staff || []).some((label) => matchStaffMember(label, owner.initials) || matchStaffMember(label, owner.name)))
    .sort((a, b) => `${a.date} ${a.start_utc}`.localeCompare(`${b.date} ${b.start_utc}`));
  accountDutySummary.hidden = false;
  accountDutyTitle.textContent = `${owner.name} · ${duties.length} assigned ${duties.length === 1 ? "duty" : "duties"}`;
  accountDutyChips.innerHTML = duties.length
    ? duties.slice(0, 4).map((row) => `<span><strong>${escapeHtml(row.flight)} · ${escapeHtml(row.sla)}</strong><small>${escapeHtml(row.date)} · ${escapeHtml(row.start_utc)}–${escapeHtml(row.release_utc)} UTC</small></span>`).join("") + (duties.length > 4 ? `<em>+${duties.length - 4} more</em>` : "")
    : '<span class="account-duty-empty">No assigned duties in this scan.</span>';
}

function openAccountOwnerRoster() {
  const owner = resolveStaffIdentity(gapStaffSearch.value.trim());
  if (!owner) return;
  rosterStaffSearch.value = owner.name;
  setRosterViewMode("staff", false);
  setRosterStateMode("edited");
  switchTab("roster");
}

function applyFilters() {
  renderAccountOwnerDuties();
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

  const sourceRows = latestRows;

  filteredRows = sourceRows.filter((row) => {
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

    if (selectedResultsSlas.length > 0) {
      if (!selectedResultsSlas.includes(row.sla)) return false;
    } else if (slaVal && row.sla !== slaVal) {
      return false;
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
    if (missingVal && Number(row.missing || 0) < Number(missingVal)) return false;
    if (activeTab === "gaps" && gapSuitableOnlyToggle.checked && !getPersonalGapFit(row).eligible) return false;

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

  const totalGapRows = latestRows.filter((row) => Number(row.missing || 0) > 0).length;
  if (totalGapRows === 0) {
    resultCount.textContent = "0";
  } else if (filteredRows.length === totalGapRows) {
    resultCount.textContent = totalGapRows;
  } else {
    resultCount.textContent = `${filteredRows.length} of ${totalGapRows}`;
  }

  syncResultFilterUi(totalGapRows, filteredRows.length);

  updateExportButtonsState();
  opsCsvBtn.disabled = !latestRows.some((row) => Number(row.missing || 0) > 0);
}

function updateResultsSlaFilter() {
  const uniqueSlas = [...new Set(latestRows.map((r) => r.sla).filter(Boolean))].sort();

  resultsSlaFilter.innerHTML = '<option value="">All SLAs</option>';
  for (const sla of uniqueSlas) {
    const opt = document.createElement("option");
    opt.value = sla;
    opt.textContent = sla;
    if (selectedResultsSlas.includes(sla)) opt.selected = true;
    resultsSlaFilter.appendChild(opt);
  }

  if (resultsSlaCheckboxes) {
    resultsSlaCheckboxes.innerHTML = "";
    if (uniqueSlas.length === 0) {
      resultsSlaCheckboxes.innerHTML = '<span class="muted" style="padding:4px; font-size:12px;">No scan data available</span>';
    } else {
      for (const sla of uniqueSlas) {
        const isChecked = selectedResultsSlas.includes(sla);
        const label = document.createElement("label");
        label.className = "multi-select-item";
        label.innerHTML = `
          <input type="checkbox" value="${escapeHtml(sla)}" ${isChecked ? "checked" : ""}>
          <span>${escapeHtml(sla)}</span>
        `;
        label.querySelector("input").addEventListener("change", (e) => {
          if (e.target.checked) {
            if (!selectedResultsSlas.includes(sla)) selectedResultsSlas.push(sla);
          } else {
            selectedResultsSlas = selectedResultsSlas.filter((s) => s !== sla);
          }
          syncResultsSlaBtnText();
          renderSlaChips(uniqueSlas);
          applyFilters();
        });
        resultsSlaCheckboxes.appendChild(label);
      }
    }
  }

  syncResultsSlaBtnText();
  renderSlaChips(uniqueSlas);
}

function syncResultsSlaBtnText() {
  if (!resultsSlaBtnText) return;
  if (selectedResultsSlas.length === 0) {
    resultsSlaBtnText.textContent = "All SLAs";
  } else if (selectedResultsSlas.length === 1) {
    resultsSlaBtnText.textContent = selectedResultsSlas[0];
  } else {
    resultsSlaBtnText.textContent = `${selectedResultsSlas.length} SLAs selected`;
  }
}

function renderSlaChips(availableSlas) {
  if (!slaChipsContainer) return;
  const slas = availableSlas.length > 0 ? availableSlas : ["CKIN", "GATE", "LOFO", "QH-CKI", "QH-GATE", "ASVC", "SECS"];

  let html = `<button type="button" class="sla-chip ${selectedResultsSlas.length === 0 ? "active" : ""}" data-sla="all">All SLAs</button>`;
  for (const sla of slas) {
    const isActive = selectedResultsSlas.includes(sla);
    html += `<button type="button" class="sla-chip ${isActive ? "active" : ""}" data-sla="${escapeHtml(sla)}">${escapeHtml(sla)}</button>`;
  }
  slaChipsContainer.innerHTML = html;

  slaChipsContainer.querySelectorAll(".sla-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sla = btn.dataset.sla;
      if (sla === "all") {
        selectedResultsSlas = [];
      } else {
        if (selectedResultsSlas.includes(sla)) {
          selectedResultsSlas = selectedResultsSlas.filter((s) => s !== sla);
        } else {
          selectedResultsSlas.push(sla);
        }
      }
      updateResultsSlaFilter();
      applyFilters();
    });
  });
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

  syncRosterPresetChips();
  applyFilters();
}

function populateBulkReplacementOptions(targetIdentity) {
  const select = document.getElementById("bulkReplacementCandidateSelect");
  if (!select) return;
  const currentVal = select.value;
  select.innerHTML = `
    <option value="">Select replacement candidate...</option>
    <option value="auto">✨ Auto-assign best match for each shift</option>
  `;

  const staffList = typeof getPlannerPeople === "function" ? getPlannerPeople() : [];
  const targetKey = targetIdentity?.key || targetIdentity?.initials?.toUpperCase();

  for (const person of staffList) {
    if (targetKey && (person.key === targetKey || person.initials.toUpperCase() === targetKey)) continue;
    const option = document.createElement("option");
    option.value = person.key;
    option.textContent = `${person.initials} - ${person.name}`;
    select.appendChild(option);
  }
  if (currentVal && [...select.options].some((o) => o.value === currentVal)) {
    select.value = currentVal;
  }
}

function renderReplacements(preserveSelectedDuty = false) {
  if (!preserveSelectedDuty) {
    selectedReplacementDuty = null;
  }
  const dutiesList = document.getElementById("dutiesList");
  const candidatesList = document.getElementById("candidatesList");
  const bulkBar = document.getElementById("bulkReplacementBar");
  dutiesList.innerHTML = "";
  if (!preserveSelectedDuty) {
    candidatesList.innerHTML = `<div class="empty-selection">Select a duty on the left to see people who can replace you.</div>`;
    replacementCandidatesHeader.textContent = "Available Replacements";
  }

  const initials = myInitialsInput.value.trim().toUpperCase();
  if (!initials) {
    replacementStaffName.textContent = "Select a staff member";
    replacementStaffSummary.textContent = "Type a name above to load their duties.";
    dutiesList.innerHTML = `<div class="empty-list">Please enter your initials/name to see your duties.</div>`;
    if (bulkBar) bulkBar.hidden = true;
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

  if (bulkBar) {
    bulkBar.hidden = myDuties.length === 0;
    populateBulkReplacementOptions(selectedIdentity || { initials });
  }

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

  const sourceRows = getRosterSourceRows();
  const staff = new Map();
  for (const staffString of latestStaffDirectory) {
    const identity = parseStaffIdentity(staffString);
    if (identity && !staff.has(identity.key)) staff.set(identity.key, { ...identity, assignments: [] });
  }
  for (const assignment of sourceRows) {
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
  const rosterPresetFilterGroup = document.getElementById("rosterPresetFilterGroup");
  if (rosterPresetFilterGroup) rosterPresetFilterGroup.hidden = isAirline;
  rosterStatus.disabled = isAirline || !latestScannedDates.length;
  rosterStatus.title = isAirline ? "Availability applies to the staff roster view." : "";

  document.querySelectorAll("#rosterPresetFilterGroup .preset-chip").forEach((btn) => {
    btn.disabled = isAirline;
    btn.title = isAirline ? "Filter presets apply to staff roster view" : "";
  });

  rosterViewHint.textContent = isAirline
    ? "Chronological flights with coverage, assigned staff, and local edits."
    : "People by day with replacements and local edits clearly marked.";
  rosterFreeLabel.textContent = isAirline ? "Days" : "Free";
  rosterDutyLabel.textContent = isAirline ? "Flights" : "On duty";
  if (activeTab === "roster") contextHint.textContent = isAirline
    ? "Chronological daily flight and staffing schedule"
    : "Availability and duties for the selected window";
  if (activeTab === "roster") resultCountLabel.textContent = isAirline ? "flights shown" : "staff shown";
  syncRosterPresetChips();
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
  const uniqueAirlines = [...new Set(getRosterSourceRows().map((r) => OperationsUtils.airlineCode(r)).filter(Boolean))].sort();

  flightScheduleAirlineFilter.innerHTML = `<option value="all">All airlines (${uniqueAirlines.length})</option>` +
    uniqueAirlines.map((code) => `<option value="${escapeHtml(code)}" ${code === currentSelection ? "selected" : ""}>${escapeHtml(code)}</option>`).join("");
}

function getAirlineRosterDays(roster) {
  const scheduleQuery = (flightScheduleSearch?.value || "").trim() || (rosterStaffSearch?.value || "").trim();
  const sourceRows = getRosterSourceRows();
  return OperationsUtils.buildFlightSchedule(sourceRows, roster.dailyWindows, {
    query: scheduleQuery,
    sla: rosterSla.value,
    coverage: flightScheduleCoverageFilter?.value || "all",
    direction: flightScheduleDirectionFilter?.value || "all",
    airline: flightScheduleAirlineFilter?.value || "all",
  });
}

function renderRoster() {
  updateAirlineFilterOptions();
  syncRosterPresetChips();
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
  const rosterStateLabel = rosterStateMode === "original" ? "Original scan" : rosterStateMode === "compare" ? "Edited roster with changes" : "Edited roster";
  rosterWindowText.textContent = `${rosterStateLabel} · ${dateLabel} · ${rosterStartTime.value}–${rosterEndTime.value}${overnightSuffix} UTC · times shown in ${displayZone}.`;
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
      const hasLocalEdit = rosterStateMode !== "original" && person.byDay.flat().some((assignment) => getDutyRosterChange(assignment).changed);
      if (hasLocalEdit) tr.classList.add("roster-edited-row");
      tr.innerHTML = `
        <td class="roster-person-cell">
          <strong>${escapeHtml(person.name)}</strong>
          <span>${escapeHtml(person.initials)}${hasLocalEdit ? ' <b class="edited-badge">Edited</b>' : ""}</span>
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
  const scheduleStateLabel = rosterStateMode === "original" ? "Original scan" : rosterStateMode === "compare" ? "Edited schedule with changes" : "Edited schedule";
  rosterWindowText.textContent = `${scheduleStateLabel} · ${dateLabel} · ${visibleFlights} flights · ${visibleMissing} missing · ${rosterStartTime.value}–${rosterEndTime.value}${overnightSuffix} UTC.`;

  rosterAirlineView.innerHTML = days.map((day) => {
    const date = new Date(`${day.isoDate}T12:00:00Z`);
    const dayHeadingId = `flight-day-${day.isoDate}`;
    const flightCards = day.flights.length ? day.flights.map((flight) => {
        const dutyRows = flight.duties.map((duty) => {
          const dutyIndex = dutyRefs.push(duty) - 1;
          const rosterChange = rosterStateMode === "original" ? { changed: false, added: [], removed: [] } : getDutyRosterChange(duty);
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
          const changeText = formatRosterChange(rosterChange);
          return `<tr class="${remaining ? "allocation-gap-row" : ""}${rosterChange.changed ? " roster-edited-duty" : ""}">
            <td><strong>${escapeHtml(duty.sla || "—")}</strong><small>${escapeHtml(role)}</small></td>
            <td>${escapeHtml(getDisplayTime(duty.date, duty.start_utc, useLocal))}–${escapeHtml(getDisplayTime(duty.date, duty.release_utc, useLocal))} ${zoneLabel}</td>
            <td><span class="allocation-coverage ${remaining ? "has-gap" : "covered"}">${plannedAssigned}/${escapeHtml(duty.required)}</span>${remaining ? `<small>${remaining} missing</small>` : planned.length ? "<small>Covered by local plan</small>" : ""}</td>
            <td><div class="board-staff-list">${staff}${plannedStaff}</div>${rosterChange.changed ? `<div class="roster-change-note"><b>Edited</b><span>${escapeHtml(changeText)}</span></div>` : ""}</td>
            <td>
              ${remaining ? `<button type="button" class="secondary-btn board-plan-btn" data-duty-index="${dutyIndex}">Fill gap</button>` : '<span class="board-covered-label">Click a name to replace</span>'}
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
  const duties = assignments.map((row) => {
    const change = rosterStateMode === "original" ? { changed: false, added: [], removed: [] } : getDutyRosterChange(row);
    const changeText = formatRosterChange(change);
    return `
    <button type="button" class="compact-duty${change.changed ? " edited" : ""}" title="${change.changed ? `Edited locally: ${escapeHtml(changeText)} · ` : ""}Find a replacement · ${escapeHtml(`${row.route || ""} · ${row.start_utc || ""}–${row.release_utc || ""} UTC`)}">
      <strong>${escapeHtml(row.flight)}</strong>
      <span class="compact-sla">${escapeHtml(row.sla)}${change.changed ? ' <b class="edited-badge">Edited</b>' : ""}</span>
      <small>${escapeHtml(getDisplayTime(row.date, row.start_utc, useLocal))}–${escapeHtml(getDisplayTime(row.date, row.release_utc, useLocal))} ${zoneLabel}</small>
      ${change.changed ? `<small class="compact-duty-change">${escapeHtml(changeText)}</small>` : ""}
    </button>
  `; }).join("");
  return `<td class="roster-day-cell">${showTotal ? `<span class="roster-day-total">${dutyHours}h</span>` : ""}<div class="duty-strip">${duties}</div></td>`;
}

function openReplacementFinder(person, duty) {
  const staffKey = person.initials || person.name;
  myInitialsInput.value = staffKey;
  localStorage.setItem("myInitials", staffKey);
  switchTab("replacements");
  renderReplacements(true);
  showCandidatesForDuty(duty);
  const activeCard = Array.from(document.querySelectorAll(".duty-card")).find((c) => c.textContent.includes(duty.flight) && c.textContent.includes(duty.date));
  if (activeCard) {
    document.querySelectorAll(".duty-card").forEach((c) => c.classList.remove("active"));
    activeCard.classList.add("active");
  }
  setMessage(`Showing agents available to replace ${person.name} on ${duty.flight} (${duty.sla}).`);
}

function closeRosterInlineReplacement() {
  const drawer = document.getElementById("rosterInlineReplacementDrawer");
  if (drawer) drawer.hidden = true;
}

function openRosterInlineReplacement(duty, personToReplace = null) {
  const drawer = document.getElementById("rosterInlineReplacementDrawer");
  const titleEl = document.getElementById("rosterInlineTitle");
  const subtitleEl = document.getElementById("rosterInlineSubtitle");
  const contentEl = document.getElementById("rosterInlineCandidatesContent");

  if (!drawer || !contentEl) return;

  const replaceName = personToReplace ? (personToReplace.name || personToReplace.initials) : "Unassigned Position";
  titleEl.innerHTML = `Replacement Candidates for <strong>${escapeHtml(duty.flight || "")} · ${escapeHtml(duty.sla || "")}</strong>`;
  subtitleEl.textContent = `Target Duty: ${duty.date} (${duty.start_utc}–${duty.release_utc} UTC) · Replacing: ${replaceName}`;

  drawer.hidden = false;
  drawer.scrollIntoView({ behavior: "smooth", block: "nearest" });

  const candidates = OperationsUtils.getDutyGapCandidates(duty, latestRows, latestStaffDirectory, getPlannerOptions());

  if (!candidates || !candidates.length) {
    contentEl.innerHTML = `<div class="empty-selection" style="grid-column: 1 / -1;">No available staff members meet the criteria for this duty window.</div>`;
    return;
  }

  const BEST_LIMIT = 3;
  const bestCandidates = candidates.slice(0, BEST_LIMIT);
  const moreCandidates = candidates.slice(BEST_LIMIT);

  const buildCandidateCard = (cand, isBest = false) => {
    const bufferHours = formatHours(cand.connectionGapMinutes);
    const statusText = cand.freeAllDay
      ? "Free all day"
      : cand.adjacent
      ? `Back-to-back shift (${bufferHours}h buffer)`
      : `Free window (${bufferHours}h buffer)`;

    const slaExpText = cand.slaExperience ? ` · ${cand.slaExperience} ${duty.sla} duties prior` : "";
    const bestBadge = isBest ? `<span class="inline-candidate-badge-best">Best Match</span>` : "";

    return `
      <div class="inline-candidate-card">
        <div class="inline-candidate-info">
          <strong>${escapeHtml(cand.name)} <small>(${escapeHtml(cand.initials)})</small>${bestBadge}</strong>
          <span>${escapeHtml(statusText)}</span>
          <small>${escapeHtml(`${cand.sameDayDuties ? cand.sameDayDuties.length : 0} shifts scheduled today${slaExpText}`)}</small>
        </div>
        <button type="button" class="inline-assign-btn" data-assign-key="${escapeHtml(cand.key)}" data-assign-name="${escapeHtml(cand.name)}" data-assign-initials="${escapeHtml(cand.initials)}">${personToReplace ? "Replace" : "Assign"}</button>
      </div>
    `;
  };

  let html = "";

  // 1. Assigned Staff Management Section (Remove functionality)
  const currentAssigned = duty.staff || [];
  if (currentAssigned.length > 0) {
    html += `
      <div class="inline-candidate-quick-action assigned-section" style="grid-column: 1 / -1; background: #fdf2f2; border-color: #fecaca; margin-bottom: 6px;">
        <div style="display:flex; flex-direction:column; gap:4px; width:100%;">
          <span style="font-weight:700; font-size:12px; color:#991b1b;">Currently Assigned Staff (${currentAssigned.length}):</span>
          <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:2px;">
            ${currentAssigned.map((label) => {
              const parsed = parseStaffIdentity(label);
              const displayName = parsed ? `${parsed.name} (${parsed.initials})` : label;
              const staffKey = parsed?.key || label;
              return `
                <span class="assigned-person-chip" style="display:inline-flex; align-items:center; gap:6px; background:#ffffff; border:1px solid #fca5a5; padding:3px 8px; border-radius:6px; font-size:12px; font-weight:600; color:#7f1d1d;">
                  ${escapeHtml(displayName)}
                  <button type="button" class="inline-remove-staff-btn danger-btn" data-remove-key="${escapeHtml(staffKey)}" data-remove-name="${escapeHtml(displayName)}" style="min-height:22px; padding:0 6px; font-size:10px; line-height:1; border-radius:4px;">
                    ✕ Remove
                  </button>
                </span>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `;
  }

  // 2. Bulk Replace Action Bar (if personToReplace is selected)
  if (personToReplace) {
    html += `
      <div class="inline-candidate-quick-action" style="background: #f0fdfa; border-color: var(--accent); grid-column: 1 / -1; margin-bottom: 6px;">
        <span>Replace all shifts of <strong>${escapeHtml(replaceName)}</strong> across all scanned dates:</span>
        <button id="rosterInlineReplaceAllBtn" type="button" class="inline-bulk-replace-btn">
          <svg style="width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2" viewBox="0 0 24 24">
            <path d="M17 1l4 4-4 4"></path>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <path d="M7 23l-4-4 4-4"></path>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
          Replace All Shifts...
        </button>
      </div>
    `;
  }

  // 3. Recommended Match Action
  html += `<div class="inline-candidate-quick-action"><span><strong>Recommended</strong> ${escapeHtml(bestCandidates[0].name)} is the highest-ranked valid match.</span><button id="rosterAssignBestBtn" type="button" class="primary-btn">Assign best match</button></div>`;
  html += bestCandidates.map((candidate, index) => buildCandidateCard(candidate, index === 0)).join("");

  if (moreCandidates.length > 0) {
    html += `
      <button type="button" id="rosterInlineShowMoreBtn" class="show-more-candidates-btn">Show ${moreCandidates.length} more candidate${moreCandidates.length > 1 ? "s" : ""} ▾</button>
      <div id="rosterInlineMoreCandidates" class="inline-candidates-grid" style="grid-column: 1 / -1;" hidden>
        ${moreCandidates.map((c) => buildCandidateCard(c, false)).join("")}
      </div>
    `;
  }

  contentEl.innerHTML = html;

  const showMoreBtn = contentEl.querySelector("#rosterInlineShowMoreBtn");
  const moreContainer = contentEl.querySelector("#rosterInlineMoreCandidates");
  if (showMoreBtn && moreContainer) {
    showMoreBtn.addEventListener("click", () => {
      const isHidden = moreContainer.hidden;
      moreContainer.hidden = !isHidden;
      showMoreBtn.innerHTML = isHidden
        ? "Show less ▴"
        : `Show ${moreCandidates.length} more candidate${moreCandidates.length > 1 ? "s" : ""} ▾`;
    });
  }

  contentEl.querySelector("#rosterInlineReplaceAllBtn")?.addEventListener("click", () => {
    openBulkReplacementForPerson(personToReplace);
  });

  // Handle Remove Staff event
  contentEl.querySelectorAll("button[data-remove-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const removeKey = btn.dataset.removeKey;
      const removeName = btn.dataset.removeName;
      const targetRow = latestRows.find((r) => OperationsUtils.rowKey(r) === OperationsUtils.rowKey(duty));
      if (targetRow && targetRow.staff) {
        targetRow.staff = targetRow.staff.filter((label) => !matchStaffMember(label, removeKey) && !matchStaffMember(label, removeName));
        targetRow.assigned = targetRow.staff.length;
        targetRow.missing = Math.max(0, Number(targetRow.required || 0) - targetRow.assigned);
        currentAutoPlan = null;
        autoPlannerResult.textContent = "Roster changed. Create a new plan to use the updated staffing.";
        applyFilters();
        if (typeof renderRoster === "function") renderRoster();
        if (typeof renderReplacements === "function") renderReplacements();
        closeRosterInlineReplacement();
        setMessage(`Removed ${removeName} from ${duty.flight} (${duty.sla}).`, "warn");
      }
    });
  });

  contentEl.querySelectorAll("button[data-assign-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const candidateKey = btn.dataset.assignKey;
      const candidateName = btn.dataset.assignName;
      const candidateInitials = btn.dataset.assignInitials;

      const targetRow = latestRows.find((r) => OperationsUtils.rowKey(r) === OperationsUtils.rowKey(duty));
      if (targetRow) {
        targetRow.staff = targetRow.staff || [];
        const formatted = formatStaffLabel({ name: candidateName, initials: candidateInitials, key: candidateKey });
        if (personToReplace) {
          const oldIndex = targetRow.staff.findIndex((label) => matchStaffMember(label, replaceName));
          if (oldIndex >= 0) {
            targetRow.staff[oldIndex] = formatted;
          } else if (!targetRow.staff.some((label) => matchStaffMember(label, candidateKey))) {
            targetRow.staff.push(formatted);
          }
        } else {
          if (!targetRow.staff.some((label) => matchStaffMember(label, candidateKey))) {
            targetRow.staff.push(formatted);
          }
        }
        targetRow.assigned = targetRow.staff.length;
        targetRow.missing = Math.max(0, Number(targetRow.required || 0) - targetRow.assigned);
      }

      currentAutoPlan = null;
      autoPlannerResult.textContent = "Roster changed. Create a new plan to use the updated staffing.";

      applyFilters();
      if (typeof renderRoster === "function") renderRoster();
      setMessage(`Assigned ${candidateName} to ${duty.flight} (${duty.sla}).`, "success");
      drawer.hidden = true;
    });
  });
  contentEl.querySelector("#rosterAssignBestBtn")?.addEventListener("click", () => {
    contentEl.querySelector("button[data-assign-key]")?.click();
  });
}

function executeBulkReplacement() {
  const initials = myInitialsInput.value.trim().toUpperCase();
  if (!initials) {
    return setMessage("Please enter or select a staff member to replace.", "warn");
  }

  const selectedIdentity = resolveStaffIdentity(initials) || { name: initials, initials, key: initials };
  const targetName = selectedIdentity.name || initials;

  const targetDuties = latestRows.filter((row) => {
    if (!row.staff) return false;
    return row.staff.some((s) => matchStaffMember(s, initials));
  });

  if (!targetDuties.length) {
    return setMessage(`No scheduled duties found for ${targetName} across the scanned dates.`, "warn");
  }

  const selectEl = document.getElementById("bulkReplacementCandidateSelect");
  const selectedCandidateKey = selectEl ? selectEl.value : "";
  if (!selectedCandidateKey) {
    return setMessage("Please select a replacement candidate or 'Auto-assign best match'.", "warn");
  }

  let replacedCount = 0;
  let conflictCount = 0;
  const chosenSummaryList = [];

  for (const duty of targetDuties) {
    let chosenCandidate = null;

    if (selectedCandidateKey === "auto") {
      const opts = { ...getPlannerOptions(), excludedKey: selectedIdentity.key || initials };
      const candidates = OperationsUtils.getDutyGapCandidates(duty, latestRows, latestStaffDirectory, opts);
      if (candidates && candidates.length > 0) {
        chosenCandidate = candidates[0];
      }
    } else {
      const candObj = getPlannerPeople().find((p) => p.key === selectedCandidateKey) || resolveStaffIdentity(selectedCandidateKey);
      if (candObj) {
        chosenCandidate = candObj;
      }
    }

    if (!chosenCandidate) {
      conflictCount += 1;
      continue;
    }

    const candName = chosenCandidate.name || chosenCandidate.initials;
    const candKey = chosenCandidate.key || chosenCandidate.initials;
    const formatted = formatStaffLabel({ name: candName, initials: chosenCandidate.initials, key: candKey });

    const targetRow = latestRows.find((r) => OperationsUtils.rowKey(r) === OperationsUtils.rowKey(duty));
    if (targetRow) {
      targetRow.staff = targetRow.staff || [];
      const oldIndex = targetRow.staff.findIndex((label) => matchStaffMember(label, initials));

      if (oldIndex >= 0) {
        const existingCandIndex = targetRow.staff.findIndex((label) => matchStaffMember(label, candKey));
        if (existingCandIndex >= 0 && existingCandIndex !== oldIndex) {
          targetRow.staff.splice(oldIndex, 1);
        } else {
          targetRow.staff[oldIndex] = formatted;
        }
      } else {
        targetRow.staff.push(formatted);
      }

      targetRow.assigned = targetRow.staff.length;
      targetRow.missing = Math.max(0, Number(targetRow.required || 0) - targetRow.assigned);
      replacedCount += 1;
      if (!chosenSummaryList.includes(candName)) {
        chosenSummaryList.push(candName);
      }
    }
  }

  applyFilters();
  renderReplacements(true);
  currentAutoPlan = null;
  autoPlannerResult.textContent = "Roster changed. Create a new plan to use the updated staffing.";
  if (typeof renderRoster === "function") renderRoster();

  if (replacedCount > 0) {
    const candLabel = selectedCandidateKey === "auto"
      ? `best matching candidates (${chosenSummaryList.join(", ")})`
      : chosenSummaryList.join(", ");
    const conflictNote = conflictCount > 0 ? ` (${conflictCount} shift(s) could not be covered due to schedule constraints)` : "";
    setMessage(`Successfully replaced ${replacedCount} shift(s) of ${targetName} across all scanned dates with ${candLabel}.${conflictNote}`, "success");
  } else {
    setMessage(`Could not replace shifts for ${targetName}. No suitable candidates were available.`, "warn");
  }
}

function openBulkReplacementForPerson(personToReplace) {
  if (!personToReplace) return;
  const staffKey = personToReplace.initials || personToReplace.name || personToReplace.key;
  myInitialsInput.value = staffKey;
  localStorage.setItem("myInitials", staffKey);
  switchTab("replacements");
  renderReplacements(false);
  closeRosterInlineReplacement();
  const bulkBar = document.getElementById("bulkReplacementBar");
  if (bulkBar) {
    bulkBar.hidden = false;
    bulkBar.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
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
      const availabilityOption = [...availabilityStaff.options].find((option) => option.value === input.value);
      if (availabilityOption) availabilityOption.selected = true;
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
  const previousAvailabilityStaff = new Set([...availabilityStaff.selectedOptions].map((option) => option.value));
  availabilityStaff.innerHTML = `<option value="">Select staff</option>${people.map((person) => `<option value="${escapeHtml(person.key)}">${escapeHtml(person.initials)} — ${escapeHtml(person.name)}</option>`).join("")}`;
  let restoredSelection = false;
  for (const option of availabilityStaff.options) {
    option.selected = previousAvailabilityStaff.has(option.value);
    if (option.selected) restoredSelection = true;
  }
  if (!restoredSelection && people.length) {
    const defaultStaff = people.find((person) => selectedPlannerStaff.has(person.key)) || people[0];
    if (defaultStaff) {
      availabilityStaff.value = defaultStaff.key;
      renderAvailabilityRules();
      updateAvailabilityFields();
    }
  }
  renderPlannerSlaOptions();
}

function selectAvailabilityStaff(personKeys) {
  const selected = new Set(personKeys || []);
  for (const option of availabilityStaff.options) option.selected = selected.has(option.value);
  renderAvailabilityRules();
}

function toggleAllPlannerStaff() {
  const people = getPlannerPeople();
  selectedPlannerStaff = selectedPlannerStaff.size === people.length ? new Set() : new Set(people.map((person) => person.key));
  currentAutoPlan = null;
  renderPlannerStaffList();
  autoPlannerResult.textContent = `${selectedPlannerStaff.size} staff selected.`;
}

function selectFreePlannerStaff() {
  const roster = getRosterRows();
  if (!roster) return setMessage("Choose a scanned roster window before selecting free staff.", "warn");
  selectedPlannerStaff = new Set(roster.rows.filter((person) => person.status === "free").map((person) => person.key));
  currentAutoPlan = null;
  renderPlannerStaffList();
  autoPlannerResult.textContent = `${selectedPlannerStaff.size} staff free for the entire roster window selected.`;
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
  const personKeys = [...availabilityStaff.selectedOptions].map((option) => option.value).filter(Boolean);
  if (!personKeys.length) return setMessage("Select at least one staff member before adding an availability rule.", "warn");
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
  const createdAt = Date.now();
  plannerAvailabilityRules.push(...personKeys.map((personKey, index) => ({
    id: `${createdAt}-${index}-${Math.random().toString(36).slice(2, 7)}`,
    personKey,
    startDate,
    endDate,
    weekdays,
    dates,
    shift: availabilityShift.value,
    from: availabilityFrom.value,
    to: availabilityTo.value,
  })));
  localStorage.setItem("gsrmPlannerAvailabilityV1", JSON.stringify(plannerAvailabilityRules));
  syncAvailabilityToBackend();
  if (mode === "dates") {
    selectedAvailabilityDates = new Set();
    availabilityDatesQuick.value = "";
    renderAvailabilityCalendar();
  }
  currentAutoPlan = null;
  renderAvailabilityRules();
  autoPlannerResult.textContent = `Availability updated for ${personKeys.length} staff member${personKeys.length === 1 ? "" : "s"}. Build a new plan to apply it.`;
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
  if (rulesBadge) {
    rulesBadge.textContent = String(plannerAvailabilityRules.length);
    rulesBadge.setAttribute("aria-label", `${plannerAvailabilityRules.length} availability rule${plannerAvailabilityRules.length === 1 ? "" : "s"}`);
  }
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
    syncAvailabilityToBackend();
    currentAutoPlan = null;
    renderAvailabilityRules();
  });
}

function renderPlannerSlaOptions() {
  const values = [...new Set(latestRows.map((row) => row.sla).filter(Boolean))].sort();
  let saved = null;
  try {
    const options = JSON.parse(localStorage.getItem("gsrmAutoPlannerOptionsV1") || "{}");
    if (Array.isArray(options.allowedSlas) && options.allowedSlas.length > 0) saved = new Set(options.allowedSlas);
  } catch {}
  plannerSlas.innerHTML = values.length
    ? values.map((sla) => `<option value="${escapeHtml(sla)}" ${!saved || saved.has(sla) ? "selected" : ""}>${escapeHtml(sla)}</option>`).join("")
    : '<option value="" disabled>Run a scan to load SLAs</option>';
}

function buildAutomaticPlan() {
  if (rosterStateMode !== "edited") setRosterStateMode("edited");
  const roster = getRosterRows();
  if (!roster) return setMessage("Choose a scanned roster date and time window before building a plan.", "warn");
  if (!selectedPlannerStaff.size) return setMessage("Select at least one eligible staff member for automatic planning.", "warn");
  if (!plannerSlas.selectedOptions.length) return setMessage("Select at least one SLA for the automatic planner.", "warn");

  const autoPlannerCard = autoPlannerRun?.closest(".auto-planner");
  if (autoPlannerCard && autoPlannerCard.classList.contains("collapsed")) {
    autoPlannerCard.classList.remove("collapsed");
    if (autoPlannerToggle) {
      autoPlannerToggle.textContent = "Hide planner";
      autoPlannerToggle.setAttribute("aria-expanded", "true");
    }
    localStorage.setItem("gsrmAutoPlannerCollapsed", "false");
  }

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
  autoPlannerResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function clearAutomaticPlan() {
  currentAutoPlan = null;
  autoPlannerResult.textContent = "Plan cleared. Select eligible staff, adjust the rules, then create a plan.";
  if (rosterViewMode === "airline") renderRoster();
}

function openAvailabilityModal() {
  const modal = document.getElementById("availabilityModal");
  if (!modal) return;
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  renderPlannerStaffList();
  updateAvailabilityFields();
  renderAvailabilityRules();
  availabilityStaff.focus();
}

function openCoveragePlannerWorkspace() {
  switchTab("roster");
  const planner = rosterLayout.querySelector(".auto-planner");
  if (planner?.classList.contains("collapsed")) {
    planner.classList.remove("collapsed");
    autoPlannerToggle.textContent = "Hide planner";
    autoPlannerToggle.setAttribute("aria-expanded", "true");
  }
  planner?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeAvailabilityModal() {
  const modal = document.getElementById("availabilityModal");
  if (modal) {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
  }
}

function plannerViolationText(result) {
  const labels = { staff: "unknown staff", availability: "outside staff availability", sla: "not eligible for this SLA", duplicate: "already assigned to this duty", overlap: "overlapping duties", buffer: "buffer too short", hours: "daily hours exceeded", span: "day span exceeded", break: "required break missing", weeklyHours: "weekly hours exceeded", weeklyDays: "weekly working days exceeded", monthlyHours: "monthly hours exceeded" };
  return [...new Set(result.violations.flatMap((item) => item.codes || []).map((code) => labels[code] || code))].join(", ");
}

function applyPlanToRosterBoard() {
  if (!currentAutoPlan) return;
  const people = new Map(getPlannerPeople().map((person) => [person.key, person]));
  let appliedCount = 0;
  for (const slot of currentAutoPlan.slots.filter((item) => item.personKey)) {
    const targetRow = latestRows.find((row) => OperationsUtils.rowKey(row) === OperationsUtils.rowKey(slot.row));
    const person = people.get(slot.personKey);
    if (!targetRow || !person) continue;
    targetRow.staff = targetRow.staff || [];
    if (targetRow.staff.some((label) => matchStaffMember(label, person.initials) || matchStaffMember(label, person.name))) continue;
    targetRow.staff.push(formatStaffLabel(person));
    targetRow.assigned = targetRow.staff.length;
    targetRow.missing = Math.max(0, Number(targetRow.required || 0) - targetRow.assigned);
    appliedCount += 1;
  }
  currentAutoPlan = null;
  autoPlannerResult.innerHTML = `<div class="planner-applied-message"><strong>Plan added to the edited roster</strong><span>${appliedCount} assignment${appliedCount === 1 ? "" : "s"} added locally. AVBIS was not changed.</span></div>`;
  setRosterStateMode("edited");
  setRosterViewMode("staff", false);
  renderRoster();
  setMessage(`Added ${appliedCount} planned assignment${appliedCount === 1 ? "" : "s"} to the edited roster.`, "success");
  rosterStaffView.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
          <strong style="color:var(--ink); font-size:13px; font-weight:700;">Plan ready</strong>
          <span style="display:block; font-size:11px; color:#64748b;">${assignedCount} of ${totalSlots} positions filled${unfilledSlots.length ? ` · ${unfilledSlots.length} need attention` : ""}</span>
        </div>
        <div class="auto-plan-action-buttons">
          <button type="button" class="primary-btn" id="applyAutoPlanBtn">
            <svg style="width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            Add to edited roster
          </button>
          <button type="button" class="secondary-btn" id="exportAutoPlanBtn">
            <svg style="width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export CSV
          </button>
          <button type="button" class="secondary-btn" id="clearAutoPlanBtn">Clear</button>
        </div>
      </div>

      <div class="auto-plan-slots-table">
        ${currentAutoPlan.slots.map((slot, index) => `
          <div class="auto-plan-slot-card ${slot.personKey ? "filled" : "unfilled"}">
            <div class="auto-plan-slot-info">
              <strong>${escapeHtml(slot.row.flight)} · ${escapeHtml(slot.row.sla)} <small style="color:#64748b; font-weight:500;">(Position ${slot.position})</small></strong>
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
          <strong>${unfilledSlots.length} position(s) still need attention</strong>
          <span>Add more eligible staff or adjust the planning rules.</span>
        </div>
      ` : ""}

      <div class="auto-plan-workload">
        <strong style="font-size:11px; color:#475569; text-transform:uppercase; letter-spacing:0.05em;">Planned Workload per Staff Member:</strong>
        <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:6px;">
          ${people.filter((person) => staffTotals.has(person.key)).map((person) => `<span style="padding:3px 8px; background:#f1f5f9; border:1px solid #e2e8f0; border-radius:6px; font-size:11px; font-weight:600; color:#334155;"><strong>${escapeHtml(person.name)}</strong>: +${formatHours(staffTotals.get(person.key))}h planned</span>`).join("") || "<span class=\"muted\">No assignments.</span>"}
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
initBackendSync();

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

function downloadInsightsCsv() {
  if (!latestRows.length) {
    return setMessage("No scan data available to export workload insights.", "warn");
  }
  const analytics = OperationsUtils.buildAnalytics(latestRows, latestStaffDirectory);
  const roster = getRosterRows();
  const windows = roster?.dailyWindows || [];
  const holidayDates = HolidayUtils.getHolidaysForSelectedMonths(scanStartDate.value, scanEndDate.value).map((h) => h.date);

  const headers = ["Staff Member", "Initials", "Duties Count", "Total Hours", "Weekday Hours", "Saturday Hours", "Sunday Hours", "Holiday Hours", "Covered SLAs", "Longest Span (h)"];
  const rows = analytics.workload.map((person) => {
    const totals = OperationsUtils.summarizeDutyHours(person.duties, windows, holidayDates);
    return [
      person.name || "",
      person.initials || "",
      totals.dutyCount,
      formatHours(totals.totalMinutes),
      formatHours(totals.weekdayMinutes),
      formatHours(totals.saturdayMinutes),
      formatHours(totals.sundayMinutes),
      formatHours(totals.holidayMinutes),
      (person.slas || []).join("; "),
      (person.longestSpanHours || 0).toFixed(1),
    ].map(csvCell).join(",");
  });

  const nowStr = new Date().toISOString().slice(0, 10);
  downloadBlob(`gsrm-coverage-insights-${nowStr}.csv`, [headers.join(","), ...rows].join("\n"), "text/csv;charset=utf-8");
  setMessage("Downloaded coverage insights CSV report.", "success");
}

function downloadHistoryCsv() {
  const history = getScanHistory();
  if (!history.length) {
    return setMessage("No saved scan history available to export.", "warn");
  }
  const headers = ["Scan ID", "Scanned At", "Date Range", "Flight Count", "Empty Slots Count", "Missing Positions", "Status Notes Count"];
  const rows = history.map((snap) => {
    const dateStr = snap.timestamp ? new Date(snap.timestamp).toISOString().replace("T", " ").slice(0, 16) : "";
    const rowsList = snap.rows || [];
    const gapsList = snap.gaps || rowsList.filter((r) => Number(r.missing || 0) > 0);
    const missingTotal = gapsList.reduce((sum, r) => sum + Number(r.missing || 0), 0);
    const notesCount = Object.keys(snap.actions || {}).length;
    return [
      snap.id || "",
      dateStr,
      snap.dateRange || "",
      rowsList.length,
      gapsList.length,
      missingTotal,
      notesCount,
    ].map(csvCell).join(",");
  });

  const nowStr = new Date().toISOString().slice(0, 10);
  downloadBlob(`gsrm-scan-history-${nowStr}.csv`, [headers.join(","), ...rows].join("\n"), "text/csv;charset=utf-8");
  setMessage("Downloaded scan history CSV report.", "success");
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
  const personalFit = getPersonalGapFit(row);
  const personalSummary = personalFit.identity
    ? `<div class="personal-opportunity-summary ${personalFit.state}"><span>Fit for ${escapeHtml(personalFit.identity.name)}</span><strong>${personalFit.state === "eligible" ? `Conflict-free · Match ${escapeHtml(personalFit.candidate.score)}/10` : personalFit.state === "assigned" ? "Already assigned to this duty" : "Not recommended with the current scanned duties"}</strong></div>`
    : "";
  gapPlannerDetails.innerHTML = `
    ${personalSummary}
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
    const isPersonal = personalFit.identity?.key === candidate.key;
    card.className = `planner-candidate-card${isSelected ? " selected" : ""}${isPersonal ? " personal-match" : ""}`;
    card.innerHTML = `
      <div><strong>${isPersonal ? "You · " : ""}${escapeHtml(candidate.initials)} — ${escapeHtml(candidate.name)}</strong><span>${escapeHtml(availability)}</span></div>
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
  fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, ...action }),
  }).catch((err) => console.warn("Could not sync note to backend:", err));

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
    status: "Covered",
    validation: { valid: true, checkedAt: new Date().toISOString() },
    updatedAt: new Date().toISOString(),
  };
  storeGapAction(key, updated, actions);

  const targetRow = latestRows.find((r) => OperationsUtils.rowKey(r) === key);
  if (targetRow) {
    targetRow.staff = targetRow.staff || [];
    const formatted = formatStaffLabel(candidate);
    if (!targetRow.staff.some((label) => matchStaffMember(label, candidate.key))) {
      targetRow.staff.push(formatted);
      targetRow.assigned = targetRow.staff.length;
      targetRow.missing = Math.max(0, Number(targetRow.required || 0) - targetRow.assigned);
    }
  }
  currentAutoPlan = null;

  applyFilters();
  openGapPlanner(selectedGap);
  setMessage(`Assigned ${candidate.name} to ${selectedGap.flight} (${selectedGap.sla}).`, "success");
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

function exportPdf() {
  if (!latestRows.length && activeTab !== "history") {
    return setMessage("No scan data available to export to PDF.", "warn");
  }

  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) {
    return exportPdfFallback();
  }

  try {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    const titles = {
      gaps: "GSRM Empty Slots Report",
      replacements: "GSRM Duty Replacements Report",
      roster: rosterViewMode === "airline" ? "GSRM Flight Allocation Schedule Report" : "GSRM Staff Duty Roster Report",
      insights: "GSRM Coverage & Workload Insights Report",
      history: "GSRM Scan Snapshots History Report",
    };
    const titleText = titles[activeTab] || "GSRM Operational Report";

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text(titleText, 14, 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${dateStr} ${timeStr} UTC`, 283, 12, { align: "right" });

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(14, 15, 283, 15);

    let tableHeaders = [];
    let exportRows = [];
    let columnStyles = {};

    if (activeTab === "replacements") {
      tableHeaders = [["Date", "Flight", "Dir", "Route", "SLA", "Start UTC", "Release UTC", "Duration", "Candidates", "Top Candidate Match"]];
      const initials = myInitialsInput.value.trim().toUpperCase();
      const myDuties = latestRows.filter((row) => row.staff && row.staff.some((s) => matchStaffMember(s, initials)));
      const maxGapMinutes = getMaxDutyGap().minutes;
      const maxGapMs = maxGapMinutes * 60 * 1000;

      exportRows = myDuties.map((duty) => {
        const dutyStart = parseUtcTime(duty.date, duty.start_utc);
        const dutyRelease = parseUtcTime(duty.date, duty.release_utc);
        const candidates = [];
        for (const candStr of getKnownStaffStrings()) {
          const identity = parseStaffIdentity(candStr);
          if (!identity || matchStaffMember(candStr, initials)) continue;
          const shifts = latestRows.filter((r) => r.staff && r.staff.some((s) => parseStaffIdentity(s)?.key === identity.key));
          if (shifts.some((s) => {
            const st = parseUtcTime(s.date, s.start_utc);
            const rel = parseUtcTime(s.date, s.release_utc);
            return st && rel && st < dutyRelease && rel > dutyStart;
          })) continue;

          const sameDay = shifts.filter((s) => s.date === duty.date);
          let closestGapMs = Infinity;
          for (const s of sameDay) {
            const st = parseUtcTime(s.date, s.start_utc);
            const rel = parseUtcTime(s.date, s.release_utc);
            if (st && rel) {
              if (rel <= dutyStart) closestGapMs = Math.min(closestGapMs, dutyStart - rel);
              if (st >= dutyRelease) closestGapMs = Math.min(closestGapMs, st - dutyRelease);
            }
          }
          const freeAllDay = sameDay.length === 0;
          if (!freeAllDay && (!Number.isFinite(closestGapMs) || closestGapMs > maxGapMs)) continue;
          let score = freeAllDay ? 4 : 5;
          if (shifts.some((s) => s.sla === duty.sla)) score += 3;
          candidates.push({ initials: identity.initials, name: identity.name, score, freeAllDay, connectionGapMinutes: Number.isFinite(closestGapMs) ? Math.round(closestGapMs / 60000) : null });
        }
        candidates.sort((a, b) => b.score - a.score || (a.connectionGapMinutes ?? Infinity) - (b.connectionGapMinutes ?? Infinity));
        const topMatch = candidates[0] ? `${candidates[0].name} (${candidates[0].freeAllDay ? "Free all day" : `${formatHours(candidates[0].connectionGapMinutes)}h gap`})` : "None available";
        return [
          duty.date || "",
          duty.flight || "",
          duty.direction || "",
          duty.route || "",
          duty.sla || "",
          duty.start_utc || "",
          duty.release_utc || "",
          duty.duration || "",
          candidates.length,
          topMatch
        ];
      });
      columnStyles = {
        0: { cellWidth: 26 }, 1: { cellWidth: 24, fontStyle: "bold" }, 2: { cellWidth: 16, halign: "center" },
        3: { cellWidth: 28 }, 4: { cellWidth: 22 }, 5: { cellWidth: 24, halign: "center" },
        6: { cellWidth: 24, halign: "center" }, 7: { cellWidth: 20, halign: "center" },
        8: { cellWidth: 22, halign: "center", fontStyle: "bold" }, 9: { cellWidth: 59 }
      };

    } else if (activeTab === "roster") {
      const roster = getRosterRows();
      if (rosterViewMode === "airline") {
        tableHeaders = [["Date", "Flight", "Dir", "Route", "Aircraft", "Sch. UTC", "SLA", "Start UTC", "Release UTC", "Req / Asgd", "Allocated Staff"]];
        const days = getAirlineRosterDays(roster);
        exportRows = days.flatMap((day) => day.flights.flatMap((flight) => flight.duties.map((duty) => [
          day.isoDate || "",
          duty.flight || "",
          duty.direction || "",
          duty.route || "",
          duty.aircraft || "",
          duty.scheduled_utc || "",
          duty.sla || "",
          duty.start_utc || "",
          duty.release_utc || "",
          `${duty.required || 0} / ${duty.assigned || 0}`,
          (duty.staff || []).map((s) => parseStaffIdentity(s)?.name || s).join(", ") || "Unassigned"
        ])));
        columnStyles = {
          0: { cellWidth: 24 }, 1: { cellWidth: 24, fontStyle: "bold" }, 2: { cellWidth: 14, halign: "center" },
          3: { cellWidth: 26 }, 4: { cellWidth: 20 }, 5: { cellWidth: 22, halign: "center" },
          6: { cellWidth: 20 }, 7: { cellWidth: 22, halign: "center" }, 8: { cellWidth: 22, halign: "center" },
          9: { cellWidth: 22, halign: "center", fontStyle: "bold" }, 10: { cellWidth: 53 }
        };
      } else {
        tableHeaders = [["Status", "Initials", "Staff Name", "Date", "Flight", "Direction", "Route", "SLA", "Start UTC", "Release UTC"]];
        const visible = new Set(JSON.parse(rosterBody.dataset.visibleStaffKeys || "[]"));
        const people = (roster?.rows || []).filter((person) => visible.has(person.key));
        exportRows = people.flatMap((person) => (person.overlapping.length ? person.overlapping : [null]).map((alloc) => [
          person.status === "free" ? "Free" : "On duty",
          person.initials || "",
          person.name || "",
          alloc?.date || "—",
          alloc?.flight || "—",
          alloc?.direction || "—",
          alloc?.route || "—",
          alloc?.sla || "—",
          alloc?.start_utc || "—",
          alloc?.release_utc || "—",
        ]));
        columnStyles = {
          0: { cellWidth: 20, halign: "center" }, 1: { cellWidth: 18, fontStyle: "bold" }, 2: { cellWidth: 42, fontStyle: "bold" },
          3: { cellWidth: 26 }, 4: { cellWidth: 26 }, 5: { cellWidth: 18, halign: "center" },
          6: { cellWidth: 32 }, 7: { cellWidth: 26 }, 8: { cellWidth: 30, halign: "center" }, 9: { cellWidth: 31, halign: "center" }
        };
      }

    } else if (activeTab === "insights") {
      tableHeaders = [["Staff Member", "Initials", "Duties", "Total Hours", "Weekday", "Saturday", "Sunday", "Holiday", "SLAs Covered", "Max Span"]];
      const analytics = OperationsUtils.buildAnalytics(latestRows, latestStaffDirectory);
      const roster = getRosterRows();
      const windows = roster?.dailyWindows || [];
      const holidayDates = HolidayUtils.getHolidaysForSelectedMonths(scanStartDate.value, scanEndDate.value).map((h) => h.date);

      exportRows = analytics.workload.map((person) => {
        const totals = OperationsUtils.summarizeDutyHours(person.duties, windows, holidayDates);
        return [
          person.name || "",
          person.initials || "",
          totals.dutyCount,
          `${formatHours(totals.totalMinutes)}h`,
          `${formatHours(totals.weekdayMinutes)}h`,
          `${formatHours(totals.saturdayMinutes)}h`,
          `${formatHours(totals.sundayMinutes)}h`,
          `${formatHours(totals.holidayMinutes)}h`,
          (person.slas || []).join(", ") || "—",
          `${(person.longestSpanHours || 0).toFixed(1)}h`,
        ];
      });
      columnStyles = {
        0: { cellWidth: 45, fontStyle: "bold" }, 1: { cellWidth: 18, halign: "center" }, 2: { cellWidth: 18, halign: "center" },
        3: { cellWidth: 26, halign: "center", fontStyle: "bold" }, 4: { cellWidth: 24, halign: "center" },
        5: { cellWidth: 24, halign: "center" }, 6: { cellWidth: 24, halign: "center" },
        7: { cellWidth: 24, halign: "center" }, 8: { cellWidth: 46 }, 9: { cellWidth: 20, halign: "center" }
      };

    } else if (activeTab === "history") {
      tableHeaders = [["Scan ID", "Scanned At", "Date Range", "Flight Count", "Empty Slots", "Missing Positions", "Status Notes"]];
      const history = getScanHistory();
      exportRows = history.map((snap) => {
        const dateStr = snap.timestamp ? new Date(snap.timestamp).toISOString().replace("T", " ").slice(0, 16) : "";
        const rowsList = snap.rows || [];
        const gapsList = snap.gaps || rowsList.filter((r) => Number(r.missing || 0) > 0);
        const missingTotal = gapsList.reduce((sum, r) => sum + Number(r.missing || 0), 0);
        const notesCount = Object.keys(snap.actions || {}).length;
        return [
          snap.id || "",
          dateStr,
          snap.dateRange || "",
          rowsList.length,
          gapsList.length,
          missingTotal,
          notesCount,
        ];
      });
      columnStyles = {
        0: { cellWidth: 42, fontStyle: "bold" }, 1: { cellWidth: 38, halign: "center" }, 2: { cellWidth: 42 },
        3: { cellWidth: 30, halign: "center" }, 4: { cellWidth: 32, halign: "center" },
        5: { cellWidth: 40, halign: "center", fontStyle: "bold", textColor: [220, 38, 38] }, 6: { cellWidth: 45, halign: "center" }
      };

    } else {
      // Default: Gaps / Empty Slots
      tableHeaders = [["Date", "Flight", "Dir", "Route", "SLA", "Req", "Assigned", "Missing", "Start UTC", "Release UTC", "Duration"]];
      exportRows = filteredRows.map((r) => [
        r.date || "",
        r.flight || "",
        r.direction || "",
        r.route || "",
        r.sla || "",
        r.required || 0,
        r.assigned || 0,
        r.missing || 0,
        r.start_utc || "",
        r.release_utc || "",
        r.duration || ""
      ]);
      columnStyles = {
        0: { cellWidth: 26, halign: "left" }, 1: { cellWidth: 24, halign: "left", fontStyle: "bold" },
        2: { cellWidth: 16, halign: "center" }, 3: { cellWidth: 32, halign: "left" },
        4: { cellWidth: 22, halign: "left" }, 5: { cellWidth: 16, halign: "center" },
        6: { cellWidth: 18, halign: "center" }, 7: { cellWidth: 18, halign: "center", fontStyle: "bold", textColor: [220, 38, 38] },
        8: { cellWidth: 26, halign: "center" }, 9: { cellWidth: 26, halign: "center" },
        10: { cellWidth: 25, halign: "center" }
      };
    }

    if (!exportRows.length) {
      return setMessage(`No data available on the ${activeTab} tab to export to PDF.`, "warn");
    }

    doc.autoTable({
      head: tableHeaders,
      body: exportRows,
      startY: 19,
      margin: { left: 14, right: 14, top: 19, bottom: 14 },
      theme: "grid",
      headStyles: {
        fillColor: [30, 41, 59],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 8.5,
        halign: "left"
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [30, 41, 59]
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      columnStyles,
      didDrawPage: (data) => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(`Page ${data.pageNumber} of ${pageCount}`, 283, 203, { align: "right" });
        doc.text(titleText, 14, 203);
      }
    });

    const filename = `gsrm-${activeTab}-report-${now.toISOString().slice(0, 10)}.pdf`;
    doc.save(filename);
    setMessage(`PDF report generated and downloaded: ${filename}`, "success");
  } catch (err) {
    console.error("PDF generation error:", err);
    exportPdfFallback();
  }
}

function exportPdfFallback() {
  window.print();
  setMessage("Opened print dialog for PDF export.", "info");
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
  const durationMinutes = OperationsUtils.dutyMinutes(row);
  return { key: OperationsUtils.rowKey(row), date: row.date, flight: row.flight, route: row.route, sla: row.sla, required: Number(row.required || 0), assigned: Number(row.assigned || 0), missing: Number(row.missing || 0), start_utc: row.start_utc, release_utc: row.release_utc, staff: row.staff || [], durationMinutes, missingHours: Number(((Number(row.missing || 0) * durationMinutes) / 60).toFixed(2)) };
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
    fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ snapshot }),
    }).catch((err) => console.warn("Could not sync history snapshot to backend:", err));
  } catch (error) {
    console.warn("Could not save scan history:", error);
  }
}

function clearScanHistory() {
  localStorage.removeItem(HISTORY_KEY);
  fetch("/api/history", { method: "DELETE" }).catch((err) => console.warn("Could not clear history on backend:", err));
  renderHistory();
}

function syncAvailabilityToBackend() {
  fetch("/api/availability", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rules: plannerAvailabilityRules }),
  }).catch((err) => console.warn("Could not sync availability rules to backend:", err));
}

async function initBackendSync() {
  try {
    const [notesRes, availRes, histRes] = await Promise.allSettled([
      fetch("/api/notes").then((r) => r.json()),
      fetch("/api/availability").then((r) => r.json()),
      fetch("/api/history").then((r) => r.json()),
    ]);

    if (notesRes.status === "fulfilled" && notesRes.value?.success && notesRes.value?.notes) {
      const local = getGapActions();
      const merged = { ...local, ...notesRes.value.notes };
      localStorage.setItem(ACTIONS_KEY, JSON.stringify(merged));
      if (Object.keys(local).length > 0) {
        fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notes: merged }),
        }).catch(() => {});
      }
    }

    if (availRes.status === "fulfilled" && availRes.value?.success && Array.isArray(availRes.value.rules)) {
      if (availRes.value.rules.length > 0) {
        plannerAvailabilityRules = availRes.value.rules;
        localStorage.setItem("gsrmPlannerAvailabilityV1", JSON.stringify(plannerAvailabilityRules));
        renderAvailabilityRules();
      } else if (plannerAvailabilityRules.length > 0) {
        syncAvailabilityToBackend();
      }
    }

    if (histRes.status === "fulfilled" && histRes.value?.success && Array.isArray(histRes.value.history)) {
      if (histRes.value.history.length > 0) {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(histRes.value.history));
        renderHistory();
      }
    }
  } catch (err) {
    console.warn("Backend sync initialization warning:", err);
  }
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
  originalRows = JSON.parse(JSON.stringify(snapshot.rows));
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

function deleteSnapshot(snapshot) {
  if (!snapshot || !snapshot.id) return;
  const history = getScanHistory().filter((item) => item.id !== snapshot.id);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    fetch(`/api/history?id=${encodeURIComponent(snapshot.id)}`, { method: "DELETE" })
      .catch((err) => console.warn("Could not delete history snapshot on backend:", err));
  } catch (error) {
    console.warn("Could not delete scan history item:", error);
  }
  renderHistory();
  updateExportButtonsState();
  setMessage("Scan snapshot deleted from history.", "info");
}

function renderHistory() {
  const history = getScanHistory();
  const list = document.getElementById("historyList");
  const comparisonEl = document.getElementById("historyComparison");
  if (!history.length) {
    comparisonEl.innerHTML = "";
    list.innerHTML = '<div class="empty-selection">No saved scans yet.</div>';
    resultCount.textContent = "0";
    flightCount.textContent = "0";
    dateCount.textContent = "0";
    updateExportButtonsState();
    return;
  }
  list.innerHTML = history.map((snapshot, index) => `<div class="history-card" data-snapshot-id="${escapeHtml(snapshot.id)}"><div class="history-card-summary"><strong>${escapeHtml(new Date(snapshot.createdAt).toLocaleString())}</strong><span>${escapeHtml(snapshot.startDate)} → ${escapeHtml(snapshot.endDate)}</span><small><b>${snapshot.gaps.length}</b> gaps · <b>${snapshot.flights}</b> flights · <b>${snapshotDisplayStaffCount(snapshot)}</b> staff${snapshot.cancelled ? " · interrupted" : ""}${index === 0 ? '<em>Latest</em>' : ""}</small></div><div class="history-card-actions"><button type="button" class="secondary-btn" data-action="restore">Restore</button><button type="button" class="secondary-btn" data-action="rerun">Rerun</button><button type="button" class="secondary-btn" data-action="export">Export snapshot</button><button type="button" class="secondary-btn danger-btn" data-action="delete">Delete</button></div></div>`).join("");
  for (const card of list.querySelectorAll(".history-card")) {
    const snapshot = history.find((item) => item.id === card.dataset.snapshotId);
    card.querySelector('[data-action="restore"]').addEventListener("click", () => restoreSnapshot(snapshot));
    card.querySelector('[data-action="rerun"]').addEventListener("click", () => rerunSnapshot(snapshot));
    card.querySelector('[data-action="export"]').addEventListener("click", () => exportSnapshot(snapshot));
    card.querySelector('[data-action="delete"]').addEventListener("click", () => deleteSnapshot(snapshot));
  }
  if (history.length > 1) {
    renderHistoryComparison(history);
  } else {
    comparisonEl.innerHTML = '<div class="empty-selection">Run another scan to see what changed.</div>';
  }
  resultCount.textContent = String(history.length);
  flightCount.textContent = String(history[0].flights || 0);
  dateCount.textContent = String((history[0].scannedDates || []).length);
  updateExportButtonsState();
  opsCsvBtn.disabled = !latestRows.some((row) => Number(row.missing || 0) > 0);
}

function snapshotDisplayStaffCount(snapshot) {
  const staff = new Set(snapshot.staffDirectory || []);
  for (const row of snapshot.rows || []) for (const label of row.staff || []) staff.add(label);
  return staff.size || Number(snapshot.staffCount || 0);
}

function renderHistoryComparison(history, currentId = history[0]?.id, previousId = history[1]?.id) {
  const comparisonEl = document.getElementById("historyComparison");
  const current = history.find((item) => item.id === currentId) || history[0];
  const previous = history.find((item) => item.id === previousId) || history.find((item) => item.id !== current.id) || history[0];
  const comparison = OperationsUtils.compareSnapshots(current, previous);
  const entries = buildHistoryComparisonEntries(current, previous, comparison);
  const hours = (kind) => entries.filter((entry) => entry.kind === kind).reduce((sum, entry) => sum + Math.abs(entry.missingHoursDelta), 0);
  const option = (snapshot) => `${new Date(snapshot.createdAt).toLocaleString()} · ${snapshot.startDate}–${snapshot.endDate} · ${snapshot.gaps.length} gaps`;
  const rangesOverlap = current.startDate <= previous.endDate && previous.startDate <= current.endDate;
  comparisonEl.innerHTML = `<div class="comparison-head"><div><strong>Compare saved scans</strong><span>Choose two scans to review staffing, coverage, and missing staff-hours</span></div><button id="historyComparisonToggle" class="secondary-btn" type="button" aria-expanded="true">Collapse details</button></div><div class="comparison-scan-picker"><label><span>Current scan</span><select id="historyCompareCurrent">${history.map((snapshot) => `<option value="${escapeHtml(snapshot.id)}" ${snapshot.id === current.id ? "selected" : ""}>${escapeHtml(option(snapshot))}</option>`).join("")}</select></label><span class="comparison-vs">vs</span><label><span>Baseline scan</span><select id="historyComparePrevious">${history.map((snapshot) => `<option value="${escapeHtml(snapshot.id)}" ${snapshot.id === previous.id ? "selected" : ""}>${escapeHtml(option(snapshot))}</option>`).join("")}</select></label></div>${rangesOverlap ? "" : `<div class="comparison-scope-warning"><strong>Different date ranges</strong><span>${escapeHtml(current.startDate)}–${escapeHtml(current.endDate)} does not overlap ${escapeHtml(previous.startDate)}–${escapeHtml(previous.endDate)}. New and resolved items mainly reflect the changed scan scope.</span></div>`}<div id="historyComparisonBody"><div class="comparison-cards"><button type="button" class="opened" data-comparison-kind="New"><strong>${comparison.opened.length}</strong><span>New gaps</span><small>${hours("New").toFixed(1)} staff-h</small></button><button type="button" class="resolved" data-comparison-kind="Resolved"><strong>${comparison.resolved.length}</strong><span>Resolved</span><small>${hours("Resolved").toFixed(1)} staff-h</small></button><button type="button" class="changed" data-comparison-kind="Changed"><strong>${comparison.changed.length}</strong><span>Coverage changed</span><small>${hours("Changed").toFixed(1)} staff-h delta</small></button></div>${renderComparisonDetails(entries)}</div>`;
  document.getElementById("historyCompareCurrent").addEventListener("change", (event) => renderHistoryComparison(history, event.target.value, document.getElementById("historyComparePrevious").value));
  document.getElementById("historyComparePrevious").addEventListener("change", (event) => renderHistoryComparison(history, document.getElementById("historyCompareCurrent").value, event.target.value));
  bindHistoryComparisonControls(entries);
}

function buildHistoryComparisonEntries(latest, previous, comparison) {
  const latestRows = new Map([...(latest.rows || []), ...(latest.gaps || [])].map((row) => [OperationsUtils.rowKey(row), row]));
  const previousRows = new Map([...(previous.rows || []), ...(previous.gaps || [])].map((row) => [OperationsUtils.rowKey(row), row]));
  const staffNames = (row) => [...new Set((row?.staff || []).map((label) => parseStaffIdentity(label)?.name || label).filter(Boolean))].sort();
  const makeEntry = (kind, gap) => {
    const key = gap.key || OperationsUtils.rowKey(gap);
    const current = latestRows.get(key) || (kind === "New" || kind === "Changed" ? gap : null);
    const before = previousRows.get(key) || (kind === "Resolved" ? gap : null);
    const reference = current || before || gap;
    const durationMinutes = Number(reference.durationMinutes || OperationsUtils.dutyMinutes(reference) || 0);
    const currentMissing = Number(current?.missing || 0);
    const previousMissing = Number(before?.missing || 0);
    const currentStaff = staffNames(current);
    const previousStaff = staffNames(before);
    return {
      key,
      kind,
      row: reference,
      durationMinutes,
      currentMissing,
      previousMissing,
      currentAssigned: Number(current?.assigned || 0),
      previousAssigned: Number(before?.assigned || 0),
      addedStaff: currentStaff.filter((name) => !previousStaff.includes(name)),
      removedStaff: previousStaff.filter((name) => !currentStaff.includes(name)),
      currentStaff,
      previousStaff,
      missingDelta: currentMissing - previousMissing,
      missingHoursDelta: (currentMissing - previousMissing) * durationMinutes / 60,
    };
  };
  return [
    ...comparison.opened.map((gap) => makeEntry("New", gap)),
    ...comparison.resolved.map((gap) => makeEntry("Resolved", gap)),
    ...comparison.changed.map((gap) => makeEntry("Changed", gap)),
  ];
}

function renderComparisonDetails(entries) {
  if (!entries.length) return '<div class="comparison-empty">No gap changes detected.</div>';
  const groups = [["New", "New gaps"], ["Resolved", "Resolved gaps"], ["Changed", "Coverage changes"]];
  return `<div class="comparison-controls"><input id="historyComparisonSearch" type="search" placeholder="Filter flight, SLA, route, or staff"><select id="historyComparisonType"><option value="">All changes</option><option value="New">New gaps</option><option value="Resolved">Resolved</option><option value="Changed">Coverage changed</option></select><button id="historyComparisonSelectAll" class="secondary-btn" type="button">Select visible</button><button id="historyComparisonClear" class="secondary-btn" type="button">Clear</button><button id="historyComparisonExport" class="primary-btn" type="button" disabled>Export selected <span id="historyComparisonSelectedCount">0</span></button></div><div class="comparison-groups">${groups.map(([kind, label]) => {
    const groupEntries = entries.filter((entry) => entry.kind === kind);
    if (!groupEntries.length) return "";
    return `<details class="comparison-group" data-comparison-group="${kind}" ${kind === "Changed" ? "open" : ""}><summary><span class="change-${kind.toLowerCase()}">${label}</span><b>${groupEntries.length}</b><small>${groupEntries.reduce((sum, entry) => sum + Math.abs(entry.missingHoursDelta), 0).toFixed(1)} staff-h</small></summary><div class="comparison-detail-list">${groupEntries.map((entry, index) => {
      const row = entry.row;
      const deltaLabel = `${entry.missingDelta > 0 ? "+" : ""}${entry.missingDelta} missing · ${entry.missingHoursDelta > 0 ? "+" : ""}${entry.missingHoursDelta.toFixed(1)} staff-h`;
      const staffChanges = [entry.addedStaff.length ? `Added: ${entry.addedStaff.join(", ")}` : "", entry.removedStaff.length ? `Removed: ${entry.removedStaff.join(", ")}` : ""].filter(Boolean);
      const searchText = [kind, row.date, row.flight, row.route, row.sla, ...entry.currentStaff, ...entry.previousStaff].join(" ").toLowerCase();
      return `<label class="comparison-detail-row" data-kind="${kind}" data-entry-index="${entries.indexOf(entry)}" data-search="${escapeHtml(searchText)}"><input type="checkbox"><span class="comparison-detail-main"><strong>${escapeHtml(row.date)} · ${escapeHtml(row.flight)} · ${escapeHtml(row.sla)}</strong><small>${escapeHtml(row.route || "Route unavailable")} · ${escapeHtml(row.start_utc)}–${escapeHtml(row.release_utc)} UTC · ${(entry.durationMinutes / 60).toFixed(1)}h duty</small>${staffChanges.length ? `<em>${staffChanges.map(escapeHtml).join(" · ")}</em>` : `<em>Staff list unchanged${entry.currentStaff.length ? ` · ${escapeHtml(entry.currentStaff.join(", "))}` : ""}</em>`}</span><span class="comparison-delta ${entry.missingDelta > 0 ? "worse" : entry.missingDelta < 0 ? "better" : "neutral"}"><b>${escapeHtml(deltaLabel)}</b><small>${entry.previousAssigned}→${entry.currentAssigned} assigned</small></span></label>`;
    }).join("")}</div></details>`;
  }).join("")}</div>`;
}

function bindHistoryComparisonControls(entries) {
  const body = document.getElementById("historyComparisonBody");
  const search = document.getElementById("historyComparisonSearch");
  const type = document.getElementById("historyComparisonType");
  const toggle = document.getElementById("historyComparisonToggle");
  if (!search || !type) {
    toggle?.addEventListener("click", (event) => { const collapsed = body.hidden = !body.hidden; event.currentTarget.textContent = collapsed ? "Show details" : "Collapse details"; event.currentTarget.setAttribute("aria-expanded", String(!collapsed)); });
    return;
  }
  const rows = [...document.querySelectorAll(".comparison-detail-row")];
  search.value = "";
  type.value = "";
  const updateSelection = () => {
    const selected = rows.filter((row) => row.querySelector('input[type="checkbox"]').checked);
    document.getElementById("historyComparisonSelectedCount").textContent = String(selected.length);
    document.getElementById("historyComparisonExport").disabled = !selected.length;
  };
  const applyComparisonFilter = () => {
    const query = search.value.trim().toLowerCase();
    for (const row of rows) row.hidden = Boolean((type.value && row.dataset.kind !== type.value) || (query && !row.dataset.search.includes(query)));
    for (const group of document.querySelectorAll(".comparison-group")) group.hidden = ![...group.querySelectorAll(".comparison-detail-row")].some((row) => !row.hidden);
  };
  search.addEventListener("input", applyComparisonFilter);
  type.addEventListener("change", applyComparisonFilter);
  for (const row of rows) row.querySelector('input[type="checkbox"]').addEventListener("change", updateSelection);
  document.getElementById("historyComparisonSelectAll").addEventListener("click", () => { for (const row of rows.filter((item) => !item.hidden)) row.querySelector('input[type="checkbox"]').checked = true; updateSelection(); });
  document.getElementById("historyComparisonClear").addEventListener("click", () => { for (const row of rows) row.querySelector('input[type="checkbox"]').checked = false; updateSelection(); });
  toggle.addEventListener("click", (event) => { const collapsed = body.hidden = !body.hidden; event.currentTarget.textContent = collapsed ? "Show details" : "Collapse details"; event.currentTarget.setAttribute("aria-expanded", String(!collapsed)); });
  for (const card of document.querySelectorAll("[data-comparison-kind]")) card.addEventListener("click", () => { type.value = card.dataset.comparisonKind; body.hidden = false; document.getElementById("historyComparisonToggle").textContent = "Collapse details"; applyComparisonFilter(); document.querySelector(`[data-comparison-group="${card.dataset.comparisonKind}"]`)?.setAttribute("open", ""); });
  document.getElementById("historyComparisonExport").addEventListener("click", () => {
    const selectedRows = rows.filter((row) => row.querySelector('input[type="checkbox"]').checked);
    const selectedEntries = selectedRows.map((row) => entries[Number(row.dataset.entryIndex)]).filter(Boolean);
    const headers = ["Change", "Date", "Flight", "Route", "SLA", "Start UTC", "Release UTC", "Duty Hours", "Previous Assigned", "Current Assigned", "Previous Missing", "Current Missing", "Missing Staff-Hour Delta", "Staff Added", "Staff Removed"];
    const lines = [headers.map(csvCell).join(","), ...selectedEntries.map((entry) => [entry.kind, entry.row.date, entry.row.flight, entry.row.route, entry.row.sla, entry.row.start_utc, entry.row.release_utc, (entry.durationMinutes / 60).toFixed(2), entry.previousAssigned, entry.currentAssigned, entry.previousMissing, entry.currentMissing, entry.missingHoursDelta.toFixed(2), entry.addedStaff.join(" | "), entry.removedStaff.join(" | ")].map(csvCell).join(","))];
    downloadBlob(`gsrm-scan-comparison-${getLocalIsoDate()}.csv`, lines.join("\n"), "text/csv;charset=utf-8");
  });
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
  const target = String(staffStr).trim().toUpperCase();
  const query = String(searchInput).trim().toUpperCase();

  if (!query) return false;
  if (target === query || target.includes(query)) return true;

  const parsed = parseStaffIdentity(staffStr);
  if (parsed) {
    if (parsed.key && parsed.key.toUpperCase() === query) return true;
    if (parsed.initials && parsed.initials.toUpperCase() === query) return true;
    if (parsed.name && parsed.name.toUpperCase().includes(query)) return true;
  }
  return false;
}
