"use client"

import Link from "next/link"
import { useSectionReveal } from "@/components/animations/useSectionReveal"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  const sectionRef = useSectionReveal()

  return (
    <section
      ref={sectionRef}
      className="py-[clamp(7rem,15vw,14rem)] px-6 bg-[#f5f5f7]"
    >
      <div className="max-w-[800px] mx-auto text-center">
        {/* Statement */}
        <h2
          data-reveal
          className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1d1d1f] mb-6"
        >
          Bereit für professionelle{" "}
          <span className="text-gradient-blue">Immobilien-Rechner</span>?
        </h2>

        <p
          data-reveal
          className="text-[1.1875rem] text-[#6e6e73] mb-10 max-w-[500px] mx-auto"
        >
          Starten Sie jetzt Ihren kostenlosen 14-Tage-Test. Keine Kreditkarte nötig. Keine Verpflichtung.
        </p>

        <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/anmelden"
            className="bg-[#0066CC] text-white px-8 py-3.5 rounded-full text-lg font-medium
                       hover:bg-[#0077ED] transition-colors duration-300 flex items-center gap-2"
          >
            Jetzt kostenlos starten
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/preise"
            className="text-[#0066CC] text-lg font-medium
                       hover:underline underline-offset-4 transition-all duration-300"
          >
            Preise ansehen
          </Link>
        </div>
      </div>
    </section>
  )
}
