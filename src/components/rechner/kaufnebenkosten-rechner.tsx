"use client"

import { useState, useMemo } from "react"
import { Calculator } from "lucide-react"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { SelectInput } from "./select-input"
import { BentoMetric, ResultCard } from "./result-card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { berechneKaufnebenkosten, formatCurrency, formatPercent } from "@/lib/rechner"

// Standard-Grunderwerbsteuersätze (werden später aus der DB geladen)
const BUNDESLAENDER = [
  { value: "Baden-Württemberg", label: "Baden-Württemberg (5,0%)", rate: 5.0 },
  { value: "Bayern", label: "Bayern (3,5%)", rate: 3.5 },
  { value: "Berlin", label: "Berlin (6,0%)", rate: 6.0 },
  { value: "Brandenburg", label: "Brandenburg (6,5%)", rate: 6.5 },
  { value: "Bremen", label: "Bremen (5,5%)", rate: 5.5 },
  { value: "Hamburg", label: "Hamburg (5,5%)", rate: 5.5 },
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
  const [kaufpreis, setKaufpreis] = useState(350000)
  const [bundesland, setBundesland] = useState("Niedersachsen")
  const [notarSatz, setNotarSatz] = useState(1.5)
  const [grundbuchSatz, setGrundbuchSatz] = useState(0.5)
  const [mitMakler, setMitMakler] = useState(true)
  const [maklerSatz, setMaklerSatz] = useState(3.57)

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(() => {
    const grunderwerbsteuerSatz =
      BUNDESLAENDER.find((b) => b.value === bundesland)?.rate ?? 5.0

    return berechneKaufnebenkosten({
      kaufpreis,
      grunderwerbsteuerSatz,
      notarSatz,
      grundbuchSatz,
      maklerSatz,
      mitMakler,
    })
  }, [kaufpreis, bundesland, notarSatz, grundbuchSatz, maklerSatz, mitMakler])

  const notarUndGrundbuch = result.notarkosten + result.grundbuchkosten

  return (
    <CalculatorLayout
      title="Kaufnebenkosten-Rechner"
      description="Alle Kosten beim Immobilienkauf auf einen Blick"
      icon={Calculator}
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
        <>
          {/* Bento-Grid: Top-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoMetric
              label="Gesamtnebenkosten"
              value={formatCurrency(result.gesamtNebenkosten)}
              sub={`${formatPercent(result.gesamtNebenkostenProzent)} vom Kaufpreis`}
              color="red"
            />
            <BentoMetric
              label="Grunderwerbsteuer"
              value={formatCurrency(result.grunderwerbsteuer)}
              sub={`${bundesland}`}
              color="amber"
            />
            <BentoMetric
              label="Notar + Grundbuch"
              value={formatCurrency(notarUndGrundbuch)}
              sub={`${formatPercent(notarSatz + grundbuchSatz)} vom Kaufpreis`}
              color="blue"
            />
          </div>

          {/* Bento-Grid: Detail-Kennzahlen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BentoMetric
              label="Notarkosten"
              value={formatCurrency(result.notarkosten)}
              sub={`${formatPercent(notarSatz)} vom Kaufpreis`}
            />
            <BentoMetric
              label="Grundbuchkosten"
              value={formatCurrency(result.grundbuchkosten)}
              sub={`${formatPercent(grundbuchSatz)} vom Kaufpreis`}
            />
            {result.maklerkosten > 0 && (
              <BentoMetric
                label="Maklerkosten"
                value={formatCurrency(result.maklerkosten)}
                sub={`${formatPercent(maklerSatz)} vom Kaufpreis`}
                color="amber"
              />
            )}
            <BentoMetric
              label="Gesamtkosten inkl. Kaufpreis"
              value={formatCurrency(result.gesamtKosten)}
              sub={`Kaufpreis ${formatCurrency(kaufpreis)} + Nebenkosten`}
              color="blue"
            />
          </div>
        </>
      }
    />
  )
}
