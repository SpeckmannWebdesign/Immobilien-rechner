import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { getToolBySlug } from "@/lib/tools"

type Params = Promise<{ id: string }>

// PATCH /api/embed/keys/[id] — Embed-Key aktualisieren
export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Nicht authentifiziert." },
        { status: 401 }
      )
    }

    const { id } = await params

    // Prüfen ob der Key dem Nutzer gehört
    const existing = await db.embedKey.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Embed-Key nicht gefunden." },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { name, allowedDomains, selectedTool, primaryColor, darkMode, isActive } = body

    // Tool validieren wenn angegeben
    if (selectedTool !== undefined && selectedTool !== null && !getToolBySlug(selectedTool)) {
      return NextResponse.json(
        { error: "Ungültiger Rechner ausgewählt." },
        { status: 400 }
      )
    }

    // Domains validieren
    const domains = Array.isArray(allowedDomains)
      ? allowedDomains.filter((d: string) => d.trim().length > 0)
      : undefined

    const updated = await db.embedKey.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(domains !== undefined && { allowedDomains: domains }),
        ...(selectedTool !== undefined && { selectedTool }),
        ...(primaryColor !== undefined && { primaryColor }),
        ...(darkMode !== undefined && { darkMode }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Embed-Keys:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    )
  }
}

// DELETE /api/embed/keys/[id] — Embed-Key löschen
export async function DELETE(_request: Request, { params }: { params: Params }) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Nicht authentifiziert." },
        { status: 401 }
      )
    }

    const { id } = await params

    // Prüfen ob der Key dem Nutzer gehört
    const existing = await db.embedKey.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Embed-Key nicht gefunden." },
        { status: 404 }
      )
    }

    await db.embedKey.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Fehler beim Löschen des Embed-Keys:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    )
  }
}
