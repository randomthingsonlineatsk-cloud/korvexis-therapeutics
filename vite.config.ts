import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart({
      // Press-release pages are dynamic ($slug), so list them for prerendering.
      pages: [{ path: '/newsroom/fda-fast-track-bn-101', prerender: { enabled: true } }, { path: '/newsroom/first-patient-dosed-bn-204', prerender: { enabled: true } }, { path: '/newsroom/orphan-drug-designation-bn-204', prerender: { enabled: true } }, { path: '/newsroom/bn-450-ind-clearance', prerender: { enabled: true } }, { path: '/newsroom/bn-101-phase-2-initiation', prerender: { enabled: true } }, { path: '/newsroom/ema-scientific-advice-bn-204', prerender: { enabled: true } }, { path: '/newsroom/series-c-financing', prerender: { enabled: true } }],
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: false,
        failOnError: true,
      },
    }),
    nitro(),
    viteReact(),
  ],
})
