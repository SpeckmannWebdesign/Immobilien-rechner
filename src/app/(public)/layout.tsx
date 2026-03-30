import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </SmoothScrollProvider>
  )
}
