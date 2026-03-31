import Link from "next/link"
import { ArrowRight, Mail, MapPin, Building2, User } from "lucide-react"
import type { Metadata } from "next"

/* ─────────────────────── Metadata ─────────────────────── */

export const metadata: Metadata = {
  title: "Kontakt | Immobilien-Rechner",
  description:
    "Kontaktieren Sie die Speckmann Webdesign GmbH — das Team hinter Immobilien-Rechner. Standort: Oldenburg, Deutschland.",
  robots: { index: false, follow: true },
}

/* ─────────────────────── Kontakt-Daten ─────────────────────── */

const contactItems = [
  {
    icon: Building2,
    label: "Unternehmen",
    value: "Speckmann Webdesign GmbH",
  },
  {
    icon: User,
    label: "Ansprechpartner",
    value: "Marcel Speckmann",
  },
  {
    icon: Mail,
    label: "E-Mail",
    value: "info@speckmann-webdesign.de",
    href: "mailto:info@speckmann-webdesign.de",
  },
  {
    icon: MapPin,
    label: "Standort",
    value: "Oldenburg, Deutschland",
  },
]

/* ─────────────────────── Seite ─────────────────────── */

export default function KontaktPage() {
  return (
    <>
      {/* ───── 1. HERO ───── */}
      <section className="bg-[#F7F8FB] pt-20 pb-16 px-6">
        <div className="max-w-[1120px] mx-auto text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.02em] text-[#111827]">
            Kontakt
          </h1>
          <p className="mt-4 text-lg text-[#4B5563] max-w-[640px] mx-auto">
            Sie haben Fragen zu Immobilien-Rechner oder möchten
            zusammenarbeiten? Wir freuen uns auf Ihre Nachricht.
          </p>
        </div>
      </section>

      {/* ───── 2. KONTAKT-INFO ───── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[640px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] mb-8">
            So erreichen Sie uns
          </h2>
          <div className="space-y-6">
            {contactItems.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F7F8FB]">
                  <item.icon className="h-5 w-5 text-[#4B5563]" />
                </div>
                <div>
                  <p className="text-sm text-[#9CA3AF]">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[#111827] font-medium hover:text-[#4338CA] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[#111827] font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 3. CTA ───── */}
      <section className="bg-[#0B0D14] py-24 px-6">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#F1F5F9] mb-4">
            Haben Sie Fragen?
          </h2>
          <p className="text-[#94A3B8] mb-8">
            Schreiben Sie uns eine E-Mail — wir antworten in der Regel innerhalb
            von 24 Stunden.
          </p>
          <a
            href="mailto:info@speckmann-webdesign.de"
            className="inline-flex items-center gap-2 bg-[#4338CA] text-white font-medium px-8 py-3.5 rounded-lg hover:bg-[#5B52E0] transition-colors duration-300"
          >
            E-Mail schreiben
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  )
}
