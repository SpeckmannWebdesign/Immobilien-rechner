import { notFound } from "next/navigation"
import { getToolBySlug } from "@/lib/tools"
import { RenditeRechner } from "@/components/rechner/rendite-rechner"
import { KaufnebenkostenRechner } from "@/components/rechner/kaufnebenkosten-rechner"
import { FinanzierungsRechner } from "@/components/rechner/finanzierungs-rechner"
import { CashflowRechner } from "@/components/rechner/cashflow-rechner"
import { GrunderwerbsteuerRechner } from "@/components/rechner/grunderwerbsteuer-rechner"
import { SteuerersparnisRechner } from "@/components/rechner/steuerersparnis-rechner"
import { MietsteigerungsRechner } from "@/components/rechner/mietsteigerungs-rechner"
import { InstandhaltungsRechner } from "@/components/rechner/instandhaltungs-rechner"
import { ObjektvergleichRechner } from "@/components/rechner/objektvergleich-rechner"
import { TilgungsplanRechner } from "@/components/rechner/tilgungsplan-rechner"
import { NebenkostenRechner } from "@/components/rechner/nebenkosten-rechner"
import { MieterhoehungsRechner } from "@/components/rechner/mieterhoehungs-rechner"

// Rechner-Komponenten nach Slug
const rechnerMap: Record<string, React.ComponentType> = {
  "rendite-rechner": RenditeRechner,
  "kaufnebenkosten-rechner": KaufnebenkostenRechner,
  "finanzierungsrechner": FinanzierungsRechner,
  "cashflow-rechner": CashflowRechner,
  "grunderwerbsteuer-rechner": GrunderwerbsteuerRechner,
  "steuerersparnis-rechner": SteuerersparnisRechner,
  "mietsteigerungsrechner": MietsteigerungsRechner,
  "instandhaltungskosten-rechner": InstandhaltungsRechner,
  "objektvergleich": ObjektvergleichRechner,
  "tilgungsplan-generator": TilgungsplanRechner,
  "nebenkostenabrechnung-rechner": NebenkostenRechner,
  "mieterhoehungs-rechner": MieterhoehungsRechner,
}

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return { title: "Rechner nicht gefunden" }
  return { title: tool.name }
}

export default async function RechnerPage({ params }: { params: Params }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  const RechnerComponent = rechnerMap[slug]

  if (!tool || !RechnerComponent) {
    notFound()
  }

  return <RechnerComponent />
}
