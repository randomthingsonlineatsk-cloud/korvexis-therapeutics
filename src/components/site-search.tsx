import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { NEWSROOM, PIPELINE, TRIALS } from '@/lib/korvexis-data'
import { CAREERS, LEADERSHIP } from '@/lib/korvexis-extra-data'
import { usePapers } from '@/lib/research'
import { MoleculeIcon, PressIcon, ShieldMarkIcon, VialIcon } from './site-icons'
import { BookIcon } from './site-icons-research'

// The static part of the index: built once from content already shipped in
// the bundle. Research papers are live PubMed data, merged in separately
// inside the component below, since they can't be known at build time.
interface Hit { id: string; group: string; title: string; subtitle: string; to?: string; params?: Record<string, string>; href?: string }

function buildStaticIndex(): Hit[] {
  const hits: Hit[] = []
  for (const p of PIPELINE) hits.push({ id: `pipe-${p.code}`, group: 'Pipeline', title: p.name ? `${p.code} — ${p.name}` : p.code, subtitle: p.indication, to: '/pipeline' })
  for (const t of TRIALS) hits.push({ id: `trial-${t.id}`, group: 'Clinical Trials', title: t.id, subtitle: `${t.phase} · ${t.indication}`, to: '/trials' })
  for (const n of NEWSROOM) hits.push({ id: `news-${n.slug}`, group: 'Newsroom', title: n.headline, subtitle: n.excerpt, to: '/newsroom/$slug', params: { slug: n.slug } })
  for (const l of LEADERSHIP) hits.push({ id: `lead-${l.name}`, group: 'Leadership', title: l.name, subtitle: l.role, to: '/leadership' })
  for (const j of CAREERS) hits.push({ id: `job-${j.title}`, group: 'Careers', title: j.title, subtitle: `${j.department} · ${j.location}`, to: '/careers' })
  return hits
}

const GROUP_ICON: Record<string, typeof MoleculeIcon> = {
  Pipeline: MoleculeIcon,
  'Clinical Trials': VialIcon,
  Newsroom: PressIcon,
  Leadership: ShieldMarkIcon,
  Careers: ShieldMarkIcon,
  'Research Watch': BookIcon,
}

export function SiteSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const staticIndex = useMemo(buildStaticIndex, [])
  // Only fetch the live papers once the search dialog has actually been opened.
  const papers = usePapers(open)
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const index = useMemo<Hit[]>(() => {
    const paperHits: Hit[] = (papers ?? []).map((p) => ({
      id: `paper-${p.pmid}`,
      group: 'Research Watch',
      title: p.title,
      subtitle: `${p.journal} · ${p.pubDate}`,
      href: p.url,
    }))
    return [...staticIndex, ...paperHits]
  }, [staticIndex, papers])

  // Cmd/Ctrl+K opens the search from anywhere on the site.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  const q = query.trim().toLowerCase()
  const results = q.length === 0 ? index.slice(0, 8) : index.filter((h) => h.title.toLowerCase().includes(q) || h.subtitle.toLowerCase().includes(q)).slice(0, 40)
  const groups = [...new Set(results.map((r) => r.group))]

  function go(hit: Hit) {
    onOpenChange(false)
    setQuery('')
    if (hit.href) window.open(hit.href, '_blank', 'noopener,noreferrer')
    else if (hit.to) navigate({ to: hit.to, params: hit.params })
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Search Korvexis" description="Search the pipeline, trials, newsroom, leadership, careers, and Research Watch.">
      <Command shouldFilter={false}>
        <CommandInput placeholder="Search programs, trials, news, people, roles, papers…" value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>No results for "{query}".</CommandEmpty>
          {groups.map((group) => (
            <CommandGroup key={group} heading={group}>
              {results.filter((r) => r.group === group).map((hit) => {
                const Icon = GROUP_ICON[hit.group] ?? MoleculeIcon
                return (
                  <CommandItem key={hit.id} value={hit.id} onSelect={() => go(hit)} className="items-start gap-3">
                    <Icon className="mt-0.5 size-4 shrink-0 text-accent-ink" />
                    <span className="flex flex-col">
                      <span className="font-medium text-ink line-clamp-1">{hit.title}</span>
                      <span className="text-xs text-ink-soft/70 line-clamp-1">{hit.subtitle}</span>
                    </span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
