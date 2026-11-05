// Hand-drawn line icons for the Korvexis site — deliberately not the default
// Lucide set, so the icon language feels like part of the brand rather than
// a generic component library. One consistent stroke weight (1.6) and a
// single accent fill used sparingly, matching the rest of the palette.

type IconProps = { className?: string }

export function MoleculeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="3.4" className="fill-accent-bright/25 stroke-current" strokeWidth="1.6" />
      <circle cx="29" cy="9" r="2.6" className="stroke-current" strokeWidth="1.6" />
      <circle cx="14" cy="27" r="4.2" className="fill-accent-bright/25 stroke-current" strokeWidth="1.6" />
      <circle cx="31" cy="26" r="2.8" className="stroke-current" strokeWidth="1.6" />
      <path d="M12.7 12.3 20 20M20 20l7.6-9.3M20 20l-4 5.2M20 20l8.9 4.4" className="stroke-current" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function StrandIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path d="M12 4c0 9 16 9 16 18s-16 9-16 18" className="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M28 4c0 9-16 9-16 18s16 9 16 18" className="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13.4 10h13.2M11.8 20h16.4M13.4 30h13.2" className="stroke-current" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function VialIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path d="M15 5h10M17 5v9.5L9.5 29a4 4 0 0 0 3.5 6h14a4 4 0 0 0 3.5-6L23 14.5V5" className="stroke-current" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M11.5 24.5h17" className="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14.5 30.5c1.6-1.4 3-1.4 4.5 0s2.9 1.4 4.5 0 3-1.4 4.5 0" className="fill-accent-bright/30 stroke-current" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function ShieldMarkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path d="M20 5 33 10v10c0 9-6 14.5-13 16-7-1.5-13-7-13-16V10Z" className="stroke-current" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 20.5 18 24.5 26.5 15" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function TimelineIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path d="M5 20h30" className="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="11" cy="20" r="2.6" className="stroke-current" strokeWidth="1.6" />
      <circle cx="20" cy="20" r="2.6" className="fill-accent-bright/35 stroke-current" strokeWidth="1.6" />
      <circle cx="29" cy="20" r="2.6" className="stroke-current" strokeWidth="1.6" />
      <path d="M11 20v-7M20 20v9M29 20v-5" className="stroke-current" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function PressIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path d="M6 15h12l14-8v26l-14-8H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" className="stroke-current" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 25v6a2.4 2.4 0 0 0 4.6.9L18 29" className="stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 15.5c2.2 2.4 2.2 6.6 0 9" className="stroke-current" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function TargetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="14" className="stroke-current" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="8" className="stroke-current" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="2.6" className="fill-accent-bright stroke-current" strokeWidth="1.2" />
    </svg>
  )
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LocationPinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z" className="stroke-current" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.4" className="stroke-current" strokeWidth="1.6" />
    </svg>
  )
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" className="stroke-current" strokeWidth="1.7" />
      <path d="M20 20l-4.8-4.8" className="stroke-current" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5" className="stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" className="stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.3" className="stroke-current" strokeWidth="1.6" />
      <path d="M8 12.3l2.6 2.6L16.2 9" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="8" width="18" height="12" rx="2" className="stroke-current" strokeWidth="1.6" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" className="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 13h18" className="stroke-current" strokeWidth="1.4" />
      <circle cx="12" cy="13" r="1.3" className="fill-accent-bright stroke-current" strokeWidth="0.8" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" className="stroke-current" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" className="stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function BuildingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="3" width="11" height="18" rx="1" className="stroke-current" strokeWidth="1.6" />
      <path d="M15 21h5V9l-5-3" className="stroke-current" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.5 7h1.5M7.5 11h1.5M7.5 15h1.5M11 7h1.5M11 11h1.5M11 15h1.5" className="stroke-current" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function RssIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="5.5" cy="18.5" r="1.7" className="fill-accent-bright stroke-current" strokeWidth="0.6" />
      <path d="M4 11.5a8.5 8.5 0 0 1 8.5 8.5" className="stroke-current" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 5.5A14.5 14.5 0 0 1 18.5 20" className="stroke-current" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
