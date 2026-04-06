"use client"

import { cn } from "@/lib/utils"
import { formatCurrency, formatPercent } from "@/lib/rechner/format"

interface ResultItem {
  label: string
  value: number
  type?: "currency" | "percent" | "number" | "text"
  textValue?: string
  highlight?: boolean
  color?: "positive" | "negative" | "neutral" | "accent" | "default"
}

interface ResultCardProps {
  title: string
  items: ResultItem[]
  className?: string
}

export function ResultCard({ title, items, className }: ResultCardProps) {
  return (
    <div className={cn("bg-card border rounded-xl p-5", className)}>
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between",
              item.highlight && "pt-3 border-t font-semibold text-lg"
            )}
          >
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span
              className={cn(
                "font-semibold tabular-nums",
                item.color === "positive" && "text-[var(--rechner-accent)]",
                item.color === "negative" && "text-[var(--rechner-accent-muted)]",
                item.color === "neutral" && "text-foreground",
              )}
            >
              {item.textValue
                ? item.textValue
                : item.type === "percent"
                  ? formatPercent(item.value)
                  : item.type === "number"
                    ? item.value.toLocaleString("de-DE")
                    : formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Bento-Metrik-Karte für einzelne Kennzahlen */
interface BentoMetricProps {
  label: string
  value: string
  sub?: string
  color?: "positive" | "negative" | "accent" | "muted" | "default"
  className?: string
}

export function BentoMetric({ label, value, sub, color = "default", className }: BentoMetricProps) {
  return (
    <div className={cn(
      "bg-card border rounded-xl p-5 transition-all hover:shadow-sm hover:-translate-y-0.5",
      className
    )}>
      <div className="text-xs font-semibold text-muted-foreground mb-1.5">{label}</div>
      <div
        className={cn(
          "text-2xl font-extrabold tracking-tight tabular-nums",
          color === "positive" && "text-[var(--rechner-accent)]",
          color === "negative" && "text-[var(--rechner-accent-muted)]",
          color === "accent" && "text-[var(--rechner-accent-dark)]",
          color === "muted" && "text-muted-foreground",
          color === "default" && "text-foreground"
        )}
      >
        {value}
      </div>
      {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  )
}
