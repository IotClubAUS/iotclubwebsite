"use client";

import { useEffect, useState } from "react";

export default function GlobalLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Detect how the page was loaded
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    const isRefresh = navigation?.type === "reload";

    // Show loader only on an actual browser refresh
    if (!isRefresh) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setProgress(0);

    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 2;

      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  if (!loading) {
    return <>{children}</>;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6"
      style={{
        background: "#154d74",
        fontFamily: "'Space Mono', monospace",
      }}
    >
      <div className="w-full max-w-xs flex flex-col items-center">

        {/* ROUTER */}
        <div className="relative mb-6 flex flex-col items-center">

          {/* Signal waves */}
          <div className="relative flex items-center justify-center h-10 w-24">
            <span
              className="absolute border-t-2 border-blue-500 rounded-full animate-ping opacity-75"
              style={{
                width: "24px",
                height: "12px",
                top: "18px",
              }}
            />

            <span
              className="absolute border-t-2 border-blue-600 rounded-full animate-pulse"
              style={{
                width: "44px",
                height: "22px",
                top: "8px",
                boxShadow: "0 -4px 10px rgba(37,99,235,0.3)",
              }}
            />

            <span
              className="absolute border-t-2 border-blue-400 opacity-60 rounded-full"
              style={{
                width: "64px",
                height: "32px",
                top: "-2px",
              }}
            />
          </div>

          {/* Router body */}
          <div
            className="relative w-28 h-12 rounded-xl flex items-center justify-between px-3"
            style={{
              background: "#ffffff",
              border: "2px solid #2563eb",
              boxShadow:
                "0 4px 20px rgba(37, 99, 235, 0.15)",
            }}
          >
            {/* Antennas */}
            <div
              className="absolute -top-6 left-5 w-1.5 h-6 rounded-t"
              style={{ background: "#2563eb" }}
            />

            <div
              className="absolute -top-6 right-5 w-1.5 h-6 rounded-t"
              style={{ background: "#2563eb" }}
            />

            {/* Eyes */}
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" />

              <div
                className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.15s" }}
              />
            </div>

            {/* LEDs */}
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />

              <div
                className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />

              <div
                className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full flex justify-between items-center mb-2">
          <span
            style={{
              color: "#cbd5e1",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Connecting...
          </span>

          <span
            style={{
              color: "#60a5fa",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {progress}%
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{
            background: "#e2e8f0",
            border: "1px solid rgba(37, 99, 235, 0.2)",
          }}
        >
          <div
            className="h-full transition-all duration-75 ease-out rounded-full"
            style={{
              width: `${progress}%`,
              background: "#2563eb",
              boxShadow: "0 0 10px rgba(37, 99, 235, 0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

