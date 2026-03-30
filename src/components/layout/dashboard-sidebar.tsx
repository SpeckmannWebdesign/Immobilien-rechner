"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Calculator,
  LayoutDashboard,
  Code2,
  CreditCard,
  BarChart3,
  User,
  Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Übersicht",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Rechner",
    href: "/dashboard/rechner",
    icon: Calculator,
  },
  {
    title: "Einbettung",
    href: "/dashboard/einbettung",
    icon: Code2,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Abo & Rechnung",
    href: "/dashboard/abo",
    icon: CreditCard,
  },
  {
    title: "Profil",
    href: "/dashboard/profil",
    icon: User,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-muted/30">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Calculator className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg">Immobilien-Rechner</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarItems.map((item) => {
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
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-3">
        <form action="/api/auth/signout" method="POST">
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground"
          >
            <LogOut className="h-4 w-4" />
            Abmelden
          </Button>
        </form>
      </div>
    </aside>
  )
}
