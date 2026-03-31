import { AboVerwaltung } from "./abo-verwaltung"

export const metadata = {
  title: "Abo verwalten",
}

export default function AboPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Abo verwalten</h1>
        <p className="text-[#4B5563]">
          Verwalten Sie Ihren Plan und Ihre Rechnungen.
        </p>
      </div>

      <AboVerwaltung />
    </div>
  )
}
