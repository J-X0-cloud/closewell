import { capabilities } from "@/lib/data/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CapabilityTabs } from "@/components/capabilities/CapabilityTabs";

const SUBTITLE =
  "Point tools automate one step. Closewell works across revenue, cash, close and reporting, grounded in one shared ledger.";

export function CapabilitiesSection({ heading, id }: { heading: string; id?: string }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <SectionHeader eyebrow="What it does" heading={heading} body={SUBTITLE} />
        <CapabilityTabs capabilities={capabilities} />
      </div>
    </section>
  );
}
