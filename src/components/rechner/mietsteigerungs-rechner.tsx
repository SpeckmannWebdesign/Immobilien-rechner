"use client"

import { useState, useMemo } from "react"
import { ArrowUpRight } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { SelectInput } from "./select-input"
import { BentoMetric, ResultCard } from "./result-card"
import { berechneMietsteigerung, formatCurrency, formatPercent } from "@/lib/rechner"

const CHART_COLORS = ["#4338CA", "#0E7490", "#059669", "#B45309"]

const TOOLTIP_STYLE = {
  background: "white",
  border: "1px solid #E3E5EB",
  borderRadius: "8px",
  fontSize: "13px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
}

export function MietsteigerungsRechner() {
  const [aktuelleMonatsmiete, setAktuelleMonatsmiete] = useState(1000)
  const [jaehrlicheSteigerung, setJaehrlicheSteigerung] = useState(2.0)
  const [zeitraum, setZeitraum] = useState(20)

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () =>
      berechneMietsteigerung({
        aktuelleMonatsmiete,
        jaehrlicheSteigerung,
        zeitraum,
      }),
    [aktuelleMonatsmiete, jaehrlicheSteigerung, zeitraum]
  )

  return (
    <CalculatorLayout
      title="Mietsteigerungsrechner"
      description="Mietentwicklung über 10, 20 oder 30 Jahre prognostizieren"
      icon={ArrowUpRight}
      hasResults={true}
      inputs={
        <>
          <CurrencyInput
            id="miete"
            label="Aktuelle Monatskaltmiete"
            value={aktuelleMonatsmiete}
            onChange={setAktuelleMonatsmiete}
          />
          <PercentInput
            id="steigerung"
            label="Erwartete jährliche Steigerung"
            value={jaehrlicheSteigerung}
            onChange={setJaehrlicheSteigerung}
            hint="Durchschnitt in Deutschland: ca. 2%"
          />
          <SelectInput
            id="zeitraum"
            label="Betrachtungszeitraum"
            value={String(zeitraum)}
            onChange={(v) => setZeitraum(Number(v))}
            options={[
              { value: "10", label: "10 Jahre" },
              { value: "15", label: "15 Jahre" },
              { value: "20", label: "20 Jahre" },
              { value: "25", label: "25 Jahre" },
              { value: "30", label: "30 Jahre" },
            ]}
          />
        </>
      }
      results={
        <>
          {/* Bento-Grid: Top-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoMetric
              label={`Miete nach ${zeitraum} Jahren`}
              value={formatCurrency(result.endMonatsmiete)}
              sub={`+${formatCurrency(result.steigerungAbsolut)} pro Monat`}
              color="green"
            />
            <BentoMetric
              label="Kumulative Einnahmen"
              value={formatCurrency(result.gesamtMieteinnahmen)}
              sub={`Über ${zeitraum} Jahre`}
              color="blue"
            />
            <BentoMetric
              label="Steigerung gesamt"
              value={formatPercent(result.steigerungProzent)}
              sub={`${formatCurrency(aktuelleMonatsmiete)} → ${formatCurrency(result.endMonatsmiete)}`}
              color="amber"
            />
          </div>

          {/* Detail-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BentoMetric
              label={`Jahresmiete nach ${zeitraum} Jahren`}
              value={formatCurrency(result.endJahresmiete)}
              sub="Jährliche Mieteinnahmen am Ende"
              color="green"
            />
            <BentoMetric
              label="Steigerung absolut"
              value={`+${formatCurrency(result.steigerungAbsolut)}`}
              sub="Mehrbetrag pro Monat"
              color="amber"
            />
          </div>

          {/* Mietentwicklungs-Diagramm */}
          <div className="bg-card border rounded-xl p-5">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Mietentwicklung im Zeitverlauf
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={result.jahresUebersicht.map((j) => ({
                  jahr: `Jahr ${j.jahr}`,
                  prognostizierteMiete: Math.round(j.monatsmiete * 100) / 100,
                  aktuelleMiete: aktuelleMonatsmiete,
                }))}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jahr" fontSize={12} />
                <YAxis
                  tickFormatter={(value: number) => formatCurrency(value, false)}
                  fontSize={12}
                />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => formatCurrency(Number(value))}
                  contentStyle={TOOLTIP_STYLE}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="aktuelleMiete"
                  name="Aktuelle Miete"
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="prognostizierteMiete"
                  name="Prognostizierte Miete"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Jahresübersicht als ResultCard */}
          <ResultCard
            title="Jahresübersicht (Auszug)"
            items={result.jahresUebersicht
              .filter((j) => j.jahr === 1 || j.jahr === 5 || j.jahr === 10 || j.jahr === zeitraum || j.jahr === Math.round(zeitraum / 2))
              .filter((j, i, arr) => arr.findIndex((a) => a.jahr === j.jahr) === i)
              .sort((a, b) => a.jahr - b.jahr)
              .map((j) => ({
                label: `Jahr ${j.jahr}`,
                value: j.monatsmiete,
                textValue: `${formatCurrency(j.monatsmiete)}/Monat — kumuliert: ${formatCurrency(j.kumuliert, false)}`,
              }))}
          />
        </>
      }
    />
  )
}
