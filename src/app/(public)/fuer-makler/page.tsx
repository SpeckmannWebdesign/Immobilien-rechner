import Link from "next/link"
import {
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Calculator,
  Landmark,
  Scale,
  BarChart3,
  Building2,
  Code,
  Users,
  Clock,
  Award,
} from "lucide-react"
import type { Metadata } from "next"

/* ─────────────────────── Metadata ─────────────────────── */

export const metadata: Metadata = {
  title: "Immobilien-Rechner für Makler | Professionelle Analyse-Tools",
  description:
    "Professionelle Immobilien-Rechner für Makler: Rendite, Kaufnebenkosten, Grunderwerbsteuer, Finanzierung und mehr. Auf Ihrer Makler-Website einbetten oder im Dashboard nutzen.",
  openGraph: {
    title: "Immobilien-Rechner für Makler | Professionelle Analyse-Tools",
    description:
      "Professionelle Immobilien-Rechner für Makler: Rendite, Kaufnebenkosten, Grunderwerbsteuer, Finanzierung und mehr.",
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
      "Brutto- und Nettomietrendite berechnen — überzeugen Sie Kaufinteressenten mit konkreten Zahlen.",
    icon: TrendingUp,
  },
  {
    slug: "kaufnebenkosten-rechner",
    name: "Kaufnebenkosten-Rechner",
    description:
      "Grunderwerbsteuer, Notar, Grundbuch und Maklergebühr transparent aufschlüsseln.",
    icon: Calculator,
  },
  {
    slug: "grunderwerbsteuer-rechner",
    name: "Grunderwerbsteuer-Rechner",
    description:
      "Grunderwerbsteuer für alle 16 Bundesländer berechnen und vergleichen.",
    icon: Landmark,
  },
  {
    slug: "kaufen-vs-mieten",
    name: "Kaufen vs. Mieten",
    description:
      "Zeigen Sie Mietern schwarz auf weiß, ab wann sich der Kauf rechnet.",
    icon: Scale,
  },
  {
    slug: "objektvergleich",
    name: "Objektvergleich",
    description:
      "Bis zu 3 Objekte nebeneinander vergleichen — ideal für die Kundenberatung.",
    icon: BarChart3,
  },
  {
    slug: "finanzierungsrechner",
    name: "Finanzierungsrechner",
    description:
      "Monatliche Rate, Zinskosten und Restschuld berechnen — direkt im Kundengespräch.",
    icon: Building2,
  },
]

/* ─────────────────────── Vorteile ─────────────────────── */

const vorteile = [
  {
    icon: Code,
    title: "Rechner auf Ihrer Website einbetten",
    description:
      "Binden Sie professionelle Rechner per Embed-Widget direkt auf Ihrer Makler-Website ein. Ein kurzer Code-Snippet genügt — funktioniert mit Webflow, WordPress, Wix und jeder anderen Plattform.",
  },
  {
    icon: Users,
    title: "Kunden fundiert beraten",
    description:
      "Zeigen Sie Kaufinteressenten im Gespräch konkrete Zahlen: Rendite, Kaufnebenkosten, monatliche Rate. Nachvollziehbare Berechnungen schaffen Vertrauen und beschleunigen die Kaufentscheidung.",
  },
  {
    icon: Clock,
    title: "Zeitaufwand reduzieren",
    description:
      "Statt manuell in Excel zu rechnen, erhalten Sie mit wenigen Eingaben ein vollständiges Ergebnis — inklusive PDF-Export für Ihre Kunden. Das spart pro Beratung bis zu 30 Minuten.",
  },
  {
    icon: Award,
    title: "Professionell auftreten",
    description:
      "Interaktive Rechner auf Ihrer Website heben Sie von der Konkurrenz ab. Besucher bleiben länger, interagieren mit Ihren Inhalten und nehmen Sie als kompetenten Ansprechpartner wahr.",
  },
]

/* ─────────────────────── Structured Data ─────────────────────── */

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Immobilien-Rechner für Makler",
  description:
    "Professionelle Immobilien-Rechner für Makler: Rendite, Kaufnebenkosten, Grunderwerbsteuer, Finanzierung und mehr.",
  url: "https://immobilien-rechner.de/fuer-makler",
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
      name: "Für Makler",
      item: "https://immobilien-rechner.de/fuer-makler",
    },
  ],
}

/* ─────────────────────── Seite ─────────────────────── */

