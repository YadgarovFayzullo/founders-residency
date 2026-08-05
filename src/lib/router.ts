import { useEffect, useState } from 'react'

/**
 * Two-page History API router. Small enough not to warrant a dependency, and
 * <Link> keeps real <a href> anchors so middle-click, "open in new tab" and
 * crawlers all behave normally.
 *
 * Direct loads of /ariza need the host to rewrite unknown paths to
 * index.html — see vercel.json.
 */
const ROUTE_EVENT = 'app:route'

export const ROUTES = {
  home: '/',
  apply: '/ariza',
} as const

export function navigate(to: string) {
  const [path, hash] = to.split('#')

  if (window.location.pathname !== path || window.location.hash) {
    window.history.pushState({}, '', to)
    window.dispatchEvent(new Event(ROUTE_EVENT))
  }

  requestAnimationFrame(() => {
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  })
}

export function usePath(): string {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const sync = () => setPath(window.location.pathname)
    window.addEventListener('popstate', sync)
    window.addEventListener(ROUTE_EVENT, sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener(ROUTE_EVENT, sync)
    }
  }, [])

  return path
}
