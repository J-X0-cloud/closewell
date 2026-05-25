import { controllerCapabilities } from "@/lib/data/controller";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function CapabilityList() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow="Capabilities" heading="What Closewell does for controllers" />
        <ol className="cap-list">
          {controllerCapabilities.map((capability) => (
            <li key={capability.index} className="cap-list__item">
              <span className="cap-list__index">/ {capability.index}</span>
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
              <Badge tone={capability.tag.includes("flagged") ? "marigold" : "navy"} dot>
                {capability.tag}
              </Badge>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
