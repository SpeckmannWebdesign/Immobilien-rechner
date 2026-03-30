"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { formatCurrency, formatPercent } from "@/lib/rechner/format"

interface ResultItem {
  label: string
  value: number
  type?: "currency" | "percent" | "number" | "text"
  textValue?: string
  highlight?: boolean
  color?: "green" | "red" | "yellow" | "default"
}

interface ResultCardProps {
  title: string
  items: ResultItem[]
  className?: string
}

export function ResultCard({ title, items, className }: ResultCardProps) {
  return (
    <Card className={cn("bg-muted/30", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
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
                "font-medium tabular-nums",
                item.color === "green" && "text-green-600 dark:text-green-400",
                item.color === "red" && "text-red-600 dark:text-red-400",
                item.color === "yellow" &&
                  "text-yellow-600 dark:text-yellow-400"
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
      </CardContent>
    </Card>
  )
}
