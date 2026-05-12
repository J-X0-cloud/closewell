import { securityHome } from "@/lib/data/trust";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { RolesSection } from "@/components/sections/RolesSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { GuidesSection } from "@/components/home/GuidesSection";
import { HomeHero } from "@/components/home/HomeHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { OutcomesSection } from "@/components/home/OutcomesSection";
import { ScorecardSection } from "@/components/home/ScorecardSection";
import { ShiftSection } from "@/components/home/ShiftSection";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ShiftSection />
      <CapabilitiesSection heading="One agent across the whole close." />
      <OutcomesSection />
      <HowItWorks />
      <RolesSection eyebrow="Who it’s for" />
      <Testimonials />
      <SecuritySection copy={securityHome} />
      <GuidesSection />
      <ScorecardSection />
      <CtaBand />
    </>
  );
}
