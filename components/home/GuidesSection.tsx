import Link from "next/link";
import { guides, guidesIntro } from "@/lib/data/guides";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function GuidesSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="guides__head">
          <SectionHeader eyebrow={guidesIntro.eyebrow} heading={guidesIntro.heading} body={guidesIntro.body} align="left" />
          <ButtonLink href={guidesIntro.cta.href} variant="text" withArrow>
            {guidesIntro.cta.label}
          </ButtonLink>
        </div>
        <div className="guides">
          {guides.map((guide) => (
            <Link key={guide.title} href={guide.href} className="guide">
              <span className="guide__kind">{guide.kind}</span>
              <h3 className="guide__title">{guide.title}</h3>
              <p className="guide__summary">{guide.summary}</p>
              <span className="guide__action">
                {guide.action}
                <Icon name="arrow-right" size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
