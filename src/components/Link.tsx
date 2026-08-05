import type { ReactNode } from 'react'
import { navigate } from '../lib/router'

type LinkProps = {
  to: string
  className?: string
  children: ReactNode
}

/** Client-side anchor: a real <a href> that skips the full page reload. */
export function Link({ to, className, children }: LinkProps) {
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        // Let the browser handle new-tab / new-window intents.
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return
        }
        event.preventDefault()
        navigate(to)
      }}
    >
      {children}
    </a>
  )
}
