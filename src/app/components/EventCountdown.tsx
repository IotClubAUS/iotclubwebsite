"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Radio } from "lucide-react";


const EVENT_DATE = new Date(
  "2026-09-25T15:00:00+04:00"
).getTime();


// YYYY MM  DD   time   zone

function calculateTime(){

const now = Date.now();

const difference = EVENT_DATE - now;


if(difference <= 0){
return {
days:0,
hours:0,
minutes:0,
seconds:0
}
}


return {

days:Math.floor(
difference/(1000*60*60*24)
),

hours:Math.floor(
(difference/(1000*60*60))%24
),

minutes:Math.floor(
(difference/(1000*60))%60
),

seconds:Math.floor(
(difference/1000)%60
)

}

}



export default function EventCoutdown(){

const [time,setTime]=useState(calculateTime());


useEffect(()=>{

const interval=setInterval(()=>{

setTime(calculateTime());

},1000);


return ()=>clearInterval(interval);


},[]);



const values=[
["DAYS",time.days],
["HRS",time.hours],
["MIN",time.minutes],
["SEC",time.seconds]
];


return (

<section
className="
relative
overflow-hidden
border-y
border-cyan-400/20
bg-[#0e1520]
"
>


{/* background glow */}

<div
className="
absolute
inset-0
bg-gradient-to-r
from-cyan-400/10
via-transparent
to-cyan-400/10
"
/>


<div
className="
relative
max-w-7xl
mx-auto
px-6
py-6
flex
flex-col
lg:flex-row
items-center
justify-between
gap-6
"
>


{/* Event info */}

<div
className="
flex
items-center
gap-4
"
>


<div
className="
hidden
sm:flex
w-12
h-12
rounded-xl
bg-cyan-400/10
border
border-cyan-400/30
items-center
justify-center
"
>

<Radio
size={24}
color="#00d4ff"
/>

</div>



<div>


<p
className="
text-cyan-400
font-mono
text-xs
tracking-[0.25em]
"
>
UPCOMING EVENT
</p>


<h3
className="
text-white
font-mono
text-lg
md:text-xl
"
>


{/* NAME of event*/}

Week of Welcome Event




</h3>

<div
className="
mt-2
flex
items-center
gap-2
text-gray-400
font-mono
text-xs
"
>

<svg
xmlns="http://www.w3.org/2000/svg"
width="14"
height="14"
viewBox="0 0 24 24"
fill="none"
stroke="#00d4ff"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"
>
<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/>
<circle cx="12" cy="10" r="3"/>
</svg>


<span>
AUS student Center</span>


</div>

</div>


</div>


{/* Countdown */}

<div
className="
flex
items-center
gap-3
"
>


{
values.map(([label,value])=>(

<div
key={label}
className="
text-center
min-w-[55px]
"
>

<p
className="
text-xl
md:text-2xl
font-mono
text-cyan-400
"
>
{
String(value).padStart(2,"0")
}
</p>


<p
className="
text-[10px]
text-gray-500
font-mono
tracking-widest
"
>
{label}
</p>


</div>

))
}



</div>



{/* Button */}

<button
className="
group
flex
items-center
gap-2
px-5
py-2.5
rounded-lg
bg-cyan-400
text-black
font-mono
text-sm
font-bold
hover:shadow-[0_0_30px_rgba(0,212,255,.5)]
transition
"
>

Register
<ArrowRight
size={15}
className="
group-hover:translate-x-1
transition
"
/>

</button>



</div>


</section>

)

}