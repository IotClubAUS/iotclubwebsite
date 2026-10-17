import {
  Gallery,
  GalleryGrid,
  GalleryImage,
} from "@/components/ui/shared-element-gallery";
import { mediaPhotos } from "@/lib/media";



export default function MediaPage() {
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(0,212,255,.08), transparent 45%)",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,212,255,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="relative z-10">
        {/* HERO */}
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                color: "#00d4ff",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                fontSize: "12px",
              }}
            >
              Internet of Things Club
            </p>

            <h1
              className="mt-6"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(3rem,8vw,5.5rem)",
                color: "#e8edf2",
                textShadow:
                  "0 0 20px rgba(0,212,255,.15), 0 0 40px rgba(0,212,255,.1)",
                lineHeight: 1,
              }}
            >
              Media &<br />
              Gallery.
            </h1>

            <p
              className="mx-auto mt-8 max-w-3xl"
              style={{
                color: "#6b7a8d",
                fontSize: "1.1rem",
                lineHeight: 1.8,
              }}
            >
              Photos
            </p>

            <div className="mt-12">
              <a
                href="/assets/media-kit.zip"
                download
                className="inline-flex items-center justify-center px-10 py-4 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{
                  textShadow: "0 0 8px rgba(255,255,255,.3)",
                  background: "#15d4ff",
                  color: "#080c10",
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  borderRadius: "6px",
                  boxShadow: "0 0 25px rgba(0,212,255,.15)",
                }}
              >
                Download Brand Kit
              </a>
            </div>
          </div>
        </section>

        {/* EXPANDING GALLERY */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <h2
              className="mb-10"
              style={{
                fontFamily: "'Space Mono', monospace",
                color: "#e8edf2",
                fontSize: "2rem",
              }}
            >
              <span style={{ color: "#00d4ff" }}>//</span> Photos
            </h2>

            <Gallery>
              <GalleryGrid>
                {mediaPhotos.map((photo) => (
                  <GalleryImage
                    key={photo.id}
                    id={String(photo.id)}
                    src={photo.imageUrl}
                    alt={photo.title}
                  />
                ))}
              </GalleryGrid>
            </Gallery>
          </div>
        </section>
      </div>
    </div>
  );
}
