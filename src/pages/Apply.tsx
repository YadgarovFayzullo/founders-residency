import { ApplicationForm } from '../components/ApplicationForm'
import { ArrowIcon } from '../components/icons'
import { Link } from '../components/Link'
import { ROUTES } from '../lib/router'

export function Apply() {
  return (
    <main>
      <div className="shell">
        <section className="apply" id="ariza">
          <Link className="back-link" to={ROUTES.home}>
            <ArrowIcon className="back-icon" />
            Asosiy sahifa
          </Link>

          <div className="apply-head">
            <span className="apply-eyebrow">Founders Residency</span>
            <h1 className="section-title">Ariza</h1>
            <p className="apply-lead">
              Bizga sayqallangan matn emas — ijro dalili kerak. Har bir savolga
              qisqa, aniq va o‘z so‘zlaringiz bilan javob bering.
            </p>
          </div>

          <ApplicationForm />
        </section>
      </div>
    </main>
  )
}
