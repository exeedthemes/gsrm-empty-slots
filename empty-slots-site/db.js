const path = require("path");
const fs = require("fs");
const { DatabaseSync } = require("node:sqlite");

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
  return stmt.all() || [];
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
    absenceObj.category || "vacation",
    absenceObj.start_date || "",
    absenceObj.end_date || absenceObj.start_date || "",
    absenceObj.start_time || "00:00",
    absenceObj.end_time || "23:59",
    absenceObj.notes || "",
    absenceObj.created_at || Date.now()
  );
  return { id, ...absenceObj };
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
    ruleObj.name || "Custom Rule",
    ruleObj.target || "GLOBAL",
    paramsJson,
    ruleObj.enabled === false ? 0 : 1,
    ruleObj.created_at || Date.now()
  );
  return { id, ...ruleObj };
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
    scenarioObj.name || "Alternative Plan",
    scenarioObj.strategy || "min_overtime",
    JSON.stringify(scenarioObj.options || {}),
    JSON.stringify(scenarioObj.assignments || []),
    JSON.stringify(scenarioObj.metrics || {}),
    scenarioObj.created_at || Date.now()
  );
  return { id, ...scenarioObj };
}

function deleteScenario(id, customDb) {
  const db = customDb || getDb();
  const stmt = db.prepare("DELETE FROM scenarios WHERE id = ?");
  stmt.run(id);
  return { success: true, id };
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
  CACHE_TTL_MS,
};
