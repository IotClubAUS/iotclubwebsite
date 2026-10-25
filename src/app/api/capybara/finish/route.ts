import { NextRequest, NextResponse } from "next/server";
import { CAPYBARA_EVENT_ID } from "@/lib/capybara-supabase";
import { codesMatch, recordFailure, tooManyAttempts, userFromRequest } from "@/lib/capybara-server";

export async function POST(req: NextRequest) {
  const auth = await userFromRequest(req);
  if ("error" in auth) return auth.error;

  const { eventId, teamId, code } = await req.json().catch(() => ({}));
  if (eventId !== CAPYBARA_EVENT_ID) return NextResponse.json({ error: "Unknown event" }, { status: 400 });
  if (typeof teamId !== "string" || !/^[0-9a-f-]{36}$/i.test(teamId)) {
    return NextResponse.json({ error: "Unknown team" }, { status: 400 });
  }
  if (tooManyAttempts(`finish:${auth.userId}`)) {
    return NextResponse.json({ error: "Too many attempts. Wait a minute." }, { status: 429 });
  }
  if (!process.env.CAPYBARA_FINAL_CODE) {
    return NextResponse.json({ error: "Live event is not configured" }, { status: 503 });
  }
  if (!codesMatch(code, process.env.CAPYBARA_FINAL_CODE)) {
    recordFailure(`finish:${auth.userId}`);
    return NextResponse.json({ error: "Incorrect organizer verifier code." }, { status: 403 });
  }

  const { data, error } = await auth.admin.rpc("capybara_finish", { p_event: eventId, p_team: teamId, p_uid: auth.userId });
  if (error) return NextResponse.json({ error: "Unable to verify completion" }, { status: 500 });
  if (data?.error) return NextResponse.json({ error: data.error }, { status: 409 });
  return NextResponse.json({ ok: true });
}
