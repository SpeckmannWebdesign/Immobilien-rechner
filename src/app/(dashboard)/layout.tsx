import { DashboardSidebar } from "@/components/layout/dashboard-sidebar"
import { DashboardMobileNav } from "@/components/layout/dashboard-mobile-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full min-h-screen">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardMobileNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
