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
const replacementStaffSelect = document.getElementById("replacementStaffSelect");
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
const autoAdjustRun = document.getElementById("autoAdjustRun");
let currentAutoAdjustPlan = null;
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
const rosterSlaChipsContainer = document.getElementById("rosterSlaChipsContainer");

let latestRows = [];
let originalRows = [];
let rosterStateMode = "edited";
let latestScannedDates = [];
let latestStaffDirectory = [];
let filteredRows = [];
let selectedResultsSlas = [];
let selectedRosterSlas = [];
let currentSortCol = "date";
let currentSortDir = "asc";
let progressTimer = null;
let activeTab = "gaps";
let selectedReplacementDuty = null;
let selectedGap = null;
let activeScanId = "";
let connectedEmail = "";
let showRosterDutyTotals = localStorage.getItem("gsrmRosterDutyTotals") === "true";
let currentSingleDayScale = parseInt(localStorage.getItem("gsrm_roster_timeline_scale") || "3600", 10);
let rosterViewMode = localStorage.getItem("gsrmRosterViewMode") === "airline" ? "airline" : "staff";
let currentAutoPlan = null;
let selectedPlannerStaff = new Set();
let plannerAvailabilityRules = [];
let plannerStaffContracts = {};
try { plannerStaffContracts = JSON.parse(localStorage.getItem("gsrmPlannerStaffContractsV1") || "{}"); } catch { plannerStaffContracts = {}; }

function savePlannerStaffContracts() {
  localStorage.setItem("gsrmPlannerStaffContractsV1", JSON.stringify(plannerStaffContracts));
}
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
  replaceAllShiftsBtn.addEventListener("click", () => executeBulkReplacement());
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

document.getElementById("pdfExportModalClose")?.addEventListener("click", closePdfExportModal);
document.getElementById("pdfDownloadOriginal")?.addEventListener("click", () => generatePdfDocument({ mode: "original" }));
document.getElementById("pdfDownloadEdited")?.addEventListener("click", () => generatePdfDocument({ mode: "edited" }));
document.getElementById("pdfLayoutTableBtn")?.addEventListener("click", () => setPdfExportLayoutStyle("table"));
document.getElementById("pdfLayoutByDayBtn")?.addEventListener("click", () => setPdfExportLayoutStyle("byday"));
document.getElementById("pdfCustomizerToggleBtn")?.addEventListener("click", () => {
  const panel = document.getElementById("pdfCustomizerPanel");
  const btn = document.getElementById("pdfCustomizerToggleBtn");
  const badgeText = panel?.querySelector(".collapse-text");
  if (panel) {
    const isCollapsed = panel.classList.toggle("collapsed");
    btn?.setAttribute("aria-expanded", String(!isCollapsed));
    if (badgeText) badgeText.textContent = isCollapsed ? "Show Settings" : "Hide Settings";
  }
});

const pdfExportModalOverlay = document.getElementById("pdfExportModal");
if (pdfExportModalOverlay) {
  pdfExportModalOverlay.addEventListener("click", (e) => {
    if (e.target === pdfExportModalOverlay) closePdfExportModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (availModalOverlay && !availModalOverlay.hidden) closeAvailabilityModal();
    if (pdfExportModalOverlay && !pdfExportModalOverlay.hidden) closePdfExportModal();
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

function setReplacementStaff(staffValue, triggerSource = null) {
  const value = (staffValue || "").trim();
  if (myInitialsInput && triggerSource !== "myInitialsInput") myInitialsInput.value = value;
  if (gapStaffSearch && triggerSource !== "gapStaffSearch") gapStaffSearch.value = value;

  localStorage.setItem("myInitials", value);

  if (replacementStaffSelect) {
    const identity = resolveStaffIdentity(value);
    const targetName = identity?.name || value;
    const matchOpt = [...replacementStaffSelect.options].find(opt =>
      opt.value.toLowerCase() === targetName.toLowerCase() ||
      (identity && (opt.value.toUpperCase() === identity.initials.toUpperCase() || opt.value === identity.key))
    );
    if (matchOpt) replacementStaffSelect.value = matchOpt.value;
    else if (!value) replacementStaffSelect.value = "";
  }

  if (activeTab === "replacements") {
    renderReplacements(false);
  } else {
    applyFilters();
  }
}

myInitialsInput.addEventListener("input", (e) => {
  setReplacementStaff(e.target.value, "myInitialsInput");
});
if (replacementStaffSelect) {
  replacementStaffSelect.addEventListener("change", (e) => {
    setReplacementStaff(e.target.value, "replacementStaffSelect");
  });
}
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
[rosterDate, rosterEndDate, rosterStartTime, rosterEndTime, rosterStatus].forEach((control) => control.addEventListener("input", applyFilters));
rosterSla.addEventListener("change", () => {
  if (rosterSla.value) {
    selectedRosterSlas = [rosterSla.value];
  } else {
    selectedRosterSlas = [];
  }
  const slas = [...new Set(latestRows.map((row) => row.sla).filter(Boolean))].sort();
  renderRosterSlaChips(slas);
  applyFilters();
});
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

const rosterTimelineScale = document.getElementById("rosterTimelineScale");
const rosterScaleValue = document.getElementById("rosterScaleValue");
if (rosterTimelineScale) {
  rosterTimelineScale.value = currentSingleDayScale;
  if (rosterScaleValue) rosterScaleValue.textContent = `${currentSingleDayScale}px`;

  rosterTimelineScale.addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10);
    currentSingleDayScale = val;
    if (rosterScaleValue) rosterScaleValue.textContent = `${val}px`;
    localStorage.setItem("gsrm_roster_timeline_scale", String(val));
    const rosterTable = document.querySelector(".roster-table");
    if (rosterTable && rosterTable.classList.contains("single-day")) {
      const reqWidth = getSingleDayRequiredWidth();
      rosterTable.style.minWidth = `${reqWidth}px`;
      rosterTable.style.setProperty("--single-day-width", `${reqWidth}px`);
      if (lastRosterData) renderRosterHeader(lastRosterData.dailyWindows || []);
    }
  });
}
rosterStaffViewBtn.addEventListener("click", () => setRosterViewMode("staff"));
rosterAirlineViewBtn.addEventListener("click", () => setRosterViewMode("airline"));
document.getElementById("rosterExpandAll").addEventListener("click", () => setAllAirlineSections(true));
document.getElementById("rosterCollapseAll").addEventListener("click", () => setAllAirlineSections(false));
if (flightScheduleAirlineFilter) flightScheduleAirlineFilter.addEventListener("change", renderRoster);
if (flightScheduleCoverageFilter) flightScheduleCoverageFilter.addEventListener("change", renderRoster);
if (flightScheduleDirectionFilter) flightScheduleDirectionFilter.addEventListener("change", renderRoster);
if (flightScheduleSearch) flightScheduleSearch.addEventListener("input", renderRoster);
autoPlannerRun.addEventListener("click", buildAutomaticPlan);
if (autoAdjustRun) autoAdjustRun.addEventListener("click", buildAutoAdjustPlan);
autoPlannerToggle.addEventListener("click", () => {
  const autoPlanner = autoPlannerToggle.closest(".auto-planner");
  const collapsed = autoPlanner.classList.toggle("collapsed");
  autoPlannerToggle.textContent = collapsed ? "Show planner" : "Hide planner";
  autoPlannerToggle.setAttribute("aria-expanded", String(!collapsed));
  if (!collapsed) {
    autoPlanner.querySelectorAll(".step-card").forEach((card) => {
      card.classList.remove("collapsed");
    });
    autoPlanner.querySelectorAll(".step-toggle-btn").forEach((btn) => {
      btn.textContent = "Collapse";
      btn.setAttribute("aria-expanded", "true");
    });
  }
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

let showOverlapHighlightsActive = false;

function shouldShowOverlapVisuals() {
  if (showOverlapHighlightsActive) return true;
  if (typeof rosterStatus !== "undefined" && rosterStatus && (rosterStatus.value === "overlap" || rosterStatus.value === "overlaps")) return true;
  const flightScheduleCoverageFilter = document.getElementById("flightScheduleCoverageFilter");
  if (flightScheduleCoverageFilter && flightScheduleCoverageFilter.value === "overlaps") return true;
  return false;
}

function updateOverlapHighlightToggleState() {
  const toggleBtn = document.getElementById("rosterHighlightOverlapsBtn");
  const isVisualsActive = shouldShowOverlapVisuals();
  if (toggleBtn) {
    toggleBtn.classList.toggle("active", isVisualsActive);
    toggleBtn.setAttribute("aria-pressed", String(isVisualsActive));
  }
}

const rosterHighlightOverlapsBtn = document.getElementById("rosterHighlightOverlapsBtn");
if (rosterHighlightOverlapsBtn) {
  rosterHighlightOverlapsBtn.addEventListener("click", () => {
    showOverlapHighlightsActive = !showOverlapHighlightsActive;
    updateOverlapHighlightToggleState();
    if (rosterViewMode === "airline") {
      renderRosterAirlineBoard();
    } else {
      renderRoster();
    }
  });
}

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
    } else if (preset === "overlap") {
      btn.classList.toggle("active", currentStatus === "overlap" || currentStatus === "overlaps");
    }
  });
  updateOverlapHighlightToggleState();
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
      showOverlapHighlightsActive = false;
    } else if (preset === "duty") {
      rosterStatus.value = "duty";
      showOverlapHighlightsActive = false;
    } else if (preset === "free") {
      rosterStatus.value = "free";
      showOverlapHighlightsActive = false;
    } else if (preset === "overlap") {
      rosterStatus.value = "overlap";
      showOverlapHighlightsActive = true;
    }
    updateOverlapHighlightToggleState();
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
setRosterFiltersCollapsed(localStorage.getItem("gsrmRosterFiltersCollapsed") !== "false");
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
  if (activeTab === tab) return;
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
  insightsLayout.style.display = tab === "insights" ? "flex" : "none";
  historyLayout.style.display = tab === "history" ? "flex" : "none";
  tableFilterBar.style.display = ["gaps", "replacements"].includes(tab) ? "grid" : "none";
  replacementDateFilterGroup.hidden = tab !== "replacements";
  resultsMissingFilterGroup.hidden = tab === "replacements";
  resultsFullscreenBtn.hidden = tab !== "gaps";
  const staffPicker = gapStaffSearch.closest(".personal-shift-picker");
  if (staffPicker) {
    staffPicker.hidden = !["gaps", "replacements"].includes(tab);
    const pickerLabel = staffPicker.querySelector("span");
    if (pickerLabel) {
      pickerLabel.textContent = tab === "replacements" ? "Replacing" : "Planning for";
    }
  }
  gapSuitableOnlyToggle.closest(".suitable-only-toggle").hidden = tab !== "gaps";
  resultsFilterTitle.textContent = tab === "replacements" ? "Duty filters" : "Shift opportunity filters";
  resultsFilterHint.textContent = tab === "replacements"
    ? "Narrow duties by date, flight, SLA, direction, or time."
    : "Find uncovered shifts that fit your schedule.";
  resultsSearch.placeholder = tab === "replacements"
    ? "Search duties by flight, route, date, or SLA"
    : "Search flight, route, date, SLA, or aircraft";
  updateResultTimeFilterLabels();
  if (["gaps", "replacements"].includes(tab)) {
    setResultFiltersCollapsed(tableFilterBar.classList.contains("filters-collapsed"));
  } else if (tab === "roster") {
    setRosterFiltersCollapsed(rosterLayout.classList.contains("filters-collapsed"));
  }
  resultCountLabel.textContent = tab === "gaps" ? "empty slot groups" : tab === "replacements" ? "scheduled duties" : tab === "roster" ? (rosterViewMode === "airline" ? "flights shown" : "staff shown") : tab === "insights" ? "warnings" : "saved scans";
  updateContextToolbar(tab);
  if (tab === "roster" && !rosterDate.value) rosterDate.value = document.getElementById("startDate").value;
  if (tab === "roster" && !rosterEndDate.value) rosterEndDate.value = rosterDate.value;
  requestAnimationFrame(() => applyFilters());
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
  const fields = document.getElementById("rosterFields");
  if (fields) {
    if (enabled) {
      fields.setAttribute("hidden", "");
    } else {
      fields.removeAttribute("hidden");
    }
  }
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
  setReplacementStaff(gapStaffSearch.value, "gapStaffSearch");
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

const resultsOverlapFilterToggle = document.getElementById("resultsOverlapFilterToggle");
if (resultsOverlapFilterToggle) {
  resultsOverlapFilterToggle.addEventListener("change", applyFilters);
}

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
  if (resultsOverlapFilterToggle) resultsOverlapFilterToggle.checked = false;
  if (activeTab === "replacements") resultsDateFilter.value = "";
  else resultsMissingFilter.value = "";
  updateResultTimeFilterLabels();
  updateResultsSlaFilter();
  applyFilters();
}

function setResultFiltersCollapsed(collapsed) {
  const enabled = Boolean(collapsed);
  tableFilterBar.classList.toggle("filters-collapsed", enabled);
  const fields = document.getElementById("resultsFilterFields");
  if (fields) {
    if (enabled) {
      fields.setAttribute("hidden", "");
    } else {
      fields.removeAttribute("hidden");
    }
  }
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
setResultFiltersCollapsed(localStorage.getItem("gsrmResultFiltersCollapsed") !== "false");
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
    showToast(`AVBIS Connection Failed: ${error.message || String(error)}`, { kind: "error", duration: 7000 });
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

async function runScan(forceRefresh = false, options = {}) {
  const isAutoScan = Boolean(options.isAutoScan);
  if (!isAutoScan && !form.reportValidity()) return;
  const payload = readForm();

  if (options.dateRangeOverride?.startDate && options.dateRangeOverride?.endDate) {
    payload.startDate = options.dateRangeOverride.startDate;
    payload.endDate = options.dateRangeOverride.endDate;
  }

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
  setMessage(isAutoScan ? "Running background auto-scan..." : (forceRefresh ? "Refreshing the selected dates from AVBIS..." : "Loading cached dates and scanning only missing data..."));
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
    const completionLead = result.cancelled ? "Scan cancelled." : (isAutoScan ? "Auto-scan completed." : "Done.");
    const preserved = result.cancelled ? ` Preserved ${latestScannedDates.length} completed date(s); rerun to continue from cache.` : "";
    setMessage(`${completionLead}${preserved}${cacheSuffix} Found ${latestStaffDirectory.length} known staff member(s), ${assignedStaffCount} allocated staff member(s), and ${latestRows.length} duty group(s).${errorSuffix}${incompleteSuffix}`, result.cancelled || result.errors?.length ? "warn" : "");
    if (result.errors?.length) {
      showToast(`${result.errors.length} endpoint request(s) failed during scan. Check log details.`, { kind: "warn", duration: 6000 });
    }
    const finalProgress = await pollProgress(payload.scanId);
    renderFinishedProgress(result, finalProgress);
    if (!isAutoScan) setSetupCollapsed(true, payload);
    console.log("Empty SOD slot JSON:", result);
    return result;
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
    if (!isAutoScan) setSetupCollapsed(false);
    setMessage(error.message || String(error), "error");
    showToast(`Scan Failed: ${error.message || String(error)}`, { kind: "error", duration: 7000 });
    sendDesktopNotification("GSRM Scan Failed", error.message || String(error));
    throw error;
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
    if (currentSortCol === "date") {
      const dateA = parseDateSortable(a.date);
      const dateB = parseDateSortable(b.date);
      if (dateA !== dateB) return currentSortDir === "asc" ? (dateA - dateB) : (dateB - dateA);

      // Secondary: Group identical flights on the same date together
      const flightA = String(a.flight || "").trim().toUpperCase();
      const flightB = String(b.flight || "").trim().toUpperCase();
      if (flightA !== flightB) return flightA.localeCompare(flightB, undefined, { numeric: true });

      return String(a.start_utc || "").localeCompare(String(b.start_utc || ""));
    }

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

    // Tie-breaker: Flight and start time
    const flightA = String(a.flight || "").trim().toUpperCase();
    const flightB = String(b.flight || "").trim().toUpperCase();
    if (flightA !== flightB) return flightA.localeCompare(flightB, undefined, { numeric: true });
    return String(a.start_utc || "").localeCompare(String(b.start_utc || ""));
  });

  let lastDateStr = null;
  let lastFlightNum = null;
  for (const row of sortedRows) {
    const tr = document.createElement("tr");
    const curDateStr = String(row.date || "").trim();
    const curFlightNum = String(row.flight || "").trim();

    if (lastDateStr !== null && curDateStr !== lastDateStr) {
      tr.classList.add("date-group-first");
    } else if (lastFlightNum !== null && curFlightNum && curFlightNum === lastFlightNum) {
      tr.classList.add("flight-group-member");
    } else if (lastFlightNum !== null && curFlightNum && curFlightNum !== lastFlightNum) {
      tr.classList.add("flight-group-first");
    }

    lastDateStr = curDateStr;
    lastFlightNum = curFlightNum;

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

    tr.dataset.rowKey = OperationsUtils.rowKey(row);
    tr.innerHTML = `
      <td class="col-date">${escapeHtml(row.date)}</td>
      <td class="col-flight">
        ${OperationsUtils.getAirlineLogoImg(row.flight, { size: 18, style: "margin-right:4px;" })}<strong>${escapeHtml(row.flight)}</strong>
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
    resultsBody.appendChild(tr);
  }

  initResultsTableDelegation();
}

let isResultsTableDelegated = false;
function initResultsTableDelegation() {
  if (isResultsTableDelegated) return;
  isResultsTableDelegated = true;

  if (resultsBody) {
    resultsBody.addEventListener("click", (e) => {
      const btn = e.target.closest(".plan-gap-btn");
      if (!btn) return;
      const tr = btn.closest("tr");
      if (!tr || !tr.dataset.rowKey) return;
      const row = latestRows.find((r) => OperationsUtils.rowKey(r) === tr.dataset.rowKey);
      if (row) openGapPlanner(row);
    });
  }

  const gapsTable = document.getElementById("gapsTable");
  if (gapsTable) {
    gapsTable.addEventListener("click", (e) => {
      const th = e.target.closest("th.sortable-th");
      if (!th) return;
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
    });
  }
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

let undoActionStack = [];

function showToast(messageText, options = {}) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const opts = typeof options === "string" ? { kind: options } : (options || {});
  const kind = opts.kind || "info";
  const duration = typeof opts.duration === "number" ? opts.duration : 4500;
  const actionText = opts.actionText || null;
  const onAction = opts.onAction || null;

  const card = document.createElement("div");
  card.className = `toast-card toast-${kind}`;

  const iconSvg = {
    success: '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
    warn: '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>',
    error: '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>',
    info: '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>',
  }[kind] || '<svg viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8"/></svg>';

  card.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <div class="toast-content">
      <span class="toast-message">${escapeHtml(messageText)}</span>
    </div>
    <div class="toast-actions-row">
      ${actionText ? `<button type="button" class="toast-action-btn">${escapeHtml(actionText)}</button>` : ""}
      <button type="button" class="toast-close-btn" aria-label="Dismiss">&times;</button>
    </div>
    <div class="toast-progress-bar" style="animation-duration: ${duration}ms;"></div>
  `;

  let timeoutId = null;

  const removeToast = () => {
    if (card.classList.contains("hiding")) return;
    card.classList.add("hiding");
    clearTimeout(timeoutId);
    card.addEventListener("animationend", () => {
      if (card.parentNode) card.parentNode.removeChild(card);
    }, { once: true });
  };

  card.querySelector(".toast-close-btn")?.addEventListener("click", removeToast);

  if (actionText && onAction) {
    card.querySelector(".toast-action-btn")?.addEventListener("click", () => {
      removeToast();
      try {
        onAction();
      } catch (err) {
        console.error("Toast action failed:", err);
      }
    });
  }

  if (duration > 0) {
    timeoutId = setTimeout(removeToast, duration);
  }

  container.appendChild(card);
}

function pushUndoAction(label, undoFn) {
  undoActionStack.push({ label, undoFn, timestamp: Date.now() });
  if (undoActionStack.length > 20) undoActionStack.shift();

  showToast(label, {
    kind: "success",
    duration: 6000,
    actionText: "Undo",
    onAction: () => {
      const popped = undoActionStack.pop();
      if (popped && typeof popped.undoFn === "function") {
        popped.undoFn();
        showToast(`Undid: ${popped.label}`, { kind: "info", duration: 3500 });
      }
    }
  });
}

function setMessage(text, kind = "") {
  message.textContent = text;
  message.className = `message ${kind}`.trim();
  if (kind === "error" || kind === "warn") {
    showToast(text, { kind: kind === "error" ? "error" : "warn", duration: 5000 });
  }
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

function getRosterSourceRows(forcedMode) {
  const mode = forcedMode || rosterStateMode;
  return mode === "original" && originalRows && originalRows.length ? originalRows : latestRows;
}

function getOriginalDuty(row) {
  if (!originalRows || !originalRows.length) return null;
  const key = OperationsUtils.rowKey(row);
  const exact = originalRows.find((item) => OperationsUtils.rowKey(item) === key);
  if (exact) return exact;
  const baseKey = [row.date, row.flight_id || row.flight, row.sla].map((v) => String(v || "").trim()).join("|");
  return originalRows.find((item) => {
    const itemBaseKey = [item.date, item.flight_id || item.flight, item.sla].map((v) => String(v || "").trim()).join("|");
    return itemBaseKey === baseKey;
  }) || null;
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
  if (!original) return { changed: false, added: [], removed: [], timingChanged: false };
  const before = staffByKey(original);
  const after = staffByKey(latestRows.find((item) => OperationsUtils.rowKey(item) === OperationsUtils.rowKey(row)) || row);
  const added = [...after.entries()].filter(([key]) => !before.has(key)).map(([, person]) => person);
  const removed = [...before.entries()].filter(([key]) => !after.has(key)).map(([, person]) => person);
  const timingChanged = original.start_utc !== row.start_utc || original.release_utc !== row.release_utc;
  return { changed: added.length > 0 || removed.length > 0 || timingChanged, added, removed, timingChanged };
}

function formatRosterChange(change) {
  const removed = (change.removed || []).map((person) => person.name).join(", ");
  const added = (change.added || []).map((person) => person.name).join(", ");
  if (removed && added) return `${removed} → ${added}`;
  if (added) return `Added ${added}`;
  if (removed) return `Removed ${removed}`;
  if (change.timingChanged) return `Timing modified`;
  return "";
}

function getRosterCellBadge(change, person) {
  if (!change || !change.changed) return "";
  const personKey = person?.key || "";
  const personName = person?.name || "";
  const wasAdded = change.added && change.added.some((p) => (p.key && p.key === personKey) || (p.name && p.name === personName));
  const wasRemoved = change.removed && change.removed.some((p) => (p.key && p.key === personKey) || (p.name && p.name === personName));

  const iconSwap = `<svg class="badge-icon" width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M4.5 11.5L1 8l3.5-3.5v2.5H11V8.5H4.5v3zM11.5 4.5L15 8l-3.5 3.5V9H5V7.5h6.5V4.5z"/></svg>`;
  const iconAdd = `<svg class="badge-icon" width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2z"/></svg>`;
  const iconRemove = `<svg class="badge-icon" width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8z"/></svg>`;
  const iconEdit = `<svg class="badge-icon" width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474L5.126 14.434a1.75 1.75 0 0 1-.726.434l-3.1.9a.75.75 0 0 1-.924-.924l.9-3.1a1.75 1.75 0 0 1 .434-.726L11.013 1.427zM12.427 2.487a.25.25 0 0 0-.354 0L11 3.56 12.44 5l1.073-1.073a.25.25 0 0 0 0-.354L12.427 2.487z"/></svg>`;

  if (wasAdded && change.removed.length > 0) {
    const replacedNames = change.removed.map((p) => p.name).join(", ");
    return `<b class="cell-change-badge badge-replaced" title="Replaced ${escapeHtml(replacedNames)}">${iconSwap}Swapped</b>`;
  }
  if (wasAdded) {
    return `<b class="cell-change-badge badge-added" title="Newly assigned shift">${iconAdd}Added</b>`;
  }
  if (wasRemoved) {
    return `<b class="cell-change-badge badge-removed" title="Removed shift">${iconRemove}Removed</b>`;
  }
  return `<b class="cell-change-badge badge-modified" title="${escapeHtml(formatRosterChange(change))}">${iconEdit}Modified</b>`;
}

function formatStaffLabel(person) {
  if (!person) return "";
  if (typeof person === "string") return person;
  const name = person.name || person.key || "";
  const station = (person.station || person.initials) && (person.station || person.initials) !== name && (person.station || person.initials) !== person.key
    ? (person.station || person.initials)
    : "MUC";
  if (station && station !== name) {
    return `${station} - ${name}`;
  }
  return name;
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

    const resultsOverlapToggle = document.getElementById("resultsOverlapFilterToggle");
    if (resultsOverlapToggle && resultsOverlapToggle.checked) {
      const staffList = row.staff || [];
      if (!staffList.length) return false;
      const hasStaffOverlap = staffList.some((staffName) => {
        const staffDuties = sourceRows.filter((r) => (r.staff || []).includes(staffName));
        return typeof OperationsUtils !== "undefined" && OperationsUtils.hasOverlappingShifts
          ? OperationsUtils.hasOverlappingShifts(staffDuties)
          : false;
      });
      if (!hasStaffOverlap) return false;
    }

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
    if (selectedRosterSlas.includes(sla)) option.selected = true;
    rosterSla.appendChild(option);
  }
  rosterSla.value = slas.includes(currentSla) ? currentSla : (selectedRosterSlas.length === 1 ? selectedRosterSlas[0] : "");
  renderRosterSlaChips(slas);
}

function renderRosterSlaChips(availableSlas) {
  if (!rosterSlaChipsContainer) return;
  const slas = availableSlas && availableSlas.length > 0 ? availableSlas : ["CKIN", "GATE", "LOFO", "QH-CKI", "QH-GATE", "ASVC", "SECS"];

  let html = `<button type="button" class="sla-chip ${selectedRosterSlas.length === 0 ? "active" : ""}" data-sla="all">All SLAs</button>`;
  for (const sla of slas) {
    const isActive = selectedRosterSlas.includes(sla);
    html += `<button type="button" class="sla-chip ${isActive ? "active" : ""}" data-sla="${escapeHtml(sla)}">${escapeHtml(sla)}</button>`;
  }
  rosterSlaChipsContainer.innerHTML = html;

  rosterSlaChipsContainer.querySelectorAll(".sla-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sla = btn.dataset.sla;
      if (sla === "all") {
        selectedRosterSlas = [];
        rosterSla.value = "";
      } else {
        if (selectedRosterSlas.includes(sla)) {
          selectedRosterSlas = selectedRosterSlas.filter((s) => s !== sla);
        } else {
          selectedRosterSlas.push(sla);
        }
        if (selectedRosterSlas.length === 1) {
          rosterSla.value = selectedRosterSlas[0];
        } else {
          rosterSla.value = "";
        }
      }
      renderRosterSlaChips(availableSlas);
      applyFilters();
    });
  });
}

function resetRosterFilters() {
  const scannedDates = [...latestScannedDates].sort();
  rosterDate.value = scannedDates[0] || "";
  rosterEndDate.value = scannedDates[scannedDates.length - 1] || "";
  rosterStartTime.value = "00:00";
  rosterEndTime.value = "23:59";
  rosterStaffSearch.value = "";
  rosterStatus.value = "";
  selectedRosterSlas = [];
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

  const slas = [...new Set(latestRows.map((row) => row.sla).filter(Boolean))].sort();
  renderRosterSlaChips(slas);
  syncRosterPresetChips();
  applyFilters();
}

