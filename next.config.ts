import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Uploadthing UFS CDN (v7)
      { protocol: "https", hostname: "*.ufs.sh" },
      { protocol: "https", hostname: "utfs.io" },
      // Uploadthing legacy CDN
      { protocol: "https", hostname: "uploadthing.com" },
      // Unsplash (demo/seed)
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
