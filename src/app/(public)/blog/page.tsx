import Link from "next/link"
import type { Metadata } from "next"
import { blogPosts } from "@/lib/blog"

/* ─────────────────────── Metadata ─────────────────────── */

export const metadata: Metadata = {
  title: "Blog | Immobilien-Rechner — Ratgeber & Tipps",
  description:
    "Ratgeber, Tipps und aktuelle Informationen rund um Immobilien-Investment, Steuern und Vermietung.",
}

/* ─────────────────────── Structured Data ─────────────────────── */

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Immobilien-Rechner Blog",
  description:
    "Ratgeber, Tipps und aktuelle Informationen rund um Immobilien-Investment, Steuern und Vermietung.",
  url: "https://immobilien-rechner.de/blog",
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `https://immobilien-rechner.de/blog/${post.slug}`,
  })),
}

/* ─────────────────────── Hilfsfunktion ─────────────────────── */

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

/* ─────────────────────── Seite ─────────────────────── */

export default function BlogPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* ───── 1. HERO ───── */}
      <section className="bg-[#F7F8FB] pt-20 pb-16 px-6">
        <div className="max-w-[1120px] mx-auto text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.02em] text-[#111827]">
            Blog
          </h1>
          <p className="mt-4 text-lg text-[#4B5563] max-w-[640px] mx-auto">
            Ratgeber, Tipps und aktuelle Informationen rund um
            Immobilien-Investment, Steuern und Vermietung.
          </p>
        </div>
      </section>

      {/* ───── 2. ARTIKEL-GRID ───── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-[#E3E5EB] rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <span className="inline-block text-xs font-semibold text-[#4338CA] bg-[#4338CA]/[0.06] px-3 py-1 rounded-lg">
                  {post.category}
                </span>
                <h2 className="mt-4 text-xl font-bold tracking-[-0.01em] text-[#111827]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-[#4338CA] transition-colors duration-200"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-[#4B5563] leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center gap-3 text-sm text-[#9CA3AF]">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
