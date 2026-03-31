"use client"

import { useState, useMemo } from "react"
import { FileSpreadsheet } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { NumberInput } from "./number-input"
import { BentoMetric } from "./result-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { berechneTilgungsplan, formatCurrency, formatYears } from "@/lib/rechner"

const CHART_COLORS = ["#4338CA", "#0E7490", "#059669", "#B45309"]

export function TilgungsplanRechner() {
  const [darlehenssumme, setDarlehenssumme] = useState(240000)
  const [sollzinsSatz, setSollzinsSatz] = useState(3.5)
  const [anfangsTilgung, setAnfangsTilgung] = useState(2.0)
  const [zinsbindung, setZinsbindung] = useState(10)
  const [sondertilgungJahr, setSondertilgungJahr] = useState(0)

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () =>
      berechneTilgungsplan({
        darlehenssumme,
        sollzinsSatz,
        anfangsTilgung,
        zinsbindung,
        sondertilgungJahr,
      }),
    [darlehenssumme, sollzinsSatz, anfangsTilgung, zinsbindung, sondertilgungJahr]
  )

  // PDF-Export Funktion
  function handleDownloadPdf() {
    const header = `Tilgungsplan — Darlehen: ${formatCurrency(darlehenssumme)}, Zins: ${sollzinsSatz}%, Tilgung: ${anfangsTilgung}%\n`
    const separator = "—".repeat(60) + "\n"
    let content = header + separator
    content += "Jahr | Zinsen | Tilgung | Restschuld\n" + separator

    for (const z of result.tilgungsplan) {
      content += `${z.jahr} | ${formatCurrency(z.zinsanteil, false)} | ${formatCurrency(z.tilgungsanteil, false)} | ${formatCurrency(z.restschuldEnde, false)}\n`
    }

    content += separator
    content += `Monatliche Rate: ${formatCurrency(result.monatlicheRate)}\n`
    content += `Gesamte Zinsen: ${formatCurrency(result.gesamtZinsen)}\n`
    content += `Laufzeit: ${formatYears(result.laufzeit)}\n`

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "tilgungsplan.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  // Farblogik für Laufzeit
  const laufzeitColor = result.laufzeit <= 20
    ? "green" as const
    : result.laufzeit <= 30
      ? "amber" as const
      : "red" as const

  return (
    <CalculatorLayout
      title="Tilgungsplan-Generator"
      description="Detaillierten Tilgungsplan erstellen und als PDF herunterladen"
      icon={FileSpreadsheet}
      hasResults={true}
      onDownloadPdf={handleDownloadPdf}
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
              sub="Zins + Tilgung"
              color="blue"
            />
            <BentoMetric
              label="Gesamte Zinskosten"
              value={formatCurrency(result.gesamtZinsen)}
              sub="Über die gesamte Laufzeit"
              color="red"
            />
            <BentoMetric
              label="Laufzeit"
              value={formatYears(result.laufzeit)}
              sub="Bis zur vollständigen Tilgung"
              color={laufzeitColor}
            />
          </div>

          {/* Bento-Grid: Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BentoMetric
              label="Gesamte Tilgung"
              value={formatCurrency(result.gesamtTilgung + result.gesamtSondertilgung)}
              sub={result.gesamtSondertilgung > 0 ? `davon ${formatCurrency(result.gesamtSondertilgung)} Sondertilgung` : "Reguläre Tilgung"}
              color="green"
            />
            <BentoMetric
              label="Restschuld nach Zinsbindung"
              value={formatCurrency(
                result.tilgungsplan.find((z) => z.jahr === zinsbindung)?.restschuldEnde ?? 0
              )}
              sub={`Nach ${zinsbindung} Jahren`}
              color="amber"
            />
          </div>

          {/* Diagramm: Zins- vs. Tilgungsanteil */}
          <div className="bg-card border rounded-xl p-5">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Zins- und Tilgungsverlauf
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={result.tilgungsplan.map((z) => ({
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
                  formatter={(value) => formatCurrency(Number(value), false)}
                  labelStyle={{ fontWeight: "bold" }}
                  contentStyle={{
                    background: "white",
                    border: "1px solid #E3E5EB",
                    borderRadius: "8px",
                    fontSize: "13px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Zinsanteil"
                  stackId="1"
                  stroke={CHART_COLORS[3]}
                  fill={CHART_COLORS[3]}
                  fillOpacity={0.6}
                  name="Zinsanteil"
                />
                <Area
                  type="monotone"
                  dataKey="Tilgungsanteil"
                  stackId="1"
                  stroke={CHART_COLORS[0]}
                  fill={CHART_COLORS[0]}
                  fillOpacity={0.6}
                  name="Tilgungsanteil"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Kompletter Tilgungsplan */}
          <div className="bg-card border rounded-xl p-5">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Tilgungsplan
            </h3>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jahr</TableHead>
                    <TableHead className="text-right">Zinsen</TableHead>
                    <TableHead className="text-right">Tilgung</TableHead>
                    {result.gesamtSondertilgung > 0 && (
                      <TableHead className="text-right">Sonder</TableHead>
                    )}
                    <TableHead className="text-right">Restschuld</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.tilgungsplan.map((z) => (
                    <TableRow
                      key={z.jahr}
                      className={z.jahr === zinsbindung ? "bg-yellow-50 dark:bg-yellow-950" : ""}
                    >
                      <TableCell className="font-medium">
                        {z.jahr}
                        {z.jahr === zinsbindung && (
                          <span className="text-xs text-yellow-600 ml-1">(Zinsbindung)</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-red-600 dark:text-red-400">
                        {formatCurrency(z.zinsanteil, false)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-green-600 dark:text-green-400">
                        {formatCurrency(z.tilgungsanteil, false)}
                      </TableCell>
                      {result.gesamtSondertilgung > 0 && (
                        <TableCell className="text-right tabular-nums">
                          {z.sondertilgung > 0
                            ? formatCurrency(z.sondertilgung, false)
                            : "–"}
                        </TableCell>
                      )}
                      <TableCell className="text-right tabular-nums font-medium">
                        {formatCurrency(z.restschuldEnde, false)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      }
    />
  )
}
