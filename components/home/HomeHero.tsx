import { customerLogos, primaryCta } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WorkflowCard } from "@/components/home/WorkflowCard";

export function HomeHero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <Eyebrow>The AI close agent for finance teams</Eyebrow>
          <h1 className="display">
            Close the books in days, with answers you can <span className="hl">actually cite.</span>
          </h1>
          <p className="lede">
            Closewell agents reconcile accounts, draft entries and answer finance questions from your own ledger and
            policy docs, then hand you the calls that need judgment. Runs on the ERP you already have.
          </p>
          <div className="hero__cta">
            <ButtonLink href={primaryCta.href} size="lg" withArrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href="/#hiw" size="lg" variant="secondary">
              See how it works
            </ButtonLink>
          </div>
          <div className="logos">
            <p className="logos__label">Built for finance teams like</p>
            <ul className="logos__grid">
              {customerLogos.map((name) => (
                <li key={name} className="logos__item">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hero__visual">
          <WorkflowCard />
        </div>
      </div>
    </section>
  );
}
