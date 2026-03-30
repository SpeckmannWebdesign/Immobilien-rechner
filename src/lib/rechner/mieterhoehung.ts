// Mieterhöhungs-Rechner — Kappungsgrenze, Vergleichsmiete, frühester Zeitpunkt

export interface MieterhoehungInput {
  aktuelleKaltmiete: number // monatlich
  vergleichsmiete: number // ortsübliche Vergleichsmiete pro m²
  wohnflaeche: number // m²
  letzteMieterhoehung: string // Datum (ISO-String)
  angespannterMarkt: boolean // Kappungsgrenze 15% statt 20%
}

export interface MieterhoehungResult {
  ortsueblicheMonatsmiete: number
  maximalMiete: number // nach Kappungsgrenze
  maximaleErhoehung: number // Differenz
  kappungsgrenzeProzent: number
  kappungsgrenzeAbsolut: number
  fruehesterZeitpunkt: Date
  erhoehungMoeglich: boolean
  erhoehungsBetrag: number // tatsächlich mögliche Erhöhung
  neueMiete: number
  hinweis: string
}

export function berechneMieterhoehung(
  input: MieterhoehungInput
): MieterhoehungResult {
  const ortsueblicheMonatsmiete = input.vergleichsmiete * input.wohnflaeche

  // Kappungsgrenze
  const kappungsgrenzeProzent = input.angespannterMarkt ? 15 : 20
  const kappungsgrenzeAbsolut =
    input.aktuelleKaltmiete * (kappungsgrenzeProzent / 100)

  // Max. Miete nach Kappungsgrenze
  const maxNachKappung = input.aktuelleKaltmiete + kappungsgrenzeAbsolut

  // Tatsächliche Obergrenze: Minimum aus Vergleichsmiete und Kappungsgrenze
  const maximalMiete = Math.min(ortsueblicheMonatsmiete, maxNachKappung)
  const maximaleErhoehung = Math.max(0, maximalMiete - input.aktuelleKaltmiete)

  // Frühester Zeitpunkt: 15 Monate nach letzter Erhöhung
  const letzteErhoehung = new Date(input.letzteMieterhoehung)
  const fruehesterZeitpunkt = new Date(letzteErhoehung)
  fruehesterZeitpunkt.setMonth(fruehesterZeitpunkt.getMonth() + 15)

  const erhoehungMoeglich = new Date() >= fruehesterZeitpunkt && maximaleErhoehung > 0

  // Tatsächliche Erhöhung (begrenzt durch beide Grenzen)
  const erhoehungsBetrag = maximaleErhoehung
  const neueMiete = input.aktuelleKaltmiete + erhoehungsBetrag

  let hinweis: string
  if (!erhoehungMoeglich && new Date() < fruehesterZeitpunkt) {
    hinweis = `Eine Mieterhöhung ist frühestens am ${fruehesterZeitpunkt.toLocaleDateString("de-DE")} möglich (15 Monate nach letzter Erhöhung).`
  } else if (maximaleErhoehung <= 0) {
    hinweis =
      "Die aktuelle Miete liegt bereits auf oder über der ortsüblichen Vergleichsmiete."
  } else if (maxNachKappung < ortsueblicheMonatsmiete) {
    hinweis = `Die Erhöhung ist durch die ${kappungsgrenzeProzent}%-Kappungsgrenze begrenzt. Die Vergleichsmiete liegt höher.`
  } else {
    hinweis =
      "Die Erhöhung ist durch die ortsübliche Vergleichsmiete begrenzt."
  }

  return {
    ortsueblicheMonatsmiete,
    maximalMiete,
    maximaleErhoehung,
    kappungsgrenzeProzent,
    kappungsgrenzeAbsolut,
    fruehesterZeitpunkt,
    erhoehungMoeglich,
    erhoehungsBetrag,
    neueMiete,
    hinweis,
  }
}
