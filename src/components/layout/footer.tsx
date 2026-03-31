import Link from "next/link"
import { Calculator } from "lucide-react"

const footerLinks = {
  produkt: [
    { name: "Alle Rechner", href: "/rechner" },
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
    <footer className="bg-white border-t border-[#E3E5EB]">
      {/* Links */}
      <div className="max-w-[1120px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Branding */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-[#111827]">
              <Calculator className="h-5 w-5" />
              <span className="text-sm font-semibold tracking-tight">
                Immobilien-Rechner
              </span>
            </Link>
            <p className="text-[13px] text-[#9CA3AF] leading-relaxed">
              Professionelle Immobilien-Tools für Makler, Investoren und Hausverwaltungen.
            </p>
          </div>

          {/* Produkt */}
          <div>
            <h3 className="text-xs font-semibold text-[#4B5563] tracking-[0.02em] uppercase mb-4">
              Produkt
            </h3>
            <ul className="space-y-3">
              {footerLinks.produkt.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#9CA3AF] hover:text-[#111827] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="text-xs font-semibold text-[#4B5563] tracking-[0.02em] uppercase mb-4">
              Rechtliches
            </h3>
            <ul className="space-y-3">
              {footerLinks.rechtliches.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#9CA3AF] hover:text-[#111827] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold text-[#4B5563] tracking-[0.02em] uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#9CA3AF] hover:text-[#111827] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E3E5EB]">
        <div className="max-w-[1120px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[12px] text-[#9CA3AF]">
            &copy; {new Date().getFullYear()} Speckmann Webdesign GmbH. Alle Rechte vorbehalten.
          </p>
          <p className="text-[12px] text-[#9CA3AF]">
            Gehostet in Deutschland
          </p>
        </div>
      </div>
    </footer>
  )
}
