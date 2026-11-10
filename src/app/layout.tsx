import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import { siteConfig } from "@/config/site";
import { content } from "@/content/site";
import "./globals.css";
import "./editorial.css";
import "./luxury.css";
import "./loader.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntroLoader } from "@/components/layout/IntroLoader";

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl || "http://localhost:3000"),
  title: content.seo.title,
  description: content.seo.description,
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
    locale: "tr_TR",
    type: "website",
    siteName: "Seven Home Perde",
    ...(siteConfig.siteUrl ? { url: siteConfig.siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: content.seo.title,
    description: content.seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a href="#icerik" className="skip-link">
          {content.ui.skip}
        </a>
        <IntroLoader />
        <Header />
        <noscript><nav className="no-script-nav" aria-label="Ana menü">{content.navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav></noscript>
        {children}
        <Footer />
      </body>
    </html>
  );
}
