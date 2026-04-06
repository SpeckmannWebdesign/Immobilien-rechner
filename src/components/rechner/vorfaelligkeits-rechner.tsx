"use client"

import { useState, useMemo } from "react"
import { Ban } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { NumberInput } from "./number-input"
import { BentoMetric } from "./result-card"
import { berechneVorfaelligkeit } from "@/lib/rechner/vorfaelligkeit"
import { formatCurrency, formatYears } from "@/lib/rechner/format"

export function VorfaelligkeitsRechner() {
  const [restschuld, setRestschuld] = useState(200000)
  const [zinssatz, setZinssatz] = useState(1.5)
  const [restlaufzeitMonate, setRestlaufzeitMonate] = useState(60)
  const [aktuellerMarktzins, setAktuellerMarktzins] = useState(3.5)
  const [monatlicheRate, setMonatlicheRate] = useState(1100)
  const [sondertilgungRecht, setSondertilgungRecht] = useState(5)

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () =>
      berechneVorfaelligkeit({
        restschuld,
        zinssatz,
        restlaufzeitMonate,
        aktuellerMarktzins,
        monatlicheRate,
        sondertilgungRecht,
      }),
    [restschuld, zinssatz, restlaufzeitMonate, aktuellerMarktzins, monatlicheRate, sondertilgungRecht]
  )

  return (
    <CalculatorLayout
      title="Vorfälligkeitsentschädigung-Rechner"
      description="Berechnen Sie die Vorfälligkeitsentschädigung bei vorzeitiger Kreditablösung"
      icon={Ban}
      hasResults={true}
      inputs={
        <>
          <CurrencyInput
            id="restschuld"
            label="Aktuelle Restschuld"
            value={restschuld}
            onChange={setRestschuld}
            hint="Verbleibende Darlehenssumme"
          />
          <PercentInput
            id="zinssatz"
            label="Vertragszinssatz"
            value={zinssatz}
            onChange={setZinssatz}
            step={0.1}
            hint="Gebundener Sollzins laut Vertrag"
          />
          <NumberInput
            id="restlaufzeit"
            label="Restlaufzeit Zinsbindung"
            value={restlaufzeitMonate}
            onChange={setRestlaufzeitMonate}
            suffix="Monate"
            min={1}
            max={360}
            hint="Verbleibende Monate der Zinsbindung"
          />
          <PercentInput
            id="marktzins"
            label="Aktueller Marktzins"
            value={aktuellerMarktzins}
            onChange={setAktuellerMarktzins}
            step={0.1}
            hint="Marktzins für vergleichbare Restlaufzeit"
          />
          <CurrencyInput
            id="rate"
            label="Monatliche Rate"
            value={monatlicheRate}
            onChange={setMonatlicheRate}
          />
          <PercentInput
            id="sondertilgung"
            label="Sondertilgungsrecht (jährl.)"
            value={sondertilgungRecht}
            onChange={setSondertilgungRecht}
            min={0}
            max={10}
            step={1}
            hint="Jährliches Sondertilgungsrecht laut Vertrag"
          />
        </>
      }
      results={
        <>
          {/* Bento-Grid: Top-Kennzahlen (3 Spalten) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoMetric
              label="Vorfälligkeitsentschädigung"
              value={formatCurrency(result.vorfaelligkeitsentschaedigung)}
              sub="Geschätzter Gesamtbetrag"
              color="negative"
              className="text-3xl"
            />
            <BentoMetric
              label="Zinsmargenschaden"
              value={formatCurrency(result.zinsmargenschaden)}
              sub="Entgangener Zinsgewinn der Bank"
              color="muted"
            />
            <BentoMetric
              label="Bearbeitungsgebühr"
              value={formatCurrency(result.bearbeitungsgebuehr)}
              sub="Pauschale Bearbeitungskosten"
              color="default"
            />
          </div>

          {/* Bento-Grid: Detail-Kennzahlen (2 Spalten) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BentoMetric
              label="Ersparnis durch Sondertilgungsrecht"
              value={formatCurrency(result.eingesparter)}
              sub={`${sondertilgungRecht} % jährliches Sondertilgungsrecht`}
              color="positive"
            />
            <BentoMetric
              label="VFE ohne Sondertilgung"
              value={formatCurrency(result.ersparnisOhneSondertilgung)}
              sub="Ohne Abzug des Sondertilgungsrechts"
              color="accent"
            />
            <BentoMetric
              label="Restlaufzeit"
              value={formatYears(result.restlaufzeitJahre)}
              sub={`${restlaufzeitMonate} Monate verbleibend`}
              color="default"
            />
          </div>
        </>
      }
    />
  )
}
