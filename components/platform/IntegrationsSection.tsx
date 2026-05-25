import { integrations } from "@/lib/data/platform";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function IntegrationsSection() {
  return (
    <section className="section">
      <div className="container integrations">
        <SectionHeader eyebrow={integrations.eyebrow} heading={integrations.heading} body={integrations.body} align="left" />
        <div>
          <ul className="integrations__grid">
            {integrations.ledgers.map((ledger) => (
              <li key={ledger} className="integrations__tile">
                <span className="integrations__mark" aria-hidden="true">
                  {ledger.charAt(0)}
                </span>
                {ledger}
              </li>
            ))}
          </ul>
          <p className="integrations__note">
            <Icon name="lock" size={14} />
            {integrations.note}
          </p>
        </div>
      </div>
    </section>
  );
}
