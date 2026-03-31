import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Immobilien-Rechner — Professionelle Tools"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
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
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#F1F5F9",
            letterSpacing: "-0.03em",
          }}
        >
          Immobilien-Rechner
        </div>
        <div style={{ fontSize: 28, color: "#94A3B8", marginTop: 16 }}>
          16 professionelle Rechner für Makler, Investoren &
          Hausverwaltungen
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 40,
          }}
        >
          <div
            style={{
              background: "#4338CA",
              color: "white",
              padding: "12px 32px",
              borderRadius: 8,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Jetzt testen
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
