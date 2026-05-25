import { homeOutcomes } from "@/lib/data/outcomes";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function OutcomesSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Outcomes"
          heading="What changes after the first close."
          body="What Closewell is designed to give back to a finance team."
        />
        <div className="outcomes">
          {homeOutcomes.map((outcome) => (
            <article key={outcome.title} className="outcome">
              <h3 className="outcome__title">{outcome.title}</h3>
              <p className="outcome__body">{outcome.body}</p>
              <p className="outcome__stat">
                <strong>{outcome.stat}</strong>
                <span>{outcome.statLabel}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
