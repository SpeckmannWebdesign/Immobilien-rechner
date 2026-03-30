import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Immobilien-Rechner — Professionelle Immobilien-Tools",
    template: "%s | Immobilien-Rechner",
  },
  description:
    "Professionelle Immobilien-Rechner für Makler, Investoren und Hausverwaltungen. Rendite, Kaufnebenkosten, Finanzierung und mehr — direkt nutzen oder auf der eigenen Website einbetten.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Immobilien-Rechner",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-geist-sans)]">
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
