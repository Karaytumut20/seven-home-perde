"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { content } from "@/content/site";
import { pages } from "@/content/pages";

type LoaderController = { routeCommitted: (pathname: string) => void };

/** The persistent layout needs an opening and a new transition for each route. */
export function IntroLoader() {
  const root = useRef<HTMLDivElement>(null);
  const controller = useRef<LoaderController | null>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const panels = element.querySelectorAll<HTMLElement>(".intro-loader-panel");
    const copy = element.querySelector<HTMLElement>(".intro-loader-copy");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastPath = window.location.pathname;
    let generation = 0;
    let disposed = false;
    let active = false;
    let closing = false;
    let startedAt = 0;
    let opening = true;
    let deadline: ReturnType<typeof setTimeout> | undefined;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;
    let timeline: gsap.core.Timeline | undefined;

    const announceReady = () => {
      delete document.documentElement.dataset.pageLoading;
      window.dispatchEvent(new CustomEvent("seven:page-ready", {
        detail: { pathname: window.location.pathname },
      }));
    };

    const finish = (ticket: number) => {
      if (disposed || ticket !== generation || !active || closing) return;
      closing = true;
      clearTimeout(deadline);
      clearTimeout(finishTimer);
      element.dataset.state = "opening";
      timeline = gsap.timeline({
        onComplete: () => {
          if (disposed || ticket !== generation) return;
          active = false;
          closing = false;
          element.hidden = true;
          element.dataset.state = "idle";
          announceReady();
        },
      });
      timeline.to(copy, {
        opacity: 0,
        y: reduced ? 0 : -10,
        duration: reduced ? 0.12 : 0.3,
        ease: "power2.in",
      });
      timeline.to(panels, {
        xPercent: (index) => index === 0 ? -101 : 101,
        duration: reduced ? 0 : 0.85,
        stagger: reduced ? 0 : 0.03,
        ease: "power3.inOut",
      }, reduced ? 0.12 : 0.16);
      // Reveal starts only after the last covering panel has left the viewport.
    };

    const begin = (isOpening: boolean) => {
      generation += 1;
      const ticket = generation;
      timeline?.kill();
      clearTimeout(deadline);
      clearTimeout(finishTimer);
      active = true;
      closing = false;
      opening = isOpening;
      startedAt = performance.now();
      element.hidden = false;
      delete element.dataset.ready;
      element.dataset.state = "loading";
      element.style.animation = "none";
      document.documentElement.dataset.pageLoading = "true";
      // Install the fail-open timer before doing any animation or media work.
      deadline = setTimeout(() => finish(ticket), 3800);
      gsap.set(panels, { xPercent: 0, scaleX: 1, scaleY: 1 });
      gsap.set(copy, { opacity: 1, y: 0 });
      return ticket;
    };

    const settle = (ticket: number) => {
      const minimum = reduced ? 180 : opening ? 1250 : 700;
      const image = document.querySelector<HTMLImageElement>(
        'main img[fetchpriority="high"], main img[loading="eager"], main img',
      );
      const visualReady = image?.decode().catch(() => {}) ?? Promise.resolve();
      void Promise.allSettled([document.fonts.ready, visualReady]).then(() => {
        if (disposed || ticket !== generation) return;
        const remaining = Math.max(0, minimum - (performance.now() - startedAt));
        clearTimeout(finishTimer);
        finishTimer = setTimeout(() => finish(ticket), remaining);
      });
    };

    const firstTicket = begin(true);
    settle(firstTicket);
    controller.current = {
      routeCommitted: (nextPath) => {
        if (nextPath === lastPath) return;
        lastPath = nextPath;
        // Link clicks start the cover before Next commits. History and programmatic
        // navigation enter here directly, and receive the same visible transition.
        const ticket = active && !closing ? generation : begin(false);
        opening = false;
        settle(ticket);
      },
    };

    const coverInternalNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
          event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.hasAttribute("download") ||
          (anchor.target && anchor.target !== "_self") ||
          anchor.rel.split(/\s+/).includes("external")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin ||
          !["https:", "http:"].includes(url.protocol) ||
          url.pathname === window.location.pathname) return;
      begin(false);
      // Next/link keeps its own navigation, prefetching and keyboard semantics.
      // A canceled or failed navigation simply releases the cover via the deadline.
    };
    document.addEventListener("click", coverInternalNavigation, true);

    return () => {
      disposed = true;
      generation += 1;
      clearTimeout(deadline);
      clearTimeout(finishTimer);
      timeline?.kill();
      document.removeEventListener("click", coverInternalNavigation, true);
      controller.current = null;
      delete document.documentElement.dataset.pageLoading;
    };
  }, []);

  useLayoutEffect(() => {
    controller.current?.routeCommitted(pathname);
  }, [pathname]);

  return (
    <div className="intro-loader" ref={root} data-state="intro" aria-label="Sayfa hazırlanıyor">
      <div className="intro-loader-panel" aria-hidden="true" />
      <div className="intro-loader-panel" aria-hidden="true" />
      <div className="intro-loader-copy">
        <span className="intro-loader-kicker micro" aria-hidden="true">İSTANBUL · PERDE & YAŞAM</span>
        <span className="intro-loader-brand" aria-hidden="true"><span>Seven</span><em>Home</em></span>
        <p aria-hidden="true">{pages.loader.title}</p>
        <span className="intro-loader-line" aria-hidden="true"><i /></span>
        <span className="micro intro-loader-status" role="status">{pages.loader.status}</span>
        <span className="intro-loader-signature micro" aria-hidden="true">{content.brand} — IŞIK, DOKU, MEKÂN</span>
      </div>
      <noscript><style>{".intro-loader{display:none!important}"}</style></noscript>
    </div>
  );
}
