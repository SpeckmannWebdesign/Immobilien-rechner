import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { tools, toolCategories, getToolsByCategory } from "@/lib/tools"

export const metadata = {
  title: "Rechner",
}

export default function RechnerUebersicht() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Rechner</h1>
        <p className="text-muted-foreground">
          Wählen Sie einen der 16 professionellen Immobilien-Rechner.
        </p>
      </div>

      {toolCategories.map((category) => {
        const categoryTools = getToolsByCategory(category.key)
        return (
          <div key={category.key} className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {category.label}
              <Badge variant="secondary">{categoryTools.length}</Badge>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/dashboard/rechner/${tool.slug}`}
                >
                  <Card className="hover:shadow-md transition-shadow h-full cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <tool.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {tool.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {tool.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
