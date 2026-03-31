"use client"

import { useEffect, useRef } from "react"
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
import { KaufenVsMietenRechner } from "@/components/rechner/kaufen-vs-mieten-rechner"
import { VorfaelligkeitsRechner } from "@/components/rechner/vorfaelligkeits-rechner"
import { BeleihungswertRechner } from "@/components/rechner/beleihungswert-rechner"
import { WohnflaechenRechner } from "@/components/rechner/wohnflaechen-rechner"
import type { ComponentType } from "react"

const rechnerMap: Record<string, ComponentType> = {
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
  "kaufen-vs-mieten": KaufenVsMietenRechner,
  "vorfaelligkeitsentschaedigung-rechner": VorfaelligkeitsRechner,
  "beleihungswert-rechner": BeleihungswertRechner,
  "wohnflaechenberechnung": WohnflaechenRechner,
}

interface EmbedWrapperProps {
  toolSlug: string
  styling: {
    primaryColor: string
    darkMode: boolean
  }
}

export function EmbedWrapper({ toolSlug, styling }: EmbedWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Höhe per postMessage an das Eltern-Fenster senden (für embed.js)
  useEffect(() => {
    if (!contentRef.current) return

    const observer = new ResizeObserver(() => {
      const height = contentRef.current?.scrollHeight
      if (height) {
        window.parent.postMessage(
          { type: "immo-rechner-resize", height },
          "*"
        )
      }
    })

    observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [])

  const RechnerComponent = rechnerMap[toolSlug]
  if (!RechnerComponent) {
    return (
      <div className="flex items-center justify-center min-h-[300px] p-8">
        <p className="text-sm text-destructive">Rechner nicht gefunden.</p>
      </div>
    )
  }

  return (
    <div
      ref={contentRef}
      style={
        {
          "--primary": styling.primaryColor,
        } as React.CSSProperties
      }
      className={styling.darkMode ? "dark" : ""}
    >
      <div className="p-4">
        <RechnerComponent />
      </div>

      {/* Powered-by Footer — dofollow Link für SEO */}
      <div className="border-t px-4 py-2.5 text-center">
        <a
          href="https://www.immobilien-rechner.net?ref=embed"
          target="_blank"
          rel="noopener"
          className="text-[11px] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
        >
          Powered by{" "}
          <span className="font-medium">
            immobilien-rechner.net
          </span>
        </a>
      </div>
    </div>
  )
}
