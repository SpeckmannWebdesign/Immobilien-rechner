import Link from "next/link"
import { ArrowRight, Check, X } from "lucide-react"
import type { Metadata } from "next"
import { PricingToggle, FaqAccordion } from "./pricing-toggle"

/* ─────────────────────── Metadata ─────────────────────── */

export const metadata: Metadata = {
  title: "Preise | Professioneller Immobilien-Rechner",
  description:
    "Transparente Preise für 16 professionelle Immobilien-Rechner. Ab 19 € im Monat. 7 Tage kostenlos testen.",
}

/* ─────────────────────── Feature-Vergleichstabelle ─────────────────────── */

type FeatureValue = boolean | string

interface ComparisonRow {
  label: string
  starter: FeatureValue
  pro: FeatureValue
  business: FeatureValue
}

const comparisonRows: ComparisonRow[] = [
  { label: "Dashboard-Zugang", starter: true, pro: true, business: true },
  { label: "Anzahl Rechner", starter: "16", pro: "16", business: "16" },
  {
    label: "Unbegrenzte Berechnungen",
    starter: true,
    pro: true,
    business: true,
  },
  { label: "PDF-Export", starter: false, pro: true, business: true },
  { label: "Embed-Widgets", starter: "0", pro: "1", business: "Alle 16" },
  {
    label: "Eigene Farben & Dark Mode",
    starter: false,
    pro: true,
    business: true,
  },
  { label: "Analytics", starter: false, pro: true, business: true },
  {
    label: "Prioritäts-Support",
    starter: false,
    pro: false,
    business: true,
  },
  { label: "Custom Branding", starter: false, pro: false, business: true },
]

function CellValue({ value }: { value: FeatureValue }) {
  if (typeof value === "string") {
    return (
      <span className="text-sm font-medium text-[#111827]">{value}</span>
    )
  }
  if (value) {
    return <Check className="h-5 w-5 text-[#059669] mx-auto" />
  }
  return <X className="h-5 w-5 text-[#d1d1d6] mx-auto" />
}

/* ─────────────────────── FAQ-Daten ─────────────────────── */

const faqs = [
  {
    question: "Gibt es eine kostenlose Testphase?",
    answer:
      "Ja, Sie können alle Funktionen 7 Tage lang kostenlos testen — inklusive Einbettung und PDF-Export. Sie brauchen keine Kreditkarte. Nach Ablauf der Testphase wählen Sie einen passenden Plan oder Ihr Account wird automatisch pausiert.",
  },
  {
    question: "Kann ich jederzeit kündigen?",
    answer:
      "Ja, absolut. Es gibt keine Mindestlaufzeit und keine versteckten Kosten. Sie können Ihr Abo jederzeit zum Ende der aktuellen Laufzeit kündigen. Im monatlichen Plan ist das zum Monatsende, im Jahresplan zum Ende des Jahres.",
  },
  {
    question: "Was passiert nach der Testphase?",
    answer:
      "Wenn Sie keinen Plan wählen, wird Ihr Account pausiert. Ihre Einstellungen und Daten bleiben erhalten. Eingebettete Rechner zeigen einen Hinweis an, dass das Abo abgelaufen ist. Sobald Sie einen Plan aktivieren, funktioniert alles sofort wieder.",
  },
  {
    question: "Welche Zahlungsmethoden gibt es?",
    answer:
      "Wir akzeptieren alle gängigen Kreditkarten (Visa, Mastercard, American Express), SEPA-Lastschrift und PayPal. Die Zahlung wird sicher über Stripe abgewickelt.",
  },
  {
    question: "Sind die Preise inkl. MwSt?",
    answer:
      "Ja, alle angegebenen Preise sind Bruttopreise inklusive 19 % Mehrwertsteuer. Die MwSt wird auf jeder Rechnung separat ausgewiesen, sodass Sie diese als Vorsteuer geltend machen können.",
  },
  {
    question: "Was ist ein Embed-Widget?",
    answer:
      "Ein Embed-Widget ist ein Rechner, den Sie direkt auf Ihrer eigenen Website einbetten. Sie erhalten einen kurzen Code-Snippet (eine Zeile HTML + Script), den Sie einfach einfügen. Der Rechner erscheint dann als professionelles, interaktives Widget. Das funktioniert mit jeder Website — Webflow, WordPress, Wix, Squarespace oder reinem HTML.",
  },
  {
    question: "Kann ich den Plan jederzeit wechseln?",
    answer:
      "Ja, ein Wechsel ist jederzeit möglich. Ein Upgrade wird sofort aktiv, ein Downgrade zum Ende der aktuellen Laufzeit. Bei einem Upgrade wird die Differenz anteilig verrechnet, sodass Sie nie doppelt bezahlen.",
  },
  {
    question: "Gibt es Rabatt für jährliche Zahlung?",
    answer:
      "Ja, bei jährlicher Zahlung sparen Sie 20 % gegenüber der monatlichen Abrechnung. Sie zahlen also 12 Monate zum Preis von ca. 9,6 Monaten. Den Jahresplan können Sie jederzeit über den Toggle oben auf dieser Seite sehen.",
  },
  {
    question: "Brauche ich technische Kenntnisse?",
    answer:
      "Nein, die Rechner im Dashboard können Sie sofort nutzen — ohne jegliche technische Kenntnisse. Für die Einbettung auf Ihrer Website kopieren Sie lediglich einen Code-Snippet und fügen ihn auf Ihrer Seite ein. Das geht bei den meisten Website-Baukästen in unter einer Minute.",
  },
  {
    question: "Sind die Rechner DSGVO-konform?",
    answer:
      "Ja. Alle Daten werden auf deutschen Servern (Hetzner) gehostet und verarbeitet. Die Rechner setzen keine Cookies und tracken keine personenbezogenen Daten Ihrer Website-Besucher. Sie können die Rechner bedenkenlos einsetzen.",
  },
]

