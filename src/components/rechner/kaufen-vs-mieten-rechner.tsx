"use client"

import { useState, useMemo } from "react"
import { Scale } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { CalculatorLayout } from "./calculator-layout"
import { CurrencyInput } from "./currency-input"
import { PercentInput } from "./percent-input"
import { NumberInput } from "./number-input"
import { BentoMetric } from "./result-card"
import { berechneKaufenVsMieten } from "@/lib/rechner/kaufen-vs-mieten"
import { formatCurrency } from "@/lib/rechner"

const TOOLTIP_STYLE = {
  background: "white",
  border: "1px solid #E3E5EB",
  borderRadius: "8px",
  fontSize: "13px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
}

export function KaufenVsMietenRechner() {
  const [kaufpreis, setKaufpreis] = useState(350000)
  const [kaufnebenkosten, setKaufnebenkosten] = useState(12)
  const [eigenkapital, setEigenkapital] = useState(80000)
  const [zinssatz, setZinssatz] = useState(3.5)
  const [tilgung, setTilgung] = useState(2)
  const [monatlicheKaltmiete, setMonatlicheKaltmiete] = useState(1200)
  const [mietsteigerung, setMietsteigerung] = useState(2)
  const [wertsteigerung, setWertsteigerung] = useState(1.5)
  const [instandhaltung, setInstandhaltung] = useState(1)
  const [zeitraumJahre, setZeitraumJahre] = useState(25)

  // Live-Berechnung — aktualisiert sich sofort bei jeder Eingabe
  const result = useMemo(
    () =>
      berechneKaufenVsMieten({
        kaufpreis,
        kaufnebenkosten,
        eigenkapital,
        zinssatz,
        tilgung,
        monatlicheKaltmiete,
        mietsteigerung,
        wertsteigerung,
        instandhaltung,
        zeitraumJahre,
      }),
    [kaufpreis, kaufnebenkosten, eigenkapital, zinssatz, tilgung, monatlicheKaltmiete, mietsteigerung, wertsteigerung, instandhaltung, zeitraumJahre]
  )

  const kaufBesser = result.vermoegenKauf > result.vermoegenMiete
  const differenzColor = kaufBesser ? "green" as const : "red" as const
  const differenzBetrag = Math.abs(result.vermoegenKauf - result.vermoegenMiete)

  return (
    <CalculatorLayout
      title="Kaufen vs. Mieten"
      description="Vergleichen Sie Kaufen und Mieten über einen beliebigen Zeitraum"
      icon={Scale}
      hasResults={true}
      inputs={
        <>
          <CurrencyInput
            id="kaufpreis"
            label="Kaufpreis"
            value={kaufpreis}
            onChange={setKaufpreis}
            hint="Gesamtkaufpreis der Immobilie"
          />
          <PercentInput
            id="kaufnebenkosten"
            label="Kaufnebenkosten"
            value={kaufnebenkosten}
            onChange={setKaufnebenkosten}
            hint="Grunderwerbsteuer, Notar, Makler"
          />
          <CurrencyInput
            id="eigenkapital"
            label="Eigenkapital"
            value={eigenkapital}
            onChange={setEigenkapital}
          />
          <PercentInput
            id="zinssatz"
            label="Sollzinssatz"
            value={zinssatz}
            onChange={setZinssatz}
            step={0.1}
          />
          <PercentInput
            id="tilgung"
            label="Anfängliche Tilgung"
            value={tilgung}
            onChange={setTilgung}
            step={0.1}
          />
          <CurrencyInput
            id="kaltmiete"
            label="Monatliche Kaltmiete"
            value={monatlicheKaltmiete}
            onChange={setMonatlicheKaltmiete}
          />
          <PercentInput
            id="mietsteigerung"
            label="Jährliche Mietsteigerung"
            value={mietsteigerung}
            onChange={setMietsteigerung}
            step={0.1}
          />
          <PercentInput
            id="wertsteigerung"
            label="Jährliche Wertsteigerung"
            value={wertsteigerung}
            onChange={setWertsteigerung}
            step={0.1}
            hint="Immobilienwert-Steigerung pro Jahr"
          />
          <PercentInput
            id="instandhaltung"
            label="Instandhaltung"
            value={instandhaltung}
            onChange={setInstandhaltung}
            step={0.1}
            hint="Jährlich in % vom Kaufpreis"
          />
          <NumberInput
            id="zeitraum"
            label="Betrachtungszeitraum"
            value={zeitraumJahre}
            onChange={setZeitraumJahre}
            suffix="Jahre"
            min={1}
            max={50}
            step={1}
          />
        </>
      }
      results={
        <>
          {/* Top-Bento: 3 Spalten */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoMetric
              label="Vermögen Kauf"
              value={formatCurrency(result.vermoegenKauf)}
              sub="Immobilienwert − Restschuld"
              color="blue"
            />
            <BentoMetric
              label="Vermögen Miete"
              value={formatCurrency(result.vermoegenMiete)}
              sub="Eigenkapital + angelegte Ersparnis"
              color="amber"
            />
            <BentoMetric
              label="Differenz"
              value={`${kaufBesser ? "+" : "−"} ${formatCurrency(differenzBetrag)}`}
              sub={kaufBesser ? "Kauf ist günstiger" : "Miete ist günstiger"}
              color={differenzColor}
            />
          </div>

          {/* Chart: Kumulierte Kosten Kauf vs Miete */}
          <div className="bg-card border rounded-xl p-5">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Kumulierte Kosten im Vergleich
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={result.jahresvergleich}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E3E5EB" />
                <XAxis
                  dataKey="jahr"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v: number) => `${v}. Jahr`}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                  width={55}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any, name: any) => [
                    formatCurrency(Number(value)),
                    name === "kumuliertKauf" ? "Kauf" : "Miete",
                  ]}
                  labelFormatter={(label) => `${label}. Jahr`}
                />
                <Legend
                  formatter={(value: string) =>
                    value === "kumuliertKauf" ? "Kauf (kumuliert)" : "Miete (kumuliert)"
                  }
                />
                <Area
                  type="monotone"
                  dataKey="kumuliertKauf"
                  stroke="#4338CA"
                  fill="#4338CA"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="kumuliertMiete"
                  stroke="#059669"
                  fill="#059669"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Detail-Bento: 2 Spalten */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BentoMetric
              label="Immobilienwert Ende"
              value={formatCurrency(result.immobilienwertEnde)}
              sub={`Nach ${zeitraumJahre} Jahren mit ${wertsteigerung.toFixed(1).replace(".", ",")}% p.a.`}
              color="blue"
            />
            <BentoMetric
              label="Restschuld"
              value={formatCurrency(result.restschuld)}
              sub={result.restschuld === 0 ? "Vollständig getilgt" : "Noch offen nach Zeitraum"}
              color={result.restschuld === 0 ? "green" : "red"}
            />
            <BentoMetric
              label="Gesamtkosten Kauf"
              value={formatCurrency(result.gesamtkostenKauf)}
              sub="Zinsen + Tilgung + Instandhaltung + Nebenkosten"
              color="amber"
            />
            <BentoMetric
              label="Gesamtkosten Miete"
              value={formatCurrency(result.gesamtkostenMiete)}
              sub={`Miete über ${zeitraumJahre} Jahre (inkl. Steigerung)`}
              color="amber"
            />
            {result.kaufLohntAbJahr !== null && (
              <BentoMetric
                label="Kauf lohnt sich ab"
                value={`Jahr ${result.kaufLohntAbJahr}`}
                sub="Ab diesem Jahr übersteigt das Kauf-Vermögen das Miet-Vermögen"
                color="green"
                className="sm:col-span-2"
              />
            )}
          </div>
        </>
      }
    />
  )
}
