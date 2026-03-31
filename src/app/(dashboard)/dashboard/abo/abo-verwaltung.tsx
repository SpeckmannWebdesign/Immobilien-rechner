"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Crown,
  Check,
  Download,
  CreditCard,
  AlertTriangle,
  Trash2,
  ArrowUpRight,
} from "lucide-react"

/* ─────────────────────── Plan-Daten ─────────────────────── */

interface Plan {
  name: string
  preisMonatlich: number
  preisJaehrlich: number
  features: string[]
  highlighted?: boolean
}

const plans: Plan[] = [
  {
    name: "Starter",
    preisMonatlich: 19,
    preisJaehrlich: 15,
    features: [
      "16 Rechner im Dashboard",
      "Unbegrenzte Berechnungen",
      "E-Mail-Support",
    ],
  },
  {
    name: "Pro",
    preisMonatlich: 39,
    preisJaehrlich: 31,
    highlighted: true,
    features: [
      "Alles aus Starter",
      "1 Embed-Widget",
      "PDF-Export",
      "Eigene Farben & Dark Mode",
      "Analytics",
    ],
  },
  {
    name: "Business",
    preisMonatlich: 69,
    preisJaehrlich: 55,
    features: [
      "Alles aus Pro",
      "Alle 16 Embed-Widgets",
      "Custom Branding",
      "Prioritäts-Support",
    ],
  },
]

// Simulierter aktueller Plan (wird später durch echte Daten ersetzt)
const currentPlan = "Trial"
const trialDaysLeft = 5

/* ─────────────────────── Komponente ─────────────────────── */

