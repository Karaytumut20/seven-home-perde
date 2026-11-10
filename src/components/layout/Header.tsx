"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { content } from "@/content/site";
import { siteConfig } from "@/config/site";
import { Arrow } from "@/components/ui/Arrow";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const returnFocus = toggle.current;
    if (!element) return;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      returnFocus?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <Link
          href="/"
          className="wordmark"
          aria-label="Seven Home — Ana sayfa"
        >
          <svg
            className="brand-symbol"
            width="32"
            height="42"
            viewBox="0 0 32 42"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 4h28L13 38M8 4v24M15 4v14M22 4v5"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
          <span className="wordmark-name">
            {content.brand}
            <small>{content.brandDescriptor}</small>
          </span>
        </Link>
        <div className="header-right">
          <nav className="header-links" aria-label="Hızlı erişim">
            {content.navigation.slice(1).map((item) => (
              <Link href={item.href} key={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            ref={toggle}
            className="menu-toggle"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-haspopup="dialog"
          >
            {content.ui.menu}
            <span className="menu-icon">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="site-menu"
        className="menu-dialog"
        aria-label="Ana menü"
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      >
        <div className="menu-top">
          <span className="wordmark">
            <span className="wordmark-name">
              {content.brand}
              <small>{content.brandDescriptor}</small>
            </span>
          </span>
          <button className="menu-toggle" onClick={() => setOpen(false)}>
            {content.ui.close}
            <span aria-hidden="true" className="close-icon">
              ×
            </span>
          </button>
        </div>
        <nav aria-label="Ana menü">
          {content.navigation.map((item, i) => (
            <Link href={item.href} key={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}>
              <span className="micro">0{i + 1}</span>
              <span>{item.label}</span>
              <Arrow diagonal />
            </Link>
          ))}
        </nav>
        <div className="menu-bottom">
          <span>{siteConfig.address}</span>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.contact.handle}
            <Arrow diagonal />
          </a>
        </div>
      </dialog>
    </>
  );
}
