// Instandhaltungskosten-Rechner — Peterssche Formel

export interface InstandhaltungInput {
  herstellungskostenProQm: number // €/m²
  wohnflaeche: number // m²
  baujahr: number
  petersFaktor: number // Standard: 1.5
}

export interface InstandhaltungResult {
  herstellungskosten: number
  alterGebaeude: number
  jaehrlicheRuecklage: number
  monatlicheRuecklage: number
  ruecklageProQm: number // €/m²/Monat
  empfehlungHinweis: string
}

export function berechneInstandhaltung(
  input: InstandhaltungInput
): InstandhaltungResult {
  const herstellungskosten = input.herstellungskostenProQm * input.wohnflaeche
  const aktuellesJahr = new Date().getFullYear()
  const alterGebaeude = aktuellesJahr - input.baujahr

  // Peterssche Formel:
  // Instandhaltungskosten über 80 Jahre = Herstellungskosten × Faktor (1,5)
  // Jährliche Rücklage = (Herstellungskosten × Faktor) / 80
  const nutzungsdauer = 80
  const jaehrlicheRuecklage =
    (herstellungskosten * input.petersFaktor) / nutzungsdauer
  const monatlicheRuecklage = jaehrlicheRuecklage / 12
  const ruecklageProQm =
    input.wohnflaeche > 0 ? monatlicheRuecklage / input.wohnflaeche : 0

  let empfehlungHinweis: string
  if (alterGebaeude < 20) {
    empfehlungHinweis =
      "Neueres Gebäude — die Rücklage deckt reguläre Instandhaltung ab."
  } else if (alterGebaeude < 40) {
    empfehlungHinweis =
      "Mittleres Alter — erste größere Instandhaltungen (Heizung, Dach) können anstehen."
  } else {
    empfehlungHinweis =
      "Älteres Gebäude — planen Sie zusätzliche Rücklagen für energetische Sanierung ein."
  }

  return {
    herstellungskosten,
    alterGebaeude,
    jaehrlicheRuecklage,
    monatlicheRuecklage,
    ruecklageProQm,
    empfehlungHinweis,
  }
}