export default function FuerMaklerPage() {
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
            <span className="text-[#4B5563] font-medium">Für Makler</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-[#111827] mb-4">
              Professionelle Rechner für Immobilienmakler
            </h1>
            <p className="text-lg text-[#4B5563] leading-relaxed mb-8">
              Beraten Sie Ihre Kunden mit belastbaren Zahlen statt
              Bauchgefühl. Rendite, Kaufnebenkosten, Finanzierung — alles in
              einem Tool, das Sie direkt auf Ihrer Website einbetten können.
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
            Die wichtigsten Rechner für Ihre Makler-Arbeit
          </h2>
          <p className="text-[#4B5563] text-center max-w-[640px] mx-auto mb-12">
            Sechs Rechner, die Ihren Arbeitsalltag spürbar erleichtern — von
            der Objektakquise bis zum Notartermin.
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

      {/* ───── 3. VORTEILE FÜR MAKLER ───── */}
      <section className="bg-[#F7F8FB] py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] text-center mb-4">
            Warum Makler mit unseren Rechnern arbeiten
          </h2>
          <p className="text-[#4B5563] text-center max-w-[640px] mx-auto mb-12">
            Von der Lead-Generierung auf Ihrer Website bis zur
            Kundenberatung vor Ort.
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
            Warum Immobilienmakler professionelle Rechner brauchen
          </h2>

          <p className="text-[#4B5563] leading-relaxed mb-6">
            Der Immobilienmarkt in Deutschland ist datengetriebener als je
            zuvor. Käufer recherchieren Preise, vergleichen Renditen und
            rechnen Finanzierungen durch, bevor sie überhaupt einen Makler
            kontaktieren. Wer als Makler in diesem Umfeld bestehen will,
            muss mehr bieten als ein ansprechendes Exposé. Professionelle
            Rechner-Tools auf der eigenen Website signalisieren Kompetenz
            und schaffen einen echten Mehrwert für potenzielle Kunden.
          </p>

          <h3 className="text-xl font-semibold text-[#111827] mb-3">
            Mehr Leads durch interaktive Inhalte
          </h3>
          <p className="text-[#4B5563] leading-relaxed mb-6">
            Ein eingebetteter Rendite-Rechner oder Kaufnebenkosten-Rechner
            hält Besucher deutlich länger auf Ihrer Website. Statt nach
            wenigen Sekunden abzuspringen, beschäftigen sich Interessenten
            aktiv mit Ihren Inhalten. Das verbessert nicht nur Ihre
            Google-Rankings durch längere Verweildauer — es erhöht auch die
            Wahrscheinlichkeit, dass aus einem Website-Besucher ein
            qualifizierter Lead wird. Ein Kaufinteressent, der bereits seine
            Kaufnebenkosten kennt, ist im Erstgespräch deutlich weiter als
            jemand, der noch bei Null anfängt.
          </p>

          <h3 className="text-xl font-semibold text-[#111827] mb-3">
            Überzeugende Kundenberatung mit konkreten Zahlen
          </h3>
          <p className="text-[#4B5563] leading-relaxed mb-6">
            Im Beratungsgespräch zählen Fakten. Wenn Sie einem
            Kaufinteressenten in Sekunden vorrechnen können, wie sich
            Eigenkapitalrendite, monatliche Belastung und Steuerersparnis
            zusammensetzen, schaffen Sie Vertrauen. Der Objektvergleich
            ermöglicht es, verschiedene Immobilien direkt gegenüberzustellen
            — eine Funktion, die Kunden regelmäßig als ausschlaggebend für
            ihre Kaufentscheidung nennen. Gleichzeitig sparen Sie sich das
            manuelle Zusammenstellen von Excel-Tabellen und können sich auf
            das konzentrieren, was wirklich zählt: die Beratung.
          </p>

          <h3 className="text-xl font-semibold text-[#111827] mb-3">
            Wettbewerbsvorteil im digitalen Maklermarkt
          </h3>
          <p className="text-[#4B5563] leading-relaxed">
            PropTech-Plattformen wie McMakler oder Homeday setzen schon
            länger auf digitale Rechner-Tools. Als selbstständiger Makler
            oder regionales Maklerbüro können Sie mit eingebetteten
            Immobilien-Rechnern gleichziehen — ohne eigene Entwicklungskosten.
            Ihre Website wird zur Anlaufstelle für Immobilienfragen in
            Ihrer Region. Das stärkt Ihre lokale Sichtbarkeit bei Google
            und positioniert Sie als den Experten, der nicht nur verkauft,
            sondern auch berät.
          </p>
        </div>
      </section>

      {/* ───── 5. CTA ───── */}
      <section className="bg-[#0B0D14] py-24 px-6">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#F1F5F9] mb-4">
            Starten Sie jetzt mit den Profi-Rechnern
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
