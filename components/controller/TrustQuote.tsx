import { controllerTrust } from "@/lib/data/controller";
import { maya } from "@/lib/data/testimonials";
import { Avatar } from "@/components/ui/Avatar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

export function TrustQuote() {
  const { body } = controllerTrust;

  return (
    <section className="section">
      <div className="container trust">
        <div className="trust__copy">
          <Eyebrow>{controllerTrust.eyebrow}</Eyebrow>
          <h3 className="heading">{controllerTrust.heading}</h3>
          <ul className="cert-row">
            {controllerTrust.badges.map((badge) => (
              <li key={badge}>
                <Icon name="shield" size={14} />
                {badge}
              </li>
            ))}
          </ul>
          <p className="lede">
            {body.before}
            <em>{body.emphasis}</em>
            {body.after}
          </p>
        </div>
        <figure className="quote quote--feature">
          <p className="eyebrow">From the pilot</p>
          <blockquote>
            <p>“{controllerTrust.quote}”</p>
          </blockquote>
          <figcaption className="quote__author">
            <Avatar initials={maya.initials} />
            <span>
              <b>{maya.name}</b>
              <span>
                {maya.role}, {maya.company}
              </span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
