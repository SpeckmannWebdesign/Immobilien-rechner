import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Serverless-kompatibel: Prisma Client nicht bundlen
  serverExternalPackages: ["@prisma/client"],
}

export default nextConfig
