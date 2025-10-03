import type { NextConfig } from "next";

import { API_PREFIX } from "./src/app/config";
// Enable API proxy rewrites when backend host/port is available
const backendHost = process.env.BACKEND_HOST || "localhost";
const backendPort = process.env.BACKEND_PORT || "8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: `${API_PREFIX}/:path*`,
        destination: `http://${backendHost}:${backendPort}${API_PREFIX}/:path*`,
      },
    ];
  },
};

export default nextConfig;
