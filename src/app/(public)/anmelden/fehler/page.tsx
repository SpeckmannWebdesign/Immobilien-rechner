"use client"

import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"

export default function AnmeldenFehlerPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8FB] px-4 py-12">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <Logo size="lg" />
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#E3E5EB] bg-white p-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Anmeldung fehlgeschlagen
          </h1>
          <p className="mb-6 text-sm text-gray-500">
            Bitte versuchen Sie es erneut.
          </p>

          <Link href="/anmelden">
            <Button className="h-10 w-full bg-[#4338CA] text-white hover:bg-[#3730A3]">
              Zurueck zur Anmeldung
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
