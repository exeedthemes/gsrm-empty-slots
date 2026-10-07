async function refreshCloudStatus() {
  const element = document.getElementById('cloudStatus');
  try {
    const response = await fetch('/api/cloud-sync', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not load sync status. Check cloud-sync.config.json.');
    const status = await response.json();
    element.textContent = !status.enabled ? 'Cloud sync is not configured yet. Follow ONLINE-DASHBOARD.md to connect Supabase.' : `${status.pending} scan(s) awaiting upload. ${status.lastSyncedAt ? `Last successful sync: ${new Date(status.lastSyncedAt).toLocaleString()}.` : 'No successful uploads yet.'}${status.error ? ` ${status.error}` : ''}`;
  } catch (error) { element.textContent = error.message; }
}
refreshCloudStatus();
setInterval(refreshCloudStatus, 5000);
