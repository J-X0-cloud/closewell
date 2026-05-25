import { platformHero } from "@/lib/data/platform";
import { primaryCta } from "@/lib/data/site";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

export function PlatformHero() {
  const { heading, ledger, agents } = platformHero;

  return (
    <section className="hero hero--platform">
      <div className="container hero__grid">
        <div className="hero__copy">
          <Eyebrow>{platformHero.eyebrow}</Eyebrow>
          <h1 className="display">
            {heading.before}
            <span className="hl">{heading.highlight}</span>
            {heading.after}
          </h1>
          <p className="lede">{platformHero.body}</p>
          <div className="hero__cta">
            <ButtonLink href={primaryCta.href} size="lg" withArrow>
              {primaryCta.label}
            </ButtonLink>
          </div>
          <p className="connects">
            Connects to{" "}
            {platformHero.connectsTo.map((name) => (
              <span key={name} className="connects__item">
                {name}
              </span>
            ))}{" "}
            <span className="muted">{platformHero.connectsMore}</span>
          </p>
        </div>

        <div className="hero__visual stack">
          <Card variant="solid" className="stack__ledger">
            <p className="stack__title">{ledger.title}</p>
            <div className="chip-row">
              {ledger.systems.map((system) => (
                <span key={system} className="chip">
                  {system}
                </span>
              ))}
            </div>
            <p className="stack__note">
              <Icon name="lock" size={13} />
              {ledger.note}
            </p>
          </Card>
          <span className="stack__rail" aria-hidden="true" />
          <Card className="stack__agents">
            <p className="stack__title">
              <Icon name="link" size={14} />
              {agents.title}
            </p>
            <ul className="lanes">
              {agents.lanes.map((lane) => (
                <li key={lane.label}>
                  <span>{lane.label}</span>
                  <b>{lane.value}</b>
                </li>
              ))}
            </ul>
            <div className="lanes__handoff">
              <Avatar initials="DA" size="sm" tone="marigold" />
              <span>{agents.handoff.label}</span>
              <b>{agents.handoff.value}</b>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
