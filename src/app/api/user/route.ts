import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

// GET /api/user — Profildaten des eingeloggten Nutzers
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Nicht authentifiziert." },
        { status: 401 }
      )
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        company: true,
        vatId: true,
        street: true,
        city: true,
        zip: true,
        country: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Nutzer nicht gefunden." },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Fehler beim Laden des Profils:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    )
  }
}

// PATCH /api/user — Profildaten aktualisieren
export async function PATCH(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Nicht authentifiziert." },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, company, vatId, street, city, zip } = body

    const updated = await db.user.update({
      where: { id: session.user.id },
      data: {
        ...(name !== undefined && { name }),
        ...(company !== undefined && { company }),
        ...(vatId !== undefined && { vatId }),
        ...(street !== undefined && { street }),
        ...(city !== undefined && { city }),
        ...(zip !== undefined && { zip }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        vatId: true,
        street: true,
        city: true,
        zip: true,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Profils:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    )
  }
}

// DELETE /api/user — Account löschen (DSGVO Art. 17)
export async function DELETE() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Nicht authentifiziert." },
        { status: 401 }
      )
    }

    // Alle Daten löschen (Cascade in Prisma Schema erledigt den Rest)
    await db.user.delete({
      where: { id: session.user.id },
    })

    // TODO: Bei Stripe-Integration auch Subscription canceln

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Fehler beim Löschen des Accounts:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    )
  }
}
