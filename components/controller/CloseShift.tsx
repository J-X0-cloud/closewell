import { closeShift } from "@/lib/data/controller";
import { SectionHeader } from "@/components/ui/SectionHeader";

const MAX_DAYS = 10;

export function CloseShift() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow={closeShift.eyebrow} heading={closeShift.heading} body={closeShift.body} />
        <div className="timeline">
          {closeShift.bars.map((bar, i) => (
            <div key={bar.label} className={i === 0 ? "timeline__row" : "timeline__row timeline__row--closewell"}>
              <div className="timeline__meta">
                <b>{bar.label}</b>
                <span>{bar.detail}</span>
              </div>
              <div className="timeline__track" aria-hidden="true">
                <span style={{ width: `${(bar.days / MAX_DAYS) * 100}%` }} />
              </div>
              <strong className="timeline__days">{bar.days} days</strong>
            </div>
          ))}
          <p className="timeline__note">{closeShift.footnote}</p>
        </div>
      </div>
    </section>
  );
}
