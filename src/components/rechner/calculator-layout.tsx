"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Disclaimer } from "./disclaimer"
import { Download, Mail } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface CalculatorLayoutProps {
  title: string
  description: string
  icon: LucideIcon
  showTaxDisclaimer?: boolean
  inputs: React.ReactNode
  results: React.ReactNode
  hasResults?: boolean
  onCalculate?: () => void
  onDownloadPdf?: () => void
  onSendEmail?: () => void
}

export function CalculatorLayout({
  title,
  description,
  icon: Icon,
  showTaxDisclaimer = false,
  inputs,
  results,
  hasResults = false,
  onCalculate,
  onDownloadPdf,
  onSendEmail,
}: CalculatorLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2.5">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Eingabe */}
        <Card>
          <CardHeader>
            <CardTitle>Eingaben</CardTitle>
            <CardDescription>
              Geben Sie Ihre Daten ein, um die Berechnung zu starten.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inputs}
            {onCalculate && (
              <Button onClick={onCalculate} className="w-full mt-4">
                Berechnen
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Ergebnis */}
        <div className="space-y-4">
          {results}

          {/* Aktionen */}
          {hasResults && (
            <div className="flex gap-2">
              {onDownloadPdf && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDownloadPdf}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Als PDF
                </Button>
              )}
              {onSendEmail && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSendEmail}
                  className="gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Per E-Mail
                </Button>
              )}
            </div>
          )}

          {/* Disclaimer */}
          <Disclaimer showTaxDisclaimer={showTaxDisclaimer} />
        </div>
      </div>
    </div>
  )
}
