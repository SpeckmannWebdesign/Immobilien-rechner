"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { SelectInput } from "./select-input"
import { ResultCard } from "./result-card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { berechneKaufnebenkosten, type KaufnebenkostenResult } from "@/lib/rechner"

// Standard-Grunderwerbsteuersätze (werden später aus der DB geladen)
const BUNDESLAENDER = [
  { value: "Baden-Württemberg", label: "Baden-Württemberg (5,0%)", rate: 5.0 },
  { value: "Bayern", label: "Bayern (3,5%)", rate: 3.5 },
  { value: "Berlin", label: "Berlin (6,0%)", rate: 6.0 },
  { value: "Brandenburg", label: "Brandenburg (6,5%)", rate: 6.5 },
  { value: "Bremen", label: "Bremen (5,0%)", rate: 5.0 },
  { value: "Hamburg", label: "Hamburg (4,5%)", rate: 4.5 },
  { value: "Hessen", label: "Hessen (6,0%)", rate: 6.0 },
  { value: "Mecklenburg-Vorpommern", label: "Mecklenburg-Vorpommern (6,0%)", rate: 6.0 },
  { value: "Niedersachsen", label: "Niedersachsen (5,0%)", rate: 5.0 },
  { value: "Nordrhein-Westfalen", label: "Nordrhein-Westfalen (6,5%)", rate: 6.5 },
  { value: "Rheinland-Pfalz", label: "Rheinland-Pfalz (5,0%)", rate: 5.0 },
  { value: "Saarland", label: "Saarland (6,5%)", rate: 6.5 },
  { value: "Sachsen", label: "Sachsen (5,5%)", rate: 5.5 },
  { value: "Sachsen-Anhalt", label: "Sachsen-Anhalt (5,0%)", rate: 5.0 },
  { value: "Schleswig-Holstein", label: "Schleswig-Holstein (6,5%)", rate: 6.5 },
  { value: "Thüringen", label: "Thüringen (5,0%)", rate: 5.0 },
]

export function KaufnebenkostenRechner() {
  const [kaufpreis, setKaufpreis] = useState(300000)
  const [bundesland, setBundesland] = useState("Niedersachsen")
  const [notarSatz, setNotarSatz] = useState(1.5)
  const [grundbuchSatz, setGrundbuchSatz] = useState(0.5)
  const [mitMakler, setMitMakler] = useState(true)
  const [maklerSatz, setMaklerSatz] = useState(3.57)
  const [result, setResult] = useState<KaufnebenkostenResult | null>(null)

  function handleCalculate() {
    const grunderwerbsteuerSatz =
      BUNDESLAENDER.find((b) => b.value === bundesland)?.rate ?? 5.0

    setResult(
      berechneKaufnebenkosten({
        kaufpreis,
        grunderwerbsteuerSatz,
        notarSatz,
        grundbuchSatz,
        maklerSatz,
        mitMakler,
      })
    )
  }

  return (
    <CalculatorLayout
      title="Kaufnebenkosten-Rechner"
      description="Alle Kosten beim Immobilienkauf auf einen Blick"
      icon={Calculator}
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
            options={BUNDESLAENDER}
          />
          <PercentInput
            id="notar"
            label="Notarkosten"
            value={notarSatz}
            onChange={setNotarSatz}
            hint="Standard: 1,5%"
          />
          <PercentInput
            id="grundbuch"
            label="Grundbuchkosten"
            value={grundbuchSatz}
            onChange={setGrundbuchSatz}
            hint="Standard: 0,5%"
          />
          <div className="space-y-1.5">
            <Label htmlFor="makler">Makler</Label>
            <div className="flex items-center gap-3">
              <Input
                type="checkbox"
                id="makler"
                checked={mitMakler}
                onChange={(e) => setMitMakler(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm">Makler beteiligt</span>
            </div>
          </div>
          {mitMakler && (
            <PercentInput
              id="maklersatz"
              label="Maklerprovision (inkl. MwSt)"
              value={maklerSatz}
              onChange={setMaklerSatz}
              hint="Standard: 3,57% (Käuferanteil)"
            />
          )}
        </>
      }
      results={
        result ? (
          <ResultCard
            title="Kaufnebenkosten"
            items={[
              { label: "Grunderwerbsteuer", value: result.grunderwerbsteuer },
              { label: "Notarkosten", value: result.notarkosten },
              { label: "Grundbuchkosten", value: result.grundbuchkosten },
              ...(result.maklerkosten > 0
                ? [{ label: "Maklerkosten", value: result.maklerkosten }]
                : []),
              {
                label: "Gesamte Nebenkosten",
                value: result.gesamtNebenkosten,
                highlight: true,
              },
              {
                label: "Nebenkosten in %",
                value: result.gesamtNebenkostenProzent,
                type: "percent" as const,
              },
              {
                label: "Gesamtkosten (Kaufpreis + NK)",
                value: result.gesamtKosten,
                highlight: true,
              },
            ]}
          />
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            Geben Sie Ihre Daten ein und klicken Sie auf &quot;Berechnen&quot;.
          </div>
        )
      }
    />
  )
}