function populateBulkReplacementOptions(targetIdentity) {
  const select = document.getElementById("bulkReplacementCandidateSelect");
  const dateSelect = document.getElementById("bulkReplacementDateSelect");

  if (select) {
    const currentVal = select.value;
    select.innerHTML = `
      <option value="">Select replacement candidate...</option>
      <option value="auto">Auto-assign best match for each shift</option>
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

  if (dateSelect) {
    const currentVal = dateSelect.value || "all";
    const scannedDates = [...latestScannedDates].sort();
    let html = `<option value="all">All scanned dates (${scannedDates.length} days)</option>`;
    for (const isoDate of scannedDates) {
      html += `<option value="${isoDate}">Only ${isoDate}</option>`;
    }
    dateSelect.innerHTML = html;
    if (currentVal && [...dateSelect.options].some((o) => o.value === currentVal)) {
      dateSelect.value = currentVal;
    }
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

  const initials = (myInitialsInput.value || localStorage.getItem("myInitials") || "").trim().toUpperCase();
  if (!initials) {
    if (replacementStaffName) replacementStaffName.textContent = "Select a staff member";
    if (replacementStaffSelect) replacementStaffSelect.value = "";
    replacementStaffSummary.textContent = "Select a staff member above to load their duties.";
    dutiesList.innerHTML = `<div class="empty-list">Please select a staff member to see their duties.</div>`;
    if (bulkBar) bulkBar.hidden = true;
    return;
  }

  const selectedIdentity = resolveStaffIdentity(initials);
  if (replacementStaffName) replacementStaffName.textContent = selectedIdentity?.name || myInitialsInput.value.trim();

  if (replacementStaffSelect) {
    const targetName = selectedIdentity?.name || initials;
    const matchOpt = [...replacementStaffSelect.options].find(opt =>
      opt.value.toLowerCase() === targetName.toLowerCase() ||
      (selectedIdentity && (opt.value.toUpperCase() === selectedIdentity.initials.toUpperCase() || opt.value === selectedIdentity.key))
    );
    if (matchOpt) replacementStaffSelect.value = matchOpt.value;
  }

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

function getRosterRows(forcedMode) {
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

  const sourceRows = getRosterSourceRows(forcedMode);
  const staff = new Map();

  // Seed with ALL staff from the persistent Master Staff Directory (scanned across all dates)
  const masterList = getMasterStaffDirectory();
  for (const mStaff of masterList) {
    if (mStaff && mStaff.key && !staff.has(mStaff.key)) {
      staff.set(mStaff.key, {
        key: mStaff.key,
        name: mStaff.name,
        initials: mStaff.initials || mStaff.station || "MUC",
        station: mStaff.station || mStaff.initials || "MUC",
        assignments: [],
      });
    }
  }

  // Also include staff from active scan directory
  for (const staffString of latestStaffDirectory) {
    const identity = parseStaffIdentity(staffString);
    if (identity && !staff.has(identity.key)) staff.set(identity.key, { ...identity, assignments: [] });
  }

  for (const assignment of sourceRows) {
    for (const staffString of assignment.staff || []) {
      const identity = parseStaffIdentity(staffString);
      if (!identity) continue;
      if (!staff.has(identity.key)) {
        const known = (typeof getPlannerPeople === "function" ? getPlannerPeople() : []).find((p) => isSameStaff(p, identity.key)) || identity;
        staff.set(identity.key, { ...known, assignments: [] });
      }
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

  rows.sort((a, b) => {
    const aDuty = a.status === "duty" || (a.overlapping && a.overlapping.length > 0) ? 1 : 0;
    const bDuty = b.status === "duty" || (b.overlapping && b.overlapping.length > 0) ? 1 : 0;
    if (aDuty !== bDuty) return bDuty - aDuty;
    return a.name.localeCompare(b.name) || a.initials.localeCompare(b.initials);
  });
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
    sla: selectedRosterSlas.length > 0 ? selectedRosterSlas : rosterSla.value,
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
  const isSingleDay = roster.dailyWindows.length === 1;
  const scaleControl = document.querySelector(".roster-scale-control");
  if (scaleControl) {
    scaleControl.hidden = !isSingleDay || rosterViewMode !== "staff";
  }

  const rosterTable = document.querySelector(".roster-table");
  if (rosterTable) {
    if (isSingleDay) {
      const reqWidth = getSingleDayRequiredWidth();
      rosterTable.classList.add("single-day");
      rosterTable.style.setProperty("--single-day-width", `${reqWidth}px`);
    } else {
      rosterTable.classList.remove("single-day");
      rosterTable.style.removeProperty("--single-day-width");
    }
  }

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
      const isTracked = typeof isStaffTracked === "function" ? isStaffTracked(person.key) : false;
      const trackTitle = `View Roster Audit & Change History for ${escapeHtml(person.name)}`;
      const auditPillClass = hasLocalEdit ? "audit-pill-btn edited" : (isTracked ? "audit-pill-btn active" : "audit-pill-btn");
      const trackBtnHtml = `
        <button type="button" class="person-track-changes-btn ${auditPillClass}" data-person-key="${escapeHtml(person.key)}" title="${trackTitle}" aria-label="Audit Log">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Audit</span>
          ${hasLocalEdit ? `<b class="audit-edit-dot" title="Local roster edits present"></b>` : ''}
        </button>
      `;
      const displayInitials = (person.station || person.initials) && (person.station || person.initials) !== person.name && (person.station || person.initials) !== person.key
        ? (person.station || person.initials)
        : "MUC";
      let singleDaySummaryBadgeHtml = "";
      if (isSingleDay) {
        const useLocal = rosterLocalTimeToggle.checked;
        const assignments = person.byDay[0] || [];
        if (assignments.length) {
          const sorted = [...assignments].sort((a, b) => getDutyStartMinutes(a, useLocal) - getDutyStartMinutes(b, useLocal));
          let totalDutyMins = 0;
          let earliestStartMins = Infinity;
          let latestEndMins = -Infinity;
          let earliestStartStr = "";
          let latestReleaseStr = "";

          sorted.forEach((row) => {
            const startMins = getDutyStartMinutes(row, useLocal);
            const releaseDisplay = getDisplayTime(row.date, row.release_utc, useLocal);
            const releaseMins = parseTimeToMinutes(releaseDisplay);
            let durMins = releaseMins - startMins;
            if (durMins <= 0) durMins += 1440;
            const endMins = startMins + durMins;

            totalDutyMins += durMins;
            if (startMins < earliestStartMins) {
              earliestStartMins = startMins;
              earliestStartStr = formatMinutesToTime(startMins);
            }
            if (endMins > latestEndMins) {
              latestEndMins = endMins;
              latestReleaseStr = formatMinutesToTime(endMins % 1440);
            }
          });

          const singleDayBreakMins = calculateDayBreakMinutes(assignments, useLocal);
          const spanMins = (latestEndMins > earliestStartMins && latestEndMins !== -Infinity) ? (latestEndMins - earliestStartMins) : totalDutyMins;
          const zoneLabel = useLocal ? "Local" : "Z";
          const spanStr = earliestStartStr && latestReleaseStr ? `${earliestStartStr}–${latestReleaseStr} ${zoneLabel}` : "";

          singleDaySummaryBadgeHtml = `
            <div class="person-single-day-badge" style="margin-top:4px; padding:3px 6px; background:var(--bg-muted, #f8fafc); border:1px solid var(--border, #cbd5e1); border-radius:4px; font-size:10px; line-height:1.25; color:var(--text, #334155); user-select:none;">
              <div style="display:flex; justify-content:space-between; align-items:center; font-weight:700;">
                <span style="color:var(--primary, #2563eb);" title="Total Active Duty Hours">Duty: ${formatHours(totalDutyMins)}h</span>
                <span style="color:${singleDayBreakMins > 0 ? 'var(--warning, #d97706)' : 'var(--muted, #94a3b8)'};" title="Total Rest Breaks">Break: ${formatHours(singleDayBreakMins)}h</span>
              </div>
              ${spanStr ? `<div style="font-size:9px; color:var(--muted, #64748b); margin-top:2px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Shift span: ${spanStr} (${formatHours(spanMins)}h total)">Span: ${spanStr} (${formatHours(spanMins)}h)</div>` : ""}
            </div>
          `;
        }
      }

      const personHasOverlap = shouldShowOverlapVisuals() && person.byDay.some((dayAssignments) =>
        dayAssignments.length > 1 && OperationsUtils.inspectDaySchedule(dayAssignments, getPlannerOptions()).violations.includes("overlap")
      );
      const overlapPillHtml = personHasOverlap ? ` <span class="person-overlap-pill" title="Staff member has overlapping shift assignments on one or more dates">⚠️ Overlap</span>` : "";

      tr.innerHTML = `
        <td class="roster-person-cell" draggable="true" data-staff-key="${escapeHtml(person.key)}" data-staff-name="${escapeHtml(person.name)}" data-staff-initials="${escapeHtml(person.initials)}" title="Drag ${escapeHtml(person.name)} to assign/replace on a duty slot">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong>${escapeHtml(person.name)}</strong>
            ${trackBtnHtml}
          </div>
          <span>${escapeHtml(displayInitials)}${hasLocalEdit ? ' <b class="edited-badge">Edited</b>' : ""}${overlapPillHtml}</span>
          ${singleDaySummaryBadgeHtml}
        </td>
        ${person.byDay.map((assignments, index) => renderRosterDayCell(assignments, roster.dailyWindows[index], showRosterDutyTotals, person, roster.dailyWindows.length === 1)).join("")}
        ${showRosterDutyTotals ? `<td class="roster-total-cell"><span class="roster-range-total" title="Duty hours in selected range">${formatHours(OperationsUtils.summarizeDutyHours(person.overlapping, roster.dailyWindows).totalMinutes)}h</span></td>` : ""}
      `;
      rosterBody.appendChild(tr);
    }
    initRosterBodyDelegation();
  }

  resultCount.textContent = shown.length === roster.rows.length ? String(shown.length) : `${shown.length} of ${roster.rows.length}`;
  resultCount.title = "";
  csvBtn.disabled = shown.length === 0;
  rosterBody.dataset.visibleStaffKeys = JSON.stringify(shown.map((person) => person.key));
  attachRosterDragAndDropListeners();
  updateGlobalRosterAuditBadge();
}

function removeStaffFromDutyRow(rowKey, staffKeyOrName) {
  if (!rowKey || !staffKeyOrName) return;
  const targetRow = latestRows.find((r) => OperationsUtils.rowKey(r) === rowKey);
  if (!targetRow || !targetRow.staff) return;

  if (rosterStateMode === "original") {
    rosterStateMode = "edited";
    document.querySelectorAll("#rosterStateToggleGroup .state-toggle-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.stateMode === "edited");
    });
  }

  const prevStaffList = [...targetRow.staff];
  targetRow.staff = targetRow.staff.filter((s) => !isSameStaff(s, staffKeyOrName));
  targetRow.assigned = targetRow.staff.length;
  targetRow.missing = Math.max(0, Number(targetRow.required || 0) - targetRow.assigned);

  currentAutoPlan = null;
  autoPlannerResult.textContent = "Roster changed. Create a new plan to use the updated staffing.";
  renderRoster();

  const removedNames = prevStaffList.filter((s) => !targetRow.staff.includes(s));
  const nameLabel = removedNames.join(", ") || staffKeyOrName;
  setMessage(`Removed ${nameLabel} from ${targetRow.flight} (${targetRow.sla}).`, "warn");
}

let isRosterBodyDelegated = false;
function initRosterBodyDelegation() {
  if (isRosterBodyDelegated || !rosterBody) return;
  isRosterBodyDelegated = true;

  rosterBody.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".compact-duty-delete-btn");
    if (deleteBtn) {
      e.stopPropagation();
      e.preventDefault();
      const rowKey = deleteBtn.dataset.deleteRowKey;
      const staffKey = deleteBtn.dataset.deleteStaffKey;
      removeStaffFromDutyRow(rowKey, staffKey);
      return;
    }

    const swapBtn = e.target.closest(".compact-duty-swap-btn");
    if (swapBtn) {
      e.stopPropagation();
      e.preventDefault();
      const rowKey = swapBtn.dataset.swapRowKey;
      const staffKey = swapBtn.dataset.swapStaffKey;
      const row = getRosterSourceRows().find((r) => OperationsUtils.rowKey(r) === rowKey);
      const person = getPlannerPeople().find((p) => isSameStaff(p, staffKey)) ||
                     latestStaffDirectory.find((s) => isSameStaff(s, staffKey)) ||
                     { key: staffKey, name: staffKey, initials: staffKey };
      if (row && person) {
        openShiftSwapperModal(row, person);
      }
      return;
    }

    const trackBtn = e.target.closest(".person-track-changes-btn");

    if (trackBtn) {
      e.stopPropagation();
      const personKey = trackBtn.dataset.personKey;
      if (personKey) openPersonChangesModal(personKey);
      return;
    }

    const dutyBtn = e.target.closest(".compact-duty");
    if (dutyBtn) {
      const rowKey = dutyBtn.dataset.rowKey;
      const staffKey = dutyBtn.dataset.sourceStaffKey;
      if (!rowKey) return;
      const row = getRosterSourceRows().find((r) => OperationsUtils.rowKey(r) === rowKey);
      if (!row) return;
      const roster = getRosterRows();
      const person = roster?.rows?.find((p) => p.key === staffKey);
      openRosterInlineReplacement(row, person);
      return;
    }

    const assignBtn = e.target.closest(".roster-assign-slot-btn");
    if (assignBtn) {
      e.stopPropagation();
      e.preventDefault();
      const staffKey = assignBtn.dataset.staffKey;
      const dateIso = assignBtn.dataset.date;
      const person = getPlannerPeople().find((p) => isSameStaff(p, staffKey)) ||
                     latestStaffDirectory.find((s) => isSameStaff(s, staffKey)) ||
                     { key: staffKey, name: staffKey, initials: staffKey };
      openAddShiftToPersonModal(person, dateIso);
      return;
    }

    const cell = e.target.closest(".roster-day-cell.free-day");
    if (cell) {
      const staffKey = cell.dataset.staffKey;
      const dateIso = cell.dataset.date;
      if (staffKey) {
        const person = getPlannerPeople().find((p) => isSameStaff(p, staffKey)) ||
                       latestStaffDirectory.find((s) => isSameStaff(s, staffKey)) ||
                       { key: staffKey, name: staffKey, initials: staffKey };
        if (person) {
          openAddShiftToPersonModal(person, dateIso);
          return;
        }
      }
    }

    const personCell = e.target.closest(".roster-person-cell");
    if (personCell) {
      const staffKey = personCell.dataset.staffKey;
      if (staffKey) {
        const person = getPlannerPeople().find((p) => isSameStaff(p, staffKey));
        if (person) {
          openAddShiftToPersonModal(person, "");
          return;
        }
      }
    }
  });
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
          const rowKey = OperationsUtils.rowKey(duty);
          const rosterChange = rosterStateMode === "original" ? { changed: false, added: [], removed: [] } : getDutyRosterChange(duty);
          const staff = (duty.staff || []).length ? duty.staff.map((label) => {
            const identity = parseStaffIdentity(label);
            const staffIndex = staffRefs.push({ label, identity, duty }) - 1;
            const displayName = identity?.name || label;
            const stationTag = identity?.initials && identity.initials !== displayName ? identity.initials : "";
            const hasOverlap = shouldShowOverlapVisuals() && isStaffOverlappingOnDate(identity?.key || label, duty.date);
            const overlapBadge = hasOverlap ? `<span class="overlap-badge" title="Staff member has an overlapping duty shift on this date!">⚠️ Overlap</span>` : "";
            return `<button type="button" draggable="true" class="board-staff-btn${hasOverlap ? " has-overlap" : ""}" data-staff-index="${staffIndex}" data-duty-row-key="${escapeHtml(rowKey)}" data-staff-key="${escapeHtml(identity?.key || "")}" data-staff-name="${escapeHtml(displayName)}" data-staff-initials="${escapeHtml(identity?.initials || "")}" title="${hasOverlap ? "OVERLAP WARNING: Staff member has an overlapping shift on this date! · " : ""}Drag or click to replace ${escapeHtml(displayName)}"><strong>${escapeHtml(displayName)}</strong>${stationTag ? `<small>${escapeHtml(stationTag)}</small>` : ""}${overlapBadge}<span class="board-staff-delete-btn" data-delete-row-key="${escapeHtml(rowKey)}" data-delete-staff-key="${escapeHtml(identity?.key || displayName)}" title="Remove staff from duty">×</span></button>`;
          }).join("") : '<span class="board-unassigned">Unassigned</span>';
          const planned = currentAutoPlan?.slots.filter((slot) => slot.personKey && OperationsUtils.rowKey(slot.row) === rowKey) || [];
          const plannedStaff = planned.map((slot) => {
            const person = getPlannerPeople().find((item) => item.key === slot.personKey);
            return `<span class="board-planned-staff">+ ${escapeHtml(person?.name || person?.initials || slot.personKey)} <small>planned</small></span>`;
          }).join("");
          const remaining = Math.max(0, Number(duty.missing || 0) - planned.length);
          const plannedAssigned = Number(duty.assigned || 0) + planned.length;
          const role = [duty.type, duty.movement].filter(Boolean).join(" · ") || "—";
          const changeText = formatRosterChange(rosterChange);
          return `<tr class="${remaining ? "allocation-gap-row" : ""}${rosterChange.changed ? " roster-edited-duty" : ""}" data-row-key="${escapeHtml(rowKey)}">
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
            <time>${escapeHtml((flight.scheduled || flight.duties[0]?.start_utc) ? getDisplayTime(day.isoDate, flight.scheduled || flight.duties[0]?.start_utc, useLocal) : "N/A")}</time>
            <div>${OperationsUtils.getAirlineLogoImg(flight.flight, { size: 22, style: "margin-right:6px;" })}<strong>${escapeHtml(flight.flight)}</strong><span>${escapeHtml(flight.direction || "Flight")} · ${escapeHtml(flight.route || "Route unavailable")}</span></div>
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
  rosterAirlineView.querySelectorAll(".board-staff-btn").forEach((button) => button.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".board-staff-delete-btn");
    if (deleteBtn) {
      e.stopPropagation();
      e.preventDefault();
      const rowKey = deleteBtn.dataset.deleteRowKey;
      const staffKey = deleteBtn.dataset.deleteStaffKey;
      removeStaffFromDutyRow(rowKey, staffKey);
      return;
    }
    const item = staffRefs[Number(button.dataset.staffIndex)];
    if (!item?.identity) return;
    openRosterInlineReplacement(item.duty, item.identity);
  }));

  resultCount.textContent = String(visibleFlights);
  resultCount.title = `${visibleDuties} visible SLA duties · ${visibleMissing} missing positions`;
  csvBtn.disabled = visibleDuties === 0;
  attachRosterDragAndDropListeners();
}

function showOverlapNotification(msgText) {
  let toast = document.getElementById("overlapToastNotification");
  if (toast) toast.remove();
  toast = document.createElement("div");
  toast.id = "overlapToastNotification";
  toast.style.cssText = "position: fixed; bottom: 24px; right: 24px; z-index: 99999; background: #fef2f2; border: 1.5px solid #ef4444; color: #991b1b; padding: 14px 20px; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 12px; max-width: 480px;";
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" style="flex-shrink:0; color:#dc2626;"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    <div style="flex: 1;">${escapeHtml(msgText)}</div>
    <button type="button" onclick="this.parentElement.remove()" style="border:none; background:transparent; cursor:pointer; font-size:18px; color:#991b1b; padding:0 4px; line-height:1;">&times;</button>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast && toast.parentElement) toast.remove();
  }, 6000);
}

function checkStaffDutyOverlap(personObj, targetRow) {
  if (!personObj || !targetRow || !targetRow.start_utc || !targetRow.release_utc) return null;
  const personKey = personObj.key || personObj.name || personObj.initials;
  if (!personKey) return null;

  // Suppress warning if reverting to original assignment
  const origTargetRow = originalRows.find((r) => OperationsUtils.rowKey(r) === OperationsUtils.rowKey(targetRow));
  const wasOriginallyAssigned = origTargetRow && (origTargetRow.staff || []).some((s) => isSameStaff(s, personObj) || isSameStaff(s, personKey) || isSameStaff(s, personObj.name));
  if (wasOriginallyAssigned) return null;

  const tStart = OperationsUtils.parseDutyTime(targetRow.date, targetRow.start_utc);
  const tEnd = OperationsUtils.parseDutyTime(targetRow.date, targetRow.release_utc);
  if (!tStart || !tEnd) return null;

  for (const row of latestRows) {
    if (OperationsUtils.rowKey(row) === OperationsUtils.rowKey(targetRow)) continue;
    const isAssigned = (row.staff || []).some((s) => isSameStaff(s, personObj) || isSameStaff(s, personKey) || isSameStaff(s, personObj.name));
    if (!isAssigned) continue;

    const rStart = OperationsUtils.parseDutyTime(row.date, row.start_utc);
    const rEnd = OperationsUtils.parseDutyTime(row.date, row.release_utc);
    if (rStart && rEnd && rStart < tEnd && rEnd > tStart) {
      return row;
    }
  }
  return null;
}

let isRosterDragDelegated = false;

function attachRosterDragAndDropListeners() {
  if (isRosterDragDelegated) return;
  isRosterDragDelegated = true;

  document.addEventListener("dragstart", (e) => {
    const el = e.target.closest('.roster-person-cell, .board-staff-btn, .compact-duty');
    if (!el) return;

    isDraggingRosterItem = true;
    let data = {};
    if (el.classList.contains("roster-person-cell")) {
      data = {
        type: "staff_person",
        name: el.dataset.staffName || el.querySelector("strong")?.textContent.trim() || "",
        initials: el.dataset.staffInitials || el.querySelector("span")?.textContent.trim().split(" ")[0] || "",
        key: el.dataset.staffKey || ""
      };
    } else if (el.classList.contains("board-staff-btn")) {
      data = {
        type: "staff_person",
        name: el.dataset.staffName || el.querySelector("strong")?.textContent.trim() || "",
        initials: el.dataset.staffInitials || el.querySelector("small")?.textContent.trim() || "",
        key: el.dataset.staffKey || "",
        sourceDutyRowKey: el.dataset.dutyRowKey || ""
      };
    } else if (el.classList.contains("compact-duty")) {
      data = {
        type: "duty",
        rowKey: el.dataset.rowKey || el.getAttribute("data-row-key") || "",
        sourceStaffKey: el.dataset.sourceStaffKey || el.getAttribute("data-source-staff-key") || ""
      };
    }

    draggedData = data;
    try {
      e.dataTransfer.setData("text/plain", JSON.stringify(data));
    } catch (_) {}
    e.dataTransfer.effectAllowed = "move";
    el.classList.add("dragging");
  });

  document.addEventListener("dragend", (e) => {
    const el = e.target.closest('.roster-person-cell, .board-staff-btn, .compact-duty');
    if (el) el.classList.remove("dragging");
    document.querySelectorAll(".drag-over").forEach((target) => target.classList.remove("drag-over"));
    draggedData = null;
    setTimeout(() => { isDraggingRosterItem = false; }, 50);
  });

  document.addEventListener("dragover", (e) => {
    const target = e.target.closest('.roster-day-cell, .roster-person-cell, .compact-duty, .board-staff-list, .airline-duty-table tbody tr, #rosterBody tr, .flight-card');
    if (!target) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!target.classList.contains("drag-over")) {
      document.querySelectorAll(".drag-over").forEach((t) => t.classList.remove("drag-over"));
      target.classList.add("drag-over");
    }
  });

  document.addEventListener("dragleave", (e) => {
    const target = e.target.closest('.drag-over');
    if (target && !target.contains(e.relatedTarget)) {
      target.classList.remove("drag-over");
    }
  });

  document.addEventListener("drop", (e) => {
    const target = e.target.closest('.roster-day-cell, .roster-person-cell, .compact-duty, .board-staff-list, .airline-duty-table tbody tr, #rosterBody tr, .flight-card');
    if (!target) return;
    e.preventDefault();
    target.classList.remove("drag-over");
    let data = draggedData;
    if (!data) {
      try {
        data = JSON.parse(e.dataTransfer.getData("text/plain"));
      } catch (_) {}
    }
    if (!data) return;

    handleRosterDrop(data, target);
  });
}

function handleRosterDrop(data, target) {
  if (rosterStateMode === "original") {
    rosterStateMode = "edited";
    document.querySelectorAll("#rosterStateToggleGroup .state-toggle-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.stateMode === "edited");
    });
  }

  if (data.type === "staff_person") {
    let targetRowKey = "";
    const dutyEl = target.closest(".compact-duty, [data-row-key]") || target.querySelector("[data-row-key]");
    if (dutyEl) {
      targetRowKey = dutyEl.dataset.rowKey || dutyEl.getAttribute("data-row-key") || "";
    } else {
      const tr = target.closest("tr");
      if (tr) {
        if (tr.dataset.rowKey) {
          targetRowKey = tr.dataset.rowKey;
        } else {
          const dutyInRow = tr.querySelector("[data-row-key]");
          if (dutyInRow) {
            targetRowKey = dutyInRow.dataset.rowKey || dutyInRow.getAttribute("data-row-key") || "";
          }
        }
      }
    }

    if (!targetRowKey) return;

    const targetRow = latestRows.find((r) => OperationsUtils.rowKey(r) === targetRowKey);
    if (!targetRow) return;

    const candName = data.name;
    const candInitials = data.initials;
    const candKey = data.key || candInitials;

    if (!candName && !candInitials) return;

    const foundPerson = getPlannerPeople().find((p) => isSameStaff(p, candKey) || isSameStaff(p, candName));
    const personObj = foundPerson ? { ...foundPerson } : { name: candName, initials: candInitials, key: candKey };
    if (candName && candName !== candName.toUpperCase()) {
      personObj.name = candName;
    }

    const formatted = formatStaffLabel(personObj);
    const previousStaffList = [...(targetRow.staff || [])];

    if (data.sourceDutyRowKey && data.sourceDutyRowKey !== targetRowKey) {
      const sourceRow = latestRows.find((r) => OperationsUtils.rowKey(r) === data.sourceDutyRowKey);
      if (sourceRow && sourceRow.staff) {
        sourceRow.staff = sourceRow.staff.filter((s) => !isSameStaff(s, candKey) && !isSameStaff(s, candName));
        sourceRow.assigned = sourceRow.staff.length;
        sourceRow.missing = Math.max(0, Number(sourceRow.required || 0) - sourceRow.assigned);
      }
    }

    const overlapDuty = checkStaffDutyOverlap(personObj, targetRow);
    targetRow.staff = targetRow.staff || [];

    if (!targetRow.staff.some((label) => isSameStaff(label, candKey) || isSameStaff(label, candName))) {
      targetRow.staff.push(formatted);
      targetRow.assigned = targetRow.staff.length;
      targetRow.missing = Math.max(0, Number(targetRow.required || 0) - targetRow.assigned);

      currentAutoPlan = null;
      autoPlannerResult.textContent = "Roster changed. Create a new plan to use the updated staffing.";
      requestAnimationFrame(() => renderRoster());

      let msgType = "success";
      let msgText = "";

      if (previousStaffList.length > 0) {
        msgText += `[REPLACED] Replaced ${previousStaffList.join(", ")} with ${personObj.name || candInitials} on ${targetRow.flight} (${targetRow.sla}). `;
      } else {
        msgText += `Assigned ${personObj.name || candInitials} to ${targetRow.flight} (${targetRow.sla}). `;
      }

      if (overlapDuty) {
        msgType = "warning";
        const overlapText = `OVERLAP WARNING: ${personObj.name || candInitials} is already assigned to duty ${overlapDuty.flight} (${overlapDuty.start_utc}–${overlapDuty.release_utc} UTC)!`;
        msgText += overlapText;
        showOverlapNotification(overlapText);
      }

      setMessage(msgText.trim(), msgType);
    } else {
      requestAnimationFrame(() => renderRoster());
      setMessage(`${personObj.name || candInitials} is already assigned to ${targetRow.flight} (${targetRow.sla}).`, "info");
    }
  } else if (data.type === "duty") {
    if (!data.rowKey) return;

    const dutyRow = latestRows.find((r) => OperationsUtils.rowKey(r) === data.rowKey);
    if (!dutyRow) return;

    let targetPersonEl = target.closest(".roster-person-cell, [data-staff-key], [data-staff-name]");
    if (!targetPersonEl) {
      const tr = target.closest("tr");
      if (tr) targetPersonEl = tr.querySelector(".roster-person-cell, [data-staff-key]");
    }

    let targetStaffKey = targetPersonEl?.dataset.staffKey || targetPersonEl?.getAttribute("data-staff-key") || "";
    let targetStaffName = targetPersonEl?.dataset.staffName || targetPersonEl?.getAttribute("data-staff-name") || "";
    let targetStaffInitials = targetPersonEl?.dataset.staffInitials || targetPersonEl?.getAttribute("data-staff-initials") || "";

    if (!targetStaffKey && !targetStaffName) return;

    const foundTarget = getPlannerPeople().find((p) => isSameStaff(p, targetStaffKey) || isSameStaff(p, targetStaffName));
    const targetPersonObj = foundTarget ? { ...foundTarget } : {
      key: targetStaffKey,
      name: targetStaffName,
      initials: targetStaffInitials
    };
    if (targetStaffName && targetStaffName !== targetStaffName.toUpperCase()) {
      targetPersonObj.name = targetStaffName;
    }

    const formatted = formatStaffLabel(targetPersonObj);
    const previousStaffList = [...(dutyRow.staff || [])];

    if (data.sourceStaffKey && !isSameStaff(data.sourceStaffKey, targetPersonObj)) {
      dutyRow.staff = (dutyRow.staff || []).filter((s) => !isSameStaff(s, data.sourceStaffKey));
    }

    const overlapDuty = checkStaffDutyOverlap(targetPersonObj, dutyRow);
    dutyRow.staff = dutyRow.staff || [];

    if (!dutyRow.staff.some((s) => isSameStaff(s, targetPersonObj))) {
      dutyRow.staff.push(formatted);
      dutyRow.assigned = dutyRow.staff.length;
      dutyRow.missing = Math.max(0, Number(dutyRow.required || 0) - dutyRow.assigned);

      currentAutoPlan = null;
      autoPlannerResult.textContent = "Roster changed. Create a new plan to use the updated staffing.";
      requestAnimationFrame(() => renderRoster());

      let msgType = "success";
      let msgText = "";

      const replacedNames = previousStaffList.filter((s) => !isSameStaff(s, targetPersonObj));
      if (replacedNames.length > 0) {
        msgText += `[REPLACED] Replaced ${replacedNames.join(", ")} with ${targetPersonObj.name || targetPersonObj.initials} on duty ${dutyRow.flight} (${dutyRow.sla}). `;
      } else {
        msgText += `Assigned duty ${dutyRow.flight} (${dutyRow.sla}) to ${targetPersonObj.name || targetPersonObj.initials}. `;
      }

      if (overlapDuty) {
        msgType = "warning";
        const overlapText = `OVERLAP WARNING: ${targetPersonObj.name || targetPersonObj.initials} is already assigned to duty ${overlapDuty.flight} (${overlapDuty.start_utc}–${overlapDuty.release_utc} UTC)!`;
        msgText += overlapText;
        showOverlapNotification(overlapText);
      }

      setMessage(msgText.trim(), msgType);
    } else {
      requestAnimationFrame(() => renderRoster());
      setMessage(`${targetPersonObj.name || targetPersonObj.initials} is already assigned to ${dutyRow.flight} (${dutyRow.sla}).`, "info");
    }
  }
}

function checkPersonHasOverlap(person) {
  if (!person) return false;
  const list = person.overlapping || person.assignments || [];
  if (list.length < 2) return false;
  if (typeof OperationsUtils !== "undefined" && OperationsUtils.hasOverlappingShifts) {
    return OperationsUtils.hasOverlappingShifts(list);
  }
  return list.some((d1, i) =>
    list.some((d2, j) => i !== j && d1.start_utc < d2.release_utc && d1.release_utc > d2.start_utc)
  );
}

