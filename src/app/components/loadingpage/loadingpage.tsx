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
        background: "#080c10",
        fontFamily: "'Space Mono', monospace",
      }}
    >
@@ -66,7 +66,7 @@ export default function GlobalLoader({
          {/* Signal waves */}
          <div className="relative flex items-center justify-center h-10 w-24">
            <span
              className="absolute border-t-2 border-blue-500 rounded-full animate-ping opacity-75"
              className="absolute border-t-2 border-[#00d4ff] rounded-full animate-ping opacity-75"
              style={{
                width: "24px",
                height: "12px",
@@ -75,17 +75,17 @@ export default function GlobalLoader({
            />

            <span
              className="absolute border-t-2 border-blue-600 rounded-full animate-pulse"
              className="absolute border-t-2 border-[#00d4ff] rounded-full animate-pulse"
              style={{
                width: "44px",
                height: "22px",
                top: "8px",
                boxShadow: "0 -4px 10px rgba(37,99,235,0.3)",
                boxShadow: "0 -4px 10px rgba(0, 212, 255, 0.3)",
              }}
            />

            <span
              className="absolute border-t-2 border-blue-400 opacity-60 rounded-full"
              className="absolute border-t-2 border-[#00d4ff] opacity-60 rounded-full"
              style={{
                width: "64px",
                height: "32px",
@@ -98,29 +98,29 @@ export default function GlobalLoader({
          <div
            className="relative w-28 h-12 rounded-xl flex items-center justify-between px-3"
            style={{
              background: "#ffffff",
              border: "2px solid #2563eb",
              background: "#0e1520",
              border: "2px solid #00d4ff",
              boxShadow:
                "0 4px 20px rgba(37, 99, 235, 0.15)",
                "0 4px 20px rgba(0, 212, 255, 0.15)",
            }}
          >
            {/* Antennas */}
            <div
              className="absolute -top-6 left-5 w-1.5 h-6 rounded-t"
              style={{ background: "#2563eb" }}
              style={{ background: "#00d4ff" }}
            />

            <div
              className="absolute -top-6 right-5 w-1.5 h-6 rounded-t"
              style={{ background: "#2563eb" }}
              style={{ background: "#00d4ff" }}
            />

            {/* Eyes */}
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" />
              <div className="w-2.5 h-2.5 bg-[#00d4ff] rounded-full animate-bounce" />

              <div
                className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce"
                className="w-2.5 h-2.5 bg-[#00d4ff] rounded-full animate-bounce"
                style={{ animationDelay: "0.15s" }}
              />
            </div>
@@ -130,12 +130,12 @@ export default function GlobalLoader({
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />

              <div
                className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"
                className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />

              <div
                className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"
                className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
@@ -146,7 +146,7 @@ export default function GlobalLoader({
        <div className="w-full flex justify-between items-center mb-2">
          <span
            style={{
              color: "#cbd5e1",
              color: "#6b7a8d",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
@@ -157,7 +157,7 @@ export default function GlobalLoader({

          <span
            style={{
              color: "#60a5fa",
              color: "#00d4ff",
              fontSize: "14px",
              fontWeight: "bold",
            }}
@@ -170,21 +170,20 @@ export default function GlobalLoader({
        <div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{
            background: "#e2e8f0",
            border: "1px solid rgba(37, 99, 235, 0.2)",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(0, 212, 255, 0.2)",
          }}
        >
          <div
            className="h-full transition-all duration-75 ease-out rounded-full"
            style={{
              width: `${progress}%`,
              background: "#2563eb",
              boxShadow: "0 0 10px rgba(37, 99, 235, 0.4)",
              background: "#00d4ff",
              boxShadow: "0 0 10px rgba(0, 212, 255, 0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
