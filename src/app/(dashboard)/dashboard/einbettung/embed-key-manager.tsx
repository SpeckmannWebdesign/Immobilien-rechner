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
import { Badge } from "@/components/ui/badge"
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
      <div className="grid grid-cols-1 gap-4">
        {[1, 2].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-5 w-32 rounded bg-muted" />
              <div className="h-4 w-48 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-20 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Anleitung wenn keine Keys vorhanden */}
      {keys.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Code2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Noch keine Einbettungen eingerichtet
            </h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Erstellen Sie einen Embed-Key, um Immobilien-Rechner auf Ihrer
              Website einzubinden. Sie erhalten einen Code-Snippet, den Sie
              einfach in Ihre Website einfügen.
            </p>
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger
                render={
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Ersten Embed-Key erstellen
                  </Button>
                }
              />
              <CreateKeyDialog
                onCreated={() => {
                  setCreateOpen(false)
                  loadKeys()
                }}
              />
            </Dialog>
          </CardContent>
        </Card>
      )}

      {/* Header mit Button wenn Keys vorhanden */}
      {keys.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {keys.length} {keys.length === 1 ? "Embed-Key" : "Embed-Keys"}
          </p>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger
              render={
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Neuer Key
                </Button>
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
    ? tools.find((t) => t.slug === embedKey.selectedTool)?.name || embedKey.selectedTool
    : "Alle Rechner"

  const maskedKey = embedKey.apiKey.slice(0, 8) + "..." + embedKey.apiKey.slice(-4)

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
      toast.success("Embed-Key gelöscht.")
      onUpdate()
    } else {
      toast.error("Fehler beim Löschen.")
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
      toast.success("Domain hinzugefügt.")
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
    : `<!-- Ersetzen Sie TOOL-SLUG durch den gewünschten Rechner -->
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
    : `<!-- Ersetzen Sie TOOL-SLUG durch den gewünschten Rechner -->
<iframe
  src="https://immobilien-rechner.net/embed/TOOL-SLUG?key=${embedKey.apiKey}"
  width="100%"
  height="700"
  frameborder="0"
  style="border: none; border-radius: 8px;"
></iframe>`

  return (
    <Card className={!embedKey.isActive ? "opacity-60" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg">{embedKey.name}</CardTitle>
            <Badge variant={embedKey.isActive ? "default" : "secondary"}>
              {embedKey.isActive ? "Aktiv" : "Inaktiv"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleActive}
              className="gap-1 text-xs"
            >
              {embedKey.isActive ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
              {embedKey.isActive ? "Deaktivieren" : "Aktivieren"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={deleteKey}
              disabled={deleting}
              className="text-destructive hover:text-destructive gap-1 text-xs"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Löschen
            </Button>
          </div>
        </div>
        <CardDescription>
          Rechner: <strong>{toolName}</strong>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* API-Key */}
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">
            API-Key
          </Label>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-md bg-muted px-3 py-2 text-sm font-mono">
              {showKey ? embedKey.apiKey : maskedKey}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(embedKey.apiKey, "key")}
            >
              {copied === "key" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Domains */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">
              <Globe className="inline h-3.5 w-3.5 mr-1" />
              Erlaubte Domains
            </Label>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => setEditingDomains(!editingDomains)}
            >
              {editingDomains ? "Fertig" : "Bearbeiten"}
            </Button>
          </div>

          {embedKey.allowedDomains.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Keine Einschränkung — alle Domains erlaubt.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {embedKey.allowedDomains.map((domain) => (
                <Badge key={domain} variant="outline" className="gap-1">
                  {domain}
                  {editingDomains && (
                    <button
                      onClick={() => removeDomain(domain)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
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
              />
              <Button size="sm" onClick={addDomain}>
                Hinzufügen
              </Button>
            </div>
          )}
        </div>

        {/* Styling */}
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">
            <Palette className="inline h-3.5 w-3.5 mr-1" />
            Styling
          </Label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Primärfarbe:</span>
              {editingColor ? (
                <input
                  type="color"
                  value={embedKey.primaryColor}
                  onChange={(e) => updateColor(e.target.value)}
                  onBlur={() => setEditingColor(false)}
                  className="h-8 w-12 cursor-pointer rounded border"
                />
              ) : (
                <button
                  onClick={() => setEditingColor(true)}
                  className="flex items-center gap-2"
                >
                  <span
                    className="inline-block h-5 w-5 rounded-full border"
                    style={{ backgroundColor: embedKey.primaryColor }}
                  />
                  <span className="text-sm font-mono">
                    {embedKey.primaryColor}
                  </span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Dunkler Modus:</span>
              <Button
                variant={embedKey.darkMode ? "default" : "outline"}
                size="sm"
                onClick={toggleDarkMode}
              >
                {embedKey.darkMode ? "An" : "Aus"}
              </Button>
            </div>
          </div>
        </div>

        {/* Code-Snippets */}
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">
            <Code2 className="inline h-3.5 w-3.5 mr-1" />
            Einbettungscode
          </Label>

          <Tabs defaultValue="script">
            <TabsList>
              <TabsTrigger value="script">Script-Tag</TabsTrigger>
              <TabsTrigger value="iframe">iFrame</TabsTrigger>
            </TabsList>

            <TabsContent value="script" className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Fügen Sie diesen Code an der gewünschten Stelle in Ihre Website
                ein. Der Rechner passt sich automatisch an.
              </p>
              <div className="relative">
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto font-mono">
                  {scriptSnippet}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 gap-1"
                  onClick={() => copyToClipboard(scriptSnippet, "script")}
                >
                  {copied === "script" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  Kopieren
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="iframe" className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Alternativ können Sie den Rechner als iFrame einbinden. Passen
                Sie die Höhe nach Bedarf an.
              </p>
              <div className="relative">
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto font-mono">
                  {iframeSnippet}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 gap-1"
                  onClick={() => copyToClipboard(iframeSnippet, "iframe")}
                >
                  {copied === "iframe" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  Kopieren
                </Button>
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
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Vorschau öffnen
            </a>
          </div>
        )}

        {/* Tool-Slugs Referenz (nur bei Business / alle Tools) */}
        {!embedKey.selectedTool && (
          <details className="text-sm">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
              Verfügbare Tool-Slugs anzeigen
            </summary>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
              {tools.map((tool) => (
                <div key={tool.slug} className="flex items-center gap-2 py-1">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                    {tool.slug}
                  </code>
                  <span className="text-muted-foreground">{tool.shortName}</span>
                </div>
              ))}
            </div>
          </details>
        )}
      </CardContent>
    </Card>
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
          Wählen Sie einen Namen und den Rechner, den Sie einbetten möchten.
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
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="key-tool">Rechner</Label>
          <select
            id="key-tool"
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
            className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Alle Rechner (Business)</option>
            {tools.map((tool) => (
              <option key={tool.slug} value={tool.slug}>
                {tool.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">
            Im Pro-Plan können Sie genau einen Rechner auswählen. Im
            Business-Plan sind alle Rechner verfügbar.
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button onClick={handleCreate} disabled={creating || !name.trim()}>
          {creating ? "Wird erstellt..." : "Erstellen"}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
