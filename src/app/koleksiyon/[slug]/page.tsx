import Link from "next/link";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageIntro";
import { ContactCTA } from "@/components/sections/EditorialSections";
import { MediaImage } from "@/components/ui/MediaImage";
import { Arrow } from "@/components/ui/Arrow";
import { pages } from "@/content/pages";
import { collections } from "@/data/collections";
import { pageMetadata } from "@/lib/metadata";
import { NextEditorial } from "@/components/sections/NextEditorial";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return collections.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = collections.find((collection) => collection.slug === slug);
  if (!item) return {};
  return pageMetadata(item.slug === "ozel" ? item.title : `${item.title} perde`, item.description, `/koleksiyon/${slug}`);
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const index = collections.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const item = collections[index];
  const next = collections[(index + 1) % collections.length];
  return <PageLayout>
    <section className="detail-hero section-padding" aria-labelledby="detail-title">
      <div className="detail-hero-copy">
        <Link href="/koleksiyon" className="micro detail-back" data-enter>{pages.ui.backCollections}<Arrow diagonal /></Link>
        <p className="micro detail-index" data-enter>KOLEKSİYON — 0{index + 1} / 04</p>
        <h1 id="detail-title" data-enter data-long-title={item.title.length > 12 ? "true" : undefined}>{item.title}<span>.</span></h1>
        <p className="detail-subtitle" data-enter><em>{item.subtitle}</em></p>
        <p className="detail-intro" data-enter>{item.description}</p>
        <Link href="/iletisim" className="text-link" data-enter>{pages.ui.contact}<Arrow diagonal /></Link>
      </div>
      <figure className="detail-hero-image" data-enter><MediaImage src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 90vw, 45vw" loading="eager" fetchPriority="high" /><figcaption className="micro">{pages.ui.imageNote}</figcaption></figure>
    </section>
    <section className="detail-story section-padding" aria-labelledby="detail-story-title"><p className="micro">{pages.ui.detail}</p><div><h2 id="detail-story-title" data-reveal>{item.story}</h2><div className="detail-notes">{item.details.map((detail, i) => <article key={detail.title} data-reveal><span className="micro">0{i + 1}</span><h3>{detail.title}</h3><p>{detail.text}</p></article>)}</div></div></section>
    <NextEditorial href={`/koleksiyon/${next.slug}`} label={pages.ui.nextCollection} title={next.title} image={next.image} alt={next.alt} />
    <ContactCTA />
  </PageLayout>;
}
