import Link from "next/link"
import {
  ArrowRight,
  UserPlus,
  MousePointerClick,
  Code2,
  Palette,
  Calculator,
  Shield,
  Smartphone,
  Building2,
  TrendingUp,
  Home,
  Globe,
} from "lucide-react"
import type { Metadata } from "next"

/* ─────────────────────── Metadata ─────────────────────── */

export const metadata: Metadata = {
  title: "Rechner einbetten | Embed-Widgets für Ihre Website",
  description:
    "Betten Sie professionelle Immobilien-Rechner direkt auf Ihrer Website ein. Responsive Widgets, eigene Marke, DSGVO-konform. Für Makler, Finanzberater und Hausverwaltungen.",
}

/* ─────────────────────── Structured Data ─────────────────────── */

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Rechner einbetten | Embed-Widgets für Ihre Website",
  description:
    "Betten Sie professionelle Immobilien-Rechner direkt auf Ihrer Website ein. Responsive Widgets, eigene Marke, DSGVO-konform.",
  url: "https://immobilien-rechner.de/einbettung",
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
      name: "Einbettung",
      item: "https://immobilien-rechner.de/einbettung",
    },
  ],
}

/* ─────────────────────── Daten ─────────────────────── */

const steps = [
  {
    icon: UserPlus,
    title: "Account erstellen",
    description:
      "Registrieren Sie sich kostenlos und starten Sie Ihre 14-tägige Testphase. Keine Kreditkarte nötig.",
  },
  {
    icon: MousePointerClick,
    title: "Rechner auswählen",
    description:
      "Wählen Sie aus 16 professionellen Rechnern den passenden für Ihre Website. Passen Sie Farben und Stil an.",
  },
  {
    icon: Code2,
    title: "Code einbetten",
    description:
      "Kopieren Sie den Embed-Code und fügen Sie ihn auf Ihrer Website ein. Eine Zeile HTML — fertig.",
  },
]

const benefits = [
  {
    icon: Palette,
    title: "Eigene Marke",
    description:
      "Passen Sie Farben, Dark Mode und Branding an Ihre Corporate Identity an.",
  },
  {
    icon: Calculator,
    title: "Alle 16 Rechner",
    description:
      "Von Grunderwerbsteuer bis Mietrendite — jeder Rechner als Widget verfügbar.",
  },
  {
    icon: Shield,
    title: "DSGVO-konform",
    description:
      "Deutsche Server, keine Cookies, keine Tracking-Daten Ihrer Besucher.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Jeder Rechner passt sich automatisch an Desktop, Tablet und Smartphone an.",
  },
]

const audiences = [
  {
    icon: Building2,
    title: "Makler-Websites",
    description:
      "Bieten Sie Ihren Interessenten direkt auf Ihrer Website professionelle Berechnungen an.",
  },
  {
    icon: TrendingUp,
    title: "Finanzberater",
    description:
      "Ergänzen Sie Ihre Beratungsseite mit interaktiven Tools für Ihre Kunden.",
  },
  {
    icon: Home,
    title: "Hausverwaltungen",
    description:
      "Stellen Sie Eigentümern und Mietern nützliche Rechner zur Verfügung.",
  },
  {
    icon: Globe,
    title: "Immobilien-Portale",
    description:
      "Erweitern Sie Ihr Portal mit professionellen Berechnungstools.",
  },
]

/* ─────────────────────── Seite ─────────────────────── */

export default function EinbettungPage() {
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
      <section className="bg-[#F7F8FB] pt-20 pb-16 px-6">
        <div className="max-w-[1120px] mx-auto text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.02em] text-[#111827]">
            Rechner auf Ihrer Website einbetten
          </h1>
          <p className="mt-4 text-lg text-[#4B5563] max-w-[640px] mx-auto">
            Integrieren Sie professionelle Immobilien-Rechner als Widget direkt
            auf Ihrer Website — in wenigen Minuten, ohne Programmierkenntnisse.
          </p>
        </div>
      </section>

      {/* ───── 2. SO FUNKTIONIERT'S ───── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] text-center mb-12">
            So funktioniert die Einbettung
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F7F8FB]">
                    <step.icon className="h-5 w-5 text-[#4B5563]" />
                  </div>
                  <span className="text-sm font-semibold text-[#9CA3AF]">
                    Schritt {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#4B5563] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 3. VORTEILE ───── */}
      <section className="bg-[#F7F8FB] py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] text-center mb-12">
            Ihre Vorteile
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title}>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white mb-4">
                  <benefit.icon className="h-5 w-5 text-[#4B5563]" />
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 4. FÜR WEN? ───── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] text-center mb-12">
            Für wen sind die Embed-Widgets?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {audiences.map((audience) => (
              <div key={audience.title}>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F7F8FB] mb-4">
                  <audience.icon className="h-5 w-5 text-[#4B5563]" />
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">
                  {audience.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 5. PREISE ───── */}
      <section className="bg-[#F7F8FB] py-24 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] mb-6">
            Flexible Preise für jede Anforderung
          </h2>
          <p className="text-[#4B5563] leading-relaxed mb-8 max-w-[640px] mx-auto">
            Ob ein einzelner Rechner oder alle 16 als Widget — wir haben den
            passenden Plan. Ab 39 Euro im Monat können Sie Rechner auf Ihrer
            Website einbetten. 7 Tage kostenlos testen.
          </p>
          <Link
            href="/preise"
            className="inline-flex items-center gap-2 bg-[#4338CA] text-white font-medium px-8 py-3.5 rounded-lg hover:bg-[#5B52E0] transition-colors duration-300"
          >
            Preise ansehen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ───── 6. CTA ───── */}
      <section className="bg-[#0B0D14] py-24 px-6">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#F1F5F9] mb-4">
            Bereit, Ihre Website aufzuwerten?
          </h2>
          <p className="text-[#94A3B8] mb-8">
            Starten Sie jetzt mit der Einbettung. 7 Tage kostenlos — keine
            Kreditkarte, keine Verpflichtung.
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
