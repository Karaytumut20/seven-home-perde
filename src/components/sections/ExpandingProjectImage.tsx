"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MediaImage } from "@/components/ui/MediaImage";
import Link from "next/link";
import { getImageProps } from "next/image";
import { Arrow } from "@/components/ui/Arrow";
import { pages } from "@/content/pages";
import {
  expandedFilmRect,
  filmPlaneTransform,
  type FilmRect,
} from "@/lib/image-expansion";

type ProjectImage = {
  slug: string;
  image: string;
  mobileImage?: string;
  alt: string;
  title: string;
  subtitle: string;
};

/** This effect belongs to the first atmosphere photograph, below the hero. */
export function ExpandingProjectImage({
  project,
  index,
}: {
  project: ProjectImage;
  index: number;
}) {
  const root = useRef<HTMLElement>(null);
  const mobileProps = project.mobileImage
    ? getImageProps({
        src: project.mobileImage,
        alt: project.alt,
        fill: true,
        sizes: "125vw",
        quality: 85,
      }).props
    : null;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const figure = root.current;
        if (!figure) return;
        const track = figure.querySelector<HTMLElement>(
          ".expanding-project-track",
        );
        const stage = figure.querySelector<HTMLElement>(
          ".expanding-project-stage",
        );
        const anchor = figure.querySelector<HTMLElement>(
          ".expanding-project-anchor",
        );
        const visual = figure.querySelector<HTMLElement>(
          ".expanding-project-visual",
        );
        const plane = figure.querySelector<HTMLElement>(
          ".expanding-project-plane",
        );
        const image = plane?.querySelector<HTMLImageElement>("img");
        if (!track || !stage || !anchor || !visual || !plane || !image) return;

        let active = false;
        let disposed = false;
        let raf = 0;
        let width = 0;
        let height = 0;
        let planeWidth = 0;
        let planeHeight = 0;
        let startRect: FilmRect = { x: 0, y: 0, width: 0, height: 0 };

        const render = () => {
          raf = 0;
          if (disposed || !width) return;
          const t = Math.max(0, Math.min(1, playhead.progress / 0.78));
          const expansion = t * t * (3 - 2 * t);
          const rect = expandedFilmRect(startRect, width, height, expansion);
          const transform = filmPlaneTransform(rect, planeWidth, planeHeight);
          visual.style.clipPath = `inset(${rect.y}px ${Math.max(0, width - rect.x - rect.width)}px ${Math.max(0, height - rect.y - rect.height)}px ${rect.x}px)`;
          plane.style.transform = `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`;
          figure.dataset.expansion = expansion.toFixed(3);
        };
        const requestRender = () => {
          if (!disposed && !raf) raf = requestAnimationFrame(render);
        };
        const measure = () => {
          if (disposed) return;
          const bounds = stage.getBoundingClientRect();
          const frame = anchor.getBoundingClientRect();
          width = bounds.width;
          height = bounds.height;
          startRect = {
            x: frame.left - bounds.left,
            y: frame.top - bounds.top,
            width: frame.width,
            height: frame.height,
          };
          const aspect =
            image.naturalWidth && image.naturalHeight
              ? image.naturalWidth / image.naturalHeight
              : 3 / 2;
          planeWidth = Math.max(width, height * aspect);
          planeHeight = planeWidth / aspect;
          plane.style.width = `${planeWidth}px`;
          plane.style.height = `${planeHeight}px`;
          cancelAnimationFrame(raf);
          render();
        };
        const updateHeader = () => {
          if (active && playhead.progress > 0.2)
            document.documentElement.dataset.imageImmersive = "true";
          else delete document.documentElement.dataset.imageImmersive;
        };

        figure.dataset.expanding = "true";
        const playhead = { progress: 0 };
        const animation = gsap.to(playhead, {
          progress: 1,
          ease: "none",
          onUpdate: () => { requestRender(); updateHeader(); },
          scrollTrigger: {
            trigger: track, start: "top top", end: "bottom bottom", scrub: 0.7,
            invalidateOnRefresh: true,
            onRefresh: measure,
            onToggle: (self) => { active = self.isActive; updateHeader(); },
          },
        });
        active = animation.scrollTrigger?.isActive ?? false;
        measure();
        updateHeader();
        const observer = new ResizeObserver(measure);
        observer.observe(stage);
        image.addEventListener("load", measure);
        void document.fonts.ready.then(() => {
          if (!disposed) {
            measure();
            ScrollTrigger.refresh();
          }
        });
        return () => {
          disposed = true;
          animation.scrollTrigger?.kill();
          animation.kill();
          observer.disconnect();
          image.removeEventListener("load", measure);
          cancelAnimationFrame(raf);
          visual.style.removeProperty("clip-path");
          plane.removeAttribute("style");
          delete figure.dataset.expanding;
          delete figure.dataset.expansion;
          delete document.documentElement.dataset.imageImmersive;
        };
      },
      root,
    );
    return () => media.revert();
  }, []);

  return (
    <figure ref={root} className="expanding-project" id="mekan-gunun-ilk-isigi">
      <div className="expanding-project-track">
        <div className="expanding-project-stage">
          <div className="expanding-project-anchor" aria-hidden="true" />
          <div className="expanding-project-visual">
            <div className="expanding-project-plane">
              <picture>
                {mobileProps && (
                  <source
                    media="(max-width: 768px) and (orientation: portrait)"
                    srcSet={mobileProps.srcSet}
                    sizes={mobileProps.sizes}
                  />
                )}
                <MediaImage
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-aspect-ratio: 3/2) 150vh, 100vw"
                  quality={85}
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
      <figcaption>
        <div>
          <span className="micro">0{index + 1}</span>
          <h3><Link href={`/mekanlar/${project.slug}`}>{project.title}</Link></h3>
        </div>
        <Link href="/mekanlar" className="text-link">{pages.ui.allAtmospheres}<Arrow diagonal /></Link>
      </figcaption>
    </figure>
  );
}
