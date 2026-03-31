"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const mockInputs = [
  { label: "Kaufpreis", value: "285.000 \u20AC" },
  { label: "Kaltmiete", value: "1.250 \u20AC" },
  { label: "Nebenkosten", value: "12,07 %" },
  { label: "Eigenkapital", value: "80.000 \u20AC" },
]

function MetricBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-[#1B1D28] border border-[#2A2D3A] rounded-lg p-3">
      <div className="text-[10px] text-[#64748B] font-medium mb-1">{label}</div>
      <div className="text-lg font-extrabold tabular-nums" style={{ color }}>{value}</div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section id="hero-section" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#0B0D14] pt-12">
      {/* Subtile Gradient-Orbs im Hintergrund */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(67, 56, 202, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-[900px] mx-auto px-6 flex flex-col items-center">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#4338CA] text-sm font-medium tracking-[0.06em] uppercase mb-6"
        >
          Professionelle Immobilien-Tools
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0, 1] }}
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#F1F5F9]"
        >
          Rechner, die{" "}
          <span className="text-gradient-hero">Entscheidungen</span>{" "}
          vereinfachen.
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="text-[clamp(1.125rem,2vw,1.375rem)] text-[#94A3B8] font-medium leading-[1.4] mt-6 max-w-[640px] mx-auto"
        >
          16 professionelle Rechner für Makler, Investoren und Hausverwaltungen.
          Im Dashboard nutzen oder direkt auf Ihrer Website einbetten.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link
            href="/anmelden"
            className="bg-[#4338CA] text-white px-8 py-3.5 rounded-full text-lg font-medium
                       hover:bg-[#5B52E0] transition-colors duration-300 flex items-center gap-2"
          >
            7 Tage kostenlos testen
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/rechner"
            className="text-[#F1F5F9] text-lg font-medium px-8 py-3.5 rounded-full
                       border border-[#2A2D3A] hover:border-[#3A3D4A] transition-all duration-300"
          >
            Alle Rechner ansehen
          </Link>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="text-[#64748B] text-sm mt-5"
        >
          Keine Kreditkarte nötig. Jederzeit kündbar.
        </motion.p>

        {/* Hero Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0, 1] }}
          className="relative z-10 w-full max-w-[880px] mt-16"
        >
          <div
            className="bg-[#13151E] border border-[#2A2D3A] rounded-2xl overflow-hidden transition-transform duration-500 hover:[transform:perspective(1200px)_rotateX(0deg)]"
            style={{
              boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(67,56,202,0.08)",
              transform: "perspective(1200px) rotateX(2deg)",
            }}
          >
            {/* Browser-Bar mit 3 Dots */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1B1D28] border-b border-[#2A2D3A]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="flex-1 text-center text-xs text-[#64748B] font-medium">Rendite-Rechner</span>
            </div>

            {/* Mockup Body: 2 Spalten */}
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-5 p-5">
              {/* Links: Input-Felder (statisch, nur visuell) */}
              <div className="space-y-3">
                {mockInputs.map((input) => (
                  <div key={input.label}>
                    <div className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider mb-1">
                      {input.label}
                    </div>
                    <div className="bg-[#0B0D14] border border-[#2A2D3A] rounded-md px-3 py-2 text-sm text-[#F1F5F9] font-medium tabular-nums">
                      {input.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rechts: Ergebnis-Kacheln + Mini-Donut */}
              <div className="space-y-3">
                {/* 3 Metric-Kacheln */}
                <div className="grid grid-cols-3 gap-2">
                  <MetricBox label="Brutto-Rendite" value="5,26%" color="#059669" />
                  <MetricBox label="Netto-Rendite" value="3,82%" color="#059669" />
                  <MetricBox label="EK-Rendite" value="12,41%" color="#818CF8" />
                </div>

                {/* Mini Donut Chart (SVG) */}
                <div className="bg-[#1B1D28] border border-[#2A2D3A] rounded-lg p-4 flex items-center justify-center">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#2A2D3A" strokeWidth="14" />
                    {/* Eigenkapital Segment */}
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#4338CA" strokeWidth="14"
                      strokeDasharray="70.69 212.06" strokeDashoffset="0" strokeLinecap="round"
                      transform="rotate(-90 60 60)" />
                    {/* Fremdkapital Segment */}
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#0E7490" strokeWidth="14"
                      strokeDasharray="144.51 138.24" strokeDashoffset="-70.69" strokeLinecap="round"
                      transform="rotate(-90 60 60)" />
                    {/* Nebenkosten Segment */}
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#B45309" strokeWidth="14"
                      strokeDasharray="67.55 215.2" strokeDashoffset="-215.2" strokeLinecap="round"
                      transform="rotate(-90 60 60)" />
                    <text x="60" y="56" textAnchor="middle" fill="#059669" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif">5,26%</text>
                    <text x="60" y="72" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="Inter, sans-serif">Rendite</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-[rgba(241,245,249,0.2)] rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-[rgba(241,245,249,0.4)] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
