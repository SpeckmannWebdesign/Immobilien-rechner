import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"

/* ─────────────────────── Metadata ─────────────────────── */

export const metadata: Metadata = {
  title: "Häufige Fragen (FAQ) | Immobilien-Rechner",
  description:
    "Antworten auf die häufigsten Fragen zu Immobilien-Rechner: Funktionen, Preise, Einbettung, Datenschutz und mehr.",
}

/* ─────────────────────── FAQ-Daten ─────────────────────── */

interface FaqItem {
  question: string
  answer: string
}

interface FaqCategory {
  title: string
  id: string
  items: FaqItem[]
}

const faqCategories: FaqCategory[] = [
  {
    title: "Allgemein",
    id: "allgemein",
    items: [
      {
        question: "Was ist Immobilien-Rechner?",
        answer:
          "Immobilien-Rechner ist eine Plattform mit 16 professionellen Rechnern für die Immobilienbranche. Von Grunderwerbsteuer über Mietrendite bis Tilgungsplan — alle Tools basieren auf aktuellen deutschen Steuer- und Rechtsgrundlagen. Sie können die Rechner im Dashboard nutzen oder als Widget auf Ihrer eigenen Website einbetten.",
      },
      {
        question: "Für wen ist Immobilien-Rechner gedacht?",
        answer:
          "Immobilien-Rechner richtet sich an Immobilienmakler, Investoren, Finanzberater, Hausverwaltungen und alle, die professionelle Immobilien-Berechnungen durchführen möchten. Die Embed-Widgets sind besonders für Unternehmen interessant, die ihren Website-Besuchern interaktive Rechner anbieten wollen.",
      },
      {
        question: "Wie viele Rechner gibt es?",
        answer:
          "Aktuell stehen Ihnen 16 professionelle Rechner zur Verfügung. Dazu gehören unter anderem: Grunderwerbsteuer-Rechner, Mietrendite-Rechner, Tilgungsrechner, Kaufnebenkosten-Rechner, Maklergebühren-Rechner, Wohnflächen-Rechner und viele mehr. Wir erweitern das Angebot regelmäßig.",
      },
      {
        question: "Brauche ich Vorkenntnisse, um die Rechner zu nutzen?",
        answer:
          "Nein, keinerlei Vorkenntnisse nötig. Jeder Rechner hat eine intuitive Benutzeroberfläche mit verständlichen Eingabefeldern und Erklärungen. Sie geben Ihre Werte ein und erhalten sofort das Ergebnis — ohne Fachwissen oder technische Kenntnisse.",
      },
      {
        question: "Welche Browser werden unterstützt?",
        answer:
          "Immobilien-Rechner funktioniert in allen modernen Browsern: Google Chrome, Mozilla Firefox, Safari, Microsoft Edge und Opera. Wir empfehlen, Ihren Browser aktuell zu halten, um die beste Nutzererfahrung zu erhalten. Mobile Browser auf iOS und Android werden ebenfalls vollständig unterstützt.",
      },
    ],
  },
  {
    title: "Preise & Abo",
    id: "preise-abo",
    items: [
      {
        question: "Kann ich Immobilien-Rechner kostenlos testen?",
        answer:
          "Ja, Sie können alle Funktionen 7 Tage lang kostenlos testen — inklusive Einbettung und PDF-Export. Sie brauchen keine Kreditkarte. Nach Ablauf der Testphase wählen Sie einen passenden Plan oder Ihr Account wird automatisch pausiert.",
      },
      {
        question: "Kann ich jederzeit kündigen?",
        answer:
          "Ja, absolut. Es gibt keine Mindestlaufzeit und keine versteckten Kosten. Sie können Ihr Abo jederzeit zum Ende der aktuellen Laufzeit kündigen. Im monatlichen Plan ist das zum Monatsende, im Jahresplan zum Ende des Jahres.",
      },
      {
        question: "Welche Zahlungsmethoden werden akzeptiert?",
        answer:
          "Wir akzeptieren alle gängigen Kreditkarten (Visa, Mastercard, American Express), SEPA-Lastschrift und PayPal. Die Zahlung wird sicher über Stripe abgewickelt.",
      },
      {
        question: "Sind die Preise inklusive Mehrwertsteuer?",
        answer:
          "Ja, alle angegebenen Preise sind Bruttopreise inklusive 19 % Mehrwertsteuer. Die MwSt wird auf jeder Rechnung separat ausgewiesen, sodass Sie diese als Vorsteuer geltend machen können.",
      },
      {
        question: "Gibt es einen Rabatt bei jährlicher Zahlung?",
        answer:
          "Ja, bei jährlicher Zahlung sparen Sie 20 % gegenüber der monatlichen Abrechnung. Sie zahlen also 12 Monate zum Preis von ca. 9,6 Monaten. Den Jahresplan können Sie direkt auf unserer Preisseite auswählen.",
      },
    ],
  },
  {
    title: "Rechner",
    id: "rechner",
    items: [
      {
        question: "Wie genau sind die Berechnungen?",
        answer:
          "Unsere Rechner basieren auf aktuellen deutschen Steuer- und Rechtsgrundlagen. Die Grunderwerbsteuersätze werden bei Änderungen zeitnah aktualisiert, Tilgungsberechnungen folgen den Standardformeln der Finanzbranche. Die Ergebnisse dienen als professionelle Orientierung — für verbindliche Zusagen sollten Sie immer einen Steuerberater oder Finanzexperten konsultieren.",
      },
      {
        question: "Welche Daten werden bei der Berechnung gespeichert?",
        answer:
          "Keine. Alle Berechnungen finden direkt in Ihrem Browser statt. Die eingegebenen Werte werden nicht an unsere Server übertragen und nicht gespeichert. Sobald Sie die Seite verlassen, sind alle Daten weg.",
      },
      {
        question: "Kann ich die Rechner auch offline nutzen?",
        answer:
          "Nein, für die Nutzung der Rechner ist eine aktive Internetverbindung erforderlich. Die Rechner werden als Web-Applikation geladen und benötigen eine Verbindung zu unseren Servern.",
      },
      {
        question: "Gibt es einen PDF-Export der Ergebnisse?",
        answer:
          "Ja, ab dem Pro-Plan können Sie Berechnungsergebnisse als professionelles PDF exportieren. Das PDF enthält alle Eingabewerte, das Ergebnis und bei ausgewählten Rechnern auch eine grafische Darstellung. Ideal für die Weitergabe an Kunden oder zur Dokumentation.",
      },
      {
        question: "Auf welchen Berechnungsmethoden basieren die Rechner?",
        answer:
          "Jeder Rechner nutzt die branchenüblichen Berechnungsmethoden. Tilgungsrechner verwenden die Annuitätenmethode, Rendite-Rechner arbeiten mit Netto- und Bruttomietrendite, Steuerrechner basieren auf den aktuellen Steuersätzen der jeweiligen Bundesländer. Alle Formeln sind transparent und nachvollziehbar.",
      },
    ],
  },
  {
    title: "Einbettung",
    id: "einbettung",
    items: [
      {
        question: "Was genau ist ein Embed-Widget?",
        answer:
          "Ein Embed-Widget ist ein Rechner, den Sie direkt auf Ihrer eigenen Website einbetten. Sie erhalten einen kurzen Code-Snippet (eine Zeile HTML + Script), den Sie einfach einfügen. Der Rechner erscheint dann als professionelles, interaktives Widget auf Ihrer Seite.",
      },
      {
        question: "Auf welchen Websites kann ich die Rechner einbetten?",
        answer:
          "Die Embed-Widgets funktionieren mit jeder Website: Webflow, WordPress, Wix, Squarespace, Jimdo, Shopify oder reinem HTML. Überall dort, wo Sie HTML-Code einfügen können, funktioniert auch unser Embed-Widget.",
      },
      {
        question: "Welche technischen Anforderungen gibt es?",
        answer:
          "Keine besonderen. Sie benötigen lediglich die Möglichkeit, einen HTML-Code-Snippet auf Ihrer Website einzufügen. Das Widget lädt sich selbst, passt sich an die verfügbare Breite an und funktioniert in allen modernen Browsern. Es sind keine Plugins, Frameworks oder Programmierkenntnisse erforderlich.",
      },
    ],
  },
  {
    title: "Datenschutz",
    id: "datenschutz",
    items: [
      {
        question: "Ist Immobilien-Rechner DSGVO-konform?",
        answer:
          "Ja. Alle Daten werden auf deutschen Servern (Hetzner) gehostet und verarbeitet. Die Rechner setzen keine Cookies und tracken keine personenbezogenen Daten Ihrer Website-Besucher. Sie können die Rechner bedenkenlos auf Ihrer Website einsetzen, ohne Ihre Datenschutzerklärung anpassen zu müssen.",
      },
      {
        question: "Wo stehen die Server?",
        answer:
          "Unsere Server stehen in Deutschland bei Hetzner. Alle Daten bleiben in der EU. Es findet kein Datentransfer in Drittländer statt. Damit erfüllen wir die strengen Anforderungen der DSGVO und des deutschen Datenschutzrechts.",
      },
    ],
  },
]

