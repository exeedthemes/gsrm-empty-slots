const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

test('online viewer gates access, filters scans, safely displays names and clears data on sign-out', async t => {
  const server = http.createServer(async (req, res) => {
    try {
      const name = req.url === '/' ? 'index.html' : path.basename(req.url);
      res.setHeader('Content-Type', name.endsWith('.js') ? 'application/javascript' : name.endsWith('.css') ? 'text/css' : 'text/html');
      res.end(await fs.readFile(path.join(__dirname, 'site', name)));
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  t.after(async () => { await browser.close(); await new Promise(resolve => server.close(resolve)); });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.route('**/config.js', route => route.fulfill({ contentType: 'application/javascript', body: 'window.GSRM_ONLINE_CONFIG={url:"https://test.supabase.co",publishableKey:"sb_publishable_test"};' }));
  let approved = false;
  let databaseReads = 0;
  const uploaded = '2026-10-07T10:01:00Z';
  const snapshot = { id: 'scan-1', createdAt: uploaded, startDate: '2026-10-07', endDate: '2026-10-07', flights: 2, scannedDates: ['2026-10-07'], staffDirectory: ['AAA - Alice', '<img src=x onerror=alert(1)>'], rows: [
    { date: '07-Oct-2026', flight: 'XX100', sla: 'GATE', type: 'Agent', start_utc: '08:00', release_utc: '10:00', required: 2, assigned: 1, missing: 1, staff: ['AAA - Alice'] },
    { date: '07-Oct-2026', flight: 'XX200', sla: 'CKIN', type: 'Agent', start_utc: '10:00', release_utc: '12:00', required: 1, assigned: 1, missing: 0, staff: ['<img src=x onerror=alert(1)>'] },
  ] };
  await page.route('https://test.supabase.co/**', async route => {
    const url = route.request().url();
    let data;
    if (url.includes('/auth/v1/token')) data = { access_token: 'test-token', refresh_token: 'refresh', expires_in: 3600 };
    else if (url.includes('/auth/v1/logout')) { await route.fulfill({ status: 204 }); return; }
    else {
      assert.equal(route.request().headers().authorization, 'Bearer test-token');
      if (url.includes('dashboard_viewers')) data = approved ? [{ user_id: 'test' }] : [];
      else {
        databaseReads++;
        data = url.includes('select=snapshot') ? [{ snapshot }] : [{ scan_id: 'scan-1', scanned_at: uploaded, uploaded_at: uploaded }];
      }
    }
    await route.fulfill({ contentType: 'application/json', body: JSON.stringify(data) });
  });
  const origin = `http://127.0.0.1:${server.address().port}`;
  await page.goto(origin);
  assert.equal(await page.locator('#dashboard').isVisible(), false);
  assert.equal(databaseReads, 0);
  async function login() { await page.fill('#email', 'viewer@example.com'); await page.fill('#password', 'example'); await page.click('#loginButton'); }
  await login();
  await page.waitForFunction(() => document.getElementById('message').textContent.includes('not been approved'));
  assert.equal(databaseReads, 0);
  approved = true; await login();
  await page.waitForFunction(() => document.querySelectorAll('#tableBody tr').length === 2);
  assert.equal(await page.locator('#missing').textContent(), '1');
  assert.equal(await page.locator('#tableBody tr').first().locator('td').first().textContent(), '07 Oct 2026');
  await page.selectOption('#dateFilter', '2026-10-07');
  assert.equal(await page.locator('#tableBody tr').count(), 2);
  assert.equal(await page.locator('#tableBody img').count(), 0);
  await page.check('#gapsOnly'); assert.equal(await page.locator('#tableBody tr').count(), 1);
  await page.uncheck('#gapsOnly'); await page.selectOption('#slaFilter', 'CKIN'); assert.equal(await page.locator('#tableBody tr').count(), 1);
  await page.selectOption('#slaFilter', ''); await page.selectOption('#view', 'staff'); await page.fill('#search', 'Alice');
  assert.equal(await page.locator('#tableBody tr').count(), 1);
  await page.fill('#search', ''); await page.selectOption('#view', 'duties');
  const downloadPromise = page.waitForEvent('download'); await page.click('#export');
  const download = await downloadPromise; assert.match(download.suggestedFilename(), /gsrm-duties/);
  await page.screenshot({ path: '/tmp/gsrm-online-dashboard-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: '/tmp/gsrm-online-dashboard-mobile.png', fullPage: true });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile page must not overflow');
  await page.click('#signOut');
  assert.equal(await page.locator('#tableBody tr').count(), 0);
  assert.equal(await page.locator('#dashboard').isVisible(), false);
  assert.equal(await page.evaluate(() => localStorage.length), 0);
  assert.deepEqual(errors, []);
  await page.unroute('**/config.js'); await page.goto(origin);
  assert.match(await page.locator('#message').textContent(), /needs to connect the database/);
  assert.equal(await page.locator('#loginPanel').isVisible(), false);
});
