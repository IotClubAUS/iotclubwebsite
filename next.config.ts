import type { NextConfig } from "next";

const isProd = process.env.GITHUB_PAGES === "true";
const nextConfig: NextConfig = {
  output: "export",

  basePath: isProd ? "/iotclubwebsite" : "",
  assetPrefix: isProd ? "/iotclubwebsite/" : "",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;