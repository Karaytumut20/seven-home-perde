"use client";

import Link from "next/link";
import { useState } from "react";
import { MediaImage } from "@/components/ui/MediaImage";
import { pages } from "@/content/pages";
import { collections } from "@/data/collections";
import { Arrow } from "@/components/ui/Arrow";

export function CollectionSection() {
  const [active, setActive] = useState(1);
  return (
    <section className="collection-showcase section-padding" aria-labelledby="collection-title">
      <div className="showcase-copy">
        <p className="micro">{pages.home.collectionLabel}</p>
        <h2 id="collection-title" data-title-reveal><span className="title-line"><span>{pages.home.collectionTitle}</span></span><span className="title-line"><em>{pages.home.collectionItalic}</em></span></h2>
        <p className="showcase-intro" data-reveal>{pages.home.collectionBody}</p>
        <nav className="collection-directory" aria-label="Perde koleksiyonları">
          {collections.map((item, index) => (
            <Link href={`/koleksiyon/${item.slug}`} key={item.slug} className={active === index ? "is-active" : ""} onPointerEnter={(event) => { if (event.pointerType === "mouse") setActive(index); }} onFocus={() => setActive(index)}>
              <span className="micro">0{index + 1}</span><span>{item.title}</span><Arrow diagonal />
            </Link>
          ))}
        </nav>
        <Link href="/koleksiyon" className="text-link showcase-all">{pages.ui.allCollections}<Arrow diagonal /></Link>
      </div>
      <div className="showcase-art" data-image-reveal>
        <Link href={`/koleksiyon/${collections[active].slug}`} className="showcase-images" aria-label={`${collections[active].title} — ${pages.ui.viewCollection}`}>
          {collections.map((item, index) => <div key={item.slug} className={`showcase-image ${active === index ? "is-active" : ""}`} aria-hidden={active !== index}><MediaImage src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 86vw, 43vw" /><span className="micro showcase-image-label">{item.title} — 0{index + 1}</span></div>)}
        </Link>
        <p className="micro showcase-caption">{pages.ui.imageNote}</p>
      </div>
    </section>
  );
}
