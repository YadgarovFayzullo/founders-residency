import { useState } from 'react'

const ITEMS = [
  {
    q: 'Gʻoyani va jamoani kim beradi?',
    a: 'Startup Garage. Biz Imkoniyatlar kutubxonasini yuritamiz: har bir yoʻnalish muammo bayoni, maqsadli mijoz, bozor hajmi, daromad salohiyati va xavflari bilan brif qilib tayyorlanadi. Sizga tekshirilgan imkoniyat, mahsulot va oʻsish boʻyicha umumiy jamoa hamda tayyor Go To Market rejasi topshiriladi; venchur jamoasi bir–uch asoschidan iborat boʻladi. Oʻz gʻoyangiz boʻlsa — u ham xuddi shu tekshiruvdan oʻtadi.',
  },
  {
    q: 'Rezidensiya qancha davom etadi?',
    a: 'Maksimal 12 oy. Har uch oyda samaradorlik nazorat nuqtasi, har toʻrt haftada esa kengaytirish, yoʻnalishni oʻzgartirish yoki toʻxtatish boʻyicha rasmiy qaror. Bitirish dastur muddatiga emas, dalilga asoslanadi.',
  },
  {
    q: 'Ulush va shartnoma qanday?',
    a: 'Qabul qilingan asoschilar Asoschi majburiyat shartnomasini imzolaydi: qatnashish, haftalik hisobot, maxfiylik, intellektual mulk, ulush shartlari, axloqiy meʼyorlar va minimal ijro talablari. Aniq shartlar suhbat bosqichida ochiq muhokama qilinadi.',
  },
  {
    q: 'Texnik boʻlmasam ham boʻladimi?',
    a: 'Boʻladi. Ikki haftalik vibe coding intensivi har bir asoschini mahsulot spetsifikatsiyasi, AI prompting, frontend, backend, integratsiyalar, deployment va analitikadan oʻtkazadi; bitirish talabi — ishlaydigan mahsulotni qurib, joylashtirish. Buning evaziga sizdan haftalik hisobot, juma kunidagi namoyish va kunlik besh harakat talab qilinadi: mijoz bilan gaplashish, mahsulotni yaxshilash, sotish, koʻrsatkichlarni koʻrib chiqish va oʻrganilganni hujjatlashtirish. Mijoz bilan gaplashishdan yoki sotishdan doimiy bosh tortish — chetlatish sababi.',
  },
  {
    q: 'Startapim toʻxtatilsa, dasturdan chiqamanmi?',
    a: 'Yoʻq. Asoschi post-mortemdan oʻtadi: qaysi taxminlar notoʻgʻri edi, qaysi dalillar eʼtiborsiz qoldi, nima keraksiz qurildi. Soʻng ball jadvali yangilanadi, yangi imkoniyat tanlanadi va yangi sikl boshlanadi. Bu — dasturning asosiy mexanizmi.',
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
