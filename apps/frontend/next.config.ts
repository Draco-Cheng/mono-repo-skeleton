import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Rewrites are now handled by middleware.ts for runtime environment variable support
};

export default nextConfig;
