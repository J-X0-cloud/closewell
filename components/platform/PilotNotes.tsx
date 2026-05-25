import { pilotNotes } from "@/lib/data/platform";
import { Avatar } from "@/components/ui/Avatar";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PilotNotes() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow="Pilot notes" heading="What changes in the first two closes." />
        <div className="pilot">
          {pilotNotes.map((note) => (
            <article key={note.company} className="pilot__card">
              <header>
                <Avatar initials={note.person.initials} size="sm" />
                <span>{note.company}</span>
              </header>
              <p className="pilot__stat">
                <strong>{note.stat.value}</strong>
                <span>{note.stat.label}</span>
              </p>
              <p className="pilot__body">{note.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
