"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, X, ArrowRight, ChevronDown } from "lucide-react"

/* ─────────────────────── Daten ─────────────────────── */

const plans = [
  {
    name: "Starter",
    description: "Alle Rechner im Dashboard nutzen",
    priceMonthly: 19,
    priceYearly: 15.2,
    features: [
      "Alle 16 Rechner im Dashboard",
      "Unbegrenzte Berechnungen",
      "Ergebnisse per E-Mail versenden",
    ],
    notIncluded: [
      "PDF-Export",
      "Rechner auf Website einbetten",
      "Eigene Farben & Dark Mode",
      "Analytics & Statistiken",
    ],
    cta: "Kostenlos testen",
    popular: false,
  },
  {
    name: "Pro",
    description: "1 Rechner auf Ihrer Website einbetten",
    priceMonthly: 39,
    priceYearly: 31.2,
    features: [
      "Alles aus Starter",
      "PDF-Export aller Ergebnisse",
      "1 Rechner als Widget einbetten",
      "Eigene Farben & Dark Mode",
      "Embed-Analytics",
    ],
    notIncluded: [
      "Alle Rechner einbetten",
      "Prioritäts-Support",
      "Custom Branding",
    ],
    cta: "Kostenlos testen",
    popular: true,
  },
  {
    name: "Business",
    description: "Alle Rechner auf Ihrer Website einbetten",
    priceMonthly: 69,
    priceYearly: 55.2,
    features: [
      "Alles aus Pro",
      "Alle 16 Rechner einbetten",
      "Prioritäts-Support",
      "Custom Branding",
    ],
    notIncluded: [],
    cta: "Kostenlos testen",
    popular: false,
  },
]

/* ─────────────────────── Toggle + Cards ─────────────────────── */

export function PricingToggle() {
  const [yearly, setYearly] = useState(false)

  return (
    <>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3 mt-10 mb-16">
        <span
          className={`text-sm font-medium transition-colors ${
            !yearly ? "text-[#111827]" : "text-[#9CA3AF]"
          }`}
        >
          Monatlich
        </span>
        <button
          onClick={() => setYearly(!yearly)}
          className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
            yearly ? "bg-[#4338CA]" : "bg-[#e5e5ea]"
          }`}
          aria-label={
            yearly
              ? "Zu monatlicher Zahlung wechseln"
              : "Zu jährlicher Zahlung wechseln"
          }
        >
          <span
            className="absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-sm transition-transform duration-300"
            style={{ transform: `translateX(${yearly ? 22 : 2}px)` }}
          />
        </button>
        <span
          className={`text-sm font-medium transition-colors ${
            yearly ? "text-[#111827]" : "text-[#9CA3AF]"
          }`}
        >
          Jährlich
        </span>
        {yearly && (
          <span className="text-xs font-medium text-[#059669] bg-[#059669]/[0.08] px-2.5 py-1 rounded-lg">
            -20 %
          </span>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1120px] mx-auto">
        {plans.map((plan) => {
          const price = yearly ? plan.priceYearly : plan.priceMonthly

          return (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col bg-white ${
                plan.popular ? "relative" : "border border-[#E3E5EB]"
              }`}
              style={
                plan.popular
                  ? { boxShadow: "0 0 0 2px #4338CA" }
                  : undefined
              }
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#4338CA] text-white text-xs font-medium px-4 py-1.5 rounded-lg whitespace-nowrap">
                    Beliebtester Plan
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#111827] mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-[#9CA3AF]">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-[2.75rem] font-bold tracking-[-0.03em] text-[#111827]">
                    {Math.round(price)} €
                  </span>
                  <span className="text-sm text-[#9CA3AF]">/Monat</span>
                </div>
                <p className="text-xs mt-1 text-[#9CA3AF]">
                  inkl. 19 % MwSt.{" "}
                  {yearly ? "Jährliche Abrechnung." : "Monatlich kündbar."}
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/anmelden"
                className={`w-full py-3 rounded-lg text-center font-medium text-sm transition-colors duration-300 mb-8 block ${
                  plan.popular
                    ? "bg-[#4338CA] text-white hover:bg-[#5B52E0]"
                    : "border border-[#E3E5EB] text-[#111827] hover:bg-[#F9FAFB]"
                }`}
              >
                {plan.cta}
                <ArrowRight className="inline ml-2 h-4 w-4" />
              </Link>

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#059669]" />
                    <span className="text-[#4B5563]">{f}</span>
                  </li>
                ))}
                {plan.notIncluded.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <X className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#d1d1d6]" />
                    <span className="text-[#d1d1d6]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </>
  )
}

/* ─────────────────────── FAQ Accordion ─────────────────────── */

interface FaqItem {
  question: string
  answer: string
}

function FaqAccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#E3E5EB]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#111827] text-[0.9375rem] pr-4">
          {item.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-[#9CA3AF] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-[0.9375rem] text-[#4B5563] leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="max-w-3xl mx-auto">
      {items.map((item) => (
        <FaqAccordionItem key={item.question} item={item} />
      ))}
    </div>
  )
}
