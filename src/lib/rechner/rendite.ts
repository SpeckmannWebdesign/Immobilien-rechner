// Rendite-Rechner — Brutto-/Nettomietrendite, Eigenkapitalrendite

export interface RenditeInput {
  kaufpreis: number
  monatlicheKaltmiete: number
  kaufnebenkosten: number // in Euro
  eigenkapital: number
  bewirtschaftungskosten: number // jährlich, nicht-umlegbar
}

export interface RenditeResult {
  jahresKaltmiete: number
  bruttoMietrendite: number
  nettoMietrendite: number
  eigenkapitalRendite: number
  gesamtinvestition: number
  darlehen: number
}

export function berechneRendite(input: RenditeInput): RenditeResult {
  const jahresKaltmiete = input.monatlicheKaltmiete * 12
  const gesamtinvestition = input.kaufpreis + input.kaufnebenkosten
  const darlehen = gesamtinvestition - input.eigenkapital

  // Bruttomietrendite = Jahresmiete / Kaufpreis × 100
  const bruttoMietrendite =
    input.kaufpreis > 0 ? (jahresKaltmiete / input.kaufpreis) * 100 : 0

  // Nettomietrendite = (Jahresmiete - Bewirtschaftungskosten) / Gesamtinvestition × 100
  const nettoMietrendite =
    gesamtinvestition > 0
      ? ((jahresKaltmiete - input.bewirtschaftungskosten) / gesamtinvestition) *
        100
      : 0

  // Eigenkapitalrendite = Jahresüberschuss / Eigenkapital × 100
  // Vereinfacht: (Jahresmiete - Bewirtschaftungskosten) / Eigenkapital
  const eigenkapitalRendite =
    input.eigenkapital > 0
      ? ((jahresKaltmiete - input.bewirtschaftungskosten) /
          input.eigenkapital) *
        100
      : 0

  return {
    jahresKaltmiete,
    bruttoMietrendite,
    nettoMietrendite,
    eigenkapitalRendite,
    gesamtinvestition,
    darlehen,
  }
}
