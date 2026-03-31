"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

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
      <div className="relative z-10 text-center max-w-[900px] mx-auto px-6">
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
            14 Tage kostenlos testen
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
