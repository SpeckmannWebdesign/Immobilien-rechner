"use client"

import { useState, useMemo } from "react"
import { Receipt, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Disclaimer } from "./disclaimer"
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
import {
  berechneNebenkosten,
  formatCurrency,
  type Kostenposition,
  type Mieter,
  type Verteilerschluessel,
} from "@/lib/rechner"

const DEFAULT_KOSTEN: Kostenposition[] = [
  { name: "Heizkosten", betrag: 3000, umlegbar: true },
  { name: "Wasser/Abwasser", betrag: 1200, umlegbar: true },
  { name: "Müllabfuhr", betrag: 600, umlegbar: true },
  { name: "Grundsteuer", betrag: 800, umlegbar: true },
  { name: "Gebäudeversicherung", betrag: 500, umlegbar: true },
  { name: "Verwaltungskosten", betrag: 1200, umlegbar: false },
]

const DEFAULT_MIETER: Mieter[] = [
  { name: "Wohnung 1 (EG links)", flaeche: 65, personen: 2 },
  { name: "Wohnung 2 (EG rechts)", flaeche: 80, personen: 3 },
  { name: "Wohnung 3 (OG links)", flaeche: 65, personen: 1 },
]

export function NebenkostenRechner() {
  const [kosten, setKosten] = useState<Kostenposition[]>(DEFAULT_KOSTEN)
  const [mieter, setMieter] = useState<Mieter[]>(DEFAULT_MIETER)
  const [schluessel, setSchluessel] = useState<Verteilerschluessel>("flaeche")

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () =>
      berechneNebenkosten({
        kostenpositionen: kosten,
        mieter,
        verteilerschluessel: schluessel,
        abrechnungszeitraum: String(new Date().getFullYear()),
      }),
    [kosten, mieter, schluessel]
  )

  function updateKosten(index: number, field: keyof Kostenposition, value: string | number | boolean) {
    const updated = [...kosten]
    updated[index] = { ...updated[index], [field]: value }
    setKosten(updated)
  }

  function addKosten() {
    setKosten([...kosten, { name: "Neue Position", betrag: 0, umlegbar: true }])
  }

  function removeKosten(index: number) {
    setKosten(kosten.filter((_, i) => i !== index))
  }

  function updateMieter(index: number, field: keyof Mieter, value: string | number) {
    const updated = [...mieter]
    updated[index] = { ...updated[index], [field]: value }
    setMieter(updated)
  }

  function addMieter() {
    setMieter([...mieter, { name: `Wohnung ${mieter.length + 1}`, flaeche: 60, personen: 1 }])
  }

  function removeMieter(index: number) {
    if (mieter.length > 1) {
      setMieter(mieter.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b">
        <div className="w-10 h-10 rounded-xl bg-muted border flex items-center justify-center flex-shrink-0">
          <Receipt className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Nebenkostenabrechnung-Rechner</h1>
          <p className="text-sm text-muted-foreground">Umlegbare und nicht-umlegbare Kosten aufschlüsseln</p>
        </div>
      </div>

      {/* Bento-Grid: Top-Kennzahlen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <BentoMetric
          label="Gesamtkosten"
          value={formatCurrency(result.gesamtKosten)}
          sub="Alle Kostenpositionen"
          color="accent"
        />
        <BentoMetric
          label="Umlegbare Kosten"
          value={formatCurrency(result.umlegbareKosten)}
          sub="Auf Mieter verteilbar"
          color="positive"
        />
        <BentoMetric
          label="Nicht-umlegbar"
          value={formatCurrency(result.nichtUmlegbareKosten)}
          sub="Verbleiben beim Vermieter"
          color="negative"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kostenpositionen */}
        <Card>
          <CardHeader>
            <CardTitle>Kostenpositionen</CardTitle>
            <CardDescription>Jährliche Kosten eintragen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {kosten.map((k, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={k.name}
                  onChange={(e) => updateKosten(i, "name", e.target.value)}
                  className="flex-1"
                  placeholder="Bezeichnung"
                />
                <Input
                  type="number"
                  value={k.betrag}
                  onChange={(e) => updateKosten(i, "betrag", parseFloat(e.target.value) || 0)}
                  className="w-24"
                  placeholder="€"
                />
                <label className="flex items-center gap-1 text-xs whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={k.umlegbar}
                    onChange={(e) => updateKosten(i, "umlegbar", e.target.checked)}
                    className="h-3.5 w-3.5"
                  />
                  Umlegbar
                </label>
                <Button variant="ghost" size="icon-xs" onClick={() => removeKosten(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addKosten} className="gap-1">
              <Plus className="h-3.5 w-3.5" />
              Position
            </Button>
          </CardContent>
        </Card>

        {/* Mieter */}
        <Card>
          <CardHeader>
            <CardTitle>Mieter / Einheiten</CardTitle>
            <CardDescription>Wohnfläche und Personenzahl eintragen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mieter.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={m.name}
                  onChange={(e) => updateMieter(i, "name", e.target.value)}
                  className="flex-1"
                  placeholder="Name/Einheit"
                />
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    value={m.flaeche}
                    onChange={(e) => updateMieter(i, "flaeche", parseFloat(e.target.value) || 0)}
                    className="w-16"
                  />
                  <span className="text-xs text-muted-foreground">m²</span>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    value={m.personen}
                    onChange={(e) => updateMieter(i, "personen", parseInt(e.target.value) || 1)}
                    className="w-14"
                    min={1}
                  />
                  <span className="text-xs text-muted-foreground">Pers.</span>
                </div>
                {mieter.length > 1 && (
                  <Button variant="ghost" size="icon-xs" onClick={() => removeMieter(i)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addMieter} className="gap-1">
              <Plus className="h-3.5 w-3.5" />
              Mieter
            </Button>

            <SelectInput
              id="schluessel"
              label="Verteilerschlüssel"
              value={schluessel}
              onChange={(v) => setSchluessel(v as Verteilerschluessel)}
              options={[
                { value: "flaeche", label: "Nach Wohnfläche (m²)" },
                { value: "personen", label: "Nach Personenzahl" },
                { value: "einheiten", label: "Nach Einheiten (gleich)" },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      {/* Abrechnung pro Mieter — immer sichtbar */}
      <div className="bg-card border rounded-xl p-5">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
          Abrechnung pro Mieter
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Einheit</TableHead>
              <TableHead className="text-right">Anteil</TableHead>
              <TableHead className="text-right">Jährlich</TableHead>
              <TableHead className="text-right">Monatlich</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.abrechnungen.map((a, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {a.anteil.toFixed(1).replace(".", ",")} %
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(a.umlegbarerBetrag)}
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium">
                  {formatCurrency(a.monatlich)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Disclaimer />
    </div>
  )
}
