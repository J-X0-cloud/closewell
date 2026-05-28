import type { Metadata } from "next";
import { platformFaq } from "@/lib/data/faq";
import { platformFaqIntro } from "@/lib/data/platform";
import { securityPlatform } from "@/lib/data/trust";
import { AgentLayers } from "@/components/platform/AgentLayers";
import { BlogFeature } from "@/components/platform/BlogFeature";
import { ContrastSection } from "@/components/platform/ContrastSection";
import { IntegrationsSection } from "@/components/platform/IntegrationsSection";
import { PilotNotes } from "@/components/platform/PilotNotes";
import { PlatformHero } from "@/components/platform/PlatformHero";
import { PrinciplesSection } from "@/components/platform/PrinciplesSection";
import { ProblemStatement } from "@/components/platform/ProblemStatement";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { RolesSection } from "@/components/sections/RolesSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Closewell agents prepare the close, match cash, build revenue schedules and answer questions, grounded in your own ledger and policies.",
};

export default function PlatformPage() {
  return (
    <>
      <PlatformHero />
      <ProblemStatement />
      <ContrastSection />
      <AgentLayers />
      <IntegrationsSection />
      <CapabilitiesSection id="prod" heading="Built for lean finance teams." />
      <PrinciplesSection />
      <RolesSection id="rolesx" eyebrow="By role" />
      <PilotNotes />
      <SecuritySection copy={securityPlatform} />
      <BlogFeature />
      <section id="faq" className="section">
        <div className="container faq-layout">
          <SectionHeader
            eyebrow={platformFaqIntro.eyebrow}
            heading={platformFaqIntro.heading}
            body={platformFaqIntro.body}
            align="left"
          />
          <FaqList items={platformFaq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
