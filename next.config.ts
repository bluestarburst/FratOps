import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/__/auth/:path*',
          destination: `https://fratops-6a6cf.firebaseapp.com/__/auth/:path*`
        }
      ],
      afterFiles: [],
      fallback: []
    }
  },
};

export default nextConfig;