function filterRosterPeople(rows) {
  const query = rosterStaffSearch.value.trim().toLowerCase();
  return rows.filter((person) => {
    if (rosterStatus.value) {
      if (rosterStatus.value === "overlap" || rosterStatus.value === "overlaps") {
        if (!checkPersonHasOverlap(person)) return false;
      } else if (person.status !== rosterStatus.value) {
        return false;
      }
    }
    if (selectedRosterSlas.length > 0) {
      if (!person.overlapping.some((row) => selectedRosterSlas.includes(row.sla))) return false;
    } else if (rosterSla.value) {
      if (!person.overlapping.some((row) => row.sla === rosterSla.value)) return false;
    }
    if (query) {
      const visibleAssignments = person.byDay.flat();
      const searchable = [person.initials, person.name, ...visibleAssignments.flatMap((row) => [row.flight, row.route, row.sla])].join(" ").toLowerCase();
      if (!searchable.includes(query)) return false;
    }
    return true;
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
    const showStation = person.station || (person.initials && person.initials !== person.name && person.initials !== person.key ? person.initials : "");
    return `
    <tr>
      <td><strong>${escapeHtml(person.name)}</strong>${showStation ? `<span class="muted"> ${escapeHtml(showStation)}</span>` : ""}</td>
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

function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const match = String(timeStr).match(/(\d{1,2}):(\d{2})/);
  if (!match) return 0;
  const h = parseInt(match[1], 10) || 0;
  const m = parseInt(match[2], 10) || 0;
  return h * 60 + m;
}

function formatMinutesToTime(mins) {
  let m = Math.round(mins) % 1440;
  if (m < 0) m += 1440;
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

function getFilterWindowMinutes() {
  const startStr = rosterStartTime?.value || "00:00";
  const endStr = rosterEndTime?.value || "24:00";
  const winStart = parseTimeToMinutes(startStr);
  let winEnd = parseTimeToMinutes(endStr);
  if (winEnd <= winStart || endStr === "24:00" || endStr === "00:00") {
    if (endStr === "24:00") winEnd = 1440;
    else if (winEnd <= winStart) winEnd += 1440;
  }
  const winDur = Math.max(60, winEnd - winStart);
  return { winStart, winEnd, winDur, startStr, endStr };
}

function getDutyStartMinutes(row, useLocal) {
  const displayStart = getDisplayTime(row.date, row.start_utc, useLocal);
  return parseTimeToMinutes(displayStart);
}

function getSingleDayRequiredWidth() {
  const { winDur } = getFilterWindowMinutes();
  const pxPerMin = currentSingleDayScale / 1440;
  const calculatedWidth = Math.ceil(winDur * pxPerMin);
  return Math.max(currentSingleDayScale, calculatedWidth);
}

function renderRosterHeader(windows) {
  const table = rosterHead.closest("table");
  const isSingleDay = windows.length === 1;
  const scaleControl = document.querySelector(".roster-scale-control");
  if (scaleControl) {
    scaleControl.hidden = !isSingleDay || rosterViewMode !== "staff";
  }
  table.classList.toggle("single-day", isSingleDay);
  if (!windows.length) {
    table.style.minWidth = "100%";
    rosterHead.innerHTML = "<tr><th>Staff member</th><th>Duty list by day</th></tr>";
    return;
  }
  const reqWidth = isSingleDay ? getSingleDayRequiredWidth() : (190 + (windows.length * 180) + (showRosterDutyTotals ? 90 : 0));
  table.style.minWidth = `${reqWidth}px`;
  table.style.setProperty("--single-day-width", `${reqWidth}px`);
  const weekdayFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "UTC" });
  const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

  let timelineTicksHtml = "";
  if (isSingleDay) {
    const { winStart, winDur } = getFilterWindowMinutes();
    const totalHours = Math.max(1, Math.round(winDur / 60));
    const stepHours = totalHours <= 12 ? 1 : 2;
    const tickElements = [];

    for (let h = 0; h <= totalHours; h += stepHours) {
      const tMins = winStart + h * 60;
      const ratio = (h * 60) / winDur;
      if (ratio > 1.02) break;
      const actualRatio = Math.min(1.0, ratio);
      const timeLabel = formatMinutesToTime(tMins);
      let transform = "translateX(-50%)";
      if (actualRatio === 0) transform = "translateX(0)";
      else if (actualRatio >= 1.0) transform = "translateX(-100%)";
      tickElements.push(`<span style="position:absolute; left:${(actualRatio * 100).toFixed(2)}%; ${transform ? `transform:${transform};` : ""}">${timeLabel}</span>`);
    }

    timelineTicksHtml = `
      <div class="roster-timeline-ticks" style="position:relative; width:100%; height:18px; font-size:11px; color:var(--muted); font-weight:600; margin-top:4px; border-top:1px dashed #cbd5e1; padding-top:2px;">
        ${tickElements.join("")}
      </div>
    `;
  }

  rosterHead.innerHTML = `<tr><th>Staff member</th>${windows.map((window) => `
    <th class="roster-date-heading">
      <span>${escapeHtml(weekdayFormatter.format(window.start))}</span>
      <strong>${escapeHtml(dateFormatter.format(window.start))}</strong>
      ${timelineTicksHtml}
    </th>
  `).join("")}${showRosterDutyTotals ? '<th class="roster-date-heading"><span>Selected</span><strong>Range hours</strong></th>' : ""}</tr>`;
}

function hasAvailableShiftsForDate(isoDate) {
  if (!isoDate || !Array.isArray(latestRows)) return false;
  return latestRows.some((duty) => duty.date === isoDate && (Number(duty.missing || 0) > 0 || !duty.staff || duty.staff.length === 0));
}

function hasAssignableShiftForPersonOnDate(personKey, isoDate, personAssignments = []) {
  if (!isoDate || !Array.isArray(latestRows) || !personKey) return false;
  const openDuties = latestRows.filter((row) => row.date === isoDate && Number(row.missing || 0) > 0);
  if (!openDuties.length) return false;

  const unassignedDuties = openDuties.filter((duty) => !(duty.staff || []).some((s) => isSameStaff(s, personKey)));
  if (!unassignedDuties.length) return false;
  if (!personAssignments.length) return true;

  const parseTime = (date, timeStr) => parseUtcTime(date, timeStr);

  return unassignedDuties.some((duty) => {
    const dStart = parseTime(duty.date, duty.start_utc);
    let dEnd = parseTime(duty.date, duty.release_utc);
    if (!dStart || !dEnd) return false;
    if (dEnd <= dStart) dEnd = new Date(dEnd.getTime() + 86400000);

    const conflict = personAssignments.some((a) => {
      const aStart = parseTime(a.date, a.start_utc);
      let aEnd = parseTime(a.date, a.release_utc);
      if (!aStart || !aEnd) return false;
      if (aEnd <= aStart) aEnd = new Date(aEnd.getTime() + 86400000);
      return dStart < aEnd && dEnd > aStart;
    });

    return !conflict;
  });
}

function isRowOverlappingInAssignments(targetRow, assignments) {
  if (!assignments || assignments.length <= 1 || !targetRow) return false;
  const targetStart = OperationsUtils.parseDutyTime(targetRow.date, targetRow.start_utc);
  const targetEnd = OperationsUtils.parseDutyTime(targetRow.date, targetRow.release_utc);
  if (!targetStart || !targetEnd) return false;

  return assignments.some((other) => {
    if (other === targetRow || OperationsUtils.rowKey(other) === OperationsUtils.rowKey(targetRow)) return false;
    const flightTarget = String(targetRow.flight_id || targetRow.flight || "").trim().toUpperCase();
    const flightOther = String(other.flight_id || other.flight || "").trim().toUpperCase();
    const dateTarget = String(targetRow.date || "").trim();
    const dateOther = String(other.date || "").trim();
    if (flightTarget && flightOther && flightTarget === flightOther && dateTarget && dateOther && dateTarget === dateOther) {
      return false;
    }
    const otherStart = OperationsUtils.parseDutyTime(other.date, other.start_utc);
    const otherEnd = OperationsUtils.parseDutyTime(other.date, other.release_utc);
    if (!otherStart || !otherEnd) return false;
    return targetStart < otherEnd && targetEnd > otherStart;
  });
}

function isStaffOverlappingOnDate(staffKeyOrName, date) {
  if (!staffKeyOrName || !date) return false;
  const staffDuties = latestRows.filter((r) => r.date === date && (r.staff || []).some((s) => isSameStaff(s, staffKeyOrName)));
  if (staffDuties.length <= 1) return false;
  return OperationsUtils.inspectDaySchedule(staffDuties, getPlannerOptions()).violations.includes("overlap");
}

function calculateDayBreakMinutes(assignments, useLocal = false) {
  if (!assignments || assignments.length < 2) return 0;
  const sorted = [...assignments].map((row) => {
    const startMins = getDutyStartMinutes(row, useLocal);
    const releaseDisplay = getDisplayTime(row.date, row.release_utc, useLocal);
    const releaseMins = parseTimeToMinutes(releaseDisplay);
    let durMins = releaseMins - startMins;
    if (durMins <= 0) durMins += 1440;
    return { startMins, endMins: startMins + durMins };
  }).sort((a, b) => a.startMins - b.startMins);

  let breakMins = 0;
  for (let i = 1; i < sorted.length; i++) {
    const gap = sorted[i].startMins - sorted[i - 1].endMins;
    if (gap > 0) breakMins += gap;
  }
  return breakMins;
}

function renderRosterDayCell(assignments, window, showTotal = false, person = null, isSingleDay = false) {
  const useLocal = rosterLocalTimeToggle.checked;
  const dutyHours = showTotal ? formatHours(OperationsUtils.summarizeDutyHours(assignments, [window]).totalMinutes) : "";
  const breakMins = calculateDayBreakMinutes(assignments, useLocal);
  const breakSubtext = breakMins > 0 ? ` <small class="break-subtext" style="opacity:0.85; font-weight:normal; font-size:10px;" title="Shift break in-between: ${formatHours(breakMins)}h (${breakMins}m)">(+${formatHours(breakMins)}h break)</small>` : "";
  const dayInsp = assignments.length > 1 ? OperationsUtils.inspectDaySchedule(assignments, getPlannerOptions()) : { violations: [] };
  const showVisuals = shouldShowOverlapVisuals();
  const hasDayOverlap = showVisuals && (dayInsp.violations || []).includes("overlap");
  const cellOverlapClass = hasDayOverlap ? " has-overlap" : "";
  const staffKeyAttr = person?.key ? ` data-staff-key="${escapeHtml(person.key)}"` : "";
  const dateAttr = window?.isoDate ? ` data-date="${escapeHtml(window.isoDate)}"` : "";

  const canAssignMore = hasAssignableShiftForPersonOnDate(person?.key, window?.isoDate, assignments);
  const assignAddBtnHtml = canAssignMore
    ? `<button type="button" class="roster-assign-slot-btn add-more-btn" data-staff-key="${escapeHtml(person?.key || "")}" data-date="${escapeHtml(window?.isoDate || "")}" title="Assign another non-conflicting available shift during break to ${escapeHtml(person?.name || "staff member")}">
         <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" style="margin-right:2px; vertical-align:-1px;"><path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2z"/></svg>
         <span>+ Assign</span>
       </button>`
    : "";

  if (!assignments.length) {
    const isoDate = window?.isoDate;
    const hasSlots = hasAvailableShiftsForDate(isoDate);
    const assignBtnHtml = hasSlots
      ? `<button type="button" class="roster-assign-slot-btn" data-staff-key="${escapeHtml(person?.key || person?.initials || person?.name || "")}" data-date="${escapeHtml(isoDate || "")}" title="Assign available duty slot to ${escapeHtml(person?.name || "staff member")}">
           <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" style="margin-right:2px; vertical-align:-1px;"><path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2z"/></svg>
           <span>Assign</span>
         </button>`
      : `<span>Free</span>`;
    return `<td class="roster-day-cell free-day"${staffKeyAttr}${dateAttr}><div class="roster-free-day-content">${showTotal ? '<span class="roster-day-total">0.0h</span>' : ""}${assignBtnHtml}</div></td>`;
  }
  const zoneLabel = useLocal ? "Local" : "Z";
  const { winStart, winDur } = getFilterWindowMinutes();

  if (isSingleDay) {
    const sorted = [...assignments].sort((a, b) => getDutyStartMinutes(a, useLocal) - getDutyStartMinutes(b, useLocal));
    const tracks = [];

    for (const row of sorted) {
      const startMins = getDutyStartMinutes(row, useLocal);
      const releaseDisplay = getDisplayTime(row.date, row.release_utc, useLocal);
      const releaseMins = parseTimeToMinutes(releaseDisplay);
      let durMins = releaseMins - startMins;
      if (durMins <= 0) durMins += 1440;
      const endMins = startMins + durMins;

      let placed = false;
      for (const track of tracks) {
        if (startMins >= track.lastEndMins) {
          track.items.push({ row, startMins, endMins });
          track.lastEndMins = endMins;
          placed = true;
          break;
        }
      }
      if (!placed) {
        tracks.push({ items: [{ row, startMins, endMins }], lastEndMins: endMins });
      }
    }

    const rowsHtml = tracks.map((track) => {
      let prevEndMins = winStart;
      const elements = [];

      track.items.forEach(({ row, startMins, endMins }, idx) => {
        const change = rosterStateMode === "original" ? { changed: false, added: [], removed: [] } : getDutyRosterChange(row);
        const changeText = formatRosterChange(change);
        const rowKey = OperationsUtils.rowKey(row);
        const isOverlap = showVisuals && isRowOverlappingInAssignments(row, assignments);

        let relStart = startMins - winStart;
        if (relStart < 0) relStart += 1440;

        let relPrevEnd = prevEndMins - winStart;
        if (relPrevEnd < 0) relPrevEnd += 1440;

        const breakGapMins = Math.max(0, relStart - relPrevEnd);
        let insertedBreakCard = false;

        if (breakGapMins >= 15 && idx > 0 && prevEndMins >= winStart) {
          const gapPct = (breakGapMins / winDur) * 100;
          const breakStartStr = formatMinutesToTime(prevEndMins);
          const breakEndStr = formatMinutesToTime(startMins);
          elements.push(`
            <div class="compact-duty break-card" style="width: ${gapPct.toFixed(2)}%;" title="In-between rest break: ${breakStartStr}–${breakEndStr} ${zoneLabel} (${formatHours(breakGapMins)}h / ${breakGapMins}m)">
              <strong>Break</strong>
              <span class="compact-sla break-tag">${formatHours(breakGapMins)}h</span>
              <small>${escapeHtml(breakStartStr)}–${escapeHtml(breakEndStr)} ${zoneLabel}</small>
            </div>
          `);
          insertedBreakCard = true;
        }

        let durMins = endMins - startMins;
        if (durMins <= 0) durMins += 1440;
        const durPct = (durMins / winDur) * 100;

        let styleAttr = `style="width: ${durPct.toFixed(2)}%;`;
        if (idx === 0) {
          const offsetPct = Math.max(0, (relStart / winDur) * 100);
          styleAttr += ` margin-left: ${offsetPct.toFixed(2)}%;"`;
        } else if (!insertedBreakCard && breakGapMins > 0) {
          const gapPct = (breakGapMins / winDur) * 100;
          styleAttr += ` margin-left: ${gapPct.toFixed(2)}%;"`;
        } else {
          styleAttr += ` margin-left: 0;"`;
        }

        prevEndMins = endMins;
        const breakTitle = breakGapMins > 0 ? ` · Break from prev duty: ${formatHours(breakGapMins)}h (${breakGapMins}m)` : "";
        const overlapTitle = isOverlap ? "⚠️ OVERLAP CONFLICT: Shift overlaps with another duty assigned to this person! · " : "";
        const overlapBadgeHtml = isOverlap ? ` <span class="overlap-badge" title="Overlap Collision with another assigned shift on this day">⚠️ OVERLAP</span>` : "";

        elements.push(`
        <button type="button" draggable="true" class="compact-duty${change.changed ? " edited" : ""}${isOverlap ? " duty-overlap" : ""}" data-row-key="${escapeHtml(rowKey)}" data-sla="${escapeHtml(row.sla || "")}" ${person?.key ? `data-source-staff-key="${escapeHtml(person.key)}"` : ""}${styleAttr} title="${overlapTitle}${change.changed ? `Edited locally: ${escapeHtml(changeText)} · ` : ""}Find a replacement · ${escapeHtml(`${row.route || ""} · ${row.start_utc || ""}–${row.release_utc || ""} UTC`)}${breakTitle}">
          <strong>${escapeHtml(row.flight)}</strong>
          <span class="compact-sla" data-sla="${escapeHtml(row.sla || "")}">${escapeHtml(row.sla)}${getRosterCellBadge(change, person)}${overlapBadgeHtml}</span>
          <small>${escapeHtml(getDisplayTime(row.date, row.start_utc, useLocal))}–${escapeHtml(getDisplayTime(row.date, row.release_utc, useLocal))} ${zoneLabel}</small>
          ${change.changed ? `<small class="compact-duty-change">${escapeHtml(changeText)}</small>` : ""}
          ${person?.key ? `<span class="compact-duty-swap-btn" data-swap-row-key="${escapeHtml(rowKey)}" data-swap-staff-key="${escapeHtml(person.key)}" title="Swap or transfer shift">⇄</span>` : ""}
          ${person?.key ? `<span class="compact-duty-delete-btn" data-delete-row-key="${escapeHtml(rowKey)}" data-delete-staff-key="${escapeHtml(person.key)}" title="Remove staff from duty">×</span>` : ""}
        </button>`);
      });

      return `<div class="duty-strip-row">${elements.join("")}</div>`;
    }).join("");

    return `<td class="roster-day-cell${cellOverlapClass}"${staffKeyAttr}${dateAttr}><div class="duty-strip">${rowsHtml}</div>${assignAddBtnHtml}</td>`;
  }

  let sortedAssignments = [...assignments];
  const duties = sortedAssignments.map((row) => {
    const change = rosterStateMode === "original" ? { changed: false, added: [], removed: [] } : getDutyRosterChange(row);
    const changeText = formatRosterChange(change);
    const rowKey = OperationsUtils.rowKey(row);
    const isOverlap = showVisuals && isRowOverlappingInAssignments(row, assignments);
    const overlapTitle = isOverlap ? "⚠️ OVERLAP CONFLICT: Shift overlaps with another duty assigned to this person! · " : "";
    const overlapBadgeHtml = isOverlap ? ` <span class="overlap-badge" title="Overlap Collision with another assigned shift on this day">⚠️ OVERLAP</span>` : "";

    return `
    <button type="button" draggable="true" class="compact-duty${change.changed ? " edited" : ""}${isOverlap ? " duty-overlap" : ""}" data-row-key="${escapeHtml(rowKey)}" data-sla="${escapeHtml(row.sla || "")}" ${person?.key ? `data-source-staff-key="${escapeHtml(person.key)}"` : ""} title="${overlapTitle}${change.changed ? `Edited locally: ${escapeHtml(changeText)} · ` : ""}Find a replacement · ${escapeHtml(`${row.route || ""} · ${row.start_utc || ""}–${row.release_utc || ""} UTC`)}">
      <strong>${escapeHtml(row.flight)}</strong>
      <span class="compact-sla" data-sla="${escapeHtml(row.sla || "")}">${escapeHtml(row.sla)}${getRosterCellBadge(change, person)}${overlapBadgeHtml}</span>
      <small>${escapeHtml(getDisplayTime(row.date, row.start_utc, useLocal))}–${escapeHtml(getDisplayTime(row.date, row.release_utc, useLocal))} ${zoneLabel}</small>
      ${change.changed ? `<small class="compact-duty-change">${escapeHtml(changeText)}</small>` : ""}
      ${person?.key ? `<span class="compact-duty-swap-btn" data-swap-row-key="${escapeHtml(rowKey)}" data-swap-staff-key="${escapeHtml(person.key)}" title="Swap or transfer shift">⇄</span>` : ""}
      ${person?.key ? `<span class="compact-duty-delete-btn" data-delete-row-key="${escapeHtml(rowKey)}" data-delete-staff-key="${escapeHtml(person.key)}" title="Remove staff from duty">×</span>` : ""}
    </button>
  `;
  }).join("");

  const dayTotalOverlapBadge = hasDayOverlap ? ` <span class="overlap-badge" title="Overlapping Duty Shifts Detected on this Day!">⚠️ OVERLAP</span>` : "";
  return `<td class="roster-day-cell${cellOverlapClass}"${staffKeyAttr}${dateAttr}>${showTotal ? `<span class="roster-day-total" title="Duty hours: ${dutyHours}h${breakMins > 0 ? ` · In-between break: ${formatHours(breakMins)}h` : ""}">${dutyHours}h${breakSubtext}${dayTotalOverlapBadge}</span>` : ""}<div class="duty-strip">${duties}</div>${assignAddBtnHtml}</td>`;
}

