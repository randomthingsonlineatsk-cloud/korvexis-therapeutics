import { createFileRoute, Link } from '@tanstack/react-router'
import { SiteHeader, SiteFooter, FictionalNotice } from '@/components/site-chrome'
import { ArrowRightIcon, ShieldMarkIcon, VialIcon } from '@/components/site-icons'
import { PATIENT_RESOURCES } from '@/lib/korvexis-extra-data'
import { TRIALS } from '@/lib/korvexis-data'
import siteMetadata from '@/metadata.json'
import { pageMeta } from '@/lib/page-meta'

const meta = siteMetadata['/patients'] ?? siteMetadata.default

export const Route = createFileRoute('/patients')({
  head: () => ({ meta: pageMeta(meta.title, meta.description) }),
  component: PatientsPage,
})

function PatientsPage() {
  const recruiting = TRIALS.filter((t) => t.status === 'Recruiting')

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-ink-line/10 bg-ink text-paper">
        <div className="bn-dotgrid pointer-events-none absolute inset-0 text-paper/[0.05]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">Patients & Caregivers</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight">Information for patients, families, and caregivers.</h1>
        </div>
      </section>
      <FictionalNotice />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-6">
          {PATIENT_RESOURCES.map((r) => (
            <div key={r.title} className="flex gap-4 rounded-md border border-ink-line/12 bg-paper-card p-6">
              <ShieldMarkIcon className="mt-0.5 size-6 shrink-0 text-accent-ink" />
              <div>
                <h2 className="font-display text-lg font-medium text-ink">{r.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper-dim">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-center gap-2.5">
            <VialIcon className="size-6 text-accent-ink" />
            <h2 className="font-display text-2xl font-medium text-ink">Currently enrolling</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {recruiting.map((t) => (
              <div key={t.id} className="rounded-md border border-ink-line/12 bg-paper-card p-5">
                <p className="font-mono text-xs text-ink-soft/70">{t.id}</p>
                <p className="mt-1 font-display text-base font-medium text-ink">{t.indication}</p>
                <p className="mt-1 text-xs text-ink-soft">{t.phase} · {t.sites}</p>
              </div>
            ))}
          </div>
          <Link to="/trials" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink hover:underline">
            See all clinical trials <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-medium text-ink">Still have questions?</h2>
        <p className="mt-2 text-sm text-ink-soft">Reach the team directly and we'll do our best to help or point you to a study site.</p>
        <Link to="/contact" search={{ topic: 'General' }} className="mt-5 inline-flex items-center gap-1.5 rounded-sm bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink/90">
          Contact Korvexis <ArrowRightIcon className="size-3.5" />
        </Link>
      </section>

      <SiteFooter />
    </div>
  )
}
