"use client"

import { useState, useMemo } from "react"
import { Landmark } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { BentoMetric } from "./result-card"
import { berechneBeleihungswert } from "@/lib/rechner/beleihungswert"
import { formatCurrency, formatPercent } from "@/lib/rechner"

export function BeleihungswertRechner() {
  const [verkehrswert, setVerkehrswert] = useState(350000)
  const [beleihungsabschlag, setBeleihungsabschlag] = useState(10)
  const [beleihungsauslauf, setBeleihungsauslauf] = useState(80)
  const [eigenkapital, setEigenkapital] = useState(80000)
  const [kaufnebenkosten, setKaufnebenkosten] = useState(12)

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () =>
      berechneBeleihungswert({
        verkehrswert,
        beleihungsabschlag,
        beleihungsauslauf,
        eigenkapital,
        kaufnebenkosten,
      }),
    [verkehrswert, beleihungsabschlag, beleihungsauslauf, eigenkapital, kaufnebenkosten]
  )

  const ekColor = result.eigenkapitalAusreichend ? "positive" as const : "negative" as const
  const lueckeColor = result.finanzierungsluecke > 0 ? "negative" as const : "positive" as const

  return (
    <CalculatorLayout
      title="Beleihungswert-Rechner"
      description="Beleihungswert, maximales Darlehen und Eigenkapitalbedarf berechnen"
      icon={Landmark}
      hasResults={true}
      inputs={
        <>
          <CurrencyInput
            id="verkehrswert"
            label="Verkehrswert / Kaufpreis"
            value={verkehrswert}
            onChange={setVerkehrswert}
            hint="Marktwert der Immobilie"
          />
          <PercentInput
            id="beleihungsabschlag"
            label="Beleihungsabschlag"
            value={beleihungsabschlag}
            onChange={setBeleihungsabschlag}
            hint="Sicherheitsabschlag der Bank (typisch 10–20 %)"
          />
          <PercentInput
            id="beleihungsauslauf"
            label="Beleihungsauslauf"
            value={beleihungsauslauf}
            onChange={setBeleihungsauslauf}
            hint="Anteil des Beleihungswerts als Darlehen (typisch 60–80 %)"
          />
          <CurrencyInput
            id="eigenkapital"
            label="Eigenkapital"
            value={eigenkapital}
            onChange={setEigenkapital}
          />
          <PercentInput
            id="kaufnebenkosten"
            label="Kaufnebenkosten"
            value={kaufnebenkosten}
            onChange={setKaufnebenkosten}
            hint="Grunderwerbsteuer, Notar, Makler (nicht beleihbar)"
          />
        </>
      }
      results={
        <>
          {/* Bento-Grid: Top-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoMetric
              label="Beleihungswert"
              value={formatCurrency(result.beleihungswert)}
              sub={`${beleihungsabschlag} % Abschlag vom Verkehrswert`}
              color="accent"
            />
            <BentoMetric
              label="Max. Darlehen"
              value={formatCurrency(result.maxDarlehen)}
              sub={`${beleihungsauslauf} % Beleihungsauslauf`}
              color="accent"
            />
            <BentoMetric
              label="Beleihungsquote"
              value={formatPercent(result.beleihungsquote)}
              sub="Darlehen / Verkehrswert"
            />
          </div>

          {/* Bento-Grid: Detail-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BentoMetric
              label="Eigenkapitalbedarf"
              value={formatCurrency(result.eigenkapitalBedarf)}
              sub={result.eigenkapitalAusreichend ? "Eigenkapital ausreichend" : "Eigenkapital nicht ausreichend"}
              color={ekColor}
            />
            <BentoMetric
              label={result.finanzierungsluecke > 0 ? "Finanzierungslücke" : "Eigenkapital-Status"}
              value={result.finanzierungsluecke > 0 ? formatCurrency(result.finanzierungsluecke) : "Ausreichend"}
              sub={result.finanzierungsluecke > 0 ? "Fehlendes Eigenkapital" : "Kein zusätzliches Kapital nötig"}
              color={lueckeColor}
            />
            <BentoMetric
              label="Gesamtkosten"
              value={formatCurrency(result.gesamtkosten)}
              sub="Kaufpreis inkl. Nebenkosten"
              color="muted"
            />
            <BentoMetric
              label="Kaufnebenkosten"
              value={formatCurrency(result.nebenkosten)}
              sub={`${kaufnebenkosten} % vom Verkehrswert`}
              color="muted"
            />
          </div>
        </>
      }
    />
  )
}
