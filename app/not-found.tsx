import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="hero hero--center">
      <div className="container hero__center">
        <p className="eyebrow">404</p>
        <h1 className="display">This page isn’t in the ledger.</h1>
        <p className="lede">The link may be out of date. Head back to the homepage or book a demo.</p>
        <div className="hero__cta">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/get-started" variant="secondary">
            Book a demo
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
