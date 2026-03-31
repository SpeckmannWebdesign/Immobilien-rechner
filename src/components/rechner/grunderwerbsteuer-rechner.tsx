"use client"

import { useState } from "react"
import { Landmark } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { SelectInput } from "./select-input"
import { ResultCard } from "./result-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { berechneGrunderwerbsteuer, formatCurrency, type GrunderwerbsteuerResult } from "@/lib/rechner"

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
  const [kaufpreis, setKaufpreis] = useState(300000)
  const [bundesland, setBundesland] = useState("Niedersachsen")
  const [result, setResult] = useState<GrunderwerbsteuerResult | null>(null)

  function handleCalculate() {
    setResult(berechneGrunderwerbsteuer(kaufpreis, SAETZE, bundesland))
  }

  return (
    <CalculatorLayout
      title="Grunderwerbsteuer-Rechner"
      description="Grunderwerbsteuer für alle 16 Bundesländer berechnen und vergleichen"
      icon={Landmark}
      hasResults={result !== null}
      onCalculate={handleCalculate}
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
        result ? (
          <>
            <ResultCard
              title="Ihre Grunderwerbsteuer"
              items={[
                {
                  label: result.gewaehltesSteuer.bundesland,
                  value: result.gewaehltesSteuer.betrag,
                  highlight: true,
                },
                {
                  label: "Steuersatz",
                  value: result.gewaehltesSteuer.satz,
                  type: "percent",
                },
              ]}
            />
            <ResultCard
              title="Vergleich"
              items={[
                {
                  label: `Günstigstes: ${result.guenstigstes.bundesland}`,
                  value: result.guenstigstes.betrag,
                  color: "green",
                },
                {
                  label: `Teuerstes: ${result.teuerstes.bundesland}`,
                  value: result.teuerstes.betrag,
                  color: "red",
                },
                {
                  label: "Differenz",
                  value: result.differenz,
                  highlight: true,
                },
              ]}
            />
            {/* Vergleichstabelle */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Alle Bundesländer</CardTitle>
              </CardHeader>
              <CardContent>
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
