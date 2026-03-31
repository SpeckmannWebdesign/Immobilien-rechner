import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { tools, toolCategories, getToolsByCategory } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alle Immobilien-Rechner | Professionelle Tools für Profis",
  description:
    "16 professionelle Immobilien-Rechner: Rendite, Kaufnebenkosten, Finanzierung, Cashflow, Grunderwerbsteuer und mehr. Kostenlos testen — ideal für Makler, Investoren und Hausverwaltungen.",
  openGraph: {
    title: "Alle Immobilien-Rechner | Professionelle Tools für Profis",
    description:
      "16 professionelle Immobilien-Rechner: Rendite, Kaufnebenkosten, Finanzierung, Cashflow, Grunderwerbsteuer und mehr. Kostenlos testen.",
    type: "website",
    locale: "de_DE",
  },
}

export default function RechnerUebersicht() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#111827]">
          Alle Immobilien-Rechner
        </h1>
        <p className="text-lg text-[#4B5563]">
          16 professionelle Tools für Makler, Investoren und Hausverwaltungen.
          Jetzt kostenlos ausprobieren.
        </p>
      </div>

      <div className="space-y-12">
        {toolCategories.map((category) => {
          const categoryTools = getToolsByCategory(category.key)
          return (
            <div key={category.key} className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#111827]">
                {category.label}
                <Badge variant="secondary">{categoryTools.length}</Badge>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTools.map((tool) => (
                  <Link key={tool.slug} href={`/rechner/${tool.slug}`}>
                    <Card className="hover:shadow-md transition-shadow h-full cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-primary/10 p-2">
                            <tool.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base">
                              {tool.name}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {tool.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
