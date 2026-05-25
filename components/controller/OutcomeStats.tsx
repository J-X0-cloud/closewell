import { controllerOutcomes } from "@/lib/data/controller";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function OutcomeStats() {
  return (
    <section className="section section--tight">
      <div className="container">
        <SectionHeader eyebrow={controllerOutcomes.eyebrow} heading={controllerOutcomes.heading} />
        <dl className="big-stats">
          {controllerOutcomes.stats.map((stat) => (
            <div key={stat.label} className="big-stat">
              <dt>
                {stat.value}
                <span>{stat.unit}</span>
              </dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
