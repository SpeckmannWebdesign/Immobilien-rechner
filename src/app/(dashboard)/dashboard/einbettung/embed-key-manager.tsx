"use client"

import { useEffect, useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { tools } from "@/lib/tools"
import {
  Plus,
  Copy,
  Check,
  Trash2,
  Code2,
  Globe,
  Palette,
  X,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react"
import { toast } from "sonner"

interface EmbedKey {
  id: string
  apiKey: string
  name: string
  allowedDomains: string[]
  selectedTool: string | null
  isActive: boolean
  primaryColor: string
  darkMode: boolean
  createdAt: string
}

export function EmbedKeyManager() {
  const [keys, setKeys] = useState<EmbedKey[]>([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)

  const loadKeys = useCallback(async () => {
    try {
      const res = await fetch("/api/embed/keys")
      if (res.ok) {
        const data = await res.json()
        setKeys(data)
      }
    } catch {
      toast.error("Embed-Keys konnten nicht geladen werden.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadKeys()
  }, [loadKeys])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-[#E3E5EB] bg-white p-6"
          >
            <div className="h-5 w-32 rounded bg-[#F7F8FB]" />
            <div className="mt-3 h-4 w-48 rounded bg-[#F7F8FB]" />
            <div className="mt-4 h-20 rounded bg-[#F7F8FB]" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Leerer Zustand */}
      {keys.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#E3E5EB] bg-[#F7F8FB] p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
            <Code2 className="h-6 w-6 text-[#9CA3AF]" />
          </div>
          <h3 className="mt-4 text-base font-bold text-[#111827]">
            Noch keine Einbettungen eingerichtet
          </h3>
          <p className="mt-1 max-w-md text-sm text-[#9CA3AF]">
            Erstellen Sie einen Embed-Key, um Immobilien-Rechner auf Ihrer
            Website einzubinden.
          </p>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger
              render={
                <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#4338CA] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3730A3]">
                  <Plus className="h-4 w-4" />
                  Ersten Embed-Key erstellen
                </button>
              }
            />
            <CreateKeyDialog
              onCreated={() => {
                setCreateOpen(false)
                loadKeys()
              }}
            />
          </Dialog>
        </div>
      )}

      {/* Header wenn Keys vorhanden */}
      {keys.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#9CA3AF]">
            {keys.length} {keys.length === 1 ? "Embed-Key" : "Embed-Keys"}
          </p>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger
              render={
                <button className="inline-flex items-center gap-2 rounded-lg bg-[#4338CA] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3730A3]">
                  <Plus className="h-4 w-4" />
                  Neuer Key
                </button>
              }
            />
            <CreateKeyDialog
              onCreated={() => {
                setCreateOpen(false)
                loadKeys()
              }}
            />
          </Dialog>
        </div>
      )}

      {/* Key-Karten */}
      {keys.map((key) => (
        <EmbedKeyCard key={key.id} embedKey={key} onUpdate={loadKeys} />
      ))}
    </div>
  )
}

// ============================================
// Einzelne Embed-Key-Karte
// ============================================

function EmbedKeyCard({
  embedKey,
  onUpdate,
}: {
  embedKey: EmbedKey
  onUpdate: () => void
}) {
  const [copied, setCopied] = useState<string | null>(null)
  const [showKey, setShowKey] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [editingDomains, setEditingDomains] = useState(false)
  const [newDomain, setNewDomain] = useState("")
  const [editingColor, setEditingColor] = useState(false)

  const toolName = embedKey.selectedTool
    ? tools.find((t) => t.slug === embedKey.selectedTool)?.name ||
      embedKey.selectedTool
    : "Alle Rechner"

  const maskedKey =
    embedKey.apiKey.slice(0, 8) + "..." + embedKey.apiKey.slice(-4)

  async function copyToClipboard(text: string, label: string) {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    toast.success("In die Zwischenablage kopiert!")
    setTimeout(() => setCopied(null), 2000)
  }

  async function toggleActive() {
    const res = await fetch(`/api/embed/keys/${embedKey.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !embedKey.isActive }),
    })
    if (res.ok) {
      toast.success(
        embedKey.isActive ? "Embed-Key deaktiviert." : "Embed-Key aktiviert."
      )
      onUpdate()
    }
  }

  async function deleteKey() {
    setDeleting(true)
    const res = await fetch(`/api/embed/keys/${embedKey.id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      toast.success("Embed-Key geloescht.")
      onUpdate()
    } else {
      toast.error("Fehler beim Loeschen.")
    }
    setDeleting(false)
  }

  async function addDomain() {
    if (!newDomain.trim()) return
    const updated = [...embedKey.allowedDomains, newDomain.trim()]
    const res = await fetch(`/api/embed/keys/${embedKey.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ allowedDomains: updated }),
    })
    if (res.ok) {
      setNewDomain("")
      onUpdate()
      toast.success("Domain hinzugefuegt.")
    }
  }

  async function removeDomain(domain: string) {
    const updated = embedKey.allowedDomains.filter((d) => d !== domain)
    const res = await fetch(`/api/embed/keys/${embedKey.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ allowedDomains: updated }),
    })
    if (res.ok) {
      onUpdate()
      toast.success("Domain entfernt.")
    }
  }

  async function updateColor(color: string) {
    const res = await fetch(`/api/embed/keys/${embedKey.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ primaryColor: color }),
    })
    if (res.ok) {
      onUpdate()
    }
  }

  async function toggleDarkMode() {
    const res = await fetch(`/api/embed/keys/${embedKey.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ darkMode: !embedKey.darkMode }),
    })
    if (res.ok) {
      onUpdate()
    }
  }

  // Code-Snippets
  const scriptSnippet = embedKey.selectedTool
    ? `<div id="immo-rechner" data-tool="${embedKey.selectedTool}" data-key="${embedKey.apiKey}"></div>
<script src="https://immobilien-rechner.net/embed.js"></script>`
    : `<!-- Ersetzen Sie TOOL-SLUG durch den gewuenschten Rechner -->
<div id="immo-rechner" data-tool="TOOL-SLUG" data-key="${embedKey.apiKey}"></div>
<script src="https://immobilien-rechner.net/embed.js"></script>`

  const iframeSnippet = embedKey.selectedTool
    ? `<iframe
  src="https://immobilien-rechner.net/embed/${embedKey.selectedTool}?key=${embedKey.apiKey}"
  width="100%"
  height="700"
  frameborder="0"
  style="border: none; border-radius: 8px;"
></iframe>`
    : `<!-- Ersetzen Sie TOOL-SLUG durch den gewuenschten Rechner -->
<iframe
  src="https://immobilien-rechner.net/embed/TOOL-SLUG?key=${embedKey.apiKey}"
  width="100%"
  height="700"
  frameborder="0"
  style="border: none; border-radius: 8px;"
></iframe>`

  return (
    <div
      className={`rounded-xl border border-[#E3E5EB] bg-white ${
        !embedKey.isActive ? "opacity-60" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E3E5EB] p-5">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-bold text-[#111827]">
            {embedKey.name}
          </h3>
          <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
              embedKey.isActive
                ? "bg-green-50 text-green-700"
                : "bg-[#F7F8FB] text-[#9CA3AF]"
            }`}
          >
            {embedKey.isActive ? "Aktiv" : "Inaktiv"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleActive}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#4B5563] transition-colors hover:bg-[#F7F8FB]"
          >
            {embedKey.isActive ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
            {embedKey.isActive ? "Deaktivieren" : "Aktivieren"}
          </button>
          <button
            onClick={deleteKey}
            disabled={deleting}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Loeschen
          </button>
        </div>
      </div>

      <div className="space-y-6 p-5">
        {/* Rechner-Info */}
        <p className="text-sm text-[#4B5563]">
          Rechner: <span className="font-semibold text-[#111827]">{toolName}</span>
        </p>

        {/* API-Key */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
            API-Key
          </label>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-lg bg-[#1E1E2E] px-4 py-2.5 font-mono text-sm text-[#E3E5EB]">
              {showKey ? embedKey.apiKey : maskedKey}
            </code>
            <button
              onClick={() => setShowKey(!showKey)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E3E5EB] text-[#4B5563] transition-colors hover:bg-[#F7F8FB]"
            >
              {showKey ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => copyToClipboard(embedKey.apiKey, "key")}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E3E5EB] text-[#4B5563] transition-colors hover:bg-[#F7F8FB]"
            >
              {copied === "key" ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Domains */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
              <Globe className="h-3.5 w-3.5" />
              Erlaubte Domains
            </label>
            <button
              onClick={() => setEditingDomains(!editingDomains)}
              className="text-xs font-medium text-[#4338CA] hover:underline"
            >
              {editingDomains ? "Fertig" : "Bearbeiten"}
            </button>
          </div>

          {embedKey.allowedDomains.length === 0 ? (
            <p className="text-sm text-[#9CA3AF]">
              Keine Einschraenkung — alle Domains erlaubt.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {embedKey.allowedDomains.map((domain) => (
                <span
                  key={domain}
                  className="inline-flex items-center gap-1 rounded-md border border-[#E3E5EB] px-2.5 py-1 text-xs text-[#4B5563]"
                >
                  {domain}
                  {editingDomains && (
                    <button
                      onClick={() => removeDomain(domain)}
                      className="ml-1 text-[#9CA3AF] hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          )}

          {editingDomains && (
            <div className="flex gap-2">
              <Input
                placeholder="beispiel.de"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addDomain()}
                className="border-[#E3E5EB]"
              />
              <button
                onClick={addDomain}
                className="rounded-lg bg-[#4338CA] px-4 py-2 text-sm font-medium text-white hover:bg-[#3730A3]"
              >
                Hinzufuegen
              </button>
            </div>
          )}
        </div>

        {/* Styling */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
            <Palette className="h-3.5 w-3.5" />
            Styling
          </label>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#4B5563]">Primaerfarbe:</span>
              {editingColor ? (
                <input
                  type="color"
                  value={embedKey.primaryColor}
                  onChange={(e) => updateColor(e.target.value)}
                  onBlur={() => setEditingColor(false)}
                  className="h-8 w-12 cursor-pointer rounded border border-[#E3E5EB]"
                />
              ) : (
                <button
                  onClick={() => setEditingColor(true)}
                  className="flex items-center gap-2"
                >
                  <span
                    className="inline-block h-5 w-5 rounded-full border border-[#E3E5EB]"
                    style={{ backgroundColor: embedKey.primaryColor }}
                  />
                  <span className="font-mono text-sm text-[#4B5563]">
                    {embedKey.primaryColor}
                  </span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#4B5563]">Dunkler Modus:</span>
              <button
                onClick={toggleDarkMode}
                className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                  embedKey.darkMode
                    ? "bg-[#4338CA] text-white"
                    : "border border-[#E3E5EB] text-[#4B5563] hover:border-[#CACDD6]"
                }`}
              >
                {embedKey.darkMode ? "An" : "Aus"}
              </button>
            </div>
          </div>
        </div>

        {/* Code-Snippets */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
            <Code2 className="h-3.5 w-3.5" />
            Einbettungscode
          </label>

          <Tabs defaultValue="script">
            <TabsList>
              <TabsTrigger value="script">Script-Tag</TabsTrigger>
              <TabsTrigger value="iframe">iFrame</TabsTrigger>
            </TabsList>

            <TabsContent value="script" className="space-y-2">
              <p className="text-sm text-[#9CA3AF]">
                Fuegen Sie diesen Code an der gewuenschten Stelle in Ihre Website
                ein.
              </p>
              <div className="relative">
                <pre className="overflow-x-auto rounded-lg bg-[#1E1E2E] p-4 font-mono text-sm text-[#E3E5EB]">
                  {scriptSnippet}
                </pre>
                <button
                  onClick={() => copyToClipboard(scriptSnippet, "script")}
                  className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-[#2D2D3F] px-2.5 py-1.5 text-xs text-[#9CA3AF] transition-colors hover:text-white"
                >
                  {copied === "script" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  Kopieren
                </button>
              </div>
            </TabsContent>

            <TabsContent value="iframe" className="space-y-2">
              <p className="text-sm text-[#9CA3AF]">
                Alternativ als iFrame einbinden. Passen Sie die Hoehe nach Bedarf
                an.
              </p>
              <div className="relative">
                <pre className="overflow-x-auto rounded-lg bg-[#1E1E2E] p-4 font-mono text-sm text-[#E3E5EB]">
                  {iframeSnippet}
                </pre>
                <button
                  onClick={() => copyToClipboard(iframeSnippet, "iframe")}
                  className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-[#2D2D3F] px-2.5 py-1.5 text-xs text-[#9CA3AF] transition-colors hover:text-white"
                >
                  {copied === "iframe" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  Kopieren
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Vorschau-Link */}
        {embedKey.selectedTool && (
          <div>
            <a
              href={`/embed/${embedKey.selectedTool}?key=${embedKey.apiKey}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#4338CA] hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Vorschau oeffnen
            </a>
          </div>
        )}

        {/* Tool-Slugs Referenz */}
        {!embedKey.selectedTool && (
          <details className="text-sm">
            <summary className="cursor-pointer font-medium text-[#9CA3AF] hover:text-[#4B5563]">
              Verfuegbare Tool-Slugs anzeigen
            </summary>
            <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
              {tools.map((tool) => (
                <div key={tool.slug} className="flex items-center gap-2 py-1">
                  <code className="rounded bg-[#1E1E2E] px-1.5 py-0.5 font-mono text-xs text-[#E3E5EB]">
                    {tool.slug}
                  </code>
                  <span className="text-[#9CA3AF]">{tool.shortName}</span>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}

// ============================================
// Dialog: Neuen Embed-Key erstellen
// ============================================

function CreateKeyDialog({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("Meine Website")
  const [selectedTool, setSelectedTool] = useState<string>("")
  const [creating, setCreating] = useState(false)

  async function handleCreate() {
    setCreating(true)
    try {
      const res = await fetch("/api/embed/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          selectedTool: selectedTool || null,
          allowedDomains: [],
        }),
      })

      if (res.ok) {
        toast.success("Embed-Key erstellt!")
        onCreated()
      } else {
        const data = await res.json()
        toast.error(data.error || "Fehler beim Erstellen.")
      }
    } catch {
      toast.error("Ein Fehler ist aufgetreten.")
    }
    setCreating(false)
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Neuen Embed-Key erstellen</DialogTitle>
        <DialogDescription>
          Waehlen Sie einen Namen und den Rechner, den Sie einbetten moechten.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-2">
        <div className="space-y-2">
          <Label htmlFor="key-name">Bezeichnung</Label>
          <Input
            id="key-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z.B. Meine Makler-Website"
            className="border-[#E3E5EB]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="key-tool">Rechner</Label>
          <select
            id="key-tool"
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
            className="flex h-8 w-full rounded-lg border border-[#E3E5EB] bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-[#4338CA] focus-visible:ring-2 focus-visible:ring-[#4338CA]/20"
          >
            <option value="">Alle Rechner (Business)</option>
            {tools.map((tool) => (
              <option key={tool.slug} value={tool.slug}>
                {tool.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-[#9CA3AF]">
            Im Pro-Plan koennen Sie genau einen Rechner auswaehlen. Im
            Business-Plan sind alle Rechner verfuegbar.
          </p>
        </div>
      </div>

      <DialogFooter>
        <button
          onClick={handleCreate}
          disabled={creating || !name.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-[#4338CA] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3730A3] disabled:opacity-50"
        >
          {creating ? "Wird erstellt..." : "Erstellen"}
        </button>
      </DialogFooter>
    </DialogContent>
  )
}
