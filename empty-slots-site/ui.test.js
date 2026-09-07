const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

// Serve the real UI against isolated API responses; never touch AVBIS or saved data.
test('desktop workflows and compact dialogs', async (t) => {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname.startsWith('/api/')) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ connected: false, history: [], months: [], rules: [], found: false }));
      return;
    }
    try {
      const name = url.pathname === '/' ? 'index.html' : path.basename(url.pathname);
      res.setHeader('Content-Type', name.endsWith('.css') ? 'text/css' : name.endsWith('.js') ? 'text/javascript' : 'text/html');
      res.end(await fs.readFile(path.join(__dirname, 'public', name)));
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  t.after(async () => { await browser.close(); await new Promise(resolve => server.close(resolve)); });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${server.address().port}`);

  await t.test('Scan reveals invalid setup without sending credentials', async () => {
    await page.click('#runBtn');
    assert.equal(await page.locator('#scanForm').isVisible(), true);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'email');
  });

  await t.test('monthly dialog traps focus and Escape returns to its opener', async () => {
    await page.click('#monthlyRostersHeaderBtn');
    await page.waitForFunction(() => monthlyRosterModal.contains(document.activeElement));
    await page.focus('#monthlyRosterModalDone');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'monthlyRosterModalClose');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'monthlyRosterModalDone');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#monthlyRosterModal').isVisible(), false);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'monthlyRostersHeaderBtn');
  });

  await t.test('merge modes disable inactive inputs and reject reversed ranges', async () => {
    await page.click('#monthlyRostersHeaderBtn');
    await page.click('#monthlyModalTabMerge');
    assert.equal(await page.locator('#mergeRangeStartDate').isDisabled(), true);
    assert.equal(await page.locator('#executeMergeBtn').isDisabled(), true);
    await page.check('#mergeModeRange');
    await page.fill('#mergeRangeStartDate', '2026-09-10');
    await page.fill('#mergeRangeEndDate', '2026-09-01');
    assert.equal(await page.locator('#executeMergeBtn').isDisabled(), true);
    await page.fill('#mergeRangeEndDate', '2026-09-12');
    assert.equal(await page.locator('#executeMergeBtn').isDisabled(), false);
    await page.screenshot({ path: '/tmp/gsrm-merge.png' });
    await page.keyboard.press('Escape');
  });

  await t.test('automatic settings preserve midnight and reject invalid intervals', async () => {
    await page.click('#autoScanSettingsBtn');
    await page.check('#autoScanActiveHoursToggle');
    await page.fill('#autoScanStartHour', '0');
    assert.equal(await page.evaluate(() => readAutoScanModalFields().startHour), 0);
    await page.selectOption('#autoScanIntervalSelect', 'custom');
    await page.fill('#autoScanCustomMinutes', '0');
    await page.click('#autoScanModalSaveBtn');
    assert.equal(await page.locator('#autoScanModal').isVisible(), true);
    await page.keyboard.press('Escape');
  });

  await t.test('unassigned panel leaves roster controls reachable', async () => {
    await page.evaluate(() => { switchTab('roster'); openUnassignedShiftsModal(); });
    await page.locator('#rosterUnassignedShiftsBtn').scrollIntoViewIfNeeded();
    await page.locator('.unassigned-shifts-card').waitFor({ state: 'visible' });
    const panel = await page.locator('.unassigned-shifts-card').boundingBox();
    assert.ok(panel.width <= 331);
    assert.ok(panel.x >= 1000);
    assert.equal(await page.locator('.unassigned-shifts-card').getAttribute('aria-modal'), null);
    const reachable = await page.locator('#rosterUnassignedShiftsBtn').evaluate(el => {
      const r = el.getBoundingClientRect();
      return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
    });
    await page.screenshot({ path: '/tmp/gsrm-unassigned.png' });
    await page.click('#unassignedShiftsCloseBtn');
    assert.equal(reachable, true);
  });

  await t.test('auto-scan settings and actions fit a laptop-height screen', async () => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.click('#autoScanSettingsBtn');
    const box = await page.locator('.auto-scan-modal-card').boundingBox();
    assert.ok(box.y >= 24 && box.y + box.height <= 744);
    assert.ok(box.height < 620);
    assert.equal(await page.locator('#autoScanModalSaveBtn').isVisible(), true);
    await page.keyboard.press('Escape');
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  await t.test('a failed cancellation can be retried', async () => {
    await page.route('**/api/cancel', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"Unavailable"}' }));
    await page.evaluate(async () => {
      activeScanId = 'test-cancellation';
      await cancelActiveScan();
    });
    assert.equal(await page.locator('#cancelScanBtn').isDisabled(), false);
    assert.equal(await page.locator('#cancelScanBtn').textContent(), 'Cancel scan');
    await page.evaluate(() => { activeScanId = ''; });
  });

  await t.test('invalid date range stops before network activity', async () => {
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'test-only');
    await page.fill('#startDate', '2026-09-10');
    await page.fill('#endDate', '2026-09-01');
    await page.click('#runBtn');
    assert.match(await page.locator('#message').textContent(), /end date on or after/);
    assert.equal(await page.evaluate(() => activeScanId), '');
  });

  await t.test('failed scans preserve the dataset, local edits, and filters', async () => {
    await page.route('**/api/extract', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"Service unavailable"}' }));
    await page.fill('#endDate', '2026-09-11');
    await page.evaluate(() => {
      latestRows = [{ date: '10-Sep-2026', flight: 'LH123', sla: 'CKIN', required: 1, assigned: 1, missing: 0, staff: [], start_utc: '08:00', release_utc: '10:00' }];
      originalRows = [{ ...latestRows[0], assigned: 0, missing: 1 }];
      latestScannedDates = ['2026-09-10'];
      scanSourceMeta = { state: 'loaded', detail: 'Previous scan' };
      resultsSearch.value = 'LH123';
      resultsLocalTimeToggle.checked = true;
      flightCount.textContent = '1';
      dateCount.textContent = '1';
    });
    await page.click('#runBtn');
    await page.waitForFunction(() => !activeScanId && message.textContent.includes('preserved'));
    const state = await page.evaluate(() => ({ assigned: latestRows[0]?.assigned, original: originalRows[0]?.assigned, dates: latestScannedDates, search: resultsSearch.value, local: resultsLocalTimeToggle.checked, flights: flightCount.textContent }));
    assert.deepEqual(state, { assigned: 1, original: 0, dates: ['2026-09-10'], search: 'LH123', local: true, flights: '1' });
  });

  await t.test('older Undo buttons cannot undo a newer operation', async () => {
    await page.evaluate(() => {
      window.undoCalls = [];
      pushUndoAction('First test change', () => window.undoCalls.push('first'));
      pushUndoAction('Second test change', () => window.undoCalls.push('second'));
    });
    await page.locator('.toast-card').filter({ hasText: 'First test change' }).locator('.toast-action-btn').click();
    assert.deepEqual(await page.evaluate(() => window.undoCalls), []);
    await page.locator('.toast-card').filter({ hasText: 'Second test change' }).locator('.toast-action-btn').click();
    assert.deepEqual(await page.evaluate(() => window.undoCalls), ['second']);
    await page.locator('.toast-card').filter({ hasText: 'First test change' }).locator('.toast-action-btn').click();
    assert.deepEqual(await page.evaluate(() => window.undoCalls), ['second', 'first']);
  });

  await t.test('saved scans comparison details are collapsed by default and can be toggled', async () => {
    await page.evaluate(() => {
      const snap1 = { id: 's1', createdAt: new Date().toISOString(), startDate: '2026-09-01', endDate: '2026-09-02', gaps: [], flights: 2, staffCount: 2, rows: [] };
      const snap2 = { id: 's2', createdAt: new Date().toISOString(), startDate: '2026-09-01', endDate: '2026-09-02', gaps: [], flights: 2, staffCount: 2, rows: [] };
      localStorage.setItem('gsrmScanHistoryV1', JSON.stringify([snap1, snap2]));
      switchTab('history');
    });
    const toggleBtn = page.locator('#historyComparisonToggle');
    await toggleBtn.waitFor({ state: 'visible' });
    assert.equal(await toggleBtn.textContent(), 'Show details');
    assert.equal(await toggleBtn.getAttribute('aria-expanded'), 'false');
    assert.equal(await page.locator('#historyComparisonBody').isVisible(), false);

    await toggleBtn.click();
    assert.equal(await toggleBtn.textContent(), 'Collapse details');
    assert.equal(await toggleBtn.getAttribute('aria-expanded'), 'true');
    assert.equal(await page.locator('#historyComparisonBody').isVisible(), true);

    await toggleBtn.click();
    assert.equal(await toggleBtn.textContent(), 'Show details');
    assert.equal(await toggleBtn.getAttribute('aria-expanded'), 'false');
    assert.equal(await page.locator('#historyComparisonBody').isVisible(), false);
  });

  await t.test('PDF export modal Included details options toggle cleanly without errors', async () => {
    await page.evaluate(() => openPdfExportModal('gaps'));
    assert.equal(await page.locator('#pdfExportModal').isVisible(), true);
    
    // Verify all 6 Included details checkboxes exist
    for (const id of ['pdfColStaffName', 'pdfColRoute', 'pdfColAircraft', 'pdfColNotes', 'pdfColSpan', 'pdfColHolidays']) {
      const checkbox = page.locator(`#${id}`);
      assert.equal(await checkbox.count(), 1, `Checkbox #${id} must exist`);
      assert.equal(await checkbox.isChecked(), true, `Checkbox #${id} default checked`);
      await checkbox.uncheck();
      assert.equal(await checkbox.isChecked(), false, `Checkbox #${id} unchecked`);
      await checkbox.check();
      assert.equal(await checkbox.isChecked(), true, `Checkbox #${id} rechecked`);
    }
    
    await page.click('#pdfExportModalClose');
    assert.equal(await page.locator('#pdfExportModal').isVisible(), false);
  });

  assert.deepEqual(errors, []);
});

