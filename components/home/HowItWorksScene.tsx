import type { HowItWorksScene as SceneId } from "@/types/content";
import { dataScene, policyScene, reviewScene, workScene } from "@/lib/data/how-it-works";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

/** Illustration for each How-it-works step, drawn in HTML so it stays sharp at any size. */
export function HowItWorksScene({ scene }: { scene: SceneId }) {
  switch (scene) {
    case "data":
      return (
        <div className="scene scene--data">
          <div className="scene__group">
            <span className="scene__label">STRUCTURED DATA</span>
            <div className="chip-row">
              {dataScene.structured.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <span className="scene__hub">{dataScene.hub}</span>
          <div className="scene__group">
            <span className="scene__label">UNSTRUCTURED DATA</span>
            <div className="chip-row">
              {dataScene.unstructured.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <i className="scene__rule" aria-hidden="true" />
          <Badge tone="navy">{dataScene.result}</Badge>
        </div>
      );

    case "policies":
      return (
        <div className="scene scene--policies">
          <div className="scene__panel">
            <span className="scene__label">EVIDENCE INDEXED</span>
            <ul className="scene__list">
              {policyScene.evidence.map((item) => (
                <li key={item}>
                  <Icon name="doc" size={14} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Icon name="arrow-right" size={20} className="scene__arrow" />
          <div className="scene__panel scene__panel--policy">
            <span className="scene__label">POLICY CITED</span>
            <code className="policy-id">{policyScene.policy.id}</code>
            <dl className="scene__fields">
              {policyScene.policy.fields.map((field) => (
                <div key={field.label}>
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      );

    case "work":
      return (
        <ul className="scene scene--work">
          {workScene.map((row) => (
            <li key={row.label} className={row.needsYou ? "is-review" : undefined}>
              <span>{row.label}</span>
              {row.needsYou ? <Avatar initials={row.owner} size="sm" tone="marigold" /> : <Badge tone="navy">{row.owner}</Badge>}
            </li>
          ))}
        </ul>
      );

    case "review":
      return (
        <div className="scene scene--review">
          <dl className="scene__fields">
            {reviewScene.rows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="scene__foot">
            <Icon name="link" size={13} />
            {reviewScene.footer}
          </p>
        </div>
      );
  }
}
