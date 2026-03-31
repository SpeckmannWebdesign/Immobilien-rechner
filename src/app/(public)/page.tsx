import { HeroSection } from "@/components/sections/Hero"
import { TrustSection } from "@/components/sections/Trust"
import { ToolsSection } from "@/components/sections/Tools"
import { FeaturesSection } from "@/components/sections/Features"
import { StatsSection } from "@/components/sections/Stats"
import { TestimonialsSection } from "@/components/sections/Testimonials"
import { PricingSection } from "@/components/sections/Pricing"
import { CtaSection } from "@/components/sections/Cta"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ToolsSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
    </>
  )
}
