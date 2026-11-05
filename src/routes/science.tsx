import { createFileRoute, Link } from '@tanstack/react-router'
import { SiteHeader, SiteFooter, FictionalNotice } from '@/components/site-chrome'
import { ArrowRightIcon, MoleculeIcon, StrandIcon, TargetIcon } from '@/components/site-icons'
import { COMPANY } from '@/lib/korvexis-data'
import { MECHANISM_STEPS } from '@/lib/korvexis-extra-data'
import siteMetadata from '@/metadata.json'
import { pageMeta } from '@/lib/page-meta'

const meta = siteMetadata['/science'] ?? siteMetadata.default

export const Route = createFileRoute('/science')({
  head: () => ({ meta: pageMeta(meta.title, meta.description) }),
  component: SciencePage,
})

const PAYLOAD_CLASSES = [
  { payload: 'Small molecule (chemotherapy)', program: 'BN-101, BN-310' },
  { payload: 'siRNA', program: 'BN-204' },
  { payload: 'mRNA antigen', program: 'BN-450' },
  { payload: 'Enzyme replacement', program: 'BN-500' },
]

function SciencePage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-ink-line/10 bg-ink text-paper">
        <div className="bn-dotgrid pointer-events-none absolute inset-0 text-paper/[0.05]" />
        <div className="pointer-events-none absolute -right-16 -top-10 opacity-20">
          <StrandIcon className="size-64 text-accent-bright" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">The Science</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight">One carrier. Four payload classes. A dozen ways to fail less often.</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/65">{COMPANY.mission}</p>
        </div>
      </section>
      <FictionalNotice />

      {/* Mechanism steps */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">How Thalorix works</p>
        <h2 className="mt-2 max-w-xl font-display text-3xl font-medium text-ink">From shell to release, in four stages.</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MECHANISM_STEPS.map((s) => (
            <div key={s.step} className="relative rounded-md border border-ink-line/12 bg-paper-card p-6">
              <span className="font-display text-4xl font-semibold text-accent-soft">{String(s.step).padStart(2, '0')}</span>
              <h3 className="mt-3 font-display text-lg font-medium text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Payload versatility */}
      <section className="bg-paper-dim">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-[1fr_1.2fr] sm:items-center">
          <div>
            <MoleculeIcon className="size-12 text-accent-ink" />
            <h2 className="mt-4 font-display text-3xl font-medium text-ink">The same chassis, four different cargos.</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Rather than build a new delivery system for every program, Korvexis adapts one lipid–polymer particle to carry
              whatever the therapeutic strategy requires.
            </p>
          </div>
          <div className="overflow-hidden rounded-md border border-ink-line/12 bg-paper-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink-line/10 text-xs uppercase tracking-wide text-ink-soft/60">
                  <th className="px-5 py-3 font-semibold">Payload class</th>
                  <th className="px-5 py-3 font-semibold">Programs</th>
                </tr>
              </thead>
              <tbody>
                {PAYLOAD_CLASSES.map((p) => (
                  <tr key={p.payload} className="border-b border-ink-line/8 last:border-0">
                    <td className="px-5 py-3.5 text-ink">{p.payload}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-ink-soft">{p.program}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Targeting */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 rounded-md border border-ink-line/12 bg-paper-card p-8 sm:flex-row sm:items-start">
          <TargetIcon className="size-10 shrink-0 text-accent-ink" />
          <div>
            <h2 className="font-display text-2xl font-medium text-ink">Passive and active targeting, by program</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Solid tumor programs like BN-101 lean on the leaky vasculature that surrounds many tumors (enhanced
              permeability and retention). BN-500 instead needs an active targeting ligand to cross the blood–brain
              barrier — the same chassis, engineered for a very different biological barrier.
            </p>
            <Link to="/pipeline" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink hover:underline">
              See how this plays out across the pipeline <ArrowRightIcon className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
