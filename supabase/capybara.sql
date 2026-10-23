-- Capybara Quest live event. Run once in the Supabase SQL editor.
-- Also enable: Authentication > Providers > Anonymous sign-ins.

create table if not exists public.capybara_events (
  id text primary key,
  status text not null default 'live' check (status in ('live', 'ended')),
  winner_id uuid,
  winner_name text,
  ended_at timestamptz,
  reopened_at timestamptz
);

create table if not exists public.capybara_teams (
  id uuid primary key,
  event_id text not null references public.capybara_events (id),
  name text not null check (char_length(name) between 1 and 80),
  stage int not null default 1 check (stage between 1 and 9),
  started bigint not null default 0,
  finished_at timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists capybara_teams_event_stage on public.capybara_teams (event_id, stage desc);

insert into public.capybara_events (id, status) values ('capybara-quest-2026', 'live')
  on conflict (id) do nothing;

alter table public.capybara_events enable row level security;
alter table public.capybara_teams enable row level security;

-- Anyone signed in (anonymous sign-ins count) can read the leaderboard and the event state.
drop policy if exists "events readable" on public.capybara_events;
create policy "events readable" on public.capybara_events
  for select to authenticated using (true);

drop policy if exists "teams readable" on public.capybara_teams;
create policy "teams readable" on public.capybara_teams
  for select to authenticated using (true);

-- A device can only write its own team row, only to missions 1-8, and only while the event is live.
-- Mission 9 (finished) and the event state are written by the server with the service role.
drop policy if exists "team insert own" on public.capybara_teams;
create policy "team insert own" on public.capybara_teams
  for insert to authenticated
  with check (
    id = auth.uid()
    and stage between 1 and 8
    and finished_at is null
    and exists (select 1 from public.capybara_events e where e.id = event_id and e.status = 'live')
  );

drop policy if exists "team update own" on public.capybara_teams;
create policy "team update own" on public.capybara_teams
  for update to authenticated
  using (id = auth.uid())
  with check (
    id = auth.uid()
    and stage between 1 and 8
    and finished_at is null
    and exists (select 1 from public.capybara_events e where e.id = event_id and e.status = 'live')
  );

-- Atomic "first team to finish wins". Only the server (service role) may call it.
create or replace function public.capybara_finish(p_event text, p_uid uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  ev public.capybara_events;
  tm public.capybara_teams;
begin
  select * into ev from public.capybara_events where id = p_event for update;
  if not found then
    return jsonb_build_object('error', 'Unknown event');
  end if;
  if ev.status = 'ended' then
    return jsonb_build_object('error', 'The event has already ended');
  end if;

  select * into tm from public.capybara_teams where id = p_uid and event_id = p_event;
  if not found or tm.stage <> 8 then
    return jsonb_build_object('error', 'Complete Mission 8 first');
  end if;

  update public.capybara_events
    set status = 'ended', winner_id = p_uid, winner_name = tm.name, ended_at = now()
    where id = p_event;
  update public.capybara_teams
    set stage = 9, finished_at = now(), updated_at = now()
    where id = p_uid;

  return jsonb_build_object('ok', true, 'winner', tm.name);
end;
$$;

revoke all on function public.capybara_finish(text, uuid) from public, anon, authenticated;
grant execute on function public.capybara_finish(text, uuid) to service_role;

-- Live updates for every connected device.
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'capybara_events') then
    alter publication supabase_realtime add table public.capybara_events;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'capybara_teams') then
    alter publication supabase_realtime add table public.capybara_teams;
  end if;
end $$;
