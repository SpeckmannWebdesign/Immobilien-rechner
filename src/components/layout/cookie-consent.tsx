"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const COOKIE_CONSENT_KEY = "immo-cookie-consent"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Nur anzeigen, wenn noch keine Entscheidung getroffen wurde
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto max-w-3xl">
        <div className="rounded-lg border bg-background p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-sm text-muted-foreground flex-1">
            Wir verwenden nur technisch notwendige Cookies für Ihre Anmeldung.
            Keine Analyse- oder Marketing-Cookies. Mehr dazu in unserer{" "}
            <Link
              href="/datenschutz"
              className="underline hover:text-foreground"
            >
              Datenschutzerklärung
            </Link>
            .
          </p>
          <Button size="sm" onClick={accept} className="shrink-0">
            Verstanden
          </Button>
        </div>
      </div>
    </div>
  )
}
