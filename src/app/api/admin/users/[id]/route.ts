import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

// PATCH: User-Plan manuell ändern (nur für Admins)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Nicht authentifiziert" },
        { status: 401 }
      )
    }

    // Admin-Check
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

    const { id } = await params
    const body = await request.json()
    const { plan, planExpiresAt } = body

    // Plan validieren
    const allowedPlans = ["trial", "starter", "pro", "business"]
    if (!plan || !allowedPlans.includes(plan)) {
      return NextResponse.json(
        { error: "Ungültiger Plan. Erlaubt: trial, starter, pro, business" },
        { status: 400 }
      )
    }

    // User aktualisieren
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        plan,
        planExpiresAt: planExpiresAt ? new Date(planExpiresAt) : null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        planExpiresAt: true,
      },
    })

    return NextResponse.json({
      message: "Plan erfolgreich aktualisiert",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Admin-Users PATCH Fehler:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler" },
      { status: 500 }
    )
  }
}
