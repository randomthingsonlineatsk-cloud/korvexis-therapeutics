import { useEffect, useState } from 'react'

// ---------------------------------------------------------------------------
// Research Watch: real papers from PubMed (NCBI's free, public E-utilities
// API, no key needed at this volume). Search terms are tied to Korvexis's
// therapeutic areas. Each topic is searched as an exact phrase restricted to
// title/abstract ([tiab]) so results stay on-topic.
//
// This runs in the visitor's browser (NCBI allows cross-origin requests) and
// the result is cached in localStorage for a day, so the site stays a plain
// static page with no server job.
// ---------------------------------------------------------------------------

export interface Paper {
  pmid: string
  title: string
  authors: string[]
  journal: string
  pubDate: string
  url: string
  queryTopic: string
}

export const RESEARCH_TOPICS = [
  'lipid nanoparticle drug delivery',
  'siRNA therapeutics',
  'mRNA vaccine platform',
  'nanomedicine oncology',
  'rare disease gene therapy',
] as const

const RESULTS_PER_TOPIC = 4
const CACHE_KEY = 'korvexis-research-cache-v1'
const CACHE_MS = 24 * 60 * 60 * 1000
const EUTILS = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function getJson<T>(url: string): Promise<T | null> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url)
      if (res.ok) return (await res.json()) as T
      if (res.status !== 429) return null
    } catch {
      return null
    }
    await sleep(1200)
  }
  return null
}

interface EsearchResponse { esearchresult?: { idlist?: string[] } }
interface EsummaryDoc { title?: string; authors?: { name?: string }[]; fulljournalname?: string; source?: string; pubdate?: string }
interface EsummaryResponse { result?: Record<string, EsummaryDoc | string[]> }

export async function fetchPapers(): Promise<Paper[]> {
  const papers: Paper[] = []
  const seen = new Set<string>()
  for (const topic of RESEARCH_TOPICS) {
    const term = encodeURIComponent(`"${topic}"[tiab]`)
    const search = await getJson<EsearchResponse>(`${EUTILS}/esearch.fcgi?db=pubmed&retmode=json&sort=date&datetype=pdat&reldate=365&retmax=${RESULTS_PER_TOPIC}&term=${term}`)
    const ids = search?.esearchresult?.idlist ?? []
    if (ids.length === 0) { await sleep(400); continue }
    await sleep(400)
    const summary = await getJson<EsummaryResponse>(`${EUTILS}/esummary.fcgi?db=pubmed&retmode=json&id=${ids.join(',')}`)
    const result = summary?.result ?? {}
    for (const pmid of ids) {
      const doc = result[pmid]
      if (!doc || Array.isArray(doc) || !doc.title || seen.has(pmid)) continue
      seen.add(pmid)
      papers.push({
        pmid,
        title: doc.title.replace(/\.$/, ''),
        authors: (doc.authors ?? []).map((a) => a.name).filter((n): n is string => !!n).slice(0, 6),
        journal: doc.fulljournalname || doc.source || 'Unknown journal',
        pubDate: doc.pubdate || 'Date unavailable',
        url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
        queryTopic: topic,
      })
    }
    await sleep(400)
  }
  return papers
}

function readCache(): Paper[] | null {
  try {
    const raw = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null') as { at: number; papers: Paper[] } | null
    if (raw && Date.now() - raw.at < CACHE_MS && raw.papers.length > 0) return raw.papers
  } catch { /* ignore */ }
  return null
}

let inflight: Promise<Paper[]> | null = null
function loadPapers(): Promise<Paper[]> {
  const cached = readCache()
  if (cached) return Promise.resolve(cached)
  if (!inflight) {
    inflight = fetchPapers().then((p) => {
      if (p.length > 0) { try { localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), papers: p })) } catch { /* ignore */ } }
      return p
    }).finally(() => { inflight = null })
  }
  return inflight
}

/** undefined while loading; an array (possibly empty) once settled. */
export function usePapers(enabled = true): Paper[] | undefined {
  const [papers, setPapers] = useState<Paper[] | undefined>(undefined)
  useEffect(() => {
    if (!enabled) return
    let live = true
    loadPapers().then((p) => { if (live) setPapers(p) })
    return () => { live = false }
  }, [enabled])
  return papers
}
