import type { Metadata } from "next";
import CapybaraLive from "@/components/capybara-live";

export const metadata: Metadata = {
  title: "Capybara Quest · AUS IoT Club",
  robots: { index: false },
};

export default function CapybaraHuntPage() {
  return <CapybaraLive />;
}
