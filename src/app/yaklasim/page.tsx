import { PageIntro, PageLayout } from "@/components/layout/PageIntro";
import { ContactCTA } from "@/components/sections/EditorialSections";
import { MediaImage } from "@/components/ui/MediaImage";
import { content } from "@/content/site";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Yaklaşımımız", pages.approach.description, "/yaklasim");
export default function ApproachPage() {
  return <PageLayout>
    <PageIntro {...pages.approach} />
    <section className="philosophy section-padding" aria-labelledby="philosophy-title"><figure className="philosophy-image" data-enter><MediaImage src="/media/location/study.webp" alt="Tül perdenin ışıkla buluştuğu pencere detayı; konsept görsel." fill sizes="(max-width: 768px) 90vw, 45vw" loading="eager" fetchPriority="high" /><figcaption className="micro">{pages.ui.imageNote}</figcaption></figure><div><p className="micro" data-reveal>SEVEN HOME / PERDE & YAŞAM</p><h2 id="philosophy-title" data-reveal>{pages.approach.statement}</h2><p data-reveal>{pages.approach.body}</p></div></section>
    <section className="method-section section-padding" aria-labelledby="method-title"><div className="method-heading"><p className="micro">{pages.approach.stepsLabel}</p><h2 id="method-title" data-reveal>{pages.approach.stepsTitle}<br /><em>{pages.approach.stepsItalic}</em></h2></div><ol className="method-steps">{content.process.steps.map((step, i) => <li key={step.title} data-reveal><span className="method-number">0{i + 1}</span><div><h3>{step.title}<span>.</span></h3><p>{pages.approach.steps[i]}</p></div></li>)}</ol></section>
    <ContactCTA />
  </PageLayout>;
}
