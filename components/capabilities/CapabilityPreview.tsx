import type { CapabilityPreview as Preview } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Sparkline } from "@/components/ui/Sparkline";

/** Product mockup rendered on the right of each capability tab. */
export function CapabilityPreview({ preview }: { preview: Preview }) {
  switch (preview.kind) {
    case "revenue":
      return (
        <Card className="cap-preview">
          <ol className="flow">
            {preview.steps.map((step, i) => (
              <li key={step} className="flow__step">
                <span className="flow__index">{String(i + 1).padStart(2, "0")}</span>
                <span>{step}</span>
                {i === 2 ? <Icon name="check" size={14} className="flow__check" /> : null}
              </li>
            ))}
          </ol>
        </Card>
      );

    case "cash":
      return (
        <Card className="cap-preview">
          <div className="ledger-row ledger-row--ok">
            <Icon name="check" size={14} />
            <span>
              {preview.matched.counterparty} {preview.matched.amount} · auto-posted
            </span>
            <code className="policy-id">{preview.matched.policy}</code>
          </div>
          <div className="ledger-row ledger-row--flag">
            <Icon name="alert" size={14} />
            <span>
              {preview.exception.counterparty} · {preview.exception.amount} over policy, sent to you
            </span>
          </div>
          <div className="cap-preview__chart">
            <span className="mini-panel__label">{preview.forecastLabel}</span>
            <Sparkline values={preview.forecast} width={320} height={70} label="13-week cash forecast" />
          </div>
        </Card>
      );

    case "close":
      return (
        <Card className="cap-preview">
          <ul className="checklist">
            {preview.rows.map((row) => (
              <li key={row.label} className={`checklist__item checklist__item--${row.status}`}>
                <span className="checklist__mark" aria-hidden="true">
                  {row.status === "done" ? <Icon name="check" size={12} strokeWidth={3} /> : null}
                </span>
                <span>{row.label}</span>
              </li>
            ))}
          </ul>
          <p className="cap-preview__footer">{preview.footer}</p>
        </Card>
      );

    case "ar-ap":
      return (
        <Card className="cap-preview">
          <ul className="ledger-list">
            {preview.rows.map((row) => (
              <li key={row.text} className={row.flagged ? "is-flagged" : undefined}>
                <Badge tone={row.ledger === "AR" ? "navy" : "marigold"}>{row.ledger}</Badge>
                <span>{row.text}</span>
              </li>
            ))}
          </ul>
        </Card>
      );

    case "reporting":
      return (
        <Card className="cap-preview">
          <div className="chip-row">
            {preview.entities.map((entity) => (
              <span key={entity} className="chip">
                {entity}
              </span>
            ))}
            <span className="chip chip--active">Consolidated</span>
          </div>
          <dl className="figures">
            {preview.figures.map((figure) => (
              <div key={figure.label}>
                <dt>{figure.label}</dt>
                <dd>{figure.value}</dd>
              </div>
            ))}
          </dl>
          <p className="ledger-row ledger-row--note">
            <Icon name="sparkle" size={14} />
            {preview.note}
          </p>
        </Card>
      );

    case "qa":
      return (
        <Card className="cap-preview">
          <p className="bubble bubble--question">{preview.question}</p>
          <div className="bubble bubble--answer">
            <p>
              {preview.answer.lead} <mark className="cite">{preview.answer.figure}</mark>
              {preview.answer.rest}
            </p>
            <div className="bubble__meta">
              <Badge tone="success">{preview.confidence}</Badge>
              <span>{preview.source}</span>
            </div>
          </div>
        </Card>
      );
  }
}
