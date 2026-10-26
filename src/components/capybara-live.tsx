"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";
import {
  CAPYBARA_EVENT_ID,
  capybaraClient,
  capybaraConfigured,
  type CapybaraEvent,
  type CapybaraTeam,
} from "@/lib/capybara-supabase";

type GameProgress = { team: string; stage: number; started: number };
type StoredTeam = { id: string; name: string };
type NameStatus = { count: number; resume: { id: string; stage: number; started: number } | null };

// The registration this device is currently playing as, so progress goes to the right row.
const TEAM_KEY = "capybara-quest-team";

const nameKey = (name: string) => name.trim().replace(/\s+/g, " ").toLowerCase();

function readStoredTeam(): StoredTeam | null {
  try {
    const team = JSON.parse(localStorage.getItem(TEAM_KEY) || "null");
    return team?.id && team?.name ? team : null;
  } catch {
    return null;
  }
}

function writeStoredTeam(team: StoredTeam | null) {
  try {
    if (team) localStorage.setItem(TEAM_KEY, JSON.stringify(team));
    else localStorage.removeItem(TEAM_KEY);
  } catch {}
}

async function checkName(name: string): Promise<NameStatus> {
  const { data, error } = await capybaraClient.rpc("capybara_check_name", { p_event: CAPYBARA_EVENT_ID, p_name: name });
  if (error) throw new Error(`Could not check the team name (${error.message}).`);
  return data as NameStatus;
}

async function registerTeam(name: string): Promise<{ id?: string; error?: string; full?: boolean }> {
  const { data, error } = await capybaraClient.rpc("capybara_register", { p_event: CAPYBARA_EVENT_ID, p_name: name });
  if (error) throw new Error(`Could not register the team (${error.message}).`);
  return data;
}

const sortTeams = (teams: CapybaraTeam[]) =>
  [...teams].sort((a, b) => b.stage - a.stage || a.name.localeCompare(b.name));

