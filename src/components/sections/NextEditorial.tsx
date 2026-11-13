import Link from "next/link";
import { MediaImage } from "@/components/ui/MediaImage";
import { Arrow } from "@/components/ui/Arrow";

export function NextEditorial({ href, label, title, image, alt }: {
  href: string;
  label: string;
  title: string;
  image: string;
  alt: string;
}) {
  return (
    <aside className="next-editorial section-padding" aria-label={label}>
      <Link href={href} className="next-editorial-link">
        <span className="next-editorial-image" data-image-reveal>
          <MediaImage src={image} alt={alt} fill sizes="(max-width: 768px) 35vw, 25vw" />
        </span>
        <span className="next-editorial-copy">
          <span className="micro">{label}</span>
          <span className="next-editorial-title">{title}</span>
        </span>
        <span className="next-editorial-arrow"><Arrow diagonal /></span>
      </Link>
    </aside>
  );
}
