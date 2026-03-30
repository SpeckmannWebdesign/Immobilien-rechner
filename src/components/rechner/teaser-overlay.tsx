"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

interface TeaserOverlayProps {
  children: React.ReactNode
  showOverlay: boolean
}

export function TeaserOverlay({ children, showOverlay }: TeaserOverlayProps) {
  if (!showOverlay) return <>{children}</>

  return (
    <div className="relative">
      {/* Unscharfes Ergebnis */}
      <div className="blur-md select-none pointer-events-none">{children}</div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
        <div className="text-center space-y-4 p-6">
          <div className="mx-auto rounded-full bg-primary/10 p-3 w-fit">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Exaktes Ergebnis freischalten</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Registrieren Sie sich kostenlos und testen Sie alle Rechner 14 Tage lang.
            </p>
          </div>
          <Link href="/anmelden">
            <Button>Kostenlos testen</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
