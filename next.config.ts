import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A lockfile in the home directory would otherwise be taken as the workspace root
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
