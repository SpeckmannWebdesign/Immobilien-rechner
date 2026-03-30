// Formatierungs-Hilfsfunktionen für alle Rechner

const currencyFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const currencyFormatterNoDecimals = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export function formatCurrency(value: number, decimals = true): string {
  if (decimals) return currencyFormatter.format(value)
  return currencyFormatterNoDecimals.format(value)
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals).replace(".", ",")} %`
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value)
}

export function formatYears(value: number): string {
  const years = Math.floor(value)
  const months = Math.round((value - years) * 12)
  if (months === 0) return `${years} Jahre`
  return `${years} Jahre, ${months} Monate`
}
