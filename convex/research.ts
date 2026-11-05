import { v } from "convex/values"
import { internal } from "./_generated/api"
import { internalAction, internalMutation, query } from "./_generated/server"

// Research Watch: real papers from PubMed (NCBI E-utilities, no key needed at
// this volume). A daily cron (convex/crons.ts) refreshes the table; the site
// reads it with `research:list`.

const TOPICS = [
  "lipid nanoparticle drug delivery",
  "siRNA therapeutics",
  "mRNA vaccine platform",
  "nanomedicine oncology",
  "rare disease gene therapy",
]
const PER_TOPIC = 4
const EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function getJson(url: string): Promise<any | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url)
      if (res.ok) return await res.json()
      if (res.status !== 429) return null
    } catch {
      return null
    }
    await sleep(1500)
  }
  return null
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("papers").collect()
    return rows.map(({ _id, _creationTime, ...paper }) => paper)
  },
})

export const replaceAll = internalMutation({
  args: {
    papers: v.array(
      v.object({
        pmid: v.string(),
        title: v.string(),
        authors: v.array(v.string()),
        journal: v.string(),
        pubDate: v.string(),
        url: v.string(),
        queryTopic: v.string(),
      }),
    ),
  },
  handler: async (ctx, { papers }): Promise<number> => {
    // Never wipe the table with an empty result (e.g. PubMed briefly unreachable).
    if (papers.length === 0) return 0
    for (const old of await ctx.db.query("papers").collect()) await ctx.db.delete(old._id)
    for (const p of papers) await ctx.db.insert("papers", p)
    return papers.length
  },
})

export const refresh = internalAction({
  args: {},
  handler: async (ctx): Promise<number> => {
    const papers: any[] = []
    const seen = new Set<string>()
    for (const topic of TOPICS) {
      const term = encodeURIComponent(`"${topic}"[tiab]`)
      const search = await getJson(
        `${EUTILS}/esearch.fcgi?db=pubmed&retmode=json&sort=date&datetype=pdat&reldate=365&retmax=${PER_TOPIC}&term=${term}`,
      )
      const ids: string[] = search?.esearchresult?.idlist ?? []
      await sleep(400)
      if (ids.length === 0) continue
      const summary = await getJson(`${EUTILS}/esummary.fcgi?db=pubmed&retmode=json&id=${ids.join(",")}`)
      const result = summary?.result ?? {}
      for (const pmid of ids) {
        const doc = result[pmid]
        if (!doc || !doc.title || seen.has(pmid)) continue
        seen.add(pmid)
        papers.push({
          pmid,
          title: String(doc.title).replace(/\.$/, ""),
          authors: (doc.authors ?? []).map((a: any) => a.name).filter(Boolean).slice(0, 6),
          journal: doc.fulljournalname || doc.source || "Unknown journal",
          pubDate: doc.pubdate || "Date unavailable",
          url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
          queryTopic: topic,
        })
      }
      await sleep(400)
    }
    const stored: number = await ctx.runMutation(internal.research.replaceAll, { papers })
    return stored
  },
})
