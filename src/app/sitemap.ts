import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { content } from "@/content/site";
import { collections } from "@/data/collections";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.siteUrl) return [];
  const routes = [...content.navigation.map(({ href }) => href), ...collections.map(({ slug }) => `/koleksiyon/${slug}`), ...content.projects.items.map(({ slug }) => `/mekanlar/${slug}`)];
  return routes.map((route) => ({ url: `${siteConfig.siteUrl}${route === "/" ? "" : route}`, changeFrequency: "monthly", priority: route === "/" ? 1 : 0.7 }));
}
