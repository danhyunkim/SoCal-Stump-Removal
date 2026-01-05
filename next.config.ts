import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix lockfile warning by specifying the correct root
  outputFileTracingRoot: "/Users/danhyunkim/Desktop/projects/socal-stump-removal",

  // Optional: Enable strict mode for better development
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
