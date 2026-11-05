import { createFileRoute, Link } from '@tanstack/react-router'
import { SiteHeader, SiteFooter, FictionalNotice } from '@/components/site-chrome'
import { ArrowRightIcon, MoleculeIcon, ShieldMarkIcon, StrandIcon, TargetIcon, TimelineIcon, VialIcon } from '@/components/site-icons'
import { BookIcon, ExternalLinkIcon } from '@/components/site-icons-research'
import { COMPANY, NEWSROOM, PIPELINE } from '@/lib/korvexis-data'
import { usePapers } from '@/lib/research'
import { pageMeta } from '@/lib/page-meta'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/'] ?? siteMetadata.default

export const Route = createFileRoute('/')({
  head: () => ({ meta: pageMeta(meta.title, meta.description) }),
  component: HomePage,
})

const PILLARS = [
  { Icon: TargetIcon, title: 'Tissue-selective delivery', body: 'The Thalorix lipid–polymer shell is tuned per program so the payload concentrates where it is needed and clears everywhere else.' },
  { Icon: StrandIcon, title: 'One chassis, many payloads', body: 'The same particle chemistry has carried a chemotherapy analog, an siRNA strand, an enzyme, and an mRNA antigen — swapping the cargo, not rebuilding the carrier.' },
  { Icon: ShieldMarkIcon, title: 'Built with regulators in view', body: "Every program's CMC and nonclinical package is scoped against the designation pathway we're pursuing, from Orphan Drug status to Fast Track." },
]

function HomePage() {
  const lead = PIPELINE.find((p) => p.lead)!
  const latestNews = NEWSROOM.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  const latestPapers = (usePapers(true) ?? []).slice(0, 3)

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="bn-dotgrid pointer-events-none absolute inset-0 text-paper/[0.06]" />
        <div className="pointer-events-none absolute -right-24 -top-16 opacity-20 sm:-right-8 sm:opacity-30">
          <MoleculeIcon className="size-[320px] text-accent-bright sm:size-[420px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">The Thalorix Platform</p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl">
            {COMPANY.tagline}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/70">{COMPANY.mission}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/pipeline" className="inline-flex items-center gap-2 rounded-sm bg-accent-bright px-5 py-3 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5">
              See the pipeline <ArrowRightIcon className="size-4" />
            </Link>
            <Link to="/regulatory" className="inline-flex items-center gap-2 rounded-sm border border-paper/25 px-5 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper/60">
              Regulatory milestones
            </Link>
          </div>
        </div>
        <div className="relative grid grid-cols-2 gap-px border-t border-paper/10 bg-paper/10 sm:grid-cols-4">
          {COMPANY.stats.map((s) => (
            <div key={s.label} className="bg-ink px-6 py-6">
              <p className="font-display text-3xl font-semibold text-accent-bright">{s.value}</p>
              <p className="mt-1 text-xs text-paper/55">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      <FictionalNotice />

      {/* Platform pillars */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">Why the platform travels</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-medium text-ink">A carrier that has already crossed three therapeutic classes.</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {PILLARS.map(({ Icon, title, body }) => (
            <div key={title}>
              <Icon className="size-9 text-ink" />
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
        <Link to="/science" className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink hover:underline">
          See how Thalorix actually works <ArrowRightIcon className="size-3.5" />
        </Link>
      </section>

      {/* Lead program spotlight */}
      <section className="bg-paper-dim">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:grid-cols-[1fr_1.3fr] sm:items-center">
          <div>
            <VialIcon className="size-12 text-accent-ink" />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">Lead program · {lead.code}</p>
            <h2 className="mt-2 font-display text-3xl font-medium text-ink">{lead.name}</h2>
            <span className="mt-3 inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-ink">{lead.phase}</span>
          </div>
          <div className="rounded-md border border-ink-line/12 bg-paper-card p-7">
            <p className="text-sm leading-relaxed text-ink-soft">{lead.summary}</p>
            <div className="bn-rule my-5" />
            <p className="text-sm leading-relaxed text-ink"><span className="font-semibold">Why it matters: </span>{lead.differentiator}</p>
            <Link to="/pipeline" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink hover:underline">
              View the full pipeline <ArrowRightIcon className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Research Watch teaser */}
      {latestPapers.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <BookIcon className="size-6 text-accent-ink" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">Research Watch</p>
              </div>
              <h2 className="mt-2 font-display text-3xl font-medium text-ink">Real, recent literature.</h2>
              <p className="mt-1 max-w-lg text-sm text-ink-soft">Genuine PubMed papers in Korvexis's therapeutic areas, pulled live from PubMed.</p>
            </div>
            <Link to="/research" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent-ink sm:inline-flex">
              All papers <ArrowRightIcon className="size-3.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {latestPapers.map((p) => (
              <a key={p.pmid} href={p.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col rounded-md border border-ink-line/12 bg-paper-card p-5 transition-colors hover:border-accent-bright/50">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-paper-dim px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-soft/70">{p.queryTopic}</span>
                  <ExternalLinkIcon className="size-3.5 shrink-0 text-ink-soft/50 transition-colors group-hover:text-accent-ink" />
                </div>
                <h3 className="mt-2.5 font-display text-sm font-medium leading-snug text-ink group-hover:text-accent-ink line-clamp-3">{p.title}</h3>
                <p className="mt-auto pt-3 text-xs italic text-ink-soft/70">{p.journal}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Newsroom teaser */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">Newsroom</p>
            <h2 className="mt-2 font-display text-3xl font-medium text-ink">Recent announcements</h2>
          </div>
          <Link to="/newsroom" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent-ink sm:inline-flex">
            All news <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {latestNews.map((n) => (
            <Link key={n.slug} to="/newsroom/$slug" params={{ slug: n.slug }} className="group block rounded-md border border-ink-line/12 bg-paper-card p-6 transition-colors hover:border-accent-bright/50">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-ink">
                <TimelineIcon className="size-4" />
                {n.category}
              </div>
              <h3 className="mt-3 font-display text-lg font-medium leading-snug text-ink group-hover:text-accent-ink">{n.headline}</h3>
              <p className="mt-2 text-xs text-ink-soft/70">
                {new Date(n.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
