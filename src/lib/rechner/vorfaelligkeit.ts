// Vorfälligkeitsentschädigung — vereinfachte Aktiv-Passiv-Methode

export interface VorfaelligkeitInput {
  restschuld: number              // Aktuelle Restschuld
  zinssatz: number                // Vertragszinssatz in %
  restlaufzeitMonate: number     // Verbleibende Zinsbindung in Monaten
  aktuellerMarktzins: number     // Aktueller Marktzins für vergleichbare Laufzeit in %
  monatlicheRate: number         // Aktuelle monatliche Rate
  sondertilgungRecht: number     // Jährliches Sondertilgungsrecht in % (0-10)
}

export interface VorfaelligkeitResult {
  vorfaelligkeitsentschaedigung: number  // Berechnete VFE
  zinsmargenschaden: number              // Zinsmargen-Schaden (Hauptkomponente)
  zinsverschlechterungsschaden: number   // Zins-Verschlechterungsschaden
  bearbeitungsgebuehr: number            // Pauschal 300 €
  ersparnisOhneSondertilgung: number     // VFE ohne Abzug Sondertilgung
  eingesparter: number                   // Ersparnis durch Sondertilgungsrecht
  restlaufzeitJahre: number             // Restlaufzeit in Jahren
}

export function berechneVorfaelligkeit(input: VorfaelligkeitInput): VorfaelligkeitResult {
  const {
    restschuld,
    zinssatz,
    restlaufzeitMonate,
    aktuellerMarktzins,
    sondertilgungRecht,
  } = input

  const restlaufzeitJahre = restlaufzeitMonate / 12
  const bearbeitungsgebuehr = 300

  // Zinsmargenschaden: Differenz zwischen Vertragszins und Marktzins auf die Restschuld
  const zinsdifferenz = zinssatz - aktuellerMarktzins
  const zinsmargenschaden =
    zinsdifferenz > 0
      ? restschuld * (zinsdifferenz / 100) * restlaufzeitJahre
      : 0

  // Sondertilgung-Abzug: Jedes Jahr reduziert sich die Restschuld um den Sondertilgungsprozentsatz
  // Das verringert den Schaden, da die Bank mit geringerer Restschuld hätte rechnen müssen
  let eingesparter = 0
  if (sondertilgungRecht > 0 && zinsdifferenz > 0) {
    let verbleibendeSchuld = restschuld
    const volleJahre = Math.floor(restlaufzeitJahre)
    const restMonate = restlaufzeitMonate - volleJahre * 12

    for (let jahr = 0; jahr < volleJahre; jahr++) {
      const sondertilgung = verbleibendeSchuld * (sondertilgungRecht / 100)
      // Der eingesparte Schaden pro Jahr: Sondertilgungsbetrag × Zinsdifferenz × verbleibende Jahre
      const verbleibendeJahre = restlaufzeitJahre - (jahr + 1)
      eingesparter += sondertilgung * (zinsdifferenz / 100) * verbleibendeJahre
      verbleibendeSchuld -= sondertilgung
    }

    // Anteiliges letztes Jahr
    if (restMonate > 0) {
      const sondertilgung = verbleibendeSchuld * (sondertilgungRecht / 100) * (restMonate / 12)
      eingesparter += sondertilgung * (zinsdifferenz / 100) * 0 // Kein verbleibender Zeitraum
    }
  }

  // VFE ohne Sondertilgungs-Abzug
  const ersparnisOhneSondertilgung = Math.max(0, zinsmargenschaden + bearbeitungsgebuehr)

  // Gesamt-VFE
  const vorfaelligkeitsentschaedigung = Math.max(
    0,
    zinsmargenschaden - eingesparter + bearbeitungsgebuehr
  )

  return {
    vorfaelligkeitsentschaedigung,
    zinsmargenschaden,
    zinsverschlechterungsschaden: 0, // Bei vereinfachter Methode nicht separat berechnet
    bearbeitungsgebuehr,
    ersparnisOhneSondertilgung,
    eingesparter,
    restlaufzeitJahre,
  }
}
