import Link from "next/link";
import { PageIntro, PageLayout } from "@/components/layout/PageIntro";
import { pages } from "@/content/pages";
import { Arrow } from "@/components/ui/Arrow";

export default function NotFound() {
  return <PageLayout className="not-found-page"><PageIntro {...pages.notFound} /><div className="section-padding"><Link href="/" className="text-link">{pages.notFound.link}<Arrow diagonal /></Link></div></PageLayout>;
}
