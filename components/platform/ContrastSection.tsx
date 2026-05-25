import { platformContrast } from "@/lib/data/platform";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ContrastSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow={platformContrast.eyebrow} heading={platformContrast.heading} />
        <div className="contrast">
          {platformContrast.rows.map((row) => (
            <article key={row.title} className="contrast__card">
              <h3 className="contrast__title">{row.title}</h3>
              <p className="contrast__now">
                <Icon name="check" size={15} strokeWidth={2.6} />
                {row.now}
              </p>
              <p className="contrast__before">
                <Icon name="close" size={14} />
                <s>{row.before}</s>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
