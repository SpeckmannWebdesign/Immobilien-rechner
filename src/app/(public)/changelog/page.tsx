import type { Metadata } from "next"

/* ─────────────────────── Metadata ─────────────────────── */

export const metadata: Metadata = {
  title: "Changelog | Immobilien-Rechner",
  description:
    "Alle Neuigkeiten und Updates von Immobilien-Rechner auf einen Blick. Neue Rechner, Funktionen und Verbesserungen.",
  robots: { index: false, follow: true },
}

/* ─────────────────────── Changelog-Daten ─────────────────────── */

interface ChangelogEntry {
  date: string
  title: string
  items: string[]
}

const entries: ChangelogEntry[] = [
  {
    date: "März 2026",
    title: "Launch von Immobilien-Rechner",
    items: [
      "Start mit 16 professionellen Immobilien-Rechnern",
      "Mix-Design mit modernem, professionellem Interface",
      "SEO-optimierte Landingpages für alle Rechner",
      "Embed-Widgets für die Einbettung auf externen Websites",
      "PDF-Export für Berechnungsergebnisse",
      "DSGVO-konforme Infrastruktur auf deutschen Servern (Hetzner)",
      "14-tägige kostenlose Testphase ohne Kreditkarte",
    ],
  },
]

/* ─────────────────────── Seite ─────────────────────── */

export default function ChangelogPage() {
  return (
    <>
      {/* ───── 1. HERO ───── */}
      <section className="bg-[#F7F8FB] pt-20 pb-16 px-6">
        <div className="max-w-[1120px] mx-auto text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.02em] text-[#111827]">
            Changelog
          </h1>
          <p className="mt-4 text-lg text-[#4B5563] max-w-[640px] mx-auto">
            Alle Neuigkeiten und Updates von Immobilien-Rechner auf einen Blick.
          </p>
        </div>
      </section>

      {/* ───── 2. TIMELINE ───── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="relative">
            {/* Vertikale Linie */}
            <div className="absolute left-[79px] top-0 bottom-0 w-px bg-[#E3E5EB] hidden md:block" />

            <div className="space-y-12">
              {entries.map((entry) => (
                <div
                  key={entry.date}
                  className="relative flex flex-col md:flex-row gap-6"
                >
                  {/* Datums-Badge */}
                  <div className="flex-shrink-0 md:w-[160px] flex md:justify-end">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#F7F8FB] text-sm font-semibold text-[#4338CA]">
                      {entry.date}
                    </span>
                  </div>

                  {/* Punkt auf der Linie */}
                  <div className="hidden md:flex absolute left-[75px] top-2 w-[9px] h-[9px] rounded-full bg-[#4338CA] ring-4 ring-white" />

                  {/* Inhalt */}
                  <div className="flex-1 md:pl-6">
                    <h2 className="text-xl font-bold text-[#111827] mb-3">
                      {entry.title}
                    </h2>
                    <ul className="space-y-2">
                      {entry.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[#4B5563]"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#9CA3AF] mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
