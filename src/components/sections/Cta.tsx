"use client"

import Link from "next/link"
import { useSectionReveal } from "@/components/animations/useSectionReveal"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  const sectionRef = useSectionReveal()

  return (
    <section
      ref={sectionRef}
      className="relative py-[clamp(7rem,15vw,14rem)] px-6 bg-[#0B0D14] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(67, 56, 202, 0.35) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        <h2
          data-reveal
          className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#F1F5F9] mb-6"
        >
          Verwandeln Sie Ihre Website in eine{" "}
          <span className="text-gradient-hero">Lead-Maschine.</span>
        </h2>

        <p
          data-reveal
          className="text-[1.1875rem] text-[#94A3B8] mb-10 max-w-[560px] mx-auto"
        >
          Starten Sie jetzt und bieten Sie Ihren Besuchern echten Mehrwert — mit professionellen Rechnern, die Vertrauen schaffen und Anfragen generieren.
        </p>

        <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/registrieren"
            className="bg-[#4338CA] text-white px-8 py-3.5 rounded-lg text-lg font-medium
                       hover:bg-[#5B52E0] transition-colors duration-300 flex items-center gap-2"
          >
            7 Tage kostenlos testen
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/einbettung"
            className="text-[#94A3B8] text-lg font-medium
                       hover:text-[#F1F5F9] hover:underline underline-offset-4 transition-all duration-300"
          >
            So funktioniert die Einbettung
          </Link>
        </div>
      </div>
    </section>
  )
}
