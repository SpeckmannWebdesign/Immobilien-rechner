"use client"

import { useState } from "react"
import { TrendingDown } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { NumberInput } from "./number-input"
import { ResultCard } from "./result-card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { berechneMieterhoehung, type MieterhoehungResult } from "@/lib/rechner"

export function MieterhoehungsRechner() {
  const [aktuelleKaltmiete, setAktuelleKaltmiete] = useState(650)
  const [vergleichsmiete, setVergleichsmiete] = useState(10.5)
  const [wohnflaeche, setWohnflaeche] = useState(75)
  const [letzteMieterhoehung, setLetzteMieterhoehung] = useState("2024-06-01")
  const [angespannterMarkt, setAngespannterMarkt] = useState(false)
  const [result, setResult] = useState<MieterhoehungResult | null>(null)

  function handleCalculate() {
    setResult(
      berechneMieterhoehung({
        aktuelleKaltmiete,
        vergleichsmiete,
        wohnflaeche,
        letzteMieterhoehung,
        angespannterMarkt,
      })
    )
  }

  return (
    <CalculatorLayout
      title="Mieterhöhungs-Rechner"
      description="Zulässige Mieterhöhung mit Kappungsgrenze und frühestem Zeitpunkt berechnen"
      icon={TrendingDown}
      hasResults={result !== null}
      onCalculate={handleCalculate}
      inputs={
        <>
          <CurrencyInput
            id="kaltmiete"
            label="Aktuelle Kaltmiete (monatlich)"
            value={aktuelleKaltmiete}
            onChange={setAktuelleKaltmiete}
          />
          <NumberInput
            id="vergleichsmiete"
            label="Ortsübliche Vergleichsmiete"
            value={vergleichsmiete}
            onChange={setVergleichsmiete}
            suffix="€/m²"
            step={0.1}
            hint="Laut Mietspiegel der Gemeinde"
          />
          <NumberInput
            id="flaeche"
            label="Wohnfläche"
            value={wohnflaeche}
            onChange={setWohnflaeche}
            suffix="m²"
          />
          <div className="space-y-1.5">
            <Label htmlFor="letzte">Letzte Mieterhöhung</Label>
            <Input
              id="letzte"
              type="date"
              value={letzteMieterhoehung}
              onChange={(e) => setLetzteMieterhoehung(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="angespannt">Wohnungsmarkt</Label>
            <div className="flex items-center gap-3">
              <Input
                type="checkbox"
                id="angespannt"
                checked={angespannterMarkt}
                onChange={(e) => setAngespannterMarkt(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm">
                Angespannter Wohnungsmarkt (Kappungsgrenze 15% statt 20%)
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Gilt z.B. in Berlin, München, Hamburg, Frankfurt und weiteren Städten
            </p>
          </div>
        </>
      }
      results={
        result ? (
          <>
            <ResultCard
              title="Mieterhöhung"
              items={[
                {
                  label: "Ortsübliche Monatsmiete",
                  value: result.ortsueblicheMonatsmiete,
                },
                {
                  label: `Kappungsgrenze (${result.kappungsgrenzeProzent}%)`,
                  value: result.kappungsgrenzeAbsolut,
                },
                {
                  label: "Maximale Erhöhung",
                  value: result.erhoehungsBetrag,
                  highlight: true,
                  color: result.erhoehungsBetrag > 0 ? "green" : "default",
                },
                {
                  label: "Neue Miete",
                  value: result.neueMiete,
                  highlight: true,
                },
              ]}
            />
            <ResultCard
              title="Zeitpunkt"
              items={[
                {
                  label: "Frühester Zeitpunkt",
                  value: 0,
                  textValue: result.fruehesterZeitpunkt.toLocaleDateString("de-DE"),
                },
                {
                  label: "Erhöhung jetzt möglich?",
                  value: 0,
                  textValue: result.erhoehungMoeglich ? "Ja" : "Nein",
                  color: result.erhoehungMoeglich ? "green" : "red",
                },
              ]}
            />
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-sm text-muted-foreground">{result.hinweis}</p>
            </div>
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
