"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  Calculator,
  LayoutDashboard,
  Code2,
  CreditCard,
  BarChart3,
  User,
  Menu,
  LogOut,
} from "lucide-react"

const sidebarItems = [
  { title: "Übersicht", href: "/dashboard", icon: LayoutDashboard },
  { title: "Rechner", href: "/dashboard/rechner", icon: Calculator },
  { title: "Einbettung", href: "/dashboard/einbettung", icon: Code2 },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "Abo & Rechnung", href: "/dashboard/abo", icon: CreditCard },
  { title: "Profil", href: "/dashboard/profil", icon: User },
]

export function DashboardMobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menü öffnen</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Dashboard Navigation</SheetTitle>
          <div className="flex h-14 items-center gap-2 border-b px-6">
            <Calculator className="h-5 w-5 text-primary" />
            <span className="font-bold">Immobilien-Rechner</span>
          </div>
          <nav className="space-y-1 p-3">
            {sidebarItems.map((item) => {
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
        </SheetContent>
      </Sheet>
      <span className="font-semibold">Dashboard</span>
    </header>
  )
}
