import Link from "next/link"
import { Calculator } from "lucide-react"

const footerLinks = {
  produkt: [
    { name: "Alle Rechner", href: "/tools" },
    { name: "Preise", href: "/preise" },
    { name: "Einbettung", href: "/einbettung" },
  ],
  rechtliches: [
    { name: "Impressum", href: "/impressum" },
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "AGB", href: "/agb" },
    { name: "Widerrufsbelehrung", href: "/widerruf" },
  ],
  support: [
    { name: "Kontakt", href: "/kontakt" },
    { name: "Changelog", href: "/changelog" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Calculator className="h-5 w-5 text-primary" />
              <span>Immobilien-Rechner</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Professionelle Immobilien-Tools für Makler, Investoren und
              Hausverwaltungen.
            </p>
            <p className="text-xs text-muted-foreground">
              Ein Produkt der Speckmann Webdesign GmbH
            </p>
          </div>

          {/* Produkt */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Produkt</h3>
            <ul className="space-y-2">
              {footerLinks.produkt.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Rechtliches</h3>
            <ul className="space-y-2">
              {footerLinks.rechtliches.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Speckmann Webdesign GmbH. Alle Rechte
          vorbehalten.
        </div>
      </div>
    </footer>
  )
}
