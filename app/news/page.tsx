import { Navbar } from "@/app/components/Navbar";
import { NewsPage } from "@/app/components/NewsPage";
import { Footer } from "@/app/components/Footer";

export const metadata = { title: "News — IoT Club" };

export default function News() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#080c10", color: "#e8edf2" }}>
      <Navbar activePath="/news" />
      <main className="flex-1">
        <NewsPage />
      </main>
      <Footer />
    </div>
  );
}
