import type { Metadata } from "next";
import { controllerFaq } from "@/lib/data/faq";
import { BenefitsSection } from "@/components/controller/BenefitsSection";
import { CapabilityList } from "@/components/controller/CapabilityList";
import { CloseShift } from "@/components/controller/CloseShift";
import { ControllerHero } from "@/components/controller/ControllerHero";
import { OutcomeStats } from "@/components/controller/OutcomeStats";
import { StepsSection } from "@/components/controller/StepsSection";
import { TrustQuote } from "@/components/controller/TrustQuote";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "For Controllers",
  description:
    "Closewell prepares reconciliations, entries with evidence attached and flux notes in plain English. You review and sign off.",
};

export default function ControllersPage() {
  return (
    <>
      <ControllerHero />
      <BenefitsSection />
      <CloseShift />
      <CapabilityList />
      <OutcomeStats />
      <TrustQuote />
      <StepsSection />
      <section id="faq" className="section">
        <div className="container faq-layout">
          <SectionHeader eyebrow="FAQ" heading="Frequently asked questions" align="left" />
          <FaqList items={controllerFaq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
