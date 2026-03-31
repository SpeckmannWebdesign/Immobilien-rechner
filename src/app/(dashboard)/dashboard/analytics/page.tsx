import { AnalyticsDashboard } from "./analytics-dashboard"

export const metadata = {
  title: "Analytics",
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#111827]">Analytics</h1>
        <p className="mt-1 text-sm text-[#4B5563]">
          Nutzungsstatistiken Ihrer Rechner — im Dashboard und als Embed.
        </p>
      </div>

      <AnalyticsDashboard />
    </div>
  )
}
