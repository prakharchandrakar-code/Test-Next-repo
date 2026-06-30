import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "devtest.draftforclients.com",
      },
    ],
  },
};

export default nextConfig;