export default function CapybaraLive() {
  const frame = useRef<HTMLIFrameElement>(null);
  const uid = useRef("");
  const eventStatus = useRef<CapybaraEvent["status"]>("live");
  const latest = useRef<GameProgress | null>(null);
  const resolving = useRef<Promise<StoredTeam | null> | null>(null);

  const [ready, setReady] = useState(false);
  const [myTeamId, setMyTeamId] = useState("");
  const [error, setError] = useState("");
  const [teams, setTeams] = useState<CapybaraTeam[]>([]);
  const [event, setEvent] = useState<CapybaraEvent>({
    id: CAPYBARA_EVENT_ID,
    status: "live",
    winner_id: null,
    winner_name: null,
  });
  const [showBoard, setShowBoard] = useState(false);
  const [reopenOpen, setReopenOpen] = useState(false);
  const [reopenCode, setReopenCode] = useState("");
  const [busy, setBusy] = useState(false);

  eventStatus.current = event.status;

  const loadTeams = useCallback(async () => {
    const { data } = await capybaraClient
      .from("capybara_teams")
      .select("id,name,stage,started,finished_at")
      .eq("event_id", CAPYBARA_EVENT_ID);
    if (data) setTeams(sortTeams(data as CapybaraTeam[]));
  }, []);

  const loadEvent = useCallback(async () => {
    const { data } = await capybaraClient
      .from("capybara_events")
      .select("id,status,winner_id,winner_name")
      .eq("id", CAPYBARA_EVENT_ID)
      .maybeSingle();
    if (data) setEvent(data as CapybaraEvent);
  }, []);

  // Anonymous identity per device, then live subscriptions to the event and the leaderboard.
  useEffect(() => {
    if (!capybaraConfigured) {
      setError("The live event is not set up yet. The hunt still works, but the leaderboard is offline.");
      return;
    }
    let active = true;
    let channel: ReturnType<typeof capybaraClient.channel> | null = null;
    let poll: ReturnType<typeof setInterval> | undefined;

    (async () => {
      const existing = await capybaraClient.auth.getSession();
      let userId = existing.data.session?.user.id;
      if (!userId) {
        const { data, error: signInError } = await capybaraClient.auth.signInAnonymously();
        if (signInError || !data.user) {
          console.error("Capybara sign-in failed", signInError);
          const detail = signInError ? ` (${signInError.status ?? "no status"}: ${signInError.message})` : "";
          if (active) setError(`Could not join the live event${detail}.`);
          return;
        }
        userId = data.user.id;
      }
      if (!active) return;
      uid.current = userId;
      setMyTeamId(readStoredTeam()?.id ?? "");

      await Promise.all([loadEvent(), loadTeams()]);
      if (!active) return;
      setReady(true);

      channel = capybaraClient
        .channel("capybara-live")
        .on("postgres_changes", { event: "*", schema: "public", table: "capybara_events" }, () => void loadEvent())
        .on("postgres_changes", { event: "*", schema: "public", table: "capybara_teams" }, () => void loadTeams())
        .subscribe();
      // Safety net in case a realtime message is missed on a flaky connection.
      poll = setInterval(() => {
        void loadEvent();
        void loadTeams();
      }, 15000);
    })();

    return () => {
      active = false;
      if (poll) clearInterval(poll);
      if (channel) void capybaraClient.removeChannel(channel);
    };
  }, [loadEvent, loadTeams]);

  const selectTeam = useCallback((team: StoredTeam | null) => {
    writeStoredTeam(team);
    setMyTeamId(team?.id ?? "");
  }, []);

  // The registration for the team the game is playing. Games saved before registrations existed
  // pick up this device's own row for that name, or register one.
  const teamFor = useCallback(
    async (name: string): Promise<StoredTeam | null> => {
      const stored = readStoredTeam();
      if (stored && nameKey(stored.name) === nameKey(name)) return stored;
      if (!resolving.current) {
        resolving.current = (async () => {
          const status = await checkName(name);
          let team: StoredTeam | null = status.resume ? { id: status.resume.id, name } : null;
          if (!team) {
            const result = await registerTeam(name);
            if (!result.id) throw new Error(result.error || "Could not register the team.");
            team = { id: result.id, name };
          }
          selectTeam(team);
          return team;
        })().finally(() => {
          resolving.current = null;
        });
      }
      return resolving.current;
    },
    [selectTeam],
  );

  const pushProgress = useCallback(
    async (progress: GameProgress) => {
      if (!uid.current || eventStatus.current === "ended") return;
      try {
        const team = await teamFor(progress.team);
        if (!team) return;
        const { data, error: writeError } = await capybaraClient
          .from("capybara_teams")
          .update({
            stage: Math.max(1, Math.min(8, Number(progress.stage) || 1)),
            started: progress.started,
            updated_at: new Date().toISOString(),
          })
          .eq("id", team.id)
          .select("id");
        if (writeError) throw new Error(`${writeError.code ?? "error"}: ${writeError.message}`);
        // The row is gone (for example, removed by an organizer): register again on the next update.
        if (!data?.length) selectTeam(null);
      } catch (e) {
        console.error("Capybara progress sync failed", e);
        setError(`Progress sync failed (${e instanceof Error ? e.message : "error"}). Your hunt continues on this device.`);
      }
    },
    [teamFor, selectTeam],
  );

  // A team name entered in the game: register it, or offer to resume this device's registration.
  const handleRegister = useCallback(
    async (mode: string, name: string) => {
      if (!uid.current) throw new Error("The live event is not connected yet. Try again in a moment.");
      if (eventStatus.current === "ended") throw new Error("The hunt has ended.");
      const status = await checkName(name);

      if (mode === "resume") {
        if (!status.resume) throw new Error("This device has no team with that name to resume.");
        selectTeam({ id: status.resume.id, name });
        return { status: "registered", mode: "resume", stage: status.resume.stage, started: status.resume.started };
      }
      if (mode === "check") {
        if (status.resume) return { status: "choose", stage: status.resume.stage, canFresh: status.count < 2 };
        if (status.count >= 2) {
          return {
            status: "full",
            message: "2 registrations already done with this name. Please register with a different name.",
          };
        }
        if (status.count === 1) return { status: "taken" };
      }

      const result = await registerTeam(name);
      if (!result.id) return { status: result.full ? "full" : "error", message: result.error };
      selectTeam({ id: result.id, name });
      return { status: "registered", mode: "fresh" };
    },
    [selectTeam],
  );

  // Once signed in, send any progress the game already reported and ask it for the current state.
  useEffect(() => {
    if (!ready) return;
    if (latest.current) void pushProgress(latest.current);
    frame.current?.contentWindow?.postMessage({ source: "capybara-host", kind: "request-progress" }, window.location.origin);
  }, [ready, pushProgress]);

  // Messages from the game. Only the embedded game on this origin is trusted.
  useEffect(() => {
    const listener = async (ev: MessageEvent) => {
      if (ev.origin !== window.location.origin || ev.source !== frame.current?.contentWindow) return;
      if (ev.data?.source !== "capybara-game") return;
      const reply = (message: object) =>
        frame.current?.contentWindow?.postMessage({ source: "capybara-host", ...message }, window.location.origin);

      if (ev.data.kind === "progress") {
        const progress = ev.data.info as GameProgress;
        if (!progress?.team) return;
        latest.current = progress;
        void pushProgress(progress);
      }

      if (ev.data.kind === "register") {
        const name = String(ev.data.name ?? "").trim().slice(0, 40);
        try {
          reply({ kind: "register-result", name, ...(await handleRegister(String(ev.data.mode), name)) });
        } catch (e) {
          reply({ kind: "register-result", name, status: "error", message: e instanceof Error ? e.message : "Could not register the team." });
        }
      }

      if (ev.data.kind === "finish-request") {
        setBusy(true);
        try {
          const { data } = await capybaraClient.auth.getSession();
          const token = data.session?.access_token;
          if (!token) throw new Error("The live event is not connected yet. Try again in a moment.");
          const team = readStoredTeam();
          if (!team) throw new Error("This team is not registered with the live event yet. Try again in a moment.");
          const res = await fetch("/api/capybara/finish", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ eventId: CAPYBARA_EVENT_ID, teamId: team.id, code: ev.data.code }),
          });
          const result = await res.json();
          if (!res.ok) throw new Error(result.error || "Finish rejected");
          reply({ kind: "finish-approved" });
        } catch (e) {
          reply({ kind: "finish-rejected", message: e instanceof Error ? e.message : "Finish rejected" });
        } finally {
          setBusy(false);
        }
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [pushProgress, handleRegister]);

  async function reopen() {
    setBusy(true);
    setError("");
    try {
      const { data } = await capybaraClient.auth.getSession();
      const token = data.session?.access_token;
      if (!token) throw new Error("The live event is not connected yet.");
      const res = await fetch("/api/capybara/reopen", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ eventId: CAPYBARA_EVENT_ID, code: reopenCode }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Could not reopen event");
      setReopenOpen(false);
      setReopenCode("");
      void loadEvent();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not reopen event");
    } finally {
      setBusy(false);
    }
  }

  const ended = event.status === "ended";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#080c10] text-[#e8edf2]">
      <div className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-cyan-400/20 px-3 sm:px-5">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft size={14} /> IoT Club
        </Link>
        <button
          type="button"
          onClick={() => setShowBoard((open) => !open)}
          aria-expanded={showBoard}
          className="flex items-center gap-2 rounded-lg border border-cyan-400/40 px-3 py-1.5 font-mono text-xs font-bold text-cyan-400 transition hover:bg-cyan-400/10"
        >
          <Trophy size={14} /> Leaderboard · {teams.length}
        </button>
      </div>

      <iframe
        ref={frame}
        title="Capybara Quest"
        src="/capybara-hunt/game.html"
        allow="camera"
        onLoad={() => {
          if (ready) frame.current?.contentWindow?.postMessage({ source: "capybara-host", kind: "request-progress" }, window.location.origin);
        }}
        className="block w-full flex-1 border-0"
      />

      {showBoard && (
        <aside
          aria-label="Live leaderboard"
          className="absolute right-3 top-14 z-10 w-[min(340px,calc(100vw-24px))] rounded-xl border border-cyan-400/30 bg-[#0e1520] p-3 shadow-[0_0_40px_rgba(0,212,255,.12)]"
        >
          <div className="max-h-[50vh] overflow-y-auto" aria-live="polite">
            {teams.length === 0 ? (
              <p className="px-1 py-3 text-sm text-[#8a98aa]">Waiting for teams to join…</p>
            ) : (
              teams.map((team, index) => (
                <div
                  key={team.id}
                  className="flex items-baseline justify-between gap-3 border-b border-cyan-400/10 px-1 py-2 text-sm last:border-b-0"
                >
                  <span className="min-w-0 break-words">
                    {index + 1}. {team.name}
                    {team.id === myTeamId ? " (you)" : ""}
                  </span>
                  <b className="shrink-0 font-mono text-xs text-cyan-400">
                    {team.stage >= 9 ? "Finished" : `Mission ${String(team.stage).padStart(2, "0")}`}
                  </b>
                </div>
              ))
            )}
          </div>
        </aside>
      )}

      {error && (
        <div
          role="alert"
          className="absolute inset-x-3 bottom-3 z-20 flex items-start justify-between gap-3 rounded-lg border border-rose-400/50 bg-[#1a0f14] p-3 text-sm text-rose-200"
        >
          <span>{error}</span>
          <button type="button" onClick={() => setError("")} className="shrink-0 font-mono text-xs text-cyan-400">
            Dismiss
          </button>
        </div>
      )}

      {ended && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="hunt-ended"
          className="absolute inset-0 z-30 grid place-items-center bg-[#080c10]/95 p-5"
        >
          <div className="w-full max-w-md rounded-xl border border-cyan-400/40 bg-[#0e1520] p-7 text-center shadow-[0_0_60px_rgba(0,212,255,.15)]">
            <h1 id="hunt-ended" className="font-mono text-2xl font-bold text-cyan-400">
              THE HUNT HAS ENDED!
            </h1>
            <p className="mt-4 text-[#c3cdd9]">The Capybara has been found. Please return to the Floating Theater.</p>
            <p className="mt-3 text-[#c3cdd9]">
              Winning team: <strong className="text-white">{event.winner_name || "Pending confirmation"}</strong>
            </p>
            {!reopenOpen ? (
              <button
                type="button"
                onClick={() => setReopenOpen(true)}
                className="mt-6 rounded-lg border border-cyan-400/50 px-5 py-2.5 font-mono text-sm font-bold text-cyan-400 transition hover:bg-cyan-400/10"
              >
                Reopen event
              </button>
            ) : (
              <form
                className="mt-6 text-left"
                onSubmit={(e) => {
                  e.preventDefault();
                  void reopen();
                }}
              >
                <label htmlFor="reopen-code" className="font-mono text-xs uppercase tracking-widest text-[#8a98aa]">
                  Organizer reopening code
                </label>
                <input
                  id="reopen-code"
                  type="password"
                  autoComplete="off"
                  value={reopenCode}
                  onChange={(e) => setReopenCode(e.target.value)}
                  placeholder="Enter organizer code"
                  className="mt-2 w-full rounded-lg border border-cyan-400/30 bg-[#0a1018] px-3 py-3 text-white outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  disabled={busy || !reopenCode}
                  className="mt-3 w-full rounded-lg bg-cyan-400 px-5 py-3 font-mono text-sm font-bold text-[#080c10] disabled:opacity-40"
                >
                  Confirm reopen
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {!ready && !error && capybaraConfigured && (
        <div className="absolute bottom-3 right-3 z-10 rounded-lg bg-[#0e1520] px-3 py-2 font-mono text-xs text-[#8a98aa]">
          Connecting live event…
        </div>
      )}
    </div>
  );
}
