import type { NextConfig } from "next";

const SUPABASE_URL = process.env.SUPABASE_URL!;

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async rewrites() {
    return [
      {
        source: '/img/:path*',
        destination: `${SUPABASE_URL}/storage/v1/object/public/:path*`,
      },
    ];
  },
};

export default nextConfig;
