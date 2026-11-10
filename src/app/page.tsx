import type { Metadata } from "next";
import { HeroSequence } from "@/components/hero/HeroSequence";
import { CollectionSection } from "@/components/sections/CollectionSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import {
  BrandStatement,
  ProjectsSection,
  ContactCTA,
} from "@/components/sections/EditorialSections";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { ...(siteConfig.siteUrl ? { alternates: { canonical: "/" } } : {}) };

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    name: "Seven Home Perde",
    ...(siteConfig.siteUrl ? { url: siteConfig.siteUrl } : {}),
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    sameAs: [siteConfig.instagramUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Adil Mahallesi, Pelit Sokak No:7/A",
      addressLocality: "Sultanbeyli",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <HeroSequence />
        <div id="icerik" tabIndex={-1}>
          <Reveal>
            <BrandStatement />
            <ProjectsSection />
            <CollectionSection />
            <ProcessSection />
            <ContactCTA />
          </Reveal>
        </div>
      </main>
    </>
  );
}
