import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Supabase public storage
        protocol: "https",
        hostname: "awpwjwwowdhznqnoqbrk.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // Supabase signed storage URLs (used for product images)
        protocol: "https",
        hostname: "awpwjwwowdhznqnoqbrk.supabase.co",
        pathname: "/storage/v1/object/sign/**",
      },
      {
        // Supabase render/resizing URLs
        protocol: "https",
        hostname: "awpwjwwowdhznqnoqbrk.supabase.co",
        pathname: "/storage/v1/render/**",
      },
    ],
  },
};

export default nextConfig;