function openReplacementFinder(person, duty) {
  const staffKey = person.initials || person.name;
  setReplacementStaff(staffKey);
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
  const inlineSearchInput = document.getElementById("rosterInlineCandidateSearch");
  if (inlineSearchInput) inlineSearchInput.value = "";

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

    const targetDuties = latestRows.filter((r) => r.date === duty.date && (r.staff || []).some((s) => isSameStaff(s, cand.key)));
    const hasOverlapConflict = cand.connectionGapMinutes < 0 || (targetDuties.length > 0 && isStaffOverlappingOnDate(cand.key, duty.date));
    const overlapTag = hasOverlapConflict ? `<span class="overlap-badge" style="background:#fee2e2; border-color:#fca5a5; color:#991b1b; font-size:9px; font-weight:800; margin-left:6px;" title="Assigning this candidate creates an overlapping shift conflict!">⚠️ OVERLAP CONFLICT</span>` : "";

    const slaExpText = cand.slaExperience ? ` · ${cand.slaExperience} ${duty.sla} duties prior` : "";
    const bestBadge = isBest ? `<span class="inline-candidate-badge-best">Best Match</span>` : "";

    return `
      <div class="inline-candidate-card${hasOverlapConflict ? " has-overlap" : ""}">
        <div class="inline-candidate-info">
          <strong>${escapeHtml(cand.name)} <small>(${escapeHtml(cand.initials)})</small>${bestBadge}${overlapTag}</strong>
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
      <div class="inline-candidate-quick-action" style="background: #f0fdfa; border-color: var(--accent); grid-column: 1 / -1; margin-bottom: 6px; flex-direction: column; align-items: flex-start; gap: 8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
          <span>Replace all shifts of <strong>${escapeHtml(replaceName)}</strong>:</span>
          <div style="display:flex; gap:6px;">
            <button id="rosterInlineTrackChangesBtn" type="button" class="secondary-btn" style="min-height:26px; padding:0 8px; font-size:11px; display:inline-flex; align-items:center; gap:4px;" title="View roster change history for ${escapeHtml(replaceName)}">
              <svg style="width:12px;height:12px;fill:currentColor;" viewBox="0 0 16 16"><path d="M8 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8zm6.5-3v3.25l2.25 1.35-.75 1.2-3-1.8V5h1.5z"/></svg> Audit History
            </button>
            <button id="rosterInlineSwapDutyBtn" type="button" class="secondary-btn" style="min-height:26px; padding:0 8px; font-size:11px; display:inline-flex; align-items:center; gap:4px;" title="Swap or transfer this duty with another staff member">
              ⇄ Swap Shift...
            </button>
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
        </div>
        <div id="rosterInlineBulkControls" style="display:none; width:100%; border-top:1px solid #ccfbf1; padding-top:8px; margin-top:4px;">
          <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
            <select id="rosterInlineCandidateSelect" class="bulk-select" style="min-width:170px; height:28px; font-size:11px; padding:0 6px;" aria-label="Select replacement candidate">
              <option value="">Select candidate...</option>
              <option value="auto">Auto-assign best match</option>
            </select>
            <select id="rosterInlineDateSelect" class="bulk-select" style="min-width:140px; height:28px; font-size:11px; padding:0 6px;" aria-label="Select dates for replacement">
              <option value="all">All scanned dates</option>
            </select>
            <button id="rosterInlineConfirmBulkBtn" type="button" class="primary-btn" style="min-height:28px; padding:0 10px; font-size:11px;">Confirm Replace All</button>
          </div>
        </div>
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

  const rosterInlineTrackChangesBtn = contentEl.querySelector("#rosterInlineTrackChangesBtn");
  if (rosterInlineTrackChangesBtn && personToReplace) {
    rosterInlineTrackChangesBtn.addEventListener("click", () => {
      openPersonChangesModal(personToReplace.key || personToReplace.initials);
    });
  }

  const rosterInlineSwapDutyBtn = contentEl.querySelector("#rosterInlineSwapDutyBtn");
  if (rosterInlineSwapDutyBtn && personToReplace) {
    rosterInlineSwapDutyBtn.addEventListener("click", () => {
      drawer.hidden = true;
      openShiftSwapperModal(duty, personToReplace);
    });
  }


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

  const rosterInlineReplaceAllBtn = contentEl.querySelector("#rosterInlineReplaceAllBtn");
  const rosterInlineBulkControls = contentEl.querySelector("#rosterInlineBulkControls");
  const rosterInlineCandidateSelect = contentEl.querySelector("#rosterInlineCandidateSelect");
  const rosterInlineDateSelect = contentEl.querySelector("#rosterInlineDateSelect");
  const rosterInlineConfirmBulkBtn = contentEl.querySelector("#rosterInlineConfirmBulkBtn");

  if (rosterInlineReplaceAllBtn && rosterInlineBulkControls) {
    rosterInlineReplaceAllBtn.addEventListener("click", () => {
      const isHidden = rosterInlineBulkControls.style.display === "none";
      rosterInlineBulkControls.style.display = isHidden ? "block" : "none";
      if (isHidden) {
        const staffList = typeof getPlannerPeople === "function" ? getPlannerPeople() : [];
        const targetKey = personToReplace?.key || personToReplace?.initials?.toUpperCase();
        let candHtml = `<option value="">Select replacement candidate...</option><option value="auto">Auto-assign best match</option>`;
        for (const person of staffList) {
          if (targetKey && (person.key === targetKey || person.initials.toUpperCase() === targetKey)) continue;
          candHtml += `<option value="${escapeHtml(person.key)}">${escapeHtml(person.initials)} - ${escapeHtml(person.name)}</option>`;
        }
        if (rosterInlineCandidateSelect) rosterInlineCandidateSelect.innerHTML = candHtml;

        const scannedDates = [...latestScannedDates].sort();
        let dateHtml = `<option value="all">All scanned dates (${scannedDates.length} days)</option>`;
        if (duty?.date && scannedDates.includes(duty.date)) {
          dateHtml += `<option value="${escapeHtml(duty.date)}">Only target date (${escapeHtml(duty.date)})</option>`;
        }
        for (const isoDate of scannedDates) {
          if (isoDate !== duty?.date) {
            dateHtml += `<option value="${escapeHtml(isoDate)}">Only ${escapeHtml(isoDate)}</option>`;
          }
        }
        if (rosterInlineDateSelect) rosterInlineDateSelect.innerHTML = dateHtml;
      }
    });
  }

  if (rosterInlineConfirmBulkBtn) {
    rosterInlineConfirmBulkBtn.addEventListener("click", () => {
      const candKey = rosterInlineCandidateSelect?.value;
      const dateVal = rosterInlineDateSelect?.value || "all";
      if (!candKey) {
        return setMessage("Please select a replacement candidate or 'Auto-assign best match'.", "warn");
      }
      executeBulkReplacement(personToReplace, candKey, dateVal);
      drawer.hidden = true;
    });
  }

  // Handle Remove Staff event
  contentEl.querySelectorAll("button[data-remove-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const removeKey = btn.dataset.removeKey;
      const removeName = btn.dataset.removeName;
      const targetRow = latestRows.find((r) => OperationsUtils.rowKey(r) === OperationsUtils.rowKey(duty));
      if (targetRow && targetRow.staff) {
        targetRow.staff = targetRow.staff.filter((label) => !isSameStaff(label, removeKey) && !isSameStaff(label, removeName));
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
          const oldIndex = targetRow.staff.findIndex((label) => isSameStaff(label, replaceName) || isSameStaff(label, personToReplace));
          if (oldIndex >= 0) {
            targetRow.staff[oldIndex] = formatted;
          } else if (!targetRow.staff.some((label) => isSameStaff(label, candidateKey))) {
            targetRow.staff.push(formatted);
          }
        } else {
          if (!targetRow.staff.some((label) => isSameStaff(label, candidateKey))) {
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

  if (inlineSearchInput && !inlineSearchInput.dataset.bound) {
    inlineSearchInput.dataset.bound = "true";
    inlineSearchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      const currentContentEl = document.getElementById("rosterInlineCandidatesContent");
      if (!currentContentEl) return;
      const moreContainer = currentContentEl.querySelector("#rosterInlineMoreCandidates");
      const showMoreBtn = currentContentEl.querySelector("#rosterInlineShowMoreBtn");
      if (query && moreContainer && moreContainer.hidden) {
        moreContainer.hidden = false;
        if (showMoreBtn) showMoreBtn.innerHTML = "Show less ▴";
      }
      const cards = currentContentEl.querySelectorAll(".inline-candidate-card");
      let matchCount = 0;
      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        const isMatch = !query || text.includes(query);
        card.style.display = isMatch ? "" : "none";
        if (isMatch) matchCount++;
      });
      let noMatchMsg = currentContentEl.querySelector(".inline-no-match-msg");
      if (query && matchCount === 0) {
        if (!noMatchMsg) {
          noMatchMsg = document.createElement("div");
          noMatchMsg.className = "inline-no-match-msg empty-selection";
          noMatchMsg.style.gridColumn = "1 / -1";
          currentContentEl.appendChild(noMatchMsg);
        }
        noMatchMsg.textContent = `No replacement candidates match "${query}".`;
        noMatchMsg.hidden = false;
      } else if (noMatchMsg) {
        noMatchMsg.hidden = true;
      }
    });
  }
}

function executeBulkReplacement(overridePerson = null, overrideCandidateKey = null, overrideDate = null) {
  const targetIdentity = overridePerson
    ? (typeof overridePerson === "object" ? overridePerson : resolveStaffIdentity(overridePerson) || { name: overridePerson, initials: overridePerson, key: overridePerson })
    : (resolveStaffIdentity(myInitialsInput.value.trim()) || { name: myInitialsInput.value.trim(), initials: myInitialsInput.value.trim(), key: myInitialsInput.value.trim() });

  if (!targetIdentity || (!targetIdentity.initials && !targetIdentity.name && !targetIdentity.key)) {
    return setMessage("Please enter or select a staff member to replace.", "warn");
  }

  const targetName = targetIdentity.name || targetIdentity.initials || targetIdentity.key;

  const selectDateEl = document.getElementById("bulkReplacementDateSelect");
  const dateFilter = overrideDate !== null ? overrideDate : (selectDateEl ? selectDateEl.value : "all");

  const targetDuties = latestRows.filter((row) => {
    if (!row.staff || !row.staff.length) return false;
    if (dateFilter && dateFilter !== "all" && row.date !== dateFilter) return false;
    return row.staff.some((s) => isSameStaff(s, targetIdentity));
  });

  if (!targetDuties.length) {
    const dateLabel = dateFilter && dateFilter !== "all" ? ` on ${dateFilter}` : " across the scanned dates";
    return setMessage(`No scheduled duties found for ${targetName}${dateLabel}.`, "warn");
  }

  const selectCandEl = document.getElementById("bulkReplacementCandidateSelect");
  const selectedCandidateKey = overrideCandidateKey !== null ? overrideCandidateKey : (selectCandEl ? selectCandEl.value : "");
  if (!selectedCandidateKey) {
    return setMessage("Please select a replacement candidate or 'Auto-assign best match'.", "warn");
  }

  let replacedCount = 0;
  let conflictCount = 0;
  const chosenSummaryList = [];

  for (const duty of targetDuties) {
    let chosenCandidate = null;

    if (selectedCandidateKey === "auto") {
      const opts = { ...getPlannerOptions(), excludedKey: targetIdentity.key || targetIdentity.initials };
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
      const oldIndex = targetRow.staff.findIndex((label) => isSameStaff(label, targetIdentity));

      if (oldIndex >= 0) {
        const existingCandIndex = targetRow.staff.findIndex((label) => isSameStaff(label, chosenCandidate));
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
  if (activeTab === "replacements") renderReplacements(true);
  currentAutoPlan = null;
  autoPlannerResult.textContent = "Roster changed. Create a new plan to use the updated staffing.";
  if (typeof renderRoster === "function") renderRoster();

  if (replacedCount > 0) {
    const candLabel = selectedCandidateKey === "auto"
      ? `best matching candidates (${chosenSummaryList.join(", ")})`
      : chosenSummaryList.join(", ");
    const conflictNote = conflictCount > 0 ? ` (${conflictCount} shift(s) could not be covered due to schedule constraints)` : "";
    const dateLabel = dateFilter && dateFilter !== "all" ? ` on ${dateFilter}` : " across scanned dates";
    setMessage(`Successfully replaced ${replacedCount} shift(s) of ${targetName}${dateLabel} with ${candLabel}.${conflictNote}`, "success");
  } else {
    setMessage(`Could not replace shifts for ${targetName}. Check candidate availability or schedule conflicts.`, "warn");
  }
}

function openBulkReplacementForPerson(personToReplace) {
  if (!personToReplace) return;
  const staffKey = personToReplace.initials || personToReplace.name || personToReplace.key;
  setReplacementStaff(staffKey);
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

  if (replacementStaffSelect) {
    const currentVal = replacementStaffSelect.value || myInitialsInput?.value || localStorage.getItem("myInitials") || "";
    replacementStaffSelect.innerHTML = '<option value="">Select staff member...</option>';
    for (const person of people) {
      if (seen.has(person.key)) continue;
      seen.add(person.key);

      const option = document.createElement("option");
      option.value = person.name;
      option.label = `${person.initials} - ${person.name}`;
      staffOptions.appendChild(option);

      const selOption = document.createElement("option");
      selOption.value = person.name;
      selOption.textContent = `${person.name} (${person.initials})`;
      replacementStaffSelect.appendChild(selOption);
    }
    if (currentVal) {
      const identity = resolveStaffIdentity(currentVal);
      const targetName = identity?.name || currentVal;
      const matchOpt = [...replacementStaffSelect.options].find(opt =>
        opt.value.toLowerCase() === targetName.toLowerCase() ||
        (identity && (opt.value.toUpperCase() === identity.initials.toUpperCase() || opt.value === identity.key))
      );
      if (matchOpt) replacementStaffSelect.value = matchOpt.value;
    }
  } else {
    for (const person of people) {
      if (seen.has(person.key)) continue;
      seen.add(person.key);
      const option = document.createElement("option");
      option.value = person.name;
      option.label = `${person.initials} - ${person.name}`;
      staffOptions.appendChild(option);
    }
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
  autoPlannerStaffList.innerHTML = visible.length ? visible.map((person) => {
    const contract = (plannerStaffContracts[person.key] || "PT").toUpperCase();
    const isFt = contract === "FT";
    return `
      <label style="display:flex; align-items:center; justify-content:space-between; width:100%; gap:6px;">
        <span style="display:flex; align-items:center; gap:6px;">
          <input type="checkbox" value="${escapeHtml(person.key)}" ${selectedPlannerStaff.has(person.key) ? "checked" : ""}>
          <span><strong>${escapeHtml(person.name)}</strong><small>${escapeHtml(person.initials)}</small></span>
        </span>
        <button type="button" class="contract-toggle-btn" data-person-key="${escapeHtml(person.key)}" title="Click to toggle contract: FT (160h/mo) / PT (80h/mo)" style="margin-left:auto; font-size:10px; font-weight:700; padding:1px 6px; border-radius:4px; cursor:pointer; border:1px solid ${isFt ? '#2563eb' : '#94a3b8'}; background:${isFt ? '#eff6ff' : '#f8fafc'}; color:${isFt ? '#1d4ed8' : '#475569'};">${contract}</button>
      </label>
    `;
  }).join("") : `<span class="muted">${people.length ? "No staff match this search." : "Run a scan to load staff."}</span>`;

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

  for (const btn of autoPlannerStaffList.querySelectorAll('.contract-toggle-btn')) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const key = btn.dataset.personKey;
      if (!key) return;
      const current = (plannerStaffContracts[key] || "PT").toUpperCase();
      plannerStaffContracts[key] = current === "FT" ? "PT" : "FT";
      savePlannerStaffContracts();
      renderPlannerStaffList();
      if (currentAutoPlan) {
        autoPlannerResult.insertAdjacentHTML("afterbegin", '<div class="planner-notice">Staff contract updated. Rebuild the plan to adjust capacity limits.</div>');
      }
    });
  }

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
  const conflictModeEl = document.getElementById("autoAdjustConflictMode");
  const minBreakEl = document.getElementById("autoAdjustMinBreak");
  const maxMovementsEl = document.getElementById("autoAdjustMaxMovements");
  const minBreakToggleEl = document.getElementById("autoAdjustMinBreakToggle");
  const bufferVal = Math.max(0, Number(document.getElementById("plannerBuffer").value) || 0);

  return {
    maxDutyHours: Number(document.getElementById("plannerMaxHours").value) || 8,
    maxSpanHours: Number(document.getElementById("plannerMaxSpan").value) || 10,
    bufferMinutes: bufferVal,
    breakAfterHours: Number(document.getElementById("plannerBreakAfter").value) || 6,
    breakMinutes: Math.max(0, Number(document.getElementById("plannerBreakLength").value) || 0),
    maxWeeklyHours: Number(document.getElementById("plannerWeeklyHours").value) || 0,
    maxWorkingDaysPerWeek: Number(document.getElementById("plannerWeeklyDays").value) || 7,
    maxMonthlyHours: Number(document.getElementById("plannerMonthlyHours").value) || 0,
    availabilityRules: plannerAvailabilityRules,
    staffContracts: plannerStaffContracts,
    allowedSlas: [...plannerSlas.selectedOptions].map((option) => option.value),
    resolveConflictType: conflictModeEl ? conflictModeEl.value : "both",
    minBreakMinutes: minBreakEl && minBreakEl.value !== "" ? Math.max(0, Number(minBreakEl.value)) : (bufferVal || 30),
    maxAdjustMovements: maxMovementsEl ? Math.max(0, Number(maxMovementsEl.value) || 0) : 0,
    enableAutoAdjust: minBreakToggleEl ? minBreakToggleEl.checked : true,
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
    const shifts = { full: "All day", morning: "Morning 04:00–12:00", evening: "Evening 12:00–23:59", unavailable: "Unavailable", vacation: "Vacation / Leave", custom: `${rule.from}–${rule.to} UTC` };
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

  // Enforce single-day view for timeline grid display
  if (rosterDate.value && rosterEndDate.value !== rosterDate.value) {
    rosterEndDate.value = rosterDate.value;
  }

  const people = new Map(getPlannerPeople().map((person) => [person.key, person]));
  let appliedCount = 0;
  for (const slot of currentAutoPlan.slots.filter((item) => item.personKey)) {
    const targetRow = latestRows.find((row) => OperationsUtils.rowKey(row) === OperationsUtils.rowKey(slot.row));
    const person = people.get(slot.personKey);
    if (!targetRow || !person) continue;
    targetRow.staff = targetRow.staff || [];

    // Accurately check if person is already assigned using isSameStaff
    const isAlreadyAssigned = targetRow.staff.some((label) => isSameStaff(label, person));
    if (isAlreadyAssigned) continue;

    targetRow.staff.push(formatStaffLabel(person));
    targetRow.assigned = targetRow.staff.length;
    targetRow.missing = Math.max(0, Number(targetRow.required || 0) - targetRow.assigned);
    appliedCount += 1;
  }
  currentAutoPlan = null;
  autoPlannerResult.innerHTML = `<div class="planner-applied-message"><strong>Plan added to the edited roster (Single Day View)</strong><span>${appliedCount} assignment${appliedCount === 1 ? "" : "s"} added locally. AVBIS was not changed.</span></div>`;
  setRosterStateMode("edited");
  setRosterViewMode("staff", false);
  animateRosterTileMovements(() => renderRoster());
  setMessage(`Added ${appliedCount} planned assignment${appliedCount === 1 ? "" : "s"} to the edited roster in Single Day View.`, "success");
  if (rosterStaffView) rosterStaffView.scrollIntoView({ behavior: "smooth", block: "nearest" });
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

function animateRosterTileMovements(renderCallback) {
  const container = document.querySelector(".roster-table-wrap") || document.body;
  const tileElements = container.querySelectorAll(".compact-duty[data-row-key]");
  const firstPositions = new Map();

  tileElements.forEach((el) => {
    const key = el.getAttribute("data-row-key");
    const staffCell = el.closest("tr")?.querySelector(".roster-person-cell");
    const staffKey = staffCell ? (staffCell.getAttribute("data-staff-key") || staffCell.textContent.trim()) : "";
    const dutyText = el.textContent.trim();
    if (key) {
      firstPositions.set(`${key}:${staffKey}:${dutyText}`, el.getBoundingClientRect());
    }
  });

  if (typeof renderCallback === "function") {
    renderCallback();
  }

  const newTileElements = container.querySelectorAll(".compact-duty[data-row-key]");
  newTileElements.forEach((el) => {
    const key = el.getAttribute("data-row-key");
    const staffCell = el.closest("tr")?.querySelector(".roster-person-cell");
    const staffKey = staffCell ? (staffCell.getAttribute("data-staff-key") || staffCell.textContent.trim()) : "";
    const dutyText = el.textContent.trim();
    const firstRect = firstPositions.get(`${key}:${staffKey}:${dutyText}`);
    
    if (firstRect) {
      const lastRect = el.getBoundingClientRect();
      const dx = firstRect.left - lastRect.left;
      const dy = firstRect.top - lastRect.top;

      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        el.classList.add("moving", "duty-tile-animating", "shift-moving-highlight");
        
        // Trigger reflow for FLIP transition
        void el.offsetHeight;

        el.style.transform = "";
        setTimeout(() => {
          el.classList.remove("moving", "duty-tile-animating");
        }, 650);
      }
    }
  });
}

function buildAutoAdjustPlan() {
  if (rosterStateMode !== "edited") setRosterStateMode("edited");

  // Enforce single-day view for timeline grid adjustment
  if (rosterDate.value && rosterEndDate.value !== rosterDate.value) {
    rosterEndDate.value = rosterDate.value;
  }

  const roster = getRosterRows();
  if (!roster) return setMessage("Choose a scanned roster date and time window before running auto-adjust.", "warn");

  const autoPlannerCard = autoPlannerRun?.closest(".auto-planner");
  if (autoPlannerCard && autoPlannerCard.classList.contains("collapsed")) {
    autoPlannerCard.classList.remove("collapsed");
    if (autoPlannerToggle) {
      autoPlannerToggle.textContent = "Hide planner";
      autoPlannerToggle.setAttribute("aria-expanded", "true");
    }
    localStorage.setItem("gsrmAutoPlannerCollapsed", "false");
  }

  const options = getPlannerOptions();
  const activeDateIso = rosterDate.value;
  const targetRows = latestRows.filter((r) => !activeDateIso || r.date === activeDateIso);

  const adjustment = OperationsUtils.autoAdjustRoster(targetRows.length ? targetRows : latestRows, latestStaffDirectory, options);
  currentAutoAdjustPlan = adjustment;
  renderAutoAdjustPlan();

  const conflictLabel = options.resolveConflictType === "overlaps_only" 
    ? "duty overlaps" 
    : options.resolveConflictType === "breaks_only" 
    ? "short breaks" 
    : "overlaps & short breaks";

  if (adjustment.reassignments.length > 0) {
    setMessage(`Auto-adjust proposed ${adjustment.reassignments.length} shift movement(s) to resolve ${conflictLabel} on ${activeDateIso || "active date"}.`, "success");
  } else {
    setMessage(`No ${conflictLabel} violations found on ${activeDateIso || "the current roster"} matching requirements (${options.minBreakMinutes}m min break).`, "info");
  }
  autoPlannerResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderAutoAdjustPlan() {
  if (!currentAutoAdjustPlan) return;
  const { reassignments, resolvedViolationsCount, conflictType, minBreakMinutes } = currentAutoAdjustPlan;
  const conflictLabel = conflictType === "overlaps_only" 
    ? "Overlaps Only" 
    : conflictType === "breaks_only" 
    ? "Short Breaks Only" 
    : "Overlaps & Short Breaks";

  if (!reassignments.length) {
    autoPlannerResult.innerHTML = `
      <div class="planner-result-empty" style="padding:16px; background:var(--bg-muted, #f8fafc); border:1px solid var(--border, #cbd5e1); border-radius:8px; color:var(--text, #334155);">
        <strong style="font-size:13px; color:var(--primary, #2563eb);">No ${escapeHtml(conflictLabel)} Violations Found</strong>
        <p style="margin:4px 0 0; font-size:12px; color:var(--muted, #64748b);">All assigned shifts on ${rosterDate.value || "this day"} satisfy the selected ${escapeHtml(conflictLabel.toLowerCase())} criteria (${minBreakMinutes || 30}m min break).</p>
      </div>
    `;
    return;
  }

  const itemsHtml = reassignments.map((item) => `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:var(--surface, #ffffff); border:1px solid var(--border, #e2e8f0); border-radius:6px; margin-bottom:6px; font-size:11px;">
      <div>
        <strong style="color:var(--primary, #2563eb);">${escapeHtml(item.flight)}</strong>
        <span style="margin-left:6px; font-weight:700; color:var(--text, #334155);">(${escapeHtml(item.sla)})</span>
        <span style="margin-left:8px; color:var(--muted, #64748b);">${escapeHtml(item.date)} ${escapeHtml(item.start_utc)}–${escapeHtml(item.release_utc)} UTC</span>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="text-decoration:line-through; color:var(--danger, #ef4444); font-weight:600;">${escapeHtml(item.fromPerson.name)}</span>
        <span style="font-weight:900; color:var(--primary, #2563eb);">&rarr;</span>
        <span style="color:var(--primary-dark, #1d4ed8); font-weight:700; background:var(--bg-muted, #f1f5f9); padding:2px 6px; border-radius:4px; border:1px solid var(--border, #cbd5e1);">${escapeHtml(item.toPerson.name)}</span>
        <small style="color:var(--muted, #64748b); font-weight:600;" title="${escapeHtml(item.reason)}">${escapeHtml(item.reason)}</small>
      </div>
    </div>
  `).join("");

  autoPlannerResult.innerHTML = `
    <div class="auto-adjust-result-card" style="padding:14px; background:var(--bg-muted, #f8fafc); border:1px solid var(--border, #cbd5e1); border-radius:8px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <div>
          <strong style="font-size:13px; color:var(--text, #0f172a);">Auto-Adjust Roster Plan (${escapeHtml(conflictLabel)} &middot; ${minBreakMinutes || 30}m Min Break)</strong>
          <p style="margin:2px 0 0; font-size:11px; color:var(--muted, #64748b);">Resolved ${resolvedViolationsCount} violation(s) across ${reassignments.length} shift movement(s).</p>
        </div>
        <div style="display:flex; gap:8px;">
          <button id="applyAutoAdjustBtn" type="button" class="primary-btn" style="height:32px; font-size:11px; font-weight:700;">Apply to edited roster</button>
          <button id="clearAutoAdjustBtn" type="button" class="secondary-btn" style="height:32px; font-size:11px;">Dismiss</button>
        </div>
      </div>
      <div style="max-height:220px; overflow-y:auto;">${itemsHtml}</div>
    </div>
  `;

  document.getElementById("applyAutoAdjustBtn")?.addEventListener("click", applyAutoAdjustToRoster);
  document.getElementById("clearAutoAdjustBtn")?.addEventListener("click", () => {
    currentAutoAdjustPlan = null;
    autoPlannerResult.textContent = "Adjustments dismissed.";
  });
}

function applyAutoAdjustToRoster() {
  if (!currentAutoAdjustPlan || !currentAutoAdjustPlan.adjustedRows) return;

  // Enforce single-day view
  if (rosterDate.value && rosterEndDate.value !== rosterDate.value) {
    rosterEndDate.value = rosterDate.value;
  }

  const adjustedMap = new Map(currentAutoAdjustPlan.adjustedRows.map((r) => [OperationsUtils.rowKey(r), r]));
  latestRows = latestRows.map((r) => adjustedMap.get(OperationsUtils.rowKey(r)) || r);

  const count = currentAutoAdjustPlan.reassignments.length;
  currentAutoAdjustPlan = null;

  setRosterStateMode("edited");
  setRosterViewMode("staff", false);

  // Apply with smooth FLIP tile movement animation!
  animateRosterTileMovements(() => {
    renderRoster();
  });

  autoPlannerResult.innerHTML = `<div class="planner-applied-message"><strong>Auto-adjust plan applied (Single Day View)</strong><span>${count} shift movement(s) applied to edited roster with minimum breaks enforced.</span></div>`;
  setMessage(`Applied ${count} shift movement(s) to edited roster in Single Day View with smooth tile animations.`, "success");
  if (rosterStaffView) rosterStaffView.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
if (localStorage.getItem("gsrmAutoPlannerCollapsed") !== "false") {
  const autoPlanner = autoPlannerToggle.closest(".auto-planner");
  if (autoPlanner && !autoPlanner.classList.contains("collapsed")) {
    autoPlanner.classList.add("collapsed");
    autoPlannerToggle.textContent = "Show planner";
    autoPlannerToggle.setAttribute("aria-expanded", "false");
  }
}
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

function downloadRosterCsv(overrideMode = null) {
  const mode = overrideMode || rosterStateMode;
  const roster = getRosterRows(mode);
  if (!roster) return;
  if (rosterViewMode === "airline") {
    downloadAirlineRosterCsv(roster, mode);
    return;
  }
  const visible = new Set(JSON.parse(rosterBody.dataset.visibleStaffKeys || "[]"));
  const rows = roster.rows.filter((person) => visible.size === 0 || visible.has(person.key));
  const csv = [
    ["Status", "Initials", "Staff Name", "Date", "Flight", "Direction", "Route", "SLA", "Start UTC", "Release UTC"].join(","),
    ...rows.flatMap((person) => (person.overlapping.length ? person.overlapping : [null]).map((allocation) => [
      person.status === "free" ? "Free" : "On duty", person.initials, person.name,
      allocation?.date || "", allocation?.flight || "", allocation?.direction || "", allocation?.route || "",
      allocation?.sla || "", allocation?.start_utc || "", allocation?.release_utc || "",
    ].map(csvCell).join(","))),
  ].join("\n");
  const dateSuffix = rosterDate.value === rosterEndDate.value ? rosterDate.value : `${rosterDate.value}-to-${rosterEndDate.value}`;
  downloadBlob(`gsrm-${mode}-duty-roster-${dateSuffix}.csv`, csv, "text/csv;charset=utf-8");
}

function downloadAirlineRosterCsv(roster, mode = rosterStateMode) {
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
  downloadBlob(`gsrm-${mode}-flight-schedule-${dateSuffix}.csv`, csv, "text/csv;charset=utf-8");
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
    }

    detailsHtml += `<div class="candidate-detail-item"><strong>SLA Experience:</strong> Worked ${cand.slaExperience} shift(s) of type "${escapeHtml(duty.sla)}"</div>`;

    if (cand.adjacentType) {
      detailsHtml += `<div class="candidate-detail-item" style="color: var(--accent-strong)"><strong>Adjacent shift:</strong> ${escapeHtml(cand.adjacentDetails)}</div>`;
    }

    if (cand.closestDuty) {
      const connectedRaw = cand.closestPosition === "before" ? cand.closestDuty.release_utc : cand.closestDuty.start_utc;
      const connectedAt = getDisplayTime(cand.closestDuty.date, connectedRaw, useLocal);
      detailsHtml += `<div class="candidate-detail-item connection-detail"><strong>Closest duty:</strong> ${escapeHtml(cand.closestDuty.flight)} ${escapeHtml(cand.closestDuty.sla)} · ${escapeHtml(cand.connectionGapMinutes)} min ${escapeHtml(cand.closestPosition)} (${escapeHtml(connectedAt)} ${zoneLabel})</div>`;
    }

    card.innerHTML = `
      <div class="candidate-card-header">
        <div class="candidate-name-wrap">
          <span class="candidate-name">${escapeHtml(cand.initials)} - ${escapeHtml(cand.name)}</span>
          <span class="score-badge ${scoreClass}">Match: ${cand.score}/10</span>
        </div>
        <button type="button" class="candidate-assign-btn" data-cand-initials="${escapeHtml(cand.initials)}" data-cand-name="${escapeHtml(cand.name)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="8.5" cy="7" r="4"/>
            <polyline points="17 11 19 13 23 9"/>
          </svg>
          <span>Assign Replacement</span>
        </button>
      </div>
      <div class="candidate-status-row">
        <span class="status-dot"></span>
        <span>${cand.freeAllDay ? "Free all day in scan" : "Available to cover"}</span>
      </div>
      <div class="candidate-details-grid">
        ${detailsHtml}
      </div>
    `;

    card.querySelector(".candidate-assign-btn")?.addEventListener("click", () => {
      assignCandidateToDuty(duty, cand);
    });

    candidatesList.appendChild(card);
  });
}

function assignCandidateToDuty(duty, cand) {
  const targetRow = latestRows.find((r) => OperationsUtils.rowKey(r) === OperationsUtils.rowKey(duty));
  const initials = (myInitialsInput.value || localStorage.getItem("myInitials") || "").trim();
  const replaceIdentity = resolveStaffIdentity(initials);
  const replaceName = replaceIdentity?.name || initials;

  if (targetRow) {
    targetRow.staff = targetRow.staff || [];
    const formatted = formatStaffLabel(cand);
    const oldIndex = targetRow.staff.findIndex((label) => isSameStaff(label, replaceName) || isSameStaff(label, initials));
    if (oldIndex >= 0) {
      targetRow.staff[oldIndex] = formatted;
    } else if (!targetRow.staff.some((label) => isSameStaff(label, cand.key))) {
      targetRow.staff.push(formatted);
    }
    targetRow.assigned = targetRow.staff.length;
    targetRow.missing = Math.max(0, Number(targetRow.required || 0) - targetRow.assigned);
  }

  currentAutoPlan = null;
  if (autoPlannerResult) autoPlannerResult.textContent = "Roster changed. Create a new plan to use the updated staffing.";

  applyFilters();
  if (typeof renderRoster === "function") renderRoster();
  renderReplacements(true);
  setMessage(`Assigned ${cand.name} (${cand.initials}) to replace ${replaceName} on ${duty.flight} (${duty.sla}).`, "success");
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
  openPdfExportModal();
}

let pdfExportLayoutStyle = "table"; // "table" | "byday"
let pdfExportStaffFilter = "ALL"; // "ALL" or staff identity key

function setPdfExportLayoutStyle(style) {
  pdfExportLayoutStyle = style === "byday" ? "byday" : "table";
  const tableBtn = document.getElementById("pdfLayoutTableBtn");
  const byDayBtn = document.getElementById("pdfLayoutByDayBtn");
  const pdfMetaFormat = document.getElementById("pdfMetaFormat");

  if (tableBtn) tableBtn.classList.toggle("active", pdfExportLayoutStyle === "table");
  if (byDayBtn) byDayBtn.classList.toggle("active", pdfExportLayoutStyle === "byday");
  if (pdfMetaFormat) {
    pdfMetaFormat.textContent = pdfExportLayoutStyle === "byday" ? "A4 Landscape · Staff Schedule (By Day)" : "A4 Landscape · Detailed List";
  }

  updatePdfModalMetaAndPreviews();
}

function updatePdfModalMetaAndPreviews() {
  const pdfMetaRecords = document.getElementById("pdfMetaRecords");
  const staffSelect = document.getElementById("pdfStaffFilterSelect");
  if (staffSelect) {
    pdfExportStaffFilter = staffSelect.value || "ALL";
  }

  if (pdfMetaRecords) {
    if (pdfExportStaffFilter === "ALL") {
      const gapsCount = latestRows.filter((r) => Number(r.missing || 0) > 0).length;
      const totalRecords = activeTab === "history" ? getScanHistory().length : (activeTab === "gaps" ? gapsCount : latestRows.length);
      pdfMetaRecords.textContent = `${totalRecords} rows (All Staff)`;
    } else {
      const filterTarget = parseStaffIdentity(pdfExportStaffFilter);
      const staffName = filterTarget ? filterTarget.name : pdfExportStaffFilter;
      pdfMetaRecords.textContent = `Filtered for ${staffName}`;
    }
  }

  updatePdfModalMockPreviews();
}

function updatePdfModalMockPreviews() {
  const origMock = document.querySelector("#pdfCardOriginal .pdf-page-mock");
  const editMock = document.querySelector("#pdfCardEdited .pdf-page-mock");
  if (!origMock || !editMock) return;

  if (pdfExportLayoutStyle === "byday") {
    origMock.innerHTML = `<div class="pdf-page-header-mock"><div class="pdf-mock-title"></div><div class="pdf-mock-date"></div></div><div class="pdf-mock-divider"></div><div class="pdf-mock-table"><div class="pdf-mock-thead"><div></div><div></div><div></div><div></div></div><div class="pdf-mock-row"></div><div class="pdf-mock-row alt"></div><div class="pdf-mock-row"></div><div class="pdf-mock-row alt"></div></div>`;
    editMock.innerHTML = `<div class="pdf-page-header-mock edited"><div class="pdf-mock-title edited"></div><div class="pdf-mock-date"></div></div><div class="pdf-mock-divider edited"></div><div class="pdf-mock-table"><div class="pdf-mock-thead edited"><div></div><div></div><div></div><div></div></div><div class="pdf-mock-row"></div><div class="pdf-mock-row alt"></div><div class="pdf-mock-row covered"></div><div class="pdf-mock-row alt"></div></div>`;
  } else {
    origMock.innerHTML = `<div class="pdf-page-header-mock"><div class="pdf-mock-title"></div><div class="pdf-mock-date"></div></div><div class="pdf-mock-divider"></div><div class="pdf-mock-table"><div class="pdf-mock-thead"><div></div><div></div><div></div><div></div><div></div></div><div class="pdf-mock-row"></div><div class="pdf-mock-row alt"></div><div class="pdf-mock-row"></div><div class="pdf-mock-row alt"></div></div>`;
    editMock.innerHTML = `<div class="pdf-page-header-mock edited"><div class="pdf-mock-title edited"></div><div class="pdf-mock-date"></div></div><div class="pdf-mock-divider edited"></div><div class="pdf-mock-table"><div class="pdf-mock-thead edited"><div></div><div></div><div></div><div></div><div></div></div><div class="pdf-mock-row"></div><div class="pdf-mock-row alt"></div><div class="pdf-mock-row covered"></div><div class="pdf-mock-row alt"></div></div>`;
  }
}

function configurePdfModalForTab(tab) {
  const layoutBar = document.getElementById("pdfLayoutSelectorBar");
  const layoutGroup = document.getElementById("pdfLayoutSelectorGroup");
  const staffGroup = document.getElementById("pdfStaffSelectorGroup");
  const colGroup = document.getElementById("pdfCustomizerColGroup");
  const airlineField = document.getElementById("pdfAirlineFilterField");
  const subtitleEl = document.getElementById("pdfExportSubtitle");
  const cardOriginal = document.getElementById("pdfCardOriginal");
  const cardEdited = document.getElementById("pdfCardEdited");

  const cardEditedTitle = cardEdited?.querySelector(".pdf-card-title");
  const cardEditedDesc = cardEdited?.querySelector(".pdf-card-desc");
  const downloadEditedBtn = document.getElementById("pdfDownloadEdited");

  // Restore defaults
  if (layoutGroup) layoutGroup.hidden = false;
  if (staffGroup) staffGroup.hidden = false;
  if (layoutBar) layoutBar.hidden = false;
  if (colGroup) colGroup.hidden = false;
  if (airlineField) airlineField.hidden = false;
  if (cardOriginal) cardOriginal.hidden = false;
  if (cardEdited) cardEdited.hidden = false;

  if (cardEditedTitle) cardEditedTitle.textContent = "Edited Roster";
  if (cardEditedDesc) cardEditedDesc.textContent = "Includes all gap notes, coverage status changes, and candidate assignments. The working plan view.";
  if (downloadEditedBtn) downloadEditedBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Edited PDF`;

  switch (tab) {
    case "gaps":
      // Empty Slots / Empty Lists:
      // Staff selection is not needed for empty lists!
      if (staffGroup) staffGroup.hidden = true;
      if (layoutGroup) layoutGroup.hidden = true;
      if (layoutBar) layoutBar.hidden = true;
      pdfExportStaffFilter = "ALL";
      setPdfExportLayoutStyle("table");
      if (subtitleEl) subtitleEl.textContent = "Choose options to export empty slots (gaps) report as PDF";
      if (cardEditedTitle) cardEditedTitle.textContent = "Edited Empty Slots";
      if (cardEditedDesc) cardEditedDesc.textContent = "Includes gap notes, status updates (Covered/Contacted), and candidate assignments.";
      break;

    case "roster":
      // Staff Roster: Keep layout toggle and staff selection
      if (subtitleEl) subtitleEl.textContent = "Choose options to export staff duty roster as PDF";
      break;

    case "replacements":
      // Duty Replacements: Keep staff selection, hide By Day layout (force Detailed List)
      if (layoutGroup) layoutGroup.hidden = true;
      if (subtitleEl) subtitleEl.textContent = "Choose options to export duty replacements report as PDF";
      setPdfExportLayoutStyle("table");
      break;

    case "insights":
      // Workload & Coverage Insights: Keep staff selection, hide layout toggle, hide airline filter & flight column toggles
      if (layoutGroup) layoutGroup.hidden = true;
      if (airlineField) airlineField.hidden = true;
      if (colGroup) colGroup.hidden = true;
      setPdfExportLayoutStyle("table");
      if (subtitleEl) subtitleEl.textContent = "Choose options to export staff workload & coverage insights as PDF";
      if (cardEditedTitle) cardEditedTitle.textContent = "Export Workload Summary";
      if (cardEditedDesc) cardEditedDesc.textContent = "Exports staff duty counts, total hours, weekend/holiday hours, and SLAs covered.";
      break;

    case "history":
      // Scan History: Hide staff selection, layout toggle, airline filter, column toggles
      if (staffGroup) staffGroup.hidden = true;
      if (layoutGroup) layoutGroup.hidden = true;
      if (layoutBar) layoutBar.hidden = true;
      if (airlineField) airlineField.hidden = true;
      if (colGroup) colGroup.hidden = true;
      pdfExportStaffFilter = "ALL";
      setPdfExportLayoutStyle("table");
      if (subtitleEl) subtitleEl.textContent = "Choose options to export scan history snapshots as PDF";
      if (cardEditedTitle) cardEditedTitle.textContent = "Export Scan History";
      if (cardEditedDesc) cardEditedDesc.textContent = "Exports history of all saved scan snapshots, flight counts, and missing position logs.";
      break;

    default:
      if (subtitleEl) subtitleEl.textContent = "Choose options and layout style to export operational data as PDF";
      break;
  }
}

function openPdfExportModal() {
  if (!latestRows.length && activeTab !== "history") {
    return setMessage("No scan data available to export to PDF.", "warn");
  }

  const modal = document.getElementById("pdfExportModal");
  if (!modal) return;

  configurePdfModalForTab(activeTab);

  // Populate staff filter select dropdown
  const staffSelect = document.getElementById("pdfStaffFilterSelect");
  if (staffSelect) {
    const knownStaff = [...getKnownStaffStrings()]
      .map(parseStaffIdentity)
      .filter(Boolean);

    const uniqueStaff = [];
    const seenKeys = new Set();
    knownStaff.forEach((s) => {
      if (!seenKeys.has(s.key)) {
        seenKeys.add(s.key);
        uniqueStaff.push(s);
      }
    });
    uniqueStaff.sort((a, b) => a.name.localeCompare(b.name));

    const currentVal = pdfExportStaffFilter || "ALL";
    staffSelect.innerHTML = `<option value="ALL">All Staff Members (${uniqueStaff.length})</option>`;
    uniqueStaff.forEach((person) => {
      const opt = document.createElement("option");
      opt.value = person.key;
      opt.textContent = `${person.name} (${person.station || person.initials || "MUC"})`;
      staffSelect.appendChild(opt);
    });
    staffSelect.value = uniqueStaff.some((p) => p.key === currentVal) ? currentVal : "ALL";
    pdfExportStaffFilter = staffSelect.value;

    if (!staffSelect.dataset.listenerBound) {
      staffSelect.dataset.listenerBound = "true";
      staffSelect.addEventListener("change", (e) => {
        pdfExportStaffFilter = e.target.value;
        updatePdfModalMetaAndPreviews();
      });
    }
  }

  // Populate airline filter select dropdown
  const airlineSelect = document.getElementById("pdfAirlineFilterSelect");
  if (airlineSelect) {
    const airlines = [...new Set(latestRows.map((r) => OperationsUtils.airlineCode(r)).filter(Boolean))].sort();
    const curAirline = airlineSelect.value || "ALL";
    let optHtml = `<option value="ALL">All Airlines (${airlines.length})</option>`;
    for (const air of airlines) {
      optHtml += `<option value="${escapeHtml(air)}">${escapeHtml(air)}</option>`;
    }
    airlineSelect.innerHTML = optHtml;
    airlineSelect.value = airlines.includes(curAirline) ? curAirline : "ALL";
  }

  setPdfExportLayoutStyle(pdfExportLayoutStyle);

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const tabLabels = {
    gaps: "Empty Slots (Gaps)",
    replacements: "Duty Replacements",
    roster: rosterViewMode === "airline" ? "Flight Schedule Roster" : "Staff Duty Roster",
    insights: "Coverage & Workload Insights",
    history: "Scan Snapshots History",
  };

  const reportTypeName = tabLabels[activeTab] || "Operational Report";

  const pdfMetaType = document.getElementById("pdfMetaType");
  const pdfMetaDate = document.getElementById("pdfMetaDate");
  const pdfOriginalRowCount = document.getElementById("pdfOriginalRowCount");
  const pdfOriginalGapCount = document.getElementById("pdfOriginalGapCount");
  const pdfEditedCoveredCount = document.getElementById("pdfEditedCoveredCount");
  const pdfEditedContactedCount = document.getElementById("pdfEditedContactedCount");
  const pdfEditedOpenCount = document.getElementById("pdfEditedOpenCount");

  const gaps = latestRows.filter((r) => Number(r.missing || 0) > 0);
  const totalRecords = activeTab === "history" ? getScanHistory().length : (activeTab === "gaps" ? gaps.length : latestRows.length);
  const actions = getGapActions();

  let coveredCount = 0;
  let contactedCount = 0;
  let openCount = 0;

  gaps.forEach((g) => {
    const key = OperationsUtils.rowKey(g);
    const act = actions[key];
    const status = act?.status || "Open";
    if (status === "Covered") coveredCount++;
    else if (status === "Contacted") contactedCount++;
    else openCount++;
  });

  if (pdfMetaType) pdfMetaType.textContent = reportTypeName;
  if (pdfMetaDate) pdfMetaDate.textContent = `${dateStr} ${timeStr}`;

  if (pdfOriginalRowCount) pdfOriginalRowCount.textContent = activeTab === "gaps" ? gaps.length : totalRecords;
  if (pdfOriginalGapCount) pdfOriginalGapCount.textContent = gaps.length;

  if (pdfEditedCoveredCount) pdfEditedCoveredCount.textContent = coveredCount;
  if (pdfEditedContactedCount) pdfEditedContactedCount.textContent = contactedCount;
  if (pdfEditedOpenCount) pdfEditedOpenCount.textContent = openCount;

  updatePdfModalMetaAndPreviews();

  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
}

function closePdfExportModal() {
  const modal = document.getElementById("pdfExportModal");
  if (!modal) return;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
}

function exportPdfOriginal() {
  generatePdfDocument({ mode: "original" });
}

function exportPdfEdited() {
  generatePdfDocument({ mode: "edited" });
}

function parseDateSortable(dateStr) {
  if (!dateStr) return 0;
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) return parsed;

  const parts = String(dateStr).trim().split(/[-./\s]+/);
  if (parts.length === 3) {
    const months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
    let d = parseInt(parts[0], 10);
    let m = months[parts[1].toLowerCase()] ?? (parseInt(parts[1], 10) - 1);
    let y = parseInt(parts[2], 10);
    if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
      if (y < 100) y += 2000;
      return Date.UTC(y, m, d);
    }
  }
  return 0;
}

