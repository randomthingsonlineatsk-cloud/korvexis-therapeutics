import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { COMPANY } from '@/lib/korvexis-data'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from './newsletter-signup'
import { SiteSearch } from './site-search'
import { ChevronDownIcon, MoleculeIcon, SearchIcon } from './site-icons'

const PRIMARY_NAV = [
  { to: '/science', label: 'Science' },
  { to: '/pipeline', label: 'Pipeline' },
  { to: '/trials', label: 'Clinical Trials' },
  { to: '/regulatory', label: 'Regulatory' },
  { to: '/research', label: 'Research' },
  { to: '/newsroom', label: 'Newsroom' },
] as const

const COMPANY_NAV = [
  { to: '/leadership', label: 'Leadership & Board' },
  { to: '/careers', label: 'Careers' },
  { to: '/investors', label: 'Investors' },
  { to: '/patients', label: 'Patients & Caregivers' },
  { to: '/contact', label: 'Contact' },
] as const

const ALL_NAV = [{ to: '/', label: 'Home' }, ...PRIMARY_NAV, ...COMPANY_NAV] as const

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <MoleculeIcon className="size-7 text-ink" />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">{COMPANY.short}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {PRIMARY_NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[13px] font-medium uppercase tracking-wide text-ink-soft transition-colors hover:text-accent-bright"
              activeProps={{ className: 'text-ink-soft !text-accent-bright' }}
            >
              {n.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-[13px] font-medium uppercase tracking-wide text-ink-soft transition-colors hover:text-accent-bright focus:outline-none">
              Company <ChevronDownIcon className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-ink-line/15 bg-paper-card">
              {COMPANY_NAV.map((n) => (
                <DropdownMenuItem key={n.to} asChild>
                  <Link to={n.to} className="cursor-pointer text-ink-soft">{n.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setSearchOpen(true)}
            className="hidden h-9 items-center gap-2 border-ink-line/15 bg-transparent px-3 text-xs font-medium text-ink-soft hover:bg-paper-dim sm:flex"
          >
            <SearchIcon className="size-4" />
            Search
            <kbd className="ml-1 rounded border border-ink-line/20 bg-paper px-1.5 py-0.5 font-mono text-[10px] text-ink-soft/70">⌘K</kbd>
          </Button>
          <Button onClick={() => setSearchOpen(true)} variant="outline" className="size-9 border-ink-line/15 p-0 sm:hidden">
            <SearchIcon className="size-4" />
          </Button>
          <Link
            to="/newsroom"
            className="hidden rounded-sm border border-ink px-4 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:bg-ink hover:text-paper md:inline-block"
          >
            Latest News
          </Link>
        </div>
      </div>

      {/* mobile / tablet nav */}
      <nav className="flex items-center gap-4 overflow-x-auto border-t border-ink-line/10 px-6 py-2.5 lg:hidden">
        {ALL_NAV.filter((n) => n.to !== '/').map((n) => (
          <Link key={n.to} to={n.to} className="shrink-0 text-xs font-medium uppercase tracking-wide text-ink-soft" activeProps={{ className: '!text-accent-bright' }}>
            {n.label}
          </Link>
        ))}
      </nav>

      <SiteSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper/80">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <MoleculeIcon className="size-6 text-accent-bright" />
              <span className="font-display text-base font-semibold text-paper">{COMPANY.short}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">{COMPANY.tagline}</p>
          </div>
          <FooterCol title="Science" links={[{ to: '/science', label: 'The Thalorix Platform' }, { to: '/pipeline', label: 'Pipeline' }, { to: '/research', label: 'Research Watch' }]} />
          <FooterCol title="Company" links={[{ to: '/leadership', label: 'Leadership & Board' }, { to: '/careers', label: 'Careers' }, { to: '/investors', label: 'Investors' }, { to: '/patients', label: 'Patients & Caregivers' }, { to: '/contact', label: 'Contact' }]} />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-paper/45">Stay updated</p>
            <p className="mt-3 text-sm text-paper/60">Program updates and press releases, occasionally.</p>
            <div className="mt-3">
              <NewsletterSignup variant="dark" />
            </div>
          </div>
        </div>
        <div className="bn-rule mt-12 opacity-40" />
        <div className="mt-6 flex flex-col gap-2 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {COMPANY.name} is a fictional company created for a design and content portfolio. No Korvexis product, trial, or
            regulatory milestone described on this site is real, except the papers linked on the Research Watch page,
            which are genuine external publications.
          </p>
          <p>made by Khan Gulrez Shagufa Fazal Ahmed</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-paper/45">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-paper/70 transition-colors hover:text-accent-bright">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FictionalNotice() {
  return (
    <p className="mx-auto max-w-6xl px-6 pt-3 text-center text-[11px] uppercase tracking-widest text-ink-soft/50">
      A fictional company, portfolio demonstration — except Research Watch, which links real external papers
    </p>
  )
}
