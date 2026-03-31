// Kaufen vs. Mieten Vergleichsrechner

export interface KaufenVsMietenInput {
  kaufpreis: number           // Immobilienpreis
  kaufnebenkosten: number     // in Prozent (z.B. 12)
  eigenkapital: number        // Eigenkapital in Euro
  zinssatz: number            // Hypothekenzins in %
  tilgung: number             // Anfängliche Tilgung in %
  monatlicheKaltmiete: number // Aktuelle Kaltmiete
  mietsteigerung: number      // Jährliche Mietsteigerung in %
  wertsteigerung: number      // Jährliche Immobilienwert-Steigerung in %
  instandhaltung: number      // Jährliche Instandhaltung in % vom Kaufpreis
  zeitraumJahre: number       // Betrachtungszeitraum
}

export interface KaufenVsMietenResult {
  gesamtkostenKauf: number        // Summe aller Kosten Kauf über Zeitraum
  gesamtkostenMiete: number       // Summe aller Mietkosten über Zeitraum
  differenz: number               // Kauf - Miete (negativ = Kauf günstiger)
  kaufLohntAbJahr: number | null  // Ab welchem Jahr sich Kauf lohnt (null = nie)
  immobilienwertEnde: number      // Wert der Immobilie am Ende
  restschuld: number              // Restschuld am Ende
  vermoegenKauf: number           // Immobilienwert - Restschuld
  vermoegenMiete: number          // Eigenkapital + Ersparnis angelegt (2% Rendite)
  jahresvergleich: {
    jahr: number
    kostenKauf: number
    kostenMiete: number
    kumuliertKauf: number
    kumuliertMiete: number
  }[]
}

export function berechneKaufenVsMieten(input: KaufenVsMietenInput): KaufenVsMietenResult {
  const {
    kaufpreis,
    kaufnebenkosten,
    eigenkapital,
    zinssatz,
    tilgung,
    monatlicheKaltmiete,
    mietsteigerung,
    wertsteigerung,
    instandhaltung,
    zeitraumJahre,
  } = input

  // Kaufnebenkosten als Betrag
  const nebenkostenBetrag = kaufpreis * (kaufnebenkosten / 100)
  const gesamtkosten = kaufpreis + nebenkostenBetrag

  // Darlehenssumme = Gesamtkosten - Eigenkapital
  const darlehenssumme = Math.max(gesamtkosten - eigenkapital, 0)

  // Monatliche Annuität (Zins + Tilgung auf das Darlehen)
  const jahresRate = darlehenssumme * ((zinssatz + tilgung) / 100)
  const monatlicheRate = jahresRate / 12

  // Jährliche Instandhaltungskosten
  const jahresInstandhaltung = kaufpreis * (instandhaltung / 100)

  // Anlagerendite für Mieter-Ersparnis
  const anlageRendite = 0.02

  // Berechnung Jahr für Jahr
  const jahresvergleich: KaufenVsMietenResult["jahresvergleich"] = []
  let kumuliertKauf = nebenkostenBetrag // Kaufnebenkosten als einmalige Kosten zu Beginn
  let kumuliertMiete = 0
  let restschuld = darlehenssumme
  let immobilienwert = kaufpreis
  let aktuelleMiete = monatlicheKaltmiete

  // Vermögen Miete: Eigenkapital wird angelegt + jährliche Ersparnis
  let vermoegenMiete = eigenkapital

  let kaufLohntAbJahr: number | null = null

  for (let jahr = 1; jahr <= zeitraumJahre; jahr++) {
    // --- Kauf-Seite ---
    // Zinsen und Tilgung für dieses Jahr
    let jahresZinsen = 0
    let jahresTilgung = 0

    for (let monat = 1; monat <= 12; monat++) {
      if (restschuld <= 0) break
      const monatsZins = restschuld * (zinssatz / 100 / 12)
      const monatsTilgung = Math.min(monatlicheRate - monatsZins, restschuld)
      jahresZinsen += monatsZins
      jahresTilgung += monatsTilgung
      restschuld = Math.max(restschuld - monatsTilgung, 0)
    }

    const kostenKaufJahr = jahresZinsen + jahresTilgung + jahresInstandhaltung
    kumuliertKauf += kostenKaufJahr

    // Immobilienwert steigt
    immobilienwert *= 1 + wertsteigerung / 100

    // --- Miete-Seite ---
    const kostenMieteJahr = aktuelleMiete * 12
    kumuliertMiete += kostenMieteJahr

    // Mieter legt die Differenz (Kauf-Rate + Instandhaltung - Miete) an
    const monatlicheKaufkosten = monatlicheRate + jahresInstandhaltung / 12
    const monatlicheErsparnis = monatlicheKaufkosten - aktuelleMiete

    // Vermögen Miete: Vorjahresvermögen verzinsen + Ersparnis des Jahres
    vermoegenMiete *= 1 + anlageRendite
    if (monatlicheErsparnis > 0) {
      vermoegenMiete += monatlicheErsparnis * 12
    }

    // Miete steigt jährlich
    aktuelleMiete *= 1 + mietsteigerung / 100

    // Vermögen Kauf: Immobilienwert - Restschuld
    const vermoegenKaufAktuell = immobilienwert - restschuld

    // Prüfe ob Kauf sich ab diesem Jahr lohnt
    if (kaufLohntAbJahr === null && vermoegenKaufAktuell > vermoegenMiete) {
      kaufLohntAbJahr = jahr
    }

    jahresvergleich.push({
      jahr,
      kostenKauf: Math.round(kostenKaufJahr),
      kostenMiete: Math.round(kostenMieteJahr),
      kumuliertKauf: Math.round(kumuliertKauf),
      kumuliertMiete: Math.round(kumuliertMiete),
    })
  }

  const vermoegenKauf = immobilienwert - restschuld

  return {
    gesamtkostenKauf: Math.round(kumuliertKauf),
    gesamtkostenMiete: Math.round(kumuliertMiete),
    differenz: Math.round(kumuliertKauf - kumuliertMiete),
    kaufLohntAbJahr,
    immobilienwertEnde: Math.round(immobilienwert),
    restschuld: Math.round(restschuld),
    vermoegenKauf: Math.round(vermoegenKauf),
    vermoegenMiete: Math.round(vermoegenMiete),
    jahresvergleich,
  }
}
