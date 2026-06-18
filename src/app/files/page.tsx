"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SecretPage() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function trackVisit() {
      await supabase.rpc("increment_easter_egg");

      const { data } = await supabase
        .from("easter_egg_visits")
        .select("count")
        .eq("id", 1)
        .single();

      setCount(data?.count ?? 0);
    }

    trackVisit();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#080c10]">
      <div className="text-center">
        <h1
          style={{
            color: "#00d4ff",
            fontFamily: "'Space Mono', monospace",
            fontSize: "2rem",
          }}
        >
          Welcome to the hashir easter egg.
        </h1>

        {count !== null && (
          <p className="mt-4 text-gray-400">
            Visitor #{count}
          </p>
        )}
      </div>
    </main>
  );
}