import { principles } from "@/lib/data/platform";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PrinciplesSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow={principles.eyebrow} heading={principles.heading} />
        <ol className="principles">
          {principles.items.map((item, i) => (
            <li key={item} className="principle">
              <span className="principle__index">{String(i + 1).padStart(2, "0")}</span>
              <span className="principle__text">{item}</span>
              <Icon name="check" size={16} strokeWidth={2.4} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
