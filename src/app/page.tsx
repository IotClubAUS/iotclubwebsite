"use client";

import { allNews } from "@/lib/news";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Cpu,
  Radio,
  Layers,
  Zap,
  ChevronRight,
} from "lucide-react";

    


const featuredNewsIds = [4, 3, 1];

const HERO_IMG =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=900&fit=crop&auto=format";



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
<main
className="
min-h-screen
bg-[#080c10]
overflow-hidden
"
style={{
fontFamily:"Inter, sans-serif"
}}
>
      {/* HERO */}
<section className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
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


<div className="
relative
w-full
max-w-7xl
mx-auto
px-6
py-20
md:py-32
">          <p
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
  className="
    group
    relative
    flex
    items-center
    justify-center
    gap-2
    px-6
    py-3
    w-full
    sm:w-fit
    overflow-hidden
    transition-all
    duration-300
    hover:shadow-[0_0_25px_rgba(0,212,255,0.6)]
  "
  style={{
    background:"#00d4ff",
    color:"#080c10",
    fontFamily:"'Space Mono',monospace",
    fontWeight:700
  }}
>
  <span className="relative z-10 flex items-center gap-2">
    Join The Club <ArrowRight size={14}/>
  </span>

  <span
    className="
      absolute
      inset-0
      bg-white/20
      translate-x-[-120%]
      group-hover:translate-x-[120%]
      transition-transform
      duration-700
    "
  />
</button>
<div
className="
hidden
lg:flex
absolute
right-0
top-1/2
-translate-y-1/2
flex-col
gap-4
"
>

{[
  ["SYSTEM", "ONLINE"],
  ["NETWORK", "MQTT / LoRa / WiFi"],
  ["NODES", "42 ACTIVE DEVICES"]
].map(([title, value]) => (<div
  key={title}
  className="
  w-56
  p-5
  rounded-xl
  bg-[#0e1520]/80
  border
  border-cyan-400/20
  backdrop-blur-xl
  shadow-[0_0_40px_rgba(0,212,255,.08)]
  transition-all
  hover:border-cyan-400/50
  "
>
  <p
    className="
    text-cyan-400
    text-xs
    font-mono
    tracking-widest
    "
  >
    {title}
  </p>


  {title === "SYSTEM" ? (
    <div
      className="
      flex
      items-center
      gap-2
      mt-2
      "
    >
      <span
        className="
        w-2.5
        h-2.5
        rounded-full
        bg-green-400
        shadow-[0_0_12px_rgba(34,197,94,.9)]
        animate-pulse
        "
      />

      <p
        className="
        text-white
        font-mono
        text-sm
        "
      >
        {value}
      </p>
    </div>
  ) : (
    <p
      className="
      text-white
      font-mono
      text-sm
      mt-2
      "
    >
      {value}
    </p>
  )}

</div>

))}
 
</div>
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
<div
key={label}
className="
group
text-center
p-5
rounded-xl
border
border-transparent
hover:border-cyan-400/20
hover:bg-cyan-400/5
transition-all
duration-300
"
>
              <h3
className="
group-hover:scale-110
transition-transform
duration-300
"
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

<section className="max-w-6xl mx-auto px-6 py-16 md:py-24">

  <p
    className="
      uppercase
      tracking-widest
      mb-3
      text-xs
    "
    style={{
      color:"#00d4ff"
    }}
  >
    What We Do
  </p>


  <h2
    className="
      mb-12
      text-3xl
    "
    style={{
      color:"#e8edf2",
      fontFamily:"'Space Mono',monospace"
    }}
  >
    From sensor to system.
  </h2>


  <div className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-4
    gap-6
  ">


  {pillars.map((p)=>{

    const Icon = p.icon;


    return (

      <div
      key={p.title}
      className="
        group
        relative
        p-6
        rounded-xl
        overflow-hidden
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-[0_10px_40px_rgba(0,212,255,.15)]
      "
      style={{
        background:"#0e1520",
        border:"1px solid rgba(0,212,255,.12)"
      }}
      >

        <div
        className="
          absolute
          inset-0
          bg-cyan-400/5
          opacity-0
          group-hover:opacity-100
          transition
        "
        />


        <Icon
        size={28}
        color="#00d4ff"
        className="
          relative
          group-hover:scale-110
          transition
        "
        />


        <h3
        className="
          relative
          mt-5
          mb-2
        "
        style={{
          color:"#e8edf2",
          fontFamily:"'Space Mono',monospace"
        }}
        >
          {p.title}
        </h3>


        <p
        className="relative"
        style={{
          color:"#6b7a8d"
        }}
        >
          {p.desc}
        </p>


      </div>

    );

  })}


  </div>

</section>

      {/* NEWS */}

      <section className="py-16 md:py-24"
        style={{background:"#080c10"}}
      >

<div className="max-w-6xl mx-auto px-6 md:px-0">

<div className="flex flex-col gap-4 md:flex-row md:justify-between mb-10">
            <h2
              style={{
                color:"#e8edf2",
                fontFamily:"'Space Mono',monospace"
              }}
            >
              News & Events
            </h2> 
            
             <button
  onClick={() => router.push("/news")}
  className="flex items-center gap-1 transition-all duration-200"
  style={{
    color:  "#00d4ff",
    fontFamily: "'Space Mono', monospace",
    fontSize: "12px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.textShadow =
      "0 0 8px #00d4ff, 0 0 16px #00d4ff55";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.textShadow = "none";
  }}
>
  All News
  <ChevronRight size={14} />
</button>
            </div>



          <div className="grid md:grid-cols-3 gap-6">

{allNews
  .filter((item) => featuredNewsIds.includes(item.id))
  .map((item) => (          
    
    <article
key={item.id}
onClick={()=>router.push(`/news/${item.id}`)}
className="
group
overflow-hidden
cursor-pointer
rounded-xl
transition-all
duration-300
hover:-translate-y-2
hover:shadow-[0_20px_50px_rgba(0,212,255,.15)]
"
  style={{
    background:"#0e1520",
    border:"1px solid rgba(0,212,255,.12)"
  }}
>

            <img
src={item.image}
className="
w-full
h-36
md:h-44
object-cover
group-hover:scale-110
transition-transform
duration-500
"
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
                    {item.bio}
                  </p>


                </div>


              </article>

            ))}

          </div>


        </div>

      </section>

<section
className="
py-20
text-center
border-t
border-cyan-400/10
"
>


<h2
className="
text-4xl
text-white
mb-5
"
style={{
fontFamily:"'Space Mono',monospace"
}}
>
Build the future with us.
</h2>


<p
className="
text-gray-400
mb-8
"
>
Join a community creating real-world IoT systems.
</p>


<button
onClick={()=>router.push("/contact")}
className="
px-8
py-3
bg-cyan-400
text-black
font-bold
hover:shadow-[0_0_30px_rgba(0,212,255,.6)]
transition
"
>
Join AUS IoT Club →
</button>


</section>
    </main>
  );
}