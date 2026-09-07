const path = require("path");
const fs = require("fs");
const { DatabaseSync } = require("node:sqlite");
const OperationsUtils = require("./public/operations-utils");

function initDatabase(dbPath) {
  const isMemory = dbPath === ":memory:";
  if (!isMemory) {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  const db = new DatabaseSync(dbPath);

  // Initialize tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS gap_notes (
      gap_id TEXT PRIMARY KEY,
      date_str TEXT,
      status TEXT,
      assigned_staff TEXT,
      note TEXT,
      updated_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS staff_availability (
      id TEXT PRIMARY KEY,
      data_json TEXT,
      updated_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS scan_history (
      scan_id TEXT PRIMARY KEY,
      scanned_at INTEGER,
      date_range TEXT,
      data_json TEXT
    );

    CREATE TABLE IF NOT EXISTS sod_cache (
      cache_key TEXT PRIMARY KEY,
      date_str TEXT,
      cached_at INTEGER,
      data_json TEXT
    );

    CREATE TABLE IF NOT EXISTS staff_absences (
      id TEXT PRIMARY KEY,
      person_key TEXT,
      person_name TEXT,
      category TEXT,
      start_date TEXT,
      end_date TEXT,
      start_time TEXT,
      end_time TEXT,
      notes TEXT,
      created_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS custom_rules (
      id TEXT PRIMARY KEY,
      rule_type TEXT,
      name TEXT,
      target TEXT,
      parameters_json TEXT,
      enabled INTEGER,
      created_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS scenarios (
      id TEXT PRIMARY KEY,
      name TEXT,
      strategy TEXT,
      options_json TEXT,
      assignments_json TEXT,
      metrics_json TEXT,
      created_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS monthly_rosters (
      month_key TEXT PRIMARY KEY,
      updated_at INTEGER,
      scanned_dates_json TEXT,
      total_days INTEGER,
      scanned_days_count INTEGER,
      flights_count INTEGER,
      gaps_count INTEGER,
      staff_count INTEGER,
      staff_directory_json TEXT,
      rows_json TEXT,
      changes_json TEXT,
      meta_json TEXT
    );
  `);

  return db;
}

const userHome = process.env.USERPROFILE || process.env.HOME || process.cwd();
const defaultDir = path.join(userHome, ".gsrm-data");
const DEFAULT_DB_PATH = process.env.GSRM_DB_PATH || path.join(defaultDir, "app.db");
let activeDb = null;

function getDb(customPath) {
  if (!activeDb || customPath) {
    activeDb = initDatabase(customPath || DEFAULT_DB_PATH);
  }
  return activeDb;
}

// Gap Notes CRUD
function getAllGapNotes(customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare("SELECT * FROM gap_notes ORDER BY updated_at DESC");
  const rows = stmt.all();
  const result = {};
  for (const row of rows) {
    result[row.gap_id] = {
      status: row.status || "",
      assignedStaff: row.assigned_staff || "",
      note: row.note || "",
      updatedAt: row.updated_at,
    };
  }
  return result;
}

function saveGapNote(gapId, { status, assignedStaff, note, dateStr }, customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare(`
    INSERT INTO gap_notes (gap_id, date_str, status, assigned_staff, note, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(gap_id) DO UPDATE SET
      date_str = excluded.date_str,
      status = excluded.status,
      assigned_staff = excluded.assigned_staff,
      note = excluded.note,
      updated_at = excluded.updated_at
  `);
  stmt.run(gapId, dateStr || "", status || "", assignedStaff || "", note || "", Date.now());
}

function saveAllGapNotes(notesObject, customDb) {
  const db = customDb || getDb();
  for (const [gapId, data] of Object.entries(notesObject || {})) {
    saveGapNote(gapId, data, db);
  }
}

// Staff Availability CRUD
function getStaffAvailability(customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare("SELECT data_json FROM staff_availability WHERE id = 'main'");
  const row = stmt.get();
  if (!row || !row.data_json) return null;
  try {
    return JSON.parse(row.data_json);
  } catch {
    return null;
  }
}

function saveStaffAvailability(data, customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare(`
    INSERT INTO staff_availability (id, data_json, updated_at)
    VALUES ('main', ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      data_json = excluded.data_json,
      updated_at = excluded.updated_at
  `);
  stmt.run(JSON.stringify(data || {}), Date.now());
}

// Scan History CRUD
function getScanHistory(customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare("SELECT data_json FROM scan_history ORDER BY scanned_at DESC");
  const rows = stmt.all();
  return rows.map((r) => {
    try {
      return JSON.parse(r.data_json);
    } catch {
      return null;
    }
  }).filter(Boolean);
}

function saveScanItem(item, customDb) {
  if (!item || !item.id) return;
  const db = customDb || getDb();
  const stmt = db.prepare(`
    INSERT INTO scan_history (scan_id, scanned_at, date_range, data_json)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(scan_id) DO UPDATE SET
      scanned_at = excluded.scanned_at,
      date_range = excluded.date_range,
      data_json = excluded.data_json
  `);
  stmt.run(item.id, item.timestamp || Date.now(), item.dateRange || "", JSON.stringify(item));
}

function saveScanHistory(historyArray, customDb) {
  const db = customDb || getDb();
  for (const item of historyArray || []) {
    saveScanItem(item, db);
  }
}

function clearScanHistory(customDb) {
  const db = customDb || getDb();
  db.exec("DELETE FROM scan_history");
}

function deleteScanItem(id, customDb) {
  if (!id) return;
  const db = customDb || getDb();
  const stmt = db.prepare("DELETE FROM scan_history WHERE scan_id = ?");
  stmt.run(id);
}

// SOD Server Cache CRUD (15 minute TTL = 15 * 60 * 1000 ms)
const CACHE_TTL_MS = 15 * 60 * 1000;

function getCachedSod(cacheKey, customDb, ttlMs = CACHE_TTL_MS) {
  const db = customDb || getDb();
  const stmt = db.prepare("SELECT cached_at, data_json FROM sod_cache WHERE cache_key = ?");
  const row = stmt.get(cacheKey);
  if (!row) return null;
  if (Date.now() - row.cached_at > ttlMs) {
    const delStmt = db.prepare("DELETE FROM sod_cache WHERE cache_key = ?");
    delStmt.run(cacheKey);
    return null;
  }
  try {
    return JSON.parse(row.data_json);
  } catch {
    return null;
  }
}

function setCachedSod(cacheKey, dateStr, data, customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare(`
    INSERT INTO sod_cache (cache_key, date_str, cached_at, data_json)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(cache_key) DO UPDATE SET
      date_str = excluded.date_str,
      cached_at = excluded.cached_at,
      data_json = excluded.data_json
  `);
  stmt.run(cacheKey, dateStr || "", Date.now(), JSON.stringify(data || {}));
}

function clearSodCache(customDb) {
  const db = customDb || getDb();
  db.exec("DELETE FROM sod_cache");
}

function getCacheStats(customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare("SELECT COUNT(*) as count FROM sod_cache");
  const row = stmt.get();
  return { entryCount: row ? row.count : 0, ttlMinutes: 15 };
}

// --- Absences CRUD ---
function getAllAbsences(customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare("SELECT * FROM staff_absences ORDER BY start_date ASC, created_at DESC");
  return (stmt.all() || []).map((row) => ({ ...row, absence_type: row.category }));
}

function saveAbsence(absenceObj, customDb) {
  const db = customDb || getDb();
  const id = absenceObj.id || `abs_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const stmt = db.prepare(`
    INSERT INTO staff_absences (id, person_key, person_name, category, start_date, end_date, start_time, end_time, notes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      person_key = excluded.person_key,
      person_name = excluded.person_name,
      category = excluded.category,
      start_date = excluded.start_date,
      end_date = excluded.end_date,
      start_time = excluded.start_time,
      end_time = excluded.end_time,
      notes = excluded.notes
  `);
  stmt.run(
    id,
    absenceObj.person_key || "",
    absenceObj.person_name || "",
    absenceObj.category || absenceObj.absence_type || "Vacation",
    absenceObj.start_date || "",
    absenceObj.end_date || absenceObj.start_date || "",
    absenceObj.start_time || "00:00",
    absenceObj.end_time || "23:59",
    absenceObj.notes || "",
    absenceObj.created_at || Date.now()
  );
  const category = absenceObj.category || absenceObj.absence_type || "Vacation";
  return { id, ...absenceObj, category, absence_type: category };
}

function deleteAbsence(id, customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare("DELETE FROM staff_absences WHERE id = ?");
  stmt.run(id);
  return { success: true, id };
}

// --- Custom Rules CRUD ---
function getAllCustomRules(customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare("SELECT * FROM custom_rules ORDER BY created_at ASC");
  const rows = stmt.all() || [];
  return rows.map((r) => ({
    ...r,
    title: r.name,
    enabled: Boolean(r.enabled),
    parameters: r.parameters_json ? JSON.parse(r.parameters_json) : {},
  }));
}

function saveCustomRule(ruleObj, customDb) {
  const db = customDb || getDb();
  const id = ruleObj.id || `rule_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const paramsJson = JSON.stringify(ruleObj.parameters || ruleObj.parameters_json || {});
  const stmt = db.prepare(`
    INSERT INTO custom_rules (id, rule_type, name, target, parameters_json, enabled, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      rule_type = excluded.rule_type,
      name = excluded.name,
      target = excluded.target,
      parameters_json = excluded.parameters_json,
      enabled = excluded.enabled
  `);
  stmt.run(
    id,
    ruleObj.rule_type || "MIN_REST_HOURS",
    ruleObj.name || ruleObj.title || "Custom Rule",
    ruleObj.target || "GLOBAL",
    paramsJson,
    ruleObj.enabled === false ? 0 : 1,
    ruleObj.created_at || Date.now()
  );
  const name = ruleObj.name || ruleObj.title || "Custom Rule";
  return { id, ...ruleObj, name, title: name };
}

function deleteCustomRule(id, customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare("DELETE FROM custom_rules WHERE id = ?");
  stmt.run(id);
  return { success: true, id };
}

// --- What-if Scenarios CRUD ---
function getAllScenarios(customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare("SELECT * FROM scenarios ORDER BY created_at DESC");
  const rows = stmt.all() || [];
  return rows.map((r) => ({
    ...r,
    title: r.name,
    options: r.options_json ? JSON.parse(r.options_json) : {},
    assignments: r.assignments_json ? JSON.parse(r.assignments_json) : [],
    metrics: r.metrics_json ? JSON.parse(r.metrics_json) : {},
  }));
}

function saveScenario(scenarioObj, customDb) {
  const db = customDb || getDb();
  const id = scenarioObj.id || `scen_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const stmt = db.prepare(`
    INSERT INTO scenarios (id, name, strategy, options_json, assignments_json, metrics_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      strategy = excluded.strategy,
      options_json = excluded.options_json,
      assignments_json = excluded.assignments_json,
      metrics_json = excluded.metrics_json
  `);
  stmt.run(
    id,
    scenarioObj.name || scenarioObj.title || "Alternative Plan",
    scenarioObj.strategy || "min_overtime",
    JSON.stringify(scenarioObj.options || {}),
    JSON.stringify(scenarioObj.assignments || []),
    JSON.stringify(scenarioObj.metrics || {}),
    scenarioObj.created_at || Date.now()
  );
  const name = scenarioObj.name || scenarioObj.title || "Alternative Plan";
  return { id, ...scenarioObj, name, title: name };
}

function deleteScenario(id, customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare("DELETE FROM scenarios WHERE id = ?");
  stmt.run(id);
  return { success: true, id };
}

// --- Monthly Rosters CRUD & Merging ---
function getAllMonthlyRosters(customDb, includeRows = false) {
  const db = customDb || getDb();
  const stmt = db.prepare("SELECT * FROM monthly_rosters ORDER BY month_key DESC");
  const rows = stmt.all() || [];
  return rows.map((r) => {
    let scannedDates = [];
    let staffDirectory = [];
    let changes = [];
    let meta = {};
    let rosterRows = [];
    try { scannedDates = JSON.parse(r.scanned_dates_json || "[]"); } catch {}
    try { staffDirectory = JSON.parse(r.staff_directory_json || "[]"); } catch {}
    try { changes = JSON.parse(r.changes_json || "[]"); } catch {}
    try { meta = JSON.parse(r.meta_json || "{}"); } catch {}
    if (includeRows) {
      try { rosterRows = JSON.parse(r.rows_json || "[]"); } catch {}
    }
    return {
      monthKey: r.month_key,
      updatedAt: r.updated_at,
      scannedDates,
      totalDays: r.total_days,
      scannedDaysCount: r.scanned_days_count,
      coveragePercent: r.total_days > 0 ? Math.round((r.scanned_days_count / r.total_days) * 100) : 0,
      flightsCount: r.flights_count,
      gapsCount: r.gaps_count,
      staffCount: r.staff_count,
      staffDirectory,
      changes,
      meta,
      ...(includeRows ? { rows: rosterRows } : {}),
    };
  });
}

function getMonthlyRoster(monthKey, customDb) {
  if (!monthKey) return null;
  const db = customDb || getDb();
  const stmt = db.prepare("SELECT * FROM monthly_rosters WHERE month_key = ?");
  const row = stmt.get(monthKey);
  if (!row) return null;
  let scannedDates = [];
  let staffDirectory = [];
  let changes = [];
  let meta = {};
  let rosterRows = [];
  try { scannedDates = JSON.parse(row.scanned_dates_json || "[]"); } catch {}
  try { staffDirectory = JSON.parse(row.staff_directory_json || "[]"); } catch {}
  try { changes = JSON.parse(row.changes_json || "[]"); } catch {}
  try { meta = JSON.parse(row.meta_json || "{}"); } catch {}
  try { rosterRows = JSON.parse(row.rows_json || "[]"); } catch {}
  return {
    monthKey: row.month_key,
    updatedAt: row.updated_at,
    scannedDates,
    totalDays: row.total_days,
    scannedDaysCount: row.scanned_days_count,
    coveragePercent: row.total_days > 0 ? Math.round((row.scanned_days_count / row.total_days) * 100) : 0,
    flightsCount: row.flights_count,
    gapsCount: row.gaps_count,
    staffCount: row.staff_count,
    staffDirectory,
    rows: rosterRows,
    changes,
    meta,
  };
}

function saveMonthlyRoster(monthRecord, customDb) {
  if (!monthRecord || !monthRecord.monthKey) return null;
  const db = customDb || getDb();
  const monthKey = monthRecord.monthKey;
  const updatedAt = monthRecord.updatedAt || Date.now();
  const scannedDates = monthRecord.scannedDates || [];
  const rows = monthRecord.rows || [];
  const staffDirectory = monthRecord.staffDirectory || [];
  const changes = monthRecord.changes || [];
  const meta = monthRecord.meta || {};

  const summary = OperationsUtils.summarizeMonthRoster(rows, scannedDates, monthKey);

  const stmt = db.prepare(`
    INSERT INTO monthly_rosters (
      month_key, updated_at, scanned_dates_json, total_days,
      scanned_days_count, flights_count, gaps_count, staff_count,
      staff_directory_json, rows_json, changes_json, meta_json
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(month_key) DO UPDATE SET
      updated_at = excluded.updated_at,
      scanned_dates_json = excluded.scanned_dates_json,
      total_days = excluded.total_days,
      scanned_days_count = excluded.scanned_days_count,
      flights_count = excluded.flights_count,
      gaps_count = excluded.gaps_count,
      staff_count = excluded.staff_count,
      staff_directory_json = excluded.staff_directory_json,
      rows_json = excluded.rows_json,
      changes_json = excluded.changes_json,
      meta_json = excluded.meta_json
  `);

  stmt.run(
    monthKey,
    updatedAt,
    JSON.stringify(summary.scannedDates || scannedDates),
    summary.daysInMonth || 30,
    summary.scannedDaysCount || 0,
    summary.flightsCount || 0,
    summary.gapsCount || 0,
    staffDirectory.length,
    JSON.stringify(staffDirectory),
    JSON.stringify(rows),
    JSON.stringify(changes),
    JSON.stringify(meta)
  );

  return getMonthlyRoster(monthKey, db);
}

function updateMonthlyRosterWithScan(scanResult, payload = {}, customDb) {
  if (!scanResult) return [];
  const db = customDb || getDb();
  const scanRows = scanResult.rows || [];
  const rawDates = [
    ...(scanResult.scannedDates || []),
    ...(scanRows.map((r) => r && r.date)),
    payload.startDate,
    payload.endDate,
  ].filter(Boolean);

  const scanDates = (scanResult.scannedDates || []).map((d) => OperationsUtils.normalizeDateToIso(d)).filter(Boolean);

  const monthKeys = new Set();
  for (const d of rawDates) {
    const iso = OperationsUtils.normalizeDateToIso(d);
    if (iso && iso.length >= 7) {
      monthKeys.add(iso.slice(0, 7));
    }
  }

  const updatedResults = [];

  for (const monthKey of monthKeys) {
    const existing = getMonthlyRoster(monthKey, db);
    const existingRows = existing ? existing.rows : [];
    const existingScannedDates = existing ? existing.scannedDates : [];
    const existingChanges = existing ? existing.changes : [];
    const existingStaff = existing ? existing.staffDirectory : [];

    const monthScanRows = scanRows.filter((r) => {
      const iso = OperationsUtils.normalizeDateToIso(r.date);
      return iso && iso.startsWith(monthKey);
    });
    const monthScanDates = scanDates.filter((d) => d.startsWith(monthKey));

    const diff = OperationsUtils.detectRosterChanges(existingRows, monthScanRows, monthScanDates);
    const mergedRows = OperationsUtils.mergeRosterRows(existingRows, monthScanRows, monthScanDates);
    const unionScannedDates = [...new Set([...existingScannedDates, ...monthScanDates])].sort();
    const mergedStaff = [...new Set([...existingStaff, ...(scanResult.staffDirectory || [])])].sort();

    const changeEntry = {
      timestamp: Date.now(),
      scanId: payload.scanId || `scan_${Date.now()}`,
      summary: diff.summary,
      hasChanges: diff.hasChanges,
      scannedDates: monthScanDates,
      addedFlightsCount: diff.addedFlights.length,
      removedFlightsCount: diff.removedFlights.length,
      changedDutiesCount: diff.changedDuties.length,
      newGapsCount: diff.newGaps.length,
      resolvedGapsCount: diff.resolvedGaps.length,
      staffReassignmentsCount: diff.staffReassignments.length,
    };

    const newChanges = [changeEntry, ...existingChanges].slice(0, 30);

    const savedRecord = saveMonthlyRoster({
      monthKey,
      updatedAt: Date.now(),
      scannedDates: unionScannedDates,
      rows: mergedRows,
      staffDirectory: mergedStaff,
      changes: newChanges,
      meta: {
        lastScanId: payload.scanId || "",
        lastScanType: payload.isAutoScan ? "auto" : "manual",
        airlines: [...new Set([...(existing?.meta?.airlines || []), ...(scanResult.airlines || [])])].sort(),
        slas: [...new Set([...(existing?.meta?.slas || []), ...(scanResult.slas || [])])].sort(),
      },
    }, db);

    updatedResults.push({
      monthKey,
      summary: diff.summary,
      hasChanges: diff.hasChanges,
      diff,
      monthRecord: savedRecord,
    });
  }

  return updatedResults;
}

function deleteMonthlyRoster(monthKey, customDb) {
  if (!monthKey) return { success: false };
  const db = customDb || getDb();
  const stmt = db.prepare("DELETE FROM monthly_rosters WHERE month_key = ?");
  stmt.run(monthKey);
  return { success: true, monthKey };
}

function mergeCustomDateRange(startDate, endDate, customDb) {
  const db = customDb || getDb();
  const allMonths = getAllMonthlyRosters(db, true);
  const scanHistory = getScanHistory(db);

  let mergedRows = [];
  const allDates = new Set();
  const staffSet = new Set();
  const airlineSet = new Set();
  const slaSet = new Set();

  // 1. Gather rows from saved monthly rosters
  for (const m of allMonths) {
    const monthRows = (m.rows || []).filter((r) => {
      const iso = OperationsUtils.normalizeDateToIso(r.date);
      return iso >= startDate && iso <= endDate;
    });
    const monthDates = (m.scannedDates || []).filter((d) => {
      const iso = OperationsUtils.normalizeDateToIso(d);
      return iso >= startDate && iso <= endDate;
    });
    if (monthRows.length > 0 || monthDates.length > 0) {
      mergedRows = OperationsUtils.mergeRosterRows(mergedRows, monthRows, monthDates);
    }
  }

  // 2. Also gather and merge rows from scan history snapshots
  const sortedScans = [...scanHistory].sort((a, b) => {
    const timeA = new Date(a.createdAt || a.timestamp || 0).getTime();
    const timeB = new Date(b.createdAt || b.timestamp || 0).getTime();
    return timeA - timeB;
  });

  for (const scan of sortedScans) {
    const scanDates = (scan.scannedDates || []).filter((d) => {
      const iso = OperationsUtils.normalizeDateToIso(d);
      return iso >= startDate && iso <= endDate;
    });
    const scanRows = (scan.rows || []).filter((r) => {
      const iso = OperationsUtils.normalizeDateToIso(r.date);
      return iso >= startDate && iso <= endDate;
    });
    if (scanRows.length > 0 || scanDates.length > 0) {
      mergedRows = OperationsUtils.mergeRosterRows(mergedRows, scanRows, scanDates);
    }
  }

  for (const r of mergedRows) {
    const iso = OperationsUtils.normalizeDateToIso(r.date);
    if (iso) allDates.add(iso);
    if (r.airline) airlineSet.add(r.airline);
    if (r.sla) slaSet.add(r.sla);
    if (Array.isArray(r.staff)) {
      for (const s of r.staff) staffSet.add(s);
    }
  }

  for (const m of allMonths) {
    for (const d of m.scannedDates || []) {
      const iso = OperationsUtils.normalizeDateToIso(d);
      if (iso >= startDate && iso <= endDate) allDates.add(iso);
    }
  }
  for (const s of sortedScans) {
    for (const d of s.scannedDates || []) {
      const iso = OperationsUtils.normalizeDateToIso(d);
      if (iso >= startDate && iso <= endDate) allDates.add(iso);
    }
  }

  const sortedDates = [...allDates].sort();
  const uniqueFlights = new Set(mergedRows.map((r) => `${r.date}|${r.flight || r.flight_id}`));
  const gaps = mergedRows.filter((r) => Number(r.missing || 0) > 0);

  return {
    startDate,
    endDate,
    rows: mergedRows,
    scannedDates: sortedDates,
    staffDirectory: [...staffSet].sort(),
    airlines: [...airlineSet].sort(),
    slas: [...slaSet].sort(),
    flightsCount: uniqueFlights.size,
    gapsCount: gaps.length,
  };
}

module.exports = {
  initDatabase,
  getDb,
  getAllGapNotes,
  saveGapNote,
  saveAllGapNotes,
  getStaffAvailability,
  saveStaffAvailability,
  getScanHistory,
  saveScanItem,
  saveScanHistory,
  deleteScanItem,
  clearScanHistory,
  getCachedSod,
  setCachedSod,
  clearSodCache,
  getCacheStats,
  getAllAbsences,
  saveAbsence,
  deleteAbsence,
  getAllCustomRules,
  saveCustomRule,
  deleteCustomRule,
  getAllScenarios,
  saveScenario,
  deleteScenario,
  getAllMonthlyRosters,
  getMonthlyRoster,
  saveMonthlyRoster,
  updateMonthlyRosterWithScan,
  deleteMonthlyRoster,
  mergeCustomDateRange,
  CACHE_TTL_MS,
};

