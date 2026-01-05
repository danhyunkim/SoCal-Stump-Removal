import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable strict mode for better development
  reactStrictMode: true,

  // Image optimization - using remotePatterns instead of domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'echvrkmwljubodmokncj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
