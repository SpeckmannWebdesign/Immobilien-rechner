import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Nur in Production aktiv
  enabled: process.env.NODE_ENV === "production",

  // Performance Monitoring — 10% der Requests samplen
  tracesSampleRate: 0.1,

  // Replay für Fehler-Debugging (nur bei Fehlern aufzeichnen)
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0,

  // Debug-Modus nur in Development
  debug: false,
})
