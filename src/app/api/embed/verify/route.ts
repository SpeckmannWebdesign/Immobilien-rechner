import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { signEmbedToken } from "@/lib/jwt"
import { getToolBySlug } from "@/lib/tools"

// POST /api/embed/verify — Embed-Lizenz prüfen und JWT-Token ausstellen
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { apiKey, tool } = body

    if (!apiKey) {
      return NextResponse.json(
        { error: "API-Key fehlt." },
        { status: 400 }
      )
    }

    if (!tool || !getToolBySlug(tool)) {
      return NextResponse.json(
        { error: "Ungültiger Rechner." },
        { status: 400 }
      )
    }

    // Domain aus Origin- oder Referer-Header extrahieren
    const origin = request.headers.get("origin") || ""
    const referer = request.headers.get("referer") || ""
    const requestDomain = extractDomain(origin || referer)

    // Embed-Key in der Datenbank suchen
    const embedKey = await db.embedKey.findUnique({
      where: { apiKey },
      include: {
        user: {
          include: {
            subscription: true,
          },
        },
      },
    })

    if (!embedKey) {
      return corsResponse(
        { error: "Ungültiger API-Key." },
        400,
        origin
      )
    }

    // Key aktiv?
    if (!embedKey.isActive) {
      return corsResponse(
        { error: "Dieser Embed-Key ist deaktiviert." },
        403,
        origin
      )
    }

    // Abo-Status prüfen
    const subscription = embedKey.user.subscription
    const plan = subscription?.plan ?? "STARTER"
    const status = subscription?.status ?? "TRIAL"

    const isSubscriptionActive = status === "TRIAL" || status === "ACTIVE"

    if (!isSubscriptionActive) {
      return corsResponse(
        { error: "Kein aktives Abo vorhanden.", code: "SUBSCRIPTION_INACTIVE" },
        403,
        origin
      )
    }

    // Starter-Plan hat keine Embed-Funktion (außer im Trial)
    if (plan === "STARTER" && status !== "TRIAL") {
      return corsResponse(
        { error: "Das Starter-Abo enthält keine Embed-Funktion.", code: "PLAN_INSUFFICIENT" },
        403,
        origin
      )
    }

    // Trial abgelaufen?
    if (status === "TRIAL" && subscription?.trialEndsAt) {
      if (new Date() > subscription.trialEndsAt) {
        return corsResponse(
          { error: "Der Testzeitraum ist abgelaufen.", code: "TRIAL_EXPIRED" },
          403,
          origin
        )
      }
    }

    // Tool-Berechtigung prüfen (Pro: nur ausgewähltes Tool, Business: alle)
    if (embedKey.selectedTool && embedKey.selectedTool !== tool) {
      return corsResponse(
        { error: "Dieses Tool ist nicht für diesen Embed-Key freigegeben.", code: "TOOL_NOT_ALLOWED" },
        403,
        origin
      )
    }

    // Domain-Whitelist prüfen (leere Liste = alle Domains erlaubt)
    if (embedKey.allowedDomains.length > 0 && requestDomain) {
      const domainAllowed = embedKey.allowedDomains.some((allowed) =>
        matchDomain(requestDomain, allowed)
      )

      if (!domainAllowed) {
        return corsResponse(
          { error: "Diese Domain ist nicht freigegeben.", code: "DOMAIN_NOT_ALLOWED" },
          403,
          origin
        )
      }
    }

    // Alles okay — JWT-Token ausstellen
    const token = signEmbedToken({
      apiKey: embedKey.apiKey,
      userId: embedKey.userId,
      tool: embedKey.selectedTool,
      domains: embedKey.allowedDomains,
      plan,
    })

    // Nutzung tracken
    await db.toolUsage.create({
      data: {
        userId: embedKey.userId,
        toolSlug: tool,
        source: "embed",
      },
    })

    return corsResponse(
      {
        token,
        styling: {
          primaryColor: embedKey.primaryColor,
          darkMode: embedKey.darkMode,
        },
      },
      200,
      origin
    )
  } catch (error) {
    console.error("Fehler bei Embed-Verifizierung:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    )
  }
}

// OPTIONS für CORS-Preflight
export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin") || ""
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  })
}

// Hilfsfunktion: Domain aus URL extrahieren
function extractDomain(url: string): string {
  try {
    if (!url) return ""
    const parsed = new URL(url)
    return parsed.hostname
  } catch {
    return url.replace(/^https?:\/\//, "").split("/")[0].split(":")[0]
  }
}

// Hilfsfunktion: Domain-Matching (unterstützt Wildcard-Subdomains)
function matchDomain(requestDomain: string, allowedDomain: string): boolean {
  const cleanAllowed = allowedDomain.trim().toLowerCase()
  const cleanRequest = requestDomain.trim().toLowerCase()

  // Exakter Match
  if (cleanRequest === cleanAllowed) return true

  // Wildcard: *.example.com matcht sub.example.com
  if (cleanAllowed.startsWith("*.")) {
    const baseDomain = cleanAllowed.slice(2)
    return cleanRequest.endsWith(baseDomain) && cleanRequest !== baseDomain
  }

  // www-Variante automatisch erlauben
  if (cleanRequest === `www.${cleanAllowed}` || `www.${cleanRequest}` === cleanAllowed) {
    return true
  }

  return false
}

// Hilfsfunktion: Response mit CORS-Headern
function corsResponse(data: Record<string, unknown>, status: number, origin: string) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
