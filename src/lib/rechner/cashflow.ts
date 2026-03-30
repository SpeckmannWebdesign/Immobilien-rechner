// Cashflow-Rechner — Mieteinnahmen vs. alle Kosten

export interface CashflowInput {
  monatlicheKaltmiete: number
  hausgeld: number // monatlich (Verwalter)
  nichtUmlegbareNebenkosten: number // monatlich
  monatlicheKreditrate: number
  instandhaltungsRuecklage: number // monatlich
  mietausfallRisiko: number // Prozent
}

export interface CashflowResult {
  bruttoMieteinnahmen: number // monatlich
  mietausfallAbzug: number // monatlich
  nettoMieteinnahmen: number // monatlich
  gesamtKosten: number // monatlich
  monatsCashflow: number
  jahresCashflow: number
  cashflowStatus: "positiv" | "knapp" | "negativ"
}

export function berechneCashflow(input: CashflowInput): CashflowResult {
  const mietausfallAbzug =
    input.monatlicheKaltmiete * (input.mietausfallRisiko / 100)
  const nettoMieteinnahmen = input.monatlicheKaltmiete - mietausfallAbzug

  const gesamtKosten =
    input.hausgeld +
    input.nichtUmlegbareNebenkosten +
    input.monatlicheKreditrate +
    input.instandhaltungsRuecklage

  const monatsCashflow = nettoMieteinnahmen - gesamtKosten
  const jahresCashflow = monatsCashflow * 12

  let cashflowStatus: "positiv" | "knapp" | "negativ"
  if (monatsCashflow > 50) {
    cashflowStatus = "positiv"
  } else if (monatsCashflow >= -50) {
    cashflowStatus = "knapp"
  } else {
    cashflowStatus = "negativ"
  }

  return {
    bruttoMieteinnahmen: input.monatlicheKaltmiete,
    mietausfallAbzug,
    nettoMieteinnahmen,
    gesamtKosten,
    monatsCashflow,
    jahresCashflow,
    cashflowStatus,
  }
}
