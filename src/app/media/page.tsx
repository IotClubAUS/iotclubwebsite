"use client";

const photos = [
  {
    id: 1,
    title: "AUS Engineers robot at a cultural event",
    imageUrl: "/media/gallery/robot-cultural-event.jpeg",
  },
  {
    id: 2,
    title: "Humanoid and mobile robots on campus",
    imageUrl: "/media/gallery/robots-campus-demo.jpeg",
  },
  {
    id: 3,
    title: "Another view of the campus robot demonstration",
    imageUrl: "/media/gallery/robots-campus-demo-alternate.jpeg",
  },
  {
    id: 4,
    title: "Collectibles and plush toys at a club display",
    imageUrl: "/media/gallery/club-display.jpeg",
  },
  {
    id: 5,
    title: "Event attendee posing on campus",
    imageUrl: "/media/gallery/club-fair.jpg",
  },
];

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

        {/* GALLERY GRID */}
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

            <div className="grid md:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                  style={{
                    background: "#0e1520",
                    border: "1px solid rgba(0,212,255,.15)",
                    borderRadius: "10px",
                    cursor: "default",
                  }}
                >
                  <div
                    className="aspect-[3/4] w-full flex items-center justify-center"
                    style={{
                      background: "rgba(0,212,255,.02)",
                      borderBottom: "1px solid rgba(0,212,255,.1)",
                    }}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
