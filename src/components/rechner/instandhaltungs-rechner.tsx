"use client"

import { useState, useMemo } from "react"
import { Wrench } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { NumberInput } from "./number-input"
import { BentoMetric } from "./result-card"
import { berechneInstandhaltung, formatCurrency } from "@/lib/rechner"

export function InstandhaltungsRechner() {
  const [herstellungskostenProQm, setHerstellungskostenProQm] = useState(2000)
  const [wohnflaeche, setWohnflaeche] = useState(80)
  const [baujahr, setBaujahr] = useState(2000)
  const [petersFaktor, setPetersFaktor] = useState(1.5)

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () =>
      berechneInstandhaltung({
        herstellungskostenProQm,
        wohnflaeche,
        baujahr,
        petersFaktor,
      }),
    [herstellungskostenProQm, wohnflaeche, baujahr, petersFaktor]
  )

  // Farblogik: monatliche Rücklage bewerten
  const monatlichColor = result.monatlicheRuecklage <= 150
    ? "green" as const
    : result.monatlicheRuecklage <= 300
      ? "amber" as const
      : "red" as const

  return (
    <CalculatorLayout
      title="Instandhaltungskosten-Rechner"
      description="Empfohlene Rücklagen nach der Petersschen Formel berechnen"
      icon={Wrench}
      hasResults={true}
      inputs={
        <>
          <CurrencyInput
            id="herstellungskosten"
            label="Herstellungskosten pro m²"
            value={herstellungskostenProQm}
            onChange={setHerstellungskostenProQm}
            suffix="€/m²"
            hint="Aktuelle Baukosten oder Schätzwert (ca. 1.200–2.500 €/m²)"
          />
          <NumberInput
            id="wohnflaeche"
            label="Wohnfläche"
            value={wohnflaeche}
            onChange={setWohnflaeche}
            suffix="m²"
            min={1}
          />
          <NumberInput
            id="baujahr"
            label="Baujahr"
            value={baujahr}
            onChange={setBaujahr}
            min={1800}
            max={2026}
          />
          <NumberInput
            id="peters"
            label="Peterssche Formel — Faktor"
            value={petersFaktor}
            onChange={setPetersFaktor}
            step={0.1}
            min={1}
            max={2}
            hint="Standard: 1,5 (konservativ: 1,5–2,0)"
          />
        </>
      }
      results={
        <>
          {/* Bento-Grid: Top-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoMetric
              label="Monatliche Rücklage"
              value={formatCurrency(result.monatlicheRuecklage)}
              sub="Empfohlene Rücklage"
              color={monatlichColor}
            />
            <BentoMetric
              label="Jährliche Rücklage"
              value={formatCurrency(result.jaehrlicheRuecklage)}
              sub={`${result.ruecklageProQm.toFixed(2).replace(".", ",")} €/m² pro Monat`}
              color="blue"
            />
            <BentoMetric
              label="Peters-Faktor"
              value={petersFaktor.toFixed(1).replace(".", ",")}
              sub="Multiplikator der Formel"
              color="amber"
            />
          </div>

          {/* Bento-Grid: Detail-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BentoMetric
              label="Herstellungskosten gesamt"
              value={formatCurrency(result.herstellungskosten)}
              sub={`${herstellungskostenProQm.toLocaleString("de-DE")} €/m² × ${wohnflaeche} m²`}
            />
            <BentoMetric
              label="Gebäudealter"
              value={`${result.alterGebaeude} Jahre`}
              sub={`Baujahr ${baujahr}`}
              color={result.alterGebaeude > 30 ? "amber" : "green"}
            />
          </div>

          {/* Hinweis */}
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-sm text-muted-foreground">
              {result.empfehlungHinweis}
            </p>
          </div>
        </>
      }
    />
  )
}
