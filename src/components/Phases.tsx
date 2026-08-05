/** §25 — the six residency stages, each with its own exit criteria. */
const PHASES = [
  {
    index: '01',
    title: 'Tadqiqotchi',
    text: 'Asoschi diagnostikasi, imkoniyat tanlash, boshlangʻich mijoz segmenti va tekshirish rejasi.',
  },
  {
    index: '02',
    title: 'Tekshiruvchi',
    text: '15 dan ortiq mijoz suhbati, aniq muammo bayoni, talab signali va MVP hajmi.',
  },
  {
    index: '03',
    title: 'Quruvchi',
    text: 'Ishlaydigan MVP, analitika, foydalanuvchi onboardingi va ishga tushirish rejasi.',
  },
  {
    index: '04',
    title: 'Operator',
    text: 'Faol foydalanuvchilar, birinchi daromad yoki pilotlar, takrorlanuvchi haftalik ritm.',
  },
  {
    index: '05',
    title: 'PMF nomzodi',
    text: 'Ideal mijoz profili, yaxshilanayotgan ushlab qolish va toʻlashga tayyorlik dalili.',
  },
  {
    index: '06',
    title: 'Kengaytirish nomzodi',
    text: 'Daromad oʻsishi, aniq birlik iqtisodiyoti, yollash rejasi va investitsiyaga tayyorlik.',
  },
]

/** §3 — the venture-building loop the residency runs on. */
const LOOP = [
  'Asoschi',
  'Imkoniyat',
  'Tekshirish',
  'Qurish',
  'Ishga tushirish',
  'Tarqatish',
  'PMF',
  'Kengaytirish yoki pivot',
]

/** §18 — the weekly operating rhythm every resident runs on. */
const RHYTHM = [
  { day: 'Dushanba', focus: 'Strategiya va koʻrsatkichlar' },
  { day: 'Seshanba', focus: 'Mahsulot va qurish' },
  { day: 'Chorshanba', focus: 'Mijoz kuni' },
  { day: 'Payshanba', focus: 'Tarqatish kuni' },
  { day: 'Juma', focus: 'Namoyish va qaror kuni' },
]

export function Phases() {
  return (
    <section
      className="phases"
      id="bosqichlar"
      aria-label="Rezidensiya bosqichlari"
    >
      <div className="phases-head">
        <span className="phases-eyebrow">Rezidensiya ichida</span>
        <h2 className="phases-title">
          Olti bosqich, har birida <span className="accent">chiqish sharti</span>
        </h2>
        <p className="phases-lead">
          Loyihani qoʻlga olganingizdan soʻng bosqichdan bosqichga vaqt bilan
          emas, dalil bilan oʻtasiz. Har toʻrt haftada kengaytirish,
          yoʻnalishni oʻzgartirish yoki toʻxtatish boʻyicha rasmiy qaror qabul
          qilinadi.
        </p>
      </div>

      <ol className="phases-list">
        {PHASES.map((phase, index) => (
          <li className="phase" key={phase.index}>
            <span className="phase-meter" aria-hidden="true">
              {PHASES.map((_, tick) => (
                <span
                  key={tick}
                  className={`phase-tick${tick <= index ? ' is-filled' : ''}`}
                />
              ))}
            </span>
            <span className="phase-index">{phase.index}</span>
            <h3 className="phase-title">{phase.title}</h3>
            <p className="phase-text">{phase.text}</p>
          </li>
        ))}
      </ol>

      <div className="loop">
        <span className="loop-label">Asoschi aylanmasi</span>
        <ol className="loop-flow">
          {LOOP.map((node) => (
            <li className="loop-node" key={node}>
              {node}
            </li>
          ))}
          <li className="loop-node is-repeat">↻ Takrorlash</li>
        </ol>
        <blockquote className="loop-quote">
          Gʻoyani toʻxtatish asoschining muvaffaqiyatsizligi emas.{' '}
          <strong>Dalilsiz davom etish — muvaffaqiyatsizlik.</strong>
        </blockquote>
      </div>

      <div className="rhythm">
        <span className="rhythm-label">Haftalik ritm</span>
        <ul className="rhythm-list">
          {RHYTHM.map((item, index) => (
            <li className="rhythm-item" key={item.day}>
              <span className="rhythm-index" aria-hidden="true">
                0{index + 1}
              </span>
              <span className="rhythm-day">{item.day}</span>
              <span className="rhythm-focus">{item.focus}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
