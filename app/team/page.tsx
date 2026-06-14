import { Navbar } from "@/app/components/Navbar";
import { TeamPage } from "@/app/components/TeamPage";
import { Footer } from "@/app/components/Footer";

export const metadata = { title: "Team — IoT Club" };

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#080c10", color: "#e8edf2" }}>
      <Navbar activePath="/team" />
      <main className="flex-1">
        <TeamPage />
      </main>
      <Footer />
    </div>
  );
}
