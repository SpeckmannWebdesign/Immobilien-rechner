"use client"

import { useSectionReveal } from "@/components/animations/useSectionReveal"

const testimonials = [
  {
    quote:
      "Die Rendite-Rechner haben unsere Kundenberatung komplett verändert. Statt Excel-Tabellen zeigen wir jetzt professionelle Analysen direkt im Gespräch.",
    name: "Thomas Bergmann",
    role: "Immobilienmakler, Hamburg",
  },
  {
    quote:
      "Endlich eine Nebenkostenabrechnung die stimmt. Die Verteilerschlüssel-Berechnung spart uns jeden Monat Stunden.",
    name: "Sabine Keller",
    role: "Hausverwaltung Keller GmbH, München",
  },
  {
    quote:
      "Als Investor vergleiche ich damit regelmäßig Objekte. Die Live-Berechnung ist genial — Ergebnisse ändern sich sofort wenn ich die Zahlen anpasse.",
    name: "Dr. Markus Weber",
    role: "Privatinvestor, Frankfurt",
  },
]

function StarIcon() {
  return (
    <svg
      className="h-4 w-4 text-[#B45309]"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export function TestimonialsSection() {
  const sectionRef = useSectionReveal()

  return (
    <section ref={sectionRef} className="py-[clamp(5rem,12vw,10rem)] px-6 bg-[#F7F8FB]">
      <div className="max-w-[1120px] mx-auto">
        {/* Section-Label */}
        <p data-reveal className="text-sm font-semibold text-[#4338CA] text-center mb-3">
          Kundenstimmen
        </p>

        {/* Überschrift */}
        <h2
          data-reveal
          className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#111827] text-center tracking-tight mb-12"
        >
          Das sagen unsere Nutzer
        </h2>

        {/* Testimonial-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              data-reveal
              className="bg-white border border-[#E3E5EB] rounded-2xl p-6 flex flex-col"
            >
              {/* Sterne */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Zitat */}
              <p className="text-[#4B5563] italic text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Trennlinie */}
              <div className="border-t border-[#E3E5EB] my-4" />

              {/* Name & Rolle */}
              <p className="text-[#111827] font-semibold text-sm">{t.name}</p>
              <p className="text-[#9CA3AF] text-sm">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
