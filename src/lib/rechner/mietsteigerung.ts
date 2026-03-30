// Mietsteigerungsrechner — Prognose über 10/20/30 Jahre

export interface MietsteigerungInput {
  aktuelleMonatsmiete: number
  jaehrlicheSteigerung: number // Prozent
  zeitraum: number // Jahre
}

export interface MietsteigerungJahr {
  jahr: number
  monatsmiete: number
  jahresmiete: number
  kumuliert: number
}

export interface MietsteigerungResult {
  endMonatsmiete: number
  endJahresmiete: number
  gesamtMieteinnahmen: number
  steigerungAbsolut: number
  steigerungProzent: number
  jahresUebersicht: MietsteigerungJahr[]
}

export function berechneMietsteigerung(
  input: MietsteigerungInput
): MietsteigerungResult {
  const jahresUebersicht: MietsteigerungJahr[] = []
  let aktuelleMonatsmiete = input.aktuelleMonatsmiete
  let kumuliert = 0

  for (let jahr = 1; jahr <= input.zeitraum; jahr++) {
    if (jahr > 1) {
      aktuelleMonatsmiete *= 1 + input.jaehrlicheSteigerung / 100
    }
    const jahresmiete = aktuelleMonatsmiete * 12
    kumuliert += jahresmiete

    jahresUebersicht.push({
      jahr,
      monatsmiete: aktuelleMonatsmiete,
      jahresmiete,
      kumuliert,
    })
  }

  const endMonatsmiete = aktuelleMonatsmiete
  const endJahresmiete = endMonatsmiete * 12

  return {
    endMonatsmiete,
    endJahresmiete,
    gesamtMieteinnahmen: kumuliert,
    steigerungAbsolut: endMonatsmiete - input.aktuelleMonatsmiete,
    steigerungProzent:
      input.aktuelleMonatsmiete > 0
        ? ((endMonatsmiete - input.aktuelleMonatsmiete) /
            input.aktuelleMonatsmiete) *
          100
        : 0,
    jahresUebersicht,
  }
}
