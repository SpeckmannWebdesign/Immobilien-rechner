import Link from "next/link"
import {
  ArrowRight,
  ChevronRight,
  Receipt,
  TrendingDown,
  Ruler,
  Wrench,
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
  Percent,
  ClipboardList,
} from "lucide-react"
import type { Metadata } from "next"

/* ─────────────────────── Metadata ─────────────────────── */

export const metadata: Metadata = {
  title:
    "Immobilien-Rechner für Hausverwaltungen | Nebenkosten & Mieterhöhung",
  description:
    "Rechner für Hausverwaltungen und Vermieter: Nebenkostenabrechnung, Mieterhöhung mit Kappungsgrenze, Wohnflächenberechnung nach WoFlV und Instandhaltungsrücklagen.",
  openGraph: {
    title:
      "Immobilien-Rechner für Hausverwaltungen | Nebenkosten & Mieterhöhung",
    description:
      "Rechner für Hausverwaltungen und Vermieter: Nebenkostenabrechnung, Mieterhöhung mit Kappungsgrenze, Wohnflächenberechnung nach WoFlV.",
    type: "website",
    locale: "de_DE",
  },
}

/* ─────────────────────── Rechner-Daten ─────────────────────── */

const rechner = [
  {
    slug: "nebenkostenabrechnung-rechner",
    name: "Nebenkostenabrechnung-Rechner",
    description:
      "Umlegbare und nicht-umlegbare Kosten aufschlüsseln, Verteilerschlüssel korrekt anwenden.",
    icon: Receipt,
  },
  {
    slug: "mieterhoehungs-rechner",
    name: "Mieterhöhungs-Rechner",
    description:
      "Zulässige Mieterhöhung berechnen — mit Kappungsgrenze und frühestem Zeitpunkt.",
    icon: TrendingDown,
  },
  {
    slug: "wohnflaechenberechnung",
    name: "Wohnflächenberechnung",
    description:
      "Wohnfläche nach WoFlV korrekt berechnen — inkl. Dachschrägen, Balkonen und Terrassen.",
    icon: Ruler,
  },
  {
    slug: "instandhaltungskosten-rechner",
    name: "Instandhaltungskosten-Rechner",
    description:
      "Empfohlene Rücklagen nach der Petersschen Formel ermitteln.",
    icon: Wrench,
  },
  {
    slug: "mietsteigerungsrechner",
    name: "Mietsteigerungsrechner",
    description:
      "Mietentwicklung über Jahre prognostizieren — für die langfristige Planung.",
    icon: ArrowUpRight,
  },
]

/* ─────────────────────── Vorteile ─────────────────────── */

const vorteile = [
  {
    icon: ShieldCheck,
    title: "Rechtssichere Berechnungen",
    description:
      "Alle Rechner basieren auf den aktuellen gesetzlichen Grundlagen: BGB-Mietrecht, Betriebskostenverordnung und Wohnflächenverordnung. Sie reduzieren das Risiko, dass Mieter Ihre Abrechnungen oder Mieterhöhungen erfolgreich anfechten.",
  },
  {
    icon: Percent,
    title: "Kappungsgrenzen automatisch berücksichtigt",
    description:
      "Der Mieterhöhungs-Rechner kennt die 20-Prozent-Kappungsgrenze und die verschärfte 15-Prozent-Grenze für angespannte Wohnungsmärkte. Sie geben die aktuelle Miete ein und erhalten sofort den maximal zulässigen Betrag.",
  },
  {
    icon: BookOpen,
    title: "WoFlV-konforme Wohnflächenberechnung",
    description:
      "Dachschrägen unter 1 Meter, Balkone mit 25 % Anrechnung, Terrassen — die Wohnflächenverordnung hat klare Regeln. Unser Rechner wendet sie automatisch an und dokumentiert das Ergebnis nachvollziehbar.",
  },
  {
    icon: ClipboardList,
    title: "Verteilerschlüssel und Rücklagen planen",
    description:
      "Schlüsseln Sie Nebenkosten nach Wohnfläche, Personenzahl oder Wohneinheiten um. Der Instandhaltungskosten-Rechner zeigt die empfohlene Rücklage nach der Petersschen Formel — wichtig für die WEG-Verwaltung und die Eigentümerversammlung.",
  },
]

/* ─────────────────────── Structured Data ─────────────────────── */

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Immobilien-Rechner für Hausverwaltungen",
  description:
    "Rechner für Hausverwaltungen und Vermieter: Nebenkostenabrechnung, Mieterhöhung mit Kappungsgrenze, Wohnflächenberechnung nach WoFlV.",
  url: "https://immobilien-rechner.de/fuer-hausverwaltungen",
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
      name: "Für Hausverwaltungen",
      item: "https://immobilien-rechner.de/fuer-hausverwaltungen",
    },
  ],
}

/* ─────────────────────── Seite ─────────────────────── */

