import { createClient } from "@supabase/supabase-js";
import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

/** Verifies the bearer token sent by the browser and returns the signed-in user id. */
export async function userFromRequest(req: NextRequest) {
  const admin = adminClient();
  if (!admin) return { error: NextResponse.json({ error: "Live event is not configured" }, { status: 503 }) };
  const header = req.headers.get("authorization") ?? "";
  if (!header.startsWith("Bearer ")) {
    return { error: NextResponse.json({ error: "Sign in required" }, { status: 401 }) };
  }
  const { data, error } = await admin.auth.getUser(header.slice(7));
  if (error || !data.user) {
    return { error: NextResponse.json({ error: "Sign in required" }, { status: 401 }) };
  }
  return { admin, userId: data.user.id };
}

export function codesMatch(entered: unknown, expected: string | undefined) {
  if (!expected || typeof entered !== "string") return false;
  const a = Buffer.from(entered.trim());
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Slows down guessing of organizer codes. Per server instance, so it is a speed bump, not a lock.
const failures = new Map<string, { count: number; resetAt: number }>();
export function tooManyAttempts(key: string) {
  const entry = failures.get(key);
  return Boolean(entry && entry.resetAt > Date.now() && entry.count >= 5);
}
export function recordFailure(key: string) {
  const now = Date.now();
  const entry = failures.get(key);
  if (!entry || entry.resetAt <= now) failures.set(key, { count: 1, resetAt: now + 60_000 });
  else entry.count += 1;
}
