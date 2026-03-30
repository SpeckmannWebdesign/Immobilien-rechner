import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calculator,
  TrendingUp,
  Building2,
  PiggyBank,
  FileText,
  BarChart3,
  Shield,
  Code2,
  ArrowRight,
} from "lucide-react"

const tools = [
  {
    name: "Rendite-Rechner",
    description: "Brutto- und Nettomietrendite berechnen",
    icon: TrendingUp,
    href: "/tools/rendite-rechner",
  },
  {
    name: "Kaufnebenkosten",
    description: "Alle Kosten beim Immobilienkauf",
    icon: Calculator,
    href: "/tools/kaufnebenkosten-rechner",
  },
  {
    name: "Finanzierungsrechner",
    description: "Annuität, Tilgung und Zinsen",
    icon: Building2,
    href: "/tools/finanzierungsrechner",
  },
  {
    name: "Cashflow-Rechner",
    description: "Monatlicher Überschuss berechnen",
    icon: PiggyBank,
    href: "/tools/cashflow-rechner",
  },
  {
    name: "Steuerersparnis",
    description: "AfA und Werbungskosten nutzen",
    icon: FileText,
    href: "/tools/steuerersparnis-rechner",
  },
  {
    name: "Objektvergleich",
    description: "Bis zu 3 Immobilien vergleichen",
    icon: BarChart3,
    href: "/tools/objektvergleich",
  },
]

const features = [
  {
    icon: Calculator,
    title: "12 Profi-Rechner",
    description:
      "Von Rendite über Finanzierung bis Nebenkostenabrechnung — alle Tools die Sie brauchen.",
  },
  {
    icon: Code2,
    title: "Auf Ihrer Website einbetten",
    description:
      "Binden Sie Rechner als professionelles Widget auf Ihrer Website ein. Einfach per Copy-Paste.",
  },
  {
    icon: Shield,
    title: "DSGVO-konform",
    description:
      "Gehostet in Deutschland, keine Cookies für die Rechner, alle Daten bleiben sicher.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Immobilien-Rechner für{" "}
            <span className="text-primary">Profis</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            12 professionelle Rechner für Makler, Investoren und
            Hausverwaltungen. Im Dashboard nutzen oder direkt auf Ihrer Website
            einbetten.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/anmelden">
              <Button size="lg">
                14 Tage kostenlos testen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/tools">
              <Button size="lg" variant="outline">
                Rechner ansehen
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Keine Kreditkarte nötig. Jederzeit kündbar.
          </p>
        </div>
      </section>

      {/* Tools Übersicht */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Ihre Immobilien-Toolbox
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Alle Rechner die Sie für fundierte Immobilien-Entscheidungen
            brauchen — an einem Ort.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <tool.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/tools">
              <Button variant="outline">
                Alle 12 Rechner ansehen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Warum Immobilien-Rechner?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature) => (
              <div key={feature.title} className="text-center space-y-3">
                <div className="mx-auto rounded-full bg-primary/10 p-3 w-fit">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preise Teaser */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Einfache, transparente Preise
          </h2>
          <p className="text-muted-foreground mb-8">
            Ab 19 € im Monat. 14 Tage kostenlos testen. Jährlich zahlen und 20%
            sparen.
          </p>
          <Link href="/preise">
            <Button size="lg">
              Preise ansehen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Bereit für professionelle Immobilien-Rechner?
          </h2>
          <p className="text-muted-foreground mb-8">
            Starten Sie jetzt Ihren kostenlosen 14-Tage-Test. Keine Kreditkarte
            nötig.
          </p>
          <Link href="/anmelden">
            <Button size="lg">
              Jetzt kostenlos starten
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
