import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { blogPosts, getBlogPost, getRelatedPosts } from "@/lib/blog"

/* ─────────────────────── Statische Params ─────────────────────── */

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

/* ─────────────────────── Metadata ─────────────────────── */

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: `${post.title} | Immobilien-Rechner Blog`,
    description: post.description,
  }
}

/* ─────────────────────── Hilfsfunktionen ─────────────────────── */

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

/**
 * Bestimmt den passenden Rechner-Link basierend auf der Kategorie des Artikels.
 */
function getCtaLink(slug: string): { href: string; label: string } {
  const links: Record<string, { href: string; label: string }> = {
    "immobilie-als-kapitalanlage-2026": {
      href: "/rechner/rendite-rechner",
      label: "Rendite berechnen",
    },
    "grunderwerbsteuer-2026-alle-steuersaetze": {
      href: "/rechner/grunderwerbsteuer-rechner",
      label: "Grunderwerbsteuer berechnen",
    },
    "kaufnebenkosten-immobilienkauf-guide": {
      href: "/rechner/kaufnebenkosten-rechner",
      label: "Kaufnebenkosten berechnen",
    },
    "kaufen-oder-mieten-entscheidung": {
      href: "/rechner/kaufen-vs-mieten",
      label: "Kaufen vs. Mieten vergleichen",
    },
    "mieterhoehung-vermieter-guide": {
      href: "/rechner/mieterhoehungs-rechner",
      label: "Mieterhöhung berechnen",
    },
  }
  return links[slug] ?? { href: "/rechner", label: "Alle Rechner ansehen" }
}

/* ─────────────────────── Seite ─────────────────────── */

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(slug, 2)
  const cta = getCtaLink(slug)

  /* ── Structured Data ── */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Immobilien-Rechner",
      url: "https://immobilien-rechner.de",
    },
    publisher: {
      "@type": "Organization",
      name: "Immobilien-Rechner",
      url: "https://immobilien-rechner.de",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://immobilien-rechner.de/blog/${post.slug}`,
    },
  }

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
        name: "Blog",
        item: "https://immobilien-rechner.de/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://immobilien-rechner.de/blog/${post.slug}`,
      },
    ],
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ───── 1. BREADCRUMB ───── */}
      <div className="bg-[#F7F8FB] pt-8 px-6">
        <nav
          className="max-w-[1120px] mx-auto text-sm text-[#9CA3AF]"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li>
              <Link
                href="/"
                className="hover:text-[#4338CA] transition-colors"
              >
                Startseite
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/blog"
                className="hover:text-[#4338CA] transition-colors"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#4B5563] truncate max-w-[300px]">
              {post.title}
            </li>
          </ol>
        </nav>
      </div>

      {/* ───── 2. ARTIKEL-HEADER ───── */}
      <section className="bg-[#F7F8FB] pt-8 pb-16 px-6">
        <div className="max-w-[720px] mx-auto">
          <span className="inline-block text-xs font-semibold text-[#4338CA] bg-[#4338CA]/[0.06] px-3 py-1 rounded-lg">
            {post.category}
          </span>
          <h1 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.02em] text-[#111827] leading-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-[#9CA3AF]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
          <p className="mt-4 text-lg text-[#4B5563] leading-relaxed">
            {post.description}
          </p>
        </div>
      </section>

      {/* ───── 3. CONTENT ───── */}
      <section className="bg-white py-16 px-6">
        <div
          className="max-w-[720px] mx-auto blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>

      {/* ───── 4. CTA-BOX ───── */}
      <section className="bg-white pb-16 px-6">
        <div className="max-w-[720px] mx-auto">
          <div className="bg-[#F7F8FB] border border-[#E3E5EB] rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-[#111827]">
              Jetzt selbst berechnen
            </h2>
            <p className="mt-2 text-[#4B5563]">
              Nutzen Sie unseren kostenlosen Rechner und erhalten Sie sofort Ihr
              Ergebnis.
            </p>
            <Link
              href={cta.href}
              className="mt-6 inline-flex items-center gap-2 bg-[#4338CA] text-white font-medium px-8 py-3.5 rounded-lg hover:bg-[#5B52E0] transition-colors duration-300"
            >
              {cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───── 5. WEITERE ARTIKEL ───── */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#F7F8FB] py-24 px-6">
          <div className="max-w-[1120px] mx-auto">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#111827] mb-8">
              Weitere Artikel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <article
                  key={related.slug}
                  className="bg-white border border-[#E3E5EB] rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <span className="inline-block text-xs font-semibold text-[#4338CA] bg-[#4338CA]/[0.06] px-3 py-1 rounded-lg">
                    {related.category}
                  </span>
                  <h3 className="mt-4 text-xl font-bold tracking-[-0.01em] text-[#111827]">
                    <Link
                      href={`/blog/${related.slug}`}
                      className="hover:text-[#4338CA] transition-colors duration-200"
                    >
                      {related.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[#4B5563] leading-relaxed line-clamp-3">
                    {related.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-sm text-[#9CA3AF]">
                    <time dateTime={related.date}>
                      {formatDate(related.date)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{related.readingTime}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── Content-Styles (inline) ───── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .blog-content h2 {
              font-size: 1.5rem;
              font-weight: 700;
              color: #111827;
              margin-top: 2.5rem;
              margin-bottom: 1rem;
              line-height: 1.3;
            }
            .blog-content h3 {
              font-size: 1.25rem;
              font-weight: 700;
              color: #111827;
              margin-top: 2rem;
              margin-bottom: 0.75rem;
              line-height: 1.3;
            }
            .blog-content p {
              color: #4B5563;
              line-height: 1.75;
              margin-bottom: 1rem;
            }
            .blog-content a {
              color: #4338CA;
              text-decoration: underline;
              text-underline-offset: 2px;
            }
            .blog-content a:hover {
              color: #5B52E0;
            }
            .blog-content strong {
              font-weight: 600;
              color: #111827;
            }
          `,
        }}
      />
    </>
  )
}
