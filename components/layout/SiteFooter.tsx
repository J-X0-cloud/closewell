import Link from "next/link";
import { footerColumns, legalLinks, siteConfig } from "@/lib/data/site";
import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo inverted />
          <p>{siteConfig.tagline}</p>
          <p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title} className="footer__col">
            <h4>{column.title}</h4>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer__bottom">
        <span>
          © {year} {siteConfig.name}, Inc. All rights reserved.
        </span>
        <nav aria-label="Legal">
          {legalLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
