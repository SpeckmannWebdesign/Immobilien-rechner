import { ProfilForm } from "./profil-form"

export const metadata = {
  title: "Profil",
}

export default function ProfilPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Profil</h1>
        <p className="text-muted-foreground">
          Verwalten Sie Ihre persönlichen Daten und Rechnungsinformationen.
        </p>
      </div>

      <ProfilForm />
    </div>
  )
}
