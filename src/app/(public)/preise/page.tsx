import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, HelpCircle } from "lucide-react"
import type { Metadata } from "next"
import { PricingToggle } from "./pricing-toggle"

export const metadata: Metadata = {
  title: "Preise — Immobilien-Rechner für Profis",
  description:
    "Ab 19 € im Monat. 12 professionelle Immobilien-Rechner im Dashboard nutzen oder auf Ihrer Website einbetten. 14 Tage kostenlos testen.",
}

const plans = [
  {
    name: "Starter",
    description: "Alle Rechner im Dashboard nutzen",
    priceMonthly: 19,
    priceYearly: 15.2,
    features: [
      "Alle 12 Rechner im Dashboard",
      "PDF-Export aller Ergebnisse",
      "Ergebnisse per E-Mail versenden",
      "Unbegrenzte Berechnungen",
    ],
    notIncluded: [
      "Rechner auf Website einbetten",
      "Analytics & Statistiken",
    ],
    cta: "Kostenlos testen",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    description: "1 Rechner auf Ihrer Website einbetten",
    priceMonthly: 39,
    priceYearly: 31.2,
    popular: true,
    features: [
      "Alles aus Starter",
      "1 Rechner als Widget einbetten",
      "Unbegrenzt viele Domains",
      "Eigene Farben & Dark Mode",
      "Embed-Analytics",
      "\"Powered by\" Branding",
    ],
    notIncluded: [
      "Alle Rechner einbetten",
    ],
    cta: "Kostenlos testen",
    variant: "default" as const,
  },
  {
    name: "Business",
    description: "Alle Rechner auf Ihrer Website einbetten",
    priceMonthly: 69,
    priceYearly: 55.2,
    features: [
      "Alles aus Pro",
      "Alle 12 Rechner einbetten",
      "Unbegrenzt viele Domains",
      "Eigene Farben & Dark Mode",
      "Embed-Analytics",
      "Prioritäts-Support",
    ],
    notIncluded: [],
    cta: "Kostenlos testen",
    variant: "outline" as const,
  },
]

const faqs = [
  {
    question: "Wie funktioniert der kostenlose Test?",
    answer:
      "Sie haben 14 Tage lang Zugriff auf alle Funktionen — inklusive Einbettung. Keine Kreditkarte nötig. Nach Ablauf wählen Sie einen Plan oder Ihr Account wird pausiert.",
  },
  {
    question: "Kann ich jederzeit kündigen?",
    answer:
      "Ja, Sie können Ihr Abo jederzeit zum Ende der Laufzeit kündigen. Es gibt keine Mindestlaufzeit und keine versteckten Kosten.",
  },
  {
    question: "Was passiert mit meinen Embeds wenn ich kündige?",
    answer:
      "Die eingebetteten Rechner werden deaktiviert und zeigen einen Hinweis an. Ihre Einstellungen (Domains, API-Keys) bleiben gespeichert, falls Sie später wieder aktivieren möchten.",
  },
  {
    question: "Kann ich den Plan wechseln?",
    answer:
      "Jederzeit. Ein Upgrade wird sofort aktiv, ein Downgrade zum Ende der aktuellen Laufzeit. Die Differenz wird anteilig verrechnet.",
  },
  {
    question: "Sind die Preise brutto oder netto?",
    answer:
      "Alle angegebenen Preise sind Bruttopreise inklusive 19% Mehrwertsteuer. Die MwSt wird auf jeder Rechnung ausgewiesen.",
  },
  {
    question: "Wie funktioniert die Einbettung?",
    answer:
      "Sie erhalten einen Code-Snippet (eine Zeile HTML + Script), den Sie auf Ihrer Website einfügen. Der Rechner erscheint dann als professionelles Widget. Funktioniert mit jeder Website — Webflow, WordPress, HTML und mehr.",
  },
  {
    question: "Gibt es eine API?",
    answer:
      "Die Einbettung funktioniert über unsere Script-/iFrame-Lösung. Eine REST-API für eigene Integrationen ist in Planung.",
  },
  {
    question: "Wo werden die Daten gespeichert?",
    answer:
      "Alle Daten werden auf deutschen Servern (Hetzner) gehostet. Die Verarbeitung erfolgt vollständig DSGVO-konform.",
  },
]

export default function PreisePage() {
  return (
    <div className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Einfache, transparente Preise
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Starten Sie mit 14 Tagen kostenlosem Zugang zu allen Funktionen.
            Keine Kreditkarte nötig.
          </p>

          {/* Monatlich / Jährlich Toggle */}
          <PricingToggle plans={plans} />
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-12">
            <HelpCircle className="inline h-6 w-6 mr-2 text-primary" />
            Häufige Fragen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.question} className="space-y-2">
                <h3 className="font-semibold text-sm">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-4">
            Noch unsicher? Testen Sie alle Rechner 14 Tage lang kostenlos.
          </p>
          <Link href="/anmelden">
            <Button size="lg">
              Jetzt kostenlos starten
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
