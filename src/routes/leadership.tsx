import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader, SiteFooter, FictionalNotice } from '@/components/site-chrome'
import { ShieldMarkIcon } from '@/components/site-icons'
import { BOARD, LEADERSHIP } from '@/lib/korvexis-extra-data'
import siteMetadata from '@/metadata.json'
import { pageMeta } from '@/lib/page-meta'

const meta = siteMetadata['/leadership'] ?? siteMetadata.default

export const Route = createFileRoute('/leadership')({
  head: () => ({ meta: pageMeta(meta.title, meta.description) }),
  component: LeadershipPage,
})

function initials(name: string) {
  return name.replace('Dr. ', '').split(' ').map((p) => p[0]).slice(0, 2).join('')
}

function LeadershipPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-ink-line/10 bg-ink text-paper">
        <div className="bn-dotgrid pointer-events-none absolute inset-0 text-paper/[0.05]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">Leadership & Board</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight">The people steering Korvexis.</h1>
        </div>
      </section>
      <FictionalNotice />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-medium text-ink">Executive team</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP.map((l) => (
            <div key={l.name} className="rounded-md border border-ink-line/12 bg-paper-card p-6">
              <div className="flex size-12 items-center justify-center rounded-full bg-accent-soft font-display text-lg font-semibold text-accent-ink">
                {initials(l.name)}
              </div>
              <h3 className="mt-4 font-display text-lg font-medium text-ink">{l.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-ink">{l.role}</p>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{l.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper-dim">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-center gap-2.5">
            <ShieldMarkIcon className="size-6 text-accent-ink" />
            <h2 className="font-display text-2xl font-medium text-ink">Board of Directors</h2>
          </div>
          <div className="mt-8 divide-y divide-ink-line/10 rounded-md border border-ink-line/12 bg-paper-card">
            {BOARD.map((b) => (
              <div key={b.name} className="flex flex-wrap items-center justify-between gap-2 px-6 py-4">
                <p className="font-display text-base font-medium text-ink">{b.name}</p>
                <p className="text-sm text-ink-soft">{b.affiliation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
