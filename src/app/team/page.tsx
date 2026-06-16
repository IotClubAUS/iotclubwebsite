"use client";

import { useState } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import { team, advisors, roles } from "@/lib/team";


export default function TeamPage() {
  const [activeRole, setActiveRole] = useState("All");

    const filteredTeam =
  activeRole === "All"
    ? team
    : team.filter(
        (member) => member.category === activeRole
      );
        

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="pt-28 pb-16 px-6"
        style={{ borderBottom: "1px solid rgba(0,212,255,0.1)" }}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="mb-3 tracking-widest uppercase"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#00d4ff" }}
          >
            — The People
          </p>
          <h1
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "2.5rem",
              color: "#e8edf2",
              lineHeight: 1.1,
            }}
          >
            Meet the Team
          </h1>
          <p className="mt-4 max-w-xl" style={{ color: "#6b7a8d", lineHeight: 1.7 }}>
            Eight students running the IoT Club — each owning a domain from hardware to community.
          </p>
        </div>
     

      <div className="max-w-6xl mx-auto px-6 py-16">
    </div>

        {/* ROLE FILTERS */}
<div className="flex flex-wrap gap-2 mb-10">
  {roles.map((role) => {
    const active = activeRole === role;

    return (
      <button
        key={role}
        onClick={() => setActiveRole(role)}
        className="px-4 py-1.5 transition-all duration-200"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderRadius: "2px",
          border: "1px solid",
          borderColor: active
            ? "#00d4ff"
            : "rgba(0,212,255,0.2)",
          color: active
            ? "#00d4ff"
            : "#6b7a8d",
          background: active
            ? "rgba(0,212,255,0.08)"
            : "transparent",
          boxShadow: active
            ? "0 0 10px rgba(0,212,255,0.35)"
            : "none",
          textShadow: active
            ? "0 0 8px rgba(0,212,255,0.8)"
            : "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 0 10px rgba(0,212,255,0.45), 0 0 20px rgba(0,212,255,0.2)";

          e.currentTarget.style.textShadow =
            "0 0 8px rgba(0,212,255,0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = active
            ? "0 0 10px rgba(0,212,255,0.35)"
            : "none";

          e.currentTarget.style.textShadow = active
            ? "0 0 8px rgba(0,212,255,0.8)"
            : "none";
        }}
      >
        {role}
      </button>
    );
  })}
</div>
        {/* Core team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
{filteredTeam.map((member) => (            <div
              key={member.id}
              className="overflow-hidden transition-all duration-200 group"
              style={{
                background: "#0e1520",
                border: "1px solid rgba(0,212,255,0.12)",
                borderRadius: "4px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.35)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.12)")}
            >
              {/* Photo */}
              <div className="h-56 overflow-hidden bg-slate-900 relative">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "grayscale(30%)", opacity: 0.85 }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(14,21,32,0.9) 0%, transparent 60%)",
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#e8edf2",
                    marginBottom: "2px",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="mb-3"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#00d4ff",
                  }}
                >
                  {member.role}
                </p>
                <p className="mb-4" style={{ fontSize: "0.825rem", color: "#6b7a8d", lineHeight: 1.6 }}>
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "#6b7a8d",
                        background: "#111827",
                        border: "1px solid rgba(0,212,255,0.12)",
                        borderRadius: "2px",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social links */}
                <div className="flex gap-3">
                  {member.github && (
                    <a
                      href={member.github}
                      className="transition-colors"
                      style={{ color: "#6b7a8d" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a8d")}
                    >
                      <Github size={15} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="transition-colors"
                      style={{ color: "#6b7a8d" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a8d")}
                    >
                      <Linkedin size={15} />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      className="transition-colors"
                      style={{ color: "#6b7a8d" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a8d")}
                    >
                      <Twitter size={15} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Faculty advisor */}
        <div style={{ borderTop: "1px solid rgba(0,212,255,0.1)", paddingTop: "3rem" }}>
          <p
            className="mb-8 tracking-widest uppercase"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#00d4ff" }}
          >
            Faculty Advisor
          </p>
          {advisors.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-6 p-6 max-w-xl"
              style={{
                background: "#0e1520",
                border: "1px solid rgba(0,212,255,0.12)",
                borderRadius: "4px",
              }}
            >
              <div
                className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-slate-800"
                style={{ border: "2px solid rgba(0,212,255,0.25)" }}
              >
                <img src={a.img} alt={a.name} className="w-full h-full object-cover" style={{ filter: "grayscale(30%)" }} />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "#e8edf2",
                    marginBottom: "2px",
                  }}
                >
                  {a.name}
                </h3>
                <p
                  className="mb-1"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#00d4ff",
                  }}
                >
                  {a.role}
                </p>
                <p style={{ fontSize: "0.8rem", color: "#6b7a8d" }}>{a.dept}</p>
                <p className="mt-1" style={{ fontSize: "0.8rem", color: "#6b7a8d", fontStyle: "italic" }}>{a.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
