import { Faq } from '../components/Faq'
import { Phases } from '../components/Phases'
import { Steps } from '../components/Steps'
import { Link } from '../components/Link'
import { ROUTES } from '../lib/router'

/** §2, §8, §23 — what Startup Garage hands over to the founder. */
const PILLARS = [
  {
    index: '01',
    title: 'Tekshirilgan gʻoya',
    text: 'Imkoniyatlar kutubxonasidan tanlab olingan yoʻnalish: muammo bayoni, maqsadli mijoz, bozor hajmi, daromad modeli, raqobat va xavflar — tayyor brif bilan. Gʻoya izlab yurmaysiz.',
    meta: 'Imkoniyat brifi',
  },
  {
    index: '02',
    title: 'Jamoa',
    text: 'Loyihaga mahsulot, dizayn, muhandislik va oʻsish boʻyicha umumiy jamoa biriktiriladi. Kichik, hisobdor va ijroga yoʻnaltirilgan venture builder jamoasi.',
    meta: '1–3 asoschi',
  },
  {
    index: '03',
    title: 'Mahsulot va texnologiya',
    text: 'Vibe coding intensivi va AI-native qurish: spetsifikatsiya, prompting, frontend, backend, integratsiyalar, deployment va analitika. Yakunda — ishlaydigan MVP.',
    meta: '3–6 hafta',
  },
  {
    index: '04',
    title: 'Go-to-Market',
    text: 'Tayyor tarqatish strategiyasi: maqsadli mijoz, kanal, savdo jarayoni, narx va haftalik nishonlar. Birinchi toʻlovchi mijozlargacha yoningizdamiz.',
    meta: 'Birinchi kundan',
  },
  {
    index: '05',
    title: 'Kapital va operatsion tayanch',
    text: 'Yuridik, moliya, buxgalteriya va yollash; mentorlar, investorga tayyorlik, Demo Day va investorlar tarmogʻiga kirish.',
    meta: 'Doimiy',
  },
]

/** §30 — recommended cohort shape. */
const FACTS = [
  { value: '12 oygacha', label: 'Rezidensiya muddati' },
  { value: '20 asoschi', label: 'Kogorta hajmi' },
  { value: '10–15', label: 'Venchur imkoniyati' },
]

export function Landing() {
  return (
    <main>
      <div className="shell">
        <section className="hero">
          <h1 className="hero-title">
            <span className="hero-highlight">Founders</span> Residency
          </h1>
          <p className="hero-lead">
            G‘oyani, jamoani va Go-to-Market’ni biz beramiz — siz qurasiz.
          </p>
          <p className="hero-context">
            Startup Garage — venchur qurish studiyasi. 2024-yildan beri 400 dan
            ortiq jamoaga mahsulotni ishga tushirish, mijoz topish va
            investitsiya jalb qilishda ko‘maklashdik. Founders Residency’da biz
            imkoniyatni topamiz va tekshiramiz, jamoa yig‘amiz, mahsulot va
            tarqatish strategiyasini tayyorlaymiz — so‘ng loyihani boshdan
            oxirigacha asoschiga topshiramiz.
          </p>
          <dl className="hero-facts">
            {FACTS.map((fact) => (
              <div className="fact" key={fact.label}>
                <dt className="fact-value">{fact.value}</dt>
                <dd className="fact-label">{fact.label}</dd>
              </div>
            ))}
          </dl>
          <Link className="hero-cta" to={ROUTES.apply}>
            Ariza topshirish
          </Link>
        </section>
      </div>

      <div className="shell-wide">
        <section className="pillars" id="dastur">
          <div className="pillars-head">
            <span className="pillars-eyebrow">Dastur haqida</span>
            <h2 className="pillars-title">
              Loyihani <span className="accent">biz beramiz</span> — siz qurasiz
            </h2>
            <p className="pillars-lead">
              Founders Residency startapdan emas, asoschidan boshlanadi.
              Tanlangan asoschi bo‘sh varaq emas — tekshirilgan imkoniyat,
              jamoa va tarqatish rejasi bilan ishga kirishadi.
            </p>
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
        <Phases />
      </div>

      <div className="shell-wide">
        <Steps />
      </div>

      <div className="shell-wide">
        <Faq />
      </div>

      <div className="shell">
        <section className="cta">
          <h2 className="cta-title">Kogortaga qoʻshilasizmi?</h2>
          <p className="cta-text">
            Ariza toʻldirish 10 daqiqa oladi. Javobni 48 soat ichida beramiz.
          </p>
          <Link className="hero-cta" to={ROUTES.apply}>
            Ariza topshirish
          </Link>
        </section>
      </div>
    </main>
  )
}
