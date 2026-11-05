import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { SiteHeader, SiteFooter, FictionalNotice } from '@/components/site-chrome'
import { ArrowRightIcon, PressIcon, RssIcon, TimelineIcon } from '@/components/site-icons'
import { NEWSROOM, programByCode, type NewsPost } from '@/lib/korvexis-data'
import siteMetadata from '@/metadata.json'
import { pageMeta } from '@/lib/page-meta'

const meta = siteMetadata['/newsroom'] ?? siteMetadata.default

export const Route = createFileRoute('/newsroom/')({
  head: () => ({ meta: pageMeta(meta.title, meta.description) }),
  component: NewsroomPage,
})

const CATEGORIES: (NewsPost['category'] | 'All')[] = ['All', 'Clinical', 'Regulatory', 'Corporate']

function NewsroomPage() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All')
  const posts = NEWSROOM.slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((n) => filter === 'All' || n.category === filter)

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-ink-line/10 bg-ink text-paper">
        <div className="bn-dotgrid pointer-events-none absolute inset-0 text-paper/[0.05]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <PressIcon className="size-9 text-accent-bright" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">Newsroom</p>
            </div>
            <a href="/feeds/newsroom.xml" className="inline-flex items-center gap-1.5 rounded-full border border-paper/25 px-3 py-1.5 text-xs font-semibold text-paper/80 transition-colors hover:border-paper/50 hover:text-paper">
              <RssIcon className="size-3.5" /> Subscribe via RSS
            </a>
          </div>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight">Announcements from Korvexis Therapeutics.</h1>
        </div>
      </section>
      <FictionalNotice />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                filter === c ? 'border-accent-bright bg-accent-soft text-accent-ink' : 'border-ink-line/15 text-ink-soft hover:border-ink-line/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="divide-y divide-ink-line/10">
          {posts.map((n) => {
            const program = n.programCode ? programByCode(n.programCode) : undefined
            return (
              <Link key={n.slug} to="/newsroom/$slug" params={{ slug: n.slug }} className="group flex flex-col gap-2 py-7 first:pt-0">
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wide text-accent-ink">
                    <TimelineIcon className="size-3.5" />
                    {n.category}
                  </span>
                  <span className="text-ink-soft/50">·</span>
                  <span className="text-ink-soft/70">{new Date(n.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  {program && (
                    <>
                      <span className="text-ink-soft/50">·</span>
                      <span className="font-mono text-ink-soft/70">{program.code}</span>
                    </>
                  )}
                </div>
                <h2 className="font-display text-xl font-medium leading-snug text-ink group-hover:text-accent-ink sm:text-2xl">{n.headline}</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">{n.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink-soft group-hover:text-accent-ink">
                  Read the release <ArrowRightIcon className="size-3.5" />
                </span>
              </Link>
            )
          })}
          {posts.length === 0 && <p className="py-10 text-sm text-ink-soft">No releases in this category yet.</p>}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
