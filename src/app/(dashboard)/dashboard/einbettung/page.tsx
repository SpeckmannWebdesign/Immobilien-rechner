import { EmbedKeyManager } from "./embed-key-manager"

export const metadata = {
  title: "Einbettung — Rechner auf Ihrer Website",
}

export default function EinbettungPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Einbettung</h1>
        <p className="text-muted-foreground">
          Binden Sie Immobilien-Rechner als Widget auf Ihrer Website ein — mit
          nur einer Zeile Code.
        </p>
      </div>

      <EmbedKeyManager />
    </div>
  )
}
