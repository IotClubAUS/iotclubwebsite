"use client";

import { Wifi, Github, Linkedin, Mail, Instagram } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const links = [
    { id: "home", label: "Home", path: "/" },
    { id: "news", label: "News", path: "/news" },
    { id: "team", label: "Team", path: "/team" },
    { id: "join", label: "Join Us", path: "/contact" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(0,212,255,0.1)",
        background: "#080c10",
        fontFamily: "'Inter', sans-serif",
      }}
    >
<div className="max-w-6xl mx-auto px-6 py-10 md:py-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-7 h-7 flex items-center justify-center"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.3)",
                borderRadius: "3px",
              }}
            >
              <Wifi size={13} style={{ color: "#00d4ff" }} />
            </div>

            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "13px",
                color: "#e8edf2",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              IoT<span style={{ color: "#00d4ff" }}>Club</span>
            </span>
          </div>

          <p
            style={{
              fontSize: "0.825rem",
              color: "#6b7a8d",
              lineHeight: 1.7,
              maxWidth: "100%",            }}
          >
            A student community building connected devices, one sensor at a time.
          </p>

          <div className="flex gap-4 mt-5">

            <a
              href="mailto:iotclub@aus.edu"
              className="text-[#6b7a8d] hover:text-[#00d4ff] transition-colors"
            >
              <Mail size={15} />
            </a>

            <a
              href="https://instagram.com/aus_iot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b7a8d] hover:text-[#00d4ff] transition-colors"
            >
              <Instagram size={15} />
            </a>

            <a
              href="https://www.linkedin.com/company/aus-iot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b7a8d] hover:text-[#00d4ff] transition-colors"
            >
              <Linkedin size={15} />
            </a>

            <a
              href="https://github.com/IotClubAUS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b7a8d] hover:text-[#00d4ff] transition-colors"
            >
              <Github size={15} />
            </a>

          </div>
        </div>

<div className="grid grid-cols-2 gap-4 mt-6">        {/* Navigation */}
        <div>
          <p className="mb-4 text-[#00d4ff] font-mono text-[10px] tracking-widest uppercase">
            Navigate
          </p>

          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => router.push(link.path)}
                  className="text-[#6b7a8d] hover:text-[#e8edf2] transition-colors text-sm"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>


        {/* Contact */}
        <div>
          <p className="mb-4 text-[#00d4ff] font-mono text-[10px] tracking-widest uppercase">
            Contact
          </p>

<p className="text-[#6b7a8d] text-sm leading-5">
              Meetup every{" "}
            <strong className="text-[#e8edf2]">
              Wed at 6 pm
            </strong>
            <br />
            ESB, Room 0037
            <br />

            <a
              href="mailto:iotclub@aus.edu"
              className="hover:text-[#00d4ff] transition-colors"
            >
              iotclub@aus.edu
            </a>
          </p>
        </div>

      </div>
      </div>

      <div
        className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4"
        style={{
          borderTop: "1px solid rgba(0,212,255,0.06)",
        }}
      >
        <p className="font-mono text-[9px] md:text-[10px] text-[#6b7a8d] tracking-wider whitespace-nowrap">
  © 2026 IoT Club
</p>

<p className="font-mono text-[9px] md:text-[10px] text-[rgba(0,212,255,0.3)] whitespace-nowrap">
  connect / build / deploy
</p>
      </div>

    </footer>
  );
}