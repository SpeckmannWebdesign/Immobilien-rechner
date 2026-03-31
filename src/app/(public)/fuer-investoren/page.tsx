import Link from "next/link"
import {
  ArrowRight,
  ChevronRight,
  TrendingUp,
  PiggyBank,
  Building2,
  FileText,
  ArrowUpRight,
  FileSpreadsheet,
  Scale,
  Landmark,
  LineChart,
  Shield,
  Settings,
  GitCompare,
} from "lucide-react"
import type { Metadata } from "next"

/* ─────────────────────── Metadata ─────────────────────── */

export const metadata: Metadata = {
  title: "Immobilien-Rechner für Investoren | Rendite & Cashflow analysieren",
  description:
    "Analyse-Tools für Immobilien-Investoren: Rendite, Cashflow, Steuerersparnis, Finanzierung und Mietsteigerung berechnen. Fundierte Investitionsentscheidungen treffen.",
  openGraph: {
    title: "Immobilien-Rechner für Investoren | Rendite & Cashflow analysieren",
    description:
      "Analyse-Tools für Immobilien-Investoren: Rendite, Cashflow, Steuerersparnis, Finanzierung und Mietsteigerung berechnen.",
    type: "website",
    locale: "de_DE",
  },
}

/* ─────────────────────── Rechner-Daten ─────────────────────── */

const rechner = [
  {
    slug: "rendite-rechner",
    name: "Rendite-Rechner",
    description:
      "Brutto- und Nettomietrendite sowie Eigenkapitalrendite auf einen Blick.",
    icon: TrendingUp,
  },
  {
    slug: "cashflow-rechner",
    name: "Cashflow-Rechner",
    description:
      "Monatlichen Überschuss oder Unterdeckung bei Vermietung berechnen.",
    icon: PiggyBank,
  },
  {
    slug: "finanzierungsrechner",
    name: "Finanzierungsrechner",
    description:
      "Annuitätendarlehen durchrechnen: Rate, Zinsen, Tilgung und Restschuld.",
    icon: Building2,
  },
  {
    slug: "steuerersparnis-rechner",
    name: "Steuerersparnis-Rechner",
    description:
      "AfA, Werbungskosten und jährlichen Steuervorteil ermitteln.",
    icon: FileText,
  },
  {
    slug: "mietsteigerungsrechner",
    name: "Mietsteigerungsrechner",
    description:
      "Mietentwicklung über 10, 20 oder 30 Jahre prognostizieren.",
    icon: ArrowUpRight,
  },
  {
    slug: "tilgungsplan-generator",
    name: "Tilgungsplan-Generator",
    description:
      "Detaillierten Tilgungsplan erstellen — Jahr für Jahr bis zur Volltilgung.",
    icon: FileSpreadsheet,
  },
  {
    slug: "kaufen-vs-mieten",
    name: "Kaufen vs. Mieten",
    description:
      "Gesamtkosten und Vermögensaufbau von Kauf und Miete vergleichen.",
    icon: Scale,
  },
  {
    slug: "beleihungswert-rechner",
    name: "Beleihungswert-Rechner",
    description:
      "Beleihungswert, maximales Darlehen und Eigenkapitalbedarf berechnen.",
    icon: Landmark,
  },
]

/* ─────────────────────── Vorteile ─────────────────────── */

const vorteile = [
  {
    icon: LineChart,
    title: "Portfolio-Analyse vor dem Kauf",
    description:
      "Prüfen Sie jedes Objekt systematisch, bevor Sie investieren. Rendite, Cashflow und Finanzierung in einem Durchlauf berechnen — statt sich auf Bauchgefühl oder die Angaben des Verkäufers zu verlassen.",
  },
  {
    icon: Shield,
    title: "Steuerliche Auswirkungen verstehen",
    description:
      "Der Steuerersparnis-Rechner zeigt Ihnen, wie sich AfA und Werbungskosten auf Ihre Steuerlast auswirken. Damit können Sie die tatsächliche Nachsteuer-Rendite einschätzen — nicht nur die Bruttomietrendite.",
  },
  {
    icon: Settings,
    title: "Finanzierung gezielt planen",
    description:
      "Spielen Sie verschiedene Szenarien durch: Wie verändert sich der Cashflow bei 2 % vs. 3 % Zinsen? Was bringt eine höhere Tilgung? Der Tilgungsplan zeigt die Auswirkungen über die gesamte Laufzeit.",
  },
  {
    icon: GitCompare,
    title: "Objekte objektiv vergleichen",
    description:
      "Vergleichen Sie bis zu drei Immobilien nebeneinander. Der Objektvergleich stellt Rendite, Cashflow und Kaufnebenkosten direkt gegenüber — so erkennen Sie schnell, welches Investment sich wirklich lohnt.",
  },
]

