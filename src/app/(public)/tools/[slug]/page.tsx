import { notFound } from "next/navigation"
import { getToolBySlug, tools } from "@/lib/tools"
import { TeaseredCalculator } from "./teasered-calculator"
import { Disclaimer } from "@/components/rechner/disclaimer"
import type { Metadata } from "next"

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return { title: "Nicht gefunden" }

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

export default async function ToolPage({ params }: { params: Params }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <TeaseredCalculator slug={slug} />

      <div className="mt-8 max-w-2xl">
        <Disclaimer showTaxDisclaimer={tool.hasTaxDisclaimer} />
      </div>

      {/* SEO-Content */}
      <div className="mt-12 max-w-2xl prose prose-sm">
        <h2>Über den {tool.name}</h2>
        <p>{tool.description}</p>
        <p>
          Dieser Rechner steht Ihnen als registrierter Nutzer in vollem Umfang
          zur Verfügung. Testen Sie alle 12 professionellen Immobilien-Rechner
          14 Tage lang kostenlos.
        </p>
      </div>
    </div>
  )
}
