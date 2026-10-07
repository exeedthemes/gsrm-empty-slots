const fs = require('node:fs');
const path = require('node:path');

// Only these source fields may leave the scanner. Never upload its config or credentials.
const ROW_FIELDS = ['date', 'flight_id', 'flight', 'route', 'aircraft', 'direction', 'scheduled_utc', 'sla', 'type', 'movement', 'required', 'assigned', 'missing', 'start_utc', 'release_utc', 'duration', 'staff', 'staff_details', 'has_shorter_assignment', 'shorter_staff_count'];
const STAFF_FIELDS = ['name', 'start_utc', 'release_utc', 'duration', 'duration_minutes', 'is_shorter', 'custom_timing'];
const pick = (value, fields) => Object.fromEntries(fields.filter(key => value[key] !== undefined).map(key => [key, value[key]]));

function publicSnapshot(snapshot) {
  const time = value => typeof value === 'string' ? value : value ? `${String(value.hour).padStart(2, '0')}:${String(value.minute).padStart(2, '0')}` : undefined;
  const date = value => value instanceof Date ? value.toISOString().slice(0, 10) : String(value || '').slice(0, 10);
  return {
    id: snapshot.id, createdAt: snapshot.createdAt,
    startDate: date(snapshot.startDate), endDate: date(snapshot.endDate),
    scannedDates: snapshot.scannedDates || [], flights: snapshot.flights || 0,
    scope: { allSlots: Boolean(snapshot.config?.allSlots), startTime: time(snapshot.config?.startTime), endTime: time(snapshot.config?.endTime) },
    staffDirectory: snapshot.staffDirectory || [], airlines: snapshot.airlines || [], slas: snapshot.slas || [],
    rows: (snapshot.rows || []).map(row => ({ ...pick(row, ROW_FIELDS), staff_details: (row.staff_details || []).map(staff => pick(staff, STAFF_FIELDS)) })),
  };
}

function readConfig() {
  const filename = path.join(__dirname, '..', 'cloud-sync.config.json');
  const file = fs.existsSync(filename) ? JSON.parse(fs.readFileSync(filename, 'utf8')) : {};
  return {
    url: process.env.GSRM_SUPABASE_URL || file.url || '',
    secretKey: process.env.GSRM_SUPABASE_SECRET_KEY || file.secretKey || '',
  };
}

function createCloudSync({ database, config = {}, fetchImpl = fetch }) {
  database.exec(`CREATE TABLE IF NOT EXISTS cloud_scan_outbox (
    scan_id TEXT PRIMARY KEY, created_at TEXT NOT NULL, payload TEXT NOT NULL,
    uploaded_at TEXT, attempts INTEGER NOT NULL DEFAULT 0, last_error TEXT
  )`);
  const enabled = Boolean(config.url && config.secretKey);
  if (enabled) {
    const url = new URL(config.url);
    if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
      throw new Error('Cloud sync requires an HTTPS Supabase project origin.');
    }
    config = { ...config, url: url.origin };
  }
  let busy = false;
  function status() {
    const pending = database.prepare('SELECT COUNT(*) AS count FROM cloud_scan_outbox WHERE uploaded_at IS NULL').get().count;
    const last = database.prepare('SELECT uploaded_at FROM cloud_scan_outbox WHERE uploaded_at IS NOT NULL ORDER BY uploaded_at DESC LIMIT 1').get();
    const failure = database.prepare('SELECT last_error FROM cloud_scan_outbox WHERE uploaded_at IS NULL AND last_error IS NOT NULL ORDER BY created_at DESC LIMIT 1').get();
    return { enabled, pending, uploading: busy, lastSyncedAt: last?.uploaded_at || null, error: failure?.last_error || null };
  }
  function enqueue(snapshot) {
    if (!enabled) return { queued: false, reason: 'not-configured' };
    if (snapshot.cancelled || snapshot.errors || snapshot.incompleteDates?.length || !snapshot.scannedDates?.length) {
      return { queued: false, reason: 'incomplete-scan' };
    }
    const payload = publicSnapshot(snapshot);
    database.prepare('INSERT OR IGNORE INTO cloud_scan_outbox (scan_id, created_at, payload) VALUES (?, ?, ?)')
      .run(snapshot.id, snapshot.createdAt, JSON.stringify(payload));
    return { queued: true };
  }
  async function flush() {
    if (!enabled || busy) return;
    busy = true;
    try {
      // Bounded batches keep the event loop responsive and preserve retries across restarts.
      const items = database.prepare('SELECT * FROM cloud_scan_outbox WHERE uploaded_at IS NULL ORDER BY created_at LIMIT 10').all();
      for (const item of items) {
        try {
          const response = await fetchImpl(`${config.url}/rest/v1/scan_snapshots?on_conflict=scan_id`, {
            method: 'POST', redirect: 'error', signal: AbortSignal.timeout(20000),
            headers: { apikey: config.secretKey, ...(config.secretKey.startsWith('eyJ') ? { Authorization: `Bearer ${config.secretKey}` } : {}), 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates,return=minimal' },
            body: JSON.stringify({ scan_id: item.scan_id, scanned_at: item.created_at, snapshot: JSON.parse(item.payload) }),
          });
          if (!response.ok) throw new Error(`Upload returned HTTP ${response.status}. Check database setup and uploader key.`);
          database.prepare('UPDATE cloud_scan_outbox SET uploaded_at = ?, payload = ?, last_error = NULL WHERE scan_id = ?')
            .run(new Date().toISOString(), '{}', item.scan_id);
        } catch (error) {
          // Remote response bodies can contain sensitive details; store a generic failure instead.
          const message = /^Upload returned HTTP \d+\./.test(error.message) ? error.message : 'Upload could not reach the database. It will retry automatically.';
          database.prepare('UPDATE cloud_scan_outbox SET attempts = attempts + 1, last_error = ? WHERE scan_id = ?').run(message, item.scan_id);
          break;
        }
      }
    } finally { busy = false; }
  }
  return { enqueue, flush, status };
}

module.exports = { createCloudSync, publicSnapshot, readConfig };
