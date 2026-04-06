"use client"

import { useState, useMemo } from "react"
import { Building2 } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { NumberInput } from "./number-input"
import { BentoMetric, ResultCard } from "./result-card"
import { berechneFinanzierung, formatCurrency, formatYears } from "@/lib/rechner"

const CHART_COLORS = ["var(--rechner-accent)", "var(--rechner-accent-dark)", "var(--rechner-accent-muted)"]

const TOOLTIP_STYLE = {
  background: "white",
  border: "1px solid #E3E5EB",
  borderRadius: "8px",
  fontSize: "13px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
}

export function FinanzierungsRechner() {
  const [darlehenssumme, setDarlehenssumme] = useState(240000)
  const [sollzinsSatz, setSollzinsSatz] = useState(3.5)
  const [anfangsTilgung, setAnfangsTilgung] = useState(2.0)
  const [zinsbindung, setZinsbindung] = useState(15)
  const [sondertilgungJahr, setSondertilgungJahr] = useState(0)

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () =>
      berechneFinanzierung({
        darlehenssumme,
        sollzinsSatz,
        anfangsTilgung,
        zinsbindung,
        sondertilgungJahr,
      }),
    [darlehenssumme, sollzinsSatz, anfangsTilgung, zinsbindung, sondertilgungJahr]
  )

  const rateColor = result.monatlicheRate <= 1500 ? "positive" as const : result.monatlicheRate <= 2500 ? "muted" as const : "negative" as const
  const restschuldColor = result.restschuldNachZinsbindung > 0 ? "negative" as const : "positive" as const

  return (
    <CalculatorLayout
      title="Finanzierungsrechner"
      description="Annuitätendarlehen berechnen: Rate, Tilgung, Zinsen und Restschuld"
      icon={Building2}
      hasResults={true}
      inputs={
        <>
          <CurrencyInput
            id="darlehen"
            label="Darlehenssumme"
            value={darlehenssumme}
            onChange={setDarlehenssumme}
          />
          <PercentInput
            id="zinssatz"
            label="Sollzinssatz (p.a.)"
            value={sollzinsSatz}
            onChange={setSollzinsSatz}
          />
          <PercentInput
            id="tilgung"
            label="Anfängliche Tilgung (p.a.)"
            value={anfangsTilgung}
            onChange={setAnfangsTilgung}
            hint="Empfohlen: mindestens 2%"
          />
          <NumberInput
            id="zinsbindung"
            label="Zinsbindung"
            value={zinsbindung}
            onChange={setZinsbindung}
            suffix="Jahre"
            min={1}
            max={30}
          />
          <CurrencyInput
            id="sondertilgung"
            label="Sondertilgung pro Jahr"
            value={sondertilgungJahr}
            onChange={setSondertilgungJahr}
            hint="Optional: Jährliche Sondertilgung"
          />
        </>
      }
      results={
        <>
          {/* Bento-Grid: Top-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoMetric
              label="Monatliche Rate"
              value={formatCurrency(result.monatlicheRate)}
              sub={`Jahresrate: ${formatCurrency(result.jahresRate, false)}`}
              color={rateColor}
            />
            <BentoMetric
              label={`Zinskosten (${zinsbindung} J.)`}
              value={formatCurrency(result.zinsKostenZinsbindung)}
              sub="Gezahlte Zinsen in Zinsbindung"
              color="negative"
            />
            <BentoMetric
              label={`Restschuld nach ${zinsbindung} J.`}
              value={formatCurrency(result.restschuldNachZinsbindung)}
              sub={`Getilgt: ${formatCurrency(result.getilgterBetrag, false)}`}
              color={restschuldColor}
            />
          </div>

          {/* Detail-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BentoMetric
              label="Gesamtlaufzeit"
              value={formatYears(result.gesamtlaufzeit)}
              sub="Bis zur vollständigen Tilgung"
              color="accent"
            />
            <BentoMetric
              label="Getilgter Betrag"
              value={formatCurrency(result.getilgterBetrag)}
              sub={`Nach ${zinsbindung} Jahren Zinsbindung`}
              color="positive"
            />
          </div>

          {/* Diagramm: Zins- vs. Tilgungsanteil über die Zinsbindung */}
          {result.tilgungsplan.length > 0 && (
            <div className="bg-card border rounded-xl p-5">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Zins- und Tilgungsverlauf
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={result.tilgungsplan
                    .filter((z) => z.jahr <= zinsbindung)
                    .map((z) => ({
                      jahr: `Jahr ${z.jahr}`,
                      Zinsanteil: Math.round(z.zinsanteil),
                      Tilgungsanteil: Math.round(z.tilgungsanteil),
                    }))}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="jahr" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => formatCurrency(Number(v), false)}
                  />
                  <Tooltip
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => formatCurrency(Number(value), false)}
                    labelStyle={{ fontWeight: "bold" }}
                    contentStyle={TOOLTIP_STYLE}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="Zinsanteil"
                    stackId="1"
                    stroke={CHART_COLORS[0]}
                    fill={CHART_COLORS[0]}
                    fillOpacity={0.6}
                    name="Zinsanteil"
                  />
                  <Area
                    type="monotone"
                    dataKey="Tilgungsanteil"
                    stackId="1"
                    stroke={CHART_COLORS[1]}
                    fill={CHART_COLORS[1]}
                    fillOpacity={0.6}
                    name="Tilgungsanteil"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Mini-Tilgungsplan */}
          {result.tilgungsplan.length > 0 && (
            <ResultCard
              title="Tilgungsplan (Auszug)"
              items={result.tilgungsplan
                .filter(
                  (z) =>
                    z.jahr <= 5 ||
                    z.jahr === zinsbindung ||
                    z.jahr === result.gesamtlaufzeit
                )
                .map((z) => ({
                  label: `Jahr ${z.jahr}`,
                  value: z.restschuldEnde,
                  textValue: `Rate: ${formatCurrency(z.gesamtRate, false)} → Rest: ${formatCurrency(z.restschuldEnde, false)}`,
                }))}
            />
          )}
        </>
      }
    />
  )
}
