import type { NextConfig } from "next";

// Only enable API proxy rewrites in development
const isDev = process.env.NODE_ENV === "development";
const backendHost = process.env.BACKEND_HOST || "localhost";

const nextConfig: NextConfig = {
  async rewrites() {
    if (!isDev) {
      // No rewrites in production
      return [];
    }
    return [
      {
        source: "/api/:path*",
        destination: `http://${backendHost}:8000/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
