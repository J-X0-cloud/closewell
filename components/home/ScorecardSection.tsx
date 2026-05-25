import { scorecard } from "@/lib/data/guides";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function ScorecardSection() {
  const { sample } = scorecard;

  return (
    <section className="section">
      <div className="container scorecard">
        <div className="scorecard__copy">
          <Eyebrow>{scorecard.eyebrow}</Eyebrow>
          <h2 className="heading">{scorecard.heading}</h2>
          <p className="lede">{scorecard.body}</p>
          <ButtonLink href={scorecard.cta.href} withArrow>
            {scorecard.cta.label}
          </ButtonLink>
        </div>
        <Card className="scorecard__report">
          <header className="scorecard__report-head">
            <span>{sample.title}</span>
            <span className="muted">{sample.team}</span>
          </header>
          <ul className="meters">
            {sample.metrics.map((metric) => (
              <li key={metric.label} className="meter">
                <span className="meter__label">{metric.label}</span>
                <span className="meter__value">{metric.value}%</span>
                <span className="meter__track" aria-hidden="true">
                  <span className={metric.value < 50 ? "is-low" : undefined} style={{ width: `${metric.value}%` }} />
                </span>
              </li>
            ))}
            <li className="meter meter--empty">
              <span className="meter__label">{sample.yours.label}</span>
              <span className="meter__value">?</span>
              <span className="meter__track" aria-hidden="true" />
            </li>
          </ul>
          <p className="scorecard__note">{sample.yours.note}</p>
        </Card>
      </div>
    </section>
  );
}
