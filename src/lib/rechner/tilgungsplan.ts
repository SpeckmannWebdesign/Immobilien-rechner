// Tilgungsplan-Generator — Nutzt die Finanzierungsberechnung und generiert Detailplan

import {
  berechneFinanzierung,
  type FinanzierungInput,
  type TilgungsplanZeile,
} from "./finanzierung"

export interface TilgungsplanResult {
  monatlicheRate: number
  gesamtZinsen: number
  gesamtTilgung: number
  gesamtSondertilgung: number
  gesamtKosten: number
  laufzeit: number
  tilgungsplan: TilgungsplanZeile[]
}

export function berechneTilgungsplan(
  input: FinanzierungInput
): TilgungsplanResult {
  const finanzierung = berechneFinanzierung(input)

  const gesamtZinsen = finanzierung.tilgungsplan.reduce(
    (sum, z) => sum + z.zinsanteil,
    0
  )
  const gesamtTilgung = finanzierung.tilgungsplan.reduce(
    (sum, z) => sum + z.tilgungsanteil,
    0
  )
  const gesamtSondertilgung = finanzierung.tilgungsplan.reduce(
    (sum, z) => sum + z.sondertilgung,
    0
  )

  return {
    monatlicheRate: finanzierung.monatlicheRate,
    gesamtZinsen,
    gesamtTilgung,
    gesamtSondertilgung,
    gesamtKosten: gesamtZinsen + gesamtTilgung + gesamtSondertilgung,
    laufzeit: finanzierung.gesamtlaufzeit,
    tilgungsplan: finanzierung.tilgungsplan,
  }
}
