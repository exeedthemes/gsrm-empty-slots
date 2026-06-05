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

let latestRows = [];

runBtn.addEventListener("click", runScan);
airlinesBtn.addEventListener("click", refreshAirlines);
csvBtn.addEventListener("click", () => downloadCsv(latestRows));

async function runScan() {
  const payload = readForm();
  setBusy(true);
  setMessage("Scanning Flight Comms and SOD endpoint data...");
  renderRows([]);

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
    renderRows(latestRows);
    resultCount.textContent = latestRows.length;
    flightCount.textContent = result.scannedFlights || 0;
    dateCount.textContent = (result.scannedDates || []).length;
    csvBtn.disabled = latestRows.length === 0;

    const errorSuffix = result.errors?.length ? ` ${result.errors.length} flight(s) had endpoint errors.` : "";
    setMessage(`Done. JSON rows are available in the browser response and table.${errorSuffix}`, result.errors?.length ? "warn" : "");
    console.log("Empty SOD slot JSON:", result);
  } catch (error) {
    latestRows = [];
    resultCount.textContent = "0";
    flightCount.textContent = "0";
    dateCount.textContent = "0";
    csvBtn.disabled = true;
    setMessage(error.message || String(error), "error");
  } finally {
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
    airlines: data.get("airlines") || "",
  };
}

function populateAirlines(airlines, selected = "") {
  const options = ["", ...airlines.filter(Boolean)];
  airlinesSelect.innerHTML = "";

  for (const code of options) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = code || "All airlines";
    airlinesSelect.appendChild(option);
  }

  airlinesSelect.value = options.includes(selected) ? selected : "";
}

function renderRows(rows) {
  resultsBody.innerHTML = "";

  if (!rows.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td colspan="9" class="empty">No empty slots found.</td>';
    resultsBody.appendChild(tr);
    return;
  }

  for (const row of rows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(row.date)}</td>
      <td>${escapeHtml(row.flight)} <span class="muted">${escapeHtml(row.direction || "")}</span></td>
      <td>${escapeHtml(row.route)}</td>
      <td>${escapeHtml(row.sla)}</td>
      <td>${escapeHtml(row.required)}</td>
      <td>${escapeHtml(row.assigned)}</td>
      <td class="missing">${escapeHtml(row.missing)}</td>
      <td>${escapeHtml(row.start_utc)}</td>
      <td>${escapeHtml(row.release_utc)}</td>
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

function downloadCsv(rows) {
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
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(",")),
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

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
