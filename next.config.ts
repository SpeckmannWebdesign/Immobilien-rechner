import type { NextConfig } from "next"
import { withSentryConfig } from "@sentry/nextjs"

const nextConfig: NextConfig = {
  // Serverless-kompatibel: Prisma Client nicht bundlen
  serverExternalPackages: ["@prisma/client"],
}

export default withSentryConfig(nextConfig, {
  // Sentry Webpack Plugin Optionen
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Source Maps nur in Production hochladen
  sourcemaps: {
    disable: process.env.NODE_ENV !== "production",
  },

  // Sentry nicht im Build-Output anzeigen
  silent: true,

  // Tunnel-Route für Ad-Blocker-Umgehung (optional)
  tunnelRoute: "/monitoring",
})