export default function FuerHausverwaltungenPage() {
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
              Für Hausverwaltungen
            </span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-[#111827] mb-4">
              Rechner für Hausverwaltungen und Vermieter
            </h1>
            <p className="text-lg text-[#4B5563] leading-relaxed mb-8">
              Nebenkostenabrechnung, Mieterhöhung, Wohnfläche und
              Instandhaltung — rechtssicher berechnen und sauber
              dokumentieren. Weniger Streit, weniger Aufwand, mehr
              Sicherheit.
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
            Spezialisierte Rechner für die Hausverwaltung
          </h2>
          <p className="text-[#4B5563] text-center max-w-[640px] mx-auto mb-12">
            Fünf Rechner, die den Verwaltungsalltag abdecken — von der
            jährlichen Nebenkostenabrechnung bis zur langfristigen
            Rücklagenplanung.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* ───── 3. VORTEILE FÜR HAUSVERWALTUNGEN ───── */}
      <section className="bg-[#F7F8FB] py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] text-center mb-4">
            Weniger Fehler, weniger Streit, weniger Aufwand
          </h2>
          <p className="text-[#4B5563] text-center max-w-[640px] mx-auto mb-12">
            Vier Gründe, warum Hausverwaltungen und Vermieter von
            spezialisierten Rechnern profitieren.
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
            Rechtssichere Berechnungen für Vermieter und Hausverwaltungen
          </h2>

          <p className="text-[#4B5563] leading-relaxed mb-6">
            Die Verwaltung von Mietimmobilien wird zunehmend komplexer.
            Mietpreisbremse, verschärfte Kappungsgrenzen, die
            Betriebskostenverordnung und die Wohnflächenverordnung setzen
            enge Grenzen — und Fehler werden teuer. Laut dem Deutschen
            Mieterbund sind rund die Hälfte aller Nebenkostenabrechnungen
            fehlerhaft. Das führt zu Widersprüchen, Rückzahlungen und im
            schlimmsten Fall zu gerichtlichen Auseinandersetzungen.
            Professionelle Rechner-Tools minimieren dieses Risiko.
          </p>

          <h3 className="text-xl font-semibold text-[#111827] mb-3">
            Nebenkostenabrechnung: Verteilerschlüssel richtig anwenden
          </h3>
          <p className="text-[#4B5563] leading-relaxed mb-6">
            Die häufigste Fehlerquelle bei Nebenkostenabrechnungen ist der
            falsche Verteilerschlüssel. Welche Kosten werden nach
            Wohnfläche umgelegt, welche nach Personenzahl, welche nach
            Verbrauch? Unser Nebenkostenabrechnung-Rechner unterscheidet
            sauber zwischen umlegbaren und nicht-umlegbaren Kosten und
            wendet den gewählten Schlüssel korrekt an. Das Ergebnis lässt
            sich als PDF exportieren — eine nachvollziehbare Dokumentation,
            die auch bei Rückfragen von Mietern standhält.
          </p>

          <h3 className="text-xl font-semibold text-[#111827] mb-3">
            Mieterhöhung: Kappungsgrenze und Fristen einhalten
          </h3>
          <p className="text-[#4B5563] leading-relaxed mb-6">
            Eine Mieterhöhung bis zur ortsüblichen Vergleichsmiete ist an
            strenge Voraussetzungen geknüpft. Die Miete darf innerhalb von
            drei Jahren um maximal 20 Prozent steigen — in Gebieten mit
            angespanntem Wohnungsmarkt sogar nur um 15 Prozent. Dazu kommen
            Sperrfristen und formale Anforderungen. Der
            Mieterhöhungs-Rechner berücksichtigt all diese Faktoren und
            zeigt Ihnen den frühesten Zeitpunkt und den maximal zulässigen
            Betrag. So vermeiden Sie unwirksame Mieterhöhungen, die vor
            Gericht keinen Bestand haben.
          </p>

          <h3 className="text-xl font-semibold text-[#111827] mb-3">
            Wohnfläche und Instandhaltung korrekt berechnen
          </h3>
          <p className="text-[#4B5563] leading-relaxed">
            Die korrekte Wohnfläche ist die Grundlage für
            Nebenkostenabrechnungen, Mieterhöhungen und Mietverträge. Eine
            fehlerhafte Berechnung kann alle darauf aufbauenden Dokumente
            angreifbar machen. Unsere Wohnflächenberechnung nach WoFlV
            berücksichtigt Dachschrägen, Balkone, Terrassen und Keller mit
            den korrekten Anrechnungsfaktoren. Ergänzend zeigt der
            Instandhaltungskosten-Rechner nach der Petersschen Formel, wie
            hoch die Rücklage sein sollte — eine wichtige Kennzahl für die
            WEG-Verwaltung und die jährliche Eigentümerversammlung.
          </p>
        </div>
      </section>

      {/* ───── 5. CTA ───── */}
      <section className="bg-[#0B0D14] py-24 px-6">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#F1F5F9] mb-4">
            Rechtssicher berechnen — ab heute
          </h2>
          <p className="text-[#94A3B8] mb-8">
            Testen Sie alle 16 Rechner 7 Tage lang kostenlos. Keine
            Kreditkarte, keine Verpflichtung — einfach loslegen.
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
