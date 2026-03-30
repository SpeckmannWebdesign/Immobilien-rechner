"use client"

import { useState } from "react"
import Link from "next/link"
import { useSectionReveal } from "@/components/animations/useSectionReveal"
import { Check, X, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Starter",
    description: "Alle Rechner im Dashboard nutzen",
    priceMonthly: 19,
    priceYearly: 15.2,
    features: [
      { text: "Alle 12 Rechner im Dashboard", included: true },
      { text: "PDF-Export aller Ergebnisse", included: true },
      { text: "Ergebnisse per E-Mail versenden", included: true },
      { text: "Unbegrenzte Berechnungen", included: true },
      { text: "Rechner auf Website einbetten", included: false },
      { text: "Analytics & Statistiken", included: false },
    ],
  },
  {
    name: "Pro",
    description: "1 Rechner auf Ihrer Website einbetten",
    priceMonthly: 39,
    priceYearly: 31.2,
    popular: true,
    features: [
      { text: "Alles aus Starter", included: true },
      { text: "1 Rechner als Widget einbetten", included: true },
      { text: "Unbegrenzt viele Domains", included: true },
      { text: "Eigene Farben & Dark Mode", included: true },
      { text: "Embed-Analytics", included: true },
      { text: "Alle Rechner einbetten", included: false },
    ],
  },
  {
    name: "Business",
    description: "Alle Rechner auf Ihrer Website einbetten",
    priceMonthly: 69,
    priceYearly: 55.2,
    features: [
      { text: "Alles aus Pro", included: true },
      { text: "Alle 12 Rechner einbetten", included: true },
      { text: "Unbegrenzt viele Domains", included: true },
      { text: "Eigene Farben & Dark Mode", included: true },
      { text: "Embed-Analytics", included: true },
      { text: "Prioritäts-Support", included: true },
    ],
  },
]

export function PricingSection() {
  const sectionRef = useSectionReveal()
  const [yearly, setYearly] = useState(false)

  return (
    <section
      ref={sectionRef}
      className="py-[clamp(5rem,12vw,10rem)] px-6 bg-white"
    >
      <div className="max-w-[1120px] mx-auto">
        {/* Header */}
        <div data-reveal className="text-center mb-6">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-[#1d1d1f] mb-4">
            Einfache, transparente Preise.
          </h2>
          <p className="text-[1.1875rem] text-[#6e6e73] max-w-[600px] mx-auto">
            Starten Sie mit 14 Tagen kostenlosem Zugang zu allen Funktionen. Keine Kreditkarte nötig.
          </p>
        </div>

        {/* Toggle */}
        <div data-reveal className="flex items-center justify-center gap-3 mb-16">
          <span className={`text-sm font-medium ${!yearly ? "text-[#1d1d1f]" : "text-[#86868b]"}`}>
            Monatlich
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
              yearly ? "bg-[#0066CC]" : "bg-[#e5e5ea]"
            }`}
            aria-label={yearly ? "Zu monatlicher Zahlung wechseln" : "Zu jährlicher Zahlung wechseln"}
          >
            <motion.div
              animate={{ x: yearly ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-sm"
            />
          </button>
          <span className={`text-sm font-medium ${yearly ? "text-[#1d1d1f]" : "text-[#86868b]"}`}>
            Jährlich
          </span>
          {yearly && (
            <span className="text-xs font-medium text-[#0066CC] bg-[#0066CC]/8 px-2.5 py-1 rounded-full">
              −20%
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 flex flex-col ${
                plan.popular
                  ? "bg-[#1d1d1f] text-white ring-2 ring-[#1d1d1f] relative"
                  : "bg-[#f5f5f7] text-[#1d1d1f]"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#0066CC] text-white text-xs font-medium px-4 py-1.5 rounded-full">
                    Beliebtester Plan
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className={`text-sm ${plan.popular ? "text-white/60" : "text-[#86868b]"}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold tracking-[-0.03em]">
                    {Math.round(yearly ? plan.priceYearly : plan.priceMonthly)} €
                  </span>
                  <span className={`text-sm ${plan.popular ? "text-white/60" : "text-[#86868b]"}`}>
                    /Monat
                  </span>
                </div>
                <p className={`text-xs mt-1 ${plan.popular ? "text-white/40" : "text-[#86868b]"}`}>
                  inkl. 19% MwSt. {yearly ? "Jährliche Abrechnung." : "Monatlich kündbar."}
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/anmelden"
                className={`w-full py-3 rounded-full text-center font-medium text-sm transition-colors duration-300 mb-8 block ${
                  plan.popular
                    ? "bg-white text-[#1d1d1f] hover:bg-white/90"
                    : "bg-[#0066CC] text-white hover:bg-[#0077ED]"
                }`}
              >
                Kostenlos testen
              </Link>

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3 text-sm">
                    {feature.included ? (
                      <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        plan.popular ? "text-[#30d158]" : "text-[#0066CC]"
                      }`} />
                    ) : (
                      <X className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        plan.popular ? "text-white/20" : "text-[#d1d1d6]"
                      }`} />
                    )}
                    <span className={!feature.included ? (plan.popular ? "text-white/30" : "text-[#d1d1d6]") : ""}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Preise-Link */}
        <div data-reveal className="text-center mt-10">
          <Link
            href="/preise"
            className="inline-flex items-center gap-2 text-[#0066CC] font-medium
                       hover:underline underline-offset-4 transition-all duration-300"
          >
            Alle Details und FAQ ansehen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
