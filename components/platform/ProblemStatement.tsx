import { platformProblem } from "@/lib/data/platform";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function ProblemStatement() {
  return (
    <section className="section section--tight">
      <div className="container problem">
        <Eyebrow>{platformProblem.eyebrow}</Eyebrow>
        <p className="problem__statement">
          {platformProblem.segments.map((segment) =>
            segment.emphasis ? <em key={segment.text}>{segment.text}</em> : <span key={segment.text}>{segment.text}</span>,
          )}
        </p>
        <ul className="chip-row chip-row--center">
          {platformProblem.tags.map((tag) => (
            <li key={tag} className="chip chip--danger">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
