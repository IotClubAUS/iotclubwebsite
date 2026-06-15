import { Wifi, Github, Linkedin, Mail, Instagram } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(0,212,255,0.1)",
        background: "#080c10",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-7 h-7 flex items-center justify-center"
              style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", borderRadius: "3px" }}
            >
              <Wifi size={13} style={{ color: "#00d4ff" }} />
            </div>
            <span
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "13px", color: "#e8edf2", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              IoT<span style={{ color: "#00d4ff" }}>Club</span>
            </span>
          </div>
          <p style={{ fontSize: "0.825rem", color: "#6b7a8d", lineHeight: 1.7, maxWidth: "240px" }}>
            A student community building connected devices, one sensor at a time.
          </p>
         <div className="flex gap-4 mt-5">
  <a
    href="mailto:iotclub@aus.edu"
    style={{ color: "#6b7a8d" }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a8d")}
    className="transition-colors duration-200"
  >
    <Mail size={15} />
  </a>

  <a
    href="https://instagram.com/aus_iot"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#6b7a8d" }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a8d")}
    className="transition-colors duration-200"
  >
    <Instagram size={15} />
  </a>

  <a
    href="https://www.linkedin.com/company/aus-iot"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#6b7a8d" }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a8d")}
    className="transition-colors duration-200"
  >
    <Linkedin size={15} />
  </a>

  <a
    href="https://github.com/IotClubAUS"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#6b7a8d" }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a8d")}
    className="transition-colors duration-200"
  >
    <Github size={15} />
  </a>
</div>
        </div>

        {/* Navigation */}
        <div>
          <p
            className="mb-4"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#00d4ff" }}
          >
            Navigate
          </p>
          <ul className="flex flex-col gap-2">
            {[
              { id: "home", label: "Home" },
              { id: "news", label: "News" },
              { id: "team", label: "Team" },
              { id: "join", label: "Join Us" },
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => onNavigate(link.id)}
                  style={{ fontSize: "0.825rem", color: "#6b7a8d", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#e8edf2")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a8d")}
                  className="transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p
            className="mb-4"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#00d4ff" }}
          >
            Contact
          </p>
          <p style={{ fontSize: "0.825rem", color: "#6b7a8d", lineHeight: 1.7 }}>
            Meetings every <strong style={{ color: "#e8edf2" }}>Wednesday at 6 pm</strong><br />
            Engineering Building, Room 0037<br />
            <a
              href="mailto:hello@iotclub.edu"
              style={{ color: "#6b7a8d" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a8d")}
              className="transition-colors"
            >
              iotclub@aus.edu  
            </a>
          </p>
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(0,212,255,0.06)" }}
      >
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#6b7a8d", letterSpacing: "0.05em" }}>
          © 2026 IoT Club
        </p>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "rgba(0,212,255,0.3)" }}>
          connect / build / deploy
        </p>
      </div>
    </footer>
  );
}
