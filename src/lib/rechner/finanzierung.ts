// Finanzierungsrechner — Annuitätendarlehen, Tilgungsplan, Sondertilgung

export interface FinanzierungInput {
  darlehenssumme: number
  sollzinsSatz: number // % p.a.
  anfangsTilgung: number // % p.a.
  zinsbindung: number // Jahre
  sondertilgungJahr: number // € pro Jahr
}

export interface TilgungsplanZeile {
  jahr: number
  restschuldAnfang: number
  zinsanteil: number
  tilgungsanteil: number
  sondertilgung: number
  gesamtRate: number
  restschuldEnde: number
}

export interface FinanzierungResult {
  monatlicheRate: number
  jahresRate: number
  zinsKostenZinsbindung: number
  getilgterBetrag: number
  restschuldNachZinsbindung: number
  gesamtlaufzeit: number // Jahre bis Volltilgung
  tilgungsplan: TilgungsplanZeile[]
}

export function berechneFinanzierung(
  input: FinanzierungInput
): FinanzierungResult {
  const zinsSatzMonat = input.sollzinsSatz / 100 / 12
  const annuitaetSatz = (input.sollzinsSatz + input.anfangsTilgung) / 100
  const jahresRate = input.darlehenssumme * annuitaetSatz
  const monatlicheRate = jahresRate / 12

  const tilgungsplan: TilgungsplanZeile[] = []
  let restschuld = input.darlehenssumme
  let gesamtZinsen = 0
  let gesamtTilgung = 0
  let laufzeit = 0

  // Tilgungsplan berechnen (maximal 50 Jahre)
  for (let jahr = 1; jahr <= 50 && restschuld > 0; jahr++) {
    const zinsanteil = restschuld * (input.sollzinsSatz / 100)
    let tilgungsanteil = jahresRate - zinsanteil
    const sondertilgung = Math.min(
      input.sondertilgungJahr,
      restschuld - tilgungsanteil
    )

    // Sicherstellen, dass wir nicht mehr tilgen als die Restschuld
    if (tilgungsanteil + sondertilgung > restschuld) {
      tilgungsanteil = restschuld
    }

    const gesamtRateJahr = zinsanteil + tilgungsanteil + sondertilgung
    const restschuldEnde = Math.max(
      0,
      restschuld - tilgungsanteil - sondertilgung
    )

    tilgungsplan.push({
      jahr,
      restschuldAnfang: restschuld,
      zinsanteil,
      tilgungsanteil,
      sondertilgung: Math.max(0, sondertilgung),
      gesamtRate: gesamtRateJahr,
      restschuldEnde,
    })

    if (jahr <= input.zinsbindung) {
      gesamtZinsen += zinsanteil
      gesamtTilgung += tilgungsanteil + Math.max(0, sondertilgung)
    }

    restschuld = restschuldEnde
    laufzeit = jahr

    if (restschuld <= 0) break
  }

  const restschuldNachZinsbindung =
    tilgungsplan.find((z) => z.jahr === input.zinsbindung)?.restschuldEnde ??
    restschuld

  return {
    monatlicheRate,
    jahresRate,
    zinsKostenZinsbindung: gesamtZinsen,
    getilgterBetrag: gesamtTilgung,
    restschuldNachZinsbindung,
    gesamtlaufzeit: laufzeit,
    tilgungsplan,
  }
}
