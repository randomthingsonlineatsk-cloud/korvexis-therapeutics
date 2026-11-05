// Builds a full per-page <head> meta array: the plain title/description plus
// matching Open Graph and Twitter Card entries. TanStack Router merges meta
// arrays across route ancestors by matching name/property, so emitting
// og:title / og:description here makes THIS page's values win over the
// root's site-wide defaults (see src/routes/__root.tsx) — without this, every
// page's social preview showed the homepage's title instead of its own.
export function pageMeta(title: string, description: string) {
  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ]
}
