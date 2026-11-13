const address = "Adil Mahallesi, Pelit Sokak No:7/A, Sultanbeyli, İstanbul";

function validSiteUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.origin : undefined;
  } catch {
    return undefined;
  }
}

export const siteConfig = {
  siteUrl: validSiteUrl(process.env.SITE_URL),
  instagramUrl: "https://www.instagram.com/sevenhomeperde/",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Seven Home Perde ${address}`)}`,
  phone: process.env.NEXT_PUBLIC_PHONE?.trim() || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "",
  email: process.env.NEXT_PUBLIC_EMAIL?.trim() || "",
  address,
} as const;

export type SequenceVariant = {
  frameCount: number;
  path: string;
  extension: string;
  bundlePath: string;
};

// User-supplied 240-frame video, plus a lighter portrait sequence.
// Mobile keeps every other source frame and includes the final frame (121 total).
// Set a variant's frameCount to 0 to switch it back to poster-only mode.
export const HERO_SEQUENCE = {
  desktop: {
    frameCount: 240,
    path: "/media/hero/desktop-hq",
    extension: "jpg",
    bundlePath: "/media/hero/packed-v1/desktop",
  },
  mobile: { frameCount: 121, path: "/media/hero/mobile-hq", extension: "jpg", bundlePath: "/media/hero/packed-v1/mobile" },
  poster: "/media/hero/desktop-hq/frame-0001.jpg",
  mobilePoster: "/media/hero/mobile-hq/frame-0001.jpg",
  maxDpr: 2,
  concurrency: 3,
  bundleSize: 32,
  scrubSeconds: 0.65,
  maxCachedFrames: 18,
} satisfies {
  desktop: SequenceVariant;
  mobile: SequenceVariant;
  poster: string;
  mobilePoster: string;
  maxDpr: number;
  concurrency: number;
  bundleSize: number;
  scrubSeconds: number;
  maxCachedFrames: number;
};
