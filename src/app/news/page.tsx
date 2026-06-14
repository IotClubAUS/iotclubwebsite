import { useState } from "react";
import { Tag } from "lucide-react";

const allNews = [
  {
    id: 1,
    date: "2026-01-12",
    tag: "Announcement",
    title: "IoT Club Launch",
    excerpt:
      "IoT Club successfully launches ",
    image: "/news/iot_banner.webp",
    author: "IoT Admin",
    readTime: "5 min read",
  },
  {
    id: 2,
    date: "2026-04-01",
    tag: "Workshop",
    title: "Arduino-101 — Recap",
    excerpt:
      "We have Successfully hosted our inaugural event entitled, 'The Arduino-101 Workshop'. This beginner-friendly virtual session introduced students to the fundamentals of hardware and microcontroller programming, proving that no prior experience is needed to dive into tech. All attendees received an official certificate of participation and the session wrapped up with an engaging, interactive quiz to test everyone's new skills.",
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&h=500&fit=crop&auto=format",
    author: "IoT Admin",
    readTime: "3 min read",
  },
  {
    id: 3,
    date: "2026-04-14",
    tag: "Workshop",
    title: "Networks-101 — Recap",
    excerpt:
      "Iot CLub hosted a virtual event entitled 'Networks 101'. This beginner-friendly, high-energy online session introduced students to the 'Internet' side of IoT, moving beyond basic circuitry to explore data routing, network security, and real-world infrastructure. Proving that complex networking concepts can be hands-on, the workshop featured interactive demos and culminated in a live, cloud-hosted CLI chatroom where attendees connected via SSH. The session wrapped up with an engaging, interactive quiz to test everyone's new skills, with top participants taking home vouchers and certificates.",
    image: "/news/networks_poster.webp",
    author: "IoT Admin",
    readTime: "8 min read",
  },
  {
    id: 4,
    date: "2026-05-15",
    tag: "Event",
    title: "IoT Club WoW event",
    excerpt:
      "Our greenhouse automation team upgraded the plant monitoring system with LoRa long-range sensors and a new React dashboard. Now tracking 18 variables across 3 campus greenhouse zones.",
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&h=500&fit=crop&auto=format",
    author: "IoT Admin",
    readTime: "4 min read",
  },
  /*{
    id: 5,
    date: "2026-05-02",
    tag: "Workshop",
    title: "Intro to ESP32: Getting Started with Wi-Fi & BLE",
    excerpt:
      "Our most popular beginner session returned. 65 attendees learned to flash firmware, connect sensors, and publish data to a local broker — all within two hours.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop&auto=format",
    author: "Leila Zhang",
    readTime: "6 min read",
  },
  {
    id: 6,
    date: "2026-04-18",
    tag: "Announcement",
    title: "New Industry Partner: Bosch Connected Devices",
    excerpt:
      "We're thrilled to announce a collaboration with Bosch's IoT division. Members will get access to their dev kits, cloud platform sandbox, and mentorship from senior engineers.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop&auto=format",
    author: "Club Committee",
    readTime: "2 min read",
  },*/
];

const tags = ["All","Announcement", "Workshop", "Event", "Talk", "Project"];

const tagColors: Record<string, string> = {
  Workshop: "#00d4ff",
  Announcement: "#f59e0b",
  Talk: "#a78bfa",
  Project: "#34d399",
  Event: "#f472b6",
};

export function NewsPage() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All" ? allNews : allNews.filter((n) => n.tag === activeTag);

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
            — Club Updates
          </p>
          <h1
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "2.5rem", color: "#e8edf2", lineHeight: 1.1 }}
          >
            News & Events
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="px-4 py-1.5 transition-all duration-150"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderRadius: "2px",
                border: "1px solid",
                borderColor:
                  activeTag === tag ? (tagColors[tag] || "#00d4ff") : "rgba(0,212,255,0.2)",
                color: activeTag === tag ? (tagColors[tag] || "#00d4ff") : "#6b7a8d",
                background: activeTag === tag ? `${(tagColors[tag] || "#00d4ff")}15` : "transparent",
                cursor: "pointer",
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Featured top article */}
        {filtered[0] && (
          <article
            className="grid md:grid-cols-2 gap-0 mb-8 overflow-hidden transition-all duration-200 group cursor-pointer"
            style={{
              background: "#0e1520",
              border: "1px solid rgba(0,212,255,0.12)",
              borderRadius: "4px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.35)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.12)")}
          >
            <div className="h-60 md:h-auto overflow-hidden bg-slate-900">
              <img
                src={filtered[0].image}
                alt={filtered[0].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ opacity: 0.7 }}
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-2 py-0.5"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: tagColors[filtered[0].tag] || "#00d4ff",
                    background: `${tagColors[filtered[0].tag] || "#00d4ff"}15`,
                    borderRadius: "2px",
                  }}
                >
                  {filtered[0].tag}
                </span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#6b7a8d" }}>
                  {filtered[0].date}
                </span>
              </div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#e8edf2", lineHeight: 1.3, marginBottom: "0.75rem" }}>
                {filtered[0].title}
              </h2>
              <p style={{ fontSize: "0.875rem", color: "#6b7a8d", lineHeight: 1.6, marginBottom: "1rem" }}>
                {filtered[0].excerpt}
              </p>
              <div className="flex items-center gap-3" style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#6b7a8d" }}>
                <span>{filtered[0].author}</span>
                <span>·</span>
                <span>{filtered[0].readTime}</span>
              </div>
            </div>
          </article>
        )}

        {/* Grid of remaining articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(1).map((item) => (
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
              <div className="h-40 overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ opacity: 0.65 }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={10} style={{ color: tagColors[item.tag] || "#00d4ff" }} />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: tagColors[item.tag] || "#00d4ff",
                    }}
                  >
                    {item.tag}
                  </span>
                  <span style={{ color: "#2d3748" }}>·</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#6b7a8d" }}>
                    {item.date}
                  </span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e8edf2", lineHeight: 1.4, marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.825rem", color: "#6b7a8d", lineHeight: 1.6, marginBottom: "1rem" }}>
                  {item.excerpt}
                </p>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#6b7a8d" }}>
                  {item.readTime}
                </span>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: "#6b7a8d", textAlign: "center", padding: "4rem 0" }}>
            No posts in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
