"use client"

import type { ReactNode } from "react"
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
  Scale,
  Ban,
  Ruler,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ToolItem {
  name: string
  desc: string
  icon: LucideIcon
  href: string
  chart?: ReactNode
}

interface ToolCategory {
  label: string
  tools: ToolItem[]
}

// Mini-Charts fuer die ersten 3 Tools
const renditeChart = (
  <svg width="100%" height="32" viewBox="0 0 180 32" className="mt-3 opacity-40 group-hover:opacity-60 transition-opacity">
    <circle cx="16" cy="16" r="12" fill="none" stroke="#E3E5EB" strokeWidth="4" />
    <circle cx="16" cy="16" r="12" fill="none" stroke="#4338CA" strokeWidth="4" strokeDasharray="25 50.4" transform="rotate(-90 16 16)" />
    <circle cx="16" cy="16" r="12" fill="none" stroke="#0E7490" strokeWidth="4" strokeDasharray="18 57.4" strokeDashoffset="-25" transform="rotate(-90 16 16)" />
    <rect x="36" y="12" width="30" height="4" rx="2" fill="#E3E5EB" />
    <rect x="36" y="12" width="22" height="4" rx="2" fill="#4338CA" opacity="0.5" />
    <rect x="74" y="12" width="30" height="4" rx="2" fill="#E3E5EB" />
    <rect x="74" y="12" width="26" height="4" rx="2" fill="#0E7490" opacity="0.5" />
  </svg>
)

const kaufnebenkostenChart = (
  <svg width="100%" height="32" viewBox="0 0 180 32" className="mt-3 opacity-40 group-hover:opacity-60 transition-opacity">
    <rect x="0" y="14" width="45" height="10" rx="3" fill="#4338CA" opacity="0.6" />
    <rect x="48" y="14" width="25" height="10" rx="3" fill="#0E7490" opacity="0.6" />
    <rect x="76" y="14" width="15" height="10" rx="3" fill="#059669" opacity="0.6" />
    <rect x="94" y="14" width="20" height="10" rx="3" fill="#B45309" opacity="0.6" />
  </svg>
)

const finanzierungChart = (
  <svg width="100%" height="32" viewBox="0 0 180 32" className="mt-3 opacity-40 group-hover:opacity-60 transition-opacity">
    <path d="M0,28 Q30,26 60,22 Q90,16 120,8 Q150,2 180,0" fill="none" stroke="#4338CA" strokeWidth="2" opacity="0.6" />
    <path d="M0,28 Q30,26 60,22 Q90,16 120,8 Q150,2 180,0 L180,32 L0,32 Z" fill="#4338CA" opacity="0.08" />
  </svg>
)

const toolCategories: ToolCategory[] = [
  {
    label: "Investoren & Makler",
    tools: [
      { name: "Rendite-Rechner", desc: "Brutto- und Nettomietrendite", icon: TrendingUp, href: "/rechner/rendite-rechner", chart: renditeChart },
      { name: "Kaufnebenkosten", desc: "Alle Kosten beim Kauf", icon: Calculator, href: "/rechner/kaufnebenkosten-rechner", chart: kaufnebenkostenChart },
      { name: "Finanzierung", desc: "Annuität, Tilgung, Zinsen", icon: Building2, href: "/rechner/finanzierungsrechner", chart: finanzierungChart },
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
      { name: "Kaufen vs. Mieten", desc: "Vermögensvergleich", icon: Scale, href: "/rechner/kaufen-vs-mieten" },
      { name: "Vorfälligkeit", desc: "Kreditablösung berechnen", icon: Ban, href: "/rechner/vorfaelligkeitsentschaedigung-rechner" },
      { name: "Beleihungswert", desc: "Max. Darlehen ermitteln", icon: Landmark, href: "/rechner/beleihungswert-rechner" },
    ],
  },
  {
    label: "Hausverwaltungen",
    tools: [
      { name: "Nebenkosten", desc: "Umlagefähige Kosten", icon: Receipt, href: "/rechner/nebenkostenabrechnung-rechner" },
      { name: "Mieterhöhung", desc: "Mit Kappungsgrenze", icon: TrendingDown, href: "/rechner/mieterhoehungs-rechner" },
      { name: "Wohnfläche", desc: "Nach WoFlV berechnen", icon: Ruler, href: "/rechner/wohnflaechenberechnung" },
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
            16 Profi-Rechner
          </p>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-[#111827] mb-4">
            Jeder Rechner ein Lead-Magnet.
          </h2>
          <p className="text-[1.1875rem] text-[#4B5563] max-w-[640px] mx-auto">
            Bieten Sie Ihren Website-Besuchern echten Mehrwert. Jeder Rechner löst ein konkretes Problem — und macht aus Besuchern qualifizierte Anfragen.
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
                      {tool.chart && tool.chart}
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
