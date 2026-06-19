"use client";
import EventCountdown from "@/app/components/EventCountdown";
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
["32+","ENGINEERS"],
["40+","SYSTEMS BUILT"],
["12","PARTNERS"],
["03","HACKATHON WINS"],
];

const pillars = [
  {
        number:"1",
    icon: Cpu,
    title: "Hardware Hacking",
    desc: "Arduino, ESP32, Raspberry Pi and embedded systems.",
  },
  {
        number:"2",
    icon: Radio,
    title: "Connectivity",
    desc: "MQTT, LoRa, Zigbee and wireless communication.",
  },
  {
        number:"3",
    icon: Layers,
    title: "Data & Cloud",
    desc: "Dashboards, APIs and IoT infrastructure.",
  },
  {
    number:"4",
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
overflow-x-hidden"
style={{
fontFamily:"Inter, sans-serif"
}}
>
      {/* HERO */}
      

<section className="
relative
min-h-screen
flex
items-center
overflow-hidden
">

  <div
className="
absolute
right-[20%]
top-1/2
hidden
lg:block
"
>
<div
className="
relative
w-80
h-80
rounded-full
border
border-cyan-400/20
flex
items-center
justify-center
animate-pulse
"
>


<div
className="
absolute
w-56
h-56
rounded-full
border
border-cyan-400/30
"
/>


<div
className="
w-32
h-32
rounded-3xl
bg-[#0e1520]
border
border-cyan-400/40
shadow-[0_0_80px_rgba(0,212,255,.5)]
flex
flex-col
items-center
justify-center
"
>

<Cpu
size={42}
color="#00d4ff"
/>

<p
className="
text-[10px]
text-cyan-400
font-mono
mt-2
tracking-widest
"
>
IOT CORE
</p>

</div>


</div>

</div>
  <div
className="
absolute
inset-0
opacity-[0.08]
"
style={{
backgroundImage:
"linear-gradient(#00d4ff 1px,transparent 1px),linear-gradient(90deg,#00d4ff 1px,transparent 1px)",
backgroundSize:"50px 50px"
}}
/>
<div className="
absolute
inset-0
z-0
">          <img
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
px-5
py-24
sm:px-6
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
fontSize:"clamp(3rem,10vw,6.5rem)",
              color:"#e8edf2",
              lineHeight:1.1
            }}
          >
           CONNECT.
<br/>

<span style={{color:"#00d4ff"}}>
BUILD.
</span>

<br/>

DEPLOY.
          </h1>


          <p
  className="
    max-w-xl
    mb-8
    text-sm
    sm:text-base
  "
  style={{
    color:"#6b7a8d",
    lineHeight:1.7
  }}
>
A student-powered engineering community building
connected systems through embedded hardware,
software, and intelligent automation.
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
sm:w-auto
rounded-lg
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
  <span className="
relative
z-10
flex
items-center
gap-2
whitespace-nowrap
">
Start Building  <ArrowRight size={14}/>
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
md:flex
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
<div
className="
mt-6
grid
grid-cols-1
gap-3
md:hidden
"
>
  {[
    ["SYSTEM", "ONLINE"],
    ["NETWORK", "MQTT / LoRa"],
    ["NODES", "42 ACTIVE"],
  ].map(([title, value]) => (
    <div
  key={title}
  className="
  p-4
  rounded-xl
  bg-[#0e1520]/80
  border
  border-cyan-400/20
  backdrop-blur-xl
  shadow-[0_0_20px_rgba(0,212,255,.05)]
  transition-all
  duration-300
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
    </div>
  ))}
</div>
</div>

      </section>

<section
className="
max-w-5xl
mx-auto
px-6
py-20
text-center
"
>


<p
className="
text-cyan-400
font-mono
text-xs
tracking-[0.3em]
"
>
OUR MISSION
</p>


<h2
className="
mt-5
text-3xl
md:text-5xl
text-white
font-mono
"
>

Turning student ideas
into connected reality.

</h2>


<p
className="
mt-6
text-gray-400
max-w-2xl
mx-auto
"
>

We design intelligent systems that connect
hardware, software, and people to solve
real-world problems.

</p>


</section>

<EventCountdown/>

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
From hardware
to intelligence.  </h2>


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
rounded-2xl
bg-gradient-to-br
from-white/[0.08]
to-white/[0.02]
border
border-white/10
backdrop-blur-xl
hover:border-cyan-400/50
transition-all
duration-500
"
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


        <p
className="
text-cyan-400
font-mono
text-xs
mb-5
"
>
{p.number} / MODULE</p>


<Icon
size={28}
color="#00d4ff"
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

<div className="
max-w-6xl
mx-auto
px-5
sm:px-6
">
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
rounded-2xl
bg-white/[0.03]
backdrop-blur-xltransition-all
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
h-40
sm:h-44
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
text-3xl
sm:text-4xl
text-white
mb-5
"
style={{
fontFamily:"'Space Mono',monospace"
}}
>
Ready to build
the next connected system?</h2>


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
px-6
sm:px-8
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