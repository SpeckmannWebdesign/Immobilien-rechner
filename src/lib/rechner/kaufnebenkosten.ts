// Kaufnebenkosten-Rechner — Grunderwerbsteuer, Notar, Grundbuch, Makler

export interface KaufnebenkostenInput {
  kaufpreis: number
  grunderwerbsteuerSatz: number // in Prozent, z.B. 6.5
  notarSatz: number // Standard: 1.5%
  grundbuchSatz: number // Standard: 0.5%
  maklerSatz: number // in Prozent, z.B. 3.57 (inkl. MwSt)
  mitMakler: boolean
}

export interface KaufnebenkostenResult {
  grunderwerbsteuer: number
  notarkosten: number
  grundbuchkosten: number
  maklerkosten: number
  gesamtNebenkosten: number
  gesamtNebenkostenProzent: number
  gesamtKosten: number // Kaufpreis + Nebenkosten
}

export function berechneKaufnebenkosten(
  input: KaufnebenkostenInput
): KaufnebenkostenResult {
  const grunderwerbsteuer =
    input.kaufpreis * (input.grunderwerbsteuerSatz / 100)
  const notarkosten = input.kaufpreis * (input.notarSatz / 100)
  const grundbuchkosten = input.kaufpreis * (input.grundbuchSatz / 100)
  const maklerkosten = input.mitMakler
    ? input.kaufpreis * (input.maklerSatz / 100)
    : 0

  const gesamtNebenkosten =
    grunderwerbsteuer + notarkosten + grundbuchkosten + maklerkosten
  const gesamtNebenkostenProzent =
    input.kaufpreis > 0 ? (gesamtNebenkosten / input.kaufpreis) * 100 : 0
  const gesamtKosten = input.kaufpreis + gesamtNebenkosten

  return {
    grunderwerbsteuer,
    notarkosten,
    grundbuchkosten,
    maklerkosten,
    gesamtNebenkosten,
    gesamtNebenkostenProzent,
    gesamtKosten,
  }
}
