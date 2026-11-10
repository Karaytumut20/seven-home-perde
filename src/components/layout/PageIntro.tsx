import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function PageLayout({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <main id="icerik" tabIndex={-1} className={`interior-page ${className}`}><Reveal>{children}</Reveal></main>;
}

export function PageIntro({ label, title, italic, description }: { label: string; title: string; italic: string; description: string }) {
  return <header className="page-intro section-padding"><p className="micro" data-enter>{label}</p><div className="page-intro-row"><h1 data-title-enter><span className="title-line"><span>{title}</span></span>{" "}<span className="title-line"><em>{italic}</em></span></h1><p className="page-intro-description" data-enter>{description}</p></div></header>;
}
