import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/why", destination: "/platform", permanent: true },
      { source: "/controller", destination: "/controllers", permanent: true },
      { source: "/demo", destination: "/get-started", permanent: false },
    ];
  },
};

export default nextConfig;
