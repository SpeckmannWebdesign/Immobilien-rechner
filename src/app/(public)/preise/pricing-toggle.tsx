"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, ArrowRight } from "lucide-react"

interface Plan {
  name: string
  description: string
  priceMonthly: number
  priceYearly: number
  popular?: boolean
  features: string[]
  notIncluded: string[]
  cta: string
  variant: "default" | "outline"
}

export function PricingToggle({ plans }: { plans: Plan[] }) {
  const [yearly, setYearly] = useState(false)

  return (
    <>
      {/* Toggle */}
      <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-muted p-1">
        <button
          onClick={() => setYearly(false)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !yearly
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Monatlich
        </button>
        <button
          onClick={() => setYearly(true)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            yearly
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Jährlich
          <Badge variant="secondary" className="ml-2">
            −20%
          </Badge>
        </button>
      </div>

      {/* Plan-Karten */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const price = yearly ? plan.priceYearly : plan.priceMonthly
          const formattedPrice = price.toLocaleString("de-DE", {
            minimumFractionDigits: price % 1 === 0 ? 0 : 2,
            maximumFractionDigits: 2,
          })

          return (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular ? "border-primary shadow-lg scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Beliebtester Plan</Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{formattedPrice} €</span>
                  <span className="text-muted-foreground"> / Monat</span>
                </div>
                {yearly && (
                  <p className="text-xs text-muted-foreground">
                    {(price * 12).toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    € pro Jahr, jährlich abgerechnet
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  inkl. 19% MwSt
                </p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <X className="h-4 w-4 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/anmelden" className="mt-6 block">
                  <Button
                    variant={plan.variant}
                    className="w-full gap-2"
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
