"use client"

import { useState, useMemo } from "react"
import { TrendingDown } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { NumberInput } from "./number-input"
import { BentoMetric } from "./result-card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { berechneMieterhoehung, formatCurrency } from "@/lib/rechner"

export function MieterhoehungsRechner() {
  const [aktuelleKaltmiete, setAktuelleKaltmiete] = useState(800)
  const [vergleichsmiete, setVergleichsmiete] = useState(10)
  const [wohnflaeche, setWohnflaeche] = useState(75)
  const [letzteMieterhoehung, setLetzteMieterhoehung] = useState("2024-06-01")
  const [angespannterMarkt, setAngespannterMarkt] = useState(false)

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () =>
      berechneMieterhoehung({
        aktuelleKaltmiete,
        vergleichsmiete,
        wohnflaeche,
        letzteMieterhoehung,
        angespannterMarkt,
      }),
    [aktuelleKaltmiete, vergleichsmiete, wohnflaeche, letzteMieterhoehung, angespannterMarkt]
  )

  // Farblogik für Erhöhung
  const erhoehungColor = result.erhoehungsBetrag > 50
    ? "green" as const
    : result.erhoehungsBetrag > 0
      ? "amber" as const
      : "red" as const

  return (
    <CalculatorLayout
      title="Mieterhöhungs-Rechner"
      description="Zulässige Mieterhöhung mit Kappungsgrenze und frühestem Zeitpunkt berechnen"
      icon={TrendingDown}
      hasResults={true}
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
        <>
          {/* Bento-Grid: Top-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoMetric
              label="Maximale Erhöhung"
              value={formatCurrency(result.erhoehungsBetrag)}
              sub="Pro Monat zulässig"
              color={erhoehungColor}
            />
            <BentoMetric
              label="Neue Miete"
              value={formatCurrency(result.neueMiete)}
              sub="Nach Erhöhung"
              color="blue"
            />
            <BentoMetric
              label={`Kappungsgrenze (${result.kappungsgrenzeProzent}%)`}
              value={formatCurrency(result.kappungsgrenzeAbsolut)}
              sub={angespannterMarkt ? "Angespannter Markt" : "Normaler Markt"}
              color="amber"
            />
          </div>

          {/* Bento-Grid: Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BentoMetric
              label="Ortsübliche Monatsmiete"
              value={formatCurrency(result.ortsueblicheMonatsmiete)}
              sub={`${vergleichsmiete.toFixed(2).replace(".", ",")} €/m² × ${wohnflaeche} m²`}
            />
            <BentoMetric
              label="Frühester Zeitpunkt"
              value={result.fruehesterZeitpunkt.toLocaleDateString("de-DE")}
              sub={result.erhoehungMoeglich ? "Erhöhung jetzt möglich" : "Noch nicht möglich"}
              color={result.erhoehungMoeglich ? "green" : "red"}
            />
          </div>

          {/* Hinweis */}
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-sm text-muted-foreground">{result.hinweis}</p>
          </div>
        </>
      }
    />
  )
}
