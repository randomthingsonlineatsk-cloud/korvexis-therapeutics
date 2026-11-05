import { createFileRoute, Link } from '@tanstack/react-router'
import { SiteHeader, SiteFooter, FictionalNotice } from '@/components/site-chrome'
import { MoleculeIcon, TargetIcon } from '@/components/site-icons'
import { PHASE_ORDER, PIPELINE, trialsForProgram, type Phase } from '@/lib/korvexis-data'
import siteMetadata from '@/metadata.json'
import { pageMeta } from '@/lib/page-meta'

const meta = siteMetadata['/pipeline'] ?? siteMetadata.default

export const Route = createFileRoute('/pipeline')({
  head: () => ({ meta: pageMeta(meta.title, meta.description) }),
  component: PipelinePage,
})

function phaseWidth(phase: Phase): string {
  const idx = PHASE_ORDER.indexOf(phase)
  return `${((idx + 1) / PHASE_ORDER.length) * 100}%`
}

function PipelinePage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-ink-line/10 bg-ink text-paper">
        <div className="bn-dotgrid pointer-events-none absolute inset-0 text-paper/[0.05]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">Pipeline</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight">Six programs, one delivery platform.</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/65">
            Every Korvexis program shares the same Thalorix chassis, tuned per indication for tissue targeting, payload,
            and release profile.
          </p>
        </div>
      </section>
      <FictionalNotice />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 hidden grid-cols-7 gap-1 text-[10px] font-semibold uppercase tracking-wide text-ink-soft/60 sm:grid">
          {PHASE_ORDER.map((p) => <span key={p} className="text-center">{p}</span>)}
        </div>
        <div className="space-y-6">
          {PIPELINE.map((program) => {
            const trials = trialsForProgram(program.code)
            return (
              <article key={program.code} className="rounded-md border border-ink-line/12 bg-paper-card p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <MoleculeIcon className="size-6 text-accent-ink" />
                      <span className="font-mono text-sm font-semibold text-ink-soft">{program.code}</span>
                      {program.lead && <span className="rounded-full bg-accent-bright/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-ink">Lead program</span>}
                    </div>
                    <h2 className="mt-1.5 font-display text-2xl font-medium text-ink">{program.name ?? program.code}</h2>
                    <p className="mt-1 text-sm text-ink-soft">{program.indication}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-ink">{program.phase}</span>
                </div>

                {/* phase progress bar */}
                <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-paper-dim">
                  <div className="h-full rounded-full bg-accent-bright transition-all" style={{ width: phaseWidth(program.phase) }} />
                </div>

                <p className="mt-5 text-sm leading-relaxed text-ink-soft">{program.summary}</p>

                <div className="mt-5 grid gap-4 border-t border-ink-line/10 pt-5 sm:grid-cols-2">
                  <div className="flex gap-2.5">
                    <TargetIcon className="mt-0.5 size-4 shrink-0 text-accent-ink" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft/60">Mechanism / target</p>
                      <p className="text-sm text-ink">{program.target}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft/60">Why it matters</p>
                    <p className="text-sm text-ink">{program.differentiator}</p>
                  </div>
                </div>

                {trials.length > 0 && (
                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink-line/10 pt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft/60">Trials:</span>
                    {trials.map((t) => (
                      <Link key={t.id} to="/trials" className="rounded-sm border border-ink-line/15 px-2.5 py-1 font-mono text-xs text-ink-soft hover:border-accent-bright/50 hover:text-accent-ink">
                        {t.id}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
