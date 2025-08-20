import type { NextConfig } from "next";

// Only enable API proxy rewrites in development
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  async rewrites() {
    if (!isDev) {
      // No rewrites in production
      return [];
    }
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
