import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { getToolBySlug } from "@/lib/tools"

// GET /api/embed/keys — Alle Embed-Keys des Nutzers abrufen
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Nicht authentifiziert." },
        { status: 401 }
      )
    }

    const keys = await db.embedKey.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(keys)
  } catch (error) {
    console.error("Fehler beim Laden der Embed-Keys:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    )
  }
}

// POST /api/embed/keys — Neuen Embed-Key erstellen
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Nicht authentifiziert." },
        { status: 401 }
      )
    }

    // Abo-Status prüfen — nur Pro und Business dürfen Embeds erstellen
    const subscription = await db.subscription.findUnique({
      where: { userId: session.user.id },
    })

    const plan = subscription?.plan ?? "STARTER"
    const status = subscription?.status ?? "TRIAL"

    // Während Trial dürfen alle Embed-Features getestet werden
    const hasActiveSubscription =
      status === "TRIAL" || status === "ACTIVE"

    if (!hasActiveSubscription) {
      return NextResponse.json(
        { error: "Ein aktives Abo wird benötigt, um Rechner einzubetten." },
        { status: 403 }
      )
    }

    if (plan === "STARTER" && status !== "TRIAL") {
      return NextResponse.json(
        {
          error:
            "Das Starter-Abo enthält keine Embed-Funktion. Bitte upgraden Sie auf Pro oder Business.",
        },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, allowedDomains, selectedTool, primaryColor, darkMode } = body

    // Validierungen
    if (selectedTool && !getToolBySlug(selectedTool)) {
      return NextResponse.json(
        { error: "Ungültiger Rechner ausgewählt." },
        { status: 400 }
      )
    }

    // Pro-Plan: Nur 1 Tool erlaubt
    if (plan === "PRO" && !selectedTool) {
      return NextResponse.json(
        {
          error:
            "Im Pro-Plan müssen Sie einen bestimmten Rechner auswählen. Für alle Rechner upgraden Sie auf Business.",
        },
        { status: 400 }
      )
    }

    // Domains validieren
    const domains = Array.isArray(allowedDomains)
      ? allowedDomains.filter((d: string) => d.trim().length > 0)
      : []

    const key = await db.embedKey.create({
      data: {
        userId: session.user.id,
        name: name || "Standard",
        allowedDomains: domains,
        selectedTool: plan === "BUSINESS" ? null : selectedTool || null,
        primaryColor: primaryColor || "#2563eb",
        darkMode: darkMode ?? false,
      },
    })

    return NextResponse.json(key, { status: 201 })
  } catch (error) {
    console.error("Fehler beim Erstellen des Embed-Keys:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    )
  }
}
