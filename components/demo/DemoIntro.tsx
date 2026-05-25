import { demoIntro } from "@/lib/data/demo";
import { daniel } from "@/lib/data/testimonials";
import { Avatar } from "@/components/ui/Avatar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

export function DemoIntro() {
  return (
    <div className="demo__intro">
      <Eyebrow>{demoIntro.eyebrow}</Eyebrow>
      <h1 className="display">{demoIntro.heading}</h1>
      <p className="lede">{demoIntro.body}</p>
      <ol className="agenda">
        {demoIntro.agenda.map((item) => (
          <li key={item.index}>
            <span className="agenda__index">{item.index}</span>
            {item.text}
          </li>
        ))}
      </ol>
      <figure className="quote quote--compact">
        <blockquote>
          <p>“{demoIntro.quote}”</p>
        </blockquote>
        <figcaption className="quote__author">
          <Avatar initials={daniel.initials} size="sm" />
          <span>
            <b>{daniel.name}</b>
            <span>
              {daniel.role}, {daniel.company}
            </span>
          </span>
        </figcaption>
      </figure>
      <ul className="assurances">
        {demoIntro.assurances.map((item) => (
          <li key={item}>
            <Icon name="lock" size={13} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
