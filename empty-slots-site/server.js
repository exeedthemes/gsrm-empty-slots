const http = require("http");
const path = require("path");
const fs = require("fs/promises");
const { chromium } = require("playwright");
const { getGermanBavarianHolidays } = require("./public/holiday-utils");
const db = require("./db");
const { createCloudSync, readConfig: readCloudConfig } = require('./cloud-sync');
let cloudSync;
function getCloudSync() {
  if (!cloudSync) cloudSync = createCloudSync({ database: db.getDb(), config: readCloudConfig() });
  return cloudSync;
}

const PORT = Number(process.env.PORT || 4173);
const BASE_URL = "https://gsrm.avbis.online";
const PUBLIC_DIR = path.join(__dirname, "public");
const FLIGHT_CONCURRENCY = positiveInteger(process.env.FLIGHT_CONCURRENCY, 3);
const FLIGHT_REQUEST_DELAY_MS = nonNegativeInteger(process.env.FLIGHT_REQUEST_DELAY_MS, 100);
const FLIGHT_REQUEST_JITTER_MS = nonNegativeInteger(process.env.FLIGHT_REQUEST_JITTER_MS, 100);
const REQUEST_RETRIES = Number(process.env.REQUEST_RETRIES || 2);
const SESSION_IDLE_MS = positiveInteger(process.env.SESSION_IDLE_MS, 15 * 60 * 1000);
const SCAN_PROGRESS_TTL_MS = positiveInteger(process.env.SCAN_PROGRESS_TTL_MS, 30 * 60 * 1000);
const DATE_SCAN_CACHE_TTL_MS = positiveInteger(process.env.DATE_SCAN_CACHE_TTL_MS, 6 * 60 * 60 * 1000);
const DATE_SCAN_CACHE_MAX_ENTRIES = positiveInteger(process.env.DATE_SCAN_CACHE_MAX_ENTRIES, 120);
const FLIGHT_SOD_CACHE_TTL_MS = positiveInteger(process.env.FLIGHT_SOD_CACHE_TTL_MS, 30 * 60 * 1000);
const FLIGHT_SOD_CACHE_MAX_ENTRIES = positiveInteger(process.env.FLIGHT_SOD_CACHE_MAX_ENTRIES, 5000);

let authSession = null;
let authSessionPromise = null;
let authSessionIdleTimer = null;
const scanProgress = new Map();
const dateScanCache = new Map();
const flightSodCache = new Map();

async function launchBrowser(options = {}) {
  if (process.platform === "win32") {
    try {
      // The standalone Windows build does not bundle Playwright's large Chromium
      // download. Microsoft Edge is present on supported Windows installations.
      return await chromium.launch({ ...options, channel: "msedge" });
    } catch (edgeError) {
      try {
        return await chromium.launch(options);
      } catch (chromiumError) {
        const error = new Error(
          "Could not start a browser. Install or repair Microsoft Edge, then restart GSRM Empty Slots."
        );
        error.cause = chromiumError;
        error.edgeError = edgeError;
        throw error;
      }
    }
  }

  return chromium.launch(options);
}

// In-memory cache for handling airport IDs
const airportCache = new Map();

function getCachedAirportId(flightId) {
  return airportCache.get(flightId);
}

