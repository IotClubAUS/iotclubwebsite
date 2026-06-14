import { ArrowRight, Cpu, Radio, Layers, Zap, ChevronRight } from "lucide-react";

const HERO_IMG = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=900&fit=crop&auto=format";

const newsItems = [
  {
    id: 1,
    date: "2026-06-10",
    tag: "Workshop",
    title: "Hands-On MQTT Protocol Workshop — Recap",
    excerpt:
      "Over 40 members joined our deep-dive into MQTT, building real-time sensor dashboards from scratch using Raspberry Pi and Node-RED. Full writeup and materials now available.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 2,
    date: "2026-06-03",
    tag: "Announcement",
    title: "IoT Club Wins Regional Hackathon 2026",
    excerpt:
      'Team "Pulse" took first place at HackWave 2026 with their smart-campus occupancy system — reducing energy use by 34% in a simulated building environment.',
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 3,
    date: "2026-05-28",
    tag: "Talk",
    title: "Guest Lecture: Edge AI on Microcontrollers",
    excerpt:
      "Dr. Noa Reinholt from MIT Media Lab joined us to discuss running TinyML models on Arduino Nano BLE. Slides and recording linked inside.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&auto=format",
  },
];

const stats = [
  { value: "20+", label: "Team Members" },
  { value: "3", label: "Hackathon Wins" },
  { value: "40+", label: "Projects Built" },
  { value: "12", label: "Industry Partners" },
];

const pillars = [
  {
    icon: Cpu,
    title: "Hardware Hacking",
    desc: "Raspberry Pi, Arduino, ESP32 — we prototype, break things, and learn from every iteration.",
  },
  {
    icon: Radio,
    title: "Connectivity",
    desc: "MQTT, LoRa, Zigbee, BLE. We explore every protocol that makes devices talk to each other.",
  },
  {
    icon: Layers,
    title: "Data & Cloud",
    desc: "From edge processing to cloud dashboards — we close the loop from sensor to insight.",
  },
  {
    icon: Zap,
    title: "Real Impact",
    desc: "Our projects target smart campus, sustainability, and accessibility challenges.",
  },
];

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="circuit board macro"
            className="w-full h-full object-cover"
            style={{ opacity: 0.2 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(8,12,16,0.97) 0%, rgba(8,12,16,0.75) 60%, rgba(0,212,255,0.05) 100%)",
            }}
          />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-32">
          <div className="max-w-3xl">
            <p
              className="mb-6 tracking-widest uppercase"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#00d4ff" }}
            >
              — AUS IoT Club / Est. 2025
            </p>
            <h1
              className="mb-6 leading-none"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 700,
                color: "#e8edf2",
                lineHeight: 1.1,
              }}
            >
              Connect.<br />
              <span style={{ color: "#00d4ff" }}>Build.</span><br />
              Deploy.
            </h1>
            <p
              className="mb-10 max-w-xl"
              style={{ fontSize: "1.1rem", color: "#6b7a8d", lineHeight: 1.7 }}
            >
              We're a student-run community at the intersection of hardware, software, and the
              physical world. Join us to build real IoT systems — and ship them.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate("join")}
                className="flex items-center gap-2 px-6 py-3 transition-all duration-200 hover:gap-3"
                style={{
                  background: "#00d4ff",
                  color: "#080c10",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  borderRadius: "2px",
                }}
              >
                Join the Club <ArrowRight size={14} />
              </button>
              <button
                onClick={() => onNavigate("news")}
                className="flex items-center gap-2 px-6 py-3 transition-all duration-200"
                style={{
                  border: "1px solid rgba(0,212,255,0.35)",
                  color: "#e8edf2",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  background: "transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.35)")}
              >
                See News
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section
        style={{
          borderTop: "1px solid rgba(0,212,255,0.12)",
          borderBottom: "1px solid rgba(0,212,255,0.12)",
          background: "#0e1520",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#00d4ff",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p
                className="mt-1"
                style={{ fontSize: "0.8rem", color: "#6b7a8d", letterSpacing: "0.05em" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <p
          className="mb-2 tracking-widest uppercase"
          style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#00d4ff" }}
        >
          What We Do
        </p>
        <h2
          className="mb-16"
          style={{ fontFamily: "'Space Mono', monospace", fontSize: "2rem", color: "#e8edf2", lineHeight: 1.2 }}
        >
          From sensor to system —<br />we build the full stack.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 transition-all duration-200 group"
                style={{
                  background: "#0e1520",
                  border: "1px solid rgba(0,212,255,0.12)",
                  borderRadius: "4px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,212,255,0.12)";
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-5"
                  style={{ background: "rgba(0,212,255,0.1)", borderRadius: "4px" }}
                >
                  <Icon size={18} style={{ color: "#00d4ff" }} />
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.9rem",
                    color: "#e8edf2",
                    fontWeight: 700,
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#6b7a8d", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest News preview */}
      <section
        style={{ borderTop: "1px solid rgba(0,212,255,0.08)", background: "#080c10" }}
        className="py-24"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p
                className="mb-2 tracking-widest uppercase"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#00d4ff" }}
              >
                Latest
              </p>
              <h2
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "2rem", color: "#e8edf2" }}
              >
                News & Events
              </h2>
            </div>
            <button
              onClick={() => onNavigate("news")}
              className="hidden md:flex items-center gap-1 transition-colors"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "12px",
                color: "#00d4ff",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              All News <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden transition-all duration-200 cursor-pointer group"
                style={{
                  background: "#0e1520",
                  border: "1px solid rgba(0,212,255,0.12)",
                  borderRadius: "4px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.35)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.12)")}
              >
                <div className="h-44 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ opacity: 0.75 }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="px-2 py-0.5"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#00d4ff",
                        background: "rgba(0,212,255,0.1)",
                        borderRadius: "2px",
                      }}
                    >
                      {item.tag}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "#6b7a8d",
                      }}
                    >
                      {item.date}
                    </span>
                  </div>
                  <h3
                    className="mb-2"
                    style={{ fontSize: "1rem", fontWeight: 600, color: "#e8edf2", lineHeight: 1.4 }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.825rem", color: "#6b7a8d", lineHeight: 1.6 }}>
                    {item.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "#0e1520" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p
            className="mb-4 tracking-widest uppercase"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#00d4ff" }}
          >
            Open to all students
          </p>
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#e8edf2",
              lineHeight: 1.2,
            }}
          >
            Ready to wire up<br />
            <span style={{ color: "#00d4ff" }}>your first IoT project?</span>
          </h2>
          <p className="mb-10" style={{ fontSize: "1rem", color: "#6b7a8d", lineHeight: 1.7 }}>
            No experience needed. We run beginner workshops every semester and pair new members
            with experienced mentors. Your first board is on us.
          </p>
          <button
            onClick={() => onNavigate("join")}
            className="flex items-center gap-2 px-8 py-4 mx-auto transition-all duration-200 hover:gap-4"
            style={{
              background: "#00d4ff",
              color: "#080c10",
              fontFamily: "'Space Mono', monospace",
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 700,
              borderRadius: "2px",
            }}
          >
            Apply for Membership <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}
