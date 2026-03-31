"use client"

import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"
import { Users, UserCheck, CreditCard, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Typen für die Nutzerdaten
interface AdminUser {
  id: string
  name: string | null
  email: string
  role: string
  plan: string
  trialEndsAt: string | null
  planExpiresAt: string | null
  createdAt: string
}

// Plan-Badge Farben
const planBadgeStyles: Record<string, string> = {
  trial: "bg-[#B45309]/10 text-[#B45309]",
  starter: "bg-[#4B5563]/10 text-[#4B5563]",
  pro: "bg-[#4338CA]/10 text-[#4338CA]",
  business: "bg-[#059669]/10 text-[#059669]",
}

// Plan-Label (Großbuchstabe)
const planLabels: Record<string, string> = {
  trial: "Trial",
  starter: "Starter",
  pro: "Pro",
  business: "Business",
}

// Berechne den Status eines Nutzers
function getUserStatus(user: AdminUser): {
  label: string
  color: string
} {
  const now = new Date()

  if (user.plan === "trial" && user.trialEndsAt) {
    const trialEnd = new Date(user.trialEndsAt)
    const diffMs = trialEnd.getTime() - now.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return { label: "Abgelaufen", color: "text-red-600 bg-red-50" }
    }
    if (diffDays <= 7) {
      return {
        label: `Trial läuft ab in ${diffDays} ${diffDays === 1 ? "Tag" : "Tagen"}`,
        color: "text-amber-600 bg-amber-50",
      }
    }
    return { label: "Aktiv", color: "text-green-600 bg-green-50" }
  }

  if (user.plan !== "trial" && user.planExpiresAt) {
    const expiry = new Date(user.planExpiresAt)
    if (expiry < now) {
      return { label: "Abgelaufen", color: "text-red-600 bg-red-50" }
    }
  }

  // Bezahlter Plan ohne Ablaufdatum oder noch gültig
  if (user.plan !== "trial") {
    return { label: "Aktiv", color: "text-green-600 bg-green-50" }
  }

  // Trial ohne trialEndsAt — als aktiv behandeln
  return { label: "Aktiv", color: "text-green-600 bg-green-50" }
}

