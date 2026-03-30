"use client"

import { useState } from "react"
import { TeaserOverlay } from "@/components/rechner/teaser-overlay"
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

interface TeaseredCalculatorProps {
  slug: string
}

export function TeaseredCalculator({ slug }: TeaseredCalculatorProps) {
  const [hasCalculated, setHasCalculated] = useState(false)
  const RechnerComponent = rechnerMap[slug]

  if (!RechnerComponent) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Rechner nicht gefunden.</p>
      </div>
    )
  }

  return (
    <div
      onClick={() => {
        // Nach dem ersten Klick auf "Berechnen" wird das Ergebnis angeteasert
        // Wir nutzen einen einfachen Timer um zu erkennen wann berechnet wurde
        setTimeout(() => setHasCalculated(true), 500)
      }}
    >
      <TeaserOverlay showOverlay={hasCalculated}>
        <RechnerComponent />
      </TeaserOverlay>
    </div>
  )
}
