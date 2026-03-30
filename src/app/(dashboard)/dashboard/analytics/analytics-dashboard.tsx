"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { tools as allTools } from "@/lib/tools"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Calculator, Code2, Activity, BarChart3 } from "lucide-react"

interface AnalyticsData {
  totals: { total: number; dashboard: number; embed: number }
  byTool: Record<string, { dashboard: number; embed: number; total: number }>
  dailyData: Array<{
    date: string
    dashboard: number
    embed: number
    total: number
  }>
  period: number
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState(30)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/analytics?days=${period}`)
      if (res.ok) {
        setData(await res.json())
      }
    } catch {
      // Fehler still ignorieren
    } finally {
      setLoading(false)
    }
  }, [period])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 w-24 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            Analytics konnten nicht geladen werden.
          </p>
        </CardContent>
      </Card>
    )
  }

  // Chart-Daten formatieren
  const chartData = data.dailyData.map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
    }),
  }))

  // Tool-Nutzung sortiert nach Gesamt
  const toolRanking = Object.entries(data.byTool)
    .map(([slug, counts]) => ({
      slug,
      name: allTools.find((t) => t.slug === slug)?.shortName || slug,
      ...counts,
    }))
    .sort((a, b) => b.total - a.total)

  return (
    <div className="space-y-6">
      {/* Zeitraum-Auswahl */}
      <div className="flex gap-2">
        {[7, 30, 90].map((days) => (
          <Button
            key={days}
            variant={period === days ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod(days)}
          >
            {days} Tage
          </Button>
        ))}
      </div>

      {/* Übersicht-Karten */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Berechnungen gesamt
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totals.total}</div>
            <p className="text-xs text-muted-foreground">
              Letzten {period} Tage
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Dashboard</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totals.dashboard}</div>
            <p className="text-xs text-muted-foreground">
              Eigene Nutzung
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Embed-Aufrufe</CardTitle>
            <Code2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totals.embed}</div>
            <p className="text-xs text-muted-foreground">
              Von Ihrer Website
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      {chartData.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Nutzungsverlauf</CardTitle>
            <CardDescription>
              Berechnungen pro Tag (Dashboard vs. Embed)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--popover))",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="dashboard"
                    name="Dashboard"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="embed"
                    name="Embed"
                    fill="hsl(var(--primary) / 0.5)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Noch keine Daten</h3>
            <p className="text-muted-foreground text-sm">
              Sobald Sie Rechner nutzen oder einbetten, erscheinen hier Ihre
              Statistiken.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Top-Rechner */}
      {toolRanking.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Beliebteste Rechner</CardTitle>
            <CardDescription>
              Sortiert nach Nutzungshäufigkeit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {toolRanking.map((tool, index) => (
                <div
                  key={tool.slug}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-6">
                      {index + 1}.
                    </span>
                    <span className="text-sm font-medium">{tool.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {tool.dashboard} Dashboard
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {tool.embed} Embed
                    </Badge>
                    <span className="text-sm font-bold w-8 text-right">
                      {tool.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
