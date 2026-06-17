"use client";

import { useState } from "react";
import { Tag } from "lucide-react";
import { allNews } from "@/lib/news";



const tags = ["All", "Announcement", "Workshop", "Event", "Talk", "Project"];

const tagColors: Record<string, string> = {
  Workshop: "#00d4ff",
  Announcement: "#f59e0b",
  Talk: "#a78bfa",
  Project: "#34d399",
  Event: "#f472b6",
};

const BASE_PATH =
  process.env.NODE_ENV === "production"
    ? "/iotclubwebsite"
    : "";
    
export default function NewsPage() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? allNews
      : allNews.filter((n) => n.tag === activeTag);

  const glow = (color: string, strength = 10) =>
    `0 0 ${strength}px ${color}55`;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      {/* HEADER */}
      <div className="pt-28 pb-16 px-6" style={{ borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="max-w-6xl mx-auto">
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              color: "#00d4ff",
              textShadow: glow("#00d4ff"),
            }}
          >
            — Club Updates
          </p>

          <h1
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "2.5rem",
              color: "#e8edf2",
              textShadow: glow("#00d4ff", 12),
            }}
          >
            News & Events
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
    {/* FILTERS */}
<div className="flex flex-wrap gap-2 mb-10">
  {tags.map((tag) => {
    const color = tagColors[tag] || "#00d4ff";
    const isActive = activeTag === tag;

    // strong glow (active)
    const activeGlow = `0 0 8px ${color}aa, 0 0 16px ${color}55`;

    // softer glow (hover)
    const hoverGlow = `0 0 4px ${color}66`;

    return (
      <button
        key={tag}
        onClick={() => setActiveTag(tag)}
        className="px-4 py-1.5 transition-all duration-200"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderRadius: "2px",
          border: "1px solid",
          borderColor: isActive ? color : "rgba(0,212,255,0.2)",
          color: isActive ? color : "#6b7a8d",
          background: isActive ? `${color}15` : "transparent",

          // ACTIVE STATE (strong glow)
          textShadow: isActive ? activeGlow : "none",
          boxShadow: isActive ? `0 0 10px ${color}55` : "none",
        }}
        onMouseEnter={(e) => {
          // box glow stays strong
          e.currentTarget.style.boxShadow = `0 0 10px ${color}55, 0 0 20px ${color}25`;

          // ✨ SEMI LETTER GLOW ON HOVER (lighter than active)
          e.currentTarget.style.textShadow = activeGlow;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = isActive
            ? `0 0 10px ${color}55`
            : "none";

          e.currentTarget.style.textShadow = isActive
            ? activeGlow
            : "none";
        }}
      >
        {tag}
      </button>
    );
  })}
</div>
        {/* FEATURED */}
        {filtered[0] && (() => {
          const item = filtered[0];
          const color = tagColors[item.tag] || "#00d4ff";

          return (
            <article
              className="grid md:grid-cols-2 mb-8 group cursor-pointer"
              style={{
                background: "#0e1520",
                border: "1px solid rgba(0,212,255,0.12)",
                borderRadius: "4px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = `${color}88`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0,212,255,0.12)")
              }
            >
             <img
  src={`${BASE_PATH}${item.image}`}
  alt={item.title}
  className="w-full h-60 md:h-auto object-cover"
  style={{ opacity: 0.75 }}
/>

              <div className="p-8">
                <span
                  style={{
                    color,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    textShadow: glow(color, 6),
                  }}
                >
                  {item.tag}
                </span>

                <h2
                  style={{
                    color: "#e8edf2",
                    fontSize: "1.4rem",
                    marginTop: "10px",
                    textShadow: glow(color, 8),
                  }}
                >
                  {item.title}
                </h2>

                <p style={{ color: "#6b7a8d", marginTop: "10px" }}>
                  {item.excerpt}
                </p>
              </div>
            </article>
          );
        })()}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(1).map((item) => {
            const color = tagColors[item.tag] || "#00d4ff";

            return (
              <article
                key={item.id}
                className="group cursor-pointer"
                style={{
                  background: "#0e1520",
                  border: "1px solid rgba(0,212,255,0.12)",
                  borderRadius: "4px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = `${color}88`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(0,212,255,0.12)")
                }
              >
                <img
  src={`${BASE_PATH}${item.image}`}
  alt={item.title}
  className="w-full h-40 object-cover"
  style={{ opacity: 0.7 }}
/>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={10} style={{ color }} />

                    <span
                      style={{
                        color,
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        textShadow: glow(color, 6),
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      color: "#e8edf2",
                      textShadow: glow(color, 6),
                    }}
                  >
                    {item.title}
                  </h3>

                  <p style={{ color: "#6b7a8d", fontSize: "0.85rem" }}>
                    {item.excerpt}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}