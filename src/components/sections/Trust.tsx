"use client"

import { Shield, Server, Users, BarChart3 } from "lucide-react"

const badges = [
  { icon: Users, label: "Für Makler, Investoren & Hausverwaltungen" },
  { icon: BarChart3, label: "16 Profi-Rechner" },
  { icon: Server, label: "Hosting in Deutschland" },
  { icon: Shield, label: "DSGVO-konform" },
]

export function TrustSection() {
  return (
    <section className="py-6 px-6 bg-white">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid grid-cols-2 md:flex md:justify-center md:items-center gap-6 md:gap-10">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 justify-center">
              <badge.icon className="h-4 w-4 text-[#9CA3AF] shrink-0" />
              <span className="text-sm text-[#9CA3AF] font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
