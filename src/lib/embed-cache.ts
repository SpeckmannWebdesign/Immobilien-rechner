// Einfacher serverseitiger Cache für Embed-Validierungen
// Pro API-Key wird das Ergebnis 24 Stunden gespeichert.
// Bei z.B. 100 Kunden = maximal 100 Cache-Einträge im Speicher.

interface CacheEntry {
  valid: boolean
  errorMessage?: string
  styling: {
    primaryColor: string
    darkMode: boolean
  }
  selectedTool: string | null
  expiresAt: number
}

const cache = new Map<string, CacheEntry>()

// Cache-Dauer: 24 Stunden (in Millisekunden)
const CACHE_TTL = 24 * 60 * 60 * 1000

export function getCachedValidation(apiKey: string): CacheEntry | null {
  const entry = cache.get(apiKey)
  if (!entry) return null

  // Abgelaufen? Löschen und null zurückgeben
  if (Date.now() > entry.expiresAt) {
    cache.delete(apiKey)
    return null
  }

  return entry
}

export function setCachedValidation(apiKey: string, entry: Omit<CacheEntry, "expiresAt">) {
  cache.set(apiKey, {
    ...entry,
    expiresAt: Date.now() + CACHE_TTL,
  })
}

// Cache für einen bestimmten Key ungültig machen (z.B. bei Abo-Kündigung via Webhook)
export function invalidateCache(apiKey: string) {
  cache.delete(apiKey)
}

// Ganzen Cache leeren (z.B. beim Neustart)
export function clearCache() {
  cache.clear()
}
