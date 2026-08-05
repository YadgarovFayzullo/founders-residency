import { ApplicationForm } from './components/ApplicationForm'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Steps } from './components/Steps'
import { LOGO_MAIN } from './lib/assets'
import './App.css'

const PILLARS = [
  {
    index: '01',
    title: '8 hafta amaliyot',
    text: 'Har hafta aniq maqsad: muammoni tasdiqlash, prototip, birinchi mijoz, birinchi tushum. Nazariya emas — har juma natijani koʻrsatasiz.',
    meta: '1–8-hafta',
  },
  {
    index: '02',
    title: 'Mentorlar bilan ish',
    text: 'Mahsulot, sotuv va investitsiya boʻyicha amaliyotchi mentorlar bilan haftalik uchrashuv. Har jamoaga oʻz yoʻnalishi boʻyicha mentor biriktiriladi.',
    meta: 'Har hafta',
  },
  {
    index: '03',
    title: 'Demo Day',
    text: 'Dastur yakunida investorlar va hamjamiyat oldida mahsulotingizni taqdim etasiz — tayyor pitch, raqamlar va ishlaydigan demo bilan.',
    meta: 'Yakuniy hafta',
  },
]

const FACTS = [
  { value: '8 hafta', label: 'Dastur davomiyligi' },
  { value: '12 jamoa', label: 'Har oqimda' },
  { value: 'Bepul', label: 'Ishtirok narxi' },
]

export default function App() {
  return (
    <div className="page" id="top">
      <header className="topbar">
        <div className="shell topbar-inner">
          <a className="brand" href="#top">
            <img
              className="brand-logo"
              src={LOGO_MAIN}
              alt="Startup Garage"
              width={104}
              height={36}
            />
          </a>
          <a className="topbar-link" href="#ariza">
            Ariza topshirish
          </a>
        </div>
      </header>

      <main>
        <div className="shell">
          <section className="hero">
            <h1 className="hero-title">
              <span className="hero-highlight">Founders</span> Residency
            </h1>
            <p className="hero-lead">
              G‘oyangizni 8 hafta ichida ishlaydigan mahsulotga va birinchi
              to‘lovchi mijozlarga aylantiring.
            </p>
            <p className="hero-context">
              Startup Garage — O‘zbekistondagi erta bosqich jamoalar uchun
              studiya. 2021-yildan beri 60 dan ortiq jamoaga mahsulotni ishga
              tushirish, mijoz topish va investitsiya jalb qilishda
              ko‘maklashdik. Founders Residency — bizning eng zich dasturimiz.
            </p>
            <dl className="hero-facts">
              {FACTS.map((fact) => (
                <div className="fact" key={fact.label}>
                  <dt className="fact-value">{fact.value}</dt>
                  <dd className="fact-label">{fact.label}</dd>
                </div>
              ))}
            </dl>
            <a className="hero-cta" href="#ariza">
              Ariza topshirish
            </a>
          </section>
        </div>

        <div className="shell-wide">
          <section className="pillars" id="dastur">
            <div className="pillars-head">
              <span className="pillars-eyebrow">Dastur haqida</span>
              <h2 className="pillars-title">
                Rezidentura nimadan <span className="accent">iborat</span>
              </h2>
            </div>

            <div className="pillars-list">
              {PILLARS.map((pillar) => (
                <article className="pillar" key={pillar.index}>
                  <span className="pillar-index">{pillar.index}</span>
                  <div className="pillar-body">
                    <h3 className="pillar-title">{pillar.title}</h3>
                    <p className="pillar-text">{pillar.text}</p>
                  </div>
                  <span className="pillar-meta">{pillar.meta}</span>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="shell-wide">
          <Steps />
        </div>

        <div className="shell">

          <section className="apply" id="ariza">
            <div className="apply-head">
              <h2 className="section-title">Ariza</h2>
              <p className="apply-lead">
                Barcha savollarga o‘z so‘zlaringiz bilan javob bering — bizga
                sayqallangan matn emas, aniqlik kerak.
              </p>
            </div>
            <ApplicationForm />
          </section>
        </div>

        <div className="shell-wide">
          <Faq />
        </div>
      </main>

      <Footer />
    </div>
  )
}
