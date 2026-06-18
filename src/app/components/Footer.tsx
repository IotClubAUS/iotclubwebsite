"use client";

import {
  Wifi,
  Github,
  Linkedin,
  Mail,
  Instagram,
  MapPin,
} from "lucide-react";

import { useRouter } from "next/navigation";


export default function Footer() {

  const router = useRouter();


  const links = [
    { id:"home", label:"Home", path:"/" },
    { id:"news", label:"News", path:"/news" },
    { id:"team", label:"Team", path:"/team" },
    { id:"join", label:"Join Us", path:"/contact" },
  ];


  return (

<footer
style={{
borderTop:"1px solid rgba(0,212,255,0.1)",
background:"#080c10",
fontFamily:"'Inter', sans-serif",
}}
>


{/* MAIN */}

<div
className="
max-w-7xl
mx-auto
px-6
py-12
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-12
"
>


{/* BRAND */}

<div>

<div className="flex items-center gap-2 mb-4">

<div
className="
w-7
h-7
flex
items-center
justify-center
"
style={{
background:"rgba(0,212,255,0.1)",
border:"1px solid rgba(0,212,255,0.3)",
borderRadius:"3px"
}}
>

<Wifi
size={13}
className="text-[#00d4ff]"
/>

</div>


<span
style={{
fontFamily:"'Space Mono', monospace",
fontSize:"13px",
letterSpacing:"0.1em",
color:"#e8edf2"
}}
>
IoT
<span className="text-[#00d4ff]">
Club
</span>
</span>


</div>



<p
className="
text-[#6b7a8d]
text-sm
leading-6
max-w-sm
"
>
A student community building connected
devices,
<br/>
one sensor at a time.
</p>

</div>





{/* NAVIGATION */}

<div>

<p
className="
mb-4
text-[#00d4ff]
font-mono
text-[10px]
tracking-widest
uppercase
"
>
Navigate
</p>


<ul className="flex flex-col gap-2">

{links.map((link)=>(

<li key={link.id}>

<button
onClick={() => router.push(link.path)}
className="
text-[#6b7a8d]
hover:text-[#e8edf2]
text-sm
transition-colors
"
>
{link.label}
</button>

</li>

))}

</ul>


</div>







{/* CONTACT */}

<div>

<p
className="
mb-4
text-[#00d4ff]
font-mono
text-[10px]
tracking-widest
uppercase
"
>
Contact
</p>



<div
className="
flex
flex-col
gap-3
text-[#6b7a8d]
text-sm
"
>


<a
href="mailto:ausracing@aus.edu"
className="
flex
items-center
gap-3
hover:text-[#00d4ff]
transition-colors
"
>

<Mail
size={15}
className="text-[#00d4ff]"
/>

ausracing@aus.edu

</a>



<div className="flex items-start gap-3">

<MapPin
size={15}
className="text-[#00d4ff] mt-1"
/>

<span>
American University of Sharjah, UAE
</span>

</div>


</div>





{/* SOCIALS */}

<div
className="
flex
gap-5
mt-6
"
>


<a
href="https://instagram.com/aus_iot"
target="_blank"
rel="noopener noreferrer"
className="
text-[#6b7a8d]
hover:text-[#00d4ff]
transition-colors
"
>
<Instagram size={16}/>
</a>



<a
href="https://www.linkedin.com/company/aus-iot"
target="_blank"
rel="noopener noreferrer"
className="
text-[#6b7a8d]
hover:text-[#00d4ff]
transition-colors
"
>
<Linkedin size={16}/>
</a>



<a
href="https://github.com/IotClubAUS"
target="_blank"
rel="noopener noreferrer"
className="
text-[#6b7a8d]
hover:text-[#00d4ff]
transition-colors
"
>
<Github size={16}/>
</a>


</div>


</div>



</div>








{/* BOTTOM BAR */}

<div
style={{
borderTop:"1px solid rgba(0,212,255,0.06)"
}}
>


<div
className="
max-w-7xl
mx-auto
px-6
py-4
flex
flex-col
sm:flex-row
items-center
justify-between
gap-2
"
>


<p
className="
font-mono
text-[9px]
md:text-[10px]
text-[#6b7a8d]
tracking-wider
"
>
© 2026 IoT Club
</p>



<p
className="
font-mono
text-[9px]
md:text-[10px]
text-[rgba(0,212,255,0.3)]
"
>
connect / build / deploy
</p>


</div>


</div>



</footer>

  );
}