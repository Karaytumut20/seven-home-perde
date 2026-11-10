import Link from "next/link";
import { MediaImage } from "@/components/ui/MediaImage";
import { content } from "@/content/site";
import { pages } from "@/content/pages";
import { siteConfig } from "@/config/site";
import { Arrow } from "@/components/ui/Arrow";
import { ExpandingProjectImage } from "@/components/sections/ExpandingProjectImage";

export function BrandStatement() {
  return (
    <section className="story-intro section-padding" aria-labelledby="story-title">
      <div className="story-margin"><p className="micro">{pages.home.statementLabel}</p><span className="story-line" aria-hidden="true" /></div>
      <div className="story-body">
        <h2 id="story-title" data-title-reveal><span className="title-line"><span>{pages.home.statement}</span></span><span className="title-line"><em>{pages.home.statementItalic}</em></span></h2>
        <div className="story-bottom">
          <figure className="story-swatch" data-image-reveal><MediaImage src="/media/collections/tul.webp" alt="Gün ışığında tül dokusu; konsept görsel." fill sizes="(max-width: 768px) 28vw, 14vw" /></figure>
          <div data-reveal><p>{pages.home.statementBody}</p><Link href="/yaklasim" className="text-link">{pages.ui.approach}<Arrow diagonal /></Link></div>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section className="atmosphere-feature" aria-labelledby="atmosphere-title">
      <div className="atmosphere-heading section-padding">
        <p className="micro" data-reveal>{pages.home.atmosphereLabel}</p>
        <h2 id="atmosphere-title" data-title-reveal><span className="title-line"><span>{pages.home.atmosphereTitle}</span></span><span className="title-line"><em>{pages.home.atmosphereItalic}</em></span></h2>
        <p className="atmosphere-intro" data-reveal>{pages.home.atmosphereBody}</p>
      </div>
      <ExpandingProjectImage project={content.projects.items[0]} index={0} />
      <div className="atmosphere-foot section-padding">
        <p className="concept-note">{pages.ui.imageNote}</p>
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="visit-invitation section-padding" aria-labelledby="visit-title">
      <div className="visit-image" data-image-reveal><MediaImage src="/media/location/study.webp" alt="Pencere ve tül kumaşta ışık detayı; konsept görsel." fill sizes="(max-width: 768px) 42vw, 24vw" /></div>
      <p className="micro" data-reveal>{pages.home.visitLabel}</p>
      <h2 id="visit-title" data-title-reveal><span className="title-line"><span>{pages.home.visitTitle}</span></span><span className="title-line"><em>{pages.home.visitItalic}</em></span></h2>
      <div className="visit-bottom" data-reveal>
        <div><p>{pages.home.visitBody}</p><address>{siteConfig.address}</address></div>
        <Link href="/iletisim" className="round-link"><span>{pages.ui.contactPage}</span><span className="round-link-icon"><Arrow diagonal /></span></Link>
      </div>
    </section>
  );
}
