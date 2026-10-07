'use strict';
const config = window.GSRM_ONLINE_CONFIG || {};
const $ = id => document.getElementById(id);
let session = null;
let scans = [];
let snapshot = null;
let currentRecords = [];
let loadVersion = 0;
const text = (id, value) => { $(id).textContent = value; };
const dateKey = value => {
  const match = /^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/.exec(value || '');
  if (match) {
    const month = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'].indexOf(match[2].toLowerCase()) + 1;
    if (month) return `${match[3]}-${String(month).padStart(2, '0')}-${match[1].padStart(2, '0')}`;
  }
  return String(value || '').slice(0, 10);
};
const dateLabel = value => {
  const key = dateKey(value);
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(key) ? `${key}T00:00:00Z` : value;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? String(value || '') : date.toLocaleDateString('en-GB', { timeZone: 'UTC', day: '2-digit', month: 'short', year: 'numeric' });
};
const timeLabel = value => new Date(value).toLocaleString();

async function api(route, options = {}) {
  if (session && Date.now() >= session.expiresAt - 30000) {
    const result = await request('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: JSON.stringify({ refresh_token: session.refresh_token }) }, false);
    session = { ...result, expiresAt: Date.now() + result.expires_in * 1000 };
  }
  return request(route, options);
}
async function request(route, options = {}, authenticated = true) {
  const response = await fetch(`${config.url}${route}`, {
    ...options, cache: 'no-store', signal: AbortSignal.timeout(20000),
    headers: { apikey: config.publishableKey, 'Content-Type': 'application/json', ...(authenticated && session ? { Authorization: `Bearer ${session.access_token}` } : {}) },
  });
  if (!response.ok) {
    if (response.status === 401 && authenticated) signOut();
    throw new Error(response.status === 400 || response.status === 401 ? 'Sign-in failed or expired. Check your dashboard email and password.' : `Could not load dashboard (HTTP ${response.status}). Please try again.`);
  }
  return response.status === 204 ? null : response.json();
}
function clearRoster() {
  snapshot = null;
  currentRecords = [];
  $('tableBody').replaceChildren();
  $('scanSelect').replaceChildren();
  for (const id of ['flights', 'staffCount', 'missing', 'dates']) text(id, 0);
  text('syncInfo', '');
  text('scopeNote', '');
}
function signOut() {
  const previous = session;
  session = null;
  loadVersion++;
  scans = [];
  clearRoster();
  $('dashboard').hidden = true;
  $('signOut').hidden = true;
  $('loginPanel').hidden = false;
  $('password').value = '';
  text('message', 'Signed out. Sign in to view scan data.');
  if (previous) fetch(`${config.url}/auth/v1/logout`, { method: 'POST', headers: { apikey: config.publishableKey, Authorization: `Bearer ${previous.access_token}` } }).catch(() => {});
}
function options(id, values, first) {
  const select = $(id);
  const previous = select.value;
  select.replaceChildren();
  if (first) select.add(new Option(first, ''));
  for (const value of values) select.add(new Option(value.label || value, value.value || value));
  if ([...select.options].some(option => option.value === previous)) select.value = previous;
}
async function loadScans() {
  const version = ++loadVersion;
  $('refresh').disabled = true;
  text('message', 'Loading saved scans…');
  try {
    const oldSelection = $('scanSelect').value;
    const wasLatest = !oldSelection || oldSelection === scans[0]?.scan_id;
    const result = await api('/rest/v1/scan_snapshots?select=scan_id,scanned_at,uploaded_at&order=scanned_at.desc&limit=50');
    if (version !== loadVersion || !session) return;
    scans = result;
    options('scanSelect', scans.map(scan => ({ label: timeLabel(scan.scanned_at), value: scan.scan_id })));
    if (wasLatest && scans.length) $('scanSelect').value = scans[0].scan_id;
    if (!scans.length) {
      clearRoster();
      text('message', 'No scans have been uploaded yet. Complete a scan in the local app after configuring cloud sync.');
      return;
    }
    await loadSnapshot();
  } catch (error) { text('message', error.message); }
  finally { $('refresh').disabled = false; }
}
async function loadSnapshot() {
  const version = ++loadVersion;
  const id = $('scanSelect').value;
  snapshot = null;
  currentRecords = [];
  $('tableBody').replaceChildren();
  text('message', 'Loading selected scan…');
  try {
    const records = await api(`/rest/v1/scan_snapshots?select=snapshot&scan_id=eq.${encodeURIComponent(id)}&limit=1`);
    if (version !== loadVersion || !session) return;
    if (!records.length) throw new Error('This scan is no longer available. Refresh the scan list.');
    snapshot = records[0].snapshot;
    const scan = scans.find(scan => scan.scan_id === id);
    text('syncInfo', `Scan completed: ${timeLabel(snapshot.createdAt)} · Uploaded: ${timeLabel(scan.uploaded_at)}`);
    const scope = snapshot.scope ? ` ${snapshot.scope.allSlots ? 'All scanned duties' : 'Gap duties only'}${snapshot.scope.startTime ? ` · scan window ${snapshot.scope.startTime}–${snapshot.scope.endTime} UTC` : ''}.` : '';
    text('scopeNote', `Scanned period: ${dateLabel(snapshot.startDate)} – ${dateLabel(snapshot.endDate)}. Latest scan uploaded: ${timeLabel(scans[0].uploaded_at)}.${scope} Only the selected scan’s dates, SLAs and duties are shown.`);
    text('flights', snapshot.flights || 0);
    text('staffCount', snapshot.staffDirectory?.length || 0);
    text('missing', (snapshot.rows || []).reduce((sum, row) => sum + Number(row.missing || 0), 0));
    text('dates', snapshot.scannedDates?.length || 0);
    options('dateFilter', (snapshot.scannedDates || []).map(date => ({ value: dateKey(date), label: dateLabel(date) })).sort((a, b) => a.value.localeCompare(b.value)), 'All scanned dates');
    options('slaFilter', [...new Set((snapshot.rows || []).map(row => row.sla).filter(Boolean))].sort(), 'All SLAs');
    render();
    text('message', `Showing ${id === scans[0].scan_id ? 'the latest' : 'a saved'} completed scan. Refresh to check for new uploads.`);
  } catch (error) { if (version === loadVersion) text('message', error.message); }
}
function render() {
  if (!snapshot) return;
  const search = $('search').value.trim().toLowerCase();
  const rows = (snapshot.rows || []).filter(row =>
    (!$('dateFilter').value || dateKey(row.date) === $('dateFilter').value) &&
    (!$('slaFilter').value || row.sla === $('slaFilter').value) &&
    (!$('gapsOnly').checked || Number(row.missing) > 0) &&
    (!search || [row.flight, row.route, row.sla, row.type, row.aircraft, ...(row.staff || [])].join(' ').toLowerCase().includes(search))
  ).sort((a, b) => dateKey(a.date).localeCompare(dateKey(b.date)) || String(a.start_utc).localeCompare(String(b.start_utc)));
  const staffView = $('view').value === 'staff';
  const headings = staffView ? ['Staff', 'Date', 'Flight', 'SLA', 'Duty', 'Start UTC', 'End UTC', 'Duration'] : ['Date', 'Flight', 'Route', 'Aircraft', 'SLA', 'Duty', 'Start UTC', 'End UTC', 'Required', 'Assigned', 'Missing', 'Staff'];
  currentRecords = staffView ? rows.flatMap(row => (row.staff || []).filter(name => !search || `${name} ${row.flight} ${row.route} ${row.sla} ${row.type} ${row.aircraft}`.toLowerCase().includes(search)).map(name => {
    const detail = (row.staff_details || []).find(staff => staff.name === name) || row;
    return [name, dateLabel(row.date), row.flight, row.sla, row.type, detail.start_utc, detail.release_utc, detail.duration];
  })).sort((a, b) => a[0].localeCompare(b[0])) : rows.map(row => [dateLabel(row.date), row.flight, row.route, row.aircraft, row.sla, row.type, row.start_utc, row.release_utc, row.required, row.assigned, row.missing, (row.staff || []).join(', ')]);
  const headingRow = document.createElement('tr');
  for (const label of headings) { const th = document.createElement('th'); th.scope = 'col'; th.textContent = label; headingRow.append(th); }
  $('tableHead').replaceChildren(headingRow);
  const fragment = document.createDocumentFragment();
  for (const values of currentRecords) {
    const tr = document.createElement('tr');
    values.forEach((value, index) => {
      const td = document.createElement('td'); td.textContent = value ?? '';
      if (!staffView && index === 10 && Number(value) > 0) td.className = 'gap';
      if ((!staffView && index === 11) || (staffView && index === 0)) td.className = 'staff';
      tr.append(td);
    });
    fragment.append(tr);
  }
  $('tableBody').replaceChildren(fragment);
  $('empty').hidden = currentRecords.length > 0;
}
$('loginForm').addEventListener('submit', async event => {
  event.preventDefault();
  $('loginButton').disabled = true;
  try {
    const result = await request('/auth/v1/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email: $('email').value.trim(), password: $('password').value }) }, false);
    session = { ...result, expiresAt: Date.now() + result.expires_in * 1000 };
    $('password').value = '';
    const membership = await api('/rest/v1/dashboard_viewers?select=user_id&limit=1');
    if (!membership.length) { signOut(); throw new Error('Your account has not been approved to view this dashboard. Contact the dashboard owner.'); }
    $('loginPanel').hidden = true;
    $('dashboard').hidden = false;
    $('signOut').hidden = false;
    await loadScans();
  } catch (error) { if (session) signOut(); text('message', error.message); }
  finally { $('loginButton').disabled = false; }
});
$('signOut').addEventListener('click', signOut);
$('refresh').addEventListener('click', loadScans);
$('scanSelect').addEventListener('change', loadSnapshot);
for (const id of ['view', 'dateFilter', 'slaFilter', 'gapsOnly']) $(id).addEventListener('change', render);
$('search').addEventListener('input', render);
$('export').addEventListener('click', () => {
  if (!snapshot) return;
  const escapeCell = value => {
    let cell = String(value ?? '');
    if (/^[\s]*[=+@-]/.test(cell)) cell = `'${cell}`;
    return `"${cell.replace(/"/g, '""')}"`;
  };
  const headings = [...$('tableHead').querySelectorAll('th')].map(th => th.textContent);
  const csv = [headings, ...currentRecords].map(row => row.map(escapeCell).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = `gsrm-${$('view').value}-${dateKey(snapshot.startDate)}.csv`; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
try {
  const url = new URL(config.url);
  if (url.protocol !== 'https:' || !url.hostname.endsWith('.supabase.co') || url.pathname !== '/' || !config.publishableKey || config.publishableKey.startsWith('sb_secret_')) throw new Error('Invalid configuration');
  // Legacy service-role JWTs must never be used in a public website.
  if (config.publishableKey.startsWith('eyJ') && JSON.parse(atob(config.publishableKey.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).role !== 'anon') throw new Error('Invalid key');
  config.url = url.origin;
  $('loginPanel').hidden = false;
  text('message', 'Sign in to view completed scans.');
} catch {
  text('message', 'The online dashboard is ready. Its owner still needs to connect the database before sign-in and scan viewing are available.');
}
