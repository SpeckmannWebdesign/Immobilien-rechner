"use client"

import { useState, useMemo } from "react"
import { Landmark } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { SelectInput } from "./select-input"
import { BentoMetric } from "./result-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { berechneGrunderwerbsteuer, formatCurrency } from "@/lib/rechner"

const SAETZE = [
  { bundesland: "Baden-Württemberg", rate: 5.0 },
  { bundesland: "Bayern", rate: 3.5 },
  { bundesland: "Berlin", rate: 6.0 },
  { bundesland: "Brandenburg", rate: 6.5 },
  { bundesland: "Bremen", rate: 5.0 },
  { bundesland: "Hamburg", rate: 5.5 },
  { bundesland: "Hessen", rate: 6.0 },
  { bundesland: "Mecklenburg-Vorpommern", rate: 6.0 },
  { bundesland: "Niedersachsen", rate: 5.0 },
  { bundesland: "Nordrhein-Westfalen", rate: 6.5 },
  { bundesland: "Rheinland-Pfalz", rate: 5.0 },
  { bundesland: "Saarland", rate: 6.5 },
  { bundesland: "Sachsen", rate: 5.5 },
  { bundesland: "Sachsen-Anhalt", rate: 5.0 },
  { bundesland: "Schleswig-Holstein", rate: 6.5 },
  { bundesland: "Thüringen", rate: 5.0 },
]

export function GrunderwerbsteuerRechner() {
  const [kaufpreis, setKaufpreis] = useState(350000)
  const [bundesland, setBundesland] = useState("Niedersachsen")

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () => berechneGrunderwerbsteuer(kaufpreis, SAETZE, bundesland),
    [kaufpreis, bundesland]
  )

  // Farblogik: je höher der Steuersatz, desto "schlechter"
  const steuerColor = result.gewaehltesSteuer.satz <= 3.5
    ? "positive" as const
    : result.gewaehltesSteuer.satz <= 5.0
      ? "muted" as const
      : "negative" as const

  return (
    <CalculatorLayout
      title="Grunderwerbsteuer-Rechner"
      description="Grunderwerbsteuer für alle 16 Bundesländer berechnen und vergleichen"
      icon={Landmark}
      hasResults={true}
      inputs={
        <>
          <CurrencyInput
            id="kaufpreis"
            label="Kaufpreis"
            value={kaufpreis}
            onChange={setKaufpreis}
          />
          <SelectInput
            id="bundesland"
            label="Bundesland"
            value={bundesland}
            onChange={setBundesland}
            options={SAETZE.map((s) => ({
              value: s.bundesland,
              label: `${s.bundesland} (${s.rate.toFixed(1).replace(".", ",")}%)`,
            }))}
          />
        </>
      }
      results={
        <>
          {/* Bento-Grid: Top-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoMetric
              label={`Grunderwerbsteuer (${result.gewaehltesSteuer.satz.toFixed(1).replace(".", ",")}%)`}
              value={formatCurrency(result.gewaehltesSteuer.betrag)}
              sub={result.gewaehltesSteuer.bundesland}
              color={steuerColor}
            />
            <BentoMetric
              label="Gesamtkosten"
              value={formatCurrency(kaufpreis + result.gewaehltesSteuer.betrag)}
              sub="Kaufpreis + Steuer"
              color="accent"
            />
            <BentoMetric
              label="Mögliche Ersparnis"
              value={formatCurrency(result.differenz)}
              sub={`vs. günstigstes: ${result.guenstigstes.bundesland}`}
              color={result.differenz > 0 ? "muted" : "positive"}
            />
          </div>

          {/* Bento-Grid: Vergleich */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BentoMetric
              label={`Günstigstes: ${result.guenstigstes.bundesland}`}
              value={formatCurrency(result.guenstigstes.betrag)}
              sub={`${result.guenstigstes.satz.toFixed(1).replace(".", ",")}% Steuersatz`}
              color="positive"
            />
            <BentoMetric
              label={`Teuerstes: ${result.teuerstes.bundesland}`}
              value={formatCurrency(result.teuerstes.betrag)}
              sub={`${result.teuerstes.satz.toFixed(1).replace(".", ",")}% Steuersatz`}
              color="negative"
            />
          </div>

          {/* Vergleichstabelle aller Bundesländer */}
          <div className="bg-card border rounded-xl p-5">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Alle Bundesländer im Vergleich
            </h3>
            <div className="max-h-64 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bundesland</TableHead>
                    <TableHead className="text-right">Satz</TableHead>
                    <TableHead className="text-right">Betrag</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.alleBundeslaender.map((b) => (
                    <TableRow
                      key={b.bundesland}
                      className={
                        b.bundesland === bundesland ? "bg-primary/5" : ""
                      }
                    >
                      <TableCell className="text-sm">
                        {b.bundesland}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {b.satz.toFixed(1).replace(".", ",")} %
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium tabular-nums">
                        {formatCurrency(b.betrag)}
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
