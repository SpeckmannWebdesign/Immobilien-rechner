"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
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
import { berechneMietsteigerung, formatCurrency, type MietsteigerungResult } from "@/lib/rechner"

export function MietsteigerungsRechner() {
  const [aktuelleMonatsmiete, setAktuelleMonatsmiete] = useState(800)
  const [jaehrlicheSteigerung, setJaehrlicheSteigerung] = useState(2.0)
  const [zeitraum, setZeitraum] = useState(20)
  const [result, setResult] = useState<MietsteigerungResult | null>(null)

  function handleCalculate() {
    setResult(
      berechneMietsteigerung({
        aktuelleMonatsmiete,
        jaehrlicheSteigerung,
        zeitraum,
      })
    )
  }

  return (
    <CalculatorLayout
      title="Mietsteigerungsrechner"
      description="Mietentwicklung über 10, 20 oder 30 Jahre prognostizieren"
      icon={ArrowUpRight}
      hasResults={result !== null}
      onCalculate={handleCalculate}
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
        result ? (
          <>
            <ResultCard
              title="Mietentwicklung"
              items={[
                {
                  label: `Monatsmiete nach ${zeitraum} Jahren`,
                  value: result.endMonatsmiete,
                  highlight: true,
                  color: "green",
                },
                {
                  label: `Jahresmiete nach ${zeitraum} Jahren`,
                  value: result.endJahresmiete,
                },
                {
                  label: "Steigerung absolut",
                  value: result.steigerungAbsolut,
                  textValue: `+${formatCurrency(result.steigerungAbsolut)}/Monat`,
                },
                {
                  label: "Steigerung relativ",
                  value: result.steigerungProzent,
                  type: "percent",
                },
                {
                  label: `Gesamte Mieteinnahmen (${zeitraum} Jahre)`,
                  value: result.gesamtMieteinnahmen,
                  highlight: true,
                },
              ]}
            />
            {/* Jahrestabelle */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Jahresübersicht</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-64 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Jahr</TableHead>
                        <TableHead className="text-right">Monatsmiete</TableHead>
                        <TableHead className="text-right">Kumuliert</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.jahresUebersicht.map((j) => (
                        <TableRow key={j.jahr}>
                          <TableCell>{j.jahr}</TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatCurrency(j.monatsmiete)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatCurrency(j.kumuliert, false)}
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
