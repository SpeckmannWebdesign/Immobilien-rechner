import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

// GET: Alle Nutzer laden (nur für Admins)
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Nicht authentifiziert" },
        { status: 401 }
      )
    }

    // Admin-Check: User aus DB laden und role prüfen
    const currentUser = await db.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    })

    if (currentUser?.role !== "admin") {
      return NextResponse.json(
        { error: "Keine Berechtigung" },
        { status: 403 }
      )
    }

    // Alle User laden, sortiert nach Erstelldatum (neueste zuerst)
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        plan: true,
        trialEndsAt: true,
        planExpiresAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Admin-Users GET Fehler:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler" },
      { status: 500 }
    )
  }
}
