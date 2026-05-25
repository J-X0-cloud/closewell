import { cfoPreview, controllerPreview, roles, rolesIntro } from "@/lib/data/roles";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Sparkline } from "@/components/ui/Sparkline";

export function RolesSection({ eyebrow, id }: { eyebrow: string; id?: string }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <SectionHeader eyebrow={eyebrow} heading={rolesIntro.heading} body={rolesIntro.body} />
        <div className="roles">
          {roles.map((role) => (
            <article key={role.id} className="role">
              <div className="role__preview">{role.id === "cfo" ? <CfoPreview /> : <ControllerPreview />}</div>
              <p className="role__eyebrow">{role.eyebrow}</p>
              <h3 className="role__title">{role.title}</h3>
              <p className="role__body">{role.body}</p>
              <ButtonLink href={role.cta.href} variant="text" withArrow>
                {role.cta.label}
              </ButtonLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CfoPreview() {
  return (
    <Card variant="solid" className="mini-panel">
      <div className="mini-panel__row">
        <span className="mini-panel__label">{cfoPreview.label}</span>
        <Badge tone="navy">{cfoPreview.mode}</Badge>
      </div>
      <p className="mini-panel__figure">{cfoPreview.value}</p>
      <div className="mini-panel__row">
        <span className="mini-panel__label">{cfoPreview.trendLabel}</span>
        <span className="mini-panel__label">{cfoPreview.entitiesLabel}</span>
      </div>
      <Sparkline values={cfoPreview.trend} width={220} height={44} className="mini-panel__spark" label="Consolidated revenue trend" />
      <div className="chip-row">
        {cfoPreview.entities.map((entity) => (
          <span key={entity} className="chip">
            {entity}
          </span>
        ))}
      </div>
    </Card>
  );
}

function ControllerPreview() {
  return (
    <Card variant="solid" className="mini-panel">
      <div className="mini-panel__row">
        <span className="mini-panel__label">{controllerPreview.label}</span>
        <strong className="mini-panel__progress">{controllerPreview.progress}</strong>
      </div>
      <div className="progress" aria-hidden="true">
        <span style={{ width: "80%" }} />
      </div>
      <ul className="mini-panel__list">
        {controllerPreview.rows.map((row) => (
          <li key={row.label}>
            <span>{row.label}</span>
            <Badge tone={row.status === "Complete" ? "success" : "marigold"} dot>
              {row.status}
            </Badge>
          </li>
        ))}
      </ul>
      <Badge tone="navy">{controllerPreview.footer}</Badge>
    </Card>
  );
}