function cacheAirportId(flightId, airportId) {
  if (airportCache.size > 2000) {
    airportCache.clear();
  }
  airportCache.set(flightId, airportId);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const server = http.createServer(async (req, res) => {
  try {
    const urlObj = new URL(req.url, `http://localhost:${PORT}`);
    const rawPath = urlObj.pathname;
    const pathname = rawPath.length > 1 && rawPath.endsWith("/") ? rawPath.slice(0, -1) : rawPath;

    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      });
      res.end();
      return;
    }

    if (req.method === "POST" && pathname === "/api/connect") {
      const payload = await readJson(req);
      if (!payload.email || !payload.password) throw new Error("Email and password are required.");
      const session = await acquireAuthenticatedSession(String(payload.email), String(payload.password));
      releaseAuthSession(session);
      sendJson(res, 200, { connected: true, email: String(payload.email), idleMinutes: Math.round(SESSION_IDLE_MS / 60000) });
      return;
    }

    if (req.method === 'GET' && pathname === '/api/cloud-sync') {
      sendJson(res, 200, getCloudSync().status());
      return;
    }

    if (req.method === "POST" && pathname === "/api/cancel") {
      const payload = await readJson(req);
      sendJson(res, 200, requestScanCancellation(payload.scanId));
      return;
    }

    if (req.method === "POST" && pathname === "/api/extract") {
      const payload = await readJson(req);
      const result = await extractEmptySlots(payload);
      sendJson(res, 200, result);
      return;
    }

    if (req.method === "POST" && pathname === "/api/airlines") {
      const payload = await readJson(req);
      const result = await extractAirlines(payload);
      sendJson(res, 200, result);
      return;
    }

    if (req.method === "GET" && pathname.startsWith("/api/progress")) {
      const scanId = urlObj.searchParams.get("scanId");
      sendJson(res, 200, getScanProgress(scanId));
      return;
    }

    if (req.method === "GET" && pathname === "/api/session") {
      const connected = await verifyAuthenticatedSession(authSession);
      if (!connected && authSession) await closeAuthSession();
      sendJson(res, 200, { connected, email: connected ? authSession.email : "" });
      return;
    }

    if (req.method === "GET" && pathname === "/api/notes") {
      sendJson(res, 200, db.getAllGapNotes());
      return;
    }

    if (req.method === "POST" && pathname === "/api/notes") {
      const payload = await readJson(req);
      if (payload.gapId) {
        db.saveGapNote(payload.gapId, payload);
      } else if (payload.notes) {
        db.saveAllGapNotes(payload.notes);
      }
      sendJson(res, 200, { success: true });
      return;
    }

    if (req.method === "GET" && pathname === "/api/availability") {
      sendJson(res, 200, db.getStaffAvailability() || {});
      return;
    }

    if (req.method === "POST" && pathname === "/api/availability") {
      const payload = await readJson(req);
      db.saveStaffAvailability(payload);
      sendJson(res, 200, { success: true });
      return;
    }

    if (req.method === "GET" && pathname === "/api/history") {
      sendJson(res, 200, db.getScanHistory());
      return;
    }

    if (req.method === "POST" && pathname === "/api/history") {
      const payload = await readJson(req);
      const snapshot = payload?.snapshot || (payload && payload.id ? payload : null);
      if (Array.isArray(payload)) {
        db.saveScanHistory(payload);
      } else if (Array.isArray(payload?.history)) {
        db.saveScanHistory(payload.history);
      } else if (snapshot && snapshot.id) {
        db.saveScanItem(snapshot);
      }
      sendJson(res, 200, { success: true });
      return;
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/history")) {
      const id = urlObj.searchParams.get("id");
      if (id) {
        db.deleteScanItem(id);
      } else {
        db.clearScanHistory();
      }
      sendJson(res, 200, { success: true });
      return;
    }

    if (req.method === "GET" && pathname === "/api/cache/stats") {
      sendJson(res, 200, db.getCacheStats());
      return;
    }

    if (req.method === "POST" && pathname === "/api/cache/clear") {
      db.clearSodCache();
      dateScanCache.clear();
      flightSodCache.clear();
      sendJson(res, 200, { success: true });
      return;
    }

    // --- Absences API Routes ---
    if (req.method === "GET" && pathname === "/api/absences") {
      sendJson(res, 200, db.getAllAbsences());
      return;
    }

    if (req.method === "POST" && pathname === "/api/absences") {
      const payload = await readJson(req);
      const saved = db.saveAbsence(payload);
      sendJson(res, 200, { success: true, data: saved });
      return;
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/absences")) {
      const id = urlObj.searchParams.get("id");
      if (!id) throw new Error("Absence ID required.");
      sendJson(res, 200, db.deleteAbsence(id));
      return;
    }

    // --- Custom Rules API Routes ---
    if (req.method === "GET" && pathname === "/api/rules") {
      sendJson(res, 200, db.getAllCustomRules());
      return;
    }

    if (req.method === "POST" && pathname === "/api/rules") {
      const payload = await readJson(req);
      const saved = db.saveCustomRule(payload);
      sendJson(res, 200, { success: true, data: saved });
      return;
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/rules")) {
      const id = urlObj.searchParams.get("id");
      if (!id) throw new Error("Rule ID required.");
      sendJson(res, 200, db.deleteCustomRule(id));
      return;
    }

    // --- What-if Scenarios API Routes ---
    if (req.method === "GET" && pathname === "/api/scenarios") {
      sendJson(res, 200, db.getAllScenarios());
      return;
    }

    if (req.method === "POST" && pathname === "/api/scenarios") {
      const payload = await readJson(req);
      const saved = db.saveScenario(payload);
      sendJson(res, 200, { success: true, data: saved });
      return;
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/scenarios")) {
      const id = urlObj.searchParams.get("id");
      if (!id) throw new Error("Scenario ID required.");
      sendJson(res, 200, db.deleteScenario(id));
      return;
    }

    if (req.method === "POST" && pathname === "/api/export/roster-pdf") {
      const payload = await readJson(req);
      const pdf = await createRosterSectionPdf(payload);
      const filename = safePdfFilename(payload.filename || "gsrm-roster.pdf");
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": pdf.length,
        "Cache-Control": "no-store",
      });
      res.end(pdf);
      return;
    }

    // --- Monthly Rosters API Routes ---
    if (req.method === "GET" && pathname === "/api/roster/months") {
      const includeRows = urlObj.searchParams.get("includeRows") === "1" || urlObj.searchParams.get("includeRows") === "true";
      sendJson(res, 200, { months: db.getAllMonthlyRosters(null, includeRows) });
      return;
    }

    if (req.method === "GET" && pathname === "/api/roster/month") {
      const month = urlObj.searchParams.get("month");
      if (!month) throw new Error("Month parameter required (e.g. ?month=YYYY-MM)");
      const roster = db.getMonthlyRoster(month);
      if (!roster) {
        sendJson(res, 404, { error: `No saved monthly roster found for ${month}` });
        return;
      }
      sendJson(res, 200, roster);
      return;
    }

    if (req.method === "POST" && pathname === "/api/roster/month") {
      const payload = await readJson(req);
      const saved = db.saveMonthlyRoster(payload);
      sendJson(res, 200, { success: true, data: saved });
      return;
    }

    if (req.method === "POST" && pathname === "/api/roster/merge") {
      const payload = await readJson(req);
      const OperationsUtils = require("./public/operations-utils");

      let merged = null;

      if (Array.isArray(payload.scanIds) && payload.scanIds.length > 0) {
        let selectedScans = [];
        const history = db.getScanHistory();
        if (history.length > 0) {
          selectedScans = history.filter((item) => payload.scanIds.includes(item.id));
        }

        // If some or all selected scans were missing from DB, enrich from payload.scans
        if (Array.isArray(payload.scans) && payload.scans.length > 0) {
          for (const s of payload.scans) {
            if (payload.scanIds.includes(s.id)) {
              if (!selectedScans.some((x) => x.id === s.id)) {
                selectedScans.push(s);
              }
              try { db.saveScanItem(s); } catch {}
            }
          }
        }

        merged = OperationsUtils.mergeScans(selectedScans);
      } else if (payload.startDate && payload.endDate) {
        if (Array.isArray(payload.scans) && payload.scans.length > 0) {
          for (const s of payload.scans) {
            try { db.saveScanItem(s); } catch {}
          }
        }
        merged = db.mergeCustomDateRange(payload.startDate, payload.endDate);
      }

      if (!merged) {
        throw new Error("Invalid merge payload. Provide scanIds or startDate and endDate.");
      }

      let savedRecord = null;
      let savedMonthKey = "";

      if (payload.saveAsMaster !== false && ((merged.rows && merged.rows.length > 0) || (merged.scannedDates && merged.scannedDates.length > 0) || payload.customName)) {
        const customTitle = (payload.customName || "").trim();
        if (customTitle) {
          savedMonthKey = customTitle;
        } else if (merged.scannedDates && merged.scannedDates.length > 0) {
          const firstMonth = merged.scannedDates[0].slice(0, 7);
          const lastMonth = merged.scannedDates[merged.scannedDates.length - 1].slice(0, 7);
          savedMonthKey = firstMonth === lastMonth ? firstMonth : `${merged.scannedDates[0]}_to_${merged.scannedDates[merged.scannedDates.length - 1]}`;
        } else if (payload.startDate && payload.endDate) {
          const firstMonth = payload.startDate.slice(0, 7);
          const lastMonth = payload.endDate.slice(0, 7);
          savedMonthKey = firstMonth === lastMonth ? firstMonth : `${payload.startDate}_to_${payload.endDate}`;
        } else {
          savedMonthKey = `Merge_${new Date().toISOString().slice(0, 10)}`;
        }

        const isCustom = Boolean(customTitle || savedMonthKey.includes("_to_") || !/^\d{4}-\d{2}$/.test(savedMonthKey));

        savedRecord = db.saveMonthlyRoster({
          monthKey: savedMonthKey,
          updatedAt: Date.now(),
          scannedDates: merged.scannedDates || [],
          rows: merged.rows || [],
          staffDirectory: merged.staffDirectory || [],
          changes: [
            {
              timestamp: Date.now(),
              scanId: `merge_${Date.now()}`,
              summary: customTitle
                ? `Custom Master "${customTitle}" saved from merge (${merged.flightsCount || 0} flights)`
                : `Merged dataset created (${merged.scannedDates?.length || 0} days, ${merged.flightsCount || 0} flights)`,
              hasChanges: true,
              scannedDates: merged.scannedDates || [],
              addedFlightsCount: merged.flightsCount || 0,
              removedFlightsCount: 0,
              changedDutiesCount: 0,
              newGapsCount: merged.gapsCount || 0,
              resolvedGapsCount: 0,
              staffReassignmentsCount: 0,
            }
          ],
          meta: {
            customName: customTitle,
            isCustomMerge: isCustom,
            airlines: merged.airlines || [],
            slas: merged.slas || [],
            startDate: merged.startDate || (merged.scannedDates && merged.scannedDates[0]) || "",
            endDate: merged.endDate || (merged.scannedDates && merged.scannedDates[merged.scannedDates.length - 1]) || "",
          }
        });
      }

      sendJson(res, 200, { success: true, data: merged, savedMonthKey, savedRecord });
      return;
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/roster/month")) {
      const month = urlObj.searchParams.get("month");
      if (!month) throw new Error("Month parameter required for deletion.");
      sendJson(res, 200, db.deleteMonthlyRoster(month));
      return;
    }

    if (pathname.startsWith("/api/")) {
      const knownApiPaths = [
        "/api/connect", "/api/cancel", "/api/extract", "/api/airlines",
        "/api/progress", "/api/session", "/api/notes", "/api/availability",
        "/api/history", "/api/cache/stats", "/api/cache/clear",
        "/api/absences", "/api/rules", "/api/scenarios", "/api/export/roster-pdf",
        "/api/roster/months", "/api/roster/month", "/api/roster/merge"
      ];
      const isKnownApi = knownApiPaths.some((p) => pathname === p || pathname.startsWith(p + "?") || pathname.startsWith(p + "/"));
      if (isKnownApi) {
        sendJson(res, 405, { error: `Method ${req.method} not allowed for ${pathname}` });
        return;
      }
      sendJson(res, 404, { error: `API endpoint not found: ${req.method} ${pathname}` });
      return;
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    const filePath = path.join(PUBLIC_DIR, pathname === "/" ? "index.html" : pathname);
    if (!filePath.startsWith(PUBLIC_DIR)) {
      sendJson(res, 403, { error: "Forbidden" });
      return;
    }

    const body = await fs.readFile(filePath);
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream",
      // This is a local app whose HTML, CSS, and JavaScript are updated together.
      // Revalidate assets so a restart cannot leave the UI using mismatched files.
      "Cache-Control": "no-cache",
    });
    res.end(body);
  } catch (error) {
    const status = error.code === "ENOENT" ? 404 : 500;
    sendJson(res, status, { error: error.message || String(error) });
  }
});

if (require.main === module) {
  process.on("uncaughtException", (err) => {
    console.error("\n[FATAL ERROR]:", err?.stack || err);
    if (process.platform === "win32") {
      console.log("\nPress Enter to exit...");
      try {
        require("fs").readSync(0, Buffer.alloc(1), 0, 1, null);
      } catch {}
    }
  });

  let hasOpenedBrowser = false;
  function openBrowserOnce(url) {
    if (hasOpenedBrowser) return;
    hasOpenedBrowser = true;
    if (process.env.AUTO_OPEN !== "false") {
      const openCmd = process.platform === "win32" ? `start ${url}` : process.platform === "darwin" ? `open ${url}` : `xdg-open ${url}`;
      require("child_process").exec(openCmd, () => {});
    }
  }

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      const url = `http://localhost:${PORT}`;
      const checkReq = http.get(url, () => {
        console.log(`\n[WARN] Port ${PORT} is already in use by an active server. Opening browser at ${url}...`);
        openBrowserOnce(url);
      });
      checkReq.on("error", () => {
        console.error(`\n[ERROR] Port ${PORT} is occupied by an unresponsive process. Please stop old instances using stop.command.`);
      });
      checkReq.setTimeout(2000, () => {
        checkReq.destroy();
        console.error(`\n[ERROR] Port ${PORT} is occupied by an unresponsive process. Please stop old instances using stop.command.`);
      });
    } else {
      console.error("\n[ERROR] Server Error:", err);
    }
  });

  server.listen(PORT, "0.0.0.0", () => {
    const url = `http://localhost:${PORT}`;
    console.log(`Empty Slots app running at ${url}`);
    openBrowserOnce(url);
    const retryCloudUploads = () => {
      try { getCloudSync().flush().catch(() => console.warn('Cloud sync retry failed.')); }
      catch { console.warn('Cloud sync is not configured correctly. See ONLINE-DASHBOARD.md.'); }
    };
    retryCloudUploads();
    setInterval(retryCloudUploads, 60000).unref();
  });
}

