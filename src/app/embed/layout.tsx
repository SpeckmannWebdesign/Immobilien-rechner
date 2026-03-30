import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Immobilien-Rechner — Embed",
  robots: "noindex, nofollow",
}

// Minimales Layout für eingebettete Rechner — kein Header, Footer oder Navigation
export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  )
}
