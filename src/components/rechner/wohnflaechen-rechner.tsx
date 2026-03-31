"use client"

import { useState, useMemo } from "react"
import { Plus, Trash2, Ruler } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Disclaimer } from "./disclaimer"
import { BentoMetric } from "./result-card"
import { berechneWohnflaeche, type Raum } from "@/lib/rechner/wohnflaeche"

const TYP_LABELS: Record<Raum["typ"], string> = {
  normal: "Normal (100 %)",
  dachschraege_1_2: "Dachschräge 1–2 m (50 %)",
  dachschraege_unter_1: "Dachschräge < 1 m (0 %)",
  balkon: "Balkon (25 %)",
  terrasse: "Terrasse (25 %)",
  keller: "Keller (0 %)",
  wintergarten_unbeheizt: "Wintergarten unbeheizt (50 %)",
}

const DEFAULT_RAEUME: Raum[] = [
  { name: "Wohnzimmer", flaeche: 25, typ: "normal" },
  { name: "Schlafzimmer", flaeche: 16, typ: "normal" },
  { name: "Balkon", flaeche: 8, typ: "balkon" },
]

export function WohnflaechenRechner() {
  const [raeume, setRaeume] = useState<Raum[]>(DEFAULT_RAEUME)

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () => berechneWohnflaeche({ raeume }),
    [raeume]
  )

  function updateRaum(index: number, field: keyof Raum, value: string | number) {
    const updated = [...raeume]
    updated[index] = { ...updated[index], [field]: value }
    setRaeume(updated)
  }

  function addRaum() {
    setRaeume([...raeume, { name: `Raum ${raeume.length + 1}`, flaeche: 10, typ: "normal" }])
  }

  function removeRaum(index: number) {
    if (raeume.length > 1) {
      setRaeume(raeume.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b">
        <div className="w-10 h-10 rounded-xl bg-muted border flex items-center justify-center flex-shrink-0">
          <Ruler className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Wohnflächen-Rechner</h1>
          <p className="text-sm text-muted-foreground">Anrechenbare Wohnfläche nach WoFlV berechnen</p>
        </div>
      </div>

      {/* Bento-Grid: Top-Kennzahlen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <BentoMetric
          label="Anrechenbare Wohnfläche"
          value={`${result.anrechenbare.toFixed(2).replace(".", ",")} m²`}
          sub="Nach WoFlV"
          color="blue"
        />
        <BentoMetric
          label="Grundfläche gesamt"
          value={`${result.gesamtflaeche.toFixed(2).replace(".", ",")} m²`}
          sub="Summe aller Räume"
        />
        <BentoMetric
          label="Nicht anrechenbar"
          value={`${result.nichtAnrechenbare.toFixed(2).replace(".", ",")} m²`}
          sub="Abzüge nach WoFlV"
          color="red"
        />
      </div>

      {/* Raum-Eingaben */}
      <div className="bg-card border rounded-2xl p-6">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-5">
          Räume
        </h2>
        <div className="space-y-3">
          {raeume.map((raum, i) => (
            <div key={i} className="grid grid-cols-[1fr_80px_1fr_auto] items-end gap-2">
              <div className="space-y-1.5">
                {i === 0 && <Label className="text-xs">Bezeichnung</Label>}
                <Input
                  value={raum.name}
                  onChange={(e) => updateRaum(i, "name", e.target.value)}
                  placeholder="Raumname"
                />
              </div>
              <div className="space-y-1.5">
                {i === 0 && <Label className="text-xs">m²</Label>}
                <Input
                  type="number"
                  value={raum.flaeche}
                  onChange={(e) => updateRaum(i, "flaeche", parseFloat(e.target.value) || 0)}
                  min={0}
                  step={0.5}
                />
              </div>
              <div className="space-y-1.5">
                {i === 0 && <Label className="text-xs">Raumtyp</Label>}
                <Select
                  value={raum.typ}
                  onValueChange={(v) => { if (v) updateRaum(i, "typ", v) }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYP_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                {raeume.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => removeRaum(i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addRaum} className="gap-1 mt-2">
            <Plus className="h-3.5 w-3.5" />
            Raum hinzufügen
          </Button>
        </div>
      </div>

      {/* Detail-Tabelle */}
      <div className="bg-card border rounded-xl p-5">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
          Berechnung im Detail
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Raum</TableHead>
              <TableHead className="text-right">Grundfläche</TableHead>
              <TableHead className="text-right">Faktor</TableHead>
              <TableHead className="text-right">Anrechenbar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.details.map((d, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{d.name}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {d.grundflaeche.toFixed(2).replace(".", ",")} m²
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {(d.faktor * 100).toFixed(0)} %
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium">
                  {d.anrechenbar.toFixed(2).replace(".", ",")} m²
                </TableCell>
              </TableRow>
            ))}
            {/* Summenzeile */}
            <TableRow className="border-t-2 font-semibold">
              <TableCell>Gesamt</TableCell>
              <TableCell className="text-right tabular-nums">
                {result.gesamtflaeche.toFixed(2).replace(".", ",")} m²
              </TableCell>
              <TableCell />
              <TableCell className="text-right tabular-nums">
                {result.anrechenbare.toFixed(2).replace(".", ",")} m²
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Disclaimer />
    </div>
  )
}
