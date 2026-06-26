import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-25");
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/instructions`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/partners`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];
}
