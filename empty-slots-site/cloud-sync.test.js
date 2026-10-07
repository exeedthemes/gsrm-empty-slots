const test = require('node:test');
const assert = require('node:assert/strict');
const { DatabaseSync } = require('node:sqlite');
const { createCloudSync, publicSnapshot } = require('./cloud-sync');
const sample = () => ({ id: 'scan-1', createdAt: '2026-10-07T10:00:00Z', startDate: '2026-10-07', endDate: '2026-10-07', scannedDates: ['2026-10-07'], incompleteDates: [], errors: 0, flights: 1, config: { email: 'avbis@example.com', password: 'never-upload' }, rows: [{ flight: 'XX100', staff: ['AAA - Agent'], missing: 1, password: 'also-private', staff_details: [{ name: 'AAA - Agent', password: 'private-detail' }] }] });
const config = { url: 'https://example.supabase.co', secretKey: 'sb_secret_test' };
test('cloud snapshot excludes AVBIS credentials, config and unknown nested fields', () => {
  const data = publicSnapshot(sample());
  assert.equal(data.config, undefined);
  assert.equal(data.rows[0].password, undefined);
  assert.equal(data.rows[0].staff_details[0].password, undefined);
  assert.equal(JSON.stringify(data).includes('never-upload'), false);
  assert.deepEqual(data.rows[0].staff, ['AAA - Agent']);
});
test('disabled sync does not queue or make network requests', async t => {
  const database = new DatabaseSync(':memory:'); t.after(() => database.close());
  const sync = createCloudSync({ database, fetchImpl: () => assert.fail('unexpected network') });
  assert.equal(sync.enqueue(sample()).queued, false);
  await sync.flush();
  assert.equal(sync.status().pending, 0);
});
test('cancelled, errored and incomplete scans preserve the last online snapshot', t => {
  const database = new DatabaseSync(':memory:'); t.after(() => database.close());
  const sync = createCloudSync({ database, config });
  for (const change of [{ cancelled: true }, { errors: 1 }, { incompleteDates: ['2026-10-07'] }, { scannedDates: [] }]) {
    assert.equal(sync.enqueue({ ...sample(), ...change }).reason, 'incomplete-scan');
  }
  assert.equal(sync.status().pending, 0);
});
test('failed upload survives recreation and retries idempotently without leaking remote errors', async t => {
  const database = new DatabaseSync(':memory:'); t.after(() => database.close());
  const first = createCloudSync({ database, config, fetchImpl: async () => ({ ok: false, status: 503 }) });
  first.enqueue(sample()); first.enqueue(sample());
  await first.flush();
  assert.equal(first.status().pending, 1);
  assert.match(first.status().error, /HTTP 503/);
  let uploaded;
  const restarted = createCloudSync({ database, config, fetchImpl: async (url, request) => {
    assert.match(url, /on_conflict=scan_id/);
    assert.equal(request.redirect, 'error');
    uploaded = JSON.parse(request.body);
    assert.equal(request.headers.apikey, config.secretKey);
    return { ok: true };
  } });
  await restarted.flush();
  assert.equal(restarted.status().pending, 0);
  assert.equal(restarted.status().error, null);
  assert.ok(restarted.status().lastSyncedAt);
  assert.equal(uploaded.scan_id, 'scan-1');
  assert.equal(uploaded.snapshot.config, undefined);
  restarted.enqueue(sample()); await restarted.flush();
  assert.equal(database.prepare('SELECT COUNT(*) AS count FROM cloud_scan_outbox').get().count, 1);
});
test('concurrent flushes upload each item once and older retries retain scan timestamp', async t => {
  const database = new DatabaseSync(':memory:'); t.after(() => database.close());
  let calls = 0;
  const sync = createCloudSync({ database, config, fetchImpl: async (_url, request) => {
    calls++; assert.equal(JSON.parse(request.body).scanned_at, sample().createdAt);
    await new Promise(resolve => setTimeout(resolve, 5)); return { ok: true };
  } });
  sync.enqueue(sample()); await Promise.all([sync.flush(), sync.flush()]);
  assert.equal(calls, 1);
});
test('uploader refuses unencrypted or redirected configuration origins', t => {
  const database = new DatabaseSync(':memory:'); t.after(() => database.close());
  assert.throws(() => createCloudSync({ database, config: { ...config, url: 'http://example.com' } }), /HTTPS/);
  assert.throws(() => createCloudSync({ database, config: { ...config, url: 'https://example.com/path' } }), /origin/);
});
