// Wohnflächenberechnung nach WoFlV (Wohnflächenverordnung)

export interface Raum {
  name: string
  flaeche: number           // Grundfläche in m²
  typ: "normal" | "dachschraege_1_2" | "dachschraege_unter_1" | "balkon" | "terrasse" | "keller" | "wintergarten_unbeheizt"
}

export interface WohnflaecheInput {
  raeume: Raum[]
}

export interface WohnflaecheDetail {
  name: string
  grundflaeche: number
  faktor: number
  anrechenbar: number
}

export interface WohnflaecheResult {
  gesamtflaeche: number           // Summe aller Grundflächen
  anrechenbare: number            // Anrechenbare Wohnfläche nach WoFlV
  nichtAnrechenbare: number       // Nicht anrechenbare Fläche
  details: WohnflaecheDetail[]
}

// Anrechnungsfaktoren nach WoFlV
const FAKTOREN: Record<Raum["typ"], number> = {
  normal: 1.0,
  dachschraege_1_2: 0.5,
  dachschraege_unter_1: 0,
  balkon: 0.25,
  terrasse: 0.25,
  keller: 0,
  wintergarten_unbeheizt: 0.5,
}

export function berechneWohnflaeche(input: WohnflaecheInput): WohnflaecheResult {
  const details: WohnflaecheDetail[] = input.raeume.map((raum) => {
    const faktor = FAKTOREN[raum.typ]
    return {
      name: raum.name,
      grundflaeche: raum.flaeche,
      faktor,
      anrechenbar: raum.flaeche * faktor,
    }
  })

  const gesamtflaeche = details.reduce((sum, d) => sum + d.grundflaeche, 0)
  const anrechenbare = details.reduce((sum, d) => sum + d.anrechenbar, 0)

  return {
    gesamtflaeche,
    anrechenbare,
    nichtAnrechenbare: gesamtflaeche - anrechenbare,
    details,
  }
}
