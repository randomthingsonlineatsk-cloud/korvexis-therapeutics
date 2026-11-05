import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader, SiteFooter, FictionalNotice } from '@/components/site-chrome'
import { ShieldMarkIcon, TimelineIcon } from '@/components/site-icons'
import { programByCode, REGULATORY_MILESTONES, type Authority } from '@/lib/korvexis-data'
import siteMetadata from '@/metadata.json'
import { pageMeta } from '@/lib/page-meta'

const meta = siteMetadata['/regulatory'] ?? siteMetadata.default

export const Route = createFileRoute('/regulatory')({
  head: () => ({ meta: pageMeta(meta.title, meta.description) }),
  component: RegulatoryPage,
})

const AUTHORITY_STYLE: Record<Authority, string> = {
  FDA: 'bg-accent-soft text-accent-ink',
  EMA: 'bg-[hsl(30_60%_92%)] text-[hsl(30_60%_28%)]',
  'Health Canada': 'bg-[hsl(0_65%_94%)] text-[hsl(0_60%_35%)]',
}

function monthYear(date: string) {
  const [y, m] = date.split('-')
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}

function RegulatoryPage() {
  const sorted = REGULATORY_MILESTONES.slice().sort((a, b) => a.date.localeCompare(b.date))
  const byYear = new Map<string, typeof sorted>()
  for (const m of sorted) {
    const y = m.date.slice(0, 4)
    byYear.set(y, [...(byYear.get(y) ?? []), m])
  }

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-ink-line/10 bg-ink text-paper">
        <div className="bn-dotgrid pointer-events-none absolute inset-0 text-paper/[0.05]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">Regulatory</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight">A record built one designation at a time.</h1>
        </div>
      </section>
      <FictionalNotice />

      <section className="mx-auto max-w-4xl px-6 py-16">
        {[...byYear.entries()].map(([year, items]) => (
          <div key={year} className="mb-14 last:mb-0">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-display text-3xl font-semibold text-ink">{year}</span>
              <div className="bn-rule flex-1" />
            </div>
            <ol className="space-y-6 border-l border-ink-line/15 pl-7">
              {items.map((m, i) => {
                const program = programByCode(m.programCode)
                return (
                  <li key={i} className="relative">
                    <span className="absolute -left-[31px] top-1 flex size-4 items-center justify-center rounded-full bg-accent-bright ring-4 ring-paper" />
                    <div className="flex flex-wrap items-center gap-2.5">
                      <ShieldMarkIcon className="size-5 text-accent-ink" />
                      <span className="font-display text-base font-semibold text-ink">{m.type}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${AUTHORITY_STYLE[m.authority]}`}>{m.authority}</span>
                      <span className="font-mono text-xs text-ink-soft/60">{m.programCode}{program?.name ? ` · ${program.name}` : ''}</span>
                    </div>
                    <p className="mt-1.5 text-xs uppercase tracking-wide text-ink-soft/55">{monthYear(m.date)}</p>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-soft">{m.description}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        ))}
        <div className="mt-4 flex items-start gap-2.5 rounded-md border border-ink-line/12 bg-paper-card p-5">
          <TimelineIcon className="mt-0.5 size-5 shrink-0 text-accent-ink" />
          <p className="text-xs leading-relaxed text-ink-soft">
            Milestones are listed in the order they occurred. This page is a fictional illustration of how a nanomedicine
            company's regulatory record accumulates alongside its clinical program — it is not a real regulatory history.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
