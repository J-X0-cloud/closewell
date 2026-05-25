import { certifications } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

interface SecuritySectionProps {
  copy: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: { label: string; href: string };
  };
}

export function SecuritySection({ copy }: SecuritySectionProps) {
  return (
    <section id="trust" className="section">
      <div className="container security">
        <div className="security__copy">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="heading">{copy.heading}</h2>
          <p className="lede">{copy.body}</p>
          <ButtonLink href={copy.cta.href} variant="secondary" withArrow>
            {copy.cta.label}
          </ButtonLink>
        </div>
        <ul className="security__badges">
          {certifications.map((cert) => (
            <li key={cert} className="security__badge">
              <Icon name="shield" size={22} strokeWidth={1.6} />
              <span>{cert}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
