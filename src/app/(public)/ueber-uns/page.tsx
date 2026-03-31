import Link from "next/link"
import { ArrowRight, Calculator, Shield, Server, MapPin } from "lucide-react"
import type { Metadata } from "next"

/* ─────────────────────── Metadata ─────────────────────── */

export const metadata: Metadata = {
  title: "Über uns | Immobilien-Rechner von Speckmann Webdesign",
  description:
    "Erfahren Sie, wer hinter Immobilien-Rechner steckt. Die Speckmann Webdesign GmbH aus Oldenburg entwickelt professionelle Tools für die Immobilienbranche.",
}

/* ─────────────────────── Zahlen-Daten ─────────────────────── */

const stats = [
  {
    icon: Calculator,
    value: "16",
    label: "Professionelle Rechner",
  },
  {
    icon: Shield,
    value: "100 %",
    label: "DSGVO-konform",
  },
  {
    icon: Server,
    value: "Hetzner",
    label: "Made in Germany",
  },
  {
    icon: MapPin,
    value: "Oldenburg",
    label: "Unser Standort",
  },
]

/* ─────────────────────── Seite ─────────────────────── */

export default function UeberUnsPage() {
  return (
    <>
      {/* ───── 1. HERO ───── */}
      <section className="bg-[#F7F8FB] pt-20 pb-16 px-6">
        <div className="max-w-[1120px] mx-auto text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.02em] text-[#111827]">
            Über Immobilien-Rechner
          </h1>
          <p className="mt-4 text-lg text-[#4B5563] max-w-[640px] mx-auto">
            Professionelle Immobilien-Tools aus Oldenburg — entwickelt von einer
            Agentur, die versteht, was die Branche wirklich braucht.
          </p>
        </div>
      </section>

      {/* ───── 2. STORY ───── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] mb-6">
            Wer steckt dahinter?
          </h2>
          <div className="space-y-4 text-[#4B5563] leading-relaxed">
            <p>
              Hinter Immobilien-Rechner steht die{" "}
              <strong className="text-[#111827]">
                Speckmann Webdesign GmbH
              </strong>{" "}
              aus Oldenburg. Wir sind eine Webdesign-Agentur, die sich auf
              professionelle Websites und Web-Applikationen spezialisiert hat.
            </p>
            <p>
              Gegründet von{" "}
              <strong className="text-[#111827]">Marcel Speckmann</strong>,
              entwickeln wir digitale Produkte, die nicht nur gut aussehen,
              sondern echten Mehrwert liefern. Mit Immobilien-Rechner bringen
              wir diesen Anspruch in die Immobilienbranche.
            </p>
            <p>
              Unsere Erfahrung aus zahlreichen Webprojekten fließt direkt in die
              Entwicklung ein: Jeder Rechner ist durchdacht, benutzerfreundlich
              und technisch auf dem neuesten Stand.
            </p>
          </div>
        </div>
      </section>

      {/* ───── 3. MISSION ───── */}
      <section className="bg-[#F7F8FB] py-24 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] mb-6">
            Was treibt uns an?
          </h2>
          <div className="space-y-4 text-[#4B5563] leading-relaxed">
            <p>
              Wir haben festgestellt, dass es im deutschsprachigen Raum kaum
              professionelle Immobilien-Rechner gibt. Die meisten Tools sind
              entweder veraltet, unpräzise oder so überladen, dass sie mehr
              verwirren als helfen.
            </p>
            <p>
              Unser Ziel ist es, Rechner zu bauen, die{" "}
              <strong className="text-[#111827]">wirklich funktionieren</strong>.
              Keine hübschen Spielereien, sondern präzise Werkzeuge, die Makler,
              Investoren und Hausverwaltungen im Alltag tatsächlich
              weiterbringen.
            </p>
            <p>
              Jeder unserer 16 Rechner wurde mit Branchenexperten entwickelt und
              basiert auf aktuellen deutschen Steuer- und Rechtsgrundlagen. Das
              Ergebnis: verlässliche Berechnungen, denen Sie vertrauen können.
            </p>
          </div>
        </div>
      </section>

      {/* ───── 4. ZAHLEN ───── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#111827] text-center mb-12">
            Immobilien-Rechner in Zahlen
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#F7F8FB] mb-4">
                  <stat.icon className="h-6 w-6 text-[#4B5563]" />
                </div>
                <p className="text-2xl font-bold text-[#111827]">
                  {stat.value}
                </p>
                <p className="text-sm text-[#9CA3AF] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 5. CTA ───── */}
      <section className="bg-[#0B0D14] py-24 px-6">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-[#F1F5F9] mb-4">
            Überzeugen Sie sich selbst
          </h2>
          <p className="text-[#94A3B8] mb-8">
            Testen Sie alle 16 Rechner 7 Tage lang kostenlos. Keine
            Kreditkarte, keine Verpflichtung.
          </p>
          <Link
            href="/anmelden"
            className="inline-flex items-center gap-2 bg-[#4338CA] text-white font-medium px-8 py-3.5 rounded-lg hover:bg-[#5B52E0] transition-colors duration-300"
          >
            7 Tage kostenlos testen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
