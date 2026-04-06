"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Disclaimer } from "./disclaimer"
import { Download, Mail, Palette } from "lucide-react"
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
  const [brandColor, setBrandColor] = useState("#205090")
  const [showBranding, setShowBranding] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--rechner-accent", brandColor)

    // Dunklere Variante berechnen
    const r = parseInt(brandColor.slice(1, 3), 16)
    const g = parseInt(brandColor.slice(3, 5), 16)
    const b = parseInt(brandColor.slice(5, 7), 16)
    const darkR = Math.round(r * 0.7)
    const darkG = Math.round(g * 0.7)
    const darkB = Math.round(b * 0.7)
    const mutedR = Math.round(r + (255 - r) * 0.4)
    const mutedG = Math.round(g + (255 - g) * 0.4)
    const mutedB = Math.round(b + (255 - b) * 0.4)
    root.style.setProperty("--rechner-accent-dark", `#${darkR.toString(16).padStart(2, "0")}${darkG.toString(16).padStart(2, "0")}${darkB.toString(16).padStart(2, "0")}`)
    root.style.setProperty("--rechner-accent-muted", `#${mutedR.toString(16).padStart(2, "0")}${mutedG.toString(16).padStart(2, "0")}${mutedB.toString(16).padStart(2, "0")}`)
  }, [brandColor])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b">
        <div className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${brandColor}15` }}>
          <Icon className="h-5 w-5" style={{ color: brandColor }} />
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

      {/* Branding Farbe */}
      <div className="border-t pt-6">
        <button
          onClick={() => setShowBranding(!showBranding)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <Palette className="h-4 w-4" />
          Branding-Farbe anpassen
        </button>
        {showBranding && (
          <div className="flex items-center gap-3 mt-3">
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="w-10 h-10 rounded-lg border cursor-pointer"
            />
            <input
              type="text"
              value={brandColor}
              onChange={(e) => {
                const val = e.target.value
                if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                  setBrandColor(val)
                }
              }}
              placeholder="#205090"
              className="bg-card border rounded-lg px-3 py-2 text-sm font-mono w-28"
            />
            <span className="text-xs text-muted-foreground">Hex-Code eingeben — Rechner passt sich an</span>
          </div>
        )}
      </div>
    </div>
  )
}
