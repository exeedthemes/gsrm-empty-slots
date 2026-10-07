-- Run once in the Supabase SQL editor. Scan data is never anonymously readable.
create table if not exists public.dashboard_viewers (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.dashboard_viewers enable row level security;
revoke all on public.dashboard_viewers from anon, authenticated;
grant select on public.dashboard_viewers to authenticated;
drop policy if exists "Viewer can check own membership" on public.dashboard_viewers;
create policy "Viewer can check own membership" on public.dashboard_viewers
  for select to authenticated using (user_id = (select auth.uid()));

create table if not exists public.scan_snapshots (
  scan_id text primary key,
  scanned_at timestamptz not null,
  uploaded_at timestamptz not null default now(),
  snapshot jsonb not null
);
create index if not exists scan_snapshots_scanned_at_idx on public.scan_snapshots (scanned_at desc);
alter table public.scan_snapshots enable row level security;
revoke all on public.scan_snapshots from anon, authenticated;
grant select on public.scan_snapshots to authenticated;
grant all on public.scan_snapshots to service_role;
drop policy if exists "Approved viewers can read scans" on public.scan_snapshots;
create policy "Approved viewers can read scans" on public.scan_snapshots
  for select to authenticated using (
    exists (select 1 from public.dashboard_viewers where user_id = (select auth.uid()))
  );
-- Create viewer accounts in Authentication > Users, then authorize each UUID:
-- insert into public.dashboard_viewers (user_id) values ('VIEWER-USER-UUID');
