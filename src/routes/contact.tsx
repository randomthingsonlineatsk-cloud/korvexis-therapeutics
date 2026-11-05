import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation, api } from '@/lib/backend'
import { SiteHeader, SiteFooter, FictionalNotice } from '@/components/site-chrome'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircleIcon, DownloadIcon, LocationPinIcon, MailIcon, PressIcon } from '@/components/site-icons'
import { COMPANY } from '@/lib/korvexis-data'
import siteMetadata from '@/metadata.json'
import { pageMeta } from '@/lib/page-meta'

const meta = siteMetadata['/contact'] ?? siteMetadata.default
const TOPICS = ['Media inquiry', 'Investor inquiry', 'Careers', 'General'] as const
type Topic = (typeof TOPICS)[number]

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: pageMeta(meta.title, meta.description) }),
  // Lets other pages ("Apply" on Careers, "Talk to investor relations" on
  // Investors) deep-link into the form with the right topic preselected.
  validateSearch: (search: Record<string, unknown>): { topic?: Topic } => {
    const t = search.topic
    return { topic: (TOPICS as readonly string[]).includes(t as string) ? (t as Topic) : undefined }
  },
  component: ContactPage,
})

function ContactForm({ initialTopic }: { initialTopic?: Topic }) {
  const submit = useMutation(api.contact.submit)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [organization, setOrganization] = useState('')
  const [topic, setTopic] = useState<Topic>(initialTopic ?? 'General')
  const [message, setMessage] = useState('')
  const [state, setState] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('submitting')
    try {
      await submit({ name, email, organization: organization || undefined, topic, message })
      setState('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="flex items-start gap-3 rounded-md border border-accent-bright/30 bg-accent-soft p-6">
        <CheckCircleIcon className="mt-0.5 size-6 shrink-0 text-accent-ink" />
        <div>
          <p className="font-display text-lg font-medium text-accent-ink">Message sent.</p>
          <p className="mt-1 text-sm text-accent-ink/80">Thank you for reaching out — the appropriate team will follow up.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft/70">Name</span>
          <Input required value={name} onChange={(e) => setName(e.target.value)} className="bg-paper-card" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft/70">Email</span>
          <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-paper-card" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft/70">Organization (optional)</span>
          <Input value={organization} onChange={(e) => setOrganization(e.target.value)} className="bg-paper-card" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft/70">Topic</span>
          <Select value={topic} onValueChange={(v) => setTopic(v as Topic)}>
            <SelectTrigger className="w-full bg-paper-card"><SelectValue /></SelectTrigger>
            <SelectContent>
              {TOPICS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft/70">Message</span>
        <Textarea required minLength={10} rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="bg-paper-card" />
      </label>
      {state === 'error' && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={state === 'submitting'} className="bg-ink text-paper hover:bg-ink/90">
        {state === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}

function ContactPage() {
  const { topic } = Route.useSearch()

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-ink-line/10 bg-ink text-paper">
        <div className="bn-dotgrid pointer-events-none absolute inset-0 text-paper/[0.05]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">Contact & Media</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight">Get in touch with Korvexis.</h1>
        </div>
      </section>
      <FictionalNotice />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-display text-2xl font-medium text-ink">Send a message</h2>
          <p className="mt-2 text-sm text-ink-soft">Media, investor, careers, or general inquiries all start here.</p>
          <div className="mt-6">
            <ContactForm initialTopic={topic} />
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-md border border-ink-line/12 bg-paper-card p-6">
            <div className="flex items-center gap-2.5">
              <LocationPinIcon className="size-5 text-accent-ink" />
              <p className="font-display text-lg font-medium text-ink">Headquarters</p>
            </div>
            <p className="mt-2 text-sm text-ink-soft">{COMPANY.hq}</p>
          </div>

          <div className="rounded-md border border-ink-line/12 bg-paper-card p-6">
            <div className="flex items-center gap-2.5">
              <MailIcon className="size-5 text-accent-ink" />
              <p className="font-display text-lg font-medium text-ink">Media contact</p>
            </div>
            <p className="mt-2 text-sm text-ink-soft">press@korvexis-therapeutics.example</p>
          </div>

          <div className="rounded-md border border-ink-line/12 bg-paper-card p-6">
            <div className="flex items-center gap-2.5">
              <PressIcon className="size-5 text-accent-ink" />
              <p className="font-display text-lg font-medium text-ink">Press kit</p>
            </div>
            <p className="mt-2 text-sm text-ink-soft">Logo files and a one-page company overview for media use.</p>
            <div className="mt-4 space-y-2">
              <a href="/press/korvexis-one-pager.pdf" download className="flex items-center gap-2 text-sm font-semibold text-accent-ink hover:underline">
                <DownloadIcon className="size-4" /> Company one-pager (PDF)
              </a>
              <a href="/press/korvexis-logo-dark.svg" download className="flex items-center gap-2 text-sm font-semibold text-accent-ink hover:underline">
                <DownloadIcon className="size-4" /> Logo — for light backgrounds (SVG)
              </a>
              <a href="/press/korvexis-logo-light.svg" download className="flex items-center gap-2 text-sm font-semibold text-accent-ink hover:underline">
                <DownloadIcon className="size-4" /> Logo — for dark backgrounds (SVG)
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
