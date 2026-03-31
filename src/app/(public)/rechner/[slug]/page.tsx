import Link from "next/link"
import { notFound } from "next/navigation"
import { getToolBySlug, tools } from "@/lib/tools"
import { getRechnerSeoData } from "@/lib/rechner-seo"
import { TeaseredCalculator } from "./teasered-calculator"
import { Disclaimer } from "@/components/rechner/disclaimer"
import { Check, ArrowRight, ChevronRight } from "lucide-react"
import type { Metadata } from "next"

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return { title: "Nicht gefunden" }

  return {
    title: `${tool.name} | Professioneller Immobilien-Rechner`,
    description: tool.seoDescription,
    openGraph: {
      title: `${tool.name} | Professioneller Immobilien-Rechner`,
      description: tool.seoDescription,
      type: "website",
      locale: "de_DE",
    },
  }
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

export default async function RechnerPage({ params }: { params: Params }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const seoData = getRechnerSeoData(slug)

  // Strukturierte Daten fuer SEO
  const faqSchema = seoData?.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: seoData.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: "https://immobilien-rechner.de",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rechner",
        item: "https://immobilien-rechner.de/rechner",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: `https://immobilien-rechner.de/rechner/${slug}`,
      },
    ],
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.seoDescription,
    url: `https://immobilien-rechner.de/rechner/${slug}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: "14 Tage kostenlos testen",
    },
  }

  return (
    <>
      {/* Strukturierte Daten (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* 1. HERO-BEREICH */}
      <section className="bg-[#F7F8FB] pt-24 pb-16 px-6">
        <div className="max-w-[1120px] mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-[#9CA3AF] mb-8">
            <Link href="/" className="hover:text-[#4B5563] transition-colors">
              Startseite
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/rechner" className="hover:text-[#4B5563] transition-colors">
              Rechner
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#4B5563] font-medium">{tool.name}</span>
          </nav>

          {/* Headline */}
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-[#111827] mb-4">
              {tool.name}
            </h1>
            <p className="text-lg text-[#4B5563] leading-relaxed mb-8">
              {tool.description}
            </p>
            <Link
              href="/anmelden"
              className="inline-flex items-center gap-2 bg-[#4338CA] text-white px-8 py-3.5 rounded-full text-lg font-medium
                         hover:bg-[#5B52E0] transition-colors duration-300"
            >
              14 Tage kostenlos testen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. RECHNER-PREVIEW */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-8">
            So funktioniert der {tool.shortName}-Rechner
          </h2>
          <TeaseredCalculator slug={slug} />
          <div className="mt-8 max-w-2xl">
            <Disclaimer showTaxDisclaimer={tool.hasTaxDisclaimer} />
          </div>
        </div>
      </section>

      {/* 3. FEATURES-BEREICH */}
      {seoData?.features && (
        <section className="bg-[#F7F8FB] py-16 px-6">
          <div className="max-w-[1120px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-10">
              Das kann der {tool.shortName}-Rechner
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {seoData.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4338CA]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#4338CA]" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold text-[#111827] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. SEO-TEXT-BEREICH */}
      {seoData?.seoText && (
        <section className="bg-white py-16 px-6">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-8">
              {tool.name} — Einfach erklaert
            </h2>
            {seoData.seoText.map((block, index) => (
              <div key={index} className="mb-8 last:mb-0">
                <h3 className="text-xl font-semibold text-[#111827] mb-3">
                  {block.heading}
                </h3>
                {block.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-[#4B5563] leading-relaxed mb-4 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. FAQ-BEREICH */}
      {seoData?.faq && (
        <section className="bg-[#F7F8FB] py-16 px-6">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-10">
              Haeufige Fragen zum {tool.shortName}-Rechner
            </h2>
            <div className="space-y-4">
              {seoData.faq.map((item, index) => (
                <details
                  key={index}
                  className="group bg-white rounded-xl border border-[#E3E5EB] overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-[#111827] font-semibold text-[16px] hover:bg-[#F9FAFB] transition-colors">
                    <h3 className="pr-4">{item.question}</h3>
                    <ChevronRight className="h-5 w-5 text-[#9CA3AF] flex-shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-5 text-[#4B5563] leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. CTA-BEREICH */}
      <section className="bg-[#0B0D14] py-20 px-6">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F1F5F9] mb-4">
            Jetzt {tool.shortName} berechnen
          </h2>
          <p className="text-[#94A3B8] text-lg mb-8">
            Testen Sie alle 16 professionellen Immobilien-Rechner 14 Tage lang kostenlos.
            Keine Kreditkarte noetig.
          </p>
          <Link
            href="/anmelden"
            className="inline-flex items-center gap-2 bg-[#4338CA] text-white px-8 py-3.5 rounded-full text-lg font-medium
                       hover:bg-[#5B52E0] transition-colors duration-300"
          >
            14 Tage kostenlos testen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
