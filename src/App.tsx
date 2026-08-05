import { useEffect } from 'react'
import { Footer } from './components/Footer'
import { Landing } from './pages/Landing'
import { Apply } from './pages/Apply'
import { LOGO_MAIN } from './lib/assets'
import { Link } from './components/Link'
import { ROUTES, usePath } from './lib/router'
import './App.css'

const TITLES: Record<string, string> = {
  [ROUTES.home]: 'Founders Residency — Startup Garage',
  [ROUTES.apply]: 'Ariza — Founders Residency',
}

export default function App() {
  const path = usePath()
  const isApply = path === ROUTES.apply

  useEffect(() => {
    document.title = TITLES[path] ?? TITLES[ROUTES.home]
  }, [path])

  return (
    <div className="page" id="top">
      <header className="topbar">
        <div className="shell-wide topbar-inner">
          <Link className="brand" to={ROUTES.home}>
            <img
              className="brand-logo"
              src={LOGO_MAIN}
              alt="Startup Garage"
              width={104}
              height={36}
            />
          </Link>
          {!isApply && (
            <Link className="topbar-cta" to={ROUTES.apply}>
              Ariza topshirish
            </Link>
          )}
        </div>
      </header>

      {isApply ? <Apply /> : <Landing />}

      <Footer />
    </div>
  )
}