function generatePdfDocument({ mode = "original" } = {}) {
  closePdfExportModal();

  if (!latestRows.length && activeTab !== "history") {
    return setMessage("No scan data available to export to PDF.", "warn");
  }

  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) {
    return exportPdfFallback();
  }

  try {
    const orientationSelect = document.getElementById("pdfOrientationSelect");
    const densitySelect = document.getElementById("pdfDensitySelect");
    const airlineSelect = document.getElementById("pdfAirlineFilterSelect");
    const customHeaderInput = document.getElementById("pdfCustomHeaderInput");

    const orientation = orientationSelect?.value || "landscape";
    const density = densitySelect?.value || "standard";
    const selectedAirline = airlineSelect?.value || "ALL";
    const customHeaderNotes = customHeaderInput?.value?.trim() || "";

    const incRoute = document.getElementById("pdfColRoute") ? document.getElementById("pdfColRoute").checked : true;
    const incAircraft = document.getElementById("pdfColAircraft") ? document.getElementById("pdfColAircraft").checked : true;
    const incNotes = document.getElementById("pdfColNotes") ? document.getElementById("pdfColNotes").checked : true;
    const incSpan = document.getElementById("pdfColSpan") ? document.getElementById("pdfColSpan").checked : true;
    const incHolidays = document.getElementById("pdfColHolidays") ? document.getElementById("pdfColHolidays").checked : true;

    const isPortrait = orientation === "portrait";
    const doc = new jsPDF({ orientation: isPortrait ? "portrait" : "landscape", unit: "mm", format: "a4" });
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    const pageWidth = isPortrait ? 210 : 297;
    const pageHeight = isPortrait ? 297 : 210;
    const rightMarginPos = pageWidth - 14;
    const footerBottomPos = pageHeight - 7;

    const isEdited = mode === "edited";
    const modeBadge = isEdited ? "EDITED ROSTER" : "ORIGINAL SCAN";
    const modeDesc = isEdited ? "Working Plan with Gap Edits & Coverage Assignments" : "Raw AVBIS Scan Snapshot";

    const titles = {
      gaps: isEdited ? "GSRM Empty Slots Report (Edited Working Plan)" : "GSRM Empty Slots Report (Original Scan Data)",
      replacements: isEdited ? "GSRM Duty Replacements Report (Edited)" : "GSRM Duty Replacements Report (Original)",
      roster: rosterViewMode === "airline"
        ? (isEdited ? "GSRM Flight Schedule Report (Edited)" : "GSRM Flight Schedule Report (Original)")
        : (isEdited ? "GSRM Staff Duty Roster (Edited)" : "GSRM Staff Duty Roster (Original)"),
      insights: isEdited ? "GSRM Workload & Coverage Insights (Edited)" : "GSRM Workload & Coverage Insights (Original)",
      history: "GSRM Scan Snapshots History Report",
    };
    const titleText = titles[activeTab] || `GSRM Operational Report (${modeBadge})`;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(titleText, 14, 11);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    if (isEdited) {
      doc.setTextColor(22, 101, 52);
    } else {
      doc.setTextColor(51, 65, 85);
    }
    doc.text(`[ ${modeBadge} — ${modeDesc} ]`, 14, 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${dateStr} ${timeStr} UTC`, rightMarginPos, 11, { align: "right" });

    let headerDividerY = 17;
    if (customHeaderNotes) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text(`Notes: ${customHeaderNotes}`, 14, 18.5);
      headerDividerY = 21;
    }

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(14, headerDividerY, rightMarginPos, headerDividerY);

    let tableHeaders = [];
    let exportRows = [];
    let columnStyles = {};

    const actions = getGapActions();

    // Filter by airline if selected
    let sourceScanRows = (mode === "original" && originalRows && originalRows.length)
      ? originalRows
      : ((filteredRows && filteredRows.length) ? filteredRows : latestRows);
    if (selectedAirline && selectedAirline !== "ALL") {
      sourceScanRows = sourceScanRows.filter((r) => OperationsUtils.airlineCode(r) === selectedAirline || (r.flight || "").startsWith(selectedAirline));
    }

    // Group / sort rows chronologically by Date first, then by Flight / Airline Number, then by Start UTC time (ONLY FOR PDF EXPORT)
    sourceScanRows = [...sourceScanRows].sort((a, b) => {
      const dateA = parseDateSortable(a.date);
      const dateB = parseDateSortable(b.date);
      if (dateA !== dateB) return dateA - dateB;

      const flightA = String(a.flight || "").trim().toUpperCase();
      const flightB = String(b.flight || "").trim().toUpperCase();
      if (flightA !== flightB) return flightA.localeCompare(flightB, undefined, { numeric: true });

      return String(a.start_utc || "").localeCompare(String(b.start_utc || ""));
    });

    // Filter for Empty Slots (Gaps) tab so ONLY flights/airlines with actual missing positions (missing > 0) are exported
    if (activeTab === "gaps" || (!["replacements", "roster", "insights", "history"].includes(activeTab))) {
      sourceScanRows = sourceScanRows.filter((r) => Number(r.missing || 0) > 0);
    }

    if (activeTab === "replacements") {
      tableHeaders = [["Date", "Flight", "Dir", "Route", "SLA", "Start UTC", "Release UTC", "Duration", "Candidates", "Top Candidate / Assignment", "Status"]];
      const initials = myInitialsInput.value.trim().toUpperCase();
      const myDuties = sourceScanRows.filter((row) => row.staff && row.staff.some((s) => matchStaffMember(s, initials)));
      const maxGapMinutes = getMaxDutyGap().minutes;
      const maxGapMs = maxGapMinutes * 60 * 1000;

      exportRows = myDuties.map((duty) => {
        const dutyStart = parseUtcTime(duty.date, duty.start_utc);
        const dutyRelease = parseUtcTime(duty.date, duty.release_utc);
        const key = OperationsUtils.rowKey(duty);
        const act = actions[key];

        const candidates = [];
        for (const candStr of getKnownStaffStrings()) {
          const identity = parseStaffIdentity(candStr);
          if (!identity || matchStaffMember(candStr, initials)) continue;
          const shifts = sourceScanRows.filter((r) => r.staff && r.staff.some((s) => parseStaffIdentity(s)?.key === identity.key));
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
        
        let matchText = candidates[0] ? `${candidates[0].name} (${candidates[0].freeAllDay ? "Free all day" : `${formatHours(candidates[0].connectionGapMinutes)}h gap`})` : "None available";
        let statusText = "Unassigned";

        if (isEdited && act) {
          if (act.assignedCandidate) {
            matchText = `ASSIGNED: ${act.assignedCandidate}`;
          }
          if (act.status) {
            statusText = act.status;
          }
        }

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
          matchText,
          statusText
        ];
      });

    } else if (activeTab === "roster") {
      const roster = getRosterRows(mode);
      if (rosterViewMode === "airline") {
        tableHeaders = [["Date", "Flight", "Dir", "Route", "Aircraft", "Sch. UTC", "SLA", "Start UTC", "Release UTC", "Req / Asgd", "Allocated Staff"]];
        const days = getAirlineRosterDays(roster);
        exportRows = days.flatMap((day) => day.flights
          .filter((f) => selectedAirline === "ALL" || (f.airlineCode || f.flight.slice(0, 2)) === selectedAirline)
          .flatMap((flight) => flight.duties.map((duty) => [
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
      } else {
        tableHeaders = [["Status", "Initials", "Staff Name", "Date", "Flight", "Direction", "Route", "SLA", "Start UTC", "Release UTC"]];
        const visible = new Set(JSON.parse(rosterBody.dataset.visibleStaffKeys || "[]"));
        const people = (roster?.rows || []).filter((person) => visible.has(person.key));
        exportRows = people.flatMap((person) => {
          const allocs = person.overlapping.filter((a) => selectedAirline === "ALL" || OperationsUtils.airlineCode(a) === selectedAirline);
          return (allocs.length ? allocs : [null]).map((alloc) => [
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
          ]);
        });
      }

    } else if (activeTab === "insights") {
      tableHeaders = [["Staff Member", "Initials", "Duties", "Total Hours", "Weekday", "Saturday", "Sunday", "Holiday", "SLAs Covered", "Max Span"]];
      const analytics = OperationsUtils.buildAnalytics(sourceScanRows, latestStaffDirectory);
      const roster = getRosterRows(mode);
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

    } else {
      // Default: Gaps / Empty Slots
      if (isEdited) {
        tableHeaders = [["Date", "Flight", "Dir", "Route", "SLA", "Req", "Asgd", "Miss", "Start UTC", "Release UTC", "Action Status", "Notes / Replacement"]];
        exportRows = sourceScanRows.map((r) => {
          const key = OperationsUtils.rowKey(r);
          const act = actions[key] || {};
          const status = act.status || (Number(r.missing || 0) === 0 ? "Covered" : "Open");
          let noteDetails = [];
          if (act.assignedCandidate && incNotes) noteDetails.push(`Candidate: ${act.assignedCandidate}`);
          if (act.notes && incNotes) noteDetails.push(act.notes);
          const noteStr = noteDetails.join(" | ") || "—";

          return [
            r.date || "",
            r.flight || "",
            r.direction || "",
            incRoute ? (r.route || "") : "—",
            r.sla || "",
            r.required || 0,
            r.assigned || 0,
            r.missing || 0,
            r.start_utc || "",
            r.release_utc || "",
            status,
            noteStr
          ];
        });
      } else {
        tableHeaders = [["Date", "Flight", "Dir", "Route", "SLA", "Req", "Assigned", "Missing", "Start UTC", "Release UTC", "Duration"]];
        exportRows = sourceScanRows.map((r) => [
          r.date || "",
          r.flight || "",
          r.direction || "",
          incRoute ? (r.route || "") : "—",
          r.sla || "",
          r.required || 0,
          r.assigned || 0,
          r.missing || 0,
          r.start_utc || "",
          r.release_utc || "",
          r.duration || ""
        ]);
      }
    }

    // Ensure Gaps PDF report exclusively exports rows with actual missing capacity (missing > 0)
    if (activeTab === "gaps" || (!["replacements", "roster", "insights", "history"].includes(activeTab))) {
      exportRows = exportRows.filter((row) => Number(row[7] || 0) > 0);
    }

    // Apply staff scope filter if selected
    if (pdfExportStaffFilter && pdfExportStaffFilter !== "ALL") {
      const filterTarget = parseStaffIdentity(pdfExportStaffFilter) || { key: pdfExportStaffFilter, name: pdfExportStaffFilter };
      const targetKey = filterTarget.key;
      const targetName = (filterTarget.name || filterTarget.key).toLowerCase();

      exportRows = exportRows.filter((row) => {
        return row.some((cell) => {
          const strCell = String(cell || "");
          const cellId = parseStaffIdentity(strCell);
          if (cellId && cellId.key === targetKey) return true;
          return strCell.toLowerCase().includes(targetName);
        });
      });
    }

    if (!exportRows.length) {
      return setMessage(`No matching data available on the ${activeTab} tab to export to PDF.`, "warn");
    }

    let staffSuffixBadge = "";
    let staffFilenameSuffix = "";
    if (pdfExportStaffFilter && pdfExportStaffFilter !== "ALL") {
      const filterTarget = parseStaffIdentity(pdfExportStaffFilter);
      const sName = filterTarget ? filterTarget.name : pdfExportStaffFilter;
      staffSuffixBadge = ` · Staff: ${sName}`;
      staffFilenameSuffix = `-${sName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    }

    const isCompact = density === "compact";
    const bodyFontSize = isCompact ? 7 : 8;
    const headFontSize = isCompact ? 7.5 : 8.5;
    const cellPad = isCompact ? 1.5 : 2.5;

    if (pdfExportLayoutStyle === "byday") {
      generatePdfStaffByDayView({ doc, isEdited, modeBadge, titleText, dateStr, timeStr, mode });
    } else {
      let lastGroupFlight = null;

      doc.autoTable({
        head: tableHeaders,
        body: exportRows,
        startY: headerDividerY + 3,
        margin: { left: 14, right: 14, top: headerDividerY + 3, bottom: 14 },
        theme: "grid",
        headStyles: {
          fillColor: isEdited ? [20, 83, 45] : [30, 41, 59],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: headFontSize,
          cellPadding: cellPad,
          halign: "left"
        },
        bodyStyles: {
          fontSize: bodyFontSize,
          cellPadding: cellPad,
          textColor: [30, 41, 59]
        },
        alternateRowStyles: {
          fillColor: isEdited ? [240, 253, 244] : [248, 250, 252]
        },
        didParseCell: (data) => {
          if (data.section !== "body") return;

          const headerTitle = String(tableHeaders[0]?.[data.column.index] || "").trim();
          const rawVal = String(data.cell.raw || "").trim();

          // 1. SLA Column Badge Colors
          if (headerTitle === "SLA") {
            const slaStyle = getSlaColorStyle(rawVal);
            if (slaStyle && slaStyle.bg) {
              data.cell.styles.fillColor = slaStyle.bg;
              data.cell.styles.textColor = slaStyle.text;
              data.cell.styles.fontStyle = "bold";
              data.cell.styles.halign = "center";
            }
          }

          // 2. Action Status / Missing Position Column
          if (headerTitle === "Action Status" || headerTitle === "Status" || headerTitle === "Miss" || headerTitle === "Missing") {
            const numMiss = Number(rawVal);
            if (rawVal === "Covered" || (headerTitle.startsWith("Miss") && numMiss === 0)) {
              data.cell.styles.fillColor = [240, 253, 244];
              data.cell.styles.textColor = [22, 101, 52];
              data.cell.styles.fontStyle = "bold";
              data.cell.styles.halign = "center";
            } else if (rawVal === "Contacted") {
              data.cell.styles.fillColor = [239, 246, 255];
              data.cell.styles.textColor = [29, 78, 216];
              data.cell.styles.fontStyle = "bold";
              data.cell.styles.halign = "center";
            } else if (rawVal === "Open" || rawVal === "Unassigned" || (headerTitle.startsWith("Miss") && numMiss > 0)) {
              data.cell.styles.fillColor = [254, 242, 242];
              data.cell.styles.textColor = [185, 28, 28];
              data.cell.styles.fontStyle = "bold";
              data.cell.styles.halign = "center";
            }
          }

          // 3. Flight Column Bold & Grouping Boundary Accent
          if (headerTitle === "Flight") {
            data.cell.styles.fontStyle = "bold";
            data.cell.styles.textColor = [15, 23, 42];
          }
        },
        didDrawPage: (data) => {
          const pageCount = doc.internal.getNumberOfPages();
          doc.setFontSize(7.5);
          doc.setTextColor(148, 163, 184);
          doc.text(`Page ${data.pageNumber} of ${pageCount}`, rightMarginPos, footerBottomPos, { align: "right" });
          doc.text(`${titleText}  |  ${modeBadge}${staffSuffixBadge}`, 14, footerBottomPos);
        }
      });
    }

    const styleName = pdfExportLayoutStyle === "byday" ? "staff-schedule-by-day" : "list";
    const filename = `gsrm-${activeTab}-${mode}-${styleName}${staffFilenameSuffix}-${now.toISOString().slice(0, 10)}.pdf`;
    doc.save(filename);
    setMessage(`PDF report (${modeBadge} · ${pdfExportLayoutStyle === "byday" ? "Staff Schedule By Day" : "Detailed List"}${staffSuffixBadge}) generated: ${filename}`, "success");
  } catch (err) {
    console.error("PDF generation error:", err);
    exportPdfFallback();
  }
}

function getSlaColorStyle(slaRaw) {
  const sla = String(slaRaw || "").trim().toUpperCase();
  const slaColorMap = {
    "CKIN":    { bg: [239, 246, 255], text: [30, 64, 175],  accent: [37, 99, 235] },   // Blue
    "GATE":    { bg: [250, 245, 255], text: [107, 33, 168], accent: [124, 58, 237] },  // Purple
    "LOFO":    { bg: [255, 251, 235], text: [146, 64, 14],  accent: [217, 119, 6] },   // Amber
    "QH-CKI":  { bg: [236, 254, 255], text: [21, 94, 117],  accent: [8, 145, 178] },   // Cyan
    "QH-GATE": { bg: [253, 242, 248], text: [157, 23, 77],  accent: [219, 39, 119] },  // Pink
    "ASVC":    { bg: [236, 253, 245], text: [6, 95, 70],    accent: [5, 150, 105] },   // Emerald
    "SECS":    { bg: [254, 242, 242], text: [153, 27, 27],  accent: [220, 38, 38] }    // Red
  };

  if (slaColorMap[sla]) return slaColorMap[sla];

  if (sla.includes("CKIN") || sla.includes("CHECK")) return slaColorMap["CKIN"];
  if (sla.includes("GATE")) return slaColorMap["GATE"];
  if (sla.includes("LOFO") || sla.includes("BAG") || sla.includes("RAMP")) return slaColorMap["LOFO"];
  if (sla.includes("SEC")) return slaColorMap["SECS"];
  if (sla.includes("ASVC") || sla.includes("ARR") || sla.includes("DEP")) return slaColorMap["ASVC"];

  return { bg: [241, 245, 249], text: [15, 23, 42], accent: [100, 116, 139] };
}

function extractSlaFromCellRaw(cellRaw) {
  const str = String(cellRaw || "");
  const match = str.match(/\(([^)]+)\)/);
  return match ? match[1].trim() : str;
}

function generatePdfStaffByDayView({ doc, isEdited, modeBadge, titleText, dateStr, timeStr, mode = "original" }) {
  const rosterData = typeof getRosterRows === "function" ? getRosterRows(mode) : null;
  let datesList = [];
  let staffList = [];

  if (rosterData && rosterData.dailyWindows && rosterData.dailyWindows.length > 0 && rosterData.rows && rosterData.rows.length > 0) {
    datesList = rosterData.dailyWindows.map((w) => w.isoDate);
    staffList = rosterData.rows.map((person) => {
      const dayDutyCells = rosterData.dailyWindows.map((w, idx) => {
        const assignments = person.byDay[idx] || [];
        if (!assignments.length) return "OFF";
        return assignments.map((a) => `${a.flight || "Duty"} (${a.sla || "SLA"})\n${a.start_utc || ""}–${a.release_utc || ""} UTC`).join("\n---\n");
      });
      const summary = typeof OperationsUtils !== "undefined" && OperationsUtils.summarizeDutyHours ? OperationsUtils.summarizeDutyHours(person.overlapping, rosterData.dailyWindows) : null;
      const totalHours = summary && summary.totalMinutes ? `${formatHours(summary.totalMinutes)}h` : "0.0h";
      return [
        person.name || "Unknown Staff",
        person.station || person.initials || "MUC",
        ...dayDutyCells,
        totalHours
      ];
    });
  } else {
    // Fallback: aggregate staff assignments directly from originalRows when mode === original
    const sourceRows = (mode === "original" && originalRows && originalRows.length)
      ? originalRows
      : ((typeof filteredRows !== "undefined" && filteredRows && filteredRows.length) ? filteredRows : latestRows);
    const dateSet = new Set();
    const staffMap = new Map();

    if (typeof latestStaffDirectory !== "undefined") {
      latestStaffDirectory.forEach((sStr) => {
        const id = parseStaffIdentity(sStr);
        if (id && !staffMap.has(id.key)) {
          staffMap.set(id.key, { name: id.name, station: id.station || "MUC", assignmentsByDate: {} });
        }
      });
    }

    sourceRows.forEach((r) => {
      if (r.date) dateSet.add(r.date);
      (r.staff || []).forEach((sStr) => {
        const id = parseStaffIdentity(sStr);
        if (!id) return;
        if (!staffMap.has(id.key)) {
          staffMap.set(id.key, { name: id.name, station: id.station || "MUC", assignmentsByDate: {} });
        }
        const person = staffMap.get(id.key);
        if (!person.assignmentsByDate[r.date]) person.assignmentsByDate[r.date] = [];
        person.assignmentsByDate[r.date].push(r);
      });
    });

    datesList = Array.from(dateSet).sort();
    if (!datesList.length) datesList = [new Date().toISOString().slice(0, 10)];

    staffList = Array.from(staffMap.values()).map((person) => {
      let totalMins = 0;
      const dayCells = datesList.map((d) => {
        const duties = person.assignmentsByDate[d] || [];
        if (!duties.length) return "OFF";
        return duties.map((r) => {
          if (r.duration) {
            const parts = String(r.duration).split(":");
            if (parts.length === 2) totalMins += parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
          }
          return `${r.flight || "Flight"} (${r.sla || "SLA"})\n${r.start_utc || ""}–${r.release_utc || ""} UTC`;
        }).join("\n---\n");
      });
      const totalHours = totalMins > 0 ? `${(totalMins / 60).toFixed(1)}h` : "0.0h";
      return [
        person.name || "Unknown Staff",
        person.station || "MUC",
        ...dayCells,
        totalHours
      ];
    });
  }

  // Filter staffList if staff filter is active
  let staffSuffixBadge = "";
  if (pdfExportStaffFilter && pdfExportStaffFilter !== "ALL") {
    const filterTarget = parseStaffIdentity(pdfExportStaffFilter) || { key: pdfExportStaffFilter, name: pdfExportStaffFilter };
    const targetKey = filterTarget.key;
    const targetName = (filterTarget.name || filterTarget.key).toLowerCase();

    staffList = staffList.filter((row) => {
      const rowKey = parseStaffIdentity(row[0])?.key;
      return rowKey === targetKey || row[0].toLowerCase().includes(targetName);
    });
    staffSuffixBadge = ` · Staff: ${filterTarget.name || filterTarget.key}`;
  }

  // Format date header strings
  const dateHeaders = datesList.map((d) => {
    try {
      const dt = new Date(`${d}T00:00:00Z`);
      return dt.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" });
    } catch (e) {
      return d;
    }
  });

  const tableHeaders = [["Staff Member", "Station", ...dateHeaders, "Total Duty"]];

  doc.autoTable({
    head: tableHeaders,
    body: staffList,
    startY: 20,
    margin: { left: 14, right: 14, top: 20, bottom: 14 },
    theme: "grid",
    headStyles: {
      fillColor: isEdited ? [20, 83, 45] : [30, 41, 59],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8.5,
      halign: "center"
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 41, 59],
      valign: "middle"
    },
    alternateRowStyles: {
      fillColor: isEdited ? [240, 253, 244] : [248, 250, 252]
    },
    didParseCell: (data) => {
      if (data.section === "body") {
        if (data.column.index === 0) {
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.textColor = [15, 23, 42];
        } else if (data.column.index === 1) {
          data.cell.styles.halign = "center";
          data.cell.styles.textColor = [100, 116, 139];
        } else if (data.column.index === data.table.columns.length - 1) {
          data.cell.styles.halign = "center";
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.textColor = [2, 132, 199];
        } else {
          data.cell.styles.cellPadding = { top: 2.0, right: 2.0, bottom: 2.0, left: 2.5 };
        }
      }
    },
    willDrawCell: (data) => {
      if (data.section === "body" && data.column.index >= 2 && data.column.index < data.table.columns.length - 1) {
        const raw = data.cell.raw;
        if (typeof raw === "string" && raw) {
          const cellX = data.cell.x;
          const cellY = data.cell.y;
          const cellWidth = data.cell.width;
          const cellHeight = data.cell.height;

          // Clear cell background to standard row color
          const rowBg = data.row.index % 2 === 1
            ? (isEdited ? [240, 253, 244] : [248, 250, 252])
            : [255, 255, 255];
          doc.setFillColor(rowBg[0], rowBg[1], rowBg[2]);
          doc.rect(cellX, cellY, cellWidth, cellHeight, "F");

          if (raw === "OFF") {
            doc.setFontSize(7);
            doc.setFont("helvetica", "italic");
            doc.setTextColor(148, 163, 184);
            doc.text("OFF", cellX + cellWidth / 2, cellY + cellHeight / 2 + 1, { align: "center" });
            doc.setDrawColor(226, 232, 240);
            doc.setLineWidth(0.1);
            doc.rect(cellX, cellY, cellWidth, cellHeight, "S");
            return false;
          }

          // Handle single or multi-shift blocks individually
          const shiftBlocks = raw.split(/\n?---\n?/).map((s) => s.trim()).filter(Boolean);
          const numShifts = shiftBlocks.length;
          const paddingY = 1.0;
          const availHeight = cellHeight - paddingY * 2;
          const gapY = numShifts > 1 ? 1.5 : 0;
          const blockHeight = numShifts > 1 ? Math.max(5.0, (availHeight - (numShifts - 1) * gapY) / numShifts) : availHeight;

          shiftBlocks.forEach((block, idx) => {
            const blockLines = block.split("\n").map((l) => l.trim()).filter(Boolean);
            const line0 = blockLines[0] || ""; // e.g. "DE1234 (CKIN)"
            const line1 = blockLines[1] || ""; // e.g. "08:00–12:00 UTC"

            const slaStr = extractSlaFromCellRaw(line0);
            const slaStyle = getSlaColorStyle(slaStr);

            const blockY = cellY + paddingY + idx * (blockHeight + gapY);

            // 1. Fill Shift Box Background with SLA Tint
            doc.setFillColor(slaStyle.bg[0], slaStyle.bg[1], slaStyle.bg[2]);
            doc.rect(cellX + 0.6, blockY, cellWidth - 1.2, blockHeight, "F");

            // 2. Fill Left SLA Accent Stripe
            doc.setFillColor(slaStyle.accent[0], slaStyle.accent[1], slaStyle.accent[2]);
            doc.rect(cellX + 0.6, blockY, 1.4, blockHeight, "F");

            // 3. Render Shift Header (Flight + SLA)
            doc.setFontSize(numShifts > 1 ? 6.2 : 6.8);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(slaStyle.text[0], slaStyle.text[1], slaStyle.text[2]);
            const headerY = line1 ? (blockY + (numShifts > 1 ? 2.6 : 3.2)) : (blockY + blockHeight / 2 + 1);
            doc.text(line0, cellX + 2.8, headerY);

            // 4. Render Time Window (UTC)
            if (line1) {
              doc.setFont("helvetica", "normal");
              doc.setFontSize(numShifts > 1 ? 5.6 : 6.2);
              doc.setTextColor(51, 65, 85);
              const timeY = blockY + (numShifts > 1 ? 5.4 : 6.8);
              doc.text(line1, cellX + 2.8, timeY);
            }

            // 5. Divider line between multiple shifts
            if (idx < numShifts - 1) {
              const divY = blockY + blockHeight + (gapY / 2);
              doc.setDrawColor(203, 213, 225);
              doc.setLineWidth(0.15);
              doc.line(cellX + 1.2, divY, cellX + cellWidth - 1.2, divY);
            }
          });

          // Outer Grid Border Line
          doc.setDrawColor(226, 232, 240);
          doc.setLineWidth(0.1);
          doc.rect(cellX, cellY, cellWidth, cellHeight, "S");

          return false; // Skip autoTable default drawing for this cell
        }
      }
    },
    didDrawPage: (data) => {
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`Page ${data.pageNumber} of ${pageCount}`, 283, 203, { align: "right" });
      doc.text(`${titleText}  |  ${modeBadge}${staffSuffixBadge} (Staff Schedule By Day)`, 14, 203);
    }
  });
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

let latestAnalyticsWarnings = [];
let currentWarningFilter = "all";
let currentWarningSearch = "";

function filterAndRenderWarnings(warnings = latestAnalyticsWarnings) {
  latestAnalyticsWarnings = warnings;
  const container = document.getElementById("rosterWarnings");
  const subLabel = document.getElementById("warningsCountSub");
  if (!container) return;

  const query = (currentWarningSearch || "").toLowerCase().trim();
  const filtered = (warnings || []).filter((warning) => {
    if (currentWarningFilter === "overlap" && !warning.type.toLowerCase().includes("overlap")) return false;
    if (currentWarningFilter === "gap" && !warning.type.toLowerCase().includes("gap") && !warning.type.toLowerCase().includes("turnaround")) return false;
    if (currentWarningFilter === "span" && !warning.type.toLowerCase().includes("span") && !warning.type.toLowerCase().includes("hours")) return false;

    if (query) {
      const typeMatch = (warning.type || "").toLowerCase().includes(query);
      const textMatch = (warning.text || "").toLowerCase().includes(query);
      const personMatch = (warning.person?.name || "").toLowerCase().includes(query);
      return typeMatch || textMatch || personMatch;
    }
    return true;
  });

  if (subLabel) {
    subLabel.textContent = `Showing ${filtered.length} of ${warnings.length} roster compliance & risk alerts`;
  }

  if (!filtered.length) {
    container.innerHTML = `<div class="empty-selection" style="padding: 16px; text-align: center; color: var(--muted); font-size: 11px;">${query || currentWarningFilter !== "all" ? "No roster warnings match current filter criteria." : "No overlap, short-gap, long-span, or invalid-time warnings found."}</div>`;
    return;
  }

  container.innerHTML = filtered.slice(0, 60).map((warning) => {
    const personKey = warning.person?.key || "";
    const personName = warning.person?.name || warning.person?.initials || "";
    const isHigh = warning.severity === "high";
    const badgeText = isHigh ? "High Risk" : "Warning";
    return `
      <div class="warning-item ${escapeHtml(warning.severity)}" ${personKey ? `data-person-key="${escapeHtml(personKey)}"` : ""} ${personName ? `data-person-name="${escapeHtml(personName)}"` : ""} title="Click to open ${escapeHtml(personName || "shift")} in Duty Roster" style="cursor: pointer;">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 2px;">
          <strong style="display: flex; align-items: center; gap: 6px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            ${escapeHtml(warning.type)}
          </strong>
          <span class="badge" style="font-size: 9px; padding: 1px 5px; font-weight: 700; ${isHigh ? 'background:#fecaca; color:#991b1b;' : 'background:#fef3c7; color:#92400e;'}">${badgeText}</span>
        </div>
        <span>${escapeHtml(warning.text)}</span>
      </div>
    `;
  }).join("");

  initRosterWarningsDelegation();
}

function renderInsights() {
  const analytics = OperationsUtils.buildAnalytics(latestRows, latestStaffDirectory);
  const staffReqs = OperationsUtils.calculateStaffRequirements(latestRows, latestStaffDirectory, { staffContracts: plannerStaffContracts });

  // Update Header Banner Metadata
  const periodMeta = document.getElementById("insightsMetaPeriod");
  if (periodMeta && latestScannedDates.length) {
    const startStr = latestScannedDates[0];
    const endStr = latestScannedDates[latestScannedDates.length - 1];
    periodMeta.textContent = `Period: ${startStr === endStr ? startStr : `${startStr} to ${endStr}`}`;
  }
  const modeMeta = document.getElementById("insightsMetaMode");
  if (modeMeta) {
    modeMeta.textContent = `Roster: ${rosterStateMode === "edited" ? "Edited Roster" : "Original Roster"}`;
  }

  // 1. Render Top Executive KPI Cards
  const cardsContainer = document.getElementById("insightCards");
  if (cardsContainer) {
    cardsContainer.className = "insight-cards-grid";
    cardsContainer.innerHTML = `
      <div class="kpi-card kpi-card-danger">
        <div class="kpi-card-header">
          <span class="kpi-card-label">Uncovered Gaps</span>
          <div class="kpi-card-icon danger">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
        </div>
        <div class="kpi-card-body">
          <div class="kpi-card-value">${escapeHtml(analytics.missingPositions)} <small class="kpi-unit">positions</small></div>
          <div class="kpi-card-subtext"><strong>${escapeHtml(analytics.gapGroups)}</strong> gap groups · <strong>${analytics.missingHours.toFixed(1)}h</strong> missing</div>
        </div>
      </div>

      <div class="kpi-card kpi-card-warning">
        <div class="kpi-card-header">
          <span class="kpi-card-label">Roster Warnings</span>
          <div class="kpi-card-icon warning">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
        </div>
        <div class="kpi-card-body">
          <div class="kpi-card-value">${escapeHtml(analytics.warnings.length)} <small class="kpi-unit">alerts</small></div>
          <div class="kpi-card-subtext">Overlaps, short gaps &amp; long daily spans</div>
        </div>
      </div>

      <div class="kpi-card kpi-card-blue">
        <div class="kpi-card-header">
          <span class="kpi-card-label">Headcount Needed</span>
          <div class="kpi-card-icon blue">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </div>
        <div class="kpi-card-body">
          <div class="kpi-card-value">${escapeHtml(staffReqs.fteNeeded)} <small class="kpi-unit">FTE</small> / ${escapeHtml(staffReqs.pteNeeded)} <small class="kpi-unit">PTE</small></div>
          <div class="kpi-card-subtext">Contract capacity allocation model</div>
        </div>
      </div>

      <div class="kpi-card kpi-card-emerald">
        <div class="kpi-card-header">
          <span class="kpi-card-label">Capacity Utilization</span>
          <div class="kpi-card-icon emerald">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
        </div>
        <div class="kpi-card-body">
          <div class="kpi-card-value">${escapeHtml(staffReqs.capacityUtilization)}%</div>
          <div class="kpi-progress-bar">
            <div class="kpi-progress-fill" style="width: ${Math.min(100, Math.max(0, staffReqs.capacityUtilization))}%"></div>
          </div>
          <div class="kpi-card-subtext">${escapeHtml(staffReqs.totalDutyHours)}h duty / ${escapeHtml(staffReqs.monthlyStaffCapacityHours)}h max</div>
        </div>
      </div>

      <div class="kpi-card kpi-card-purple">
        <div class="kpi-card-header">
          <span class="kpi-card-label">Sunday Shift Burden</span>
          <div class="kpi-card-icon purple">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
        </div>
        <div class="kpi-card-body">
          <div class="kpi-card-value">${escapeHtml(staffReqs.avgSundayShiftsPerStaff)} <small class="kpi-unit">avg/staff</small></div>
          <div class="kpi-card-subtext"><strong>${escapeHtml(staffReqs.sundayShiftCount)}</strong> total Sunday shifts</div>
        </div>
      </div>

      <div class="kpi-card kpi-card-indigo">
        <div class="kpi-card-header">
          <span class="kpi-card-label">Station Master Staff</span>
          <div class="kpi-card-icon indigo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </div>
        <div class="kpi-card-body">
          <div class="kpi-card-value" id="kpiMasterStaffValue">${getMasterStaffDirectory().length} <small class="kpi-unit">staff</small></div>
          <div class="kpi-card-subtext">Known station roster directory</div>
        </div>
      </div>
    `;
  }

  // 2. Render Metric Bars
  renderMetricBars(document.getElementById("coverageByDate"), analytics.byDate, "date");
  renderMetricBars(document.getElementById("coverageBySla"), analytics.bySla, "sla");
  renderMetricBars(document.getElementById("coverageByHour"), analytics.byHour.map((item) => ({ ...item, key: `${item.key}:00` })), "hour");

  // 3. Render Warnings Monitor
  filterAndRenderWarnings(analytics.warnings);

  // Setup Warning Filter listeners if not already attached
  const warningSearchInput = document.getElementById("insightsWarningsSearch");
  if (warningSearchInput && !warningSearchInput.dataset.listenerAttached) {
    warningSearchInput.dataset.listenerAttached = "true";
    warningSearchInput.addEventListener("input", (e) => {
      currentWarningSearch = e.target.value;
      filterAndRenderWarnings();
    });
  }

  const warningChipsGroup = document.getElementById("warningFilterGroup");
  if (warningChipsGroup && !warningChipsGroup.dataset.listenerAttached) {
    warningChipsGroup.dataset.listenerAttached = "true";
    warningChipsGroup.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-warning-filter]");
      if (!chip) return;
      warningChipsGroup.querySelectorAll(".warning-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      currentWarningFilter = chip.dataset.warningFilter;
      filterAndRenderWarnings();
    });
  }

  // 4. Render Staff Workload Section
  const roster = getRosterRows();
  if (!latestScannedDates.length) {
    clearRosterHoursOverview("Run a scan to calculate workload.");
  } else if (!roster) {
    clearRosterHoursOverview("Choose a valid Duty Roster period to calculate workload.");
  } else {
    const people = filterRosterPeople(roster.rows);
    renderRosterHoursOverview(people, roster.dailyWindows);
    const rosterHoursHint = document.getElementById("rosterHoursHint");
    if (rosterHoursHint) {
      const range = rosterDate.value === rosterEndDate.value ? rosterDate.value : `${rosterDate.value} to ${rosterEndDate.value}`;
      rosterHoursHint.textContent = `${range} · Uses the selected Duty Roster time window and filters. Hours are classified by Europe/Berlin calendar day; public-holiday hours may also be weekday or weekend hours.`;
    }
  }

  // Setup Workload Search input listener
  const workloadSearchInput = document.getElementById("insightsWorkloadSearch");
  if (workloadSearchInput && !workloadSearchInput.dataset.listenerAttached) {
    workloadSearchInput.dataset.listenerAttached = "true";
    workloadSearchInput.addEventListener("input", () => {
      if (roster && roster.rows) {
        let people = filterRosterPeople(roster.rows);
        const query = workloadSearchInput.value.toLowerCase().trim();
        if (query) {
          people = people.filter((p) => p.name.toLowerCase().includes(query) || (p.initials || "").toLowerCase().includes(query));
        }
        renderRosterHoursOverview(people, roster.dailyWindows);
      }
    });
  }

  // 5. Render Master Staff Directory
  renderMasterStaffDirectoryTable();

  const masterStaffSearchInput = document.getElementById("masterStaffSearch");
  if (masterStaffSearchInput && !masterStaffSearchInput.dataset.listenerAttached) {
    masterStaffSearchInput.dataset.listenerAttached = "true";
    masterStaffSearchInput.addEventListener("input", renderMasterStaffDirectoryTable);
  }

  const masterStaffStationSelect = document.getElementById("masterStaffStationFilter");
  if (masterStaffStationSelect && !masterStaffStationSelect.dataset.listenerAttached) {
    masterStaffStationSelect.dataset.listenerAttached = "true";
    masterStaffStationSelect.addEventListener("change", renderMasterStaffDirectoryTable);
  }

  resultCount.textContent = String(analytics.warnings.length);
  csvBtn.disabled = latestRows.length === 0;
  opsCsvBtn.disabled = !latestRows.some((row) => Number(row.missing || 0) > 0);
}

