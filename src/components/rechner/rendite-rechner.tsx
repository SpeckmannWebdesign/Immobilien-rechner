"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { ResultCard } from "./result-card"
import { berechneRendite, type RenditeResult } from "@/lib/rechner"

export function RenditeRechner() {
  const [kaufpreis, setKaufpreis] = useState(250000)
  const [monatlicheKaltmiete, setMonatlicheKaltmiete] = useState(800)
  const [kaufnebenkosten, setKaufnebenkosten] = useState(25000)
  const [eigenkapital, setEigenkapital] = useState(60000)
  const [bewirtschaftungskosten, setBewirtschaftungskosten] = useState(1200)
  const [result, setResult] = useState<RenditeResult | null>(null)

  function handleCalculate() {
    setResult(
      berechneRendite({
        kaufpreis,
        monatlicheKaltmiete,
        kaufnebenkosten,
        eigenkapital,
        bewirtschaftungskosten,
      })
    )
  }

  return (
    <CalculatorLayout
      title="Rendite-Rechner"
      description="Brutto- und Nettomietrendite, Eigenkapitalrendite berechnen"
      icon={TrendingUp}
      hasResults={result !== null}
      onCalculate={handleCalculate}
      inputs={
        <>
          <CurrencyInput
            id="kaufpreis"
            label="Kaufpreis"
            value={kaufpreis}
            onChange={setKaufpreis}
            hint="Gesamtkaufpreis der Immobilie"
          />
          <CurrencyInput
            id="kaltmiete"
            label="Monatliche Kaltmiete"
            value={monatlicheKaltmiete}
            onChange={setMonatlicheKaltmiete}
          />
          <CurrencyInput
            id="kaufnebenkosten"
            label="Kaufnebenkosten"
            value={kaufnebenkosten}
            onChange={setKaufnebenkosten}
            hint="Grunderwerbsteuer, Notar, Makler etc."
          />
          <CurrencyInput
            id="eigenkapital"
            label="Eigenkapital"
            value={eigenkapital}
            onChange={setEigenkapital}
          />
          <CurrencyInput
            id="bewirtschaftungskosten"
            label="Bewirtschaftungskosten (jährlich)"
            value={bewirtschaftungskosten}
            onChange={setBewirtschaftungskosten}
            hint="Nicht-umlegbare Kosten: Verwaltung, Instandhaltung etc."
          />
        </>
      }
      results={
        result ? (
          <>
            <ResultCard
              title="Rendite"
              items={[
                {
                  label: "Bruttomietrendite",
                  value: result.bruttoMietrendite,
                  type: "percent",
                  highlight: true,
                  color:
                    result.bruttoMietrendite >= 5
                      ? "green"
                      : result.bruttoMietrendite >= 3
                        ? "yellow"
                        : "red",
                },
                {
                  label: "Nettomietrendite",
                  value: result.nettoMietrendite,
                  type: "percent",
                },
                {
                  label: "Eigenkapitalrendite",
                  value: result.eigenkapitalRendite,
                  type: "percent",
                  color: result.eigenkapitalRendite >= 6 ? "green" : "default",
                },
              ]}
            />
            <ResultCard
              title="Übersicht"
              items={[
                {
                  label: "Jahreskaltmiete",
                  value: result.jahresKaltmiete,
                },
                {
                  label: "Gesamtinvestition",
                  value: result.gesamtinvestition,
                },
                {
                  label: "Darlehen",
                  value: result.darlehen,
                },
              ]}
            />
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
