import type { MetadataRoute } from "next";
import { LANDINGS } from "@/data/destinations";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return Object.values(LANDINGS).map(l => ({
    url: l.path === "/" ? base : `${base}${l.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: l.path === "/" ? 1 : 0.9,
  }));
}
