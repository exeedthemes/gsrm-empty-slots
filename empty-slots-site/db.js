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
  `);

  return db;
}

const DEFAULT_DB_PATH = process.env.GSRM_DB_PATH || path.join(process.cwd(), "data", "app.db");
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
  const stmt = db.prepare("SELECT data_json FROM scan_history ORDER BY scanned_at DESC LIMIT 15");
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
  CACHE_TTL_MS,
};
