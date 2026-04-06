"use client"

import { useState, useMemo } from "react"
import { PiggyBank } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { BentoMetric } from "./result-card"
import { berechneCashflow, formatCurrency } from "@/lib/rechner"

const CHART_COLORS = ["var(--rechner-accent)", "var(--rechner-accent-dark)", "var(--rechner-accent-muted)"]

const TOOLTIP_STYLE = {
  background: "white",
  border: "1px solid #E3E5EB",
  borderRadius: "8px",
  fontSize: "13px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
}

export function CashflowRechner() {
  const [monatlicheKaltmiete, setMonatlicheKaltmiete] = useState(1250)
  const [hausgeld, setHausgeld] = useState(250)
  const [nichtUmlegbareNebenkosten, setNichtUmlegbareNebenkosten] = useState(50)
  const [monatlicheKreditrate, setMonatlicheKreditrate] = useState(950)
  const [instandhaltungsRuecklage, setInstandhaltungsRuecklage] = useState(100)
  const [mietausfallRisiko, setMietausfallRisiko] = useState(2)

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () =>
      berechneCashflow({
        monatlicheKaltmiete,
        hausgeld,
        nichtUmlegbareNebenkosten,
        monatlicheKreditrate,
        instandhaltungsRuecklage,
        mietausfallRisiko,
      }),
    [monatlicheKaltmiete, hausgeld, nichtUmlegbareNebenkosten, monatlicheKreditrate, instandhaltungsRuecklage, mietausfallRisiko]
  )

  const cashflowColor =
    result.cashflowStatus === "positiv"
      ? "positive" as const
      : result.cashflowStatus === "knapp"
        ? "muted" as const
        : "negative" as const

  return (
    <CalculatorLayout
      title="Cashflow-Rechner"
      description="Monatlichen Überschuss oder Unterdeckung bei Vermietung berechnen"
      icon={PiggyBank}
      hasResults={true}
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
        <>
          {/* Bento-Grid: Top-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoMetric
              label="Monatlicher Cashflow"
              value={formatCurrency(result.monatsCashflow)}
              sub={cashflowColor === "positive" ? "Positiver Cashflow" : cashflowColor === "muted" ? "Knapper Cashflow" : "Negativer Cashflow"}
              color={cashflowColor}
            />
            <BentoMetric
              label="Jährlicher Cashflow"
              value={formatCurrency(result.jahresCashflow)}
              sub={`${formatCurrency(result.monatsCashflow)} × 12 Monate`}
              color={cashflowColor}
            />
            <BentoMetric
              label="Netto-Mieteinnahmen"
              value={formatCurrency(result.nettoMieteinnahmen)}
              sub={`Brutto: ${formatCurrency(result.bruttoMieteinnahmen)}`}
              color="accent"
            />
          </div>

          {/* Detail-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BentoMetric
              label="Gesamte Kosten"
              value={formatCurrency(result.gesamtKosten)}
              sub="Alle monatlichen Ausgaben"
              color="negative"
            />
            <BentoMetric
              label="Mietausfall-Abzug"
              value={formatCurrency(result.mietausfallAbzug)}
              sub={`${mietausfallRisiko} % Risikopuffer`}
              color="muted"
            />
          </div>

          {/* Balkendiagramm: Einnahmen vs. Ausgaben */}
          <div className="bg-card border rounded-xl p-5">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Einnahmen vs. Ausgaben
            </h3>
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
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={TOOLTIP_STYLE}
                />
                <Legend />
                <Bar dataKey="Mieteinnahmen" stackId="a" fill={CHART_COLORS[0]} />
                <Bar dataKey="Hausgeld" stackId="a" fill={CHART_COLORS[1]} />
                <Bar dataKey="Nebenkosten" stackId="a" fill={CHART_COLORS[2]} />
                <Bar dataKey="Kreditrate" stackId="a" fill={CHART_COLORS[3]} />
                <Bar dataKey="Instandhaltung" stackId="a" fill="var(--rechner-accent)" />
                <Bar dataKey="Mietausfall" stackId="a" fill="var(--rechner-negative)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      }
    />
  )
}
