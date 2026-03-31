"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Calculator, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "Rechner", href: "/rechner" },
  { name: "Preise", href: "/preise" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // IntersectionObserver: Hero-Sektion beobachten fuer Dark/Light Wechsel
  useEffect(() => {
    const heroEl = document.getElementById("hero-section")
    if (!heroEl) {
      // Kein Hero auf dieser Seite -> immer helles Design
      setIsHeroVisible(false)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hero gilt als sichtbar wenn mindestens 10% im Viewport sind
        setIsHeroVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  // Body-Scroll sperren wenn Mobile-Menu offen
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

  // CSS-Klasse fuer den Header bestimmen
  const isDark = isHeroVisible && !mobileOpen
  const navClass = isDark
    ? "nav-glass-dark"
    : scrolled
      ? "nav-glass-scrolled"
      : "nav-glass"

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${navClass}`}
      >
        <div className="mx-auto max-w-[1120px] flex h-12 items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 transition-colors duration-300 ${
              isDark
                ? "text-white hover:text-white/70"
                : "text-[#111827] hover:opacity-70"
            }`}
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
                className={`text-xs font-medium transition-colors duration-300 ${
                  isDark
                    ? "text-[#94A3B8] hover:text-[#F1F5F9]"
                    : "text-[#4B5563] hover:text-[#111827]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/anmelden"
              className={`text-xs font-medium transition-colors duration-300 ${
                isDark
                  ? "text-[#94A3B8] hover:text-[#F1F5F9]"
                  : "text-[#4B5563] hover:text-[#111827]"
              }`}
            >
              Anmelden
            </Link>
            <Link
              href="/anmelden"
              className="bg-[#4338CA] text-white px-4 py-1.5 rounded-lg text-xs font-medium
                         hover:bg-[#5B52E0] transition-colors duration-300"
            >
              Kostenlos testen
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-1 transition-colors duration-300 ${
              isDark ? "text-white" : "text-[#111827]"
            }`}
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
                    className="text-2xl font-semibold text-[#111827] tracking-tight"
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
                  className="text-center py-3 text-[#111827] font-medium border border-[#E3E5EB] rounded-lg
                             hover:bg-[#F9FAFB] transition-colors duration-300"
                >
                  Anmelden
                </Link>
                <Link
                  href="/anmelden"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-3 bg-[#4338CA] text-white font-medium rounded-lg
                             hover:bg-[#5B52E0] transition-colors duration-300"
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
