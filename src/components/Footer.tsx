import { LOGO_MAIN } from '../lib/assets'
import { ROUTES } from '../lib/router'
import { Link } from './Link'
import { PhoneIcon, PinIcon } from './icons'

/** Landing anchors are absolute so they also work from the apply page. */
const PAGES = [
  { label: 'Dastur haqida', href: '/#dastur' },
  { label: 'Bosqichlar', href: '/#bosqichlar' },
  { label: 'Qabul jarayoni', href: '/#jarayon' },
  { label: 'Savollar', href: '/#faq' },
  { label: 'Ariza', href: ROUTES.apply },
]

const ECOSYSTEM = [
  { label: 'Startup Garage', href: '/' },
  { label: 'Founders School', href: '/founders-school' },
  { label: 'Imkon Founders', href: '/imkon-founders' },
  { label: 'Founders Community', href: '/community' },
  { label: 'Virtual Ofis', href: '/virtual-ofis' },
  { label: 'SG Women', href: '/sg-women' },
]

const RESOURCES = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Media', href: '/media' },
  { label: 'Kitoblar', href: '/kitoblar' },
]

const BRANCHES = ['Tashkent', 'Doha', 'Casablanca']

const PHONE = '+998 78 113 71 72'
const PHONE_HREF = 'tel:+998781137172'
const ADDRESS =
  'Toshkent shahar, Mirzo Ulug‘bek tumani, Oq terak ko‘chasi, 13-uy'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-card footer-brand-card">
          <div className="footer-brand">
            <img
              className="footer-logo"
              src={LOGO_MAIN}
              alt="Startup Garage"
              width={185}
              height={64}
            />
            <span className="footer-brand-sub">Founders Residency</span>
          </div>

          <h2 className="footer-tagline">
            Startapni emas —
            <br />
            asoschini quramiz
          </h2>

          <ul className="footer-contacts">
            <li>
              <a className="footer-contact" href={PHONE_HREF}>
                <span className="footer-contact-icon">
                  <PhoneIcon />
                </span>
                {PHONE}
              </a>
            </li>
            <li>
              <a
                className="footer-contact"
                href="https://maps.google.com/?q=Oq+terak+ko'chasi+13,+Toshkent"
                target="_blank"
                rel="noreferrer"
              >
                <span className="footer-contact-icon">
                  <PinIcon />
                </span>
                {ADDRESS}
              </a>
            </li>
          </ul>

          <div className="footer-branches">
            <span className="footer-branches-label">Filiallar</span>
            <span className="footer-branches-list">
              {BRANCHES.join(' · ')}
            </span>
          </div>
        </div>

        <div className="footer-card footer-links-card">
          <div className="footer-cols">
            <nav className="footer-col" aria-label="Sahifalar">
              <h3 className="footer-col-title">Sahifalar</h3>
              <ul className="footer-col-list">
                {PAGES.map((page) => (
                  <li key={page.href}>
                    <Link className="footer-link" to={page.href}>
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="footer-col" aria-label="Ekosistema">
              <h3 className="footer-col-title">Ekosistema</h3>
              <ul className="footer-col-list">
                {ECOSYSTEM.map((item) => (
                  <li key={item.href}>
                    <a className="footer-link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="footer-col" aria-label="Resurslar">
              <h3 className="footer-col-title">Resurslar</h3>
              <ul className="footer-col-list">
                {RESOURCES.map((item) => (
                  <li key={item.href}>
                    <a className="footer-link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="footer-legal">
            <span>© 2025 Startup Garage. All rights reserved</span>
            <a className="footer-link" href="/maxfiylik-siyosati">
              Maxfiylik siyosati
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