/* ─────────────────────── Structured Data ─────────────────────── */

const allFaqs = faqCategories.flatMap((cat) => cat.items)

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}

/* ─────────────────────── Seite ─────────────────────── */

export default function FaqPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ───── 1. HERO ───── */}
      <section className="bg-[#F7F8FB] pt-20 pb-16 px-6">
        <div className="max-w-[1120px] mx-auto text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.02em] text-[#111827]">
            Häufige Fragen
          </h1>
          <p className="mt-4 text-lg text-[#4B5563] max-w-[640px] mx-auto">
            Alles, was Sie über Immobilien-Rechner wissen müssen — von
            Funktionen über Preise bis Datenschutz.
          </p>
        </div>
      </section>

      {/* ───── 2. FAQ KATEGORIEN ───── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[800px] mx-auto space-y-16">
          {faqCategories.map((category) => (
            <div key={category.id}>
              <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold tracking-[-0.02em] text-[#111827] mb-6">
                {category.title}
              </h2>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <details
                    key={item.question}
                    className="group border border-[#E3E5EB] rounded-lg"
                  >
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-[#111827] font-medium hover:bg-[#F7F8FB] rounded-lg transition-colors [&::-webkit-details-marker]:hidden">
                      <span className="pr-4">{item.question}</span>
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-[#9CA3AF] transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="px-6 pb-4 text-[#4B5563] leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── 3. CTA ───── */}
      <section className="bg-[#0B0D14] py-24 px-6">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#F1F5F9] mb-4">
            Noch Fragen?
          </h2>
          <p className="text-[#94A3B8] mb-8">
            Schreiben Sie uns — wir antworten in der Regel innerhalb von 24
            Stunden. Oder testen Sie Immobilien-Rechner einfach selbst.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/anmelden"
              className="inline-flex items-center gap-2 bg-[#4338CA] text-white font-medium px-8 py-3.5 rounded-lg hover:bg-[#5B52E0] transition-colors duration-300"
            >
              7 Tage kostenlos testen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-[#94A3B8] font-medium px-8 py-3.5 rounded-lg border border-[#2D3748] hover:border-[#4B5563] hover:text-[#F1F5F9] transition-colors duration-300"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
