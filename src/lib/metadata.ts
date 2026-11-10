import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | Seven Home Perde`;
  return {
    title: fullTitle,
    description,
    ...(siteConfig.siteUrl ? { alternates: { canonical: path } } : {}),
    openGraph: { title: fullTitle, description, locale: "tr_TR", type: "website", siteName: "Seven Home Perde", ...(siteConfig.siteUrl ? { url: `${siteConfig.siteUrl}${path}` } : {}) },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
