import { Navbar } from "@/app/components/Navbar";
import { HomePage } from "@/app/components/HomePage";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#080c10", color: "#e8edf2" }}>
      <Navbar activePath="/" />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}
