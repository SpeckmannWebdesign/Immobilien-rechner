"use client"

import { useState } from "react"
import { PiggyBank } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { ResultCard } from "./result-card"
import { berechneCashflow, type CashflowResult } from "@/lib/rechner"

export function CashflowRechner() {
  const [monatlicheKaltmiete, setMonatlicheKaltmiete] = useState(800)
  const [hausgeld, setHausgeld] = useState(250)
  const [nichtUmlegbareNebenkosten, setNichtUmlegbareNebenkosten] = useState(50)
  const [monatlicheKreditrate, setMonatlicheKreditrate] = useState(600)
  const [instandhaltungsRuecklage, setInstandhaltungsRuecklage] = useState(50)
  const [mietausfallRisiko, setMietausfallRisiko] = useState(2)
  const [result, setResult] = useState<CashflowResult | null>(null)

  function handleCalculate() {
    setResult(
      berechneCashflow({
        monatlicheKaltmiete,
        hausgeld,
        nichtUmlegbareNebenkosten,
        monatlicheKreditrate,
        instandhaltungsRuecklage,
        mietausfallRisiko,
      })
    )
  }

  return (
    <CalculatorLayout
      title="Cashflow-Rechner"
      description="Monatlichen Überschuss oder Unterdeckung bei Vermietung berechnen"
      icon={PiggyBank}
      hasResults={result !== null}
      onCalculate={handleCalculate}
      inputs={
        <>
          <CurrencyInput
            id="kaltmiete"
            label="Monatliche Kaltmiete"
            value={monatlicheKaltmiete}
            onChange={setMonatlicheKaltmiete}
          />
          <CurrencyInput
            id="hausgeld"
            label="Hausgeld (monatlich)"
            value={hausgeld}
            onChange={setHausgeld}
            hint="Gesamtes Hausgeld inkl. Rücklage"
          />
          <CurrencyInput
            id="nichtumlegbar"
            label="Nicht-umlegbare Nebenkosten"
            value={nichtUmlegbareNebenkosten}
            onChange={setNichtUmlegbareNebenkosten}
            hint="z.B. Verwaltungskosten, Kontoführung"
          />
          <CurrencyInput
            id="kreditrate"
            label="Monatliche Kreditrate"
            value={monatlicheKreditrate}
            onChange={setMonatlicheKreditrate}
          />
          <CurrencyInput
            id="instandhaltung"
            label="Instandhaltungsrücklage (monatlich)"
            value={instandhaltungsRuecklage}
            onChange={setInstandhaltungsRuecklage}
          />
          <PercentInput
            id="mietausfall"
            label="Mietausfallrisiko"
            value={mietausfallRisiko}
            onChange={setMietausfallRisiko}
            hint="Empfohlen: 2–4%"
          />
        </>
      }
      results={
        result ? (
          <ResultCard
            title="Cashflow-Analyse"
            items={[
              {
                label: "Brutto-Mieteinnahmen",
                value: result.bruttoMieteinnahmen,
              },
              {
                label: "Mietausfall-Abzug",
                value: -result.mietausfallAbzug,
                color: "red",
              },
              {
                label: "Netto-Mieteinnahmen",
                value: result.nettoMieteinnahmen,
              },
              {
                label: "Gesamte Kosten",
                value: -result.gesamtKosten,
                color: "red",
              },
              {
                label: "Monatlicher Cashflow",
                value: result.monatsCashflow,
                highlight: true,
                color:
                  result.cashflowStatus === "positiv"
                    ? "green"
                    : result.cashflowStatus === "knapp"
                      ? "yellow"
                      : "red",
              },
              {
                label: "Jährlicher Cashflow",
                value: result.jahresCashflow,
                color:
                  result.cashflowStatus === "positiv"
                    ? "green"
                    : result.cashflowStatus === "knapp"
                      ? "yellow"
                      : "red",
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