// Datum formatieren (deutsch)
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function AdminDashboard() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Dialog-State
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [editPlan, setEditPlan] = useState("trial")
  const [editExpiry, setEditExpiry] = useState("")
  const [saving, setSaving] = useState(false)

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/users")

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Fehler beim Laden der Nutzer")
      }

      const data = await response.json()
      setUsers(data)
      setError(null)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unbekannter Fehler"
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  // Dialog öffnen
  function openEditDialog(user: AdminUser) {
    setSelectedUser(user)
    setEditPlan(user.plan)
    setEditExpiry(
      user.planExpiresAt
        ? new Date(user.planExpiresAt).toISOString().split("T")[0]
        : ""
    )
    setDialogOpen(true)
  }

  // Plan speichern
  async function handleSavePlan() {
    if (!selectedUser) return

    try {
      setSaving(true)
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: editPlan,
          planExpiresAt: editExpiry || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Fehler beim Speichern")
      }

      toast.success("Plan aktualisiert")
      setDialogOpen(false)
      loadUsers()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unbekannter Fehler"
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  // Statistiken berechnen
  const now = new Date()
  const totalUsers = users.length
  const trialUsers = users.filter((u) => u.plan === "trial").length
  const paidUsers = users.filter((u) => u.plan !== "trial").length
  const expiredTrials = users.filter((u) => {
    if (u.plan !== "trial" || !u.trialEndsAt) return false
    return new Date(u.trialEndsAt) < now
  }).length

  // Lade-Zustand
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-[#9CA3AF]">
        Nutzer werden geladen...
      </div>
    )
  }

  // Fehler-Zustand
  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error}
      </div>
    )
  }

  return (
    <>
      {/* Statistik-Karten */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Gesamt-Nutzer"
          value={totalUsers}
        />
        <StatCard
          icon={AlertTriangle}
          label="Trial-Nutzer"
          value={trialUsers}
        />
        <StatCard
          icon={CreditCard}
          label="Bezahlte Nutzer"
          value={paidUsers}
        />
        <StatCard
          icon={UserCheck}
          label="Abgelaufene Trials"
          value={expiredTrials}
        />
      </div>

      {/* Nutzer-Tabelle */}
      <div className="overflow-hidden rounded-2xl border border-[#E3E5EB] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E3E5EB] bg-[#F7F8FB]">
                <th className="px-4 py-3 font-medium text-[#4B5563]">Name</th>
                <th className="px-4 py-3 font-medium text-[#4B5563]">
                  E-Mail
                </th>
                <th className="px-4 py-3 font-medium text-[#4B5563]">Plan</th>
                <th className="px-4 py-3 font-medium text-[#4B5563]">
                  Status
                </th>
                <th className="px-4 py-3 font-medium text-[#4B5563]">
                  Registriert
                </th>
                <th className="px-4 py-3 font-medium text-[#4B5563]">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-[#9CA3AF]"
                  >
                    Keine Nutzer vorhanden
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const status = getUserStatus(user)
                  return (
                    <tr
                      key={user.id}
                      className="border-b border-[#E3E5EB] transition-colors last:border-b-0 hover:bg-[#F7F8FB]"
                    >
                      <td className="px-4 py-3 font-medium text-[#111827]">
                        {user.name || "—"}
                      </td>
                      <td className="px-4 py-3 text-[#4B5563]">
                        {user.email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${planBadgeStyles[user.plan] || "bg-gray-100 text-gray-600"}`}
                        >
                          {planLabels[user.plan] || user.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#9CA3AF]">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openEditDialog(user)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#4338CA] transition-colors hover:bg-[#4338CA]/10"
                        >
                          Plan ändern
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan-Ändern Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Plan ändern</DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4 pt-2">
              {/* User-Info */}
              <div className="rounded-lg bg-[#F7F8FB] p-3">
                <p className="font-medium text-[#111827]">
                  {selectedUser.name || "Kein Name"}
                </p>
                <p className="text-sm text-[#4B5563]">{selectedUser.email}</p>
              </div>

              {/* Plan auswählen */}
              <div className="space-y-1.5">
                <label
                  htmlFor="plan-select"
                  className="text-sm font-medium text-[#111827]"
                >
                  Plan
                </label>
                <select
                  id="plan-select"
                  value={editPlan}
                  onChange={(e) => setEditPlan(e.target.value)}
                  className="w-full rounded-lg border border-[#E3E5EB] bg-white px-3 py-2 text-sm text-[#111827] focus:border-[#4338CA] focus:outline-none focus:ring-1 focus:ring-[#4338CA]"
                >
                  <option value="trial">Trial</option>
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                  <option value="business">Business</option>
                </select>
              </div>

              {/* Ablaufdatum (nur bei bezahlten Plänen) */}
              {editPlan !== "trial" && (
                <div className="space-y-1.5">
                  <label
                    htmlFor="expiry-date"
                    className="text-sm font-medium text-[#111827]"
                  >
                    Plan gültig bis (optional)
                  </label>
                  <input
                    id="expiry-date"
                    type="date"
                    value={editExpiry}
                    onChange={(e) => setEditExpiry(e.target.value)}
                    className="w-full rounded-lg border border-[#E3E5EB] bg-white px-3 py-2 text-sm text-[#111827] focus:border-[#4338CA] focus:outline-none focus:ring-1 focus:ring-[#4338CA]"
                  />
                </div>
              )}

              {/* Speichern-Button */}
              <button
                onClick={handleSavePlan}
                disabled={saving}
                className="w-full rounded-lg bg-[#4338CA] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3730A3] disabled:opacity-50"
              >
                {saving ? "Wird gespeichert..." : "Speichern"}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

// Statistik-Karte Komponente
function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
}) {
  return (
    <div className="rounded-2xl border border-[#E3E5EB] bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4338CA]/10">
          <Icon className="h-5 w-5 text-[#4338CA]" />
        </div>
        <div>
          <p className="text-2xl font-bold text-[#111827]">{value}</p>
          <p className="text-sm text-[#9CA3AF]">{label}</p>
        </div>
      </div>
    </div>
  )
}
