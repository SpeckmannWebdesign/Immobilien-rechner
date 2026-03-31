"use client"

import { useEffect, useState, useCallback } from "react"
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-5"
          >
            <div className="h-4 w-24 rounded bg-[#E3E5EB]" />
            <div className="mt-3 h-8 w-16 rounded bg-[#E3E5EB]" />
          </div>
        ))}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-12 text-center">
        <BarChart3 className="h-12 w-12 text-[#9CA3AF]" />
        <p className="mt-4 text-sm font-medium text-[#9CA3AF]">
          Analytics konnten nicht geladen werden.
        </p>
      </div>
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
          <button
            key={days}
            onClick={() => setPeriod(days)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              period === days
                ? "bg-[#4338CA] text-white"
                : "border border-[#E3E5EB] bg-white text-[#4B5563] hover:border-[#CACDD6]"
            }`}
          >
            {days} Tage
          </button>
        ))}
      </div>

      {/* Bento-Metriken */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#9CA3AF]">
              Berechnungen gesamt
            </span>
            <Activity className="h-4 w-4 text-[#9CA3AF]" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-[#111827]">
            {data.totals.total}
          </p>
          <p className="mt-1 text-xs text-[#9CA3AF]">
            Letzten {period} Tage
          </p>
        </div>

        <div className="rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#9CA3AF]">
              Dashboard
            </span>
            <Calculator className="h-4 w-4 text-[#9CA3AF]" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-[#111827]">
            {data.totals.dashboard}
          </p>
          <p className="mt-1 text-xs text-[#9CA3AF]">Eigene Nutzung</p>
        </div>

        <div className="rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#9CA3AF]">
              Embed-Aufrufe
            </span>
            <Code2 className="h-4 w-4 text-[#9CA3AF]" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-[#111827]">
            {data.totals.embed}
          </p>
          <p className="mt-1 text-xs text-[#9CA3AF]">Von Ihrer Website</p>
        </div>
      </div>

      {/* Chart */}
      {chartData.length > 0 ? (
        <div className="rounded-xl border border-[#E3E5EB] bg-white p-6">
          <h3 className="text-base font-bold text-[#111827]">
            Nutzungsverlauf
          </h3>
          <p className="mt-1 text-xs text-[#9CA3AF]">
            Berechnungen pro Tag (Dashboard vs. Embed)
          </p>
          <div className="mt-4 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E3E5EB"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  axisLine={{ stroke: "#E3E5EB" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #E3E5EB",
                    backgroundColor: "#fff",
                    color: "#111827",
                    fontSize: "13px",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "13px", color: "#4B5563" }}
                />
                <Bar
                  dataKey="dashboard"
                  name="Dashboard"
                  fill="#4338CA"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="embed"
                  name="Embed"
                  fill="#4338CA"
                  opacity={0.35}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
            <BarChart3 className="h-6 w-6 text-[#9CA3AF]" />
          </div>
          <h3 className="mt-4 text-base font-bold text-[#111827]">
            Noch keine Daten
          </h3>
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Sobald Sie Rechner nutzen oder einbetten, erscheinen hier Ihre
            Statistiken.
          </p>
        </div>
      )}

      {/* Top-Rechner */}
      {toolRanking.length > 0 && (
        <div className="rounded-xl border border-[#E3E5EB] bg-white p-6">
          <h3 className="text-base font-bold text-[#111827]">
            Beliebteste Rechner
          </h3>
          <p className="mt-1 text-xs text-[#9CA3AF]">
            Sortiert nach Nutzungshaeufigkeit
          </p>
          <div className="mt-4 space-y-3">
            {toolRanking.map((tool, index) => (
              <div
                key={tool.slug}
                className="flex items-center justify-between border-b border-[#E3E5EB] py-2 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-sm font-medium text-[#9CA3AF]">
                    {index + 1}.
                  </span>
                  <span className="text-sm font-medium text-[#111827]">
                    {tool.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md border border-[#E3E5EB] px-2 py-0.5 text-xs text-[#4B5563]">
                    {tool.dashboard} Dashboard
                  </span>
                  <span className="inline-flex items-center rounded-md bg-[#F7F8FB] px-2 py-0.5 text-xs text-[#4B5563]">
                    {tool.embed} Embed
                  </span>
                  <span className="w-8 text-right text-sm font-bold text-[#111827]">
                    {tool.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
