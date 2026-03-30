import { AnalyticsDashboard } from "./analytics-dashboard"

export const metadata = {
  title: "Analytics",
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Nutzungsstatistiken Ihrer Rechner — im Dashboard und als Embed.
        </p>
      </div>

      <AnalyticsDashboard />
    </div>
  )
}
