"use client";


const APPLICATIONS_OPEN = true;

const APPLICATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScUt5c1mp8MHQNj48T8zeBMvSxqnkjAa-ycJI_FVEb6udqawg/viewform?usp=sharing&ouid=115100477030477821907";

const DEADLINE = "June 30, 2026 • 11:59 PM (UAE time)";



const reasons = [
  {
    title: "Hands-On Hardware",
    desc: "Build real systems using microcontrollers, sensors, robotics, and embedded devices.",
  },
  {
    title: "Project Teams",
 desc: "Gain practical experience through workshops, team projects, and technical challenges."  },
  {
    title: "Industry Exposure",
    desc: "Connect with engineers, alumni, and technology companies.",
  },
  {
    title: "Leadership Opportunities",
    desc: "Lead workshops, events, and technical initiatives.",
  },
];

export default function JoinPage() {
  




    return (
  <div
    style={{
      fontFamily: "'Inter', sans-serif",
      minHeight: "100vh",
      background:
        "radial-gradient(circle at top, rgba(0,212,255,.08), transparent 45%)",
    }}
  >
    <div
  style={{
    position: "fixed",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0,212,255,.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,.03) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    pointerEvents: "none",
    zIndex: 0,
  }}
/>

<div
  style={{
    position: "fixed",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0,212,255,.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,.03) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    pointerEvents: "none",
    zIndex: 0,
  }}
/>

<div className="relative z-10">
  
      {/* HERO */}
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            color: "#00d4ff",
            letterSpacing: ".2em",
            textTransform: "uppercase",
            fontSize: "12px",
          }}
        >
          Internet of Things Club
        </p>

        <h1
          className="mt-6"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(3rem,8vw,5.5rem)",
color: "#e8edf2",
textShadow:
  "0 0 20px rgba(0,212,255,.15), 0 0 40px rgba(0,212,255,.1)",
              lineHeight: 1,
          }}
        >
          Build The
          <br />
          Future.
        </h1>

        <p
          className="mx-auto mt-8 max-w-3xl"
          style={{
            color: "#6b7a8d",
            fontSize: "1.1rem",
            lineHeight: 1.8,
          }}
        >
          Join a community of builders creating intelligent devices,
autonomous systems, and connected technologies that solve
real-world problems.
        </p>

        <div className="mt-12">
          <a
            href={APPLICATION_URL}
            target="_blank"
            rel="noreferrer"
className="
inline-flex
items-center
justify-center
px-10
py-4
transition-all
duration-300
hover:scale-105
hover:-translate-y-1
"
            style={{
              textShadow: "0 0 8px rgba(255,255,255,.3)",
              background: APPLICATIONS_OPEN
                ? "#15d4ff"
                : "#ef4444",
              color: "#080c10",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              fontWeight: 700,
              borderRadius: "6px",
              boxShadow: APPLICATIONS_OPEN
                ? "0 0 25px rgba(0,212,255,.15)"
                : "0 0 25px rgba(239,68,68,.45)",
              pointerEvents: APPLICATIONS_OPEN ? "auto" : "none",
            }}
          >
            {APPLICATIONS_OPEN
              ? "Apply Now"
              : "Applications Closed"}
          </a>
        </div>
      </div>
    </section>

    {/* APPLICATION STATUS */}
    <section className="px-6">
      <div
        className="max-w-5xl mx-auto p-8 md:p-10"
        style={{
          position: "relative",
overflow: "hidden",
          background: APPLICATIONS_OPEN
            ? "rgba(34,197,94,.06)"
            : "rgba(239,68,68,.06)",
          border: APPLICATIONS_OPEN
            ? "1px solid rgba(34,197,94,.3)"
            : "1px solid rgba(239,68,68,.3)",
          borderRadius: "12px",
          boxShadow: APPLICATIONS_OPEN
            ? "0 0 40px rgba(34,197,94,.12)"
            : "0 0 40px rgba(239,68,68,.12)",
        }}
      >
        <div
  style={{
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,.03), transparent)",
    pointerEvents: "none",
  }}
/>
        <h2
          style={{
            fontFamily: "'Space Mono', monospace",
            color: APPLICATIONS_OPEN
              ? "#22c55e"
              : "#ef4444",
          }}
        >
          {APPLICATIONS_OPEN
            ? "🟢 Applications Open"
            : "🔴 Applications Closed"}
        </h2>

        <p
          className="mt-4"
          style={{ color: "#e8edf2" }}
        >
          Fall 2026 Recruitment Cycle
        </p>

        <p
          className="mt-2"
          style={{ color: "#6b7a8d" }}
        >
          Deadline: {DEADLINE}
        </p>
      </div>
    </section>

    

    

    {/* WHY JOIN */}
{/* WHY JOIN */}
<section className="px-6 pt-28 pb-24">
        <div className="max-w-6xl mx-auto">
      <h2
  className="mb-10"
  style={{
    fontFamily: "'Space Mono', monospace",
    color: "#e8edf2",
    fontSize: "2rem",
  }}
>
  <span style={{ color: "#00d4ff" }}>
    //
  </span>{" "}
  Why Join?
</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason) => (
            <div
  key={reason.title}
  className="
    group
    p-6
    transition-all
    duration-300
    hover:-translate-y-2
  "
              style={{
                
                background: "#0e1520",
border: "1px solid rgba(0,212,255,.15)",
                borderRadius: "10px",
                cursor: "default",
                boxShadow: "0 0 0 rgba(0,212,255,0)",
              }}
            >
             <h3
  className="
  transition-all
  duration-300
  group-hover:text-cyan-300
  "
  style={{
    color: "#00d4ff",
    fontFamily: "'Space Mono', monospace",
  }}
>
                {reason.title}
              </h3>

              <p
                className="mt-3"
                style={{
                  color: "#6b7a8d",
                  lineHeight: 1.7,
                }}
              >
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
{/*
    {/* FINAL CTA 
    <section className="pb-24 px-6">
      <div
        className="max-w-5xl mx-auto text-center p-12"
        style={{
          background: "#0e1520",
          border: "1px solid rgba(0,212,255,.15)",
          borderRadius: "12px",
          boxShadow:
  "0 0 40px rgba(0,212,255,.08)",
        }}
      >
        <h2
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "2rem",
            color: "#e8edf2",
          }}
        >
          Ready to Build?
        </h2>

        <p
          className="mt-5"
          style={{
            color: "#6b7a8d",
            maxWidth: "700px",
            marginInline: "auto",
            lineHeight: 1.8,
          }}
        >
          Join a community of builders, innovators, and engineers creating the next generation of connected systems.
        </p>

        <a
          href={APPLICATION_URL}
          target="_blank"
          rel="noreferrer"
className="
inline-block
mt-8
px-10
py-4
transition-all
duration-300
hover:scale-105
hover:-translate-y-1
"          style={{
            background: "#00d4ff",
            color: "#080c10",
            fontWeight: 700,
            borderRadius: "6px",
            fontFamily: "'Space Mono', monospace",
            textTransform: "uppercase",
            boxShadow:
  "0 0 25px rgba(0,212,255,.25)",
          }}
        >
          Join The Club
        </a>
      </div>
     
    </section>

    */}
 </div>
</div>
);
}