async function extractEmptySlots(payload) {
  const config = normalizePayload(payload);
  const dates = selectedDates(config);
  const scanId = normalizeScanId(payload.scanId) || `scan-${Date.now().toString(36)}`;

  if (!dates.length) {
    return { rows: [], errors: [], scannedFlights: 0, scannedDates: [], airlines: [], staffDirectory: [] };
  }

  startScanProgress(scanId, dates);
  console.log(`[${scanId}] Starting scan for ${dates.length} date(s).`);
  let session = null;

  try {
    const rows = [];
    const errors = [];
    const airlines = new Set();
    const slas = new Set();
    const staffDirectory = new Set();
    let scannedFlights = 0;
    let fetchedFlights = 0;
    let cacheHits = 0;
    let freshDates = 0;
    let cancelled = false;
    const completedDates = [];
    const incompleteDates = [];

    const cachedResults = new Map();
    if (!config.forceRefresh) {
      for (const date of dates) {
        const cached = getCachedDateScan(config, date);
        if (cached) cachedResults.set(formatIsoDate(date), cached);
      }
    }
    if (cachedResults.size < dates.length) {
      session = await acquireAuthenticatedSession(config.email, config.password);
    }
    const context = session?.context;

    for (const date of dates) {
      if (isScanCancellationRequested(scanId)) {
        cancelled = true;
        break;
      }
      const avbisDate = formatAvbisDate(date);
      const isoDate = formatIsoDate(date);
      const startedAt = Date.now();
      updateScanProgress(scanId, {
        stage: "date",
        currentDate: avbisDate,
        currentDateStartedAt: startedAt,
        currentFlight: "",
        currentDirection: "",
        currentFlightIndex: 0,
        currentFlightTotal: 0,
        message: `Loading ${avbisDate}...`,
      });
      let result = cachedResults.get(isoDate);
      const cached = Boolean(result);
      if (cached) {
        cacheHits += 1;
        updateScanProgress(scanId, { message: `${avbisDate}: loaded from local cache.` });
        console.log(`[${scanId}] ${avbisDate}: using cached roster data.`);
      } else {
        console.log(`[${scanId}] Loading ${avbisDate} from AVBIS...`);
        try {
          result = await extractDateViaHttp(
            context,
            avbisDate,
            date,
            config,
            (patch) => updateScanProgress(scanId, patch),
            () => isScanCancellationRequested(scanId)
          );
        } catch (error) {
          result = failedDateResult(avbisDate, error);
        }
        if (!result) {
          cancelled = true;
          break;
        }
        freshDates += 1;
        fetchedFlights += result.scannedFlights;
        if (dateScanSucceeded(result)) setCachedDateScan(config, date, result);
      }

      scannedFlights += result.scannedFlights;
      rows.push(...result.rows);
      errors.push(...result.errors);
      for (const airline of result.airlines) airlines.add(airline);
      for (const sla of result.slas) slas.add(sla);
      for (const staff of result.staffDirectory) staffDirectory.add(staff);
      if (dateScanSucceeded(result)) completedDates.push(isoDate);
      else incompleteDates.push(isoDate);
      completeProgressDate(scanId, {
        date: avbisDate,
        scannedFlights: result.scannedFlights,
        rows: result.rows.length,
        errors: result.errors.length,
        elapsedMs: Date.now() - startedAt,
        cached,
      });
      console.log(
        `[${scanId}] ${avbisDate}: scanned ${result.scannedFlights} flight(s), found ${result.rows.length} empty slot group(s), ` +
        `${result.errors.length} error(s), ${Math.round((Date.now() - startedAt) / 1000)}s.`
      );
    }

    rows.sort((a, b) => {
      const byStart = a.start_utc.localeCompare(b.start_utc);
      return byStart || a.flight.localeCompare(b.flight);
    });

    const response = {
      rows,
      errors,
      scannedFlights,
      scannedDates: completedDates,
      incompleteDates,
      airlines: [...airlines].sort(),
      slas: [...slas].sort(),
      staffDirectory: [...staffDirectory].sort(),
      cache: {
        cachedDates: cacheHits,
        freshDates,
        fetchedFlights,
        ttlMinutes: Math.round(DATE_SCAN_CACHE_TTL_MS / 60000),
        forced: config.forceRefresh,
      },
      cancelled,
    };

    if (!cancelled && (completedDates.length > 0 || rows.length > 0)) {
      try {
        const scanSnapshot = {
          id: scanId,
          createdAt: new Date().toISOString(),
          startDate: config.startDate,
          endDate: config.endDate,
          scannedDates: completedDates,
          incompleteDates,
          flights: Number(scannedFlights || 0),
          staffCount: (staffDirectory || []).length,
          errors: (errors || []).length,
          cancelled: Boolean(cancelled),
          gaps: (rows || []).filter((r) => Number(r.missing || 0) > 0),
          rows: rows || [],
          staffDirectory: [...staffDirectory].sort(),
          airlines: [...airlines].sort(),
          slas: [...slas].sort(),
          config,
        };
        db.saveScanItem(scanSnapshot);
        try {
          response.cloudSync = getCloudSync().enqueue(scanSnapshot);
          void getCloudSync().flush().catch(() => console.warn('Cloud sync queued for retry.'));
        } catch {
          response.cloudSync = { queued: false, reason: 'configuration-error' };
          console.warn('Could not queue cloud scan. Check cloud-sync.config.json.');
        }
      } catch (err) {
        console.warn(`[${scanId}] Could not save scan snapshot to db:`, err);
      }

      try {
        const monthlyUpdates = db.updateMonthlyRosterWithScan(response, config);
        response.monthlyUpdates = (monthlyUpdates || []).map((u) => ({
          monthKey: u.monthKey,
          summary: u.summary,
          hasChanges: u.hasChanges,
          diff: u.diff,
          stats: {
            totalDays: u.monthRecord?.totalDays,
            scannedDaysCount: u.monthRecord?.scannedDaysCount,
            coveragePercent: u.monthRecord?.coveragePercent,
            flightsCount: u.monthRecord?.flightsCount,
            gapsCount: u.monthRecord?.gapsCount,
          },
        }));
      } catch (err) {
        console.warn(`[${scanId}] Could not auto-update monthly roster:`, err);
      }
    }

    if (cancelled) cancelScanProgress(scanId, response);
    else finishScanProgress(scanId, response);
    return response;
  } catch (error) {
    failScanProgress(scanId, error);
    throw error;
  } finally {
    if (session) releaseAuthSession(session);
  }
}

function dateScanCacheKey(config, date) {
  return JSON.stringify({
    account: String(config.email || "").trim().toLowerCase(),
    date: formatIsoDate(date),
    start: `${config.startTime.hour}:${config.startTime.minute}`,
    end: `${config.endTime.hour}:${config.endTime.minute}`,
    airlines: [...config.airlines].sort(),
    slas: [...config.slas].sort(),
    allSlots: config.allSlots,
  });
}

function getCachedDateScan(config, date) {
  cleanupDateScanCache();
  const key = dateScanCacheKey(config, date);
  const cached = dateScanCache.get(key);
  if (cached?.result) return cached.result;
  const dbCached = db.getCachedSod(key);
  if (dbCached) {
    dateScanCache.set(key, { createdAt: Date.now(), result: dbCached });
    return dbCached;
  }
  return null;
}

function setCachedDateScan(config, date, result) {
  cleanupDateScanCache();
  const key = dateScanCacheKey(config, date);
  if (dateScanCache.size >= DATE_SCAN_CACHE_MAX_ENTRIES) {
    const oldestKey = dateScanCache.keys().next().value;
    if (oldestKey) dateScanCache.delete(oldestKey);
  }
  dateScanCache.set(key, { createdAt: Date.now(), result });
  db.setCachedSod(key, formatIsoDate(date), result);
}

function cleanupDateScanCache() {
  const cutoff = Date.now() - DATE_SCAN_CACHE_TTL_MS;
  for (const [key, cached] of dateScanCache) {
    if (cached.createdAt < cutoff) dateScanCache.delete(key);
  }
}

function flightSodCacheKey(account, avbisDate, flightId) {
  return JSON.stringify({
    account: String(account || "").trim().toLowerCase(),
    date: avbisDate,
    flightId: String(flightId),
  });
}

function getCachedFlightSod(account, avbisDate, flightId) {
  cleanupFlightSodCache();
  return flightSodCache.get(flightSodCacheKey(account, avbisDate, flightId))?.result || null;
}

function setCachedFlightSod(account, avbisDate, flightId, result) {
  cleanupFlightSodCache();
  if (flightSodCache.size >= FLIGHT_SOD_CACHE_MAX_ENTRIES) {
    const oldestKey = flightSodCache.keys().next().value;
    if (oldestKey) flightSodCache.delete(oldestKey);
  }
  flightSodCache.set(flightSodCacheKey(account, avbisDate, flightId), { createdAt: Date.now(), result });
}

function cleanupFlightSodCache() {
  const cutoff = Date.now() - FLIGHT_SOD_CACHE_TTL_MS;
  for (const [key, cached] of flightSodCache) {
    if (cached.createdAt < cutoff) flightSodCache.delete(key);
  }
}

async function extractAirlines(payload) {
  const config = normalizePayload({ ...payload, airlines: "" });
  const dates = selectedDates(config);
  const scanId = `airlines-${Date.now().toString(36)}`;

  if (!dates.length) {
    return { airlines: [], scannedDates: [], scannedFlights: 0 };
  }

  console.log(`[${scanId}] Loading airlines for ${dates.length} date(s).`);
  const session = await acquireAuthenticatedSession(config.email, config.password);
  const { context } = session;

  try {
    const airlines = new Set();
    let scannedFlights = 0;

    for (const date of dates) {
      const avbisDate = formatAvbisDate(date);
      const flights = await fetchFlightLinks(context, avbisDate);
      console.log(`[${scanId}] ${avbisDate}: loaded ${flights.length} visible flight(s).`);
      scannedFlights += flights.length;
      for (const flight of flights) {
        const code = airlineCodeFromFlight(flight);
        if (code) airlines.add(code);
      }
    }

    return {
      airlines: [...airlines].sort(),
      scannedDates: dates.map(formatIsoDate),
      scannedFlights,
    };
  } finally {
    releaseAuthSession(session);
  }
}

