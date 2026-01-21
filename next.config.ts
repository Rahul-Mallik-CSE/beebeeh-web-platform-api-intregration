/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "l9vtwvjb-8001.inc1.devtunnels.ms",
      },
    ],
  },
};

export default nextConfig;
