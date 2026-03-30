import { HeroSection } from "@/components/sections/Hero"
import { ToolsSection } from "@/components/sections/Tools"
import { FeaturesSection } from "@/components/sections/Features"
import { StatsSection } from "@/components/sections/Stats"
import { PricingSection } from "@/components/sections/Pricing"
import { CtaSection } from "@/components/sections/Cta"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ToolsSection />
      <FeaturesSection />
      <StatsSection />
      <PricingSection />
      <CtaSection />
    </>
  )
}
