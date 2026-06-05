const form = document.getElementById("scanForm");
const runBtn = document.getElementById("runBtn");
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

let latestRows = [];
let filteredRows = [];
let progressTimer = null;

runBtn.addEventListener("click", runScan);
airlinesBtn.addEventListener("click", refreshAirlines);
csvBtn.addEventListener("click", () => downloadCsv(filteredRows));

const resultsSearch = document.getElementById("resultsSearch");
const resultsSlaFilter = document.getElementById("resultsSlaFilter");
const resultsDirectionFilter = document.getElementById("resultsDirectionFilter");
const resultsMissingFilter = document.getElementById("resultsMissingFilter");
const resultsStartTimeFilter = document.getElementById("resultsStartTimeFilter");
const resultsEndTimeFilter = document.getElementById("resultsEndTimeFilter");
const resultsLocalTimeToggle = document.getElementById("resultsLocalTimeToggle");

resultsSearch.addEventListener("input", applyFilters);
resultsSlaFilter.addEventListener("change", applyFilters);
resultsDirectionFilter.addEventListener("change", applyFilters);
resultsMissingFilter.addEventListener("change", applyFilters);
resultsStartTimeFilter.addEventListener("input", applyFilters);
resultsEndTimeFilter.addEventListener("input", applyFilters);
resultsLocalTimeToggle.addEventListener("change", applyFilters);

async function runScan() {
  const payload = readForm();
  payload.scanId = createScanId();
  setBusy(true);
  setMessage("Scanning Flight Comms and SOD endpoint data...");
  resetProgress(payload.scanId);
  startProgressPolling(payload.scanId);
  
  // Reset filter inputs
  resultsSearch.value = "";
  resultsSlaFilter.value = "";
  resultsDirectionFilter.value = "";
  resultsMissingFilter.value = "";
  resultsStartTimeFilter.value = "";
  resultsEndTimeFilter.value = "";
  resultsLocalTimeToggle.checked = false;
  latestRows = [];
  updateResultsSlaFilter();
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
    populateAirlines(result.airlines || [], payload.airlines);
    populateSlas(result.slas || [], payload.slas);
    updateResultsSlaFilter();
    applyFilters();
    flightCount.textContent = result.scannedFlights || 0;
    dateCount.textContent = (result.scannedDates || []).length;

    const errorSuffix = result.errors?.length ? ` ${result.errors.length} flight(s) had endpoint errors.` : "";
    setMessage(`Done. JSON rows are available in the browser response and table.${errorSuffix}`, result.errors?.length ? "warn" : "");
    const finalProgress = await pollProgress(payload.scanId);
    renderFinishedProgress(result, finalProgress);
    console.log("Empty SOD slot JSON:", result);
  } catch (error) {
    latestRows = [];
    updateResultsSlaFilter();
    applyFilters();
    flightCount.textContent = "0";
    dateCount.textContent = "0";
    setMessage(error.message || String(error), "error");
  } finally {
    stopProgressPolling();
    setBusy(false);
  }
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
    tr.innerHTML = '<td colspan="9" class="empty">No empty slots found.</td>';
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
    `;
    resultsBody.appendChild(tr);
  }
}

function setBusy(isBusy) {
  runBtn.disabled = isBusy;
  airlinesBtn.disabled = isBusy;
  runBtn.textContent = isBusy ? "Running..." : "Run";
}

function setAirlinesBusy(isBusy) {
  airlinesBtn.disabled = isBusy;
  runBtn.disabled = isBusy;
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

function resetProgress(scanId) {
  progressPanel.hidden = false;
  progressPanel.dataset.scanId = scanId;
  progressDate.textContent = "-";
  progressFlight.textContent = "-";
  progressElapsed.textContent = "0s";
  progressBar.style.width = "0%";
  progressText.textContent = "Starting...";
  progressDates.innerHTML = "";
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
  const totalDates = Number(progress.totalDates || 0);
  const currentFlightIndex = Number(progress.currentFlightIndex || 0);
  const currentFlightTotal = Number(progress.currentFlightTotal || 0);
  const datePart = progress.currentDate || (progress.done ? "Complete" : "-");
  const flightPart = [progress.currentFlight, progress.currentDirection].filter(Boolean).join(" ") || "-";
  const datePercent = totalDates ? (completedDates / totalDates) * 100 : 0;
  const flightPercent = currentFlightTotal ? (currentFlightIndex / currentFlightTotal) * (100 / Math.max(1, totalDates)) : 0;
  const percent = Math.min(100, progress.done ? 100 : datePercent + flightPercent);

  progressDate.textContent = totalDates ? `${datePart} (${completedDates}/${totalDates})` : datePart;
  progressFlight.textContent = currentFlightTotal ? `${flightPart} (${currentFlightIndex}/${currentFlightTotal})` : flightPart;
  progressElapsed.textContent = progress.elapsedLabel || "0s";
  progressBar.style.width = `${percent}%`;
  progressText.textContent = progress.message || "Scanning...";
  renderProgressDates(progress.dateSummaries || []);
}

function renderFinishedProgress(result, progress = null) {
  const scannedDates = result.scannedDates || [];
  progressPanel.hidden = false;
  progressDate.textContent = `Complete (${scannedDates.length}/${scannedDates.length})`;
  progressFlight.textContent = "-";
  progressElapsed.textContent = progress?.elapsedLabel || progressElapsed.textContent || "0s";
  progressBar.style.width = "100%";
  progressText.textContent = progress?.message || `Done. ${latestRows.length} empty slot group(s), ${result.scannedFlights || 0} flight(s).`;
  if (progress?.dateSummaries) renderProgressDates(progress.dateSummaries);
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
      <span>${escapeHtml(summary.elapsedLabel || "")}</span>
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
        return csvCell(row[header]);
      });
      return line.join(",");
    }),
  ].join("\n");
  downloadBlob("gsrm-empty-sod-slots.csv", csv, "text/csv;charset=utf-8");
  downloadBlob("gsrm-empty-sod-slots.json", JSON.stringify(rows, null, 2), "application/json;charset=utf-8");
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
  const searchVal = resultsSearch.value.toLowerCase().trim();
  const slaVal = resultsSlaFilter.value;
  const directionVal = resultsDirectionFilter.value;
  const missingVal = resultsMissingFilter.value;
  const startTimeVal = resultsStartTimeFilter.value;
  const endTimeVal = resultsEndTimeFilter.value;
  const useLocal = resultsLocalTimeToggle.checked;

  // Update filter labels dynamically
  const fromLabel = document.querySelector('label[for="resultsStartTimeFilter"]');
  const toLabel = document.querySelector('label[for="resultsEndTimeFilter"]');
  if (fromLabel) fromLabel.textContent = useLocal ? "From Local" : "From UTC";
  if (toLabel) toLabel.textContent = useLocal ? "To Local" : "To UTC";

  filteredRows = latestRows.filter((row) => {
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
