import { testimonials, testimonialsIntro } from "@/lib/data/testimonials";
import { Avatar } from "@/components/ui/Avatar";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow={testimonialsIntro.eyebrow} heading={testimonialsIntro.heading} body={testimonialsIntro.body} />
        <div className="quotes">
          {testimonials.map(({ quote, author, highlights }) => (
            <figure key={author.name} className="quote">
              <figcaption className="quote__author">
                <Avatar initials={author.initials} />
                <span>
                  <b>{author.name}</b>
                  <span>
                    {author.role}, {author.company}
                  </span>
                </span>
                <span className="quote__company">{author.company}</span>
              </figcaption>
              <blockquote>
                <p>“{quote}”</p>
              </blockquote>
              <dl className="quote__highlights">
                {highlights.map((item) => (
                  <div key={item.label}>
                    <dt>{item.value}</dt>
                    <dd>{item.label}</dd>
                  </div>
                ))}
              </dl>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
