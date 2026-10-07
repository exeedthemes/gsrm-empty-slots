# Online dashboard setup

The local app scans AVBIS. Every fully completed scan is queued in the local SQLite database and uploaded to Supabase. GitHub Pages hosts an online Coverage workspace with the local dashboard's styling and Empty Slots, Roster, Insights and History views. It supports flight duties, staff assignments, coverage by date and SLA, uncovered staff-hours and CSV exports. The online viewer keeps working when the scanning computer is off; new scans and upload retries require the local app to be running.

The public website contains code only. Scan data stays in Supabase behind sign-in and an approved-viewer list. AVBIS credentials, scanner configuration, local planning edits, absence rules and notes are not uploaded. This first version displays individual source scans, not a merged monthly plan. Scan history lists the newest 50 scans. A scan limited to gaps or selected SLAs will show only that scope online. Scan all slots and required SLAs for a full roster.

## 1. Create the database

1. Create a project at https://supabase.com/dashboard. Choose an appropriate region, for example Europe.
2. Open **SQL Editor**, paste `online-dashboard/schema.sql`, and run it.
3. In **Authentication → Users**, create your dashboard account with an email and password. This account is separate from AVBIS.
4. Copy its user UUID and run this in SQL Editor, replacing the example:

   ```sql
   insert into public.dashboard_viewers (user_id)
   values ('YOUR-USER-UUID') on conflict do nothing;
   ```

5. Disable public sign-ups in the project's authentication settings. Add and authorize other viewers the same way. Accounts not listed in `dashboard_viewers` cannot read scans. Remove a user's row to revoke database access.
6. In the project's API settings, locate the **project URL**, **publishable key**, and **secret key**. Legacy anon and service-role keys also work in their corresponding public and local roles. Keep the secret/service-role key only on the scanning computer.

## 2. Connect the local scanner

Copy `cloud-sync.config.example.json` to `cloud-sync.config.json` in this project's root. Fill it in locally:

```json
{
  "url": "https://YOUR-PROJECT.supabase.co",
  "secretKey": "YOUR-SUPABASE-SECRET-KEY"
}
```

This file is excluded from Git. Never put the secret key in website files or GitHub Actions variables. The key is an administrative credential: keep it private and rotate it if exposed. Alternatively set `GSRM_SUPABASE_URL` and `GSRM_SUPABASE_SECRET_KEY` as local environment variables. Restart the app after configuration changes; the normal launcher still works.

Run a new, completed scan. Open http://localhost:4173/cloud-sync.html to see pending uploads, failures and the last successful sync. Uploads retry every minute and after new scans. The durable queue survives restarting the app. Incomplete or cancelled scans do not replace the last successful online results. Earlier scans are not uploaded retroactively. A retry uses the same scan ID so it does not create duplicates.

## 3. Connect the hosted dashboard

In the GitHub repository, open **Settings → Secrets and variables → Actions → Variables** and add:

| Variable | Value |
| --- | --- |
| `GSRM_SUPABASE_URL` | Supabase project URL |
| `GSRM_SUPABASE_PUBLISHABLE_KEY` | Publishable key (or legacy anon key) |

These two values are public browser configuration. They grant no scan access without an approved signed-in account. Never use the secret/service-role key here.

Under **Settings → Pages**, choose **GitHub Actions**. Open **Actions → Publish online dashboard → Run workflow**, selecting `main`. The same workflow automatically redeploys when website files change.

Dashboard URL: https://exeedthemes.github.io/gsrm-empty-slots/

Sign in with your dashboard account, then select a scan. **Refresh scans** checks for new uploads. **Download CSV** exports the visible filtered view. Sign-in sessions stay in memory and roster data is not persisted by the online viewer; reopening the page requires signing in again. Downloaded CSVs are your responsibility to retain or remove.

## Validation and limitations

Run `node --test empty-slots-site/cloud-sync.test.js online-dashboard/dashboard.test.js` for isolated sync and browser checks. Existing checks remain available with `npm run check`.

The online viewer reads source snapshots only. To edit plans across devices, a later change must sync planning records and handle conflicting edits. Uploading a scan does not update AVBIS. The database must be configured before live sign-in and uploads can be verified.
