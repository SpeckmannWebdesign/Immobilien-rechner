import { AlertTriangle } from "lucide-react"

interface DisclaimerProps {
  showTaxDisclaimer?: boolean
}

export function Disclaimer({ showTaxDisclaimer = false }: DisclaimerProps) {
  return (
    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-900 dark:bg-yellow-950">
      <div className="flex gap-2">
        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
        <div className="text-xs text-yellow-800 dark:text-yellow-300 space-y-1">
          <p>
            Alle Berechnungen sind unverbindliche Richtwerte und ersetzen keine
            professionelle Beratung.
          </p>
          {showTaxDisclaimer && (
            <p className="font-medium">
              Keine Steuerberatung im Sinne des StBerG. Konsultieren Sie einen
              Steuerberater.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
