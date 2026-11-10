import Link from "next/link";
import { content } from "@/content/site";
import { pages } from "@/content/pages";
import { MediaImage } from "@/components/ui/MediaImage";
import { Arrow } from "@/components/ui/Arrow";

export function ProcessSection() {
  return (
    <section className="approach-section section-padding" aria-labelledby="approach-title">
      <figure className="approach-portrait"><div className="editorial-photo-plane" data-image-reveal><MediaImage src="/media/atmosphere/texture.webp" alt={content.projects.items[1].alt} fill sizes="(max-width: 768px) 86vw, 38vw" /></div><figcaption className="micro">{pages.ui.imageNote}</figcaption></figure>
      <div className="approach-copy">
        <p className="micro">{pages.home.approachLabel}</p>
        <h2 id="approach-title" data-title-reveal><span className="title-line"><span>{pages.home.approachTitle}</span></span><span className="title-line"><em>{pages.home.approachItalic}</em></span></h2>
        <p className="approach-intro" data-reveal>{pages.home.approachBody}</p>
        <ol className="approach-steps">
          {content.process.steps.map((step, i) => <li key={step.title} data-reveal><span className="micro">0{i + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}
        </ol>
        <Link href="/yaklasim" className="text-link">{pages.ui.approach}<Arrow diagonal /></Link>
      </div>
    </section>
  );
}