/* ─────────────────────── Structured Data ─────────────────────── */

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Immobilien-Rechner",
  description:
    "16 professionelle Immobilien-Rechner für Makler, Investoren und Hausverwaltungen. Als Dashboard oder Website-Widget nutzbar.",
  brand: {
    "@type": "Organization",
    name: "Immobilien-Rechner",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "19.00",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "19.00",
        priceCurrency: "EUR",
        billingDuration: "P1M",
      },
      description: "Alle 16 Rechner im Dashboard nutzen",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "39.00",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "39.00",
        priceCurrency: "EUR",
        billingDuration: "P1M",
      },
      description:
        "1 Rechner als Widget auf Ihrer Website einbetten",
    },
    {
      "@type": "Offer",
      name: "Business",
      price: "69.00",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "69.00",
        priceCurrency: "EUR",
        billingDuration: "P1M",
      },
      description:
        "Alle 16 Rechner als Widgets auf Ihrer Website einbetten",
    },
  ],
}

/* ─────────────────────── Seite ─────────────────────── */

export default function PreisePage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* ───── 1. HERO ───── */}
      <section className="bg-white pt-20 pb-6 px-6">
        <div className="max-w-[1120px] mx-auto text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.02em] text-[#111827]">
            Einfache, transparente Preise.
          </h1>
          <p className="mt-4 text-lg text-[#4B5563] max-w-[640px] mx-auto">
            16 professionelle Rechner für Makler, Investoren und
            Hausverwaltungen. 7 Tage kostenlos testen — keine Kreditkarte
            nötig.
          </p>
        </div>
      </section>

      {/* ───── 2. PRICING CARDS ───── */}
      <section className="bg-white pb-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <PricingToggle />
        </div>
      </section>

      {/* ───── 3. FEATURE-VERGLEICHSTABELLE ───── */}
      <section className="bg-[#F7F8FB] py-24 px-6">
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] text-center mb-12">
            Alle Features im Vergleich
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[#E3E5EB]">
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-[#111827]">
                    Feature
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-[#111827]">
                    Starter
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-[#4338CA]">
                    Pro
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-[#111827]">
                    Business
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-[#E3E5EB] transition-colors hover:bg-[#EEEEF3] ${
                      i % 2 === 0 ? "bg-white" : "bg-[#F7F8FB]"
                    }`}
                  >
                    <td className="py-4 pr-4 text-sm text-[#4B5563]">
                      {row.label}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <CellValue value={row.starter} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <CellValue value={row.pro} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <CellValue value={row.business} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ───── 4. FAQ ───── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] text-center mb-12">
            Häufige Fragen
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ───── 5. CTA ───── */}
      <section className="bg-[#0B0D14] py-24 px-6">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#F1F5F9] mb-4">
            Bereit für professionelle Immobilien-Rechner?
          </h2>
          <p className="text-[#94A3B8] mb-8">
            Testen Sie alle 16 Rechner 7 Tage lang kostenlos. Keine
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
