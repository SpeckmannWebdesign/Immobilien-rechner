"use client"

import { useState, useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { BentoMetric } from "./result-card"
import { berechneRendite, formatCurrency, formatPercent } from "@/lib/rechner"

const CHART_COLORS = ["var(--rechner-accent)", "var(--rechner-accent-dark)", "var(--rechner-accent-muted)"]

export function RenditeRechner() {
  const [kaufpreis, setKaufpreis] = useState(285000)
  const [monatlicheKaltmiete, setMonatlicheKaltmiete] = useState(1250)
  const [kaufnebenkosten, setKaufnebenkosten] = useState(34400)
  const [eigenkapital, setEigenkapital] = useState(80000)
  const [bewirtschaftungskosten, setBewirtschaftungskosten] = useState(3600)

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () =>
      berechneRendite({
        kaufpreis,
        monatlicheKaltmiete,
        kaufnebenkosten,
        eigenkapital,
        bewirtschaftungskosten,
      }),
    [kaufpreis, monatlicheKaltmiete, kaufnebenkosten, eigenkapital, bewirtschaftungskosten]
  )

  const bruttoColor = result.bruttoMietrendite >= 5 ? "positive" as const : result.bruttoMietrendite >= 3 ? "muted" as const : "negative" as const
  const nettoColor = result.nettoMietrendite >= 3 ? "positive" as const : result.nettoMietrendite >= 2 ? "muted" as const : "negative" as const
  const ekColor = result.eigenkapitalRendite >= 6 ? "positive" as const : result.eigenkapitalRendite >= 0 ? "accent" as const : "negative" as const

  const chartData = [
    { name: "Eigenkapital", value: eigenkapital },
    { name: "Fremdkapital", value: result.darlehen },
    { name: "Nebenkosten", value: kaufnebenkosten },
  ]

  return (
    <CalculatorLayout
      title="Rendite-Rechner"
      description="Brutto- und Nettomietrendite, Eigenkapitalrendite berechnen"
      icon={TrendingUp}
      hasResults={true}
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
            label="Bewirtschaftungskosten (jährl.)"
            value={bewirtschaftungskosten}
            onChange={setBewirtschaftungskosten}
            hint="Nicht-umlegbare Kosten: Verwaltung, Instandhaltung etc."
          />
        </>
      }
      results={
        <>
          {/* Bento-Grid: Top-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoMetric
              label="Bruttomietrendite"
              value={formatPercent(result.bruttoMietrendite)}
              sub={bruttoColor === "positive" ? "Gute Rendite" : bruttoColor === "muted" ? "Mittlere Rendite" : "Niedrige Rendite"}
              color={bruttoColor}
            />
            <BentoMetric
              label="Nettomietrendite"
              value={formatPercent(result.nettoMietrendite)}
              sub="Nach Bewirtschaftung"
              color={nettoColor}
            />
            <BentoMetric
              label="EK-Rendite"
              value={formatPercent(result.eigenkapitalRendite)}
              sub="Eigenkapitalrendite"
              color={ekColor}
            />
          </div>

          {/* Donut-Chart: Kapitalverteilung */}
          <div className="bg-card border rounded-xl p-5">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Kapitalverteilung
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {CHART_COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => formatCurrency(Number(value))}
                  contentStyle={{
                    background: "white",
                    border: "1px solid #E3E5EB",
                    borderRadius: "8px",
                    fontSize: "13px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-5 mt-2">
              {chartData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: CHART_COLORS[i] }} />
                  {entry.name}
                </div>
              ))}
            </div>
          </div>

          {/* Bento-Grid: Detail-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BentoMetric
              label="Gesamtinvestition"
              value={formatCurrency(result.gesamtinvestition)}
              sub="inkl. Kaufnebenkosten"
              color="accent"
            />
            <BentoMetric
              label="Kaufnebenkosten"
              value={formatCurrency(kaufnebenkosten)}
              sub={`${((kaufnebenkosten / kaufpreis) * 100).toFixed(1).replace(".", ",")}% vom Kaufpreis`}
              color="muted"
            />
            <BentoMetric
              label="Jahreskaltmiete"
              value={formatCurrency(result.jahresKaltmiete)}
              sub={`${formatCurrency(monatlicheKaltmiete)} × 12 Monate`}
              color="positive"
            />
            <BentoMetric
              label="Darlehen"
              value={formatCurrency(result.darlehen)}
              sub="Gesamtinvestition − Eigenkapital"
            />
          </div>
        </>
      }
    />
  )
}
