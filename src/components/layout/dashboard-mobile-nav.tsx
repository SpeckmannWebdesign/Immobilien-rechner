"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import {
  LayoutDashboard,
  Calculator,
  Code2,
  BarChart3,
  User,
  CreditCard,
  Menu,
  X,
  LogOut,
} from "lucide-react"

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Rechner", href: "/dashboard/rechner", icon: Calculator },
  { title: "Einbettung", href: "/dashboard/einbettung", icon: Code2 },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "Profil", href: "/dashboard/profil", icon: User },
]

export function DashboardMobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-[#E3E5EB] bg-white px-4 lg:hidden">
        <Link href="/dashboard">
          <Logo size="sm" />
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#4B5563] transition-colors hover:bg-[#F7F8FB]"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu oeffnen</span>
        </button>
      </header>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />

          {/* Seitliches Panel */}
          <div className="absolute left-0 top-0 flex h-full w-72 flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex h-14 items-center justify-between border-b border-[#E3E5EB] px-5">
              <Logo size="sm" />
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#4B5563]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-0.5 px-3 py-4">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "border-l-2 border-[#4338CA] bg-[#4338CA]/[0.06] text-[#4338CA]"
                        : "text-[#9CA3AF] hover:text-[#4B5563]"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                )
              })}
            </nav>

            {/* Abo verwalten */}
            <div className="border-t border-[#E3E5EB] px-3 py-3">
              <Link
                href="/dashboard/abo"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith("/dashboard/abo")
                    ? "border-l-2 border-[#4338CA] bg-[#4338CA]/[0.06] text-[#4338CA]"
                    : "text-[#9CA3AF] hover:text-[#4B5563]"
                )}
              >
                <CreditCard className="h-4 w-4" />
                Abo verwalten
              </Link>
            </div>

            {/* Abmelden */}
            <div className="border-t border-[#E3E5EB] px-3 py-3">
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#9CA3AF] transition-colors hover:text-[#4B5563]"
                >
                  <LogOut className="h-4 w-4" />
                  Abmelden
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
