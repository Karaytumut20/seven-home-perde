import { content } from "@/content/site";
import { siteConfig } from "@/config/site";
import { Arrow } from "@/components/ui/Arrow";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <span className="micro">{content.footer.note}</span>
        <nav className="footer-navigation" aria-label="Alt menü">
          {content.navigation.slice(1).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
      </div>
      <Link href="/" className="footer-wordmark" aria-label="Seven Home — Ana sayfa">
        {content.brand}
      </Link>
      <div className="footer-bottom">
        <span className="micro">
          © {new Date().getFullYear()} {content.brand}
        </span>
        <div>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.ui.instagram}
            <Arrow diagonal />
          </a>
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.ui.directions}
            <Arrow diagonal />
          </a>
        </div>
        <span className="micro">İSTANBUL, TR</span>
      </div>
    </footer>
  );
}
