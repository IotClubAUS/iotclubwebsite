import { useState } from "react";
import { Wifi, Menu, X } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: "home", label: "Home" },
    { id: "news", label: "News" },
    { id: "team", label: "Team" },
    { id: "join", label: "Join Us" },
  ];

  return (
    <nav
      style={{
        borderBottom: "1px solid rgba(0, 212, 255, 0.15)",
        backdropFilter: "blur(12px)",
        background: "rgba(8, 12, 16, 0.9)",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-8 h-8 flex items-center justify-center rounded"
            style={{ background: "rgba(0, 212, 255, 0.15)", border: "1px solid rgba(0, 212, 255, 0.4)" }}
          >
            <Wifi size={16} style={{ color: "#00d4ff" }} />
          </div>
          <span
            className="tracking-widest uppercase"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "13px", color: "#e8edf2" }}
          >
            IoT<span style={{ color: "#00d4ff" }}>Club</span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => onNavigate(link.id)}
                className="relative transition-colors duration-200"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: currentPage === link.id ? "#00d4ff" : "#6b7a8d",
                }}
              >
                {link.label}
                {currentPage === link.id && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: "#00d4ff" }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          style={{ color: "#00d4ff" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{ borderTop: "1px solid rgba(0, 212, 255, 0.15)", background: "rgba(8, 12, 16, 0.98)" }}
        >
          {links.map((link) => (
            <button
              key={link.id}
              className="block w-full text-left px-6 py-4 transition-colors"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: currentPage === link.id ? "#00d4ff" : "#6b7a8d",
                borderBottom: "1px solid rgba(0, 212, 255, 0.08)",
              }}
              onClick={() => {
                onNavigate(link.id);
                setMenuOpen(false);
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
