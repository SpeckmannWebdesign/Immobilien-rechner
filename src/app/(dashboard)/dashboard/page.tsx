import Link from "next/link"
import {
  CreditCard,
  Calculator,
  Code2,
  BarChart3,
  TrendingUp,
  Building2,
  PiggyBank,
  Landmark,
  ArrowRight,
  Clock,
} from "lucide-react"

export const metadata = {
  title: "Dashboard",
}

// Datum formatieren (deutsch)
function formatDate() {
  const now = new Date()
  const weekday = now.toLocaleDateString("de-DE", { weekday: "long" })
  const day = now.getDate()
  const month = now.toLocaleDateString("de-DE", { month: "long" })
  const year = now.getFullYear()
  return `${weekday}, ${day}. ${month} ${year}`
}

// Die 4 beliebtesten Rechner fuer den Schnellzugriff
const quickAccessTools = [
  {
    name: "Rendite-Rechner",
    slug: "rendite-rechner",
    icon: TrendingUp,
  },
  {
    name: "Finanzierungsrechner",
    slug: "finanzierungsrechner",
    icon: Building2,
  },
  {
    name: "Cashflow-Rechner",
    slug: "cashflow-rechner",
    icon: PiggyBank,
  },
  {
    name: "Grunderwerbsteuer",
    slug: "grunderwerbsteuer-rechner",
    icon: Landmark,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#111827]">
          Willkommen zurueck!
        </h1>
        <p className="mt-1 text-sm text-[#9CA3AF]">{formatDate()}</p>
      </div>

      {/* Status-Karten */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Aktueller Plan */}
        <div className="rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#9CA3AF]">
              Aktueller Plan
            </span>
            <CreditCard className="h-4 w-4 text-[#9CA3AF]" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-[#4338CA]">Trial</p>
        </div>

        {/* Rechner genutzt */}
        <div className="rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#9CA3AF]">
              Rechner genutzt
            </span>
            <Calculator className="h-4 w-4 text-[#9CA3AF]" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-[#111827]">0/16</p>
        </div>

        {/* Embed-Views */}
        <div className="rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#9CA3AF]">
              Embed-Views
            </span>
            <Code2 className="h-4 w-4 text-[#9CA3AF]" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-[#111827]">0</p>
        </div>

        {/* Berechnungen */}
        <div className="rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#9CA3AF]">
              Berechnungen
            </span>
            <BarChart3 className="h-4 w-4 text-[#9CA3AF]" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-[#111827]">0</p>
        </div>
      </div>

      {/* 2-Spalten Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Schnellzugriff */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-[#111827]">
            Schnellzugriff
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {quickAccessTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/dashboard/rechner/${tool.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-[#E3E5EB] bg-white p-4 transition-all hover:border-[#CACDD6] hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F8FB]">
                  <tool.icon className="h-5 w-5 text-[#4B5563]" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-[#111827]">
                    {tool.name}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#9CA3AF] transition-colors group-hover:text-[#4338CA]" />
              </Link>
            ))}
          </div>
        </div>

        {/* Letzte Aktivitaet */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-[#111827]">
            Letzte Aktivitaet
          </h2>
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <Clock className="h-6 w-6 text-[#9CA3AF]" />
            </div>
            <p className="mt-4 text-sm font-medium text-[#9CA3AF]">
              Noch keine Berechnungen
            </p>
            <p className="mt-1 text-xs text-[#9CA3AF]">
              Ihre letzten Berechnungen erscheinen hier.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
