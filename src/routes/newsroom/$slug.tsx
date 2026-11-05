import { createFileRoute, Link } from '@tanstack/react-router'
import { SiteHeader, SiteFooter, FictionalNotice } from '@/components/site-chrome'
import { ArrowRightIcon, PressIcon, TimelineIcon } from '@/components/site-icons'
import { NEWSROOM, programByCode } from '@/lib/korvexis-data'
import { pageMeta } from '@/lib/page-meta'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/newsroom'] ?? siteMetadata.default

export const Route = createFileRoute('/newsroom/$slug')({
  head: ({ params }) => {
    const post = NEWSROOM.find((n) => n.slug === params.slug)
    const title = post ? `${post.headline} — Korvexis Therapeutics` : meta.title
    const description = post?.excerpt ?? meta.description
    return { meta: pageMeta(title, description) }
  },
  component: NewsPostPage,
})

function NewsPostPage() {
  const { slug } = Route.useParams()
  const post = NEWSROOM.find((n) => n.slug === slug)
  const program = post?.programCode ? programByCode(post.programCode) : undefined

  if (!post) {
    return (
      <div className="min-h-screen bg-paper">
        <SiteHeader />
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="font-display text-2xl font-medium text-ink">We couldn't find that release.</h1>
          <Link to="/newsroom" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink hover:underline">
            Back to the newsroom <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
        <SiteFooter />
      </div>
    )
  }

  // NewsArticle structured data (schema.org), so search engines can offer a
  // rich preview for this press release. Korvexis is fictional, but this is
  // ordinary JSON-LD for a real page on a real, published site — the markup
  // itself is genuine, only the reported company is not.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.headline,
    description: post.excerpt,
    datePublished: post.date,
    articleSection: post.category,
    publisher: { '@type': 'Organization', name: 'Korvexis Therapeutics' },
    author: { '@type': 'Organization', name: 'Korvexis Therapeutics' },
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <article className="mx-auto max-w-2xl px-6 py-16">
        <Link to="/newsroom" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft hover:text-accent-ink">
          ← All news
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 font-semibold uppercase tracking-wide text-accent-ink">
            <TimelineIcon className="size-3.5" />
            {post.category}
          </span>
          {program && <span className="font-mono text-ink-soft/70">{program.code}{program.name ? ` · ${program.name}` : ''}</span>}
        </div>

        <h1 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">{post.headline}</h1>
        <p className="mt-3 text-sm text-ink-soft/70">
          {new Date(post.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="bn-rule my-8" />

        <div className="space-y-5">
          {post.body.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-ink">{p}</p>
          ))}
        </div>

        <div className="mt-12 flex items-start gap-2.5 rounded-md border border-ink-line/12 bg-paper-card p-5">
          <PressIcon className="mt-0.5 size-5 shrink-0 text-accent-ink" />
          <p className="text-xs leading-relaxed text-ink-soft">
            This press release is fictional, written for a design and content portfolio. Korvexis Therapeutics is not a real
            company, and no product, trial, or regulatory action described here has occurred.
          </p>
        </div>
      </article>

      <FictionalNotice />
      <SiteFooter />
    </div>
  )
}
