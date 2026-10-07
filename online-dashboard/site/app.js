'use strict';
const config = window.GSRM_ONLINE_CONFIG || {};
const $ = id => document.getElementById(id);
let session = null;
let scans = [];
let snapshot = null;
let currentRecords = [];
let loadVersion = 0;
let workspace = 'roster';
const workspaceLabels = {
  gaps: ['Empty Slots', 'Review uncovered duties in the selected scan.'],
  roster: ['Duty Roster', 'Browse flight duties and staff assignments.'],
  insights: ['Coverage Insights', 'Coverage and uncovered staff-hours across the selected scan.'],
  history: ['Scan History', 'Open previously uploaded source scans.'],
};
const text = (id, value) => { $(id).textContent = value; };
function setAccess(connected) {
  for (const button of document.querySelectorAll('[data-workspace]')) button.disabled = !connected;
  $('refresh').disabled = !connected;
  document.querySelector('.connection-state').classList.toggle('connected', connected);
  text('connectionLabel', connected ? 'Connected to uploaded scans' : 'Online dashboard · awaiting sign-in');
}
function setWorkspace(value) {
  workspace = value;
  for (const button of document.querySelectorAll('[data-workspace]')) {
    const active = button.dataset.workspace === value;
    button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  }
  const [title, hint] = workspaceLabels[value];
  text('contextTitle', title); text('contextHint', hint);
  $('dutiesPanel').hidden = !['gaps', 'roster'].includes(value);
  $('filterPanel').hidden = value === 'history';
  $('insightsPanel').hidden = value !== 'insights';
  $('historyPanel').hidden = value !== 'history';
  $('export').hidden = value === 'history';
  $('view').disabled = value !== 'roster';
  if (value === 'gaps') { $('gapsOnly').checked = true; $('view').value = 'duties'; }
  if (value === 'roster' || value === 'insights') $('gapsOnly').checked = false;
  $('gapsOnly').disabled = value === 'gaps';
  render();
  renderHistory();
}
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
  for (const id of ['dateInsights', 'slaInsights', 'historyList']) $(id).replaceChildren();
  text('historyCount', '0 saved scans');
  $('search').value = '';
  options('dateFilter', [], 'All scanned dates'); options('slaFilter', [], 'All SLAs');
  document.querySelector('.scan-plan-status').classList.remove('loaded');
  text('sourceStatus', 'No scan loaded'); text('sourceDetail', 'Scans run in your local GSRM app.');
  text('onlineStatus', 'Awaiting uploaded scan'); text('onlineDetail', 'Sign in to view the saved roster.');
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
  setAccess(false);
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
  finally { $('refresh').disabled = !session; }
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
    document.querySelector('.scan-plan-status').classList.add('loaded');
    text('sourceStatus', `Scan completed ${timeLabel(snapshot.createdAt)}`);
    text('sourceDetail', `${dateLabel(snapshot.startDate)} – ${dateLabel(snapshot.endDate)} · ${snapshot.scannedDates?.length || 0} scanned dates`);
    text('onlineStatus', id === scans[0].scan_id ? 'Latest uploaded scan' : 'Saved source scan');
    text('onlineDetail', `Uploaded ${timeLabel(scan.uploaded_at)} · planning stays local`);
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
    renderHistory();
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
  renderInsights(rows);
  text('tableTitle', workspace === 'gaps' ? 'Uncovered flight duties' : staffView ? 'Staff roster' : 'Flight schedule');
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
  text('resultCount', `${currentRecords.length} ${staffView ? 'assignments' : 'duties'}`);
}
function uncoveredHours(row) {
  const minutes = value => {
    const match = /^(\d+):(\d{2})$/.exec(String(value || ''));
    return match ? Number(match[1]) * 60 + Number(match[2]) : null;
  };
  let duration = minutes(row.duration);
  if (duration === null) {
    const start = minutes(row.start_utc), end = minutes(row.release_utc);
    duration = start === null || end === null ? 0 : (end - start + 1440) % 1440;
  }
  return duration / 60 * Number(row.missing || 0);
}
function renderInsights(rows) {
  const dates = new Map(), slas = new Map();
  for (const row of rows) {
    for (const [groups, key] of [[dates, dateKey(row.date)], [slas, row.sla || 'Unspecified']]) {
      const summary = groups.get(key) || { required: 0, assigned: 0, missing: 0, hours: 0 };
      summary.required += Number(row.required || 0); summary.assigned += Number(row.assigned || 0);
      summary.missing += Number(row.missing || 0); summary.hours += uncoveredHours(row);
      groups.set(key, summary);
    }
  }
  $('dateInsights').replaceChildren(); $('slaInsights').replaceChildren();
  for (const [date, summary] of [...dates].sort(([a], [b]) => a.localeCompare(b))) {
    const tr = document.createElement('tr');
    for (const value of [dateLabel(date), summary.required, summary.assigned, summary.missing, summary.hours.toFixed(1)]) {
      const td = document.createElement('td'); td.textContent = value; tr.append(td);
    }
    $('dateInsights').append(tr);
  }
  for (const [sla, summary] of [...slas].sort(([a], [b]) => a.localeCompare(b))) {
    const section = document.createElement('div'); section.className = 'sla-summary';
    const header = document.createElement('div'); header.className = 'sla-summary-header';
    const name = document.createElement('strong'); name.textContent = sla;
    const label = document.createElement('span');
    const coverage = summary.required ? Math.max(0, 100 * (summary.required - summary.missing) / summary.required) : 100;
    label.textContent = `${Math.round(coverage)}% covered · ${summary.missing} missing`;
    header.append(name, label);
    const meter = document.createElement('meter'); meter.min = 0; meter.max = 100; meter.value = coverage; meter.setAttribute('aria-label', `${sla} coverage`);
    section.append(header, meter); $('slaInsights').append(section);
  }
  if (!rows.length) { const empty = document.createElement('p'); empty.textContent = 'No duties match these filters.'; $('slaInsights').append(empty); }
}
function renderHistory() {
  $('historyList').replaceChildren(); text('historyCount', `${scans.length} saved scans`);
  for (const [index, scan] of scans.entries()) {
    const card = document.createElement('div'); card.className = 'history-card';
    const summary = document.createElement('div');
    const title = document.createElement('strong'); title.textContent = timeLabel(scan.scanned_at);
    if (index === 0) { const badge = document.createElement('span'); badge.className = 'count-badge'; badge.textContent = 'Latest'; title.append(badge); }
    const detail = document.createElement('p'); detail.textContent = `Uploaded ${timeLabel(scan.uploaded_at)}`;
    summary.append(title, detail);
    const actions = document.createElement('div'); actions.className = 'history-actions';
    if (scan.scan_id === $('scanSelect').value) { const badge = document.createElement('span'); badge.className = 'count-badge'; badge.textContent = 'Loaded'; actions.append(badge); }
    const open = document.createElement('button'); open.className = 'secondary-btn'; open.textContent = 'Open roster';
    open.addEventListener('click', () => { $('scanSelect').value = scan.scan_id; setWorkspace('roster'); loadSnapshot(); });
    actions.append(open); card.append(summary, actions); $('historyList').append(card);
  }
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
    setAccess(true);
    await loadScans();
  } catch (error) { if (session) signOut(); text('message', error.message); }
  finally { $('loginButton').disabled = false; }
});
$('signOut').addEventListener('click', signOut);
$('refresh').addEventListener('click', loadScans);
$('scanSelect').addEventListener('change', loadSnapshot);
for (const button of document.querySelectorAll('[data-workspace]')) button.addEventListener('click', () => setWorkspace(button.dataset.workspace));
$('resetFilters').addEventListener('click', () => {
  $('dateFilter').value = ''; $('slaFilter').value = ''; $('search').value = ''; $('gapsOnly').checked = workspace === 'gaps'; render();
});
for (const id of ['view', 'dateFilter', 'slaFilter', 'gapsOnly']) $(id).addEventListener('change', render);
$('search').addEventListener('input', render);
$('export').addEventListener('click', () => {
  if (!snapshot) return;
  const escapeCell = value => {
    let cell = String(value ?? '');
    if (/^[\s]*[=+@-]/.test(cell)) cell = `'${cell}`;
    return `"${cell.replace(/"/g, '""')}"`;
  };
  const headings = workspace === 'insights' ? ['Date', 'Required', 'Assigned', 'Missing', 'Uncovered hours'] : [...$('tableHead').querySelectorAll('th')].map(th => th.textContent);
  const records = workspace === 'insights' ? [...$('dateInsights').querySelectorAll('tr')].map(tr => [...tr.children].map(td => td.textContent)) : currentRecords;
  const csv = [headings, ...records].map(row => row.map(escapeCell).join(',')).join('\r\n');
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
  $('setupPanel').hidden = false;
  text('connectionLabel', 'Online dashboard · database setup pending');
  text('message', 'The online dashboard is ready. Its owner still needs to connect the database before sign-in and scan viewing are available.');
}
