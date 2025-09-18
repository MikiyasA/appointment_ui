import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['lh3.googleusercontent.com'],
    remotePatterns: [new URL('http://localhost:8000/uploads/**')]
  },
};

export default nextConfig;
