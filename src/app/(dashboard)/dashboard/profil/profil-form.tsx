"use client"

import { useEffect, useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Save, Trash2, AlertTriangle, Lock } from "lucide-react"

interface UserProfile {
  id: string
  name: string | null
  email: string
  company: string | null
  vatId: string | null
  street: string | null
  city: string | null
  zip: string | null
  createdAt: string
}

export function ProfilForm() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState("")
  const [deleting, setDeleting] = useState(false)

  // Formular-State
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [vatId, setVatId] = useState("")
  const [street, setStreet] = useState("")
  const [zip, setZip] = useState("")
  const [city, setCity] = useState("")

  const loadProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/user")
      if (res.ok) {
        const data = await res.json()
        setProfile(data)
        setName(data.name || "")
        setCompany(data.company || "")
        setVatId(data.vatId || "")
        setStreet(data.street || "")
        setZip(data.zip || "")
        setCity(data.city || "")
      }
    } catch {
      toast.error("Profil konnte nicht geladen werden.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, vatId, street, zip, city }),
      })

      if (res.ok) {
        toast.success("Profil gespeichert.")
        loadProfile()
      } else {
        const data = await res.json()
        toast.error(data.error || "Fehler beim Speichern.")
      }
    } catch {
      toast.error("Ein Fehler ist aufgetreten.")
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (deleteConfirm !== "LOESCHEN") return
    setDeleting(true)
    try {
      const res = await fetch("/api/user", { method: "DELETE" })
      if (res.ok) {
        toast.success("Account geloescht. Sie werden abgemeldet.")
        window.location.href = "/api/auth/signout"
      } else {
        toast.error("Fehler beim Loeschen des Accounts.")
      }
    } catch {
      toast.error("Ein Fehler ist aufgetreten.")
    }
    setDeleting(false)
  }

  if (loading) {
    return (
      <div className="max-w-2xl space-y-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-[#E3E5EB] bg-white p-6"
          >
            <div className="h-5 w-32 rounded bg-[#F7F8FB]" />
            <div className="mt-4 h-32 rounded bg-[#F7F8FB]" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Persoenliche Daten */}
      <div className="rounded-2xl border border-[#E3E5EB] bg-white p-6">
        <h2 className="text-base font-bold text-[#111827]">
          Persoenliche Daten
        </h2>
        <p className="mt-1 text-xs text-[#9CA3AF]">
          Ihr Name und Ihre E-Mail-Adresse.
        </p>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-[#4B5563]">
              E-Mail
            </Label>
            <Input
              id="email"
              value={profile?.email || ""}
              disabled
              className="border-[#E3E5EB] bg-[#F7F8FB] text-[#9CA3AF]"
            />
            <p className="text-xs text-[#9CA3AF]">
              Die E-Mail-Adresse kann nicht geaendert werden.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-[#4B5563]">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ihr Name"
              className="border-[#E3E5EB]"
            />
          </div>
        </div>
      </div>

      {/* Rechnungsdaten */}
      <div className="rounded-2xl border border-[#E3E5EB] bg-white p-6">
        <h2 className="text-base font-bold text-[#111827]">Rechnungsdaten</h2>
        <p className="mt-1 text-xs text-[#9CA3AF]">
          Diese Daten erscheinen auf Ihren Rechnungen.
        </p>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm text-[#4B5563]">
              Firma (optional)
            </Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Firmenname"
              className="border-[#E3E5EB]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vatId" className="text-sm text-[#4B5563]">
              USt-IdNr. (optional)
            </Label>
            <Input
              id="vatId"
              value={vatId}
              onChange={(e) => setVatId(e.target.value)}
              placeholder="DE123456789"
              className="border-[#E3E5EB]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="street" className="text-sm text-[#4B5563]">
              Strasse und Hausnummer
            </Label>
            <Input
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Musterstrasse 1"
              className="border-[#E3E5EB]"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zip" className="text-sm text-[#4B5563]">
                PLZ
              </Label>
              <Input
                id="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="12345"
                className="border-[#E3E5EB]"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="city" className="text-sm text-[#4B5563]">
                Ort
              </Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Musterstadt"
                className="border-[#E3E5EB]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Passwort aendern (Platzhalter) */}
      <div className="rounded-2xl border border-[#E3E5EB] bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F8FB]">
            <Lock className="h-5 w-5 text-[#9CA3AF]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#111827]">
              Passwort aendern
            </h2>
            <p className="text-xs text-[#9CA3AF]">
              Diese Funktion wird in Kuerze verfuegbar sein.
            </p>
          </div>
        </div>
      </div>

      {/* Speichern-Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-lg bg-[#4338CA] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3730A3] disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        {saving ? "Wird gespeichert..." : "Aenderungen speichern"}
      </button>

      {/* Account loeschen */}
      <div className="rounded-2xl border border-red-200 bg-white p-6">
        <h2 className="text-base font-bold text-red-600">Account loeschen</h2>
        <p className="mt-1 text-xs text-[#9CA3AF]">
          Loescht Ihren Account und alle damit verbundenen Daten unwiderruflich.
          Ein aktives Abo wird automatisch gekuendigt.
        </p>
        <div className="mt-4">
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger
              render={
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Account loeschen
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Account endgueltig loeschen
                </DialogTitle>
                <DialogDescription>
                  Diese Aktion kann nicht rueckgaengig gemacht werden. Alle Ihre
                  Daten, Embed-Keys, Einstellungen und Nutzungsdaten werden
                  unwiderruflich geloescht.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-2">
                <Label htmlFor="delete-confirm">
                  Geben Sie <strong>LOESCHEN</strong> ein, um zu bestaetigen:
                </Label>
                <Input
                  id="delete-confirm"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder="LOESCHEN"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteConfirm !== "LOESCHEN" || deleting}
                >
                  {deleting
                    ? "Wird geloescht..."
                    : "Account endgueltig loeschen"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Account-Info */}
      {profile?.createdAt && (
        <p className="text-xs text-[#9CA3AF]">
          Account erstellt am{" "}
          {new Date(profile.createdAt).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      )}
    </div>
  )
}
