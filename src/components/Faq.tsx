import { useState } from 'react'

const ITEMS = [
  {
    q: 'Dasturda qatnashish bepulmi?',
    a: 'Ha, ishtirok butunlay bepul. Startup Garage rezidentlardan toʻlov ham, ulush ham olmaydi — dastur homiylar hisobidan moliyalashtiriladi.',
  },
  {
    q: 'Tayyor gʻoyam boʻlmasa ham topshirsam boʻladimi?',
    a: 'Boʻladi. Rezidentlarning qariyb yarmi dasturga aniq gʻoyasiz keladi — birinchi ikki hafta aynan muammoni topish va tekshirishga ajratilgan.',
  },
  {
    q: 'Ariza koʻrib chiqilishi qancha vaqt oladi?',
    a: 'Arizangizni 48 soat ichida koʻrib chiqamiz va javobni siz koʻrsatgan Telegram yoki Instagram manziliga yozamiz. Keyingi bosqich — 15 daqiqalik onlayn suhbat.',
  },
  {
    q: 'Jadval qanday tuzilgan?',
    a: 'Haftasiga uch kun Toshkentdagi maydonchada birgalikda ishlaymiz, qolgan kunlar mustaqil. Har juma — mentor bilan yakuniy uchrashuv va haftalik natijalar taqdimoti.',
  },
  {
    q: 'Toshkentda yashamasam-chi?',
    a: 'Rezidentura oflayn oʻtadi. Boshqa viloyatdan keladigan jamoalar uchun 8 hafta davomida turar joy bilan yordam beramiz — arizada shuni yozib qoldiring.',
  },
]

export function Faq() {
  const [active, setActive] = useState(0)

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="faq-panel">
        <h2 className="faq-title" id="faq-title">
          Koʻp soʻraladigan savollar
        </h2>

        <div className="faq-grid">
          <div className="faq-list">
            {ITEMS.map((item, index) => {
              const isActive = index === active
              return (
                <button
                  key={item.q}
                  type="button"
                  className={`faq-q${isActive ? ' is-active' : ''}`}
                  onClick={() => setActive(index)}
                  aria-expanded={isActive}
                  aria-controls="faq-answer"
                >
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-sign" aria-hidden="true">
                    {isActive ? '−' : '+'}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="faq-answer" id="faq-answer" aria-live="polite">
            <h3 className="faq-answer-title">Savolning javobi:</h3>
            <p className="faq-answer-text">{ITEMS[active].a}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
