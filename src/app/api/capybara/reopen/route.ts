import { NextRequest, NextResponse } from "next/server";
import { CAPYBARA_EVENT_ID } from "@/lib/capybara-supabase";
import { codesMatch, recordFailure, tooManyAttempts, userFromRequest } from "@/lib/capybara-server";

export async function POST(req: NextRequest) {
  const auth = await userFromRequest(req);
  if ("error" in auth) return auth.error;

  const { eventId, code } = await req.json().catch(() => ({}));
  if (eventId !== CAPYBARA_EVENT_ID) return NextResponse.json({ error: "Unknown event" }, { status: 400 });
  if (tooManyAttempts(`reopen:${auth.userId}`)) {
    return NextResponse.json({ error: "Too many attempts. Wait a minute." }, { status: 429 });
  }
  if (!process.env.CAPYBARA_REOPEN_CODE) {
    return NextResponse.json({ error: "Live event is not configured" }, { status: 503 });
  }
  if (!codesMatch(code, process.env.CAPYBARA_REOPEN_CODE)) {
    recordFailure(`reopen:${auth.userId}`);
    return NextResponse.json({ error: "Incorrect organizer code" }, { status: 403 });
  }

  // Reopening keeps every team's progress and only clears the winner.
  const { error } = await auth.admin
    .from("capybara_events")
    .update({ status: "live", winner_id: null, winner_name: null, reopened_at: new Date().toISOString() })
    .eq("id", eventId);
  if (error) return NextResponse.json({ error: "Could not reopen event" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
