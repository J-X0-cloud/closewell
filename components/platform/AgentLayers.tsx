import { platformLayers } from "@/lib/data/platform";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Three-tier architecture: the team on top, Closewell in the middle, existing systems below. */
export function AgentLayers() {
  const { team, core, systems } = platformLayers;

  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow={platformLayers.eyebrow} heading={platformLayers.heading} body={platformLayers.body} />
        <div className="layers">
          <div className="layer layer--team">
            <h3>{team.title}</h3>
            <p>{team.body}</p>
          </div>
          <span className="layers__link" aria-hidden="true" />
          <div className="layer layer--core">
            <p className="layer__label">{core.label}</p>
            <h3>
              {core.title}
              <span className="muted">{core.subtitle}</span>
            </h3>
            <ol className="layer__modules">
              {core.modules.map((module) => (
                <li key={module.index}>
                  <span className="layer__index">{module.index}</span>
                  <h4>{module.title}</h4>
                  <p>{module.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <span className="layers__link" aria-hidden="true" />
          <div className="layer layer--systems">
            <h3>{systems.title}</h3>
            <ul className="chip-row chip-row--center">
              {systems.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
