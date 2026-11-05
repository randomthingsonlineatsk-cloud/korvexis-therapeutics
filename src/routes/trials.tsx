import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader, SiteFooter, FictionalNotice } from '@/components/site-chrome'
import { LocationPinIcon, VialIcon } from '@/components/site-icons'
import { programByCode, TRIALS, type TrialStatus } from '@/lib/korvexis-data'
import siteMetadata from '@/metadata.json'
import { pageMeta } from '@/lib/page-meta'

const meta = siteMetadata['/trials'] ?? siteMetadata.default

export const Route = createFileRoute('/trials')({
  head: () => ({ meta: pageMeta(meta.title, meta.description) }),
  component: TrialsPage,
})

const STATUS_STYLE: Record<TrialStatus, string> = {
  Recruiting: 'bg-accent-soft text-accent-ink',
  'Active, not recruiting': 'bg-paper-dim text-ink-soft',
  Completed: 'bg-ink-line/10 text-ink-soft',
}

function TrialsPage() {
  const trials = TRIALS.slice().sort((a, b) => (a.status === 'Recruiting' ? -1 : 1) - (b.status === 'Recruiting' ? -1 : 1))

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-ink-line/10 bg-ink text-paper">
        <div className="bn-dotgrid pointer-events-none absolute inset-0 text-paper/[0.05]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">Clinical Trials</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight">Where each program stands in the clinic.</h1>
        </div>
      </section>
      <FictionalNotice />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-5">
          {trials.map((t) => {
            const program = programByCode(t.programCode)
            return (
              <article key={t.id} className="rounded-md border border-ink-line/12 bg-paper-card p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <VialIcon className="mt-0.5 size-7 shrink-0 text-accent-ink" />
                    <div>
                      <p className="font-mono text-xs font-semibold text-ink-soft/70">{t.id}</p>
                      <h2 className="mt-0.5 font-display text-xl font-medium text-ink">
                        {t.phase} · {program?.code}{program?.name ? ` (${program.name})` : ''}
                      </h2>
                      <p className="mt-1 text-sm text-ink-soft">{t.indication}</p>
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[t.status]}`}>{t.status}</span>
                </div>

                <div className="mt-6 grid gap-5 border-t border-ink-line/10 pt-5 sm:grid-cols-3">
                  <div className="flex items-start gap-2">
                    <LocationPinIcon className="mt-0.5 size-4 shrink-0 text-accent-ink" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft/60">Sites</p>
                      <p className="text-sm text-ink">{t.sites}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft/60">Target enrollment</p>
                    <p className="text-sm text-ink">{t.enrollment} participants</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft/60">Started</p>
                    <p className="text-sm text-ink">{t.started}</p>
                  </div>
                </div>
                <div className="mt-4 border-t border-ink-line/10 pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft/60">Primary endpoint</p>
                  <p className="text-sm text-ink">{t.primaryEndpoint}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
