import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      // Google Drive / Google user content (presenter portraits from Drive)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      // Google Photos
      {
        protocol: "https",
        hostname: "photos.google.com",
      },
      // Instagram CDN (reel / profile images)
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
      },
      // Lemon Squeezy product images (future)
      {
        protocol: "https",
        hostname: "*.lemonsqueezy.com",
      },
    ],
  },
};

export default nextConfig;
