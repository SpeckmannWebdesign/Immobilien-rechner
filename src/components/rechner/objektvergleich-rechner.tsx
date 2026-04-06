"use client"

import { useState, useMemo } from "react"
import { BarChart3, Plus, Trash2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Disclaimer } from "./disclaimer"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { ResultCard } from "./result-card"
import { BentoMetric } from "./result-card"
import { berechneObjektvergleich, type ObjektInput, formatCurrency, formatPercent } from "@/lib/rechner"

const CHART_COLORS = ["var(--rechner-accent)", "var(--rechner-accent-dark)", "var(--rechner-accent-muted)"]

const DEFAULT_OBJEKT: ObjektInput = {
  name: "Objekt",
  kaufpreis: 250000,
  monatlicheKaltmiete: 800,
  kaufnebenkostenProzent: 10,
  eigenkapital: 60000,
  sollzinsSatz: 3.5,
  anfangsTilgung: 2.0,
}

export function ObjektvergleichRechner() {
  const [objekte, setObjekte] = useState<ObjektInput[]>([
    { ...DEFAULT_OBJEKT, name: "Objekt A" },
    { ...DEFAULT_OBJEKT, name: "Objekt B", kaufpreis: 320000, monatlicheKaltmiete: 950 },
  ])

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const results = useMemo(
    () => berechneObjektvergleich(objekte),
    [objekte]
  )

  function updateObjekt(index: number, field: keyof ObjektInput, value: number | string) {
    const updated = [...objekte]
    updated[index] = { ...updated[index], [field]: value }
    setObjekte(updated)
  }

  function addObjekt() {
    if (objekte.length < 3) {
      setObjekte([
        ...objekte,
        { ...DEFAULT_OBJEKT, name: `Objekt ${String.fromCharCode(65 + objekte.length)}` },
      ])
    }
  }

  function removeObjekt(index: number) {
    if (objekte.length > 2) {
      setObjekte(objekte.filter((_, i) => i !== index))
    }
  }

  // Bestes Objekt für Top-Kennzahlen ermitteln
  const besteRendite = results.reduce((best, r) => r.bruttoRendite > best.bruttoRendite ? r : best, results[0])
  const besterCashflow = results.reduce((best, r) => r.monatsCashflow > best.monatsCashflow ? r : best, results[0])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b">
        <div className="w-10 h-10 rounded-xl bg-muted border flex items-center justify-center flex-shrink-0">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Objektvergleich</h1>
          <p className="text-sm text-muted-foreground">Bis zu 3 Immobilien nebeneinander vergleichen</p>
        </div>
      </div>

      {/* Bento-Grid: Top-Kennzahlen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <BentoMetric
          label="Beste Bruttorendite"
          value={formatPercent(besteRendite.bruttoRendite)}
          sub={besteRendite.name}
          color="positive"
        />
        <BentoMetric
          label="Bester Cashflow/Monat"
          value={formatCurrency(besterCashflow.monatsCashflow)}
          sub={besterCashflow.name}
          color={besterCashflow.monatsCashflow >= 0 ? "positive" : "negative"}
        />
        <BentoMetric
          label="Objekte verglichen"
          value={`${objekte.length}`}
          sub="Max. 3 Objekte"
          color="accent"
        />
      </div>

      {/* Eingabefelder pro Objekt */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {objekte.map((obj, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Input
                  value={obj.name}
                  onChange={(e) => updateObjekt(i, "name", e.target.value)}
                  className="font-semibold text-lg h-auto p-0 border-0 shadow-none focus-visible:ring-0"
                />
                {objekte.length > 2 && (
                  <Button variant="ghost" size="icon-xs" onClick={() => removeObjekt(i)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <CurrencyInput id={`kp-${i}`} label="Kaufpreis" value={obj.kaufpreis} onChange={(v) => updateObjekt(i, "kaufpreis", v)} />
              <CurrencyInput id={`km-${i}`} label="Kaltmiete/Monat" value={obj.monatlicheKaltmiete} onChange={(v) => updateObjekt(i, "monatlicheKaltmiete", v)} />
              <PercentInput id={`nk-${i}`} label="Kaufnebenkosten" value={obj.kaufnebenkostenProzent} onChange={(v) => updateObjekt(i, "kaufnebenkostenProzent", v)} />
              <CurrencyInput id={`ek-${i}`} label="Eigenkapital" value={obj.eigenkapital} onChange={(v) => updateObjekt(i, "eigenkapital", v)} />
              <PercentInput id={`zs-${i}`} label="Sollzins" value={obj.sollzinsSatz} onChange={(v) => updateObjekt(i, "sollzinsSatz", v)} />
              <PercentInput id={`tl-${i}`} label="Tilgung" value={obj.anfangsTilgung} onChange={(v) => updateObjekt(i, "anfangsTilgung", v)} />
            </CardContent>
          </Card>
        ))}

        {objekte.length < 3 && (
          <Card className="border-dashed flex items-center justify-center min-h-[200px]">
            <Button variant="ghost" onClick={addObjekt} className="gap-2">
              <Plus className="h-4 w-4" />
              Objekt hinzufügen
            </Button>
          </Card>
        )}
      </div>

      {/* Ergebnisse — immer sichtbar */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((r, i) => (
            <ResultCard
              key={i}
              title={r.name}
              items={[
                {
                  label: "Bruttorendite",
                  value: r.bruttoRendite,
                  type: "percent",
                  color: r.isBest.rendite ? "positive" : "default",
                  highlight: r.isBest.rendite,
                },
                { label: "Nettorendite", value: r.nettoRendite, type: "percent" },
                { label: "Gesamtinvestition", value: r.gesamtinvestition },
                { label: "Monatliche Rate", value: r.monatlicheRate },
                {
                  label: "Cashflow/Monat",
                  value: r.monatsCashflow,
                  color: r.isBest.cashflow ? "positive" : r.monatsCashflow < 0 ? "negative" : "default",
                  highlight: r.isBest.cashflow,
                },
                { label: "EK-Rendite", value: r.eigenkapitalRendite, type: "percent" },
              ]}
            />
          ))}
        </div>

        {/* Balkendiagramm: Vergleich aller Objekte */}
        <div className="bg-card border rounded-xl p-5">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Visueller Vergleich
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={results.map((r) => ({
                name: r.name,
                Bruttorendite: Number(r.bruttoRendite.toFixed(2)),
                Nettorendite: Number(r.nettoRendite.toFixed(2)),
                "Cashflow/Monat": Number(r.monatsCashflow.toFixed(2)),
              }))}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                yAxisId="prozent"
                orientation="left"
                tickFormatter={(v: number) => formatPercent(v)}
                label={{ value: "Rendite (%)", angle: -90, position: "insideLeft", offset: -5 }}
              />
              <YAxis
                yAxisId="euro"
                orientation="right"
                tickFormatter={(v: number) => formatCurrency(v, false)}
                label={{ value: "Cashflow (€)", angle: 90, position: "insideRight", offset: -5 }}
              />
              <Tooltip
                formatter={(value, name) =>
                  name === "Cashflow/Monat"
                    ? formatCurrency(Number(value))
                    : formatPercent(Number(value))
                }
                contentStyle={{
                  background: "white",
                  border: "1px solid #E3E5EB",
                  borderRadius: "8px",
                  fontSize: "13px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                }}
              />
              <Legend />
              <Bar yAxisId="prozent" dataKey="Bruttorendite" fill={CHART_COLORS[0]} />
              <Bar yAxisId="prozent" dataKey="Nettorendite" fill={CHART_COLORS[1]} />
              <Bar yAxisId="euro" dataKey="Cashflow/Monat" fill={CHART_COLORS[3]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Disclaimer />
    </div>
  )
}
