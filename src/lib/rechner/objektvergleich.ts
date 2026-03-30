// Objektvergleich — Bis zu 3 Immobilien nebeneinander vergleichen

export interface ObjektInput {
  name: string
  kaufpreis: number
  monatlicheKaltmiete: number
  kaufnebenkostenProzent: number
  eigenkapital: number
  sollzinsSatz: number
  anfangsTilgung: number
}

export interface ObjektResult {
  name: string
  gesamtinvestition: number
  bruttoRendite: number
  nettoRendite: number
  monatlicheRate: number
  monatsCashflow: number
  eigenkapitalRendite: number
  isBest: {
    rendite: boolean
    cashflow: boolean
  }
}

export function berechneObjektvergleich(
  objekte: ObjektInput[]
): ObjektResult[] {
  const results: ObjektResult[] = objekte.map((obj) => {
    const kaufnebenkosten = obj.kaufpreis * (obj.kaufnebenkostenProzent / 100)
    const gesamtinvestition = obj.kaufpreis + kaufnebenkosten
    const jahresmiete = obj.monatlicheKaltmiete * 12
    const darlehen = gesamtinvestition - obj.eigenkapital

    const bruttoRendite =
      obj.kaufpreis > 0 ? (jahresmiete / obj.kaufpreis) * 100 : 0
    const nettoRendite =
      gesamtinvestition > 0 ? (jahresmiete / gesamtinvestition) * 100 : 0

    const annuitaetSatz = (obj.sollzinsSatz + obj.anfangsTilgung) / 100
    const monatlicheRate = (darlehen * annuitaetSatz) / 12
    const monatsCashflow = obj.monatlicheKaltmiete - monatlicheRate

    const eigenkapitalRendite =
      obj.eigenkapital > 0
        ? ((jahresmiete - monatlicheRate * 12) / obj.eigenkapital) * 100
        : 0

    return {
      name: obj.name,
      gesamtinvestition,
      bruttoRendite,
      nettoRendite,
      monatlicheRate,
      monatsCashflow,
      eigenkapitalRendite,
      isBest: { rendite: false, cashflow: false },
    }
  })

  // Bestes Objekt markieren
  if (results.length > 1) {
    const bestRendite = results.reduce((a, b) =>
      a.bruttoRendite > b.bruttoRendite ? a : b
    )
    const bestCashflow = results.reduce((a, b) =>
      a.monatsCashflow > b.monatsCashflow ? a : b
    )
    bestRendite.isBest.rendite = true
    bestCashflow.isBest.cashflow = true
  }

  return results
}