let isRosterWarningsDelegated = false;
function initRosterWarningsDelegation() {
  const container = document.getElementById("rosterWarnings");
  if (!container || isRosterWarningsDelegated) return;
  isRosterWarningsDelegated = true;

  container.addEventListener("click", (e) => {
    const item = e.target.closest(".warning-item");
    if (!item) return;
    const personName = item.dataset.personName;
    const personKey = item.dataset.personKey;

    let targetSearch = personName || personKey;
    if (!targetSearch) {
      const text = item.querySelector("span")?.textContent || "";
      const match = text.match(/^([^:]+):/) || text.match(/\b([A-Z0-9]{2,3}\s*\d+)\b/);
      if (match) targetSearch = match[1].trim();
    }

    if (targetSearch) {
      rosterStaffSearch.value = targetSearch;
    }
    setRosterViewMode("staff", false);
    switchTab("roster");

    setTimeout(() => {
      if (targetSearch) {
        const cells = Array.from(document.querySelectorAll("#rosterBody .roster-person-cell"));
        const matchingCell = cells.find((td) => td.textContent.toLowerCase().includes(targetSearch.toLowerCase()));
        if (matchingCell) {
          const row = matchingCell.closest("tr");
          row?.scrollIntoView({ behavior: "smooth", block: "center" });
          row?.classList.add("roster-highlight");
          setTimeout(() => row?.classList.remove("roster-highlight"), 2500);
        }
      }
    }, 150);
  });
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

const MASTER_STAFF_KEY = "gsrmMasterStaffDirectoryV1";

function getMasterStaffDirectory() {
  try {
    const raw = localStorage.getItem(MASTER_STAFF_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Error reading master staff directory:", e);
  }
  return [];
}

function syncMasterStaffDirectory(staffDirectoryList = [], rowsList = [], scannedDates = []) {
  const masterMap = new Map();

  // 1. Load existing master staff
  const existing = getMasterStaffDirectory();
  for (const item of existing) {
    if (item && item.key) masterMap.set(item.key, { ...item, slas: new Set(item.slas || []) });
  }

  const ensureStaff = (identity, date = "") => {
    if (!identity || !identity.key) return null;
    if (!masterMap.has(identity.key)) {
      masterMap.set(identity.key, {
        key: identity.key,
        name: identity.name,
        initials: identity.initials || identity.station || "MUC",
        station: identity.station || identity.initials || "MUC",
        slas: new Set(),
        dutyCount: 0,
        lastSeenDate: date || today,
        firstSeenDate: date || today,
      });
    }
    const record = masterMap.get(identity.key);
    if (date) {
      if (!record.lastSeenDate || date > record.lastSeenDate) record.lastSeenDate = date;
      if (!record.firstSeenDate || date < record.firstSeenDate) record.firstSeenDate = date;
    }
    return record;
  };

  // 2. Active scan staff directory list
  for (const staffStr of staffDirectoryList) {
    const identity = parseStaffIdentity(staffStr);
    if (identity) ensureStaff(identity, scannedDates[0] || today);
  }

  // 3. Active scan rows
  for (const row of rowsList) {
    const rowDate = row.date || today;
    const rowSla = row.sla || "";
    for (const staffStr of row.staff || []) {
      const identity = parseStaffIdentity(staffStr);
      if (!identity) continue;
      const record = ensureStaff(identity, rowDate);
      if (record) {
        if (rowSla) record.slas.add(rowSla);
        record.dutyCount = (record.dutyCount || 0) + 1;
      }
    }
  }

  // 4. Cumulative Scan History Snapshots
  const history = getScanHistory();
  for (const snap of history) {
    const snapDates = snap.scannedDates || [snap.startDate];
    const snapDate = snapDates[0] || today;
    for (const staffStr of snap.staffDirectory || []) {
      const identity = parseStaffIdentity(staffStr);
      if (identity) ensureStaff(identity, snapDate);
    }
    for (const row of snap.rows || []) {
      const rDate = row.date || snapDate;
      const rSla = row.sla || "";
      for (const staffStr of row.staff || []) {
        const identity = parseStaffIdentity(staffStr);
        if (!identity) continue;
        const record = ensureStaff(identity, rDate);
        if (record) {
          if (rSla) record.slas.add(rSla);
        }
      }
    }
  }

  const resultList = [...masterMap.values()].map((rec) => ({
    ...rec,
    slas: Array.from(rec.slas),
  })).sort((a, b) => a.name.localeCompare(b.name));

  try {
    localStorage.setItem(MASTER_STAFF_KEY, JSON.stringify(resultList));
  } catch (e) {
    console.warn("Could not save master staff directory:", e);
  }
  return resultList;
}

function renderMasterStaffDirectoryTable() {
  const tbody = document.getElementById("masterStaffBody");
  const badge = document.getElementById("masterStaffTotalBadge");
  const searchInput = document.getElementById("masterStaffSearch");
  if (!tbody) return;

  const masterList = getMasterStaffDirectory();
  const query = (searchInput?.value || "").toLowerCase().trim();

  const filtered = masterList.filter((person) => {
    if (!query) return true;
    const nameMatch = (person.name || "").toLowerCase().includes(query);
    const stationMatch = (person.initials || person.station || "").toLowerCase().includes(query);
    const slaMatch = (person.slas || []).some((s) => s.toLowerCase().includes(query));
    return nameMatch || stationMatch || slaMatch;
  });

  if (badge) badge.textContent = `${masterList.length} Known Staff`;

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty">${query ? "No staff members match search filter." : "No staff members recorded in master directory yet. Run a scan to populate."}</td></tr>`;
    return;
  }

  const roster = getRosterRows();
  const activeDutyStaffKeys = new Set();
  if (roster && roster.rows) {
    roster.rows.forEach((r) => {
      if (r.overlapping && r.overlapping.length > 0) {
        activeDutyStaffKeys.add(r.key);
      }
    });
  }

  tbody.innerHTML = filtered.map((person) => {
    const isTracked = typeof isStaffTracked === "function" ? isStaffTracked(person.key) : false;
    const trackTitle = `View change history for ${escapeHtml(person.name)}`;
    const trackBtnHtml = isTracked
      ? `<button type="button" class="person-track-changes-btn" data-person-key="${escapeHtml(person.key)}" title="${trackTitle}" style="border:none; background:transparent; cursor:pointer; padding:0 2px; color:var(--primary, #2563eb); display:inline-flex; align-items:center;" aria-label="Tracked"><svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8zm6.5-3v3.25l2.25 1.35-.75 1.2-3-1.8V5h1.5z"/></svg></button>`
      : "";

    const slaChips = (person.slas || []).length
      ? person.slas.map((sla) => `<span class="compact-sla" data-sla="${escapeHtml(sla)}" style="margin-right:3px; font-size:10px;">${escapeHtml(sla)}</span>`).join("")
      : '<span style="color:#94a3b8; font-size:11px;">General</span>';

    const isOnActiveDuty = activeDutyStaffKeys.has(person.key);
    const statusHtml = isOnActiveDuty
      ? `<span class="badge" style="background:#dcfce7; color:#15803d; font-weight:600; padding:2px 6px; font-size:10px;">On Active Roster</span>`
      : `<span class="badge" style="background:#f1f5f9; color:#64748b; font-weight:500; padding:2px 6px; font-size:10px;">Available (No Duty)</span>`;

    return `
      <tr>
        <td style="font-weight:600; color:#1e293b;">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <span>${escapeHtml(person.name)}</span>
            ${trackBtnHtml}
          </div>
        </td>
        <td style="text-align:center;"><span style="background:#f1f5f9; padding:2px 6px; border-radius:4px; font-size:11px; font-weight:600; color:#475569;">${escapeHtml(person.initials || person.station || "MUC")}</span></td>
        <td>${slaChips}</td>
        <td style="text-align:center; font-weight:700; color:#0284c7;">${person.dutyCount || 0}</td>
        <td style="text-align:center; font-size:11px; color:#64748b;">${escapeHtml(person.lastSeenDate || "—")}</td>
        <td style="text-align:center;">${statusHtml}</td>
      </tr>
    `;
  }).join("");
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
  const history = [snapshot, ...getScanHistory().filter((item) => item.id !== snapshot.id)];
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
  syncMasterStaffDirectory(result.staffDirectory, result.rows, result.scannedDates);
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

    if (notesRes.status === "fulfilled" && notesRes.value) {
      const backendNotes = notesRes.value.notes || notesRes.value;
      if (backendNotes && typeof backendNotes === "object" && !Array.isArray(backendNotes) && Object.keys(backendNotes).length > 0) {
        const local = getGapActions();
        const merged = { ...local, ...backendNotes };
        localStorage.setItem(ACTIONS_KEY, JSON.stringify(merged));
        if (Object.keys(local).length > 0) {
          fetch("/api/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ notes: merged }),
          }).catch(() => {});
        }
      }
    }

    if (availRes.status === "fulfilled" && availRes.value) {
      const rules = Array.isArray(availRes.value.rules) ? availRes.value.rules : (Array.isArray(availRes.value) ? availRes.value : null);
      if (Array.isArray(rules) && rules.length > 0) {
        plannerAvailabilityRules = rules;
        localStorage.setItem("gsrmPlannerAvailabilityV1", JSON.stringify(plannerAvailabilityRules));
        renderAvailabilityRules();
      } else if (plannerAvailabilityRules.length > 0) {
        syncAvailabilityToBackend();
      }
    }

    if (histRes.status === "fulfilled" && histRes.value) {
      const remoteHistory = Array.isArray(histRes.value.history) ? histRes.value.history : (Array.isArray(histRes.value) ? histRes.value : null);
      if (Array.isArray(remoteHistory) && remoteHistory.length > 0) {
        const localHistory = getScanHistory();
        const historyMap = new Map();
        for (const item of localHistory) {
          if (item && item.id) historyMap.set(item.id, item);
        }
        for (const item of remoteHistory) {
          if (item && item.id) {
            const existing = historyMap.get(item.id);
            if (!existing || (Array.isArray(item.rows) && !Array.isArray(existing.rows))) {
              historyMap.set(item.id, item);
            }
          }
        }
        const mergedHistory = Array.from(historyMap.values()).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        try {
          localStorage.setItem(HISTORY_KEY, JSON.stringify(mergedHistory));
        } catch (e) {
          console.warn("Could not save merged scan history to localStorage:", e);
        }
        renderHistory();
      }
    }
    syncMasterStaffDirectory();
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
  if (!snapshot) return;
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
  syncMasterStaffDirectory(snapshot.staffDirectory, snapshot.rows, snapshot.scannedDates);
  updateStaffOptions();
  updateResultsSlaFilter();
  
  const sortedDates = [...latestScannedDates].sort();
  if (sortedDates.length) {
    rosterDate.value = sortedDates[0];
    rosterEndDate.value = sortedDates[sortedDates.length - 1];
  }
  updateRosterFilters();

  if (activeTab === "gaps") {
    applyFilters();
  } else {
    switchTab("gaps");
  }

  setSetupCollapsed(true, readForm());
  setMessage(`Restored snapshot from ${new Date(snapshot.createdAt).toLocaleString()}. No AVBIS request was made.`, "success");
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

let historyComparisonActiveTab = "gaps";
let historyPersonSelectedKey = "ALL";
let historyPersonFilterType = "ALL";
let historyPersonSearchQuery = "";

function renderHistoryComparison(history, currentId = history[0]?.id, previousId = history[1]?.id) {
  const comparisonEl = document.getElementById("historyComparison");
  if (!comparisonEl || !history || !history.length) return;

  const current = history.find((item) => item.id === currentId) || history[0];
  const previous = history.find((item) => item.id === previousId) || history.find((item) => item.id !== current.id) || history[0];

  const optionLabel = (snapshot) => `${new Date(snapshot.createdAt).toLocaleString()} · ${snapshot.startDate}–${snapshot.endDate} · ${snapshot.gaps.length} gaps`;
  const rangesOverlap = current.startDate <= previous.endDate && previous.startDate <= current.endDate;

  let bodyHtml = "";

  if (historyComparisonActiveTab === "person") {
    bodyHtml = renderPersonRosterAuditHtml(current, previous);
  } else {
    const comparison = OperationsUtils.compareSnapshots(current, previous);
    const entries = buildHistoryComparisonEntries(current, previous, comparison);
    const hours = (kind) => entries.filter((entry) => entry.kind === kind).reduce((sum, entry) => sum + Math.abs(entry.missingHoursDelta), 0);

    bodyHtml = `
      <div class="comparison-cards">
        <button type="button" class="opened" data-comparison-kind="New">
          <strong>${comparison.opened.length}</strong>
          <span>New gaps</span>
          <small>${hours("New").toFixed(1)} staff-h</small>
        </button>
        <button type="button" class="resolved" data-comparison-kind="Resolved">
          <strong>${comparison.resolved.length}</strong>
          <span>Resolved</span>
          <small>${hours("Resolved").toFixed(1)} staff-h</small>
        </button>
        <button type="button" class="changed" data-comparison-kind="Changed">
          <strong>${comparison.changed.length}</strong>
          <span>Coverage changed</span>
          <small>${hours("Changed").toFixed(1)} staff-h delta</small>
        </button>
      </div>
      ${renderComparisonDetails(entries)}
    `;
  }

  comparisonEl.innerHTML = `
    <div class="comparison-head">
      <div>
        <strong>Compare saved scans</strong>
        <span>Choose two scans to review coverage gaps, staff replacements, and workload deltas</span>
      </div>
      <div class="comparison-mode-switcher">
        <button type="button" class="history-mode-btn ${historyComparisonActiveTab === "gaps" ? "active" : ""}" id="historyModeGapsBtn">
          Coverage & Gaps
        </button>
        <button type="button" class="history-mode-btn ${historyComparisonActiveTab === "person" ? "active" : ""}" id="historyModePersonBtn">
          Person Roster Audit
        </button>
      </div>
      <button id="historyComparisonToggle" class="secondary-btn" type="button" aria-expanded="true">Collapse details</button>
    </div>
    <div class="comparison-scan-picker">
      <label>
        <span>Current scan</span>
        <select id="historyCompareCurrent">
          ${history.map((snapshot) => `<option value="${escapeHtml(snapshot.id)}" ${snapshot.id === current.id ? "selected" : ""}>${escapeHtml(optionLabel(snapshot))}</option>`).join("")}
        </select>
      </label>
      <span class="comparison-vs">vs</span>
      <label>
        <span>Baseline scan</span>
        <select id="historyComparePrevious">
          ${history.map((snapshot) => `<option value="${escapeHtml(snapshot.id)}" ${snapshot.id === previous.id ? "selected" : ""}>${escapeHtml(optionLabel(snapshot))}</option>`).join("")}
        </select>
      </label>
    </div>
    ${rangesOverlap ? "" : `<div class="comparison-scope-warning"><strong>Different date ranges</strong><span>${escapeHtml(current.startDate)}–${escapeHtml(current.endDate)} does not overlap ${escapeHtml(previous.startDate)}–${escapeHtml(previous.endDate)}. Items reflect different scan scopes.</span></div>`}
    <div id="historyComparisonBody">${bodyHtml}</div>
  `;

  document.getElementById("historyCompareCurrent").addEventListener("change", (event) => renderHistoryComparison(history, event.target.value, document.getElementById("historyComparePrevious").value));
  document.getElementById("historyComparePrevious").addEventListener("change", (event) => renderHistoryComparison(history, document.getElementById("historyCompareCurrent").value, event.target.value));

  document.getElementById("historyModeGapsBtn").addEventListener("click", () => {
    historyComparisonActiveTab = "gaps";
    renderHistoryComparison(history, current.id, previous.id);
  });
  document.getElementById("historyModePersonBtn").addEventListener("click", () => {
    historyComparisonActiveTab = "person";
    renderHistoryComparison(history, current.id, previous.id);
  });

  if (historyComparisonActiveTab === "person") {
    bindPersonRosterAuditControls(current, previous);
  } else {
    const comparison = OperationsUtils.compareSnapshots(current, previous);
    const entries = buildHistoryComparisonEntries(current, previous, comparison);
    bindHistoryComparisonControls(entries);
  }
}

function renderPersonRosterAuditHtml(current, previous) {
  const rangesOverlap = current.startDate <= previous.endDate && previous.startDate <= current.endDate;
  const audit = OperationsUtils.comparePersonRosters(current, previous);
  const summary = audit.getStaffAuditSummary(historyPersonSelectedKey);

  let entries = summary.entries;

  if (historyPersonFilterType && historyPersonFilterType !== "ALL") {
    entries = entries.filter((e) => e.personKind === historyPersonFilterType);
  }

  if (historyPersonSearchQuery) {
    const q = historyPersonSearchQuery.toLowerCase();
    entries = entries.filter((e) => {
      const text = [
        e.row.date, e.row.flight, e.row.sla, e.row.route, e.row.aircraft,
        e.personKind, e.personDetail,
        ...e.prevStaff.map((p) => p.name), ...e.currStaff.map((p) => p.name)
      ].join(" ").toLowerCase();
      return text.includes(q);
    });
  }

  return `
    <div class="person-audit-container">
      ${!rangesOverlap ? `
        <div class="person-audit-notice">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
          <span>Non-overlapping scan dates (${escapeHtml(current.startDate)}–${escapeHtml(current.endDate)} vs ${escapeHtml(previous.startDate)}–${escapeHtml(previous.endDate)}): Duties are automatically matched by <strong>Day of Week + Flight + SLA</strong> for cross-period audit tracking.</span>
        </div>
      ` : ""}
      <div class="person-audit-controls">
        <label class="person-audit-field">
          <span>Select Staff Member</span>
          <select id="historyPersonSelect">
            <option value="ALL" ${historyPersonSelectedKey === "ALL" ? "selected" : ""}>All Staff Members (${audit.allStaff.length} staff)</option>
            ${audit.allStaff.map((p) => `<option value="${escapeHtml(p.key)}" ${p.key === historyPersonSelectedKey ? "selected" : ""}>${escapeHtml(p.name)}${p.initials ? ` [${escapeHtml(p.initials)}]` : ""}</option>`).join("")}
          </select>
        </label>

        <label class="person-audit-field">
          <span>Filter Change Type</span>
          <select id="historyPersonFilter">
            <option value="ALL" ${historyPersonFilterType === "ALL" ? "selected" : ""}>All Shifts & Changes</option>
            <option value="REPLACED" ${historyPersonFilterType === "REPLACED" ? "selected" : ""}>Replaced / Swapped Only</option>
            <option value="ADDED" ${historyPersonFilterType === "ADDED" ? "selected" : ""}>Duty Added Only</option>
            <option value="REMOVED" ${historyPersonFilterType === "REMOVED" ? "selected" : ""}>Duty Removed Only</option>
            <option value="HOURS_MODIFIED" ${historyPersonFilterType === "HOURS_MODIFIED" ? "selected" : ""}>Hours Modified Only</option>
          </select>
        </label>

        <div class="person-audit-field search-field" style="flex: 1;">
          <span>Search Shifts</span>
          <input id="historyPersonSearchInput" type="search" placeholder="Search flight, SLA, route, staff name..." value="${escapeHtml(historyPersonSearchQuery)}">
        </div>

        <button id="historyPersonExportCsvBtn" type="button" class="primary-btn" style="align-self: flex-end; height: 34px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export Roster Audit CSV
        </button>
      </div>

      <div class="person-audit-kpis">
        <div class="person-kpi-card">
          <span class="kpi-label">Baseline Workload</span>
          <strong class="kpi-value">${summary.prevTotalHours.toFixed(1)} <small>hrs</small></strong>
          <span class="kpi-sub">${summary.prevDutyCount} duties assigned</span>
        </div>

        <div class="person-kpi-card">
          <span class="kpi-label">Current Scan Workload</span>
          <strong class="kpi-value">${summary.currTotalHours.toFixed(1)} <small>hrs</small></strong>
          <span class="kpi-sub">${summary.currDutyCount} duties assigned</span>
        </div>

        <div class="person-kpi-card">
          <span class="kpi-label">Net Hours Impact</span>
          <strong class="kpi-value ${summary.netHoursDelta > 0 ? "text-plus" : summary.netHoursDelta < 0 ? "text-minus" : ""}">
            ${summary.netHoursDelta > 0 ? "+" : ""}${summary.netHoursDelta.toFixed(1)} <small>hrs</small>
          </strong>
          <span class="kpi-sub">${summary.netDutyDelta > 0 ? "+" : ""}${summary.netDutyDelta} duties delta</span>
        </div>

        <div class="person-kpi-card">
          <span class="kpi-label">Reassignments & Swaps</span>
          <strong class="kpi-value text-warning">${summary.replacedCount}</strong>
          <span class="kpi-sub">${summary.addedCount} added · ${summary.removedCount} removed</span>
        </div>
      </div>

      <div class="person-audit-entries-list">
        ${entries.length === 0 ? '<div class="comparison-empty">No roster changes found matching the selected filters.</div>' : entries.map(renderPersonAuditEntryCard).join("")}
      </div>
    </div>
  `;
}

function renderPersonAuditEntryCard(entry) {
  const row = entry.row;
  const kindClass = {
    REPLACED: "badge-replaced",
    ADDED: "badge-added",
    REMOVED: "badge-removed",
    HOURS_MODIFIED: "badge-modified",
    UNCHANGED: "badge-unchanged",
  }[entry.personKind] || "badge-unchanged";

  const kindLabel = {
    REPLACED: "REPLACED",
    ADDED: "DUTY ADDED",
    REMOVED: "DUTY REMOVED",
    HOURS_MODIFIED: "HOURS MODIFIED",
    UNCHANGED: "UNCHANGED",
  }[entry.personKind] || entry.personKind;

  const deltaText = entry.hoursDelta > 0 
    ? `+${entry.hoursDelta.toFixed(1)}h` 
    : entry.hoursDelta < 0 
      ? `${entry.hoursDelta.toFixed(1)}h` 
      : "0.0h";

  const deltaClass = entry.hoursDelta > 0 ? "delta-plus" : entry.hoursDelta < 0 ? "delta-minus" : "delta-neutral";

  const prevStaffNames = entry.prevStaff.map((p) => `${p.name}${p.initials ? ` [${p.initials}]` : ""}`).join(", ") || "Unassigned";
  const currStaffNames = entry.currStaff.map((p) => `${p.name}${p.initials ? ` [${p.initials}]` : ""}`).join(", ") || "Unassigned";

  return `
    <div class="audit-entry-card kind-${entry.personKind.toLowerCase()}">
      <div class="audit-entry-head">
        <div class="audit-entry-flight">
          <strong>${escapeHtml(row.date || "")} · ${escapeHtml(row.flight || "Duty")} · ${escapeHtml(row.sla || "")}</strong>
          <span>${escapeHtml(row.route || "")} ${row.aircraft ? `· ${escapeHtml(row.aircraft)}` : ""}</span>
        </div>
        <div class="audit-entry-badges">
          <span class="audit-badge ${kindClass}">${kindLabel}</span>
        </div>
      </div>
      <div class="audit-entry-body">
        <div class="audit-entry-info">
          <div class="audit-time-line">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>${escapeHtml(row.start_utc || "")} – ${escapeHtml(row.release_utc || "")} UTC</span>
            <strong>(${(entry.durationMinutes / 60).toFixed(1)} hrs)</strong>
          </div>
          <div class="audit-detail-highlight">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/></svg>
            <strong>${escapeHtml(entry.personDetail)}</strong>
          </div>
          <div class="audit-roster-compare">
            <small><b>Baseline Roster:</b> ${escapeHtml(prevStaffNames)}</small>
            <small><b>Current Roster:</b> ${escapeHtml(currStaffNames)}</small>
          </div>
        </div>
        <div class="audit-entry-hours ${deltaClass}">
          <span class="hours-label">Hours Delta</span>
          <strong class="hours-val">${deltaText}</strong>
        </div>
      </div>
    </div>
  `;
}

function bindPersonRosterAuditControls(current, previous) {
  const personSelect = document.getElementById("historyPersonSelect");
  const filterSelect = document.getElementById("historyPersonFilter");
  const searchInput = document.getElementById("historyPersonSearchInput");
  const exportBtn = document.getElementById("historyPersonExportCsvBtn");
  const toggle = document.getElementById("historyComparisonToggle");
  const body = document.getElementById("historyComparisonBody");

  toggle?.addEventListener("click", (event) => {
    const collapsed = body.hidden = !body.hidden;
    event.currentTarget.textContent = collapsed ? "Show details" : "Collapse details";
    event.currentTarget.setAttribute("aria-expanded", String(!collapsed));
  });

  personSelect?.addEventListener("change", (e) => {
    historyPersonSelectedKey = e.target.value;
    renderHistoryComparison(getScanHistorySnapshotList(), current.id, previous.id);
  });

  filterSelect?.addEventListener("change", (e) => {
    historyPersonFilterType = e.target.value;
    renderHistoryComparison(getScanHistorySnapshotList(), current.id, previous.id);
  });

  searchInput?.addEventListener("input", (e) => {
    historyPersonSearchQuery = e.target.value;
    const q = historyPersonSearchQuery.toLowerCase();
    const cards = document.querySelectorAll(".audit-entry-card");
    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? "" : "none";
    });
  });

  exportBtn?.addEventListener("click", () => {
    const audit = OperationsUtils.comparePersonRosters(current, previous);
    const summary = audit.getStaffAuditSummary(historyPersonSelectedKey);
    let entries = summary.entries;

    if (historyPersonFilterType && historyPersonFilterType !== "ALL") {
      entries = entries.filter((e) => e.personKind === historyPersonFilterType);
    }
    if (historyPersonSearchQuery) {
      const q = historyPersonSearchQuery.toLowerCase();
      entries = entries.filter((e) => {
        const text = [
          e.row.date, e.row.flight, e.row.sla, e.row.route, e.row.aircraft,
          e.personKind, e.personDetail,
          ...e.prevStaff.map((p) => p.name), ...e.currStaff.map((p) => p.name)
        ].join(" ").toLowerCase();
        return text.includes(q);
      });
    }

    const headers = [
      "Staff Member", "Date", "Flight", "SLA", "Route", "Aircraft",
      "Start UTC", "Release UTC", "Duty Hours", "Audit Status", "Audit Detail / Replacement Info",
      "Baseline Staff", "Current Staff", "Hours Delta"
    ];

    const lines = [
      headers.map(csvCell).join(","),
      ...entries.map((e) => [
        summary.targetPerson ? summary.targetPerson.name : "All Staff",
        e.row.date, e.row.flight, e.row.sla, e.row.route || "", e.row.aircraft || "",
        e.row.start_utc, e.row.release_utc, (e.durationMinutes / 60).toFixed(2),
        e.personKind, e.personDetail,
        e.prevStaff.map((p) => p.name).join(" | "), e.currStaff.map((p) => p.name).join(" | "),
        e.hoursDelta.toFixed(2)
      ].map(csvCell).join(","))
    ];

    const personSlug = (summary.targetPerson ? summary.targetPerson.name : "all-staff").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    downloadBlob(`gsrm-roster-audit-${personSlug}-${getLocalIsoDate()}.csv`, lines.join("\n"), "text/csv;charset=utf-8");
  });
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

function isSameStaff(staffLabel, targetPersonOrQuery) {
  if (!staffLabel || !targetPersonOrQuery) return false;

  const parsedLabel = parseStaffIdentity(staffLabel);
  if (!parsedLabel) return false;

  let target = null;
  if (typeof targetPersonOrQuery === "object" && targetPersonOrQuery !== null) {
    target = targetPersonOrQuery;
  } else {
    const str = String(targetPersonOrQuery).trim();
    if (!str) return false;
    const staffList = typeof getPlannerPeople === "function" ? getPlannerPeople() : [];
    target = staffList.find((p) => 
      p.key === str || 
      p.key.toUpperCase() === str.toUpperCase() ||
      p.name.toUpperCase() === str.toUpperCase()
    ) || resolveStaffIdentity(str) || parseStaffIdentity(str);
  }

  if (!target) return false;

  const labelKey = String(parsedLabel.key || "").trim().toUpperCase();
  const labelName = String(parsedLabel.name || "").trim().toUpperCase();

  const targetKey = String(target.key || "").trim().toUpperCase();
  const targetName = String(target.name || "").trim().toUpperCase();

  // 1. Direct match on key (e.g. "DANIELA NEUNER")
  if (labelKey && targetKey && labelKey === targetKey) return true;

  // 2. Direct match on name (e.g. "Daniela Neuner")
  if (labelName && targetName && labelName === targetName) return true;

  // 3. Fallback: match by initials ONLY if neither target nor label has a distinct full name
  const labelInitials = String(parsedLabel.initials || "").trim().toUpperCase();
  const targetInitials = String(target.initials || "").trim().toUpperCase();

  if (targetInitials && labelInitials === targetInitials) {
    const targetHasDistinctName = targetName && targetName !== targetInitials;
    const labelHasDistinctName = labelName && labelName !== labelInitials;
    if (!targetHasDistinctName && !labelHasDistinctName) {
      return true;
    }
  }

  return false;
}

