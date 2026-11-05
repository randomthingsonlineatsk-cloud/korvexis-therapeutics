import { createFileRoute, Link } from '@tanstack/react-router'
import { SiteHeader, SiteFooter, FictionalNotice } from '@/components/site-chrome'
import { ArrowRightIcon, BriefcaseIcon, CheckCircleIcon, LocationPinIcon } from '@/components/site-icons'
import { CAREERS, CULTURE_POINTS, type JobOpening } from '@/lib/korvexis-extra-data'
import siteMetadata from '@/metadata.json'
import { pageMeta } from '@/lib/page-meta'

const meta = siteMetadata['/careers'] ?? siteMetadata.default

export const Route = createFileRoute('/careers')({
  head: () => ({ meta: pageMeta(meta.title, meta.description) }),
  component: CareersPage,
})

function byDepartment(jobs: JobOpening[]) {
  const map = new Map<string, JobOpening[]>()
  for (const j of jobs) map.set(j.department, [...(map.get(j.department) ?? []), j])
  return [...map.entries()]
}

function CareersPage() {
  const grouped = byDepartment(CAREERS)

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-ink-line/10 bg-ink text-paper">
        <div className="bn-dotgrid pointer-events-none absolute inset-0 text-paper/[0.05]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">Careers</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight">Help move the platform from bench to bedside.</h1>
        </div>
      </section>
      <FictionalNotice />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {CULTURE_POINTS.map((c) => (
            <div key={c} className="flex items-start gap-2.5 rounded-md border border-ink-line/12 bg-paper-card p-5">
              <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-accent-ink" />
              <p className="text-sm leading-relaxed text-ink-soft">{c}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex items-center gap-2.5">
          <BriefcaseIcon className="size-6 text-accent-ink" />
          <h2 className="font-display text-2xl font-medium text-ink">Open roles</h2>
        </div>
        <div className="mt-8 space-y-8">
          {grouped.map(([dept, jobs]) => (
            <div key={dept}>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/60">{dept}</p>
              <div className="mt-3 divide-y divide-ink-line/10 rounded-md border border-ink-line/12 bg-paper-card">
                {jobs.map((j) => (
                  <Link key={j.title} to="/contact" search={{ topic: 'Careers' }} className="group flex flex-wrap items-center justify-between gap-2 px-5 py-4 transition-colors hover:bg-paper-dim">
                    <div>
                      <p className="font-display text-base font-medium text-ink group-hover:text-accent-ink">{j.title}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-soft">
                        <LocationPinIcon className="size-3.5" /> {j.location} · {j.type}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink-soft group-hover:text-accent-ink">
                      Apply <ArrowRightIcon className="size-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-ink-soft/60">
          "Apply" opens the contact form with a Careers inquiry — this is a portfolio demonstration, not a live applicant
          tracking system.
        </p>
      </section>

      <SiteFooter />
    </div>
  )
}
