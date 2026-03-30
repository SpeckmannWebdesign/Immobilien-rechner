"use client"

import { useState } from "react"
import { Wrench } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { NumberInput } from "./number-input"
import { ResultCard } from "./result-card"
import { berechneInstandhaltung, type InstandhaltungResult } from "@/lib/rechner"

export function InstandhaltungsRechner() {
  const [herstellungskostenProQm, setHerstellungskostenProQm] = useState(1500)
  const [wohnflaeche, setWohnflaeche] = useState(80)
  const [baujahr, setBaujahr] = useState(1990)
  const [petersFaktor, setPetersFaktor] = useState(1.5)
  const [result, setResult] = useState<InstandhaltungResult | null>(null)

  function handleCalculate() {
    setResult(
      berechneInstandhaltung({
        herstellungskostenProQm,
        wohnflaeche,
        baujahr,
        petersFaktor,
      })
    )
  }

  return (
    <CalculatorLayout
      title="Instandhaltungskosten-Rechner"
      description="Empfohlene Rücklagen nach der Petersschen Formel berechnen"
      icon={Wrench}
      hasResults={result !== null}
      onCalculate={handleCalculate}
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
        result ? (
          <>
            <ResultCard
              title="Empfohlene Rücklage"
              items={[
                {
                  label: "Monatliche Rücklage",
                  value: result.monatlicheRuecklage,
                  highlight: true,
                },
                {
                  label: "Jährliche Rücklage",
                  value: result.jaehrlicheRuecklage,
                },
                {
                  label: "Rücklage pro m²/Monat",
                  value: result.ruecklageProQm,
                  textValue: `${result.ruecklageProQm.toFixed(2).replace(".", ",")} €/m²`,
                },
              ]}
            />
            <ResultCard
              title="Details"
              items={[
                {
                  label: "Herstellungskosten gesamt",
                  value: result.herstellungskosten,
                },
                {
                  label: "Alter des Gebäudes",
                  value: 0,
                  textValue: `${result.alterGebaeude} Jahre`,
                },
              ]}
            />
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-sm text-muted-foreground">
                {result.empfehlungHinweis}
              </p>
            </div>
          </>
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            Geben Sie Ihre Daten ein und klicken Sie auf &quot;Berechnen&quot;.
          </div>
        )
      }
    />
  )
}
