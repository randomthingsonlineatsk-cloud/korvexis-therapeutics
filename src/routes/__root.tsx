import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { ConvexProvider } from 'convex/react'
import { convexClient } from '@/lib/backend'
import '../styles.css'
import siteMetadata from '../metadata.json'

const rootMeta = siteMetadata['/']

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: rootMeta.title },
      { name: 'description', content: rootMeta.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Korvexis Therapeutics' },
      { property: 'og:title', content: rootMeta.title },
      { property: 'og:description', content: rootMeta.description },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: rootMeta.title },
      { name: 'twitter:description', content: rootMeta.description },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'alternate', type: 'application/rss+xml', title: 'Korvexis Therapeutics Newsroom', href: '/feeds/newsroom.xml' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {convexClient ? <ConvexProvider client={convexClient}>{children}</ConvexProvider> : children}
        <Scripts />
      </body>
    </html>
  )
}
