import { ImageResponse } from "next/og"
import { getToolBySlug } from "@/lib/tools"

export const runtime = "edge"
export const alt = "Immobilien-Rechner"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  const name = tool?.name || "Rechner"
  const desc = tool?.description || ""

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0B0D14 0%, #1B1D28 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: "#4338CA",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase" as const,
          }}
        >
          Immobilien-Rechner
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "#F1F5F9",
            marginTop: 16,
            letterSpacing: "-0.03em",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#94A3B8",
            marginTop: 12,
            maxWidth: 800,
            textAlign: "center" as const,
          }}
        >
          {desc}
        </div>
      </div>
    ),
    { ...size },
  )
}
