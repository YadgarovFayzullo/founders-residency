/**
 * Minimal 20×20 stroke icons. Used only where they help scanning —
 * field affordances and validation state — never as decoration.
 */
type IconProps = { className?: string }

const base = {
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="10" cy="6.75" r="3.25" />
      <path d="M3.75 16.5c0-2.9 2.8-4.75 6.25-4.75s6.25 1.85 6.25 4.75" />
    </svg>
  )
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.4 3.5H4.2c-.7 0-1.3.6-1.2 1.3.3 3 1.7 5.8 3.8 8 2.2 2.1 5 3.5 8 3.8.7 0 1.2-.5 1.2-1.2v-2.2c0-.6-.4-1.1-1-1.2l-2-.4c-.5-.1-1 .1-1.2.5l-.6 1c-2-1-3.6-2.6-4.6-4.6l1-.6c.4-.3.6-.8.5-1.2l-.4-2c-.1-.6-.6-1-1.2-1Z" />
    </svg>
  )
}

export function AtIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="10" cy="10" r="2.9" />
      <path d="M12.9 7.6v3.5a2.1 2.1 0 0 0 4.1.6A7.25 7.25 0 1 0 14 16.4" />
    </svg>
  )
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 17s5.25-4.4 5.25-8.25a5.25 5.25 0 1 0-10.5 0C4.75 12.6 10 17 10 17Z" />
      <circle cx="10" cy="8.6" r="2" />
    </svg>
  )
}

export function AlertIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} strokeWidth={1.8}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 6.4v4.2" />
      <path d="M10 13.5h.01" />
    </svg>
  )
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} strokeWidth={1.8}>
      <path d="m5.5 10.4 3 3 6-6.8" />
    </svg>
  )
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} strokeWidth={1.6}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="m6.9 10.2 2.2 2.2 4-4.6" />
    </svg>
  )
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} strokeWidth={1.8}>
      <path d="m6.2 6.2 7.6 7.6M13.8 6.2l-7.6 7.6" />
    </svg>
  )
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M17.2 4.3 3.4 9.6c-.7.3-.7 1.3 0 1.5l3.4 1.1 1.3 3.9c.2.6 1 .8 1.4.3l1.9-2 3.4 2.5c.5.4 1.2.1 1.3-.5l2.1-11c.1-.7-.5-1.3-1-1.1Z" />
      <path d="m6.8 12.2 8.9-6-6.5 7.1" />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.4" y="3.4" width="13.2" height="13.2" rx="4.2" />
      <circle cx="10" cy="10" r="3.1" />
      <path d="M13.8 6.2h.01" />
    </svg>
  )
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} strokeWidth={1.8}>
      <path d="M4.5 10h11M11 5.5l4.5 4.5-4.5 4.5" />
    </svg>
  )
}
