import { PageIntro, PageLayout } from "@/components/layout/PageIntro";
import { MediaImage } from "@/components/ui/MediaImage";
import { Arrow } from "@/components/ui/Arrow";
import { content } from "@/content/site";
import { pages } from "@/content/pages";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("İletişim", pages.contact.description, "/iletisim");
export default function ContactPage() {
  return <PageLayout className="contact-page">
    <PageIntro {...pages.contact} />
    <section className="contact-editorial section-padding" aria-label="İletişim bilgileri"><div className="contact-info">
      <div className="contact-info-block" data-reveal><p className="micro">{pages.contact.visit}</p><address>{content.location.addressLines.map((line) => <span key={line}>{line}</span>)}</address><a className="text-link" href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">{content.ui.directions}<Arrow diagonal /></a></div>
      <div className="contact-info-block" data-reveal><p className="micro">{pages.contact.write}</p><a className="contact-social" href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">{content.contact.handle}<Arrow diagonal /></a>
        {siteConfig.phone && <a className="text-link" href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}>{content.ui.phone}<Arrow diagonal /></a>}
        {siteConfig.whatsapp && <a className="text-link" href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">{content.ui.whatsapp}<Arrow diagonal /></a>}
        {siteConfig.email && <a className="text-link" href={`mailto:${siteConfig.email}`}>{content.ui.email}<Arrow diagonal /></a>}
      </div><div className="contact-preparation" data-reveal><h2>{pages.contact.prepareTitle}</h2><p>{pages.contact.prepareBody}</p></div>
    </div><figure className="contact-photograph" data-enter><MediaImage src="/media/collections/ozel.webp" alt="Bir pencereyi çevreleyen kumaş katmanları; mağaza fotoğrafı olmayan konsept görsel." fill sizes="(max-width: 768px) 90vw, 42vw" loading="eager" /><figcaption className="micro">{pages.ui.imageNote}</figcaption></figure></section>
  </PageLayout>;
}
