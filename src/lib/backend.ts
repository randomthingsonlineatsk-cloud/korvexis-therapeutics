// Backend switch. If VITE_CONVEX_URL is set at build time the contact form and
// newsletter signup are stored in Convex (viewable in the Convex dashboard).
// Otherwise they fall back to browser-only storage so the site still works as
// a static page.
import { ConvexReactClient } from 'convex/react'
import * as convexReact from 'convex/react'
import { anyApi } from 'convex/server'

export const CONVEX_URL = import.meta.env.VITE_CONVEX_URL as string | undefined
export const convexClient = CONVEX_URL ? new ConvexReactClient(CONVEX_URL) : null

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CONTACT_KEY = 'korvexis-contact-messages'
const NEWS_KEY = 'korvexis-newsletter'

function readJson<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || '') as T } catch { return fallback }
}
function writeJson(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* ignore */ }
}

type Fn = { kind: string }
const localApi = {
  contact: { submit: { kind: 'contact.submit' } },
  newsletter: { subscribe: { kind: 'newsletter.subscribe' } },
}

function localUseMutation(fn: Fn) {
  return async (args: any): Promise<any> => {
    if (fn.kind === 'newsletter.subscribe') {
      const email = String(args.email).trim().toLowerCase()
      if (!EMAIL_RE.test(email)) throw new Error('Enter a valid email address')
      const list = readJson<string[]>(NEWS_KEY, [])
      if (list.includes(email)) return 'already_subscribed'
      list.push(email)
      writeJson(NEWS_KEY, list)
      return 'created'
    }
    if (fn.kind === 'contact.submit') {
      const name = String(args.name).trim()
      const email = String(args.email).trim()
      const message = String(args.message).trim()
      if (!name) throw new Error('Name is required')
      if (!EMAIL_RE.test(email)) throw new Error('Enter a valid email address')
      if (message.length < 10) throw new Error('Message is too short')
      const list = readJson<any[]>(CONTACT_KEY, [])
      list.push({ name, email, organization: args.organization, topic: args.topic, message, at: Date.now() })
      writeJson(CONTACT_KEY, list.slice(-100))
      return null
    }
    throw new Error('Unsupported')
  }
}

export const api: any = CONVEX_URL ? anyApi : localApi
export const useMutation: (fn: any) => (args: any) => Promise<any> = CONVEX_URL ? (convexReact.useMutation as any) : localUseMutation
