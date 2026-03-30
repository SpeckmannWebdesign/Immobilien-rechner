"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { NumberInput } from "./number-input"
import { ResultCard } from "./result-card"
import { berechneSteuerersparnis, type SteuerersparnisResult } from "@/lib/rechner"

export function SteuerersparnisRechner() {
  const [kaufpreisGebaeude, setKaufpreisGebaeude] = useState(200000)
  const [baujahr, setBaujahr] = useState(1990)
  const [grenzsteuersatz, setGrenzsteuersatz] = useState(42)
  const [jaehrlicheWerbungskosten, setJaehrlicheWerbungskosten] = useState(5000)
  const [jaehrlicheMieteinnahmen, setJaehrlicheMieteinnahmen] = useState(9600)
  const [result, setResult] = useState<SteuerersparnisResult | null>(null)

  function handleCalculate() {
    setResult(
      berechneSteuerersparnis({
        kaufpreisGebaeude,
        baujahr,
        grenzsteuersatz,
        jaehrlicheWerbungskosten,
        jaehrlicheMieteinnahmen,
      })
    )
  }

  return (
    <CalculatorLayout
      title="Steuerersparnis-Rechner"
      description="AfA, Werbungskosten und jährlichen Steuervorteil berechnen"
      icon={FileText}
      showTaxDisclaimer
      hasResults={result !== null}
      onCalculate={handleCalculate}
      inputs={
        <>
          <CurrencyInput
            id="gebaeude"
            label="Kaufpreis Gebäudeanteil"
            value={kaufpreisGebaeude}
            onChange={setKaufpreisGebaeude}
            hint="Oft 70–80% des Gesamtkaufpreises (ohne Grundstück)"
          />
          <NumberInput
            id="baujahr"
            label="Baujahr"
            value={baujahr}
            onChange={setBaujahr}
            min={1800}
            max={2026}
            hint="Bestimmt den AfA-Satz (vor 1925: 2,5%, 1925–2022: 2%, ab 2023: 3%)"
          />
          <PercentInput
            id="steuersatz"
            label="Persönlicher Grenzsteuersatz"
            value={grenzsteuersatz}
            onChange={setGrenzsteuersatz}
            hint="Ihr persönlicher Einkommensteuersatz (z.B. 42%)"
          />
          <CurrencyInput
            id="werbungskosten"
            label="Jährliche Werbungskosten"
            value={jaehrlicheWerbungskosten}
            onChange={setJaehrlicheWerbungskosten}
            hint="Zinsen, Verwaltung, Fahrtkosten, Versicherung etc."
          />
          <CurrencyInput
            id="mieteinnahmen"
            label="Jährliche Mieteinnahmen"
            value={jaehrlicheMieteinnahmen}
            onChange={setJaehrlicheMieteinnahmen}
          />
        </>
      }
      results={
        result ? (
          <ResultCard
            title="Steuerersparnis"
            items={[
              {
                label: `AfA-Satz: ${result.afaLabel}`,
                value: result.jaehrlicheAfa,
                textValue: result.afaLabel,
              },
              {
                label: "Jährliche AfA",
                value: result.jaehrlicheAfa,
              },
              {
                label: "Steuerliche Einkünfte",
                value: result.steuerlicheEinkuenfte,
                color: result.istSteuerlichNegativ ? "green" : "red",
              },
              {
                label: "Steuerersparnis pro Jahr",
                value: result.steuerersparnisJahr,
                highlight: true,
                color: result.steuerersparnisJahr > 0 ? "green" : "red",
              },
              {
                label: "Steuerersparnis pro Monat",
                value: result.steuerersparnisMonat,
                color: result.steuerersparnisMonat > 0 ? "green" : "red",
              },
            ]}
          />
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            Geben Sie Ihre Daten ein und klicken Sie auf &quot;Berechnen&quot;.
          </div>
        )
      }
    />
  )
}
