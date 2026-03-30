import jwt from "jsonwebtoken"

// JWT-Secret aus Umgebungsvariablen — wird für Embed-Lizenz-Tokens verwendet
const JWT_SECRET = process.env.EMBED_JWT_SECRET || process.env.AUTH_SECRET || ""

// Token-Gültigkeit: 7 Tage (in Sekunden)
const TOKEN_EXPIRY = 7 * 24 * 60 * 60

export interface EmbedTokenPayload {
  apiKey: string
  userId: string
  tool: string | null // null = alle Tools (Business)
  domains: string[]
  plan: string
}

/**
 * Erstellt ein signiertes JWT-Token für die Embed-Lizenzprüfung.
 * Das Token wird im Browser des Embed-Besuchers gecacht (7 Tage gültig).
 */
export function signEmbedToken(payload: EmbedTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
    issuer: "immobilien-rechner.net",
  })
}

/**
 * Verifiziert ein Embed-Lizenz-Token.
 * Gibt das Payload zurück oder null bei ungültigem/abgelaufenem Token.
 */
export function verifyEmbedToken(token: string): EmbedTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: "immobilien-rechner.net",
    }) as EmbedTokenPayload
    return decoded
  } catch {
    return null
  }
}
