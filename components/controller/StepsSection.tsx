import { controllerSteps } from "@/lib/data/controller";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function StepsSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow={controllerSteps.eyebrow} heading={controllerSteps.heading} body={controllerSteps.body} />
        <ol className="steps">
          {controllerSteps.steps.map((step) => (
            <li key={step.index} className="step">
              <span className="step__index">
                / {step.index} / {step.label}
              </span>
              <h3 className="step__title">{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
