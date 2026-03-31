import { EmbedKeyManager } from "./embed-key-manager"

export const metadata = {
  title: "Einbettung — Rechner auf Ihrer Website",
}

export default function EinbettungPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#111827]">Einbettung</h1>
        <p className="mt-1 text-sm text-[#4B5563]">
          Binden Sie Immobilien-Rechner als Widget auf Ihrer Website ein — mit
          nur einer Zeile Code.
        </p>
      </div>

      {/* Schritt-fuer-Schritt Anleitung */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4338CA] text-sm font-bold text-white">
            1
          </div>
          <h3 className="mt-3 text-sm font-bold text-[#111827]">
            Embed-Key erstellen
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[#9CA3AF]">
            Erstellen Sie einen API-Key und waehlen Sie den gewuenschten Rechner
            aus.
          </p>
        </div>
        <div className="rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4338CA] text-sm font-bold text-white">
            2
          </div>
          <h3 className="mt-3 text-sm font-bold text-[#111827]">
            Code kopieren
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[#9CA3AF]">
            Kopieren Sie den Script-Tag oder iFrame-Code aus der Karte unten.
          </p>
        </div>
        <div className="rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4338CA] text-sm font-bold text-white">
            3
          </div>
          <h3 className="mt-3 text-sm font-bold text-[#111827]">
            Auf Website einfuegen
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[#9CA3AF]">
            Fuegen Sie den Code an der gewuenschten Stelle in Ihre Website ein.
            Fertig!
          </p>
        </div>
      </div>

      <EmbedKeyManager />
    </div>
  )
}
