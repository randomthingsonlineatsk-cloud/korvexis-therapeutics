import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { SiteHeader, SiteFooter, FictionalNotice } from '@/components/site-chrome'
import { ExternalLinkIcon, BookIcon } from '@/components/site-icons-research'
import { TimelineIcon } from '@/components/site-icons'
import { usePapers } from '@/lib/research'
import siteMetadata from '@/metadata.json'
import { pageMeta } from '@/lib/page-meta'

const meta = siteMetadata['/research'] ?? siteMetadata.default

export const Route = createFileRoute('/research')({
  head: () => ({ meta: pageMeta(meta.title, meta.description) }),
  component: ResearchPage,
})

function ResearchPage() {
  const papers = usePapers(true)
  const [topicFilter, setTopicFilter] = useState<string | null>(null)

  const list = papers ?? []
  const topics = useMemo(() => [...new Set(list.map((p) => p.queryTopic))].sort(), [list])
  const visible = topicFilter ? list.filter((p) => p.queryTopic === topicFilter) : list

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-ink-line/10 bg-ink text-paper">
        <div className="bn-dotgrid pointer-events-none absolute inset-0 text-paper/[0.05]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-center gap-3">
            <BookIcon className="size-9 text-accent-bright" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">Research Watch</p>
          </div>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight">The literature Korvexis's team is reading.</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/65">
            {papers === undefined ? 'Loading the latest papers from PubMed…' : `${list.length} recent papers, pulled live from PubMed.`}
          </p>
        </div>
      </section>
      <FictionalNotice />

      <section className="mx-auto max-w-6xl px-6 pt-8">
        <div className="flex items-start gap-3 rounded-md border border-accent-bright/25 bg-accent-soft p-5">
          <TimelineIcon className="mt-0.5 size-5 shrink-0 text-accent-ink" />
          <p className="text-xs leading-relaxed text-accent-ink/90">
            <span className="font-semibold">These are real, published papers from PubMed</span> — genuine external research in
            Korvexis's therapeutic areas (lipid nanoparticles, siRNA, mRNA delivery, nanomedicine oncology, and rare disease
            gene therapy), fetched from PubMed when you open this page and never edited. They are not Korvexis's own research, and Korvexis
            itself remains a fictional company built for this portfolio. Click through to read any paper on PubMed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setTopicFilter(null)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${!topicFilter ? 'border-accent-bright bg-accent-soft text-accent-ink' : 'border-ink-line/15 text-ink-soft hover:border-ink-line/30'}`}
          >
            All topics
          </button>
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setTopicFilter(t)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold capitalize transition-colors ${topicFilter === t ? 'border-accent-bright bg-accent-soft text-accent-ink' : 'border-ink-line/15 text-ink-soft hover:border-ink-line/30'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {papers === undefined ? (
          <p className="text-sm text-ink-soft">Fetching papers from PubMed… this can take a few seconds.</p>
        ) : visible.length === 0 ? (
          <p className="text-sm text-ink-soft">
            Couldn't reach PubMed right now. Please try again in a moment.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {visible.map((p) => (
              <a
                key={p.pmid}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-md border border-ink-line/12 bg-paper-card p-6 transition-colors hover:border-accent-bright/50"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-paper-dim px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-soft/70">{p.queryTopic}</span>
                  <ExternalLinkIcon className="size-4 shrink-0 text-ink-soft/50 transition-colors group-hover:text-accent-ink" />
                </div>
                <h2 className="mt-3 font-display text-base font-medium leading-snug text-ink group-hover:text-accent-ink">{p.title}</h2>
                <p className="mt-2 text-xs text-ink-soft/80">{p.authors.slice(0, 4).join(', ')}{p.authors.length > 4 ? ', et al.' : ''}</p>
                <p className="mt-1 text-xs italic text-ink-soft/70">{p.journal} · {p.pubDate}</p>
                <p className="mt-auto pt-4 text-[10px] uppercase tracking-wide text-ink-soft/45">PMID {p.pmid}</p>
              </a>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  )
}
