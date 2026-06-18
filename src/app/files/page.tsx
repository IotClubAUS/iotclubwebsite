"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { getSupabase } from "@/lib/supabase";
export default function SecretPage() {
  const [count, setCount] = useState<number | null>(null);
const [showPopup, setShowPopup] = useState(false);

const [mouseImgs, setMouseImgs] = useState<
  { id:number; x:number; y:number; rotate:number }[]
>([]);


  useEffect(() => {
    async function trackVisit() {
      const supabase = getSupabase();

      await supabase.rpc("increment_easter_egg");

      const { data } = await supabase
        .from("easter_egg_visits")
        .select("count")
        .eq("id", 1)
        .single();

setCount(data?.count ?? 0);

setTimeout(() => {
  setShowPopup(true);
}, 500);      
    }

    trackVisit();
  }, []);


  function launchConfetti() {
    confetti({
      particleCount: 150,
      spread: 90,
      startVelocity: 45,
      origin: {
        y: 0.6,
      },
      colors: [
        "#00d4ff",
        "#ffffff",
        "#a78bfa",
        "#34d399",
      ],
    });


    // second burst
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        startVelocity: 35,
        origin: {
          x: 0.2,
          y: 0.7,
        },
      });

      confetti({
        particleCount: 80,
        spread: 120,
        startVelocity: 35,
        origin: {
          x: 0.8,
          y: 0.7,
        },
      });
    }, 250);
  }

useEffect(() => {
  let lastSpawn = 0;

  function spawnImage(x: number, y: number) {
    const now = Date.now();

    // slower on all devices
    if (now - lastSpawn < 120) return;

    lastSpawn = now;

    const newImg = {
      id: now,
      x,
      y,
      rotate: Math.random() * 360,
    };

    setMouseImgs((prev) => [
      ...prev.slice(-3),
      newImg,
    ]);

    setTimeout(() => {
      setMouseImgs((prev) =>
        prev.filter((img) => img.id !== newImg.id)
      );
    }, 800);
  }


  function handleMouse(e: MouseEvent) {
    spawnImage(e.clientX, e.clientY);
  }


  function handleTouch(e: TouchEvent) {
    const touch = e.touches[0];

    if (touch) {
      spawnImage(
        touch.clientX,
        touch.clientY
      );
    }
  }


  window.addEventListener(
    "mousemove",
    handleMouse
  );

  window.addEventListener(
    "touchmove",
    handleTouch
  );


  return () => {
    window.removeEventListener(
      "mousemove",
      handleMouse
    );

    window.removeEventListener(
      "touchmove",
      handleTouch
    );
  };

}, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#080c10]">
        {/* SIDE POPUP */}

{showPopup && (
  <img
    src="/files/file_1.webp"
    className="
    fixed
    right-8
    top-1/2
    -translate-y-1/2
w-24 md:w-72
    animate-bounce
    z-50
    "
  />
)}
{showPopup && (
  <img
    src="/files/file_1.webp"
    className="
    fixed
    left-8
    top-1/2
    -translate-y-1/2
w-24 md:w-72
    animate-bounce
    z-50
    "
  />
)}

{/* MOUSE TRAIL */}

{mouseImgs.map((img)=>(
  <img
    key={img.id}
    src="/files/file_2.webp"
    className="
    fixed
    w-16
    h-16
    pointer-events-none
    z-50
    "
    style={{
  left: img.x,
  top: img.y,
  transform:`rotate(${img.rotate}deg)`,
  transition:"all .8s ease-out",
  opacity:1,
}}
  />
))}

      <div className="text-center">

        <h1
          style={{
            color: "#00d4ff",
            fontFamily: "'Space Mono', monospace",
            fontSize: "2rem",
          }}
        >
          Welcome to hashirs easter egg.
        </h1>


        {count !== null && (
          <p className="mt-4 text-gray-400">
            Visitor #{count}
          </p>
        )}


        <button
          onClick={launchConfetti}
          className="
          mt-8
          px-6
          py-3
          border
          border-[#00d4ff]
          text-[#00d4ff]
          font-mono
          hover:bg-[#00d4ff]
          hover:text-black
          transition
          "
        >
          Activate Secret
        </button>

      </div>

    </main>
  );
}

