"use client"

import { useSectionReveal } from "@/components/animations/useSectionReveal"
import { Code2, Shield, Users, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Einbetten und Leads generieren",
    description:
      "Ihre Besucher nutzen den Rechner direkt auf Ihrer Website — und werden zu qualifizierten Leads. Eine Zeile Code, sofort live.",
  },
  {
    icon: Users,
    title: "Echten Mehrwert für Ihre Kunden",
    description:
      "Statt leerer Versprechen: Ihre Kunden berechnen Renditen, Finanzierungen und Nebenkosten selbst. Das schafft Vertrauen und beschleunigt Entscheidungen.",
  },
  {
    icon: TrendingUp,
    title: "16 Profi-Rechner für jede Situation",
    description:
      "Von der Rendite-Analyse bis zur Nebenkostenabrechnung. Ihre Kunden finden den passenden Rechner — Sie gewinnen den Lead.",
  },
  {
    icon: Shield,
    title: "DSGVO-konform. Made in Germany.",
    description:
      "Deutsche Server bei Hetzner, keine Tracking-Cookies, keine Datenweitergabe. Sie können die Rechner bedenkenlos einsetzen.",
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
          <p className="text-[#4338CA] text-sm font-medium tracking-[0.06em] uppercase mb-3">
            Ihr Wettbewerbsvorteil
          </p>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-[#111827] mb-4">
            Warum Ihre Konkurrenz diese Tools bereits nutzt.
          </h2>
          <p className="text-[1.1875rem] text-[#4B5563] max-w-[640px] mx-auto">
            Immobilien-Profis, die interaktive Rechner auf ihrer Website einsetzen, generieren nachweislich mehr qualifizierte Anfragen.
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
