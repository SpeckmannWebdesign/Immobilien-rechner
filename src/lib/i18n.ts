// i18n-Architektur — aktuell nur Deutsch, vorbereitet für Englisch
// Alle UI-Texte werden über diese Datei referenziert,
// so dass später einfach weitere Sprachen ergänzt werden können.

export type Locale = "de" | "en"

export const defaultLocale: Locale = "de"

// Zentrale Übersetzungen für wiederkehrende UI-Texte
const translations = {
  de: {
    common: {
      login: "Anmelden",
      register: "Registrieren",
      logout: "Abmelden",
      save: "Speichern",
      cancel: "Abbrechen",
      delete: "Löschen",
      edit: "Bearbeiten",
      back: "Zurück",
      next: "Weiter",
      loading: "Wird geladen...",
      error: "Ein Fehler ist aufgetreten.",
      success: "Erfolgreich gespeichert.",
      required: "Pflichtfeld",
    },
    calculator: {
      calculate: "Berechnen",
      result: "Ergebnis",
      downloadPdf: "Als PDF herunterladen",
      sendEmail: "Ergebnis per E-Mail senden",
      disclaimer:
        "Alle Berechnungen sind unverbindliche Richtwerte und ersetzen keine professionelle Beratung.",
      disclaimerTax:
        "Keine Steuerberatung im Sinne des StBerG. Konsultieren Sie einen Steuerberater.",
      teaserBlurred:
        "Für das exakte Ergebnis registrieren Sie sich kostenlos.",
    },
    pricing: {
      monthly: "Monatlich",
      yearly: "Jährlich",
      yearlyDiscount: "20% sparen",
      startTrial: "7 Tage kostenlos testen",
      perMonth: "/ Monat",
      includingVat: "inkl. 19% MwSt",
    },
    embed: {
      poweredBy: "Berechnet mit",
      inactive:
        "Dieser Rechner benötigt ein aktives Abo.",
    },
  },
} as const

export type TranslationKey = keyof typeof translations.de
export type Translations = typeof translations.de

export function getTranslations(locale: Locale = defaultLocale): Translations {
  if (locale === "de") return translations.de
  // Englisch wird später ergänzt — Fallback auf Deutsch
  return translations.de
}

// Kurzform für die Standard-Sprache
export const t = translations.de
