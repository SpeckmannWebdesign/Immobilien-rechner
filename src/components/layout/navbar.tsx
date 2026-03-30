"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Calculator, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "Rechner", href: "/tools" },
  { name: "Preise", href: "/preise" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Body-Scroll sperren wenn Mobile-Menü offen
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "nav-glass-scrolled"
            : "nav-glass"
        }`}
      >
        <div className="mx-auto max-w-[1120px] flex h-12 items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[#1d1d1f] hover:opacity-70 transition-opacity duration-300"
          >
            <Calculator className="h-5 w-5" />
            <span className="text-sm font-semibold tracking-tight">
              Immobilien-Rechner
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium text-[#1d1d1f] hover:text-[#0066CC] transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/anmelden"
              className="text-xs font-medium text-[#1d1d1f] hover:text-[#0066CC] transition-colors duration-300"
            >
              Anmelden
            </Link>
            <Link
              href="/anmelden"
              className="bg-[#0066CC] text-white px-4 py-1.5 rounded-full text-xs font-medium
                         hover:bg-[#0077ED] transition-colors duration-300"
            >
              Kostenlos testen
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#1d1d1f] p-1"
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-16"
          >
            <nav className="flex flex-col items-center gap-8 pt-12">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-semibold text-[#1d1d1f] tracking-tight"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex flex-col gap-4 mt-4 w-64"
              >
                <Link
                  href="/anmelden"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-3 text-[#1d1d1f] font-medium border border-[rgba(0,0,0,0.12)] rounded-full
                             hover:bg-[#f5f5f7] transition-colors duration-300"
                >
                  Anmelden
                </Link>
                <Link
                  href="/anmelden"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-3 bg-[#0066CC] text-white font-medium rounded-full
                             hover:bg-[#0077ED] transition-colors duration-300"
                >
                  Kostenlos testen
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
