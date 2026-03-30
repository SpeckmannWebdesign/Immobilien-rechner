import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

// GET /api/analytics — Nutzungsstatistiken für den eingeloggten Nutzer
export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Nicht authentifiziert." },
        { status: 401 }
      )
    }

    const url = new URL(request.url)
    const days = parseInt(url.searchParams.get("days") || "30", 10)

    const since = new Date()
    since.setDate(since.getDate() - days)

    // Nutzungsdaten abrufen
    const usages = await db.toolUsage.findMany({
      where: {
        userId: session.user.id,
        usedAt: { gte: since },
      },
      orderBy: { usedAt: "desc" },
    })

    // Nach Tool gruppieren
    const byTool: Record<string, { dashboard: number; embed: number; total: number }> = {}
    for (const usage of usages) {
      if (!byTool[usage.toolSlug]) {
        byTool[usage.toolSlug] = { dashboard: 0, embed: 0, total: 0 }
      }
      byTool[usage.toolSlug].total++
      if (usage.source === "embed") {
        byTool[usage.toolSlug].embed++
      } else {
        byTool[usage.toolSlug].dashboard++
      }
    }

    // Nach Tag gruppieren (für Chart)
    const byDay: Record<string, { dashboard: number; embed: number }> = {}
    for (const usage of usages) {
      const day = usage.usedAt.toISOString().split("T")[0]
      if (!byDay[day]) {
        byDay[day] = { dashboard: 0, embed: 0 }
      }
      if (usage.source === "embed") {
        byDay[day].embed++
      } else {
        byDay[day].dashboard++
      }
    }

    // Tages-Daten als sortiertes Array
    const dailyData = Object.entries(byDay)
      .map(([date, counts]) => ({
        date,
        ...counts,
        total: counts.dashboard + counts.embed,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // Gesamtzahlen
    const totals = {
      total: usages.length,
      dashboard: usages.filter((u) => u.source === "dashboard").length,
      embed: usages.filter((u) => u.source === "embed").length,
    }

    return NextResponse.json({
      totals,
      byTool,
      dailyData,
      period: days,
    })
  } catch (error) {
    console.error("Fehler beim Laden der Analytics:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    )
  }
}
