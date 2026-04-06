"use client"

import { useState, useMemo } from "react"
import { FileText } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { NumberInput } from "./number-input"
import { BentoMetric } from "./result-card"
import { berechneSteuerersparnis, formatCurrency } from "@/lib/rechner"

export function SteuerersparnisRechner() {
  const [kaufpreisGebaeude, setKaufpreisGebaeude] = useState(200000)
  const [baujahr, setBaujahr] = useState(1995)
  const [grenzsteuersatz, setGrenzsteuersatz] = useState(42)
  const [jaehrlicheWerbungskosten, setJaehrlicheWerbungskosten] = useState(5000)
  const [jaehrlicheMieteinnahmen, setJaehrlicheMieteinnahmen] = useState(9600)

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () =>
      berechneSteuerersparnis({
        kaufpreisGebaeude,
        baujahr,
        grenzsteuersatz,
        jaehrlicheWerbungskosten,
        jaehrlicheMieteinnahmen,
      }),
    [kaufpreisGebaeude, baujahr, grenzsteuersatz, jaehrlicheWerbungskosten, jaehrlicheMieteinnahmen]
  )

  const ersparnisColor = result.steuerersparnisJahr > 0 ? "positive" as const : "negative" as const
  const einkuenfteColor = result.istSteuerlichNegativ ? "positive" as const : "negative" as const

  return (
    <CalculatorLayout
      title="Steuerersparnis-Rechner"
      description="AfA, Werbungskosten und jährlichen Steuervorteil berechnen"
      icon={FileText}
      showTaxDisclaimer={true}
      hasResults={true}
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
        <>
          {/* Bento-Grid: Top-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoMetric
              label="Jährliche Steuerersparnis"
              value={formatCurrency(result.steuerersparnisJahr)}
              sub={`${formatCurrency(result.steuerersparnisMonat)} pro Monat`}
              color={ersparnisColor}
            />
            <BentoMetric
              label="Jährliche AfA"
              value={formatCurrency(result.jaehrlicheAfa)}
              sub={result.afaLabel}
              color="accent"
            />
            <BentoMetric
              label="Steuerliche Einkünfte"
              value={formatCurrency(result.steuerlicheEinkuenfte)}
              sub={result.istSteuerlichNegativ ? "Steuerlicher Verlust" : "Steuerlicher Gewinn"}
              color={einkuenfteColor}
            />
          </div>

          {/* Detail-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BentoMetric
              label="Steuerersparnis pro Monat"
              value={formatCurrency(result.steuerersparnisMonat)}
              sub="Monatlicher Steuervorteil"
              color={ersparnisColor}
            />
            <BentoMetric
              label="Werbungskosten gesamt"
              value={formatCurrency(jaehrlicheWerbungskosten + result.jaehrlicheAfa)}
              sub="Inkl. AfA-Betrag"
              color="muted"
            />
          </div>
        </>
      }
    />
  )
}
