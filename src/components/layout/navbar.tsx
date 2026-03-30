"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Calculator, Menu } from "lucide-react"

const navigation = [
  { name: "Rechner", href: "/tools" },
  { name: "Preise", href: "/preise" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Calculator className="h-6 w-6 text-primary" />
          <span>Immobilien-Rechner</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/anmelden">
            <Button variant="ghost">Anmelden</Button>
          </Link>
          <Link href="/anmelden">
            <Button>Kostenlos testen</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menü öffnen</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex flex-col gap-4 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t pt-4 flex flex-col gap-2">
                <Link href="/anmelden" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">Anmelden</Button>
                </Link>
                <Link href="/anmelden" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Kostenlos testen</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
