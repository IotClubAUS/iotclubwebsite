import type { Metadata } from "next";

import "../styles/global.css";
import { Providers } from "./providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Globalloader from "./components/loadingpage/loadingpage";


export const metadata: Metadata = {
  metadataBase: new URL("https://iotclubwebsite.vercel.app"),

  title: "AUS IoT Club",
  description:
    "Building the future through connected systems, embedded hardware, and intelligent automation.",

  openGraph: {
    title: "AUS IoT Club",
    description:
      "Building the future through connected systems, embedded hardware, and intelligent automation.",
    images: ["/news/iot_logo.webp"],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/news/iot_logo.webp"],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Globalloader>
            <div className="min-h-screen flex flex-col">
              <Navbar />

              <main className="flex-1">
                {children}
              </main>

              <Footer />
            </div>
          </Globalloader>
        </Providers>
      </body>
    </html>
  );
}
