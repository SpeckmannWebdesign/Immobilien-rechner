"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface NumberInputProps {
  id: string
  label: string
  value: number | string
  onChange: (value: number) => void
  placeholder?: string
  suffix?: string
  min?: number
  max?: number
  step?: number
  hint?: string
}

export function NumberInput({
  id,
  label,
  value,
  onChange,
  placeholder = "0",
  suffix,
  min,
  max,
  step = 1,
  hint,
}: NumberInputProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={suffix ? "pr-14" : ""}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  )
}
