import { allNews } from "@/lib/news";
import { notFound } from "next/navigation";
import { Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";

const tagColors: Record<string, string> = {
  Workshop: "#00d4ff",
  Announcement: "#f59e0b",
  Talk: "#a78bfa",
  Project: "#34d399",
  Event: "#f472b6",
};

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const item = allNews.find(
    (news) => news.id.toString() === id
  );

  if (!item) {
    notFound();
  }

  const color = tagColors[item.tag] || "#00d4ff";

  const glow = (strength = 8) =>
    `0 0 ${strength}px ${color}88`;

  return (
    <main
      className="min-h-screen pt-28 pb-20"
      style={{
        background: "#080c10",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* BACK */}
        <Link
          href="/news"
          className="
          inline-flex
          items-center
          gap-2
          mb-8
          text-sm
          text-[#6b7a8d]
          hover:text-[#00d4ff]
          transition-colors
          "
        >
          <ArrowLeft size={14} />
          Back to News
        </Link>


        {/* ARTICLE */}
        <article
          style={{
            background: "#0e1520",
            border: "1px solid rgba(0,212,255,0.12)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >

          {/* IMAGE */}
          <img
            src={item.image}
            alt={item.title}
            className="
            w-full
            h-64
            md:h-[420px]
            object-cover
            "
            style={{
              opacity: 0.8,
            }}
          />


          {/* CONTENT */}
          <div className="p-6 md:p-10">

            <div
              className="
              flex
              items-center
              gap-2
              mb-5
              "
            >
              <Tag
                size={13}
                style={{
                  color,
                }}
              />

              <span
                style={{
                  color,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textShadow: glow(),
                }}
              >
                {item.tag}
              </span>

            </div>


            <h1
              style={{
                color: "#e8edf2",
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(1.8rem,5vw,3rem)",
                lineHeight: 1.2,
                textShadow: glow(12),
              }}
            >
              {item.title}
            </h1>


            <div
              className="
              mt-6
              text-base
              leading-8
              "
              style={{
                color:"#9aa8b8",
              }}
            >
              {item.bio}
            </div>


            {/* Extra article body placeholder */}
            <div
              className="
              mt-8
              leading-8
              "
              style={{
                color:"#6b7a8d",
              }}
            >
              This update covers the latest activities, developments,
              and progress from the IoT Club community.
              More details will be added soon.
            </div>


          </div>

        </article>

      </div>
    </main>
  );
}