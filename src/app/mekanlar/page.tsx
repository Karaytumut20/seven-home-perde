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
      {content.projects.items.map((item, i) => (
        <article className="atmosphere-card" key={item.slug}>
          <div className="atmosphere-card-meta micro" data-reveal>
            <span>0{i + 1} — {item.subtitle}</span>
            <span>{pages.ui.imageNote}</span>
          </div>
          <Link href={`/mekanlar/${item.slug}`} className="atmosphere-card-image" data-image-reveal>
            <MediaImage src={item.image} alt={item.alt} fill sizes={i === 0 ? "90vw" : "(max-width: 768px) 90vw, 67vw"} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} />
          </Link>
          <div className="atmosphere-card-caption">
            <h2 data-title-reveal><span className="title-line"><span><Link href={`/mekanlar/${item.slug}`}>{item.title}</Link></span></span></h2>
            <div className="atmosphere-card-summary" data-reveal>
              <p>{pages.atmospheres.stories[i].intro}</p>
              <Link className="text-link" href={`/mekanlar/${item.slug}`}>{pages.ui.viewAtmosphere}<Arrow diagonal /></Link>
            </div>
          </div>
        </article>
      ))}
      <p className="media-disclosure">{content.projects.disclaimer}</p>
    </section>
    <ContactCTA />
  </PageLayout>;
}
