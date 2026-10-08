import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/products`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    // Note: /admin and nested admin routes are intentionally excluded from sitemap
  ];
}
