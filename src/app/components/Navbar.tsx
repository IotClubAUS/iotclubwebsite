"use client";

import { useState } from "react";
import { Wifi, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";


export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen,setMenuOpen] = useState(false);


  const links = [
    { href:"/", label:"Home" },
    { href:"/news", label:"News" },
    { href:"/team", label:"Team" },
    { href:"/contact", label:"Join Us" },
  ];


  return (

<nav
className="fixed top-0 left-0 right-0 z-50"
style={{
borderBottom:"1px solid rgba(0,212,255,.15)",
backdropFilter:"blur(12px)",
background:"rgba(8,12,16,.9)"
}}
>

<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">


{/* LOGO */}

<button
onClick={()=>router.push("/")}
className="flex items-center gap-2"
>

<div
className="w-8 h-8 flex items-center justify-center rounded"
style={{
background:"rgba(0,212,255,.15)",
border:"1px solid rgba(0,212,255,.4)"
}}
>

<Wifi size={16} color="#00d4ff"/>

</div>


<span
className="tracking-widest uppercase"
style={{
fontFamily:"'Space Mono', monospace",
fontSize:"13px",
color:"#e8edf2"
}}
>

IoT<span style={{color:"#00d4ff"}}>
Club
</span>

</span>


</button>




{/* DESKTOP */}

<ul className="hidden md:flex items-center gap-8">

{
links.map(link=>(

<li key={link.href}>

<button
  onClick={() => router.push(link.href)}
  className="relative transition-all duration-300"
  style={{
    fontFamily: "'Space Mono', monospace",
    fontSize: "12px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: pathname === link.href ? "#00d4ff" : "#6b7a8d",

    textShadow:
      pathname === link.href
        ? "0 0 8px rgba(0,212,255,.8), 0 0 20px rgba(0,212,255,.5)"
        : "none",
  }}
>
  {link.label}

  {pathname === link.href && (
    <span
      className="absolute left-0 -bottom-2 h-[2px] w-full"
      style={{
        background: "#00d4ff",
        boxShadow:
          "0 0 8px rgba(0,212,255,.8), 0 0 16px rgba(0,212,255,.6)",
      }}
    />
  )}
</button>
</li>

))
}

</ul>





{/* MOBILE BUTTON */}

<button
className="md:hidden"
style={{color:"#00d4ff"}}
onClick={()=>setMenuOpen(!menuOpen)}
>

{
menuOpen
?
<X size={20}/>
:
<Menu size={20}/>
}

</button>


</div>





{/* MOBILE MENU */}

{
menuOpen && (

<div
className="md:hidden"
style={{
borderTop:"1px solid rgba(0,212,255,.15)",
background:"rgba(8,12,16,.98)"
}}
>

{
links.map(link=>(

<button

key={link.href}

className="block w-full text-left px-6 py-4"

style={{
fontFamily:"'Space Mono', monospace",
fontSize:"12px",
letterSpacing:"0.1em",
textTransform:"uppercase",
color:"#6b7a8d"
}}

onClick={()=>{

router.push(link.href);
setMenuOpen(false);

}}

>

{link.label}

</button>

))
}


</div>

)
}


</nav>

  );
}