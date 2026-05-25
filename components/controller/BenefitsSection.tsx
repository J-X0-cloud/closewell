import { augustClose, controllerBenefits } from "@/lib/data/controller";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function BenefitsSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="For your close"
          heading="What changes for controllers"
          body="What Closewell is built to take off a controller’s plate every month."
        />
        <div className="benefits">
          <Card className="day-one">
            <p className="day-one__title">{augustClose.title}</p>
            <ul className="checklist">
              {augustClose.items.map((item) => (
                <li
                  key={item.label}
                  className={cn("checklist__item", item.state === "done" ? "checklist__item--done" : "checklist__item--review")}
                >
                  <span className="checklist__mark" aria-hidden="true">
                    {item.state === "done" ? <Icon name="check" size={12} strokeWidth={3} /> : null}
                  </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
            <p className="cap-preview__footer">
              <Icon name="link" size={13} />
              {augustClose.footer}
            </p>
          </Card>
          <ol className="benefits__list">
            {controllerBenefits.map((benefit) => (
              <li key={benefit.index} className="benefit">
                <span className="benefit__index">/ {benefit.index}</span>
                <h3 className="benefit__title">{benefit.title}</h3>
                <p className="benefit__body">{benefit.body}</p>
                <p className="benefit__stat">
                  <strong>
                    {benefit.stat.value}
                    {benefit.stat.unit === "%" ? "%" : ` ${benefit.stat.unit}`}
                  </strong>
                  <span>{benefit.stat.label}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
