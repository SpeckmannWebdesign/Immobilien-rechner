"use client"

import { useState } from "react"
import { PiggyBank } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { ResultCard } from "./result-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { berechneCashflow, formatCurrency, type CashflowResult } from "@/lib/rechner"

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
          <>
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

          {/* Balkendiagramm: Einnahmen vs. Ausgaben */}
          <Card>
            <CardHeader>
              <CardTitle>Einnahmen vs. Ausgaben</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    {
                      name: "Einnahmen",
                      Mieteinnahmen: result.nettoMieteinnahmen,
                    },
                    {
                      name: "Ausgaben",
                      Hausgeld: hausgeld,
                      Nebenkosten: nichtUmlegbareNebenkosten,
                      Kreditrate: monatlicheKreditrate,
                      Instandhaltung: instandhaltungsRuecklage,
                      Mietausfall: result.mietausfallAbzug,
                    },
                  ]}
                  margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(v: number) => formatCurrency(v, false)} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="Mieteinnahmen" stackId="a" fill="#1d4ed8" />
                  <Bar dataKey="Hausgeld" stackId="a" fill="#16a34a" />
                  <Bar dataKey="Nebenkosten" stackId="a" fill="#ea580c" />
                  <Bar dataKey="Kreditrate" stackId="a" fill="#7c3aed" />
                  <Bar dataKey="Instandhaltung" stackId="a" fill="#0891b2" />
                  <Bar dataKey="Mietausfall" stackId="a" fill="#dc2626" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
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
