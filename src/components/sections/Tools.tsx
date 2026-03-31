"use client"

import Link from "next/link"
import { useSectionReveal } from "@/components/animations/useSectionReveal"
import {
  TrendingUp,
  Calculator,
  Building2,
  PiggyBank,
  Landmark,
  FileText,
  ArrowUpRight,
  Wrench,
  BarChart3,
  FileSpreadsheet,
  Receipt,
  TrendingDown,
  ArrowRight,
} from "lucide-react"

const toolCategories = [
  {
    label: "Investoren & Makler",
    tools: [
      { name: "Rendite-Rechner", desc: "Brutto- und Nettomietrendite", icon: TrendingUp, href: "/rechner/rendite-rechner" },
      { name: "Kaufnebenkosten", desc: "Alle Kosten beim Kauf", icon: Calculator, href: "/rechner/kaufnebenkosten-rechner" },
      { name: "Finanzierung", desc: "Annuität, Tilgung, Zinsen", icon: Building2, href: "/rechner/finanzierungsrechner" },
      { name: "Cashflow", desc: "Monatlicher Überschuss", icon: PiggyBank, href: "/rechner/cashflow-rechner" },
      { name: "Grunderwerbsteuer", desc: "Alle 16 Bundesländer", icon: Landmark, href: "/rechner/grunderwerbsteuer-rechner" },
    ],
  },
  {
    label: "Erweiterte Rechner",
    tools: [
      { name: "Steuerersparnis", desc: "AfA und Werbungskosten", icon: FileText, href: "/rechner/steuerersparnis-rechner" },
      { name: "Mietsteigerung", desc: "Prognose über Jahre", icon: ArrowUpRight, href: "/rechner/mietsteigerungsrechner" },
      { name: "Instandhaltung", desc: "Peterssche Formel", icon: Wrench, href: "/rechner/instandhaltungskosten-rechner" },
      { name: "Objektvergleich", desc: "Bis zu 3 Objekte", icon: BarChart3, href: "/rechner/objektvergleich" },
      { name: "Tilgungsplan", desc: "PDF-Export", icon: FileSpreadsheet, href: "/rechner/tilgungsplan-generator" },
    ],
  },
  {
    label: "Hausverwaltungen",
    tools: [
      { name: "Nebenkosten", desc: "Umlagefähige Kosten", icon: Receipt, href: "/rechner/nebenkostenabrechnung-rechner" },
      { name: "Mieterhöhung", desc: "Mit Kappungsgrenze", icon: TrendingDown, href: "/rechner/mieterhoehungs-rechner" },
    ],
  },
]

export function ToolsSection() {
  const sectionRef = useSectionReveal()

  return (
    <section
      ref={sectionRef}
      className="py-[clamp(5rem,12vw,10rem)] px-6 bg-white"
    >
      <div className="max-w-[1120px] mx-auto">
        {/* Header */}
        <div data-reveal className="text-center mb-16">
          <p className="text-[#4338CA] text-sm font-medium tracking-[0.06em] uppercase mb-3">
            12 Tools
          </p>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-[#1d1d1f] mb-4">
            Ihre Immobilien-Toolbox.
          </h2>
          <p className="text-[1.1875rem] text-[#6e6e73] max-w-[600px] mx-auto">
            Alle Rechner die Sie für fundierte Immobilien-Entscheidungen brauchen — an einem Ort.
          </p>
        </div>

        {/* Kategorie-Blöcke */}
        {toolCategories.map((cat) => (
          <div key={cat.label} data-reveal className="mb-12 last:mb-0">
            <p className="text-xs font-semibold text-[#9CA3AF] tracking-wider uppercase mb-4">
              {cat.label}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#E3E5EB] rounded-2xl overflow-hidden border border-[#E3E5EB]">
              {cat.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white p-6 hover:bg-[#F7F8FB] transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F8FB] border border-[#E3E5EB]
                                    flex items-center justify-center flex-shrink-0">
                      <tool.icon className="h-5 w-5 text-[#4B5563]" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-[#111827] mb-0.5">
                        {tool.name}
                      </h3>
                      <p className="text-[13px] text-[#9CA3AF]">
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div data-reveal className="text-center mt-12">
          <Link
            href="/rechner"
            className="inline-flex items-center gap-2 text-[#4338CA] font-medium text-lg
                       hover:underline underline-offset-4 transition-all duration-300"
          >
            Alle Rechner entdecken
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
