import Link from "next/link";
import { PageLayout } from "@/components/layout/PageIntro";
import { ContactCTA } from "@/components/sections/EditorialSections";
import { MediaImage } from "@/components/ui/MediaImage";
import { Arrow } from "@/components/ui/Arrow";
import { pages } from "@/content/pages";
import { collections } from "@/data/collections";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Koleksiyon", pages.collection.description, "/koleksiyon");

export default function CollectionsPage() {
  return (
    <PageLayout className="collection-page">
      <header className="collection-prologue section-padding">
        <div className="prologue-top micro" data-enter>
          <span>{pages.collection.label}</span>
          <span>SEVEN HOME / 01—04</span>
        </div>
        <figure className="prologue-photograph" data-image-reveal>
          <MediaImage src="/media/hero/desktop-hq/frame-0180.jpg" alt="Gün ışığıyla hareket eden tül perdeler; sağlanan videodan bir kare." fill sizes="(max-width: 768px) 90vw, 58vw" loading="eager" fetchPriority="high" unoptimized />
        </figure>
        <h1 className="prologue-title" data-title-enter>
          <span className="title-line"><span>{pages.collection.title}</span></span>
          {" "}<span className="title-line"><em>{pages.collection.italic}</em></span>
        </h1>
        <div className="prologue-bottom">
          <p data-enter>{pages.collection.description}</p>
          <nav className="collection-index" aria-label="Koleksiyon seçkisi" data-enter>
            {collections.map((item, i) => <Link href={`/koleksiyon/${item.slug}`} key={item.slug}><span>0{i + 1}</span>{item.title}<Arrow diagonal /></Link>)}
          </nav>
        </div>
        <span className="prologue-rule" aria-hidden="true" />
      </header>
      <section className="collection-chapters section-padding" aria-label="Dokuların hikâyesi">
        {collections.map((item, index) => (
          <article className={`collection-chapter chapter-${item.slug}`} key={item.slug}>
            <Link href={`/koleksiyon/${item.slug}`} className="chapter-photograph" data-image-reveal aria-label={`${item.title} — ${pages.ui.viewCollection}`}>
              <MediaImage src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 90vw, 53vw" />
              <span className="chapter-photo-note micro">{pages.ui.imageNote}</span>
            </Link>
            <div className="chapter-copy">
              <p className="chapter-folio micro" data-reveal><span>0{index + 1}</span><span>SEVEN HOME KOLEKSİYONU</span></p>
              <h2 data-title-reveal><span className="title-line"><span><Link href={`/koleksiyon/${item.slug}`}>{item.title}</Link></span></span></h2>
              <p className="chapter-subtitle" data-reveal><em>{item.subtitle}</em></p>
              <p className="chapter-description" data-reveal>{item.description}</p>
              <Link href={`/koleksiyon/${item.slug}`} className="text-link" data-reveal>{pages.ui.viewCollection}<Arrow diagonal /></Link>
            </div>
          </article>
        ))}
      </section>
      <ContactCTA />
    </PageLayout>
  );
}
