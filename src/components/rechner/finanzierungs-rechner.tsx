"use client"

import { useState } from "react"
import { Building2 } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { NumberInput } from "./number-input"
import { ResultCard } from "./result-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { berechneFinanzierung, type FinanzierungResult, formatCurrency, formatYears } from "@/lib/rechner"

export function FinanzierungsRechner() {
  const [darlehenssumme, setDarlehenssumme] = useState(220000)
  const [sollzinsSatz, setSollzinsSatz] = useState(3.5)
  const [anfangsTilgung, setAnfangsTilgung] = useState(2.0)
  const [zinsbindung, setZinsbindung] = useState(10)
  const [sondertilgungJahr, setSondertilgungJahr] = useState(0)
  const [result, setResult] = useState<FinanzierungResult | null>(null)

  function handleCalculate() {
    setResult(
      berechneFinanzierung({
        darlehenssumme,
        sollzinsSatz,
        anfangsTilgung,
        zinsbindung,
        sondertilgungJahr,
      })
    )
  }

  return (
    <CalculatorLayout
      title="Finanzierungsrechner"
      description="Annuitätendarlehen berechnen: Rate, Tilgung, Zinsen und Restschuld"
      icon={Building2}
      hasResults={result !== null}
      onCalculate={handleCalculate}
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
        result ? (
          <>
            <ResultCard
              title="Ihre Finanzierung"
              items={[
                {
                  label: "Monatliche Rate",
                  value: result.monatlicheRate,
                  highlight: true,
                },
                {
                  label: "Jahresrate",
                  value: result.jahresRate,
                },
                {
                  label: `Zinskosten (${zinsbindung} Jahre)`,
                  value: result.zinsKostenZinsbindung,
                  color: "red",
                },
                {
                  label: `Getilgt nach ${zinsbindung} Jahren`,
                  value: result.getilgterBetrag,
                  color: "green",
                },
                {
                  label: `Restschuld nach ${zinsbindung} Jahren`,
                  value: result.restschuldNachZinsbindung,
                  highlight: true,
                },
                {
                  label: "Gesamtlaufzeit bis Volltilgung",
                  value: 0,
                  textValue: formatYears(result.gesamtlaufzeit),
                },
              ]}
            />
            {/* Diagramm: Zins- vs. Tilgungsanteil über die Zinsbindung */}
            {result.tilgungsplan.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Zins- und Tilgungsverlauf</CardTitle>
                </CardHeader>
                <CardContent>
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
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="Zinsanteil"
                        stackId="1"
                        stroke="hsl(0, 70%, 60%)"
                        fill="hsl(0, 70%, 60%)"
                        fillOpacity={0.6}
                        name="Zinsanteil"
                      />
                      <Area
                        type="monotone"
                        dataKey="Tilgungsanteil"
                        stackId="1"
                        stroke="hsl(220, 70%, 50%)"
                        fill="hsl(220, 70%, 50%)"
                        fillOpacity={0.6}
                        name="Tilgungsanteil"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
            {/* Mini-Tilgungsplan (erste 5 und letzte Jahre) */}
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
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            Geben Sie Ihre Daten ein und klicken Sie auf &quot;Berechnen&quot;.
          </div>
        )
      }
    />
  )
}
