"use client";

import { useState, useEffect } from "react";

export default function GlobalLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has already visited during this session
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setLoading(false);
      return;
    }

    // Increment loading progress from 0 to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("hasVisited", "true"); // Save visit state
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
        style={{
          background: "#f8fafc",
          fontFamily: "'Space Mono', monospace",
        }}
      >
        <div className="w-full max-w-xs flex flex-col items-center">
          {/* CARTOON ROUTER WITH SIGNAL WAVES */}
          <div className="relative mb-6 flex flex-col items-center">
            {/* Animated Antenna Signals */}
            <div className="relative flex items-center justify-center h-10 w-24">
              <span
                className="absolute border-t-2 border-blue-500 rounded-full animate-ping opacity-75"
                style={{ width: "24px", height: "12px", top: "18px" }}
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
                style={{ width: "64px", height: "32px", top: "-2px" }}
              />
            </div>

            {/* Router Body */}
            <div
              className="relative w-28 h-12 rounded-xl flex items-center justify-between px-3"
              style={{
                background: "#ffffff",
                border: "2px solid #2563eb",
                boxShadow:
                  "0 4px 20px rgba(37, 99, 235, 0.15), inset 0 0 8px rgba(37, 99, 235, 0.05)",
              }}
            >
              {/* Dual Antennas */}
              <div
                className="absolute -top-6 left-5 w-1.5 h-6 rounded-t"
                style={{ background: "#2563eb" }}
              />
              <div
                className="absolute -top-6 right-5 w-1.5 h-6 rounded-t"
                style={{ background: "#2563eb" }}
              />

              {/* Cartoon Eyes */}
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" />
                <div
                  className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                />
              </div>

              {/* Cartoon Blinking LED Lights */}
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

          {/* PERCENTAGE & STATUS */}
          <div className="w-full flex justify-between items-center mb-2">
            <span
              style={{
                color: "#64748b",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Connecting...
            </span>
            <span
              style={{
                color: "#2563eb",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {progress}%
            </span>
          </div>

          {/* PROGRESS BAR TRACK */}
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{
              background: "#e2e8f0",
              border: "1px solid rgba(37, 99, 235, 0.2)",
            }}
          >
            {/* MOVING FILL BAR */}
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

  return <>{children}</>;
}