function getPersonRosterChanges(personOrQuery) {
  if (!personOrQuery) return null;

  const isAll = String(personOrQuery).trim().toUpperCase() === "ALL";
  let target = null;
  let targetKey = "";
  let targetInitials = "";
  let targetName = "";

  if (isAll) {
    targetKey = "ALL";
    targetInitials = "ALL";
    targetName = "All Staff Members";
  } else if (typeof personOrQuery === "object" && personOrQuery !== null) {
    target = personOrQuery;
    targetKey = String(target.key || "").trim().toUpperCase();
    targetInitials = String(target.initials || "").trim().toUpperCase();
    targetName = String(target.name || target.initials || target.key).trim();
  } else {
    const queryStr = String(personOrQuery).trim();
    if (!queryStr) return null;
    const staffList = typeof getPlannerPeople === "function" ? getPlannerPeople() : [];
    target = staffList.find((p) => 
      p.key === queryStr || 
      p.key.toUpperCase() === queryStr.toUpperCase() ||
      p.name.toUpperCase() === queryStr.toUpperCase()
    ) || resolveStaffIdentity(queryStr) || parseStaffIdentity(queryStr);

    if (target) {
      targetKey = String(target.key || "").trim().toUpperCase();
      targetInitials = String(target.initials || "").trim().toUpperCase();
      targetName = String(target.name || target.initials || target.key).trim();
    } else {
      targetKey = queryStr.toUpperCase();
      targetInitials = queryStr.toUpperCase();
      targetName = queryStr;
    }
  }

  const dummyTarget = target || { key: targetKey, initials: targetInitials, name: targetName };

  const getRowStaffIdentities = (row) => {
    const labels = Array.isArray(row?.staff) ? row.staff : [];
    return labels.map((l) => parseStaffIdentity(l) || { key: String(l).toUpperCase(), name: String(l), initials: "" }).filter(Boolean);
  };

  const rowHasStaff = (row) => {
    if (isAll) return (row.staff || []).length > 0;
    return (row.staff || []).some((s) => isSameStaff(s, dummyTarget));
  };

  const buildDutyIndexedMap = (rows) => {
    const map = new Map();
    const counts = new Map();
    for (const r of (rows || [])) {
      const baseKey = [r.date, r.flight_id || r.flight, r.sla].map((v) => String(v || "").trim()).join("|");
      const idx = counts.get(baseKey) || 0;
      counts.set(baseKey, idx + 1);
      const fullKey = `${baseKey}|${idx}`;
      map.set(fullKey, r);
    }
    return map;
  };

  const origMap = buildDutyIndexedMap(originalRows);
  const currMap = buildDutyIndexedMap(latestRows);

  const allDutyKeys = new Set([...origMap.keys(), ...currMap.keys()]);
  const changes = [];

  let originalAssignedCount = 0;
  let currentAssignedCount = 0;

  for (const dutyKey of allDutyKeys) {
    const origRow = origMap.get(dutyKey);
    const currRow = currMap.get(dutyKey);
    const refRow = currRow || origRow;
    if (!refRow) continue;

    const origStaff = origRow ? getRowStaffIdentities(origRow) : [];
    const currStaff = currRow ? getRowStaffIdentities(currRow) : [];

    const origStaffKeys = new Set(origStaff.map((s) => s.key));
    const currStaffKeys = new Set(currStaff.map((s) => s.key));

    const wasAssigned = isAll ? origStaff.length > 0 : (origRow ? rowHasStaff(origRow) : false);
    const isAssigned = isAll ? currStaff.length > 0 : (currRow ? rowHasStaff(currRow) : false);

    if (wasAssigned) originalAssignedCount++;
    if (isAssigned) currentAssignedCount++;

    if (!wasAssigned && !isAssigned) continue;

    const removedStaff = origStaff.filter((s) => !currStaffKeys.has(s.key));
    const addedStaff = currStaff.filter((s) => !origStaffKeys.has(s.key));

    const timingChanged = origRow && currRow && (origRow.start_utc !== currRow.start_utc || origRow.release_utc !== currRow.release_utc);

    let changeType = "unchanged";
    let note = "";

    if (!isAll) {
      const isRemoved = wasAssigned && !isAssigned;
      const isAdded = !wasAssigned && isAssigned;
      const isReplacedOut = isRemoved && addedStaff.length > 0;
      const isReplacedIn = isAdded && removedStaff.length > 0;

      if (isReplacedOut) {
        changeType = "replaced";
        note = `Replaced by ${addedStaff.map((s) => s.name).join(", ")}`;
      } else if (isReplacedIn) {
        changeType = "replaced";
        note = `Replaced ${removedStaff.map((s) => s.name).join(", ")}`;
      } else if (isAdded) {
        changeType = "added";
        note = "Newly assigned in local roster edit";
      } else if (isRemoved) {
        changeType = "removed";
        note = "Unassigned in local roster edit";
      } else if (timingChanged) {
        changeType = "modified";
        note = `Timing changed: ${origRow.start_utc}–${origRow.release_utc} → ${currRow.start_utc}–${currRow.release_utc} UTC`;
      }
    } else {
      if (removedStaff.length > 0 && addedStaff.length > 0) {
        changeType = "replaced";
        note = `Replaced: ${removedStaff.map((s) => s.name).join(", ")} → ${addedStaff.map((s) => s.name).join(", ")}`;
      } else if (addedStaff.length > 0 && !origRow) {
        changeType = "added";
        note = `Newly added duty (${addedStaff.map((s) => s.name).join(", ")})`;
      } else if (removedStaff.length > 0 && !currRow) {
        changeType = "removed";
        note = `Duty removed from schedule (${removedStaff.map((s) => s.name).join(", ")})`;
      } else if (addedStaff.length > 0) {
        changeType = "added";
        note = `Assigned to shift: ${addedStaff.map((s) => s.name).join(", ")}`;
      } else if (removedStaff.length > 0) {
        changeType = "removed";
        note = `Unassigned from shift: ${removedStaff.map((s) => s.name).join(", ")}`;
      } else if (timingChanged) {
        changeType = "modified";
        note = `Timing changed: ${origRow.start_utc}–${origRow.release_utc} → ${currRow.start_utc}–${currRow.release_utc} UTC`;
      }
    }

    changes.push({
      rowKey: dutyKey,
      date: refRow.date,
      flight: refRow.flight || "SLA Duty",
      sla: refRow.sla,
      type: refRow.type,
      start_utc: currRow?.start_utc || origRow?.start_utc || "",
      release_utc: currRow?.release_utc || origRow?.release_utc || "",
      changeType,
      note,
      origRow,
      currRow
    });
  }

  changes.sort((a, b) => `${a.date} ${a.start_utc}`.localeCompare(`${b.date} ${b.start_utc}`));

  const counts = {
    totalOriginal: originalAssignedCount,
    totalCurrent: currentAssignedCount,
    added: changes.filter((c) => c.changeType === "added").length,
    removed: changes.filter((c) => c.changeType === "removed").length,
    replaced: changes.filter((c) => c.changeType === "replaced").length,
    modified: changes.filter((c) => c.changeType === "modified").length,
    unchanged: changes.filter((c) => c.changeType === "unchanged").length,
  };

  return {
    person: dummyTarget,
    targetName,
    counts,
    changes
  };
}

function getTrackedStaffKeys() {
  const stored = localStorage.getItem("gsrmTrackedStaffKeys");
  if (!stored) return new Set();
  try {
    const list = JSON.parse(stored);
    return Array.isArray(list) ? new Set(list.map((k) => String(k).toUpperCase())) : new Set();
  } catch (_) {
    return new Set();
  }
}

function isStaffTracked(personKey) {
  if (!personKey) return false;
  const trackedSet = getTrackedStaffKeys();
  return trackedSet.has(String(personKey).toUpperCase());
}

function setStaffTracked(personKey, tracked) {
  if (!personKey) return;
  const uppercaseKey = String(personKey).toUpperCase();
  const trackedSet = getTrackedStaffKeys();
  if (tracked) {
    trackedSet.add(uppercaseKey);
  } else {
    trackedSet.delete(uppercaseKey);
  }
  localStorage.setItem("gsrmTrackedStaffKeys", JSON.stringify([...trackedSet]));
}

function clearAllStaffTracking() {
  localStorage.setItem("gsrmTrackedStaffKeys", JSON.stringify([]));
  const selectEl = document.getElementById("personChangesSelect");
  if (selectEl && selectEl.value) {
    renderPersonChangesContent(activePersonChangesFilter);
  }
  if (typeof renderRoster === "function") renderRoster();
  if (typeof setMessage === "function") {
    setMessage("Cleared roster change tracking for all staff members.", "info");
  }
}

let activePersonChangesFilter = "all";

function openPersonChangesModal(personKeyOrQuery = null) {
  if (personKeyOrQuery && (personKeyOrQuery instanceof Event || typeof personKeyOrQuery.preventDefault === "function")) {
    personKeyOrQuery = null;
  }

  const modal = document.getElementById("personChangesModal");
  const select = document.getElementById("personChangesSelect");
  if (!modal || !select) return;

  const staffList = typeof getPlannerPeople === "function" ? getPlannerPeople() : [];
  select.innerHTML = '<option value="ALL">All Staff Members (Full Roster Audit)</option>' +
    '<option value="">Select a person...</option>' +
    staffList.map((p) => `<option value="${escapeHtml(p.key)}">${escapeHtml(p.initials)} - ${escapeHtml(p.name)}</option>`).join("");

  if (personKeyOrQuery) {
    const queryStr = typeof personKeyOrQuery === "object"
      ? (personKeyOrQuery.key || personKeyOrQuery.name || personKeyOrQuery.initials)
      : String(personKeyOrQuery);
    const found = staffList.find((p) => 
      p.key === queryStr || 
      p.key.toUpperCase() === queryStr.toUpperCase() || 
      p.name.toUpperCase() === queryStr.toUpperCase()
    ) || resolveStaffIdentity(queryStr);
    if (found) {
      select.value = found.key;
    }
  } else if (!select.value) {
    select.value = "ALL";
  }

  modal.hidden = false;
  renderPersonChangesContent(activePersonChangesFilter);
}

function updateGlobalRosterAuditBadge() {
  const badgeEl = document.getElementById("rosterAuditBadge");
  if (!badgeEl) return;
  const allChanges = getPersonRosterChanges("ALL");
  if (!allChanges || !allChanges.changes) {
    badgeEl.textContent = "Audit";
    badgeEl.style.background = "#2563eb";
    return;
  }
  const editCount = allChanges.changes.filter((c) => c.changeType !== "unchanged").length;
  if (editCount > 0) {
    badgeEl.textContent = `${editCount} Edits`;
    badgeEl.style.background = "#d97706";
  } else {
    badgeEl.textContent = "Audit";
    badgeEl.style.background = "#2563eb";
  }
}

function renderPersonChangesContent(filterMode = "all") {
  activePersonChangesFilter = filterMode;
  const select = document.getElementById("personChangesSelect");
  const contentEl = document.getElementById("personChangesContent");
  const toggle = document.getElementById("personTrackingToggle");
  const statusEl = document.getElementById("personTrackingStatus");
  if (!select || !contentEl) return;

  // Update active state of filter chip buttons
  const filterBtns = document.querySelectorAll("#personChangesFilterGroup button");
  filterBtns.forEach((btn) => {
    const mode = btn.getAttribute("data-change-filter") || "all";
    btn.classList.toggle("active", mode === filterMode);
  });

  const key = select.value || "ALL";
  const isAll = key === "ALL";

  const tracked = isStaffTracked(key);
  if (toggle) {
    toggle.checked = tracked;
    toggle.disabled = isAll;
  }
  if (statusEl) {
    if (isAll) {
      statusEl.textContent = "Full Roster Scope";
      statusEl.style.color = "#2563eb";
      statusEl.style.background = "#eff6ff";
      statusEl.style.borderColor = "#bfdbfe";
    } else {
      statusEl.textContent = tracked ? "Tracking Active" : "Tracking Paused";
      statusEl.style.color = tracked ? "#16a34a" : "#64748b";
      statusEl.style.background = tracked ? "#f0fdf4" : "#f1f5f9";
      statusEl.style.borderColor = tracked ? "#bbf7d0" : "#cbd5e1";
    }
  }

  const data = getPersonRosterChanges(key);
  if (!data) {
    contentEl.innerHTML = '<div class="empty-selection">No roster data found for selected staff member.</div>';
    return;
  }

  const { person, targetName, counts, changes } = data;

  let filteredChanges = changes;
  if (filterMode === "modified") {
    filteredChanges = changes.filter((c) => c.changeType !== "unchanged");
  } else if (filterMode === "added") {
    filteredChanges = changes.filter((c) => c.changeType === "added");
  } else if (filterMode === "removed") {
    filteredChanges = changes.filter((c) => c.changeType === "removed");
  } else if (filterMode === "replaced") {
    filteredChanges = changes.filter((c) => c.changeType === "replaced");
  } else if (filterMode === "timing") {
    filteredChanges = changes.filter((c) => c.changeType === "modified");
  }

  let html = "";

  // 1. Staff Profile Header Card or Scope Header Card
  if (!isAll && person) {
    const initials = escapeHtml(person.initials || (person.name ? person.name.split(" ").map(n=>n[0]).join("") : "ST"));
    const contractLimit = typeof getContractHoursLimit === "function" ? getContractHoursLimit(person) : 80;
    const contractTag = contractLimit === 160 ? "Full-Time (160h)" : "Part-Time (80h)";

    html += `
      <div class="audit-profile-card">
        <div class="audit-profile-main">
          <div class="audit-avatar">${initials}</div>
          <div class="audit-profile-info">
            <div class="audit-profile-name">${escapeHtml(targetName)}</div>
            <div class="audit-profile-meta">
              <span class="audit-meta-pill">Key: ${escapeHtml(person.key || key)}</span>
              <span class="audit-meta-pill contract">${contractTag}</span>
              <span class="audit-meta-pill total">${counts.totalCurrent} Active Duties</span>
            </div>
          </div>
        </div>
        <div>
          ${!tracked
            ? `<span class="audit-warning-pill" title="Tracking paused for this staff member">⚠️ Tracking Paused</span>`
            : `<span class="audit-active-pill" title="Tracking active">✓ Tracking Active</span>`}
        </div>
      </div>
    `;
  } else if (!isAll) {
    html += `
      <div class="audit-profile-card">
        <div class="audit-profile-main">
          <div class="audit-avatar">ST</div>
          <div class="audit-profile-info">
            <div class="audit-profile-name">${escapeHtml(targetName)}</div>
            <div class="audit-profile-meta">
              <span class="audit-meta-pill total">${counts.totalCurrent} Active Duties</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Tracking Warning Banner if Paused
  if (!tracked && !isAll) {
    html += `<div style="background:#fffbeb; border:1px solid #fde68a; color:#92400e; padding:8px 12px; border-radius:8px; font-size:11px; font-weight:600;">ℹ️ Roster change tracking is currently paused for <strong>${escapeHtml(targetName)}</strong>. Check "Track roster changes" above to resume tracking.</div>`;
  }

  // 3. Stat Dashboard Cards Grid
  html += `
    <div class="audit-kpi-grid">
      <div class="audit-kpi-card orig">
        <span class="kpi-title">Original</span>
        <span class="kpi-num">${counts.totalOriginal}</span>
        <span class="kpi-sub">Scanned</span>
      </div>
      <div class="audit-kpi-card curr">
        <span class="kpi-title">Current</span>
        <span class="kpi-num">${counts.totalCurrent}</span>
        <span class="kpi-sub">Active Plan</span>
      </div>
      <div class="audit-kpi-card added">
        <span class="kpi-title">Added</span>
        <span class="kpi-num">+${counts.added}</span>
        <span class="kpi-sub">Assigned</span>
      </div>
      <div class="audit-kpi-card removed">
        <span class="kpi-title">Removed</span>
        <span class="kpi-num">-${counts.removed}</span>
        <span class="kpi-sub">Unassigned</span>
      </div>
      <div class="audit-kpi-card replaced">
        <span class="kpi-title">Replaced</span>
        <span class="kpi-num">${counts.replaced}</span>
        <span class="kpi-sub">Swapped</span>
      </div>
      <div class="audit-kpi-card modified">
        <span class="kpi-title">Timing</span>
        <span class="kpi-num">${counts.modified || 0}</span>
        <span class="kpi-sub">Shifted</span>
      </div>
    </div>
  `;

  // 4. Shift Change Item Cards List & Section Header
  html += `
    <div class="audit-section-header">
      <div class="audit-section-title">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        <strong>Roster Duty Details &amp; Audit Log</strong>
      </div>
      <span class="audit-section-count">${filteredChanges.length} ${filteredChanges.length === 1 ? "duty" : "duties"}</span>
    </div>
  `;

  if (!filteredChanges.length) {
    let emptyMsg = `No scheduled duties found for ${escapeHtml(targetName)} matching current filter.`;
    if (filterMode === "modified") {
      emptyMsg = `No roster modifications detected for ${escapeHtml(targetName)}. Roster matches original scan.`;
    } else if (filterMode === "added") {
      emptyMsg = `No newly added shifts for ${escapeHtml(targetName)}.`;
    } else if (filterMode === "removed") {
      emptyMsg = `No removed shifts for ${escapeHtml(targetName)}.`;
    } else if (filterMode === "replaced") {
      emptyMsg = `No replaced staff swaps for ${escapeHtml(targetName)}.`;
    } else if (filterMode === "timing") {
      emptyMsg = `No timing adjustments for ${escapeHtml(targetName)}.`;
    }
    html += `<div class="empty-selection" style="padding:24px 16px; text-align:center;">${emptyMsg}</div>`;
  } else {
    html += '<div class="audit-cards-list">';
    for (const item of filteredChanges) {
      let badgeClass = "unchanged";
      let badgeText = "Unchanged";
      let iconSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;

      if (item.changeType === "added") {
        badgeClass = "added";
        badgeText = "Added to Roster";
        iconSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
      } else if (item.changeType === "removed") {
        badgeClass = "removed";
        badgeText = "Removed";
        iconSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
      } else if (item.changeType === "replaced") {
        badgeClass = "replaced";
        badgeText = "Replaced Staff";
        iconSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 3l4 4-4 4"/><path d="M20 7H4"/><path d="M8 21l-4-4 4-4"/><path d="M4 17h16"/></svg>`;
      } else if (item.changeType === "modified") {
        badgeClass = "modified";
        badgeText = "Timing Shifted";
        iconSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
      }

      // Airline Logo URL or Logo Image
      const logoHtml = typeof OperationsUtils !== "undefined" && OperationsUtils.getAirlineLogoImg
        ? OperationsUtils.getAirlineLogoImg(item.flight, 22)
        : "";

      // Calculate shift duration in hours
      let durationStr = "";
      if (item.start_utc && item.release_utc && typeof calculateMinutesBetween === "function") {
        const durMins = calculateMinutesBetween(item.start_utc, item.release_utc);
        if (durMins > 0) durationStr = (durMins / 60).toFixed(1);
      }

      html += `
        <div class="audit-shift-card ${badgeClass}">
          <div class="audit-card-head">
            <div class="audit-card-flight">
              ${logoHtml}
              <strong>${escapeHtml(item.flight)}</strong>
              ${item.sla ? `<span class="compact-sla" data-sla="${escapeHtml(item.sla)}">${escapeHtml(item.sla)}</span>` : ""}
            </div>
            <span class="audit-type-badge ${badgeClass}">
              ${iconSvg}
              <span>${badgeText}</span>
            </span>
          </div>

          <div class="audit-card-body">
            <div class="audit-detail-chip">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>${escapeHtml(item.date)}</span>
            </div>
            <div class="audit-detail-chip">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${escapeHtml(item.start_utc)} – ${escapeHtml(item.release_utc)} UTC</span>
              ${durationStr ? `<small>(${durationStr}h)</small>` : ""}
            </div>
          </div>

          ${item.note ? `
            <div class="audit-card-note">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span>${escapeHtml(item.note)}</span>
            </div>
          ` : ""}
        </div>
      `;
    }
    html += '</div>';
  }

  contentEl.innerHTML = html;
}

function attachPersonChangesModalListeners() {
  const closeBtn = document.getElementById("personChangesCloseBtn");
  const backdrop = document.getElementById("personChangesBackdrop");
  const modal = document.getElementById("personChangesModal");

  const closeModal = () => {
    if (modal) {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    }
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });

  const select = document.getElementById("personChangesSelect");
  if (select) {
    select.addEventListener("change", () => renderPersonChangesContent(activePersonChangesFilter));
  }

  const toggle = document.getElementById("personTrackingToggle");
  if (toggle) {
    toggle.addEventListener("change", () => {
      const selectEl = document.getElementById("personChangesSelect");
      if (selectEl && selectEl.value) {
        setStaffTracked(selectEl.value, toggle.checked);
        renderPersonChangesContent(activePersonChangesFilter);
        if (typeof renderRoster === "function" && latestScannedDates.length) {
          renderRoster();
        }
      }
    });
  }

  const clearAllBtn = document.getElementById("clearAllTrackingBtn");
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
      clearAllStaffTracking();
    });
  }

  const filterBtns = document.querySelectorAll("#personChangesFilterGroup button");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      const mode = e.target.getAttribute("data-change-filter") || "all";
      renderPersonChangesContent(mode);
    });
  });

  document.addEventListener("click", (e) => {
    const mainBtn = e.target.closest("#trackPersonChangesBtn");
    if (mainBtn) {
      e.preventDefault();
      openPersonChangesModal();
      return;
    }

    const clockBtn = e.target.closest(".person-track-changes-btn");
    if (clockBtn) {
      e.preventDefault();
      e.stopPropagation();
      const personKey = clockBtn.dataset.personKey || clockBtn.getAttribute("data-person-key");
      openPersonChangesModal(personKey);
      return;
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", attachPersonChangesModalListeners);
} else {
  attachPersonChangesModalListeners();
}

function openAddShiftToPersonModal(person, dateIso = "") {
  const modal = document.getElementById("addShiftModal");
  const title = document.getElementById("addShiftTitle");
  const subtitle = document.getElementById("addShiftSubtitle");
  const listEl = document.getElementById("addShiftList");
  const searchInput = document.getElementById("addShiftSearch");
  const filterSelect = document.getElementById("addShiftFilter");

  if (!modal || !listEl || !person) return;

  modal.dataset.personKey = person.key;
  modal.dataset.dateIso = dateIso || "";

  title.innerHTML = `Add Shift to <strong>${escapeHtml(person.name)} (${escapeHtml(person.initials)})</strong>`;
  subtitle.textContent = dateIso ? `Date: ${dateIso} · Select an available shift to assign` : `Select an available shift across active period to assign`;
  if (searchInput) searchInput.value = "";

  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");

  function renderShiftOptions() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const filter = filterSelect ? filterSelect.value : "gaps";

    let availableDuties = latestRows.filter((row) => {
      if (dateIso && row.date !== dateIso) return false;
      if (filter === "gaps" && Number(row.missing || 0) <= 0) return false;
      if (query) {
        const text = `${row.flight} ${row.sla} ${row.route} ${row.type}`.toLowerCase();
        if (!text.includes(query)) return false;
      }
      return true;
    });

    if (!availableDuties.length) {
      listEl.innerHTML = `<div class="empty-selection">No available shifts found matching the filter for ${dateIso || "this period"}.</div>`;
      return;
    }

    const useLocal = rosterLocalTimeToggle ? rosterLocalTimeToggle.checked : false;
    const zoneLabel = useLocal ? "Local" : "Z";

    const personRoster = getRosterRows();
    const personRow = personRoster?.rows?.find((p) => isSameStaff(p, person.key));
    const personAssigned = personRow?.overlapping || [];

    listEl.innerHTML = availableDuties.map((duty) => {
      const rowKey = OperationsUtils.rowKey(duty);
      const isAlreadyAssigned = (duty.staff || []).some((s) => isSameStaff(s, person.key));

      let hasConflict = false;
      if (!isAlreadyAssigned && personAssigned.length) {
        const dStart = parseUtcTime(duty.date, duty.start_utc);
        let dEnd = parseUtcTime(duty.date, duty.release_utc);
        if (dEnd <= dStart) dEnd = new Date(dEnd.getTime() + 24 * 60 * 60 * 1000);
        hasConflict = personAssigned.some((a) => {
          const aStart = parseUtcTime(a.date, a.start_utc);
          let aEnd = parseUtcTime(a.date, a.release_utc);
          if (aEnd <= aStart) aEnd = new Date(aEnd.getTime() + 24 * 60 * 60 * 1000);
          return dStart < aEnd && dEnd > aStart;
        });
      }

      const statusBadge = isAlreadyAssigned
        ? `<span class="badge" style="background:#e2e8f0; color:#475569;">Already Assigned</span>`
        : hasConflict
        ? `<span class="badge" style="background:#fee2e2; color:#991b1b;">Time Conflict</span>`
        : `<span class="badge" style="background:#dcfce7; color:#166534;">Available</span>`;

      return `
        <div class="inline-candidate-card" style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:#fff; border:1px solid var(--line); border-radius:6px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <strong style="font-size:13px; color:var(--ink);">${escapeHtml(duty.flight)}</strong>
              <span class="compact-sla" data-sla="${escapeHtml(duty.sla || "")}">${escapeHtml(duty.sla)}</span>
              ${statusBadge}
            </div>
            <div style="font-size:11px; color:var(--muted); margin-top:3px;">
              ${escapeHtml(duty.date)} · ${escapeHtml(getDisplayTime(duty.date, duty.start_utc, useLocal))}–${escapeHtml(getDisplayTime(duty.date, duty.release_utc, useLocal))} ${zoneLabel} · ${escapeHtml(duty.route || "")}
            </div>
            <div style="font-size:10px; color:var(--muted); margin-top:2px;">
              Required: ${duty.required} | Assigned: ${duty.assigned} | Missing: ${duty.missing}
            </div>
          </div>
          <button type="button" class="primary-btn assign-shift-btn" data-duty-row-key="${escapeHtml(rowKey)}" ${isAlreadyAssigned ? "disabled" : ""} style="height:30px; font-size:11px; padding:0 10px;">
            ${isAlreadyAssigned ? "Assigned" : "Assign Shift"}
          </button>
        </div>
      `;
    }).join("");

    listEl.querySelectorAll(".assign-shift-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const rowKey = btn.dataset.dutyRowKey;
        const targetRow = latestRows.find((r) => OperationsUtils.rowKey(r) === rowKey);
        if (!targetRow) return;

        if (rosterStateMode === "original") {
          rosterStateMode = "edited";
          document.querySelectorAll("#rosterStateToggleGroup .state-toggle-btn").forEach((b) => {
            b.classList.toggle("active", b.dataset.stateMode === "edited");
          });
        }

        const formatted = formatStaffLabel(person);
        if (!targetRow.staff) targetRow.staff = [];
        if (!targetRow.staff.some((s) => isSameStaff(s, person.key))) {
          targetRow.staff.push(formatted);
          targetRow.assigned = targetRow.staff.length;
          targetRow.missing = Math.max(0, Number(targetRow.required || 0) - targetRow.assigned);
        }

        currentAutoPlan = null;
        autoPlannerResult.textContent = "Roster changed. Create a new plan to use the updated staffing.";
        renderRoster();
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        setMessage(`Assigned ${person.name} (${person.initials}) to ${targetRow.flight} (${targetRow.sla}) on ${targetRow.date}.`, "success");
      });
    });
  }

  renderShiftOptions();

  if (searchInput) searchInput.oninput = renderShiftOptions;
  if (filterSelect) filterSelect.onchange = renderShiftOptions;
}

function attachAddShiftModalListeners() {
  const modal = document.getElementById("addShiftModal");
  const closeBtn = document.getElementById("addShiftCloseBtn");
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    }
  });

  const exportEditedBtn = document.getElementById("exportEditedRosterBtn");
  if (exportEditedBtn) {
    exportEditedBtn.addEventListener("click", () => {
      downloadRosterCsv("edited");
    });
  }

  const exportOriginalBtn = document.getElementById("exportOriginalRosterBtn");
  if (exportOriginalBtn) {
    exportOriginalBtn.addEventListener("click", () => {
      downloadRosterCsv("original");
    });
  }
}

let currentSwapperState = {
  sourceDuty: null,
  sourceStaff: null,
  targetStaff: null,
  targetDuty: null,
  mode: "transfer",
};

function openShiftSwapperModal(sourceDuty, sourceStaff) {
  const modal = document.getElementById("shiftSwapperModal");
  if (!modal || !sourceDuty || !sourceStaff) return;

  const staffObj = typeof sourceStaff === "object" ? sourceStaff : (StaffUtils?.parseStaffIdentity(sourceStaff) || { key: sourceStaff, name: sourceStaff });
  const staffName = staffObj.name || staffObj.key;
  const staffInitials = staffObj.initials || staffObj.station || "";

  currentSwapperState = {
    sourceDuty,
    sourceStaff: { ...staffObj, name: staffName, initials: staffInitials },
    targetStaff: null,
    targetDuty: null,
    mode: "transfer",
  };

  const nameEl = document.getElementById("swapperSourceStaffName");
  const flightEl = document.getElementById("swapperSourceFlight");
  const metaEl = document.getElementById("swapperSourceMeta");
  const spanEl = document.getElementById("swapperSourceSpan");
  const breakEl = document.getElementById("swapperSourceBreak");

  if (nameEl) nameEl.textContent = `${staffName} (${staffInitials || "STAFF"})`;
  if (flightEl) flightEl.textContent = `${sourceDuty.flight} · ${sourceDuty.sla || "DUTY"}`;

  const durMins = OperationsUtils.dutyMinutes(sourceDuty);
  if (metaEl) metaEl.textContent = `${sourceDuty.date} · ${sourceDuty.start_utc}–${sourceDuty.release_utc} UTC (${formatHours(durMins)}h) · ${sourceDuty.route || ""}`;

  const dayDuties = latestRows.filter((r) => r.date === sourceDuty.date && (r.staff || []).some((s) => isSameStaff(s, staffObj.key)));
  const insp = OperationsUtils.inspectDaySchedule(dayDuties, getPlannerOptions());
  if (spanEl) spanEl.textContent = `Span: ${formatHours(insp.daySpanMinutes || durMins)}h`;
  if (breakEl) breakEl.textContent = `Break: ${formatHours(calculateDayBreakMinutes(dayDuties, false))}h`;

  const targetSelect = document.getElementById("swapperTargetStaffSelect");
  if (targetSelect) {
    const knownStaff = getPlannerPeople();
    const sourceKey = staffObj.key;
    let optHtml = `<option value="">Select target staff member...</option>`;
    for (const p of knownStaff) {
      if (isSameStaff(p, sourceKey)) continue;
      const pInitials = p.initials || p.station || "";
      optHtml += `<option value="${escapeHtml(p.key)}">${escapeHtml(p.name)} (${escapeHtml(pInitials)})</option>`;
    }
    targetSelect.innerHTML = optHtml;
    targetSelect.value = "";
  }

  resetSwapperTargetBox();
  updateSwapperValidation();

  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
}

function resetSwapperTargetBox() {
  const actionSelect = document.getElementById("swapperTargetActionSelect");
  const targetFlight = document.getElementById("swapperTargetFlight");
  const targetMeta = document.getElementById("swapperTargetMeta");
  const targetBadges = document.getElementById("swapperTargetBadges");
  const modeLabel = document.getElementById("swapperModeLabel");

  if (actionSelect) {
    actionSelect.innerHTML = `<option value="transfer">1-Way Transfer (Give duty to Target)</option>`;
    actionSelect.value = "transfer";
  }
  if (targetFlight) targetFlight.textContent = "Select a staff member above";
  if (targetMeta) targetMeta.textContent = "Schedule impact will appear here";
  if (targetBadges) targetBadges.innerHTML = "";
  if (modeLabel) modeLabel.textContent = "1-Way Transfer";
}

