import { notFound } from "next/navigation"
import { getToolBySlug } from "@/lib/tools"
import { db } from "@/lib/db"
import { getCachedValidation, setCachedValidation } from "@/lib/embed-cache"
import { EmbedWrapper } from "./embed-wrapper"
import { EmbedError } from "./embed-error"

type Params = Promise<{ tool: string }>
type SearchParams = Promise<{ key?: string }>

export default async function EmbedPage({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { tool } = await params
  const { key } = await searchParams

  // Tool prüfen
  const toolInfo = getToolBySlug(tool)
  if (!toolInfo) {
    notFound()
  }

  // Ohne API-Key → Fehler
  if (!key) {
    return <EmbedError message="API-Key fehlt." />
  }

  // Validierung: erst Cache prüfen, dann DB
  const validation = await validateEmbedKey(key, tool)

  if (!validation.valid) {
    return <EmbedError message={validation.errorMessage || "Zugriff verweigert."} />
  }

  // Nutzung tracken (async, blockiert nicht das Rendering)
  trackUsage(key, tool)

  return (
    <EmbedWrapper
      toolSlug={tool}
      styling={validation.styling}
    />
  )
}

// Serverseitige Validierung mit 24-Stunden-Cache
async function validateEmbedKey(apiKey: string, tool: string) {
  // 1. Cache prüfen
  const cached = getCachedValidation(apiKey)
  if (cached) {
    // Beim Cache-Hit trotzdem prüfen, ob das angefragte Tool erlaubt ist
    if (cached.selectedTool && cached.selectedTool !== tool) {
      return {
        valid: false,
        errorMessage: "Dieses Tool ist nicht für diesen Embed-Key freigegeben.",
        styling: cached.styling,
      }
    }
    return cached
  }

  // 2. DB-Abfrage (passiert nur 1x pro Tag pro Key)
  const embedKey = await db.embedKey.findUnique({
    where: { apiKey },
    include: {
      user: {
        include: { subscription: true },
      },
    },
  })

  if (!embedKey) {
    const result = {
      valid: false as const,
      errorMessage: "Ungültiger API-Key.",
      styling: { primaryColor: "#2563eb", darkMode: false },
      selectedTool: null,
    }
    setCachedValidation(apiKey, result)
    return result
  }

  if (!embedKey.isActive) {
    const result = {
      valid: false as const,
      errorMessage: "Dieser Embed-Key ist deaktiviert.",
      styling: { primaryColor: embedKey.primaryColor, darkMode: embedKey.darkMode },
      selectedTool: embedKey.selectedTool,
    }
    setCachedValidation(apiKey, result)
    return result
  }

  // Abo prüfen
  const subscription = embedKey.user.subscription
  const plan = subscription?.plan ?? "STARTER"
  const status = subscription?.status ?? "TRIAL"
  const isActive = status === "TRIAL" || status === "ACTIVE"

  if (!isActive) {
    const result = {
      valid: false as const,
      errorMessage: "Dieser Rechner benötigt ein aktives Abo.",
      styling: { primaryColor: embedKey.primaryColor, darkMode: embedKey.darkMode },
      selectedTool: embedKey.selectedTool,
    }
    setCachedValidation(apiKey, result)
    return result
  }

  if (plan === "STARTER" && status !== "TRIAL") {
    const result = {
      valid: false as const,
      errorMessage: "Das Starter-Abo enthält keine Embed-Funktion.",
      styling: { primaryColor: embedKey.primaryColor, darkMode: embedKey.darkMode },
      selectedTool: embedKey.selectedTool,
    }
    setCachedValidation(apiKey, result)
    return result
  }

  // Trial abgelaufen?
  if (status === "TRIAL" && subscription?.trialEndsAt) {
    if (new Date() > subscription.trialEndsAt) {
      const result = {
        valid: false as const,
        errorMessage: "Der Testzeitraum ist abgelaufen.",
        styling: { primaryColor: embedKey.primaryColor, darkMode: embedKey.darkMode },
        selectedTool: embedKey.selectedTool,
      }
      setCachedValidation(apiKey, result)
      return result
    }
  }

  // Tool-Berechtigung
  if (embedKey.selectedTool && embedKey.selectedTool !== tool) {
    // Diesen spezifischen Fehler NICHT cachen — der Key selbst ist gültig
    return {
      valid: false as const,
      errorMessage: "Dieses Tool ist nicht für diesen Embed-Key freigegeben.",
      styling: { primaryColor: embedKey.primaryColor, darkMode: embedKey.darkMode },
      selectedTool: embedKey.selectedTool,
    }
  }

  // Alles okay → Ergebnis cachen
  const result = {
    valid: true as const,
    styling: { primaryColor: embedKey.primaryColor, darkMode: embedKey.darkMode },
    selectedTool: embedKey.selectedTool,
  }
  setCachedValidation(apiKey, result)
  return result
}

// Nutzung im Hintergrund tracken (nicht blockierend)
async function trackUsage(apiKey: string, tool: string) {
  try {
    const embedKey = await db.embedKey.findUnique({
      where: { apiKey },
      select: { userId: true },
    })
    if (embedKey) {
      await db.toolUsage.create({
        data: {
          userId: embedKey.userId,
          toolSlug: tool,
          source: "embed",
        },
      })
    }
  } catch {
    // Tracking-Fehler nicht an den Besucher weitergeben
  }
}
