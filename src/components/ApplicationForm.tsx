import { useRef, useState } from 'react'
import {
  TextField,
  TextAreaField,
  RadioGroup,
  CheckboxGroup,
  TagInput,
} from './fields'
import { Countdown } from './Countdown'
import {
  AlertIcon,
  ArrowIcon,
  AtIcon,
  CheckCircleIcon,
  PhoneIcon,
  PinIcon,
  UserIcon,
} from './icons'
import {
  BIO_MAX,
  BIO_MIN,
  MOTIVATION_MAX,
  MOTIVATION_MIN,
  PORTFOLIO_MAX,
  PORTFOLIO_MIN,
  RESPONSE_HOURS,
  emptyForm,
  formatPhone,
  normalizeUsername,
  validateAll,
  validateField,
  type FieldName,
  type Commitment,
  type FormErrors,
  type FormValues,
  type Status,
} from '../lib/form'
import { submitApplication } from '../lib/submit'

const STATUS_OPTIONS = [
  { value: 'study', label: 'Oʻqiyman', note: 'Universitet yoki kollejda' },
  { value: 'work', label: 'Ishlayman', note: 'Kompaniya yoki oʻz ishim' },
  {
    value: 'none',
    label: 'Hozircha yoʻq',
    note: 'Oʻqimayman ham, ishlamayman ham',
  },
] as const satisfies readonly { value: Status; label: string; note: string }[]

const COMMITMENT_OPTIONS = [
  {
    value: 'full',
    label: 'Toʻliq vaqt',
    note: 'Rezidensiyaga toʻliq jalb boʻlaman',
  },
  {
    value: 'partial',
    label: 'Qisman',
    note: 'Haftasiga bir necha kun ajrata olaman',
  },
] as const satisfies readonly {
  value: Exclude<Commitment, ''>
  label: string
  note: string
}[]

const SKILL_SUGGESTIONS = [
  'Figma',
  'React',
  'Python',
  'Sotuv',
  'AI vositalari',
  'No-code',
  'Data analiz',
  'Marketing',
] as const

type SubmitState = 'idle' | 'submitting' | 'success'

