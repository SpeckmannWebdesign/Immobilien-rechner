import {
  TrendingUp,
  Calculator,
  Building2,
  PiggyBank,
  Landmark,
  FileText,
  TrendingDown,
  Wrench,
  BarChart3,
  FileSpreadsheet,
  Receipt,
  ArrowUpRight,
  Scale,
  Ban,
  Ruler,
  type LucideIcon,
} from "lucide-react"

export interface Tool {
  slug: string
  name: string
  shortName: string
  description: string
  category: "kern" | "erweitert" | "hausverwaltung"
  categoryLabel: string
  icon: LucideIcon
  seoTitle: string
  seoDescription: string
  hasTaxDisclaimer?: boolean
}

export const tools: Tool[] = [
  // Kern-Rechner (Investoren & Makler)
  {
    slug: "rendite-rechner",
    name: "Rendite-Rechner",
    shortName: "Rendite",
    description: "Brutto- und Nettomietrendite, Eigenkapitalrendite berechnen",
    category: "kern",
    categoryLabel: "Investoren & Makler",
    icon: TrendingUp,
    seoTitle: "Mietrendite berechnen — Rendite-Rechner für Immobilien",
    seoDescription:
      "Berechnen Sie die Bruttomietrendite, Nettomietrendite und Eigenkapitalrendite Ihrer Immobilie. Kostenlos testen.",
  },
  {
    slug: "kaufnebenkosten-rechner",
    name: "Kaufnebenkosten-Rechner",
    shortName: "Kaufnebenkosten",
    description:
      "Grunderwerbsteuer, Notar, Grundbuch und Makler — alle Kaufnebenkosten auf einen Blick",
    category: "kern",
    categoryLabel: "Investoren & Makler",
    icon: Calculator,
    seoTitle: "Kaufnebenkosten berechnen — Immobilien-Kaufnebenkosten-Rechner",
    seoDescription:
      "Berechnen Sie alle Kaufnebenkosten beim Immobilienkauf: Grunderwerbsteuer, Notarkosten, Grundbuchkosten und Maklerprovision.",
  },
  {
    slug: "finanzierungsrechner",
    name: "Finanzierungsrechner",
    shortName: "Finanzierung",
    description:
      "Annuitätendarlehen berechnen: Rate, Tilgung, Zinsen und Restschuld",
    category: "kern",
    categoryLabel: "Investoren & Makler",
    icon: Building2,
    seoTitle: "Finanzierungsrechner — Immobilien-Darlehen berechnen",
    seoDescription:
      "Berechnen Sie Ihre monatliche Rate, Zinskosten und Restschuld für Ihren Immobilienkredit. Mit Sondertilgung und Tilgungsplan.",
  },
  {
    slug: "cashflow-rechner",
    name: "Cashflow-Rechner",
    shortName: "Cashflow",
    description:
      "Monatlichen Überschuss oder Unterdeckung bei Vermietung berechnen",
    category: "kern",
    categoryLabel: "Investoren & Makler",
    icon: PiggyBank,
    seoTitle: "Cashflow-Rechner — Monatlichen Überschuss berechnen",
    seoDescription:
      "Berechnen Sie den monatlichen Cashflow Ihrer Immobilie: Mieteinnahmen minus alle laufenden Kosten.",
  },
  {
    slug: "grunderwerbsteuer-rechner",
    name: "Grunderwerbsteuer-Rechner",
    shortName: "Grunderwerbsteuer",
    description:
      "Grunderwerbsteuer für alle 16 Bundesländer berechnen und vergleichen",
    category: "kern",
    categoryLabel: "Investoren & Makler",
    icon: Landmark,
    seoTitle: "Grunderwerbsteuer-Rechner 2026 — Alle Bundesländer",
    seoDescription:
      "Berechnen Sie die Grunderwerbsteuer für alle 16 Bundesländer. Aktueller Stand 2026 mit Vergleichstabelle.",
  },

  // Erweiterte Rechner (Investoren)
  {
    slug: "steuerersparnis-rechner",
    name: "Steuerersparnis-Rechner",
    shortName: "Steuerersparnis",
    description: "AfA, Werbungskosten und jährlichen Steuervorteil berechnen",
    category: "erweitert",
    categoryLabel: "Investoren",
    icon: FileText,
    seoTitle: "Steuerersparnis bei Immobilien — AfA-Rechner",
    seoDescription:
      "Berechnen Sie Ihre jährliche Steuerersparnis durch Abschreibung (AfA) und Werbungskosten bei Ihrer Immobilie.",
    hasTaxDisclaimer: true,
  },
  {
    slug: "mietsteigerungsrechner",
    name: "Mietsteigerungsrechner",
    shortName: "Mietsteigerung",
    description: "Mietentwicklung über 10, 20 oder 30 Jahre prognostizieren",
    category: "erweitert",
    categoryLabel: "Investoren",
    icon: ArrowUpRight,
    seoTitle: "Mietsteigerungsrechner — Mietentwicklung berechnen",
    seoDescription:
      "Prognostizieren Sie die Mietentwicklung Ihrer Immobilie über 10, 20 oder 30 Jahre mit individueller Steigerungsrate.",
  },
  {
    slug: "instandhaltungskosten-rechner",
    name: "Instandhaltungskosten-Rechner",
    shortName: "Instandhaltung",
    description:
      "Empfohlene Rücklagen nach der Petersschen Formel berechnen",
    category: "erweitert",
    categoryLabel: "Investoren",
    icon: Wrench,
    seoTitle: "Instandhaltungskosten-Rechner — Peterssche Formel",
    seoDescription:
      "Berechnen Sie die empfohlene Instandhaltungsrücklage für Ihre Immobilie nach der Petersschen Formel.",
  },
  {
    slug: "objektvergleich",
    name: "Objektvergleich",
    shortName: "Vergleich",
    description: "Bis zu 3 Immobilien nebeneinander vergleichen",
    category: "erweitert",
    categoryLabel: "Investoren",
    icon: BarChart3,
    seoTitle: "Immobilien-Vergleich — Objekte nebeneinander bewerten",
    seoDescription:
      "Vergleichen Sie bis zu 3 Immobilien nebeneinander: Rendite, Cashflow, Kaufnebenkosten und Finanzierung auf einen Blick.",
  },
  {
    slug: "tilgungsplan-generator",
    name: "Tilgungsplan-Generator",
    shortName: "Tilgungsplan",
    description:
      "Detaillierten Tilgungsplan erstellen und als PDF herunterladen",
    category: "erweitert",
    categoryLabel: "Investoren",
    icon: FileSpreadsheet,
    seoTitle: "Tilgungsplan erstellen — PDF-Tilgungsplan-Generator",
    seoDescription:
      "Erstellen Sie einen detaillierten Tilgungsplan für Ihren Immobilienkredit. Mit Jahresübersicht und PDF-Export.",
  },
  {
    slug: "kaufen-vs-mieten",
    name: "Kaufen vs. Mieten",
    shortName: "Kaufen/Mieten",
    description: "Vergleichen Sie die Gesamtkosten von Kaufen und Mieten über einen beliebigen Zeitraum",
    category: "erweitert",
    categoryLabel: "Investoren",
    icon: Scale,
    seoTitle: "Kaufen vs. Mieten | Professioneller Immobilien-Rechner",
    seoDescription:
      "Kaufen oder Mieten — was lohnt sich mehr? Vergleichen Sie Vermögensaufbau, Gesamtkosten und finden Sie den Break-Even-Punkt.",
  },
  {
    slug: "vorfaelligkeitsentschaedigung-rechner",
    name: "Vorfälligkeitsentschädigung-Rechner",
    shortName: "Vorfälligkeit",
    description: "Kosten für die vorzeitige Ablösung eines Immobilienkredits berechnen",
    category: "erweitert",
    categoryLabel: "Investoren",
    icon: Ban,
    seoTitle: "Vorfälligkeitsentschädigung berechnen | Professioneller Immobilien-Rechner",
    seoDescription:
      "Berechnen Sie die Vorfälligkeitsentschädigung bei vorzeitiger Kreditablösung. Mit Sondertilgungsrecht und Zinsmargenschaden.",
  },
  {
    slug: "beleihungswert-rechner",
    name: "Beleihungswert-Rechner",
    shortName: "Beleihungswert",
    description: "Beleihungswert, maximales Darlehen und Eigenkapitalbedarf berechnen",
    category: "erweitert",
    categoryLabel: "Investoren",
    icon: Landmark,
    seoTitle: "Beleihungswert berechnen | Professioneller Immobilien-Rechner",
    seoDescription:
      "Berechnen Sie den Beleihungswert Ihrer Immobilie, das maximale Darlehen und den Eigenkapitalbedarf für Ihre Finanzierung.",
  },

  // Hausverwaltungs-Rechner
  {
    slug: "nebenkostenabrechnung-rechner",
    name: "Nebenkostenabrechnung-Rechner",
    shortName: "Nebenkosten",
    description:
      "Umlegbare und nicht-umlegbare Kosten aufschlüsseln, Verteilerschlüssel berechnen",
    category: "hausverwaltung",
    categoryLabel: "Hausverwaltungen",
    icon: Receipt,
    seoTitle: "Nebenkostenabrechnung-Rechner — Nebenkosten aufschlüsseln",
    seoDescription:
      "Schlüsseln Sie umlegbare und nicht-umlegbare Nebenkosten auf. Mit Verteilerschlüssel nach m², Personen oder Einheiten.",
  },
  {
    slug: "mieterhoehungs-rechner",
    name: "Mieterhöhungs-Rechner",
    shortName: "Mieterhöhung",
    description:
      "Zulässige Mieterhöhung mit Kappungsgrenze und frühestem Zeitpunkt berechnen",
    category: "hausverwaltung",
    categoryLabel: "Hausverwaltungen",
    icon: TrendingDown,
    seoTitle: "Mieterhöhungs-Rechner — Kappungsgrenze berechnen",
    seoDescription:
      "Berechnen Sie die zulässige Mieterhöhung unter Berücksichtigung der Kappungsgrenze (20% / 15% in angespannten Märkten).",
  },
  {
    slug: "wohnflaechenberechnung",
    name: "Wohnflächenberechnung",
    shortName: "Wohnfläche",
    description: "Wohnfläche nach WoFlV korrekt berechnen — mit Dachschrägen, Balkonen und Terrassen",
    category: "hausverwaltung",
    categoryLabel: "Hausverwaltungen",
    icon: Ruler,
    seoTitle: "Wohnflächenberechnung nach WoFlV | Professioneller Immobilien-Rechner",
    seoDescription:
      "Berechnen Sie die anrechenbare Wohnfläche nach der Wohnflächenverordnung (WoFlV). Mit Dachschrägen, Balkonen, Terrassen und Kellern.",
  },
]

// Hilfsfunktionen
export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug)
}

export function getToolsByCategory(category: Tool["category"]): Tool[] {
  return tools.filter((tool) => tool.category === category)
}

export const toolCategories = [
  { key: "kern" as const, label: "Investoren & Makler" },
  { key: "erweitert" as const, label: "Erweiterte Rechner" },
  { key: "hausverwaltung" as const, label: "Hausverwaltungen" },
]
