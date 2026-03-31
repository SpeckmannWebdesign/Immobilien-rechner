"use client"

import { useCountUp } from "@/components/animations/useCountUp"

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number
  suffix: string
  label: string
}) {
  const ref = useCountUp(value, suffix)

  return (
    <div className="bg-white text-center py-10 px-6">
      <span
        ref={ref}
        className="text-[clamp(3rem,6vw,5rem)] font-black text-[#111827] tracking-[-0.03em] block"
      >
        0
      </span>
      <p className="text-[#9CA3AF] text-base mt-1">{label}</p>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-[clamp(5rem,12vw,10rem)] px-6 bg-white">
      <div className="max-w-[900px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E3E5EB] border border-[#E3E5EB] rounded-2xl overflow-hidden">
          <StatItem value={12} suffix="" label="Profi-Rechner" />
          <StatItem value={16} suffix="" label="Bundesländer" />
          <StatItem value={14} suffix=" Tage" label="Kostenloser Test" />
          <StatItem value={100} suffix="%" label="DSGVO-konform" />
        </div>
      </div>
    </section>
  )
}
