"use client"

import { useState } from "react"
import { FileSpreadsheet } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { NumberInput } from "./number-input"
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
import { berechneTilgungsplan, formatCurrency, formatYears, type TilgungsplanResult } from "@/lib/rechner"

export function TilgungsplanRechner() {
  const [darlehenssumme, setDarlehenssumme] = useState(220000)
  const [sollzinsSatz, setSollzinsSatz] = useState(3.5)
  const [anfangsTilgung, setAnfangsTilgung] = useState(2.0)
  const [zinsbindung, setZinsbindung] = useState(10)
  const [sondertilgungJahr, setSondertilgungJahr] = useState(0)
  const [result, setResult] = useState<TilgungsplanResult | null>(null)

  function handleCalculate() {
    setResult(
      berechneTilgungsplan({
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
      title="Tilgungsplan-Generator"
      description="Detaillierten Tilgungsplan erstellen und als PDF herunterladen"
      icon={FileSpreadsheet}
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
        result ? (
          <>
            <ResultCard
              title="Zusammenfassung"
              items={[
                {
                  label: "Monatliche Rate",
                  value: result.monatlicheRate,
                  highlight: true,
                },
                {
                  label: "Gesamte Zinskosten",
                  value: result.gesamtZinsen,
                  color: "red",
                },
                {
                  label: "Gesamte Tilgung",
                  value: result.gesamtTilgung + result.gesamtSondertilgung,
                  color: "green",
                },
                {
                  label: "Laufzeit",
                  value: 0,
                  textValue: formatYears(result.laufzeit),
                },
              ]}
            />
            {/* Kompletter Tilgungsplan */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Tilgungsplan</CardTitle>
              </CardHeader>
              <CardContent>
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
