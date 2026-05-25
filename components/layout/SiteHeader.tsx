"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, primaryCta } from "@/lib/data/site";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => !href.includes("#") && href !== "/" && pathname.startsWith(href);

  return (
    <header className={cn("nav", open && "nav--open")}>
      <div className="nav__inner">
        <Logo />
        <nav aria-label="Main" className="nav__links">
          {mainNav.map((link) => (
            <Link key={link.href} href={link.href} className={cn(isActive(link.href) && "is-active")}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav__right">
          <ButtonLink href={primaryCta.href} size="sm" withArrow>
            {primaryCta.label}
          </ButtonLink>
          <button
            type="button"
            className="nav__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} size={18} />
          </button>
        </div>
      </div>
      <nav id="mobile-menu" aria-label="Mobile" className="nav__menu" hidden={!open}>
        {mainNav.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <Link href={primaryCta.href}>{primaryCta.label}</Link>
      </nav>
    </header>
  );
}
