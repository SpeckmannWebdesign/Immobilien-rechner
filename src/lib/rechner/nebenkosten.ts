// Nebenkostenabrechnung-Rechner — Umlegbare/nicht-umlegbare Kosten, Verteilerschlüssel

export type Verteilerschluessel = "flaeche" | "personen" | "einheiten"

export interface Kostenposition {
  name: string
  betrag: number
  umlegbar: boolean
}

export interface Mieter {
  name: string
  flaeche: number // m²
  personen: number
}

export interface NebenkostenInput {
  kostenpositionen: Kostenposition[]
  mieter: Mieter[]
  verteilerschluessel: Verteilerschluessel
  abrechnungszeitraum: string // z.B. "2025"
}

export interface MieterAbrechnung {
  name: string
  anteil: number // Prozent
  umlegbarerBetrag: number
  monatlich: number
}

export interface NebenkostenResult {
  gesamtKosten: number
  umlegbareKosten: number
  nichtUmlegbareKosten: number
  abrechnungen: MieterAbrechnung[]
}

export function berechneNebenkosten(
  input: NebenkostenInput
): NebenkostenResult {
  const gesamtKosten = input.kostenpositionen.reduce(
    (sum, k) => sum + k.betrag,
    0
  )
  const umlegbareKosten = input.kostenpositionen
    .filter((k) => k.umlegbar)
    .reduce((sum, k) => sum + k.betrag, 0)
  const nichtUmlegbareKosten = gesamtKosten - umlegbareKosten

  // Gesamtwert für Verteilerschlüssel
  let gesamtVerteilung: number
  switch (input.verteilerschluessel) {
    case "flaeche":
      gesamtVerteilung = input.mieter.reduce((sum, m) => sum + m.flaeche, 0)
      break
    case "personen":
      gesamtVerteilung = input.mieter.reduce((sum, m) => sum + m.personen, 0)
      break
    case "einheiten":
      gesamtVerteilung = input.mieter.length
      break
  }

  const abrechnungen: MieterAbrechnung[] = input.mieter.map((mieter) => {
    let mieterWert: number
    switch (input.verteilerschluessel) {
      case "flaeche":
        mieterWert = mieter.flaeche
        break
      case "personen":
        mieterWert = mieter.personen
        break
      case "einheiten":
        mieterWert = 1
        break
    }

    const anteil =
      gesamtVerteilung > 0 ? (mieterWert / gesamtVerteilung) * 100 : 0
    const umlegbarerBetrag = umlegbareKosten * (anteil / 100)

    return {
      name: mieter.name,
      anteil,
      umlegbarerBetrag,
      monatlich: umlegbarerBetrag / 12,
    }
  })

  return {
    gesamtKosten,
    umlegbareKosten,
    nichtUmlegbareKosten,
    abrechnungen,
  }
}
