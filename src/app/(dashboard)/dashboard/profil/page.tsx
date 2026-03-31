import { ProfilForm } from "./profil-form"

export const metadata = {
  title: "Profil",
}

export default function ProfilPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#111827]">Profil</h1>
        <p className="mt-1 text-sm text-[#4B5563]">
          Verwalten Sie Ihre persoenlichen Daten und Rechnungsinformationen.
        </p>
      </div>

      <ProfilForm />
    </div>
  )
}
