import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/utils/mdx";
import { SITE_URL } from "@/utils/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
  ].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const posts = getAllPostsMeta().map((p) => ({
    url: `${SITE_URL}${p.url}`,
    lastModified: new Date(p.updated || p.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...posts];
}