export function AboVerwaltung() {
  const [yearly, setYearly] = useState(false)

  function handleComingSoon(action: string) {
    toast.info(`${action} — wird bald verfügbar sein.`)
  }

  return (
    <div className="space-y-6">
      {/* ───── 1. Aktueller Plan ───── */}
      <section className="bg-white border border-[#E3E5EB] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5 text-[#4338CA]" />
              <h2 className="text-xl font-bold text-[#111827]">
                {currentPlan}
              </h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                Trial — noch {trialDaysLeft} Tage
              </span>
            </div>
            <p className="text-sm text-[#4B5563]">
              Testen Sie alle Funktionen kostenlos. Nach Ablauf der Testphase
              wählen Sie einen passenden Plan.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("plan-vergleich")
              el?.scrollIntoView({ behavior: "smooth" })
            }}
            className="inline-flex items-center gap-2 bg-[#4338CA] text-white font-medium px-5 py-2.5 rounded-lg hover:bg-[#5B52E0] transition-colors whitespace-nowrap"
          >
            Plan upgraden
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* ───── 2. Plan-Vergleich ───── */}
      <section
        id="plan-vergleich"
        className="bg-[#F7F8FB] border border-[#E3E5EB] rounded-2xl p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-bold text-[#111827]">
            Verfügbare Pläne
          </h2>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${!yearly ? "text-[#111827]" : "text-[#9CA3AF]"}`}>
              Monatlich
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                yearly ? "bg-[#4338CA]" : "bg-[#E3E5EB]"
              }`}
              aria-label={yearly ? "Zu monatlicher Zahlung wechseln" : "Zu jährlicher Zahlung wechseln"}
            >
              <span
                className="absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-300"
                style={{ transform: yearly ? "translateX(20px)" : "translateX(0)" }}
              />
            </button>
            <span className={`text-sm font-medium ${yearly ? "text-[#111827]" : "text-[#9CA3AF]"}`}>
              Jährlich
            </span>
            {yearly && (
              <span className="text-xs font-semibold text-[#059669] bg-[#059669]/[0.08] px-2 py-0.5 rounded-lg">
                −20%
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const isCurrentPlan = plan.name === currentPlan

            return (
              <div
                key={plan.name}
                className={`relative bg-white rounded-xl p-5 border-2 transition-colors ${
                  plan.highlighted
                    ? "border-[#4338CA]"
                    : isCurrentPlan
                      ? "border-[#059669]"
                      : "border-[#E3E5EB]"
                }`}
              >
                {plan.highlighted && !isCurrentPlan && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4338CA] text-white text-xs font-medium px-3 py-0.5 rounded-full">
                    Beliebt
                  </span>
                )}
                {isCurrentPlan && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#059669] text-white text-xs font-medium px-3 py-0.5 rounded-full">
                    Aktueller Plan
                  </span>
                )}

                <h3 className="text-lg font-bold text-[#111827]">
                  {plan.name}
                </h3>
                <p className="mt-1">
                  <span className="text-2xl font-bold text-[#111827]">
                    {yearly ? plan.preisJaehrlich : plan.preisMonatlich} €
                  </span>
                  <span className="text-sm text-[#9CA3AF]"> / Monat</span>
                </p>
                {yearly && (
                  <p className="text-xs text-[#9CA3AF] mt-0.5">
                    Jährliche Abrechnung. Statt {plan.preisMonatlich} €/Monat.
                  </p>
                )}

                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-[#4B5563]"
                    >
                      <Check className="h-4 w-4 text-[#059669] mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleComingSoon(`Wechsel zu ${plan.name}`)}
                  disabled={isCurrentPlan}
                  className={`mt-5 w-full rounded-lg py-2 text-sm font-medium transition-colors ${
                    isCurrentPlan
                      ? "bg-[#E3E5EB] text-[#9CA3AF] cursor-not-allowed"
                      : plan.highlighted
                        ? "bg-[#4338CA] text-white hover:bg-[#5B52E0]"
                        : "bg-white text-[#4338CA] border border-[#4338CA] hover:bg-[#4338CA]/5"
                  }`}
                >
                  {isCurrentPlan ? "Aktueller Plan" : "Auswählen"}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* ───── 3. Rechnungen ───── */}
      <section className="bg-white border border-[#E3E5EB] rounded-2xl p-6">
        <h2 className="text-lg font-bold text-[#111827] mb-4">Rechnungen</h2>

        {/* Placeholder — keine Rechnungen vorhanden */}
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Download className="h-8 w-8 text-[#9CA3AF] mb-3" />
          <p className="text-sm text-[#9CA3AF]">
            Noch keine Rechnungen vorhanden.
          </p>
        </div>

        {/* Beispiel-Tabelle (auskommentiert für spätere Nutzung)
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E5EB] text-left">
                <th className="py-3 pr-4 font-medium text-[#4B5563]">Datum</th>
                <th className="py-3 pr-4 font-medium text-[#4B5563]">Betrag</th>
                <th className="py-3 pr-4 font-medium text-[#4B5563]">Status</th>
                <th className="py-3 font-medium text-[#4B5563]">PDF</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E3E5EB]">
                <td className="py-3 pr-4 text-[#111827]">01.03.2026</td>
                <td className="py-3 pr-4 text-[#111827]">39,00 EUR</td>
                <td className="py-3 pr-4">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Bezahlt
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-[#4338CA] hover:underline">Herunterladen</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        */}
      </section>

      {/* ───── 4. Zahlungsmethode ───── */}
      <section className="bg-white border border-[#E3E5EB] rounded-2xl p-6">
        <h2 className="text-lg font-bold text-[#111827] mb-4">
          Zahlungsmethode
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-[#9CA3AF]" />
            <span className="text-sm text-[#9CA3AF]">
              Keine Zahlungsmethode hinterlegt
            </span>
          </div>
          <button
            onClick={() => handleComingSoon("Zahlungsmethode hinzufügen")}
            className="inline-flex items-center gap-2 bg-[#4338CA] text-white font-medium px-5 py-2.5 rounded-lg hover:bg-[#5B52E0] transition-colors whitespace-nowrap"
          >
            Zahlungsmethode hinzufügen
          </button>
        </div>

        <p className="mt-3 text-xs text-[#9CA3AF]">
          Zahlungen werden sicher über Stripe abgewickelt.
        </p>
      </section>

      {/* ───── 5. Abo kündigen ───── */}
      <section className="bg-white border border-[#E3E5EB] rounded-2xl p-6">
        <h2 className="text-lg font-bold text-[#111827] mb-2">
          Abo kündigen
        </h2>
        <p className="text-sm text-[#4B5563] mb-4">
          Ihr Abo läuft bis zum Ende des Abrechnungszeitraums weiter. Alle
          Daten bleiben erhalten, bis der Zeitraum abgelaufen ist.
        </p>
        <button
          onClick={() => handleComingSoon("Abo kündigen")}
          className="inline-flex items-center gap-2 border border-[#DC2626] text-[#DC2626] font-medium px-5 py-2.5 rounded-lg hover:bg-[#DC2626]/5 transition-colors"
        >
          <AlertTriangle className="h-4 w-4" />
          Abo kündigen
        </button>
      </section>

      {/* ───── 6. Account löschen ───── */}
      <section className="bg-white border border-[#E3E5EB] rounded-2xl p-6">
        <h2 className="text-lg font-bold text-[#111827] mb-2">
          Account löschen
        </h2>
        <p className="text-sm text-[#4B5563] mb-4">
          Alle Daten werden unwiderruflich gelöscht. Diese Aktion kann nicht
          rückgängig gemacht werden.
        </p>
        <button
          onClick={() => handleComingSoon("Account löschen")}
          className="inline-flex items-center gap-2 bg-[#DC2626] text-white font-medium px-5 py-2.5 rounded-lg hover:bg-[#b91c1c] transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          Account löschen
        </button>
      </section>
    </div>
  )
}
