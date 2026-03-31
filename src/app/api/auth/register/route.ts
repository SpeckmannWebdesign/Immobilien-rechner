import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { error: "E-Mail und Passwort (min. 8 Zeichen) sind erforderlich." },
        { status: 400 }
      )
    }

    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: "Diese E-Mail-Adresse ist bereits registriert." },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await db.user.create({
      data: { name, email, password: hashedPassword },
    })

    return NextResponse.json({ success: true, userId: user.id })
  } catch {
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 }
    )
  }
}
