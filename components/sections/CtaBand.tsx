import { ctaBand } from "@/lib/data/trust";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <Eyebrow className="eyebrow--light">{ctaBand.eyebrow}</Eyebrow>
        <h2 className="heading">{ctaBand.heading}</h2>
        <p className="lede">{ctaBand.body}</p>
        <ButtonLink href={ctaBand.cta.href} size="lg" withArrow>
          {ctaBand.cta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
