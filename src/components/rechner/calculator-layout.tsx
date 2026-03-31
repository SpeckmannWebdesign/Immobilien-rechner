"use client"

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
  onDownloadPdf,
  onSendEmail,
}: CalculatorLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b">
        <div className="w-10 h-10 rounded-xl bg-muted border flex items-center justify-center flex-shrink-0">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {/* 2-Spalten Layout: Inputs links (sticky), Ergebnisse rechts */}
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">
        {/* Eingabe-Panel */}
        <div className="bg-card border rounded-2xl p-6 lg:sticky lg:top-24">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-5">
            Eingaben
          </h2>
          <div className="space-y-4">
            {inputs}
          </div>
        </div>

        {/* Ergebnis-Dashboard */}
        <div className="space-y-4">
          {results}

          {/* Aktionen */}
          {hasResults && (onDownloadPdf || onSendEmail) && (
            <div className="flex gap-2">
              {onDownloadPdf && (
                <Button variant="outline" size="sm" onClick={onDownloadPdf} className="gap-2">
                  <Download className="h-4 w-4" />
                  Als PDF
                </Button>
              )}
              {onSendEmail && (
                <Button variant="outline" size="sm" onClick={onSendEmail} className="gap-2">
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
