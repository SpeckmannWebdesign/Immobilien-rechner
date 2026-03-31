"use client"

import { useSectionReveal } from "@/components/animations/useSectionReveal"
import { Calculator, Code2, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Calculator,
    title: "12 Profi-Rechner",
    description:
      "Von Rendite über Finanzierung bis Nebenkostenabrechnung. Alle Tools, die Immobilien-Profis täglich brauchen.",
  },
  {
    icon: Code2,
    title: "Auf Ihrer Website einbetten",
    description:
      "Eine Zeile Code — fertig. Ihre Besucher nutzen den Rechner direkt auf Ihrer Website. Funktioniert überall.",
  },
  {
    icon: Shield,
    title: "DSGVO-konform",
    description:
      "Deutsche Server, keine Tracking-Cookies, keine Datenweitergabe. Hosting bei Hetzner in Deutschland.",
  },
  {
    icon: Zap,
    title: "Sofort einsatzbereit",
    description:
      "Account erstellen, Rechner auswählen, einbetten. In unter 5 Minuten sind Ihre Immobilien-Tools live.",
  },
]

export function FeaturesSection() {
  const sectionRef = useSectionReveal()

  return (
    <section
      ref={sectionRef}
      className="py-[clamp(5rem,12vw,10rem)] px-6 bg-[#F7F8FB]"
    >
      <div className="max-w-[1120px] mx-auto">
        {/* Header */}
        <div data-reveal className="text-center mb-20">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-[#1d1d1f] mb-4">
            Warum Immobilien-Rechner?
          </h2>
          <p className="text-[1.1875rem] text-[#6e6e73] max-w-[600px] mx-auto">
            Professionelle Tools, die Ihre Arbeit einfacher machen.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              data-reveal
              className="bg-white border border-[#E3E5EB] rounded-2xl p-10 min-h-[240px] flex flex-col justify-end
                         hover:border-[#CACDD6] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F7F8FB] border border-[#E3E5EB]
                              flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-[#4B5563]" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#4B5563] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
