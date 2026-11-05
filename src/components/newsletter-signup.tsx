import { useState } from 'react'
import { useMutation, api } from '@/lib/backend'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckCircleIcon, MailIcon } from './site-icons'

export function NewsletterSignup({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const subscribe = useMutation(api.newsletter.subscribe)
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('submitting')
    try {
      const result = await subscribe({ email })
      setMessage(result === 'already_subscribed' ? "You're already on the list." : 'Subscribed — thank you.')
      setState('done')
      setEmail('')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Try again.')
      setState('error')
    }
  }

  const isDark = variant === 'dark'

  if (state === 'done') {
    return (
      <p className={`flex items-center gap-2 text-sm ${isDark ? 'text-accent-bright' : 'text-accent-ink'}`}>
        <CheckCircleIcon className="size-4 shrink-0" />
        {message}
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MailIcon className={`pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 ${isDark ? 'text-paper/40' : 'text-ink-soft/50'}`} />
          <Input
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`pl-9 ${isDark ? 'border-paper/20 bg-paper/5 text-paper placeholder:text-paper/35 focus-visible:ring-accent-bright' : 'bg-paper-card'}`}
          />
        </div>
        <Button type="submit" disabled={state === 'submitting'} className="shrink-0 bg-accent-bright text-accent-ink hover:bg-accent-bright/90">
          {state === 'submitting' ? 'Sending…' : 'Subscribe'}
        </Button>
      </div>
      {state === 'error' && <p className="text-xs text-destructive">{message}</p>}
    </form>
  )
}
