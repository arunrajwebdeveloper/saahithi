import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Image Optimization */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Allow Unsplash images
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "blog-cdn.reedsy.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.designforwriters.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.ingramspark.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "marketplace.canva.com",
        pathname: "**",
      },
      // {
      //   protocol: "https",
      //   hostname: "res.cloudinary.com", // Common for Cloudinary users
      // },
    ],
  },

  /* Compiler Options */
  compiler: {
    // Remove console.logs in production automatically
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