async function acquireAuthenticatedSession(email, password) {
  const sessionKey = `${email}\0${password}`;

  while (true) {
    if (authSession?.sessionKey === sessionKey && !authSession.closing && authSession.browser?.isConnected()) {
      if (await verifyAuthenticatedSession(authSession)) {
        clearAuthSessionTimer();
        authSession.active += 1;
        return authSession;
      }
      await closeAuthSession();
    }

    if (authSessionPromise) {
      const creatingSession = authSessionPromise;
      await creatingSession.promise.catch(() => null);
      continue;
    }

    const previousSession = authSession;
    if (previousSession) {
      authSession = null;
      if (previousSession.active > 0) {
        previousSession.closeWhenIdle = true;
      } else {
        await closeSession(previousSession);
      }
    }

    const promise = createAuthenticatedSession(sessionKey, email, password);
    authSessionPromise = { sessionKey, promise };

    try {
      const session = await promise;
      if (!session.closing) {
        clearAuthSessionTimer();
        session.active += 1;
        return session;
      }
    } finally {
      if (authSessionPromise?.promise === promise) authSessionPromise = null;
    }
  }
}

async function verifyAuthenticatedSession(session) {
  if (!session || session.closing || !session.browser?.isConnected() || !session.context) return false;

  try {
    const response = await session.context.request.get(`${BASE_URL}/flight-comms`, {
      headers: { Accept: "text/html" },
      failOnStatusCode: false,
      maxRedirects: 0,
      timeout: 5000,
    });
    const location = String(response.headers()?.location || "");
    const responseUrl = String(response.url?.() || "");
    return response.ok()
      && !/\/login(?:[/?#]|$)/i.test(location)
      && !/\/login(?:[/?#]|$)/i.test(responseUrl);
  } catch {
    return false;
  }
}

async function createAuthenticatedSession(sessionKey, email, password) {
  await closeAuthSession();

  const browser = await launchBrowser({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await login(page, email, password);
    authSession = { browser, context, sessionKey, email: String(email), active: 0, closeWhenIdle: false, closing: false };
    return authSession;
  } catch (error) {
    await browser.close().catch(() => {});
    throw error;
  } finally {
    await page.close().catch(() => {});
  }
}

function releaseAuthSession(session) {
  session.active = Math.max(0, session.active - 1);
  if (session.active > 0) return;

  if (session.closeWhenIdle || authSession !== session) {
    closeSession(session).catch(() => {});
    return;
  }

  touchAuthSession(session);
}

function touchAuthSession(session = authSession) {
  if (!session || session.active > 0 || session.closing || authSession !== session) return;
  if (authSessionIdleTimer) clearTimeout(authSessionIdleTimer);
  authSessionIdleTimer = setTimeout(() => {
    closeAuthSession().catch(() => {});
  }, SESSION_IDLE_MS);
  authSessionIdleTimer.unref?.();
}

function clearAuthSessionTimer() {
  if (authSessionIdleTimer) clearTimeout(authSessionIdleTimer);
  authSessionIdleTimer = null;
}

async function closeAuthSession() {
  clearAuthSessionTimer();

  const session = authSession;
  authSession = null;
  if (!session) return;
  if (session.active > 0) {
    session.closeWhenIdle = true;
    return;
  }
  await closeSession(session);
}

async function closeSession(session) {
  if (session.closing) return;
  session.closing = true;
  if (authSession === session) authSession = null;
  await session.browser.close().catch(() => {});
}

async function extractDateViaHttp(context, avbisDate, date, config, onProgress = () => {}, shouldCancel = () => false) {
  const visibleFlights = await fetchFlightLinks(context, avbisDate);
  const airlines = [...new Set(visibleFlights.map(airlineCodeFromFlight).filter(Boolean))];
  const flights = visibleFlights.filter((flight) => airlineMatches(flight, config.airlines));
  const periodStart = dateWithTime(date, config.startTime);
  const periodEnd = dateWithTime(date, config.endTime);
  onProgress({
    currentFlightTotal: flights.length,
    message: `${avbisDate}: scanning ${flights.length} flight(s)...`,
  });

  const results = await mapLimit(flights, FLIGHT_CONCURRENCY, (flight, index) =>
    extractFlightSodRowsWithProgress(context, flight, avbisDate, periodStart, periodEnd, config.slas, index, flights.length, onProgress, config.allSlots, config.email, config.forceRefresh)
  , shouldCancel);
  if (shouldCancel()) return null;
  const failedIndexes = results
    .map((result, index) => result.errors.length ? index : -1)
    .filter((index) => index >= 0);

  if (failedIndexes.length > 0) {
    await mapLimit(failedIndexes, FLIGHT_CONCURRENCY, async (index) => {
      const flight = flights[index];
      const meta = parseFlightText(flight.text);
      onProgress({
        currentFlight: meta.flight,
        currentDirection: meta.direction,
        currentFlightIndex: index + 1,
        retrying: true,
        message: `${avbisDate}: retrying ${formatFlightLabel(meta)}...`,
      });
      const retryResult = await extractFlightSodRows(context, flight, avbisDate, periodStart, periodEnd, config.slas, config.allSlots, config.email, config.forceRefresh);
      if (!retryResult.errors.length) results[index] = retryResult;
    }, shouldCancel);
    if (shouldCancel()) return null;
  }

  const rows = results.flatMap((result) => result.rows);
  const errors = results.flatMap((result) => result.errors);
  const slas = [...new Set(results.flatMap((result) => result.slas))].sort();
  const staffDirectory = [...new Set(results.flatMap((result) => result.staffDirectory || []))].sort();

  return { rows, errors, scannedFlights: flights.length, airlines, slas, staffDirectory };
}

async function extractFlightSodRowsWithProgress(context, flight, avbisDate, periodStart, periodEnd, selectedSlas, index, total, onProgress, allSlots = false, account = "", forceRefresh = false) {
  const meta = parseFlightText(flight.text);
  onProgress({
    currentFlight: meta.flight,
    currentDirection: meta.direction,
    currentFlightIndex: index + 1,
    currentFlightTotal: total,
    retrying: false,
    message: `${avbisDate}: scanning ${formatFlightLabel(meta)} (${index + 1}/${total})...`,
  });
  return extractFlightSodRows(context, flight, avbisDate, periodStart, periodEnd, selectedSlas, allSlots, account, forceRefresh);
}

async function extractFlightSodRows(context, flight, avbisDate, periodStart, periodEnd, selectedSlas = [], allSlots = false, account = "", forceRefresh = false) {
  const meta = parseFlightText(flight.text);

  try {
    let parsedSod = forceRefresh ? null : getCachedFlightSod(account, avbisDate, flight.id);
    if (!parsedSod) {
      let airportId = getCachedAirportId(flight.id);
      if (!airportId) {
        const airportResponse = await requestGetWithRetry(context, `${BASE_URL}/api/flight-watch/get-handling-airport?flight_id=${flight.id}`, {
          headers: { Accept: "application/json" },
          timeout: 15000,
        });
        const airport = await airportResponse.json().catch(() => null);
        if (!airportResponse.ok() || !airport?.status || !airport?.airport_id) {
          throw new Error(`handling airport HTTP ${airportResponse.status()}`);
        }
        airportId = airport.airport_id;
        cacheAirportId(flight.id, airportId);
      }

      const params = new URLSearchParams({
        flight_id: flight.id,
        airport_id: String(airportId),
        date: avbisDate,
      });
      const sodResponse = await requestGetWithRetry(context, `${BASE_URL}/flight-comm/get_sod_form?${params.toString()}`, {
        headers: { Accept: "text/html" },
        timeout: 15000,
      });
      const sodHtml = await sodResponse.text();
      if (!sodResponse.ok()) throw new Error(`SOD HTTP ${sodResponse.status()}`);

      parsedSod = {
        groups: parseSodGroups(sodHtml, avbisDate),
        staffDirectory: extractStaffDirectory(sodHtml),
      };
      setCachedFlightSod(account, avbisDate, flight.id, parsedSod);
    }

    const { groups, staffDirectory } = parsedSod;
    const slas = [...new Set(groups.map((group) => group.sla).filter(Boolean))].sort();
    const rows = groups
      .filter((group) => (allSlots || group.missing > 0) && overlaps(group.startDate, group.releaseDate, periodStart, periodEnd))
      .filter((group) => slaMatches(group.sla, selectedSlas))
      .map((group) => ({
        date: avbisDate,
        flight_id: flight.id,
        flight: meta.flight,
        route: meta.route,
        aircraft: meta.aircraft,
        direction: meta.direction,
        scheduled_utc: meta.scheduled,
        sla: group.sla,
        type: group.type,
        movement: group.movement,
        required: group.required,
        assigned: group.assigned,
        missing: group.missing,
        start_utc: group.start,
        release_utc: group.release,
        duration: group.duration,
        staff: group.staff,
        staff_details: group.staff_details || [],
        has_shorter_assignment: Boolean(group.has_shorter_assignment),
        shorter_staff_count: Number(group.shorter_staff_count || 0),
      }));

    return { rows, errors: [], slas, staffDirectory };
  } catch (error) {
    return {
      rows: [],
      slas: [],
      staffDirectory: [],
      errors: [{
        date: avbisDate,
        flight_id: flight.id,
        flight: meta.flight,
        route: meta.route,
        direction: meta.direction,
        error: error.message || String(error),
      }],
    };
  }
}

async function mapLimit(items, limit, mapper, shouldStop = () => false) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workerCount = Math.min(limit, items.length);

  await Promise.all(Array.from({ length: workerCount }, async () => {
    while (nextIndex < items.length) {
      if (shouldStop()) break;
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
      if (nextIndex < items.length) await sleep(flightRequestDelay());
    }
  }));

  return results;
}

async function fetchFlightLinks(context, avbisDate, fallbackHtml = "") {
  let dataError = null;
  const data = await fetchFlightCommsData(context, avbisDate).catch((err) => {
    dataError = err;
    console.warn(`fetchFlightCommsData error for ${avbisDate}:`, err.message);
    return null;
  });
  const flights = extractFlightLinksFromData(data);
  if (flights.length) return flights;
  let htmlError = null;
  const html = fallbackHtml || await fetchFlightCommsHtml(context, avbisDate).catch((err) => {
    htmlError = err;
    console.warn(`fetchFlightCommsHtml error for ${avbisDate}:`, err.message);
    return "";
  });
  if (htmlError) {
    const reasons = [dataError, htmlError].filter(Boolean).map((error) => error.message || String(error));
    throw new Error(`Could not load flights for ${avbisDate}: ${reasons.join("; ")}`);
  }
  const htmlFlights = extractFlightLinks(html);
  console.warn(`Flight Comms JSON returned no flights for ${avbisDate}; HTML fallback found ${htmlFlights.length}.`);
  return htmlFlights;
}

function dateScanSucceeded(result) {
  return Array.isArray(result?.errors) && result.errors.length === 0;
}

function failedDateResult(avbisDate, error) {
  return {
    rows: [],
    errors: [{
      date: avbisDate,
      flight_id: "",
      flight: "",
      route: "",
      direction: "",
      error: error?.message || String(error),
    }],
    scannedFlights: 0,
    airlines: [],
    slas: [],
    staffDirectory: [],
  };
}

function positiveInteger(value, fallback) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

function nonNegativeInteger(value, fallback) {
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : fallback;
}

function flightRequestDelay() {
  const jitter = FLIGHT_REQUEST_JITTER_MS > 0
    ? Math.floor(Math.random() * (FLIGHT_REQUEST_JITTER_MS + 1))
    : 0;
  return FLIGHT_REQUEST_DELAY_MS + jitter;
}

async function fetchFlightCommsData(context, avbisDate) {
  const response = await requestGetWithRetry(context, `${BASE_URL}/flight-comms-data-new?date=${encodeURIComponent(avbisDate)}`, {
    headers: { Accept: "application/json" },
    timeout: 15000,
  });

  if (!response.ok()) {
    throw new Error(`Flight Comms data ${avbisDate} returned HTTP ${response.status()}`);
  }

  return response.json();
}

function extractFlightLinksFromData(data) {
  const rawList = Array.isArray(data?.items)
    ? data.items
    : (data?.items && typeof data.items === "object")
      ? Object.values(data.items)
      : (Array.isArray(data?.all_flights) ? data.all_flights : []);

  return rawList
    .map((flight) => ({
      id: String(flight.flight_id || flight.id || flight.flightId || ""),
      text: extractTimelineFlightText(flight.timeline_item || flight.html || flight.text || flight.content || ""),
    }))
    .filter((flight) => /^\d+$/.test(flight.id) && flight.text);
}

function extractTimelineFlightText(html) {
  const flight = classText(html, "flightNum");
  if (!flight) return "";

  const route = classText(html, "sectorAirport").replace(/^\|\s*/, "");
  const aircraft = classText(html, "aircraftReg").replace(/^\|\s*/, "");
  const movement = ((html.match(/<div\b[^>]*class=["'][^"']*\bbadge\b[^"']*["'][^>]*>\s*(STA|STD)\s*<\/div>/i) || [])[1] || "").toUpperCase();
  const scheduled = classText(html, "time-span-position");

  return [flight, route, aircraft, [movement, scheduled].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(" | ");
}

function classText(html, className) {
  const re = new RegExp(`<[^>]+class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`, "i");
  return cleanText(stripTags((String(html).match(re) || [])[1] || ""));
}

async function fetchFlightCommsHtml(context, avbisDate) {
  const pageResponse = await requestGetWithRetry(context, `${BASE_URL}/flight-comms?date=${encodeURIComponent(avbisDate)}`, {
    headers: { Accept: "text/html" },
    timeout: 15000,
  });

  if (!pageResponse.ok()) {
    throw new Error(`Flight Comms ${avbisDate} returned HTTP ${pageResponse.status()}`);
  }

  return pageResponse.text();
}

async function requestGetWithRetry(context, url, options = {}) {
  let lastResponse = null;
  let lastError = null;

  for (let attempt = 0; attempt <= REQUEST_RETRIES; attempt += 1) {
    if (attempt > 0) await sleep(requestRetryDelay(lastResponse, attempt));

    try {
      lastResponse = await context.request.get(url, options);
    } catch (error) {
      lastError = error;
      if (error.message && error.message.includes("closed")) break;
      continue;
    }

    if (!isRetryableStatus(lastResponse.status())) return lastResponse;
  }

  if (!lastResponse && lastError) throw lastError;
  return lastResponse;
}

function isRetryableStatus(status) {
  return status === 408 || status === 425 || status === 429 || status >= 500;
}

function requestRetryDelay(response, attempt) {
  const retryAfter = Number(response?.headers()?.["retry-after"]);
  if (Number.isFinite(retryAfter) && retryAfter > 0) return retryAfter * 1000;
  return Math.min(15000, 1000 * attempt * attempt);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeScanId(value) {
  const scanId = String(value || "").trim();
  return /^[a-zA-Z0-9_-]{8,80}$/.test(scanId) ? scanId : "";
}

function startScanProgress(scanId, dates) {
  cleanupScanProgress();
  const now = Date.now();
  scanProgress.set(scanId, {
    scanId,
    stage: "starting",
    message: `Starting scan for ${dates.length} date(s)...`,
    startedAt: now,
    updatedAt: now,
    elapsedMs: 0,
    totalDates: dates.length,
    processedDates: 0,
    completedDates: 0,
    currentDate: "",
    currentDateStartedAt: 0,
    currentFlight: "",
    currentDirection: "",
    currentFlightIndex: 0,
    currentFlightTotal: 0,
    scannedFlights: 0,
    foundRows: 0,
    errors: 0,
    dateSummaries: [],
    cancelRequested: false,
    cancelled: false,
    done: false,
  });
}

function requestScanCancellation(scanId) {
  const progress = normalizeScanId(scanId) ? scanProgress.get(scanId) : null;
  if (!progress || progress.done) return { accepted: false, message: "Scan is no longer running." };
  progress.cancelRequested = true;
  progress.stage = "cancelling";
  progress.updatedAt = Date.now();
  progress.message = "Cancellation requested. Finishing active requests and preserving completed dates…";
  return { accepted: true, completedDates: progress.completedDates };
}

function isScanCancellationRequested(scanId) {
  return Boolean(scanProgress.get(scanId)?.cancelRequested);
}

function updateScanProgress(scanId, patch) {
  const progress = scanProgress.get(scanId);
  if (!progress) return;
  const now = Date.now();
  Object.assign(progress, patch, {
    updatedAt: now,
    elapsedMs: now - progress.startedAt,
  });
}

function completeProgressDate(scanId, summary) {
  const progress = scanProgress.get(scanId);
  if (!progress) return;
  const now = Date.now();
  progress.processedDates += 1;
  if (!summary.errors) progress.completedDates += 1;
  progress.scannedFlights += summary.scannedFlights;
  progress.foundRows += summary.rows;
  progress.errors += summary.errors;
  progress.dateSummaries.push(summary);
  progress.updatedAt = now;
  progress.elapsedMs = now - progress.startedAt;
  progress.message = summary.errors
    ? `${summary.date}: incomplete with ${summary.errors} endpoint error(s); it was not cached.`
    : `${summary.date}: scanned ${summary.scannedFlights} flight(s), found ${summary.rows} empty slot group(s) in ${formatDuration(summary.elapsedMs)}.`;
}

function finishScanProgress(scanId, result) {
  const progress = scanProgress.get(scanId);
  if (!progress) return;
  const now = Date.now();
  progress.stage = "done";
  progress.done = true;
  progress.processedDates = progress.totalDates;
  progress.completedDates = result.scannedDates.length;
  progress.scannedFlights = result.scannedFlights;
  progress.foundRows = result.rows.length;
  progress.errors = result.errors.length;
  progress.updatedAt = now;
  progress.elapsedMs = now - progress.startedAt;
  const incomplete = result.incompleteDates?.length || 0;
  progress.message = `Done in ${formatDuration(progress.elapsedMs)}. ${result.rows.length} empty slot group(s), ${result.scannedFlights} flight(s), ${result.errors.length} endpoint error(s)${incomplete ? `; ${incomplete} date(s) incomplete and not cached` : ""}.`;
}

function cancelScanProgress(scanId, result) {
  const progress = scanProgress.get(scanId);
  if (!progress) return;
  const now = Date.now();
  progress.stage = "cancelled";
  progress.done = true;
  progress.cancelled = true;
  progress.scannedFlights = result.scannedFlights;
  progress.foundRows = result.rows.length;
  progress.errors = result.errors.length;
  progress.updatedAt = now;
  progress.elapsedMs = now - progress.startedAt;
  progress.message = `Cancelled after ${progress.completedDates} of ${progress.totalDates} date(s). Completed dates were preserved for a faster rerun.`;
}

function failScanProgress(scanId, error) {
  const progress = scanProgress.get(scanId);
  if (!progress) return;
  const now = Date.now();
  progress.stage = "error";
  progress.done = true;
  progress.updatedAt = now;
  progress.elapsedMs = now - progress.startedAt;
  progress.message = error.message || String(error);
}

function getScanProgress(scanId) {
  cleanupScanProgress();
  const progress = normalizeScanId(scanId) ? scanProgress.get(scanId) : null;
  if (!progress) return { found: false };
  return {
    found: true,
    ...progress,
    elapsedLabel: formatDuration(progress.elapsedMs),
    currentDateElapsedLabel: progress.currentDateStartedAt ? formatDuration(Date.now() - progress.currentDateStartedAt) : "",
    dateSummaries: progress.dateSummaries.map((summary) => ({
      ...summary,
      elapsedLabel: formatDuration(summary.elapsedMs),
    })),
  };
}

function cleanupScanProgress() {
  const now = Date.now();
  for (const [scanId, progress] of scanProgress) {
    if (now - progress.updatedAt > SCAN_PROGRESS_TTL_MS) scanProgress.delete(scanId);
  }
}

function formatFlightLabel(meta) {
  return [meta.flight, meta.direction].filter(Boolean).join(" ");
}

function formatDuration(ms) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return minutes ? `${minutes}m ${String(remainder).padStart(2, "0")}s` : `${remainder}s`;
}

async function login(page, email, password) {
  await gotoWithRetry(page, `${BASE_URL}/login`);
  if (!page.url().includes("/login")) return;

  await page.getByPlaceholder("Email").waitFor({ state: "visible", timeout: 30000 });
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill(password);

  const button = page.getByRole("button", { name: "Sign In" });
  if ((await button.count()) === 0) {
    throw new Error("Sign In button was not available on the login page.");
  }
  await button.click();
  await page.waitForURL((url) => !url.toString().includes("/login"), {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  }).catch(() => null);

  if (page.url().includes("/login")) {
    throw new Error("Login did not complete. Check the credentials.");
  }
}

async function gotoWithRetry(page, url) {
  let lastError = null;

  for (let attempt = 0; attempt <= REQUEST_RETRIES; attempt += 1) {
    if (attempt > 0) await sleep(2000 * attempt);

    try {
      return await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    } catch (error) {
      lastError = error;
      console.warn(`Navigation to ${url} failed on attempt ${attempt + 1}: ${error.message.split("\n")[0]}`);
    }
  }

  throw lastError;
}

function normalizePayload(payload) {
  const startDate = parseIsoDate(payload.startDate);
  const endDate = parseIsoDate(payload.endDate);
  if (!startDate || !endDate || endDate < startDate) throw new Error("Invalid date range.");
  if (!payload.email || !payload.password) throw new Error("Email and password are required.");

  const startTime = parseTime(payload.startTime || "00:00");
  const endTime = parseTime(payload.endTime || "23:59");
  if (!startTime || !endTime) throw new Error("Invalid time window.");

  const days = Array.isArray(payload.days) ? payload.days.map(Number) : [];
  const publicHolidays = parseHolidayDates(payload.publicHolidays);
  const includePublicHolidays = Boolean(payload.includePublicHolidays);

  if (includePublicHolidays) {
    for (let year = startDate.getUTCFullYear(); year <= endDate.getUTCFullYear(); year += 1) {
      for (const holiday of getGermanBavarianHolidays(year)) publicHolidays.add(holiday.date);
    }
  }

  const airlines = normalizeCodes(payload.airlines, /^all(?:\s+airlines?)?$/i);
  const slas = normalizeCodes(payload.slas, /^all(?:\s+slas?)?$/i);
  const allSlots = Boolean(payload.allSlots);
  const forceRefresh = Boolean(payload.forceRefresh);

  return {
    email: String(payload.email),
    password: String(payload.password),
    startDate,
    endDate,
    startTime,
    endTime,
    days,
    includePublicHolidays,
    publicHolidays,
    airlines,
    slas,
    allSlots,
    forceRefresh,
  };
}

function parseHolidayDates(value) {
  return new Set(
    String(value || "")
      .split(/[\s,;]+/)
      .map((date) => date.trim())
      .filter(Boolean)
  );
}

function selectedDates(config) {
  const dates = [];
  const cursor = new Date(config.startDate);

  while (cursor <= config.endDate) {
    const iso = formatIsoDate(cursor);
    const weekdayMatch = config.days.includes(cursor.getUTCDay());
    const holidayMatch = config.includePublicHolidays && config.publicHolidays.has(iso);
    if (weekdayMatch || holidayMatch) dates.push(new Date(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return dates;
}

function parseIsoDate(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function parseTime(value) {
  const match = String(value || "").match(/^(\d{2}):(\d{2})$/);
  if (!match) return null;
  return { hour: Number(match[1]), minute: Number(match[2]) };
}

function dateWithTime(date, time) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), time.hour, time.minute));
}

function formatIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function formatAvbisDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${day}-${months[date.getUTCMonth()]}-${date.getUTCFullYear()}`;
}

function airlineMatches(flight, airlines) {
  if (!airlines.length) return true;
  return airlines.includes(airlineCodeFromFlight(flight));
}

function slaMatches(sla, slas) {
  if (!slas.length) return true;
  return slas.includes(String(sla || "").trim().toUpperCase());
}

function normalizeCodes(value, allPattern) {
  const values = Array.isArray(value) ? value : String(value || "").split(/[\s,;]+/);
  return values
    .flatMap((item) => String(item || "").split(/[\s,;]+/))
    .map((code) => code.trim().toUpperCase())
    .filter((code) => code && !allPattern.test(code));
}

function airlineCodeFromFlight(flight) {
  return parseFlightText(flight.text).flight.split(/\s+/)[0]?.toUpperCase() || "";
}

function extractFlightLinks(html) {
  const byId = new Map();

  // Try pattern 1: <a ... class="...flightContainer..." id="12345"...>
  const anchorRe = /<a\b[^>]*\bid=["']?(\d+)["']?[^>]*>[\s\S]*?<\/a>/gi;
  let match;

  while ((match = anchorRe.exec(html))) {
    const anchor = match[0];
    const id = match[1];
    const attrs = parseAttributes(anchor);
    if (attrs.class && String(attrs.class).includes("flightContainer")) {
      if (!byId.has(id)) byId.set(id, cleanText(stripTags(anchor)));
    }
  }

  if (!byId.size) {
    // Try pattern 2: id="(\d+)" class="...flightContainer..."
    const genericRe = /<(?:a|div|tr)\b[^>]*\bid=["']?(\d+)["']?[^>]*class=["'][^"']*\bflightContainer\b[^"']*["'][^>]*>([\s\S]*?)<\/(?:a|div|tr)>/gi;
    while ((match = genericRe.exec(html))) {
      const id = match[1];
      if (!byId.has(id)) byId.set(id, cleanText(stripTags(match[2])));
    }
  }

  return [...byId.entries()].map(([id, text]) => ({ id, text }));
}

function parseSodGroups(html, flightDate) {
  const tables = String(html).match(/<table\b[\s\S]*?<\/table>/gi) || [];
  const groups = [];
  let current = null;

  for (const table of tables) {
    const trRe = /<tr\b[\s\S]*?<\/tr>/gi;
    let trMatch;
    while ((trMatch = trRe.exec(table))) {
      const trHtml = trMatch[0];
      const cells = [];
      const embeddedStaff = [];
      const cellRe = /<(?:td|th)\b[\s\S]*?<\/(?:td|th)>/gi;
      let cellMatch;
      while ((cellMatch = cellRe.exec(trHtml))) {
        const cellHtml = cellMatch[0];
        let cellText = cleanText(stripTags(cellHtml));
        if (!cellText) {
          const inputValMatch = cellHtml.match(/<input\b[^>]*\bvalue\s*=\s*(["'])(.*?)\1/i);
          if (inputValMatch) cellText = cleanText(decodeHtml(inputValMatch[2]));
        }
        cells.push(cellText);
        embeddedStaff.push(...extractSelectedStaffLabels(cellHtml));
      }
      cells.push(...embeddedStaff);
      if (!cells.length) continue;

      if (cells[0] === "SLA") continue;
      const requiredCell = cells.find((cell) => /Required\s*:/i.test(cell));

      if (requiredCell) {
        if (current) groups.push(finishGroup(current));
        current = {
          sla: cells[0] || "",
          type: cells[1] || "",
          movement: (requiredCell.split(/Required\s*:/i)[0] || "").trim(),
          required: Number((requiredCell.match(/Required\s*:\s*(\d+)/i) || [])[1] || 0),
          start: stripSla(cells[3] || ""),
          release: stripSla(cells[4] || ""),
          duration: (cells[5] || "").replace(/act/gi, "").replace(/>/g, "").replace(/^[-\s()]+|[-\s()]+$/g, "").trim(),
          staff: [],
          staff_details: [],
          flightDate,
        };
        const staffInRow = extractStaffLabelsFromCells(cells);
        if (staffInRow.length) {
          const timing = extractRowTiming(cells, current.start, current.release, current.duration, flightDate);
          for (const staffName of staffInRow) {
            current.staff.push(staffName);
            current.staff_details.push({
              name: staffName,
              start_utc: timing.start || current.start,
              release_utc: timing.release || current.release,
              duration: timing.duration || current.duration,
              duration_minutes: timing.durationMinutes,
              is_shorter: Boolean(timing.isShorter),
              custom_timing: Boolean(timing.isCustomTiming),
            });
          }
        }
      } else if (current) {
        const staffInRow = extractStaffLabelsFromCells(cells);
        if (staffInRow.length) {
          const timing = extractRowTiming(cells, current.start, current.release, current.duration, flightDate);
          for (const staffName of staffInRow) {
            current.staff.push(staffName);
            current.staff_details.push({
              name: staffName,
              start_utc: timing.start || current.start,
              release_utc: timing.release || current.release,
              duration: timing.duration || current.duration,
              duration_minutes: timing.durationMinutes,
              is_shorter: Boolean(timing.isShorter),
              custom_timing: Boolean(timing.isCustomTiming),
            });
          }
        }
      }
    }
  }

  if (current) groups.push(finishGroup(current));
  return groups;
}

function normalizeTimeWithDate(timeStr, defaultWithDate) {
  const clean = stripSla(timeStr || "").replace(/act/gi, "").replace(/[>()]/g, "").replace(/^[-\s]+|[-\s]+$/g, "").trim();
  if (!clean) return "";
  if (/^\d{1,2}\s+[A-Za-z]{3}\s+\d{1,2}:\d{2}$/.test(clean)) return clean;
  if (/^\d{1,2}:\d{2}$/.test(clean)) {
    const prefixMatch = String(defaultWithDate || "").match(/^(\d{1,2}\s+[A-Za-z]{3})\s+/);
    if (prefixMatch) return `${prefixMatch[1]} ${clean}`;
    return clean;
  }
  return clean;
}

function computeDurationMinutes(startText, releaseText, durationText, flightDate) {
  if (durationText) {
    const cleanDur = String(durationText).replace(/act/gi, "").replace(/[>()]/g, "").replace(/^[-\s]+|[-\s]+$/g, "").trim();
    if (cleanDur.includes(":")) {
      const m = cleanDur.match(/^(\d+):(\d+)$/);
      if (m) return Number(m[1]) * 60 + Number(m[2]);
    }
  }
  const s = parseSodUtc(startText, flightDate);
  const r = parseSodUtc(releaseText, flightDate);
  if (s && r && r > s) return Math.round((r - s) / 60000);
  return 0;
}

function extractRowTiming(cells, defaultStart, defaultRelease, defaultDuration, flightDate) {
  const groupStart = defaultStart || "";
  const groupRelease = defaultRelease || "";
  const groupDuration = defaultDuration || "";
  const groupDurationMinutes = computeDurationMinutes(groupStart, groupRelease, groupDuration, flightDate);

  let rawStart = cells[3] || "";
  let rawRelease = cells[4] || "";
  let rawDuration = cells[5] || "";

  const timeCellIndices = [];
  cells.forEach((cell, idx) => {
    const text = stripSla(cell || "").replace(/act/gi, "").replace(/[>()]/g, "").replace(/^[-\s]+|[-\s]+$/g, "").trim();
    if (/^(?:\d{1,2}\s+[A-Za-z]{3}\s+)?\d{1,2}:\d{2}$/.test(text)) timeCellIndices.push(idx);
  });

  if (timeCellIndices.length >= 2) {
    rawStart = cells[timeCellIndices[0]];
    rawRelease = cells[timeCellIndices[1]];
    if (timeCellIndices.length >= 3) rawDuration = cells[timeCellIndices[2]];
  }

  const staffStart = normalizeTimeWithDate(rawStart, groupStart) || groupStart;
  const staffRelease = normalizeTimeWithDate(rawRelease, groupRelease) || groupRelease;
  const staffDuration = (rawDuration || "").replace(/act/gi, "").replace(/>/g, "").replace(/^[-\s()]+|[-\s()]+$/g, "").trim() || groupDuration;
  const staffDurationMinutes = computeDurationMinutes(staffStart, staffRelease, staffDuration, flightDate);

  const groupStartDate = parseSodUtc(groupStart, flightDate);
  const groupReleaseDate = parseSodUtc(groupRelease, flightDate);
  const staffStartDate = parseSodUtc(staffStart, flightDate);
  const staffReleaseDate = parseSodUtc(staffRelease, flightDate);

  const isLaterStart = Boolean(groupStartDate && staffStartDate && staffStartDate.getTime() > groupStartDate.getTime());
  const isEarlierRelease = Boolean(groupReleaseDate && staffReleaseDate && staffReleaseDate.getTime() < groupReleaseDate.getTime());
  const isShorterDuration = Boolean(groupDurationMinutes > 0 && staffDurationMinutes > 0 && staffDurationMinutes < groupDurationMinutes);
  const isShorter = Boolean(isLaterStart || isEarlierRelease || isShorterDuration);
  const isCustomTiming = Boolean(isShorter || (staffStart && staffStart !== groupStart) || (staffRelease && staffRelease !== groupRelease));

  return {
    start: staffStart,
    release: staffRelease,
    duration: staffDuration,
    durationMinutes: staffDurationMinutes || groupDurationMinutes,
    isShorter,
    isCustomTiming,
  };
}

function extractStaffDirectory(html) {
  const staff = new Set();
  const optionRe = /<option\b[^>]*>([\s\S]*?)<\/option>/gi;
  let match;
  while ((match = optionRe.exec(String(html)))) {
    const label = cleanText(stripTags(match[1]));
    if (/^[A-Z0-9]{2,10}\s+-\s+\S+/i.test(label)) staff.add(label);
  }
  return [...staff];
}

function finishGroup(group) {
  const staff = [...new Set(group.staff)];
  const assigned = staff.length;
  const staffDetailsMap = new Map();
  for (const detail of (group.staff_details || [])) {
    if (detail && detail.name && !staffDetailsMap.has(detail.name)) {
      staffDetailsMap.set(detail.name, detail);
    }
  }
  const staff_details = staff.map((name) => {
    if (staffDetailsMap.has(name)) return staffDetailsMap.get(name);
    return {
      name,
      start_utc: group.start,
      release_utc: group.release,
      duration: group.duration,
      duration_minutes: computeDurationMinutes(group.start, group.release, group.duration, group.flightDate),
      is_shorter: false,
      custom_timing: false,
    };
  });
  const has_shorter_assignment = staff_details.some((d) => d.is_shorter);
  const shorter_staff_count = staff_details.filter((d) => d.is_shorter).length;

  return {
    ...group,
    staff,
    staff_details,
    has_shorter_assignment,
    shorter_staff_count,
    assigned,
    missing: Math.max(0, group.required - assigned),
    startDate: parseSodUtc(group.start, group.flightDate),
    releaseDate: parseSodUtc(group.release, group.flightDate),
  };
}

function extractTableRows(html) {
  const tables = String(html).match(/<table\b[\s\S]*?<\/table>/gi) || [];
  const rows = [];
  const trRe = /<tr\b[\s\S]*?<\/tr>/gi;
  for (const table of tables) {
    let trMatch;
    while ((trMatch = trRe.exec(table))) {
      const cells = [];
      const embeddedStaff = [];
      const cellRe = /<(?:td|th)\b[\s\S]*?<\/(?:td|th)>/gi;
      let cellMatch;
      while ((cellMatch = cellRe.exec(trMatch[0]))) {
        const cellHtml = cellMatch[0];
        let cellText = cleanText(stripTags(cellHtml));
        if (!cellText) {
          const inputValMatch = cellHtml.match(/<input\b[^>]*\bvalue\s*=\s*(["'])(.*?)\1/i);
          if (inputValMatch) cellText = cleanText(decodeHtml(inputValMatch[2]));
        }
        cells.push(cellText);
        embeddedStaff.push(...extractSelectedStaffLabels(cellHtml));
      }
      cells.push(...embeddedStaff);
      if (cells.length) rows.push(cells);
    }
  }

  return rows;
}

function extractSelectedStaffLabels(cellHtml) {
  const labels = new Set();
  const selectedOptionRe = /<option\b[^>]*\bselected(?:\s*=\s*["'][^"']*["'])?[^>]*>([\s\S]*?)<\/option>/gi;
  let match;
  while ((match = selectedOptionRe.exec(cellHtml))) {
    const label = cleanText(stripTags(match[1]));
    if (isStaffLabel(label)) labels.add(label);
  }
  const inputRe = /<input\b[^>]*\bvalue\s*=\s*(["'])(.*?)\1[^>]*>/gi;
  while ((match = inputRe.exec(cellHtml))) {
    const label = cleanText(decodeHtml(match[2]));
    if (isStaffLabel(label)) labels.add(label);
  }
  return [...labels];
}

function extractStaffLabelsFromCells(cells) {
  const labels = new Set();
  for (const cell of cells) {
    const label = cleanText(cell).replace(/\s+(?:Remove|Delete|Unassign|×)\s*$/i, "").trim();
    if (isStaffLabel(label)) labels.add(label);
  }
  return [...labels];
}

function isStaffLabel(label) {
  const text = String(label || "").trim();
  const identityMarkers = text.match(/(?:^|\s)[A-Z0-9]{2,10}\s+-\s+/gi) || [];
  return identityMarkers.length === 1 && /^[A-Z0-9]{2,10}\s+-\s+\S.+$/i.test(text);
}

function parseAttributes(tag) {
  const attrs = {};
  const attrRe = /([A-Za-z_:][-A-Za-z0-9_:.]*)\s*=\s*(["'])(.*?)\2/g;
  let match;
  while ((match = attrRe.exec(tag))) attrs[match[1]] = decodeHtml(match[3]);
  return attrs;
}

function parseFlightText(text) {
  const parts = text.split("|").map((part) => part.trim()).filter(Boolean);
  const flight = (parts[0] || "").replace(/^[^A-Z0-9]*/, "").trim();
  const route = parts[1] || "";
  const aircraft = parts[2] || "";
  const rest = parts.slice(3).join(" | ");
  const scheduledMatch = rest.match(/\b(STA|STD)\s*((?:\d{2}\s+)?\d{2}:\d{2})/);
  const direction = scheduledMatch?.[1] === "STA"
    ? "Arrival"
    : scheduledMatch?.[1] === "STD"
      ? "Departure"
      : directionFromRoute(route);

  return {
    flight,
    route,
    aircraft,
    direction,
    scheduled: scheduledMatch ? `${scheduledMatch[1]} ${scheduledMatch[2]}` : "",
  };
}

function directionFromRoute(route) {
  const airports = String(route || "").toUpperCase().split("-").map((part) => part.trim()).filter(Boolean);
  if (airports[0] === "MUC") return "Departure";
  if (airports[airports.length - 1] === "MUC") return "Arrival";
  return "";
}

function parseSodUtc(value, flightDate) {
  if (!value) return null;
  const clean = String(value).replace(/act/gi, "").replace(/[>()]/g, "").replace(/^[-\s]+|[-\s]+$/g, "").trim();
  const matchWithDate = clean.match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{1,2}):(\d{2})$/);
  if (matchWithDate) {
    const [, day, mon, hour, minute] = matchWithDate;
    const year = flightDate ? Number(String(flightDate).match(/\d{4}$/)?.[0] || new Date().getUTCFullYear()) : new Date().getUTCFullYear();
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      .findIndex((name) => name.toLowerCase() === mon.toLowerCase());
    if (month >= 0) {
      return new Date(Date.UTC(year, month, Number(day), Number(hour), Number(minute)));
    }
  }
  const matchTimeOnly = clean.match(/^(\d{1,2}):(\d{2})$/);
  if (matchTimeOnly && flightDate) {
    const dMatch = String(flightDate).match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/);
    if (dMatch) {
      const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        .findIndex((name) => name.toLowerCase() === dMatch[2].toLowerCase());
      if (month >= 0) {
        return new Date(Date.UTC(Number(dMatch[3]), month, Number(dMatch[1]), Number(matchTimeOnly[1]), Number(matchTimeOnly[2])));
      }
    }
    const isoMatch = String(flightDate).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
      return new Date(Date.UTC(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3]), Number(matchTimeOnly[1]), Number(matchTimeOnly[2])));
    }
  }
  return null;
}

function overlaps(start, end, periodStart, periodEnd) {
  if (!start || !end) return false;
  return start <= periodEnd && end >= periodStart;
}

function stripSla(value) {
  return cleanText(value).replace(/\s*SLA\s*$/i, "").trim();
}

function stripTags(html) {
  return decodeHtml(String(html).replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " "));
}

function decodeHtml(value) {
  return String(value)
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/&#39;/gi, "'");
}

function cleanText(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function normalizePdfText(value) {
  return String(value || "")
    .replace(/[–—−]/g, "-")
    .replace(/·/g, " | ");
}

function safePdfFilename(value) {
  const cleaned = String(value || "roster.pdf").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-");
  return cleaned.toLowerCase().endsWith(".pdf") ? cleaned : `${cleaned}.pdf`;
}

function buildRosterPdfHtml({ title, subtitle, rosterHtml, css }) {
  const safeTitle = cleanText(normalizePdfText(title || "GSRM Duty Roster"));
  const safeSubtitle = cleanText(normalizePdfText(subtitle || "Visible roster export"));
  const normalizedRosterHtml = normalizePdfText(rosterHtml);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtmlText(safeTitle)}</title>
  <style>${css}</style>
  <style>
    @page { size: A4 landscape; margin: 10mm 9mm 14mm; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #fff; color: #0f172a; font-family: Inter, Arial, sans-serif; }
    .browser-roster-export { width: 100%; }
    .browser-roster-export-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin: 0 0 10px; padding: 0 0 9px; border-bottom: 2px solid #0d9488; }
    .browser-roster-export-header h1 { margin: 0; font-size: 18px; line-height: 1.15; color: #0f766e; background: none !important; -webkit-background-clip: initial !important; background-clip: initial !important; -webkit-text-fill-color: currentColor !important; }
    .browser-roster-export-header p { margin: 4px 0 0; color: #64748b; font-size: 9px; font-weight: 600; }
    .browser-roster-export-mark { color: #0f766e; font-size: 9px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; white-space: nowrap; }
    .browser-roster-content, .browser-roster-content .table-wrap { width: 100% !important; max-width: none !important; max-height: none !important; overflow: visible !important; margin: 0 !important; border-radius: 8px !important; }
    .browser-roster-content .roster-table { width: 100% !important; min-width: 0 !important; table-layout: fixed !important; border-collapse: separate !important; border-spacing: 0 !important; }
    .browser-roster-content .roster-table.single-day,
    .browser-roster-content .roster-table.single-day th:not(:first-child),
    .browser-roster-content .roster-table.single-day td:not(:first-child) { min-width: 0 !important; width: auto !important; }
    .browser-roster-content .roster-table th:first-child,
    .browser-roster-content .roster-person-cell { position: static !important; width: 38mm !important; min-width: 38mm !important; }
    .browser-roster-content .roster-table th,
    .browser-roster-content .roster-table td { position: static !important; padding: 5px 6px !important; border-color: #dbe3ec !important; break-inside: avoid; }
    .browser-roster-content .roster-table th { background: #1e293b !important; color: #fff !important; }
    .browser-roster-content .roster-date-heading span { color: #99f6e4 !important; font-size: 8px !important; }
    .browser-roster-content .roster-date-heading strong { color: #fff !important; font-size: 9px !important; }
    .browser-roster-content .compact-duty { width: 100% !important; min-width: 0 !important; margin-left: 0 !important; padding: 4px 5px !important; box-shadow: none !important; cursor: default !important; break-inside: avoid; }
    .browser-roster-content .compact-duty strong { font-size: 9px !important; }
    .browser-roster-content .compact-duty small { font-size: 7px !important; }
    .browser-roster-content .duty-strip-row { display: grid !important; grid-template-columns: 1fr !important; gap: 4px !important; }
    .browser-roster-content .roster-assign-slot-btn,
    .browser-roster-content .compact-duty-swap-btn,
    .browser-roster-content .compact-duty-delete-btn,
    .browser-roster-content .person-track-changes-btn,
    .browser-roster-content .roster-single-day-summary { display: none !important; }
    .browser-roster-content button.compact-duty { appearance: none; border-top: 0; border-right: 0; border-bottom: 0; font-family: inherit; }
    .browser-roster-content tr { break-inside: avoid; }
  </style>
</head>
<body>
  <main class="browser-roster-export">
    <header class="browser-roster-export-header">
      <div><h1>${escapeHtmlText(safeTitle)}</h1><p>${escapeHtmlText(safeSubtitle)}</p></div>
      <span class="browser-roster-export-mark">Roster section only</span>
    </header>
    <section class="browser-roster-content">${normalizedRosterHtml}</section>
  </main>
</body>
</html>`;
}

function escapeHtmlText(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

async function createRosterSectionPdf(payload = {}) {
  const rosterHtml = String(payload.rosterHtml || "");
  if (!rosterHtml || rosterHtml.length > 2_000_000) throw new Error("Roster export content is missing or too large.");
  if (/<script\b|javascript:|\son\w+\s*=/i.test(rosterHtml)) throw new Error("Roster export contains unsupported active content.");

  const css = await fs.readFile(path.join(PUBLIC_DIR, "styles.css"), "utf8");
  const html = buildRosterPdfHtml({ title: payload.title, subtitle: payload.subtitle, rosterHtml, css });
  const pdfBrowser = await launchBrowser({ headless: true });
  try {
    const page = await pdfBrowser.newPage({ viewport: { width: 1600, height: 900 } });
    await page.setContent(html, { waitUntil: "load" });
    await page.emulateMedia({ media: "screen" });
    return await page.pdf({
      format: "A4",
      landscape: payload.orientation !== "portrait",
      printBackground: true,
      preferCSSPageSize: false,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: '<div style="width:100%;padding:0 10mm;color:#94a3b8;font:8px Arial;text-align:right">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      margin: { top: "10mm", right: "9mm", bottom: "14mm", left: "9mm" },
    });
  } finally {
    await pdfBrowser.close();
  }
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

module.exports = { buildRosterPdfHtml, dateScanSucceeded, extractFlightSodRows, extractStaffDirectory, extractTableRows, fetchFlightLinks, parseSodGroups, safePdfFilename, verifyAuthenticatedSession };
