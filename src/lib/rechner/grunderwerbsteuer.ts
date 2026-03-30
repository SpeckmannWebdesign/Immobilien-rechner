// Grunderwerbsteuer-Rechner — Alle Bundesländer vergleichen

export interface GrunderwerbsteuerInput {
  kaufpreis: number
  bundesland: string
}

export interface BundeslandSteuer {
  bundesland: string
  satz: number
  betrag: number
}

export interface GrunderwerbsteuerResult {
  gewaehltesSteuer: BundeslandSteuer
  alleBundeslaender: BundeslandSteuer[]
  guenstigstes: BundeslandSteuer
  teuerstes: BundeslandSteuer
  differenz: number
}

export function berechneGrunderwerbsteuer(
  kaufpreis: number,
  saetze: { bundesland: string; rate: number }[],
  gewaehltesBundesland?: string
): GrunderwerbsteuerResult {
  const alleBundeslaender: BundeslandSteuer[] = saetze.map((s) => ({
    bundesland: s.bundesland,
    satz: s.rate,
    betrag: kaufpreis * (s.rate / 100),
  }))

  const sortiert = [...alleBundeslaender].sort((a, b) => a.betrag - b.betrag)
  const guenstigstes = sortiert[0]
  const teuerstes = sortiert[sortiert.length - 1]
  const differenz = teuerstes.betrag - guenstigstes.betrag

  const gewaehltesSteuer =
    alleBundeslaender.find((b) => b.bundesland === gewaehltesBundesland) ??
    alleBundeslaender[0]

  return {
    gewaehltesSteuer,
    alleBundeslaender,
    guenstigstes,
    teuerstes,
    differenz,
  }
}
