import { Navbar } from "@/app/components/Navbar";
import { JoinPage } from "@/app/components/JoinPage";
import { Footer } from "@/app/components/Footer";

export const metadata = { title: "Join Us — IoT Club" };

export default function Join() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#080c10", color: "#e8edf2" }}>
      <Navbar activePath="/join" />
      <main className="flex-1">
        <JoinPage />
      </main>
      <Footer />
    </div>
  );
}
