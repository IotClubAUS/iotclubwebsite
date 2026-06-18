"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

export default function SecretPage() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function trackVisit() {
      const supabase = getSupabase();

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
          Welcome to hashirs easter egg.
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