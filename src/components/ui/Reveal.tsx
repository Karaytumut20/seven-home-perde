"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

/** Each material has its own entrance. Native scrolling remains in control. */
export function Reveal({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let started = false;
    let disposed = false;
    let frame = 0;
    const start = () => {
      if (started || disposed) return;
      started = true;
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current;
        if (!root) return;
        root.querySelectorAll<HTMLElement>("[data-title-enter], [data-title-reveal]").forEach((heading) => {
          const lines = heading.querySelectorAll(".title-line > *");
          gsap.from(lines, {
            yPercent: 112, rotate: 1.2, duration: 1.35, stagger: 0.12, ease: "power3.out",
            clearProps: "transform",
            ...(heading.hasAttribute("data-title-reveal") ? { scrollTrigger: { trigger: heading, start: "top 90%", once: true } } : {}),
          });
        });
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, { y: 24, opacity: 0, duration: 1.15, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 91%", once: true } });
        });
        const entries = root.querySelectorAll("[data-enter]");
        if (entries.length) gsap.from(entries, { y: 18, opacity: 0, duration: 1.15, stagger: 0.09, ease: "power3.out", clearProps: "opacity,transform" });
        root.querySelectorAll<HTMLElement>("[data-image-reveal]").forEach((element) => {
          const images = element.querySelectorAll("img");
          const timeline = gsap.timeline({ scrollTrigger: { trigger: element, start: "top 93%", once: true } });
          timeline.fromTo(element, { clipPath: "inset(9% 0% 9% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.65, ease: "power3.out", clearProps: "clipPath" });
          if (images.length) {
            timeline.fromTo(images, { scale: 1.12 }, { scale: 1.065, duration: 1.8, ease: "power3.out" }, 0);
            gsap.fromTo(images, { yPercent: -2.5 }, { yPercent: 2.5, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.9 } });
          }
        });
        ScrollTrigger.refresh();
      }, scope);
    };
    const onReady = () => start();
    window.addEventListener("seven:page-ready", onReady);
    frame = requestAnimationFrame(() => { if (document.documentElement.dataset.pageLoading !== "true") start(); });
    return () => { disposed = true; cancelAnimationFrame(frame); window.removeEventListener("seven:page-ready", onReady); media.revert(); };
  }, [pathname]);

  return <div ref={scope}>{children}</div>;
}
