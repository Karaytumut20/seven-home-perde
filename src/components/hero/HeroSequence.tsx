"use client";

import { MediaImage as Image } from "@/components/ui/MediaImage";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_SEQUENCE } from "@/config/site";
import { content } from "@/content/site";
import {
  coverRect,
  frameIndex,
  nearestFrame,
  SequenceLoader,
} from "@/lib/sequence";
import { Arrow } from "@/components/ui/Arrow";
import Link from "next/link";

export function HeroSequence() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const copies = useRef<(HTMLDivElement | null)[]>([]);
  const progressLine = useRef<HTMLSpanElement>(null);
  const sceneNumber = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      {
        desktop: "(min-width: 769px)",
        mobile: "(max-width: 768px)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const root = section.current;
        const surface = canvas.current;
        if (!root || !surface || context.conditions?.reduced) return;
        const mobile = !!context.conditions?.mobile;
        const variant = mobile ? HERO_SEQUENCE.mobile : HERO_SEQUENCE.desktop;
        // No mobile frames means poster mode on mobile, not large desktop downloads.
        root.dataset.sequence = String(variant.frameCount > 0);
        let progress = 0;
        let raf = 0;
        let currentDrawn: HTMLImageElement | undefined;
        let disposed = false;
        let visible = true;
        const ctx = surface.getContext("2d", { alpha: false });
        let loader: SequenceLoader | undefined;

        const draw = () => {
          raf = 0;
          if (disposed || !ctx || !loader || !visible) return;
          const image = nearestFrame(
            loader.frames,
            frameIndex(progress, variant.frameCount),
          );
          if (!image || image === currentDrawn) return;
          const imageRect = coverRect(
            { width: image.naturalWidth, height: image.naturalHeight },
            surface.width,
            surface.height,
          );
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(
            image,
            imageRect.x,
            imageRect.y,
            imageRect.width,
            imageRect.height,
          );
          currentDrawn = image;
          // Expose the displayed source frame for diagnostics without React re-renders.
          surface.dataset.frame = image.src.match(/frame-(\d+)\./)?.[1] || "";
          surface.style.opacity = "1";
        };
        const requestDraw = () => {
          if (!disposed && !raf && visible) raf = requestAnimationFrame(draw);
        };
        const resize = () => {
          if (disposed) return;
          const bounds = surface.getBoundingClientRect();
          const dpr = Math.min(
            window.devicePixelRatio || 1,
            HERO_SEQUENCE.maxDpr,
          );
          surface.width = Math.round(bounds.width * dpr);
          surface.height = Math.round(bounds.height * dpr);
          currentDrawn = undefined;
          cancelAnimationFrame(raf);
          raf = 0;
          requestDraw();
        };
        if (variant.frameCount > 0) {
          loader = new SequenceLoader({
            count: variant.frameCount,
            path: variant.path,
            extension: variant.extension,
            concurrency: HERO_SEQUENCE.concurrency,
            maxCache: HERO_SEQUENCE.maxCachedFrames,
            onFrame: requestDraw,
          });
          loader.seek(0);
        }
        const observer = new IntersectionObserver(
          (entries) => {
            visible = entries[0].isIntersecting;
            loader?.setActive(visible);
            if (visible) requestDraw();
          },
          { rootMargin: "100px" },
        );
        observer.observe(root);
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(surface);
        const indicator = root.querySelector(".hero-scroll");
        let currentCopy = -1;
        const trigger = ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress = self.progress;
            loader?.seek(frameIndex(progress, variant.frameCount));
            requestDraw();
            const index = Math.min(
              content.hero.copy.length - 1,
              Math.floor(progress * content.hero.copy.length),
            );
            if (index !== currentCopy) {
              copies.current.forEach((copy, i) => {
                if (copy)
                  gsap.to(copy, {
                    autoAlpha: i === index ? 1 : 0,
                    y: i === index ? 0 : -16,
                    duration: i === index ? 0.65 : 0.2,
                    delay: i === index ? 0.2 : 0,
                    overwrite: true,
                    ease: "power2.out",
                  });
              });
              currentCopy = index;
              if (sceneNumber.current)
                sceneNumber.current.textContent = String(index + 1).padStart(
                  2,
                  "0",
                );
            }
            gsap.set(progressLine.current, { scaleX: progress });
            if (indicator)
              gsap.set(indicator, { opacity: Math.max(0, 1 - progress * 9) });
          },
        });
        progress = trigger.progress;
        resize();
        const ready = () => {
          if (!disposed) {
            resize();
            ScrollTrigger.refresh();
          }
        };
        void document.fonts.ready.then(ready);
        return () => {
          disposed = true;
          trigger.kill();
          observer.disconnect();
          resizeObserver.disconnect();
          loader?.destroy();
          cancelAnimationFrame(raf);
          const copyElements = copies.current.filter(
            (element): element is HTMLDivElement => !!element,
          );
          if (copyElements.length) {
            gsap.killTweensOf(copyElements);
            gsap.set(copyElements, {
              clearProps: "opacity,visibility,transform",
            });
          }
          if (indicator) gsap.set(indicator, { clearProps: "opacity" });
          surface.style.opacity = "0";
          delete surface.dataset.frame;
          delete root.dataset.sequence;
        };
      },
      section,
    );
    return () => media.revert();
  }, []);

  return (
    <section
      ref={section}
      className="hero-sequence"
      id="anasayfa"
      aria-label="Seven Home — Işığın izinde"
    >
      <div className="hero-sticky">
        <div className="hero-topline micro">
          <span>{content.hero.eyebrow}</span>
          <span>{content.hero.edition}</span>
        </div>
        <div className="hero-visual">
          <div className="hero-poster">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={HERO_SEQUENCE.mobilePoster}
              />
              <Image
                src={HERO_SEQUENCE.poster}
                alt="Tül perdelerin ışıkla hareket ettiği iç mekân; sağlanan videonun ilk karesi."
                fill
                loading="eager"
                fetchPriority="high"
                sizes="100vw"
                unoptimized
              />
            </picture>
          </div>
          <canvas ref={canvas} className="sequence-canvas" aria-hidden="true" />
          <div className="hero-film-meta micro">
            <span>{content.hero.filmLabel}</span>
            <span>{content.hero.location}</span>
          </div>
        </div>
        <div className="hero-content">
          <h1 className="sr-only">
            {content.brand} Perde — {content.hero.copy[0].first}{" "}
            {content.hero.copy[0].second}
          </h1>
          <p className="micro hero-eyebrow">
            <span className="hero-dot" aria-hidden="true" />
            {content.brandDescriptor}
          </p>
          <div className="hero-copy-stack">
            {content.hero.copy.map((copy, index) => (
              <div
                className={`hero-copy hero-copy-${index}`}
                ref={(element) => {
                  copies.current[index] = element;
                }}
                key={copy.first}
                aria-hidden="true"
              >
                <div className="hero-heading">
                  {copy.first}
                  <em>{copy.second}</em>
                </div>
                <p>{copy.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-bottom">
          <Link className="hero-scroll micro" href="/yaklasim">
            <span className="circle-arrow">
              <Arrow />
            </span>
            {content.ui.scroll}
          </Link>
          <p className="micro hero-bottom-note">{content.hero.note}</p>
          <span className="hero-scene micro">
            {content.hero.sceneLabel}
            <span ref={sceneNumber}>01</span>
            <i />0{content.hero.copy.length}
          </span>
        </div>
        <div className="hero-progress" aria-hidden="true">
          <span ref={progressLine} />
        </div>
        <Link href="/koleksiyon" className="hero-collection-link micro">
          {content.ui.discover}
          <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
