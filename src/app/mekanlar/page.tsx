import Link from "next/link";
import { PageIntro, PageLayout } from "@/components/layout/PageIntro";
import { ContactCTA } from "@/components/sections/EditorialSections";
import { MediaImage } from "@/components/ui/MediaImage";
import { Arrow } from "@/components/ui/Arrow";
import { content } from "@/content/site";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Mekânlar", pages.atmospheres.description, "/mekanlar");
export default function AtmospheresPage() {
  return <PageLayout>
    <PageIntro {...pages.atmospheres} />
    <section className="atmosphere-gallery section-padding" aria-label="Mekân hikâyeleri">
      {content.projects.items.map((item, i) => <article className="atmosphere-card" key={item.slug} data-reveal><Link href={`/mekanlar/${item.slug}`} className="atmosphere-card-image"><MediaImage src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 90vw, 85vw" loading={i === 0 ? "eager" : "lazy"} /></Link><div className="atmosphere-card-caption"><div><span className="micro">0{i + 1} — {item.subtitle}</span><h2><Link href={`/mekanlar/${item.slug}`}>{item.title}</Link></h2></div><Link className="text-link" href={`/mekanlar/${item.slug}`}>{pages.ui.viewAtmosphere}<Arrow diagonal /></Link></div></article>)}
      <p className="media-disclosure">{content.projects.disclaimer}</p>
    </section>
    <ContactCTA />
  </PageLayout>;
}
