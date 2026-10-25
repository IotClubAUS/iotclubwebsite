-- Capybara Quest live event. Run in the Supabase SQL editor. Safe to run again after an update.
-- Also enable: Authentication > Providers > Anonymous sign-ins.

create table if not exists public.capybara_events (
  id text primary key,
  status text not null default 'live' check (status in ('live', 'ended')),
  winner_id uuid,
  winner_name text,
  ended_at timestamptz,
  reopened_at timestamptz
);

-- One row per team registration. `owner` is the anonymous identity of the device that registered it.
create table if not exists public.capybara_teams (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null,
  event_id text not null references public.capybara_events (id),
  name text not null check (char_length(name) between 1 and 80),
  stage int not null default 1 check (stage between 1 and 9),
  started bigint not null default 0,
  finished_at timestamptz,
  updated_at timestamptz not null default now()
);

-- Upgrade from the first version, where each device had one row keyed by its own identity.
alter table public.capybara_teams add column if not exists owner uuid;
update public.capybara_teams set owner = id where owner is null;
alter table public.capybara_teams alter column owner set not null;
alter table public.capybara_teams alter column id set default gen_random_uuid();
-- Team names are compared ignoring case and extra spaces.
alter table public.capybara_teams add column if not exists name_key text
  generated always as (lower(regexp_replace(btrim(name), '\s+', ' ', 'g'))) stored;

create index if not exists capybara_teams_event_stage on public.capybara_teams (event_id, stage desc);
create index if not exists capybara_teams_event_name on public.capybara_teams (event_id, name_key);

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

-- Teams are created only through capybara_register, which enforces the two-per-name limit.
-- A device can then move its own teams through missions 1-8 while the event is live.
-- Mission 9 (finished) and the event state are written by the server with the service role.
drop policy if exists "team insert own" on public.capybara_teams;
drop policy if exists "team update own" on public.capybara_teams;
create policy "team update own" on public.capybara_teams
  for update to authenticated
  using (owner = auth.uid())
  with check (
    owner = auth.uid()
    and stage between 1 and 8
    and finished_at is null
    and exists (select 1 from public.capybara_events e where e.id = event_id and e.status = 'live')
  );

revoke insert, update, delete on public.capybara_teams from anon, authenticated;
grant update (stage, started, updated_at) on public.capybara_teams to authenticated;

-- How many registrations a team name has, and the latest one this device owns (to resume).
create or replace function public.capybara_check_name(p_event text, p_name text)
returns jsonb
language sql
stable
set search_path = public
as $$
  with matches as (
    select * from public.capybara_teams
    where event_id = p_event
      and name_key = lower(regexp_replace(btrim(coalesce(p_name, '')), '\s+', ' ', 'g'))
  )
  select jsonb_build_object(
    'count', (select count(*) from matches),
    'resume', (
      select jsonb_build_object('id', id, 'stage', stage, 'started', started)
      from matches where owner = auth.uid()
      order by updated_at desc limit 1
    )
  );
$$;

revoke all on function public.capybara_check_name(text, text) from public, anon;
grant execute on function public.capybara_check_name(text, text) to authenticated;

-- Registers a new team for this device. A name can be registered at most twice per event.
create or replace function public.capybara_register(p_event text, p_name text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_name text := regexp_replace(btrim(coalesce(p_name, '')), '\s+', ' ', 'g');
  v_key text := lower(v_name);
  v_id uuid;
begin
  if v_uid is null then
    return jsonb_build_object('error', 'Not signed in');
  end if;
  if char_length(v_name) not between 1 and 40 then
    return jsonb_build_object('error', 'Team names must be 1 to 40 characters.');
  end if;
  if not exists (select 1 from public.capybara_events where id = p_event and status = 'live') then
    return jsonb_build_object('error', 'The hunt is not live right now.');
  end if;

  -- Serialise registrations of the same name so two devices cannot both take the last place.
  perform pg_advisory_xact_lock(hashtext(p_event || ':' || v_key));
  if (select count(*) from public.capybara_teams where event_id = p_event and name_key = v_key) >= 2 then
    return jsonb_build_object(
      'error', '2 registrations already done with this name. Please register with a different name.',
      'full', true
    );
  end if;

  insert into public.capybara_teams (owner, event_id, name, stage, started)
    values (v_uid, p_event, v_name, 1, (extract(epoch from now()) * 1000)::bigint)
    returning id into v_id;
  return jsonb_build_object('ok', true, 'id', v_id);
end;
$$;

revoke all on function public.capybara_register(text, text) from public, anon;
grant execute on function public.capybara_register(text, text) to authenticated;

-- Atomic "first team to finish wins". Only the server (service role) may call it.
drop function if exists public.capybara_finish(text, uuid);
create or replace function public.capybara_finish(p_event text, p_team uuid, p_uid uuid)
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

  select * into tm from public.capybara_teams where id = p_team and event_id = p_event and owner = p_uid;
  if not found or tm.stage <> 8 then
    return jsonb_build_object('error', 'Complete Mission 8 first');
  end if;

  update public.capybara_events
    set status = 'ended', winner_id = p_team, winner_name = tm.name, ended_at = now()
    where id = p_event;
  update public.capybara_teams
    set stage = 9, finished_at = now(), updated_at = now()
    where id = p_team;

  return jsonb_build_object('ok', true, 'winner', tm.name);
end;
$$;

revoke all on function public.capybara_finish(text, uuid, uuid) from public, anon, authenticated;
grant execute on function public.capybara_finish(text, uuid, uuid) to service_role;

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

-- Tell the API layer about the new functions right away.
notify pgrst, 'reload schema';
