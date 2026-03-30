"use client"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectOption {
  value: string
  label: string
}

interface SelectInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  hint?: string
}

export function SelectInput({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Bitte wählen",
  hint,
}: SelectInputProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={(v) => { if (v) onChange(v) }}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hint && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  )
}
