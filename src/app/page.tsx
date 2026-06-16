"use client";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Cpu,
  Radio,
  Layers,
  Zap,
  ChevronRight,
} from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=900&fit=crop&auto=format";

const newsItems = [
  {
    id: 1,
    date: "2026-01-12",
    tag: "Announcement",
    title: "IoT Club Launch",
    excerpt: "IoT Club successfully launches.",
    image: "/news/iot_banner.webp",
  },
  {
    id: 2,
    date: "2026-04-01",
    tag: "Workshop",
    title: "Arduino-101 — Recap",
    excerpt:
      "Beginner-friendly session introducing hardware and microcontroller programming.",
    image: "/news/arduino.webp",
  },
  {
    id: 3,
    date: "2026-04-14",
    tag: "Workshop",
    title: "Networks-101 — Recap",
    excerpt:
      "Networking, routing, and infrastructure concepts with hands-on demos.",
    image: "/news/networks_poster.webp",
  },
];

const stats = [
  ["20+", "Team Members"],
  ["3", "Hackathon Wins"],
  ["40+", "Projects Built"],
  ["12", "Industry Partners"],
];

const pillars = [
  {
    icon: Cpu,
    title: "Hardware Hacking",
    desc: "Arduino, ESP32, Raspberry Pi and embedded systems.",
  },
  {
    icon: Radio,
    title: "Connectivity",
    desc: "MQTT, LoRa, Zigbee and wireless communication.",
  },
  {
    icon: Layers,
    title: "Data & Cloud",
    desc: "Dashboards, APIs and IoT infrastructure.",
  },
  {
    icon: Zap,
    title: "Real Impact",
    desc: "Smart campus and sustainability projects.",
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <main style={{ fontFamily: "Inter, sans-serif" }}>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            className="w-full h-full object-cover"
            style={{ opacity: 0.2 }}
            alt=""
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg,#080c10 0%,rgba(8,12,16,.8) 60%,rgba(0,212,255,.05))",
            }}
          />
        </div>


        <div className="relative max-w-6xl mx-auto px-6 py-32">

          <p
            className="mb-6 uppercase tracking-widest"
            style={{
              fontFamily:"'Space Mono',monospace",
              color:"#00d4ff",
              fontSize:"11px"
            }}
          >
            — AUS IoT Club / Est. 2025
          </p>


          <h1
            className="mb-6"
            style={{
              fontFamily:"'Space Mono',monospace",
              fontSize:"clamp(2.5rem,6vw,5rem)",
              color:"#e8edf2",
              lineHeight:1.1
            }}
          >
            Connect.
            <br/>
            <span style={{color:"#00d4ff"}}>
              Build.
            </span>
            <br/>
            Deploy.
          </h1>


          <p
            className="max-w-xl mb-10"
            style={{
              color:"#6b7a8d",
              lineHeight:1.7
            }}
          >
            A student community building IoT systems at the intersection of
            hardware, software and the physical world.
          </p>


          <button
            onClick={()=>router.push("/contact")}
            className="flex items-center gap-2 px-6 py-3"
            style={{
              background:"#00d4ff",
              color:"#080c10",
              fontFamily:"'Space Mono',monospace",
              fontWeight:700
            }}
          >
            Join The Club <ArrowRight size={14}/>
          </button>

        </div>

      </section>



      {/* STATS */}

      <section
        className="py-10"
        style={{
          background:"#0e1520",
          borderTop:"1px solid rgba(0,212,255,.12)",
          borderBottom:"1px solid rgba(0,212,255,.12)"
        }}
      >

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map(([num,label])=>(
            <div key={label} className="text-center">

              <h3
                style={{
                  color:"#00d4ff",
                  fontSize:"2rem",
                  fontFamily:"'Space Mono',monospace"
                }}
              >
                {num}
              </h3>

              <p style={{color:"#6b7a8d"}}>
                {label}
              </p>

            </div>
          ))}

        </div>

      </section>



      {/* PILLARS */}

      <section className="max-w-6xl mx-auto px-6 py-24">

        <p
          className="uppercase tracking-widest mb-3"
          style={{
            color:"#00d4ff",
            fontSize:"11px"
          }}
        >
          What We Do
        </p>


        <h2
          className="mb-12"
          style={{
            color:"#e8edf2",
            fontFamily:"'Space Mono',monospace",
            fontSize:"2rem"
          }}
        >
          From sensor to system.
        </h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {pillars.map((p)=>{

            const Icon=p.icon;

            return (
              <div
                key={p.title}
                className="p-6"
                style={{
                  background:"#0e1520",
                  border:"1px solid rgba(0,212,255,.12)"
                }}
              >

                <Icon color="#00d4ff"/>

                <h3
                  className="mt-5 mb-2"
                  style={{
                    color:"#e8edf2",
                    fontFamily:"'Space Mono',monospace"
                  }}
                >
                  {p.title}
                </h3>

                <p style={{color:"#6b7a8d"}}>
                  {p.desc}
                </p>

              </div>
            )

          })}

        </div>

      </section>




      {/* NEWS */}

      <section
        className="py-24"
        style={{background:"#080c10"}}
      >

        <div className="max-w-6xl mx-auto px-6">


          <div className="flex justify-between mb-10">

            <h2
              style={{
                color:"#e8edf2",
                fontFamily:"'Space Mono',monospace"
              }}
            >
              News & Events
            </h2>


            <button
              onClick={()=>router.push("/news")}
              style={{color:"#00d4ff"}}
            >
              All News <ChevronRight size={14}/>
            </button>

          </div>



          <div className="grid md:grid-cols-3 gap-6">

            {newsItems.map(item=>(

              <article
                key={item.id}
                style={{
                  background:"#0e1520",
                  border:"1px solid rgba(0,212,255,.12)"
                }}
              >

                <img
                  src={item.image}
                  className="w-full h-44 object-cover"
                  alt={item.title}
                />


                <div className="p-5">

                  <span
                    style={{
                      color:"#00d4ff",
                      fontSize:"11px"
                    }}
                  >
                    {item.tag}
                  </span>


                  <h3
                    style={{
                      color:"#e8edf2",
                      marginTop:"10px"
                    }}
                  >
                    {item.title}
                  </h3>


                  <p
                    style={{
                      color:"#6b7a8d"
                    }}
                  >
                    {item.excerpt}
                  </p>


                </div>


              </article>

            ))}

          </div>


        </div>

      </section>


    </main>
  );
}