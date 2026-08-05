import { LOGO_MAIN } from '../lib/assets'
import { InstagramIcon, PhoneIcon, PinIcon, TelegramIcon } from './icons'

const CONTACTS = [
  {
    icon: <PhoneIcon />,
    label: '+998 (55) 520-60-60',
    href: 'tel:+998555206060',
  },
  {
    icon: <TelegramIcon />,
    label: '@startupgarage',
    href: 'https://t.me/startupgarage',
  },
  {
    icon: <InstagramIcon />,
    label: '@startupgarage',
    href: 'https://instagram.com/startupgarage',
  },
]

const PAGES = [
  { label: 'Asosiy', href: '#top' },
  { label: 'Dastur haqida', href: '#dastur' },
  { label: 'Qabul jarayoni', href: '#jarayon' },
  { label: 'Savollar', href: '#faq' },
  { label: 'Ariza', href: '#ariza' },
]

const DATES = [
  { label: 'Ariza qabuli', value: '1-sentabrgacha' },
  { label: 'Suhbatlar', value: '2–7-sentabr' },
  { label: 'Rezidentura', value: '15-sentabr — 9-noyabr' },
  { label: 'Demo Day', value: '14-noyabr' },
]

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
            G‘oyangizni 8 haftada
            <br />
            mahsulotga aylantiring
          </h2>

          <ul className="footer-contacts">
            {CONTACTS.map((contact) => (
              <li key={contact.href}>
                <a
                  className="footer-contact"
                  href={contact.href}
                  target={contact.href.startsWith('tel:') ? undefined : '_blank'}
                  rel="noreferrer"
                >
                  <span className="footer-contact-icon">{contact.icon}</span>
                  {contact.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-card footer-links-card">
          <div className="footer-cols">
            <nav className="footer-col" aria-label="Sahifalar">
              <h3 className="footer-col-title">Sahifalar</h3>
              <ul className="footer-col-list">
                {PAGES.map((page) => (
                  <li key={page.href}>
                    <a className="footer-link" href={page.href}>
                      {page.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer-col">
              <h3 className="footer-col-title">Muhim sanalar</h3>
              <ul className="footer-col-list">
                {DATES.map((date) => (
                  <li className="footer-date" key={date.label}>
                    <span className="footer-date-label">{date.label}</span>
                    <span className="footer-date-value">{date.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            className="footer-address"
            href="https://maps.google.com/?q=Toshkent+Shayxontohur+tumani"
            target="_blank"
            rel="noreferrer"
          >
            <PinIcon className="footer-address-icon" />
            Toshkent shahar, Shayxontohur tumani, Olmazor ko‘chasi 12
          </a>
        </div>
      </div>
    </footer>
  )
}
