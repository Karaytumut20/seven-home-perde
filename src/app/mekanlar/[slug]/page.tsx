import Link from "next/link";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageIntro";
import { ContactCTA } from "@/components/sections/EditorialSections";
import { MediaImage } from "@/components/ui/MediaImage";
import { Arrow } from "@/components/ui/Arrow";
import { content } from "@/content/site";
import { pages } from "@/content/pages";
import { collections } from "@/data/collections";
import { pageMetadata } from "@/lib/metadata";
import { NextEditorial } from "@/components/sections/NextEditorial";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return content.projects.items.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = content.projects.items.find((item) => item.slug === slug);
  const story = pages.atmospheres.stories.find((item) => item.slug === slug);
  return item && story ? pageMetadata(item.title, story.intro, `/mekanlar/${slug}`) : {};
}
export default async function AtmosphereDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = content.projects.items.find((item) => item.slug === slug);
  const story = pages.atmospheres.stories.find((item) => item.slug === slug);
  if (!item || !story) notFound();
  const collection = collections.find((item) => item.slug === story.collection)!;
  const next = content.projects.items[(content.projects.items.findIndex((project) => project.slug === slug) + 1) % content.projects.items.length];
  return <PageLayout>
    <header className="atmosphere-detail-header section-padding"><Link href="/mekanlar" className="micro detail-back" data-enter>{pages.ui.backAtmospheres}<Arrow diagonal /></Link><p className="micro" data-enter>{item.subtitle}</p><h1 data-enter>{item.title}<span>.</span></h1><p className="atmosphere-detail-intro" data-enter>{story.intro}</p></header>
    <figure className="wide-photograph" data-enter><MediaImage src={item.image} alt={item.alt} fill sizes="100vw" quality={85} loading="eager" fetchPriority="high" /></figure>
    <section className="atmosphere-story section-padding"><p className="micro">{pages.ui.detail}</p><div><h2 data-reveal>{story.title}</h2><p data-reveal>{story.body}</p><ul className="material-notes">{story.notes.map((note) => <li key={note} data-reveal>{note}</li>)}</ul><Link href={`/koleksiyon/${collection.slug}`} className="text-link">{collection.title} koleksiyonunu keşfedin<Arrow diagonal /></Link><p className="media-disclosure">{content.projects.disclaimer}</p></div></section>
    <NextEditorial href={`/mekanlar/${next.slug}`} label={pages.ui.nextAtmosphere} title={next.title} image={next.image} alt={next.alt} />
    <ContactCTA />
  </PageLayout>;
}
