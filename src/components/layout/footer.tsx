import Link from "next/link"
import { Logo } from "@/components/ui/logo"

const footerLinks = {
  produkt: [
    { name: "Alle Rechner", href: "/rechner" },
    { name: "Preise", href: "/preise" },
    { name: "Einbettung", href: "/einbettung" },
    { name: "Blog", href: "/blog" },
  ],
  zielgruppen: [
    { name: "Für Makler", href: "/fuer-makler" },
    { name: "Für Investoren", href: "/fuer-investoren" },
    { name: "Für Hausverwaltungen", href: "/fuer-hausverwaltungen" },
  ],
  rechtliches: [
    { name: "Impressum", href: "/impressum" },
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "AGB", href: "/agb" },
    { name: "Widerrufsbelehrung", href: "/widerruf" },
  ],
  support: [
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Kontakt", href: "/kontakt" },
    { name: "FAQ", href: "/faq" },
    { name: "Changelog", href: "/changelog" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E3E5EB]">
      {/* Links */}
      <div className="max-w-[1120px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Branding */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <Logo size="sm" />
            </Link>
            <p className="text-[13px] text-[#9CA3AF] leading-relaxed">
              16 professionelle Immobilien-Tools für Makler, Investoren und Hausverwaltungen.
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
                  <Link href={link.href} className="text-[13px] text-[#9CA3AF] hover:text-[#111827] transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zielgruppen */}
          <div>
            <h3 className="text-xs font-semibold text-[#4B5563] tracking-[0.02em] uppercase mb-4">
              Zielgruppen
            </h3>
            <ul className="space-y-3">
              {footerLinks.zielgruppen.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-[#9CA3AF] hover:text-[#111827] transition-colors duration-300">
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
                  <Link href={link.href} className="text-[13px] text-[#9CA3AF] hover:text-[#111827] transition-colors duration-300">
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
                  <Link href={link.href} className="text-[13px] text-[#9CA3AF] hover:text-[#111827] transition-colors duration-300">
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
