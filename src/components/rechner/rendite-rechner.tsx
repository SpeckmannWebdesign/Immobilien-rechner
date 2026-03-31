"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { ResultCard } from "./result-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { berechneRendite, formatCurrency, type RenditeResult } from "@/lib/rechner"

const CHART_COLORS = ["#1d4ed8", "#16a34a", "#ea580c", "#7c3aed"]

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
            {/* Kostenaufteilung als Donut-Diagramm */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Kostenaufteilung</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Kaufpreis", value: kaufpreis },
                        { name: "Kaufnebenkosten", value: kaufnebenkosten },
                        { name: "Eigenkapital", value: eigenkapital },
                        { name: "Darlehen", value: result.darlehen },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {CHART_COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      formatter={(value: any) => formatCurrency(Number(value))}
                    />
                    <Legend />
                  </PieChart>
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