/* ─────────────────────── Structured Data ─────────────────────── */

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Immobilien-Rechner für Investoren",
  description:
    "Analyse-Tools für Immobilien-Investoren: Rendite, Cashflow, Steuerersparnis, Finanzierung und Mietsteigerung berechnen.",
  url: "https://immobilien-rechner.de/fuer-investoren",
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Startseite",
      item: "https://immobilien-rechner.de",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Für Investoren",
      item: "https://immobilien-rechner.de/fuer-investoren",
    },
  ],
}

/* ─────────────────────── Seite ─────────────────────── */

export default function FuerInvestorenPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ───── 1. HERO ───── */}
      <section className="bg-[#F7F8FB] pt-24 pb-16 px-6">
        <div className="max-w-[1120px] mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-[#9CA3AF] mb-8"
          >
            <Link
              href="/"
              className="hover:text-[#4B5563] transition-colors"
            >
              Startseite
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#4B5563] font-medium">
              Für Investoren
            </span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-[#111827] mb-4">
              Analyse-Tools für Immobilien-Investoren
            </h1>
            <p className="text-lg text-[#4B5563] leading-relaxed mb-8">
              Rendite, Cashflow, Steuerersparnis und Finanzierung in einem
              Tool. Treffen Sie Investitionsentscheidungen auf Basis
              belastbarer Zahlen — nicht auf Basis von Verkäufer-Exposés.
            </p>
            <Link
              href="/anmelden"
              className="inline-flex items-center gap-2 bg-[#4338CA] text-white px-8 py-3.5 rounded-lg text-lg font-medium hover:bg-[#5B52E0] transition-colors duration-300"
            >
              7 Tage kostenlos testen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───── 2. RELEVANTE RECHNER ───── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] text-center mb-4">
            Alle Rechner für Ihre Investmentstrategie
          </h2>
          <p className="text-[#4B5563] text-center max-w-[640px] mx-auto mb-12">
            Acht spezialisierte Rechner, die den gesamten
            Investitionsprozess abdecken — von der ersten Analyse bis zur
            langfristigen Planung.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rechner.map((r) => {
              const Icon = r.icon
              return (
                <Link
                  key={r.slug}
                  href={`/rechner/${r.slug}`}
                  className="group flex flex-col p-6 rounded-2xl border border-[#E3E5EB] hover:border-[#4338CA]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F7F8FB] border border-[#E3E5EB] flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-[#4B5563]" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-[#111827] mb-2 group-hover:text-[#4338CA] transition-colors">
                    {r.name}
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed flex-1">
                    {r.description}
                  </p>
                  <span className="mt-4 text-sm font-medium text-[#4338CA] flex items-center gap-1">
                    Zum Rechner
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ───── 3. VORTEILE FÜR INVESTOREN ───── */}
      <section className="bg-[#F7F8FB] py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] text-center mb-4">
            Fundierte Entscheidungen statt Bauchgefühl
          </h2>
          <p className="text-[#4B5563] text-center max-w-[640px] mx-auto mb-12">
            Vier Gründe, warum erfolgreiche Investoren auf datenbasierte
            Analyse setzen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vorteile.map((v, index) => {
              const Icon = v.icon
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E3E5EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="h-5 w-5 text-[#4B5563]" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold text-[#111827] mb-1">
                      {v.title}
                    </h3>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ───── 4. SEO-TEXT ───── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] mb-8">
            So optimieren Investoren ihre Immobilien-Entscheidungen
          </h2>

          <p className="text-[#4B5563] leading-relaxed mb-6">
            Eine Immobilie als Kapitalanlage zu kaufen, ist eine
            Entscheidung mit langfristigen Konsequenzen. Der Kaufpreis ist
            dabei nur die Spitze des Eisbergs: Kaufnebenkosten,
            Finanzierungskonditionen, steuerliche Abschreibung, laufende
            Instandhaltung und die erwartete Mietentwicklung bestimmen, ob
            sich ein Investment tatsächlich rechnet. Wer diese Faktoren
            nicht systematisch durchrechnet, riskiert eine negative
            Überraschung — etwa einen dauerhaft negativen Cashflow oder eine
            Rendite, die unter der Inflationsrate liegt.
          </p>

          <h3 className="text-xl font-semibold text-[#111827] mb-3">
            Rendite ist nicht gleich Rendite
          </h3>
          <p className="text-[#4B5563] leading-relaxed mb-6">
            Die Bruttomietrendite, die in den meisten Inseraten steht, sagt
            wenig über die tatsächliche Wirtschaftlichkeit aus. Erst wenn
            Sie Kaufnebenkosten, nicht umlegbare Betriebskosten,
            Instandhaltungsrücklagen und den Finanzierungsaufwand
            berücksichtigen, erhalten Sie die Nettomietrendite — die
            Kennzahl, die wirklich zählt. Die Eigenkapitalrendite wiederum
            zeigt, wie effizient Ihr eingesetztes Kapital arbeitet. Alle
            drei Kennzahlen berechnen Sie mit dem Rendite-Rechner in
            Sekunden.
          </p>

          <h3 className="text-xl font-semibold text-[#111827] mb-3">
            Cashflow und Steuer im Zusammenspiel
          </h3>
          <p className="text-[#4B5563] leading-relaxed mb-6">
            Ein positiver Cashflow bedeutet, dass die Mieteinnahmen alle
            laufenden Kosten einschließlich der Kreditrate decken. Doch
            selbst ein leicht negativer Cashflow kann sich lohnen, wenn die
            steuerliche Ersparnis durch AfA und Werbungskosten die
            Differenz ausgleicht. Mit dem Cashflow-Rechner und dem
            Steuerersparnis-Rechner können Sie beide Seiten
            gegenüberstellen und die tatsächliche Nachsteuer-Belastung
            ermitteln.
          </p>

          <h3 className="text-xl font-semibold text-[#111827] mb-3">
            Langfristig planen mit Szenarien
          </h3>
          <p className="text-[#4B5563] leading-relaxed">
            Immobilieninvestments laufen über Jahrzehnte. Der
            Mietsteigerungsrechner zeigt, wie sich Ihre Einnahmen bei
            unterschiedlichen Steigerungsraten entwickeln. Der
            Tilgungsplan-Generator macht die Entschuldung über die gesamte
            Laufzeit transparent. Und mit dem Kaufen-vs.-Mieten-Vergleich
            können Sie Ihren Mietern oder sich selbst demonstrieren, ab
            welchem Zeitpunkt der Kauf wirtschaftlich vorteilhafter ist.
            Diese Kombination aus Rechnern gibt Ihnen die Sicherheit,
            Investitionsentscheidungen auf einer soliden Datenbasis zu
            treffen.
          </p>
        </div>
      </section>

      {/* ───── 5. CTA ───── */}
      <section className="bg-[#0B0D14] py-24 px-6">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#F1F5F9] mb-4">
            Analysieren Sie Ihr nächstes Investment
          </h2>
          <p className="text-[#94A3B8] mb-8">
            Testen Sie alle 16 Rechner 7 Tage lang kostenlos. Keine
            Kreditkarte, keine Verpflichtung — direkt loslegen.
          </p>
          <Link
            href="/anmelden"
            className="inline-flex items-center gap-2 bg-[#4338CA] text-white font-medium px-8 py-3.5 rounded-lg hover:bg-[#5B52E0] transition-colors duration-300"
          >
            7 Tage kostenlos testen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
