"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { toast } from "sonner"
import { Save, Trash2, AlertTriangle } from "lucide-react"

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
    if (deleteConfirm !== "LÖSCHEN") return
    setDeleting(true)
    try {
      const res = await fetch("/api/user", { method: "DELETE" })
      if (res.ok) {
        toast.success("Account gelöscht. Sie werden abgemeldet.")
        // Nach Löschung ausloggen
        window.location.href = "/api/auth/signout"
      } else {
        toast.error("Fehler beim Löschen des Accounts.")
      }
    } catch {
      toast.error("Ein Fehler ist aufgetreten.")
    }
    setDeleting(false)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-5 w-32 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-32 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Persönliche Daten */}
      <Card>
        <CardHeader>
          <CardTitle>Persönliche Daten</CardTitle>
          <CardDescription>
            Ihr Name und Ihre E-Mail-Adresse.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              value={profile?.email || ""}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Die E-Mail-Adresse kann nicht geändert werden.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ihr Name"
            />
          </div>
        </CardContent>
      </Card>

      {/* Rechnungsdaten */}
      <Card>
        <CardHeader>
          <CardTitle>Rechnungsdaten</CardTitle>
          <CardDescription>
            Diese Daten erscheinen auf Ihren Rechnungen.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Firma (optional)</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Firmenname"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vatId">USt-IdNr. (optional)</Label>
            <Input
              id="vatId"
              value={vatId}
              onChange={(e) => setVatId(e.target.value)}
              placeholder="DE123456789"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="street">Straße und Hausnummer</Label>
            <Input
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Musterstraße 1"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zip">PLZ</Label>
              <Input
                id="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="12345"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="city">Ort</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Musterstadt"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Speichern-Button */}
      <Button onClick={handleSave} disabled={saving} className="gap-2">
        <Save className="h-4 w-4" />
        {saving ? "Wird gespeichert..." : "Änderungen speichern"}
      </Button>

      {/* Account löschen */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Account löschen</CardTitle>
          <CardDescription>
            Löscht Ihren Account und alle damit verbundenen Daten unwiderruflich.
            Ein aktives Abo wird automatisch gekündigt.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger
              render={
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Account löschen
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Account endgültig löschen
                </DialogTitle>
                <DialogDescription>
                  Diese Aktion kann nicht rückgängig gemacht werden. Alle Ihre
                  Daten, Embed-Keys, Einstellungen und Nutzungsdaten werden
                  unwiderruflich gelöscht.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-2">
                <Label htmlFor="delete-confirm">
                  Geben Sie <strong>LÖSCHEN</strong> ein, um zu bestätigen:
                </Label>
                <Input
                  id="delete-confirm"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder="LÖSCHEN"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteConfirm !== "LÖSCHEN" || deleting}
                >
                  {deleting
                    ? "Wird gelöscht..."
                    : "Account endgültig löschen"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Account-Info */}
      {profile?.createdAt && (
        <p className="text-xs text-muted-foreground">
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
