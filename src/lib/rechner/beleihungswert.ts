// Beleihungswert-Rechner — Beleihungswert, max. Darlehen, Finanzierungslücke

export interface BeleihungswertInput {
  verkehrswert: number       // Marktwert/Kaufpreis der Immobilie
  beleihungsabschlag: number // Sicherheitsabschlag in % (typisch 10-20%)
  beleihungsauslauf: number  // Beleihungsauslauf in % (typisch 60-80%)
  eigenkapital: number       // Vorhandenes Eigenkapital
  kaufnebenkosten: number    // Kaufnebenkosten in % (nicht beleihbar)
}

export interface BeleihungswertResult {
  beleihungswert: number          // Verkehrswert × (1 - Abschlag/100)
  maxDarlehen: number             // Beleihungswert × Beleihungsauslauf/100
  beleihungsquote: number         // maxDarlehen / Verkehrswert × 100
  eigenkapitalBedarf: number      // Kaufpreis + Nebenkosten - maxDarlehen
  eigenkapitalAusreichend: boolean // eigenkapital >= eigenkapitalBedarf
  finanzierungsluecke: number     // eigenkapitalBedarf - eigenkapital (falls > 0)
  gesamtkosten: number            // Verkehrswert + Nebenkosten
  nebenkosten: number             // Verkehrswert × kaufnebenkosten/100
}

export function berechneBeleihungswert(input: BeleihungswertInput): BeleihungswertResult {
  const nebenkosten = input.verkehrswert * (input.kaufnebenkosten / 100)
  const gesamtkosten = input.verkehrswert + nebenkosten

  // Beleihungswert = Verkehrswert abzüglich Sicherheitsabschlag
  const beleihungswert = input.verkehrswert * (1 - input.beleihungsabschlag / 100)

  // Maximales Darlehen = Beleihungswert × Beleihungsauslauf
  const maxDarlehen = beleihungswert * (input.beleihungsauslauf / 100)

  // Beleihungsquote = max. Darlehen im Verhältnis zum Verkehrswert
  const beleihungsquote = input.verkehrswert > 0
    ? (maxDarlehen / input.verkehrswert) * 100
    : 0

  // Eigenkapitalbedarf = Gesamtkosten minus max. Darlehen
  const eigenkapitalBedarf = Math.max(0, gesamtkosten - maxDarlehen)

  const eigenkapitalAusreichend = input.eigenkapital >= eigenkapitalBedarf
  const finanzierungsluecke = Math.max(0, eigenkapitalBedarf - input.eigenkapital)

  return {
    beleihungswert,
    maxDarlehen,
    beleihungsquote,
    eigenkapitalBedarf,
    eigenkapitalAusreichend,
    finanzierungsluecke,
    gesamtkosten,
    nebenkosten,
  }
}
