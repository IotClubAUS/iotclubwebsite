import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Exporting a singleton client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Or if you prefer keeping your getSupabase function:
export function getSupabase() {
  return supabase;
}