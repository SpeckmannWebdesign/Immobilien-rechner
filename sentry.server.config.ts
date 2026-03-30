import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Nur in Production aktiv
  enabled: process.env.NODE_ENV === "production",

  // Performance Monitoring — 10% der Requests samplen
  tracesSampleRate: 0.1,

  // Debug-Modus nur in Development
  debug: false,
})
