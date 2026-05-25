import { controllerHero } from "@/lib/data/controller";
import { primaryCta } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

export function ControllerHero() {
  return (
    <section className="hero hero--center">
      <div className="container hero__center">
        <Eyebrow>{controllerHero.eyebrow}</Eyebrow>
        <h1 className="display">{controllerHero.heading}</h1>
        <p className="lede">{controllerHero.body}</p>
        <ul className="cert-row">
          {controllerHero.badges.map((badge) => (
            <li key={badge}>
              <Icon name="shield" size={14} />
              {badge}
            </li>
          ))}
        </ul>
        <ButtonLink href={primaryCta.href} size="lg" withArrow>
          {primaryCta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
