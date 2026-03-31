import Link from "next/link"
import { toolCategories, getToolsByCategory } from "@/lib/tools"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Rechner",
}

export default function RechnerUebersicht() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#111827]">Rechner</h1>
        <p className="mt-1 text-sm text-[#4B5563]">
          16 professionelle Rechner fuer Immobilien-Investoren und Makler
        </p>
      </div>

      {/* Kategorien */}
      {toolCategories.map((category) => {
        const categoryTools = getToolsByCategory(category.key)
        return (
          <div key={category.key} className="space-y-4">
            {/* Kategorie-Titel mit Badge */}
            <h2 className="flex items-center gap-2 text-base font-bold text-[#111827]">
              {category.label}
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4338CA]/[0.08] px-1.5 text-xs font-semibold text-[#4338CA]">
                {categoryTools.length}
              </span>
            </h2>

            {/* Rechner-Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/dashboard/rechner/${tool.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-[#E3E5EB] bg-white p-4 transition-all hover:border-[#CACDD6] hover:shadow-sm"
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#F7F8FB]">
                    <tool.icon className="h-5 w-5 text-[#4B5563]" />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-[#111827]">
                      {tool.name}
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#9CA3AF]">
                      {tool.description}
                    </p>
                  </div>

                  {/* Pfeil */}
                  <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#9CA3AF] transition-colors group-hover:text-[#4338CA]" />
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
