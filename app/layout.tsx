import type { Metadata } from "next";
import "../src/styles/fonts.css";
import "../src/styles/tailwind.css";
import "../styles/theme.css";

export const metadata: Metadata = {
  title: "IoT Club",
  description: "University IoT Club — Connect. Build. Deploy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#080c10", color: "#e8edf2", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
