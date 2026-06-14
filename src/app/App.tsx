import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "@/app/page";
import { NewsPage } from "@/app/news/page";
import { TeamPage } from "@/app/team/page";
import { JoinPage } from "@/app/contact/page";
import { Footer } from "./components/Footer";

{/* MARKER-MAKE-KIT-INVOKED */}

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (target: string) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "news":
        return <NewsPage />;
      case "team":
        return <TeamPage />;
      case "join":
        return <JoinPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#080c10", color: "#e8edf2" }}
    >
      <Navbar currentPage={page} onNavigate={navigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