function updateSwapperTargetOptions(targetKey) {
  const actionSelect = document.getElementById("swapperTargetActionSelect");

  if (!targetKey) {
    resetSwapperTargetBox();
    updateSwapperValidation();
    return;
  }

  const person = getPlannerPeople().find((p) => isSameStaff(p, targetKey)) ||
                 latestStaffDirectory.find((s) => isSameStaff(s, targetKey)) ||
                 { key: targetKey, name: targetKey, initials: targetKey };

  currentSwapperState.targetStaff = person;

  const { sourceDuty } = currentSwapperState;
  const targetDutiesOnDate = latestRows.filter((r) => r.date === sourceDuty.date && (r.staff || []).some((s) => isSameStaff(s, targetKey)));

  let actionHtml = `<option value="transfer">1-Way Transfer (Give ${sourceDuty.flight} to ${person.name})</option>`;
  for (const td of targetDutiesOnDate) {
    const rowKey = OperationsUtils.rowKey(td);
    actionHtml += `<option value="swap_${escapeHtml(rowKey)}">2-Way Swap with ${escapeHtml(td.flight)} (${escapeHtml(td.start_utc)}–${escapeHtml(td.release_utc)} UTC, ${escapeHtml(td.sla || "")})</option>`;
  }

  if (actionSelect) {
    actionSelect.innerHTML = actionHtml;
    if (targetDutiesOnDate.length > 0) {
      actionSelect.value = `swap_${OperationsUtils.rowKey(targetDutiesOnDate[0])}`;
    } else {
      actionSelect.value = "transfer";
    }
  }

  handleSwapperActionChange();
}

function handleSwapperActionChange() {
  const actionSelect = document.getElementById("swapperTargetActionSelect");
  const targetFlight = document.getElementById("swapperTargetFlight");
  const targetMeta = document.getElementById("swapperTargetMeta");
  const targetBadges = document.getElementById("swapperTargetBadges");
  const modeLabel = document.getElementById("swapperModeLabel");
  const val = actionSelect?.value || "transfer";

  const { sourceDuty, targetStaff } = currentSwapperState;
  if (!targetStaff) return;

  if (val.startsWith("swap_")) {
    const targetRowKey = val.replace("swap_", "");
    const targetDuty = latestRows.find((r) => OperationsUtils.rowKey(r) === targetRowKey);
    currentSwapperState.targetDuty = targetDuty || null;
    currentSwapperState.mode = "swap";
    if (modeLabel) modeLabel.textContent = "2-Way Swap";

    if (targetDuty) {
      if (targetFlight) targetFlight.textContent = `${targetDuty.flight} · ${targetDuty.sla || "DUTY"}`;
      const durMins = OperationsUtils.dutyMinutes(targetDuty);
      if (targetMeta) targetMeta.textContent = `${targetDuty.date} · ${targetDuty.start_utc}–${targetDuty.release_utc} UTC (${formatHours(durMins)}h) · ${targetDuty.route || ""}`;
      if (targetBadges) {
        targetBadges.innerHTML = `
          <span class="badge" style="background:#eff6ff; color:#1d4ed8; font-weight:600;">2-Way Exchange</span>
          <span class="badge" style="background:#f1f5f9; color:#475569;">${targetDuty.sla || "SLA"}</span>
        `;
      }
    }
  } else {
    currentSwapperState.targetDuty = null;
    currentSwapperState.mode = "transfer";
    if (modeLabel) modeLabel.textContent = "1-Way Transfer";
    if (targetFlight) targetFlight.textContent = `Duty Transfer to ${targetStaff.name}`;
    if (targetMeta) targetMeta.textContent = `${sourceDuty.flight} will be transferred to ${targetStaff.name}. ${currentSwapperState.sourceStaff.name} will have no shift on this slot.`;
    if (targetBadges) {
      targetBadges.innerHTML = `<span class="badge" style="background:#dcfce7; color:#166534; font-weight:600;">1-Way Assignment</span>`;
    }
  }

  updateSwapperValidation();
}

function updateSwapperValidation() {
  const badge = document.getElementById("swapperValidationBadge");
  const text = document.getElementById("swapperValidationText");
  const confirmBtn = document.getElementById("shiftSwapperConfirmBtn");
  const metricsBox = document.getElementById("swapperImpactMetrics");
  const staffAName = document.getElementById("swapperStaffAName");
  const staffAStats = document.getElementById("swapperStaffAStats");
  const staffBName = document.getElementById("swapperStaffBName");
  const staffBStats = document.getElementById("swapperStaffBStats");

  const { sourceDuty, sourceStaff, targetStaff, targetDuty, mode } = currentSwapperState;

  if (!sourceDuty || !sourceStaff || !targetStaff) {
    if (badge) {
      badge.textContent = "Awaiting Target";
      badge.className = "validation-status-pill pill-warning";
    }
    if (text) text.textContent = "Select a target staff member above to validate shift compatibility.";
    if (confirmBtn) confirmBtn.disabled = true;
    if (metricsBox) metricsBox.hidden = true;
    return;
  }

  const result = OperationsUtils.validateShiftSwap(
    sourceDuty,
    sourceStaff,
    targetDuty,
    targetStaff,
    latestRows,
    latestStaffDirectory,
    getPlannerOptions()
  );

  if (result.valid) {
    if (badge) {
      badge.textContent = "Clean Swap — Valid";
      badge.className = "validation-status-pill pill-valid";
    }
    if (text) text.textContent = result.summaryText;
    if (confirmBtn) {
      confirmBtn.disabled = false;
      confirmBtn.textContent = mode === "swap" ? "Confirm 2-Way Swap" : "Confirm Duty Transfer";
    }
  } else {
    const isOverlapConflict = (result.messages || []).some((m) => m.toLowerCase().includes("overlap")) ||
      (result.staffA?.violations || []).includes("overlap") ||
      (result.staffB?.violations || []).includes("overlap");
    if (badge) {
      badge.textContent = isOverlapConflict ? "⚠️ OVERLAP COLLISION" : "Conflict Detected";
      badge.className = isOverlapConflict ? "validation-status-pill pill-invalid" : "validation-status-pill pill-invalid";
    }
    if (text) {
      const msgStr = result.messages.map((m) => m.replace(/overlap/gi, "⚠️ OVERLAP COLLISION")).join(" • ");
      text.textContent = `Schedule conflict: ${msgStr}`;
    }
    if (confirmBtn) {
      confirmBtn.disabled = false;
      confirmBtn.textContent = mode === "swap" ? "Override & Swap (With Warning)" : "Override & Transfer (With Warning)";
    }
  }

  if (metricsBox) {
    metricsBox.hidden = false;
    const aOverlap = (result.staffA?.violations || []).includes("overlap") ? ` <span class="overlap-badge">⚠️ OVERLAP</span>` : "";
    const bOverlap = (result.staffB?.violations || []).includes("overlap") ? ` <span class="overlap-badge">⚠️ OVERLAP</span>` : "";

    if (staffAName) staffAName.innerHTML = `${escapeHtml(sourceStaff.name)} (After)${aOverlap}`;
    if (staffAStats) {
      staffAStats.textContent = `Hours: ${formatHours(result.staffA.totalDutyMinutes)}h · Span: ${formatHours(result.staffA.daySpanMinutes)}h · Duties: ${result.staffA.simulatedDutiesCount}`;
    }
    if (staffBName) staffBName.innerHTML = `${escapeHtml(targetStaff.name)} (After)${bOverlap}`;
    if (staffBStats) {
      staffBStats.textContent = `Hours: ${formatHours(result.staffB.totalDutyMinutes)}h · Span: ${formatHours(result.staffB.daySpanMinutes)}h · Duties: ${result.staffB.simulatedDutiesCount}`;
    }
  }
}

function executeShiftSwap() {
  const { sourceDuty, sourceStaff, targetStaff, targetDuty, mode } = currentSwapperState;
  if (!sourceDuty || !sourceStaff || !targetStaff) return;

  const modal = document.getElementById("shiftSwapperModal");
  if (modal) {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
  }

  if (rosterStateMode === "original") {
    rosterStateMode = "edited";
    document.querySelectorAll("#rosterStateToggleGroup .state-toggle-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.stateMode === "edited");
    });
  }

  const rowKeyA = OperationsUtils.rowKey(sourceDuty);
  const rowKeyB = targetDuty ? OperationsUtils.rowKey(targetDuty) : null;

  const targetRowA = latestRows.find((r) => OperationsUtils.rowKey(r) === rowKeyA);
  const targetRowB = rowKeyB ? latestRows.find((r) => OperationsUtils.rowKey(r) === rowKeyB) : null;

  // Snapshot before for Undo
  const prevStaffListA = targetRowA ? [...(targetRowA.staff || [])] : [];
  const prevStaffListB = targetRowB ? [...(targetRowB.staff || [])] : [];

  const formattedTarget = formatStaffLabel(targetStaff);
  const formattedSource = formatStaffLabel(sourceStaff);

  if (targetRowA) {
    targetRowA.staff = (targetRowA.staff || []).filter((s) => !isSameStaff(s, sourceStaff.key) && !isSameStaff(s, sourceStaff.name));
    if (!targetRowA.staff.some((s) => isSameStaff(s, targetStaff.key))) {
      targetRowA.staff.push(formattedTarget);
    }
    targetRowA.assigned = targetRowA.staff.length;
    targetRowA.missing = Math.max(0, Number(targetRowA.required || 0) - targetRowA.assigned);
  }

  if (targetRowB) {
    targetRowB.staff = (targetRowB.staff || []).filter((s) => !isSameStaff(s, targetStaff.key) && !isSameStaff(s, targetStaff.name));
    if (!targetRowB.staff.some((s) => isSameStaff(s, sourceStaff.key))) {
      targetRowB.staff.push(formattedSource);
    }
    targetRowB.assigned = targetRowB.staff.length;
    targetRowB.missing = Math.max(0, Number(targetRowB.required || 0) - targetRowB.assigned);
  }

  currentAutoPlan = null;
  autoPlannerResult.textContent = "Roster changed. Create a new plan to use the updated staffing.";

  applyFilters();
  if (typeof renderRoster === "function") renderRoster();
  if (typeof renderReplacements === "function") renderReplacements();

  const actionDescription = mode === "swap"
    ? `Swapped ${sourceDuty.flight} (${sourceStaff.name}) with ${targetDuty.flight} (${targetStaff.name})`
    : `Transferred ${sourceDuty.flight} from ${sourceStaff.name} to ${targetStaff.name}`;

  pushUndoAction(actionDescription, () => {
    if (targetRowA) {
      targetRowA.staff = prevStaffListA;
      targetRowA.assigned = targetRowA.staff.length;
      targetRowA.missing = Math.max(0, Number(targetRowA.required || 0) - targetRowA.assigned);
    }
    if (targetRowB) {
      targetRowB.staff = prevStaffListB;
      targetRowB.assigned = targetRowB.staff.length;
      targetRowB.missing = Math.max(0, Number(targetRowB.required || 0) - targetRowB.assigned);
    }
    currentAutoPlan = null;
    applyFilters();
    if (typeof renderRoster === "function") renderRoster();
    if (typeof renderReplacements === "function") renderReplacements();
  });
}

function attachShiftSwapperModalListeners() {
  const modal = document.getElementById("shiftSwapperModal");
  const closeBtn = document.getElementById("shiftSwapperCloseBtn");
  const cancelBtn = document.getElementById("shiftSwapperCancelBtn");
  const confirmBtn = document.getElementById("shiftSwapperConfirmBtn");
  const targetSelect = document.getElementById("swapperTargetStaffSelect");
  const actionSelect = document.getElementById("swapperTargetActionSelect");
  const directionIcon = document.getElementById("swapperDirectionIcon");

  if (closeBtn) closeBtn.addEventListener("click", () => { modal.hidden = true; modal.setAttribute("aria-hidden", "true"); });
  if (cancelBtn) cancelBtn.addEventListener("click", () => { modal.hidden = true; modal.setAttribute("aria-hidden", "true"); });
  if (confirmBtn) confirmBtn.addEventListener("click", executeShiftSwap);

  if (targetSelect) {
    targetSelect.addEventListener("change", (e) => {
      updateSwapperTargetOptions(e.target.value);
    });
  }

  if (actionSelect) {
    actionSelect.addEventListener("change", handleSwapperActionChange);
  }

  if (directionIcon) {
    directionIcon.addEventListener("click", () => {
      if (actionSelect && actionSelect.options.length > 1) {
        const currentVal = actionSelect.value;
        if (currentVal === "transfer") {
          actionSelect.selectedIndex = 1;
        } else {
          actionSelect.value = "transfer";
        }
        handleSwapperActionChange();
      }
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
      }
    });
  }
}

// ============================================================================
// AUTO SCANNER MODULE & CONTROLLER
// ============================================================================

const AUTO_SCAN_SETTINGS_KEY = "gsrm_auto_scan_settings_v1";

const DEFAULT_AUTO_SCAN_SETTINGS = {
  enabled: false,
  intervalMinutes: 360,
  rangeMode: "active",
  customMinutes: 360,
  bypassCache: true,
  notifyNewGaps: true,
  playSound: true,
  pauseWhileEditing: true,
  activeHoursOnly: false,
  startHour: 6,
  endHour: 22,
};

let autoScanSettings = loadAutoScanSettings();
let autoScanTimerId = null;
let autoScanCountdownSeconds = 0;
let autoScanIsRunning = false;
let lastAutoScanResult = null;

let lastUnconnectedAlertTime = 0;

function loadAutoScanSettings() {
  try {
    const raw = localStorage.getItem(AUTO_SCAN_SETTINGS_KEY);
    if (raw) {
      return { ...DEFAULT_AUTO_SCAN_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error("Failed to load auto scan settings", e);
  }
  return { ...DEFAULT_AUTO_SCAN_SETTINGS };
}

function saveAutoScanSettings(newSettings) {
  const wasEnabled = autoScanSettings.enabled;
  autoScanSettings = { ...autoScanSettings, ...newSettings };
  try {
    localStorage.setItem(AUTO_SCAN_SETTINGS_KEY, JSON.stringify(autoScanSettings));
  } catch (e) {
    console.error("Failed to save auto scan settings", e);
  }
  syncAutoScanUI();
  restartAutoScanTimer();

  if (autoScanSettings.enabled && !connectedEmail) {
    showToast("Auto-Scan is Enabled (PAUSED): AVBIS is not connected. Please enter your credentials and click 'Connect to AVBIS'.", { kind: "warn", duration: 7000 });
    setMessage("Auto-Scan paused: AVBIS connection required. Please connect to AVBIS to start auto-scanning.", "warn");
    setSetupCollapsed(false);
  } else if (autoScanSettings.enabled && !wasEnabled) {
    showToast("Auto-Scan turned ON", { kind: "success", duration: 3500 });
  }
}

function getEffectiveIntervalMinutes() {
  if (autoScanSettings.intervalMinutes === "custom" || autoScanSettings.intervalMinutes === 0) {
    return Math.max(1, parseInt(autoScanSettings.customMinutes, 10) || 360);
  }
  return Math.max(1, parseInt(autoScanSettings.intervalMinutes, 10) || 360);
}

function playAutoScanChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.36);
  } catch (e) {
    // Audio context may be blocked before interaction
  }
}

function sendDesktopNotification(title, body) {
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    try { new Notification(title, { body }); } catch (e) {}
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        try { new Notification(title, { body }); } catch (e) {}
      }
    });
  }
}

function computeAutoScanDateRange() {
  const mode = autoScanSettings.rangeMode || "active";
  const now = new Date();
  const formatYMD = (d) => d.toISOString().slice(0, 10);

  if (mode === "today") {
    const todayStr = formatYMD(now);
    return { startDate: todayStr, endDate: todayStr };
  } else if (mode === "3days") {
    const startStr = formatYMD(now);
    const end = new Date(now);
    end.setDate(end.getDate() + 2);
    return { startDate: startStr, endDate: formatYMD(end) };
  } else if (mode === "7days") {
    const startStr = formatYMD(now);
    const end = new Date(now);
    end.setDate(end.getDate() + 6);
    return { startDate: startStr, endDate: formatYMD(end) };
  } else if (mode === "month") {
    const y = now.getUTCFullYear();
    const m = now.getUTCMonth();
    const firstDay = new Date(Date.UTC(y, m, 1));
    const lastDay = new Date(Date.UTC(y, m + 1, 0));
    return { startDate: formatYMD(firstDay), endDate: formatYMD(lastDay) };
  }
  return null;
}

function calculateScanGapDiff(previousRows, currentRows) {
  const prevSet = new Set(previousRows.map((r) => `${r.date}_${r.flight}_${r.dutyId || r.sla || ''}`));
  const newGaps = currentRows.filter((r) => !prevSet.has(`${r.date}_${r.flight}_${r.dutyId || r.sla || ''}`));
  return {
    newGapsCount: newGaps.length,
    newGaps,
  };
}

function isUserActivelyEditing() {
  const coveragePlannerModal = document.getElementById("coveragePlannerModal");
  const availModal = document.getElementById("availabilityModal");
  const swapperModal = document.getElementById("shiftSwapperModal");
  const isModalOpen = (el) => el && !el.hidden && el.getAttribute("aria-hidden") !== "true";
  return isModalOpen(coveragePlannerModal) || isModalOpen(availModal) || isModalOpen(swapperModal);
}

function isWithinActiveHours() {
  if (!autoScanSettings.activeHoursOnly) return true;
  const currentUtcHour = new Date().getUTCHours();
  const start = parseInt(autoScanSettings.startHour, 10) || 6;
  const end = parseInt(autoScanSettings.endHour, 10) || 22;
  if (start <= end) {
    return currentUtcHour >= start && currentUtcHour <= end;
  } else {
    return currentUtcHour >= start || currentUtcHour <= end;
  }
}

function restartAutoScanTimer() {
  if (autoScanTimerId) {
    clearInterval(autoScanTimerId);
    autoScanTimerId = null;
  }

  if (!autoScanSettings.enabled) {
    autoScanCountdownSeconds = 0;
    syncAutoScanUI();
    return;
  }

  const intervalMins = getEffectiveIntervalMinutes();
  autoScanCountdownSeconds = intervalMins * 60;
  syncAutoScanUI();

  autoScanTimerId = setInterval(() => {
    tickAutoScanTimer();
  }, 1000);
}

function tickAutoScanTimer() {
  if (!autoScanSettings.enabled) return;
  if (autoScanIsRunning) return;

  autoScanCountdownSeconds--;

  if (autoScanCountdownSeconds <= 0) {
    triggerAutoScanCycle(false);
  } else {
    updateAutoScanCountdownDisplay();
  }
}

async function triggerAutoScanCycle(isManualNow = false) {
  if (autoScanIsRunning) return;

  // Refresh server AVBIS session state
  if (typeof refreshConnectionState === "function") {
    await refreshConnectionState();
  }

  if (!isManualNow) {
    if (!autoScanSettings.enabled) return;

    if (!connectedEmail) {
      updateAutoScanStatusText("Paused: Connect to AVBIS first");
      const now = Date.now();
      if (now - lastUnconnectedAlertTime > 15 * 60 * 1000) {
        lastUnconnectedAlertTime = now;
        showToast("Auto-Scan is paused because AVBIS is not connected. Please connect to AVBIS to start auto-scanning.", { kind: "warn", duration: 7000 });
        setMessage("Auto-Scan paused: Not connected to AVBIS. Click 'Connect to AVBIS' in setup.", "warn");
      }
      return;
    }

    if (isBusy) {
      autoScanCountdownSeconds = 30;
      updateAutoScanStatusText("Deferred: Manual scan in progress (retrying in 30s)");
      return;
    }

    if (autoScanSettings.pauseWhileEditing && isUserActivelyEditing()) {
      autoScanCountdownSeconds = 60;
      updateAutoScanStatusText("Paused: Planning session active (retrying in 60s)");
      return;
    }

    if (!isWithinActiveHours()) {
      autoScanCountdownSeconds = 300;
      updateAutoScanStatusText(`Paused: Outside active UTC hours (${autoScanSettings.startHour}:00-${autoScanSettings.endHour}:00 UTC)`);
      return;
    }
  } else {
    // Manual "Scan Now" triggered by user
    if (!connectedEmail) {
      updateAutoScanStatusText("Paused: Connect to AVBIS first");
      showToast("Cannot run scan: Not connected to AVBIS. Please enter your credentials and click 'Connect to AVBIS'.", { kind: "error", duration: 7000 });
      setMessage("Scan failed: Not connected to AVBIS. Please enter your credentials and click 'Connect to AVBIS'.", "error");
      setSetupCollapsed(false);
      return;
    }
  }

  autoScanIsRunning = true;
  syncAutoScanUI();

  const previousRows = [...latestRows];
  const dateRange = computeAutoScanDateRange();

  try {
    updateAutoScanStatusText("Scanning AVBIS...");
    await runScan(autoScanSettings.bypassCache, {
      isAutoScan: true,
      dateRangeOverride: dateRange,
    });

    const diff = calculateScanGapDiff(previousRows, latestRows);
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    lastAutoScanResult = {
      timestamp: new Date().toISOString(),
      timeFormatted: nowStr,
      status: "success",
      gapsCount: latestRows.length,
      newGapsCount: diff.newGapsCount,
    };

    if (diff.newGapsCount > 0 && autoScanSettings.notifyNewGaps) {
      const msg = `${diff.newGapsCount} new empty slot gap(s) detected during background auto-scan!`;
      setMessage(msg, "warn");
      sendDesktopNotification("GSRM Empty Slots Alert", msg);
      if (autoScanSettings.playSound) playAutoScanChime();
    } else if (typeof showToast === "function") {
      showToast(`Auto-Scan complete: ${latestRows.length} gap(s) monitored.`, { kind: "info", duration: 4000 });
    }

  } catch (err) {
    console.error("Auto-scan error:", err);
    const errMsg = err.message || String(err);
    lastAutoScanResult = {
      timestamp: new Date().toISOString(),
      timeFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "error",
      error: errMsg,
    };

    showToast(`Auto-Scan Error: ${errMsg}`, { kind: "error", duration: 8000 });
    setMessage(`Auto-Scan failed: ${errMsg}`, "error");
    sendDesktopNotification("GSRM Auto-Scan Failure", `Scan failed: ${errMsg}`);

    if (/login|session|auth|unauthorized|401|credentials/i.test(errMsg)) {
      connectedEmail = "";
      updateConnectionState(false, "AVBIS session expired");
      showToast("AVBIS session expired. Please reconnect to AVBIS to resume Auto-Scan.", { kind: "error", duration: 9000 });
      setSetupCollapsed(false);
    }
  } finally {
    autoScanIsRunning = false;
    const intervalMins = getEffectiveIntervalMinutes();
    autoScanCountdownSeconds = intervalMins * 60;
    syncAutoScanUI();
  }
}

function formatCountdownTime(seconds) {
  if (seconds <= 0) return "0s";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}h ${m}m ${s < 10 ? '0' : ''}${s}s`;
  }
  if (m > 0) {
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  }
  return `${s}s`;
}

function updateAutoScanCountdownDisplay() {
  const badgeText = document.getElementById("autoScanBadgeText");
  const nextCountdownText = document.getElementById("autoScanNextCountdown");

  if (!autoScanSettings.enabled) {
    if (badgeText) badgeText.textContent = "Auto-Scan: OFF";
    if (nextCountdownText) nextCountdownText.textContent = "Timer stopped";
    return;
  }

  if (autoScanIsRunning) {
    if (badgeText) badgeText.textContent = "Auto-Scan: Scanning...";
    if (nextCountdownText) nextCountdownText.textContent = "Scanning in progress...";
    return;
  }

  const countdownStr = formatCountdownTime(autoScanCountdownSeconds);
  if (badgeText) badgeText.textContent = `Auto-Scan: ${countdownStr}`;
  if (nextCountdownText) nextCountdownText.textContent = `Next scan in ${countdownStr}`;
}

function updateAutoScanStatusText(msg) {
  const nextCountdownText = document.getElementById("autoScanNextCountdown");
  if (nextCountdownText) nextCountdownText.textContent = msg;
}

function syncAutoScanUI() {
  const toggleBtn = document.getElementById("autoScanToggleBtn");
  const headerDot = document.getElementById("autoScanHeaderDot");
  const badgeText = document.getElementById("autoScanBadgeText");
  const setupDot = document.getElementById("setupAutoScanDot");
  const setupHint = document.getElementById("setupAutoScanHint");
  const mainToggle = document.getElementById("autoScanMainToggle");
  const stateBadge = document.getElementById("autoScanStateBadge");
  const lastRunText = document.getElementById("autoScanLastRunText");

  const isEnabled = Boolean(autoScanSettings.enabled);
  const isPaused = isEnabled && (!connectedEmail || (autoScanSettings.pauseWhileEditing && isUserActivelyEditing()));

  if (toggleBtn) {
    toggleBtn.classList.toggle("auto-scan-active", isEnabled && !isPaused && !autoScanIsRunning);
    toggleBtn.classList.toggle("auto-scan-paused", isEnabled && isPaused);
    toggleBtn.classList.toggle("auto-scan-off", !isEnabled);
  }

  if (headerDot) {
    headerDot.classList.toggle("active", isEnabled && !isPaused);
    headerDot.classList.toggle("paused", isEnabled && isPaused);
  }

  if (setupDot) {
    setupDot.classList.toggle("active", isEnabled && !isPaused);
    setupDot.classList.toggle("paused", isEnabled && isPaused);
  }

  if (setupHint) {
    const mins = getEffectiveIntervalMinutes();
    const intervalStr = mins >= 60 ? (mins % 60 === 0 ? `${mins / 60}h` : `${(mins / 60).toFixed(1)}h`) : `${mins} min`;
    if (!isEnabled) {
      setupHint.textContent = "Auto-Scan is currently OFF. Click to configure background refresh.";
    } else if (isPaused) {
      setupHint.textContent = `Auto-Scan enabled (${intervalStr}) · Currently PAUSED`;
    } else {
      setupHint.textContent = `Auto-Scan ACTIVE · Refreshing every ${intervalStr}`;
    }
  }

  if (mainToggle) {
    mainToggle.checked = isEnabled;
  }

  if (stateBadge) {
    if (!isEnabled) {
      stateBadge.className = "auto-scan-state-pill pill-off";
      stateBadge.textContent = "Inactive";
    } else if (isPaused) {
      stateBadge.className = "auto-scan-state-pill pill-paused";
      stateBadge.textContent = "Paused";
    } else {
      stateBadge.className = "auto-scan-state-pill pill-active";
      stateBadge.textContent = "Active";
    }
  }

  if (lastRunText) {
    if (lastAutoScanResult) {
      const statusLabel = lastAutoScanResult.status === "success" ? `Success (${lastAutoScanResult.gapsCount} gaps)` : `Failed`;
      lastRunText.textContent = `Last run at ${lastAutoScanResult.timeFormatted} · ${statusLabel}`;
    } else {
      lastRunText.textContent = "No auto-scan executed yet";
    }
  }

  updateAutoScanCountdownDisplay();
}

function populateAutoScanModalFields() {
  const mainToggle = document.getElementById("autoScanMainToggle");
  const intervalSelect = document.getElementById("autoScanIntervalSelect");
  const customWrap = document.getElementById("autoScanCustomIntervalWrap");
  const customInput = document.getElementById("autoScanCustomMinutes");
  const rangeSelect = document.getElementById("autoScanRangeModeSelect");
  const bypassToggle = document.getElementById("autoScanBypassCacheToggle");
  const notifyToggle = document.getElementById("autoScanNotifyNewGapsToggle");
  const soundToggle = document.getElementById("autoScanPlaySoundToggle");
  const pauseEditingToggle = document.getElementById("autoScanPauseEditingToggle");
  const activeHoursToggle = document.getElementById("autoScanActiveHoursToggle");
  const hoursRow = document.getElementById("autoScanHoursRow");
  const startHourInput = document.getElementById("autoScanStartHour");
  const endHourInput = document.getElementById("autoScanEndHour");

  if (mainToggle) mainToggle.checked = autoScanSettings.enabled;
  if (intervalSelect) intervalSelect.value = String(autoScanSettings.intervalMinutes);
  if (customInput) customInput.value = String(autoScanSettings.customMinutes || 20);
  if (customWrap) customWrap.hidden = intervalSelect.value !== "custom";
  if (rangeSelect) rangeSelect.value = autoScanSettings.rangeMode || "active";
  if (bypassToggle) bypassToggle.checked = autoScanSettings.bypassCache;
  if (notifyToggle) notifyToggle.checked = autoScanSettings.notifyNewGaps;
  if (soundToggle) soundToggle.checked = autoScanSettings.playSound;
  if (pauseEditingToggle) pauseEditingToggle.checked = autoScanSettings.pauseWhileEditing;
  if (activeHoursToggle) activeHoursToggle.checked = autoScanSettings.activeHoursOnly;
  if (hoursRow) hoursRow.hidden = !autoScanSettings.activeHoursOnly;
  if (startHourInput) startHourInput.value = String(autoScanSettings.startHour || 6);
  if (endHourInput) endHourInput.value = String(autoScanSettings.endHour || 22);

  syncAutoScanUI();
}

function openAutoScanModal() {
  const modal = document.getElementById("autoScanModal");
  if (!modal) return;
  populateAutoScanModalFields();
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
}

function closeAutoScanModal() {
  const modal = document.getElementById("autoScanModal");
  if (!modal) return;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
}

function readAutoScanModalFields() {
  const mainToggle = document.getElementById("autoScanMainToggle");
  const intervalSelect = document.getElementById("autoScanIntervalSelect");
  const customInput = document.getElementById("autoScanCustomMinutes");
  const rangeSelect = document.getElementById("autoScanRangeModeSelect");
  const bypassToggle = document.getElementById("autoScanBypassCacheToggle");
  const notifyToggle = document.getElementById("autoScanNotifyNewGapsToggle");
  const soundToggle = document.getElementById("autoScanPlaySoundToggle");
  const pauseEditingToggle = document.getElementById("autoScanPauseEditingToggle");
  const activeHoursToggle = document.getElementById("autoScanActiveHoursToggle");
  const startHourInput = document.getElementById("autoScanStartHour");
  const endHourInput = document.getElementById("autoScanEndHour");

  return {
    enabled: Boolean(mainToggle?.checked),
    intervalMinutes: intervalSelect?.value === "custom" ? "custom" : parseInt(intervalSelect?.value, 10) || 15,
    customMinutes: Math.max(1, parseInt(customInput?.value, 10) || 20),
    rangeMode: rangeSelect?.value || "active",
    bypassCache: Boolean(bypassToggle?.checked),
    notifyNewGaps: Boolean(notifyToggle?.checked),
    playSound: Boolean(soundToggle?.checked),
    pauseWhileEditing: Boolean(pauseEditingToggle?.checked),
    activeHoursOnly: Boolean(activeHoursToggle?.checked),
    startHour: Math.min(23, Math.max(0, parseInt(startHourInput?.value, 10) || 6)),
    endHour: Math.min(23, Math.max(0, parseInt(endHourInput?.value, 10) || 22)),
  };
}

function initAutoScanner() {
  document.getElementById("autoScanToggleBtn")?.addEventListener("click", () => {
    saveAutoScanSettings({ enabled: !autoScanSettings.enabled });
  });

  document.getElementById("autoScanSettingsBtn")?.addEventListener("click", openAutoScanModal);
  document.getElementById("setupAutoScanConfigBtn")?.addEventListener("click", openAutoScanModal);

  document.getElementById("autoScanModalCloseBtn")?.addEventListener("click", closeAutoScanModal);
  document.getElementById("autoScanModalCancelBtn")?.addEventListener("click", closeAutoScanModal);
  
  const modalOverlay = document.getElementById("autoScanModal");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeAutoScanModal();
    });
  }

  document.getElementById("autoScanIntervalSelect")?.addEventListener("change", (e) => {
    const customWrap = document.getElementById("autoScanCustomIntervalWrap");
    if (customWrap) customWrap.hidden = e.target.value !== "custom";
  });

  document.getElementById("autoScanActiveHoursToggle")?.addEventListener("change", (e) => {
    const hoursRow = document.getElementById("autoScanHoursRow");
    if (hoursRow) hoursRow.hidden = !e.target.checked;
  });

  document.getElementById("autoScanModalSaveBtn")?.addEventListener("click", () => {
    const newSettings = readAutoScanModalFields();
    saveAutoScanSettings(newSettings);
    closeAutoScanModal();
  });

  document.getElementById("autoScanRunNowBtn")?.addEventListener("click", () => {
    closeAutoScanModal();
    triggerAutoScanCycle(true);
  });

  syncAutoScanUI();
  if (autoScanSettings.enabled) {
    restartAutoScanTimer();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    attachAddShiftModalListeners();
    attachRosterDragAndDropListeners();
    attachShiftSwapperModalListeners();
    initAutoScanner();
  });
} else {
  attachAddShiftModalListeners();
  attachRosterDragAndDropListeners();
  attachShiftSwapperModalListeners();
  initAutoScanner();
}



