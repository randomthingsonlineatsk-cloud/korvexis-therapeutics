import { createFileRoute, Link } from '@tanstack/react-router'
import { SiteHeader, SiteFooter, FictionalNotice } from '@/components/site-chrome'
import { ArrowRightIcon, BuildingIcon, CheckCircleIcon, DownloadIcon } from '@/components/site-icons'
import { FUNDING_HISTORY, INVESTOR_HIGHLIGHTS } from '@/lib/korvexis-extra-data'
import { COMPANY } from '@/lib/korvexis-data'
import siteMetadata from '@/metadata.json'
import { pageMeta } from '@/lib/page-meta'

const meta = siteMetadata['/investors'] ?? siteMetadata.default

export const Route = createFileRoute('/investors')({
  head: () => ({ meta: pageMeta(meta.title, meta.description) }),
  component: InvestorsPage,
})

function InvestorsPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-ink-line/10 bg-ink text-paper">
        <div className="bn-dotgrid pointer-events-none absolute inset-0 text-paper/[0.05]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">Investors</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight">A platform validated across four payload classes.</h1>
        </div>
      </section>
      <FictionalNotice />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {INVESTOR_HIGHLIGHTS.map((h) => (
            <div key={h} className="flex items-start gap-2.5 rounded-md border border-ink-line/12 bg-paper-card p-5">
              <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-accent-ink" />
              <p className="text-sm leading-relaxed text-ink-soft">{h}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper-dim">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-center gap-2.5">
            <BuildingIcon className="size-6 text-accent-ink" />
            <h2 className="font-display text-2xl font-medium text-ink">Funding history</h2>
          </div>
          <div className="mt-8 overflow-hidden rounded-md border border-ink-line/12 bg-paper-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink-line/10 text-xs uppercase tracking-wide text-ink-soft/60">
                  <th className="px-5 py-3 font-semibold">Round</th>
                  <th className="px-5 py-3 font-semibold">Year</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Lead investor</th>
                </tr>
              </thead>
              <tbody>
                {FUNDING_HISTORY.map((f) => (
                  <tr key={f.round} className="border-b border-ink-line/8 last:border-0">
                    <td className="px-5 py-3.5 font-medium text-ink">{f.round}</td>
                    <td className="px-5 py-3.5 text-ink-soft">{f.year}</td>
                    <td className="px-5 py-3.5 font-mono text-accent-ink">{f.amount}</td>
                    <td className="px-5 py-3.5 text-ink-soft">{f.leadInvestor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-soft/60">Total raised to date: $181M across four rounds.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-md border border-ink-line/12 bg-paper-card p-6">
            <h3 className="font-display text-lg font-medium text-ink">Company overview</h3>
            <p className="mt-2 text-sm text-ink-soft">A one-page summary of {COMPANY.short}'s pipeline, milestones, and funding.</p>
            <a href="/press/korvexis-one-pager.pdf" download className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-ink hover:underline">
              <DownloadIcon className="size-4" /> Download the one-pager (PDF)
            </a>
          </div>
          <div className="rounded-md border border-ink-line/12 bg-paper-card p-6">
            <h3 className="font-display text-lg font-medium text-ink">Talk to investor relations</h3>
            <p className="mt-2 text-sm text-ink-soft">Questions about the pipeline, financing, or upcoming milestones.</p>
            <Link to="/contact" search={{ topic: 'Investor inquiry' }} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink hover:underline">
              Contact investor relations <ArrowRightIcon className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
