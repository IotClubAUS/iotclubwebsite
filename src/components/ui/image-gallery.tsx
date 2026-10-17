"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageGalleryProps = {
  images: ReadonlyArray<{ src: string; alt: string }>;
  className?: string;
};

export default function ImageGallery({ images, className }: ImageGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openImage = openIndex !== null ? images[openIndex] : null;

  useEffect(() => {
    if (openImage === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openImage]);

  return (
    <>
      <div
        role="region"
        aria-label="Photo gallery"
        className={cn("mx-auto w-full max-w-5xl overflow-x-auto px-1 py-2", className)}
      >
        <div className="flex h-[400px] min-w-[640px] items-center gap-2">
          {images.map((image, index) => (
            <div
              key={image.src}
              tabIndex={0}
              role="button"
              aria-label={`View ${image.alt} fullscreen`}
              onClick={() => setOpenIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setOpenIndex(index);
                }
              }}
              className="relative h-full min-w-0 flex-1 cursor-zoom-in overflow-hidden rounded-lg transition-[flex-grow] duration-500 hover:grow-[5] focus:grow-[5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 motion-reduce:transition-none"
            >
              <img
                className="h-full w-full object-cover object-center"
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {openImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openImage.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label="Close fullscreen view"
            onClick={() => setOpenIndex(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/40 bg-[#0e1520]/80 text-cyan-400 transition hover:bg-cyan-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            <X size={22} />
          </button>

          <img
            src={openImage.src}
            alt={openImage.alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain shadow-[0_0_40px_rgba(0,212,255,.15)]"
          />
        </div>
      )}
    </>
  );
}
