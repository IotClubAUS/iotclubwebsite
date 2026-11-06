import { createClient } from "@supabase/supabase-js";

export const CAPYBARA_EVENT_ID = "capybara-quest-2026";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const capybaraConfigured = Boolean(url && anonKey);

// A separate client with its own storage key: each device gets an anonymous identity for the hunt,
// and it never replaces the session the rest of the site uses.
export const capybaraClient = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key",
  {
    auth: {
      storageKey: "capybara-quest-auth",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  },
);

export type CapybaraTeam = {
  id: string;
  name: string;
  stage: number;
  started: number;
  finished_at: string | null;
};

export type CapybaraEvent = {
  id: string;
  status: "live" | "ended";
  winner_id: string | null;
  winner_name: string | null;
};
