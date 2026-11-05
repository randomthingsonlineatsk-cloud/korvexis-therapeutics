# Korvexis Therapeutics

Fictional biotech company website with a pipeline, trials, newsroom and a live research feed.

**Live demo:** https://korvexis-therapeutics.randomthingsonlineatsk.workers.dev (once deployed)

> This is a fictional, educational demonstration. Do not use it for real patient data, clinical decisions or regulatory submissions.

## Features
- Pipeline and clinical-trial pages for a fictional company and its fictional Thalorix platform
- Newsroom
- Research Watch: real papers fetched live from PubMed in the browser (cached for 24 hours)
- Contact form and newsletter sign-up stored in Convex (or in the browser if no backend is configured)

## Tech stack
TanStack Start, React, Tailwind CSS, Convex (contact and newsletter). Prerendered and hosted on Cloudflare Workers.

## Run locally
```
npm install --legacy-peer-deps
npm run dev
```
Without `VITE_CONVEX_URL` the contact and newsletter forms save to the browser's localStorage.

## Deploy (Cloudflare Workers)
- Build variable: `NITRO_PRESET=node-server`
- Build command: `npm install --legacy-peer-deps && npm run build`
- Deploy command: `npx wrangler deploy --assets .output/public --name korvexis-therapeutics --compatibility-date 2026-01-01`
- Optional build variable `VITE_CONVEX_URL` for the Convex backend.

## Backend (Convex)
`npx convex dev --configure new`, then `npx convex deploy`. Submissions are read in the Convex dashboard. The earlier admin page, login and daily PubMed cron from the Macaly version were removed.

## Attribution
Created by **Khan Gulrez Shagufa Fazal Ahmed**.

If you reuse or adapt this project, please credit the original author and link back to https://github.com/randomthingsonlineatsk-cloud/korvexis-therapeutics. The Apache License 2.0 requires you to keep the `LICENSE` and `NOTICE` files with any copy you distribute.

## License
Licensed under the [Apache License 2.0](LICENSE). Copyright 2026 Khan Gulrez Shagufa Fazal Ahmed.
