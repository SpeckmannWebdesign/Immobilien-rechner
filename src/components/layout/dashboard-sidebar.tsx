"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import {
  LayoutDashboard,
  Calculator,
  Code2,
  BarChart3,
  User,
  CreditCard,
  LogOut,
  Shield,
} from "lucide-react"

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Rechner", href: "/dashboard/rechner", icon: Calculator },
  { title: "Einbettung", href: "/dashboard/einbettung", icon: Code2 },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "Profil", href: "/dashboard/profil", icon: User },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex lg:w-[220px] lg:flex-col lg:border-r lg:border-[#E3E5EB] lg:bg-[#F7F8FB]">
      {/* Logo */}
      <div className="flex h-16 items-center px-5">
        <Link href="/dashboard">
          <Logo size="sm" />
        </Link>
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

      {/* Trennlinie + Abo verwalten */}
      <div className="border-t border-[#E3E5EB] px-3 py-3">
        <Link
          href="/dashboard/abo"
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

      {/* Admin-Link */}
      <div className="border-t border-[#E3E5EB] px-3 py-3">
        <Link
          href="/dashboard/admin"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname.startsWith("/dashboard/admin")
              ? "border-l-2 border-[#4338CA] bg-[#4338CA]/[0.06] text-[#4338CA]"
              : "text-[#9CA3AF] hover:text-[#4B5563]"
          )}
        >
          <Shield className="h-4 w-4" />
          Admin
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
    </aside>
  )
}
