// Additions to the hand-drawn icon set for the Research page.
import type { ComponentType } from 'react'

type IconProps = { className?: string }

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M14 5h5v5M19 5l-8 8" className="stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" className="stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function BookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z" className="stroke-current" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z" className="fill-accent-bright/20 stroke-current" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export type Icon = ComponentType<IconProps>
