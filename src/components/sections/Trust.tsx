"use client"

import { Shield, Server, Lock, Clock } from "lucide-react"

const badges = [
  { icon: Shield, label: "DSGVO-konform" },
  { icon: Server, label: "Hosting in Deutschland" },
  { icon: Lock, label: "SSL-verschlüsselt" },
  { icon: Clock, label: "7 Tage kostenlos" },
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