export function ApplicationForm() {
  const [values, setValues] = useState<FormValues>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [skillDraft, setSkillDraft] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitError, setSubmitError] = useState<string>()
  const formRef = useRef<HTMLFormElement>(null)

  const set = <K extends FieldName>(name: K, value: FormValues[K]) => {
    const next = { ...values, [name]: value }
    setValues(next)
    // Once a field has been blurred, re-validate on every keystroke so the
    // error clears as soon as it is fixed.
    if (touched[name]) {
      setErrors((e) => ({ ...e, [name]: validateField(name, next) }))
    }
  }

  const blur = (name: FieldName) => {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors((e) => ({ ...e, [name]: validateField(name, values) }))
  }

  /**
   * Study and work can both be true; "none" is exclusive with either, so
   * picking it clears the others and vice versa.
   */
  const toggleStatus = (status: Status) => {
    const current = values.statuses
    const next = current.includes(status)
      ? current.filter((s) => s !== status)
      : status === 'none'
        ? ['none' as Status]
        : [...current.filter((s) => s !== 'none'), status]

    setValues({
      ...values,
      statuses: next,
      faculty: next.includes('study') ? values.faculty : '',
      workplace: next.includes('work') ? values.workplace : '',
    })
    setErrors((e) => ({ ...e, statuses: next.length ? undefined : e.statuses }))
  }

  const errorOf = (name: FieldName) => (touched[name] ? errors[name] : undefined)
  const validOf = (name: FieldName) =>
    Boolean(touched[name] && !errors[name] && String(values[name]).length > 0)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (submitState === 'submitting') return

    // Flush any half-typed skill into the tag list before validating.
    const pendingSkill = skillDraft.trim().replace(/,+$/, '')
    const submitted: FormValues = pendingSkill
      ? { ...values, skills: [...values.skills, pendingSkill] }
      : values
    if (pendingSkill) {
      setValues(submitted)
      setSkillDraft('')
    }

    const found = validateAll(submitted)
    setErrors(found)

    const names = Object.keys(found) as FieldName[]
    if (names.length) {
      setTouched((t) => {
        const next = { ...t }
        for (const name of names) next[name] = true
        return next
      })
      requestAnimationFrame(() => {
        const firstInvalid = formRef.current?.querySelector<HTMLElement>(
          '.is-error input, .is-error textarea, .radio.is-error input',
        )
        firstInvalid?.focus()
        firstInvalid?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      })
      return
    }

    setSubmitState('submitting')
    setSubmitError(undefined)

    try {
      await submitApplication({
        ...submitted,
        username: normalizeUsername(submitted.username),
        statusLabel: STATUS_OPTIONS.filter((option) =>
          submitted.statuses.includes(option.value),
        )
          .map((option) => option.label)
          .join(', '),
        commitmentLabel:
          COMMITMENT_OPTIONS.find(
            (option) => option.value === submitted.commitment,
          )?.label ?? '',
        submittedAt: new Date().toISOString(),
      })
      setSubmitState('success')
    } catch (error) {
      console.error('Application submit failed', error)
      setSubmitError(
        'Arizani yuborib boʻlmadi. Internetni tekshirib, qaytadan urining.',
      )
      setSubmitState('idle')
    }
  }

  if (submitState === 'success') {
    return (
      <div className="success" role="status">
        <span className="success-icon">
          <CheckCircleIcon />
        </span>
        <h2 className="success-title">Arizangiz qabul qilindi</h2>
        <p className="success-text">
          Rahmat, {values.fullName.trim().split(' ')[0]}. Jamoamiz arizangizni
          koʻrib chiqadi va <strong>{RESPONSE_HOURS} soat ichida</strong>{' '}
          <span className="success-handle">
            @{normalizeUsername(values.username)}
          </span>{' '}
          manziliga javob yozadi.
        </p>
        <div className="success-meta">
          <div className="success-meta-item">
            <span className="success-meta-label">Keyingi qadam</span>
            <span className="success-meta-value">15 daqiqalik suhbat</span>
          </div>
          <div className="success-meta-item">
            <span className="success-meta-label">Javob muddati</span>
            <span className="success-meta-value">{RESPONSE_HOURS} soat</span>
          </div>
        </div>
        <p className="success-note">
          Javob kelmasa, spam papkasini va Telegram’dagi “Message requests”
          boʻlimini tekshiring.
        </p>
      </div>
    )
  }

  const submitting = submitState === 'submitting'

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate>
      <fieldset className="form-section" disabled={submitting}>
        <legend className="form-section-title">
          <span className="form-section-index">01</span>
          Shaxsiy ma’lumotlar
        </legend>

        <TextField
          label="Ism Familiya"
          placeholder="Aziza Karimova"
          autoComplete="name"
          icon={<UserIcon />}
          value={values.fullName}
          onChange={(v) => set('fullName', v)}
          onBlur={() => blur('fullName')}
          error={errorOf('fullName')}
          valid={validOf('fullName')}
        />

        <TextField
          label="Telefon raqami"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+998 90 123 45 67"
          icon={<PhoneIcon />}
          value={values.phone}
          onChange={(v) => set('phone', formatPhone(v))}
          onBlur={() => blur('phone')}
          error={errorOf('phone')}
          valid={validOf('phone')}
        />

        <TextField
          label="Username"
          hint="Telegram yoki Instagram — javobni shu manzilga yozamiz"
          placeholder="username"
          prefix="@"
          icon={<AtIcon />}
          value={values.username}
          onChange={(v) => set('username', v.replace(/\s/g, ''))}
          onBlur={() => {
            set('username', normalizeUsername(values.username))
            blur('username')
          }}
          error={errorOf('username')}
          valid={validOf('username')}
        />
      </fieldset>

      <fieldset className="form-section" disabled={submitting}>
        <legend className="form-section-title">
          <span className="form-section-index">02</span>
          Oʻzingiz haqingizda
        </legend>

        <TextAreaField
          label="Qisqacha tanishtiring"
          hint="Nima bilan shugʻullanasiz, nimalarni qurgansiz — 2-3 gap yetarli"
          placeholder="Men 3 yildan beri mahsulot dizayni bilan shugʻullanaman…"
          value={values.bio}
          onChange={(v) => set('bio', v)}
          onBlur={() => blur('bio')}
          error={errorOf('bio')}
          valid={validOf('bio')}
          min={BIO_MIN}
          max={BIO_MAX}
          rows={4}
        />

        <CheckboxGroup
          label="Holati"
          hint="Bir nechtasini tanlash mumkin"
          value={values.statuses}
          options={STATUS_OPTIONS}
          onChange={toggleStatus}
          error={errorOf('statuses')}
        />

        {values.statuses.includes('study') && (
          <div className="reveal">
            <TextField
              label="Qaysi fakultet?"
              placeholder="TATU, Kompyuter injiniringi"
              value={values.faculty}
              onChange={(v) => set('faculty', v)}
              onBlur={() => blur('faculty')}
              error={errorOf('faculty')}
              valid={validOf('faculty')}
            />
          </div>
        )}

        {values.statuses.includes('work') && (
          <div className="reveal">
            <TextField
              label="Qayerda ishlaysiz?"
              placeholder="Uzum Market, product manager"
              value={values.workplace}
              onChange={(v) => set('workplace', v)}
              onBlur={() => blur('workplace')}
              error={errorOf('workplace')}
              valid={validOf('workplace')}
            />
          </div>
        )}

        <TextField
          label="Turar joyi"
          placeholder="Toshkent, Yunusobod tumani"
          icon={<PinIcon />}
          value={values.city}
          onChange={(v) => set('city', v)}
          onBlur={() => blur('city')}
          error={errorOf('city')}
          valid={validOf('city')}
        />
      </fieldset>

      <fieldset className="form-section" disabled={submitting}>
        <legend className="form-section-title">
          <span className="form-section-index">03</span>
          Ijro va motivatsiya
        </legend>

        <TagInput
          label="Hard skills"
          hint="Har birini Enter yoki vergul bilan ajrating"
          value={values.skills}
          draft={skillDraft}
          onDraftChange={setSkillDraft}
          onChange={(v) => set('skills', v)}
          onBlur={() => blur('skills')}
          error={errorOf('skills')}
          valid={Boolean(touched.skills && !errors.skills && values.skills.length)}
          suggestions={SKILL_SUGGESTIONS}
        />

        <TextAreaField
          label="Ijro dalillari"
          hint="Nima qurgansiz, sotgansiz yoki ishga tushirgansiz? Havolalar boʻlsa — tashlang. Diplom emas, ijro muhim."
          placeholder="Telegram bot qurdim, 400 ta foydalanuvchi… / havola"
          value={values.portfolio}
          onChange={(v) => set('portfolio', v)}
          onBlur={() => blur('portfolio')}
          error={errorOf('portfolio')}
          valid={validOf('portfolio')}
          min={PORTFOLIO_MIN}
          max={PORTFOLIO_MAX}
          rows={4}
        />

        <RadioGroup
          label="Bandligingiz"
          name="commitment"
          value={values.commitment}
          options={COMMITMENT_OPTIONS}
          onChange={(v: Exclude<Commitment, ''>) => set('commitment', v)}
          error={errorOf('commitment')}
        />

        <TextAreaField
          label="Nima uchun aynan siz?"
          hint="Nimani qurmoqchisiz, nega hozir va nega siz uddalaysiz?"
          placeholder="Men oxirgi 6 oyda…"
          value={values.motivation}
          onChange={(v) => set('motivation', v)}
          onBlur={() => blur('motivation')}
          error={errorOf('motivation')}
          valid={validOf('motivation')}
          min={MOTIVATION_MIN}
          max={MOTIVATION_MAX}
          rows={7}
        />
      </fieldset>

      <div className="submit-block">
        <button
          type="submit"
          className={`submit${submitting ? ' is-loading' : ''}`}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Yuborilmoqda…
            </>
          ) : (
            <>
              Arizani yuborish
              <ArrowIcon className="submit-arrow" />
            </>
          )}
        </button>
        {submitError && (
          <p className="submit-error" role="alert">
            <AlertIcon className="msg-icon" />
            {submitError}
          </p>
        )}
        <Countdown />
      </div>
    </form>
  )
}
