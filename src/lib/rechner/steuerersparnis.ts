// Steuerersparnis-Rechner — AfA, Werbungskosten, Steuervorteil

export interface SteuerersparnisInput {
  kaufpreisGebaeude: number // Gebäudeanteil des Kaufpreises
  baujahr: number
  grenzsteuersatz: number // Prozent (persönlicher Steuersatz)
  jaehrlicheWerbungskosten: number // Zinsen, Verwaltung, etc.
  jaehrlicheMieteinnahmen: number
}

export interface SteuerersparnisResult {
  afaSatz: number // Prozent
  afaLabel: string
  jaehrlicheAfa: number
  steuerlicheEinkuenfte: number // Miete - AfA - Werbungskosten
  steuerersparnisJahr: number
  steuerersparnisMonat: number
  istSteuerlichNegativ: boolean // Steuerlicher Verlust = gut
}

export function berechneSteuerersparnis(
  input: SteuerersparnisInput
): SteuerersparnisResult {
  // AfA-Satz bestimmen
  let afaSatz: number
  let afaLabel: string

  if (input.baujahr < 1925) {
    afaSatz = 2.5
    afaLabel = "2,5 % (Baujahr vor 1925)"
  } else if (input.baujahr >= 2023) {
    afaSatz = 3.0
    afaLabel = "3,0 % (Neubau ab 2023)"
  } else {
    afaSatz = 2.0
    afaLabel = "2,0 % (Baujahr 1925–2022)"
  }

  const jaehrlicheAfa = input.kaufpreisGebaeude * (afaSatz / 100)

  // Steuerliche Einkünfte = Mieteinnahmen - AfA - Werbungskosten
  const steuerlicheEinkuenfte =
    input.jaehrlicheMieteinnahmen - jaehrlicheAfa - input.jaehrlicheWerbungskosten

  // Steuerersparnis (bei negativen Einkünften = Erstattung)
  const steuerersparnisJahr =
    steuerlicheEinkuenfte < 0
      ? Math.abs(steuerlicheEinkuenfte) * (input.grenzsteuersatz / 100)
      : -(steuerlicheEinkuenfte * (input.grenzsteuersatz / 100))

  return {
    afaSatz,
    afaLabel,
    jaehrlicheAfa,
    steuerlicheEinkuenfte,
    steuerersparnisJahr,
    steuerersparnisMonat: steuerersparnisJahr / 12,
    istSteuerlichNegativ: steuerlicheEinkuenfte < 0,
  }
}
