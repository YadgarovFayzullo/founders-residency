/** Current occupation — a founder may study, work, both, or neither. */
export type Status = 'study' | 'work' | 'none'

/** §5.2 — the programme screens for availability and full commitment. */
export type Commitment = '' | 'full' | 'partial'

export type FormValues = {
  fullName: string
  phone: string
  username: string
  bio: string
  statuses: Status[]
  faculty: string
  workplace: string
  city: string
  skills: string[]
  portfolio: string
  commitment: Commitment
  motivation: string
}

export type FieldName = keyof FormValues
export type FormErrors = Partial<Record<FieldName, string>>

export const BIO_MIN = 40
export const BIO_MAX = 400
export const PORTFOLIO_MIN = 40
export const PORTFOLIO_MAX = 600
export const MOTIVATION_MIN = 80
export const MOTIVATION_MAX = 1000

export const emptyForm: FormValues = {
  fullName: '',
  phone: '',
  username: '',
  bio: '',
  statuses: [],
  faculty: '',
  workplace: '',
  city: '',
  skills: [],
  portfolio: '',
  commitment: '',
  motivation: '',
}

/** Keeps the input as a masked +998 90 123 45 67 string while typing. */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').replace(/^998/, '').slice(0, 9)
  if (!digits) return ''
  const groups = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 7),
    digits.slice(7, 9),
  ].filter(Boolean)
  return `+998 ${groups.join(' ')}`
}

/** Strips a leading @ or a t.me / instagram.com URL down to the bare handle. */
export function normalizeUsername(raw: string): string {
  return raw
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^(www\.)?(t\.me|telegram\.me|instagram\.com)\//i, '')
    .replace(/^@+/, '')
    .replace(/\/+$/, '')
}

export function validateField(
  name: FieldName,
  values: FormValues,
): string | undefined {
  switch (name) {
    case 'fullName': {
      const v = values.fullName.trim()
      if (!v) return 'Ism va familiyangizni kiriting'
      if (v.length < 4) return 'Toʻliq ism va familiyangizni yozing'
      if (!v.includes(' ')) return 'Familiyangizni ham qoʻshing'
      return
    }
    case 'phone': {
      const digits = values.phone.replace(/\D/g, '')
      if (!digits) return 'Telefon raqamingizni kiriting'
      if (digits.length !== 12) return 'Raqam toʻliq emas — +998 XX XXX XX XX'
      return
    }
    case 'username': {
      const v = normalizeUsername(values.username)
      if (!v) return 'Telegram yoki Instagram username kiriting'
      if (!/^[a-zA-Z0-9._]{3,32}$/.test(v))
        return 'Faqat harflar, raqamlar, nuqta va pastki chiziq'
      return
    }
    case 'bio': {
      const v = values.bio.trim()
      if (!v) return 'Oʻzingiz haqingizda qisqacha yozing'
      if (v.length < BIO_MIN) return `Kamida ${BIO_MIN} belgi — hozir ${v.length}`
      return
    }
    case 'statuses':
      if (values.statuses.length === 0) return 'Kamida bitta variantni tanlang'
      return
    case 'faculty':
      if (values.statuses.includes('study') && !values.faculty.trim())
        return 'Qaysi OTM va fakultetda oʻqiyotganingizni yozing'
      return
    case 'workplace':
      if (values.statuses.includes('work') && !values.workplace.trim())
        return 'Qayerda ishlayotganingizni yozing'
      return
    case 'city': {
      const v = values.city.trim()
      if (!v) return 'Turar joyingizni kiriting'
      if (v.length < 3) return 'Shahar yoki tumanni toʻliqroq yozing'
      return
    }
    case 'skills':
      if (values.skills.length === 0) return 'Kamida bitta koʻnikma qoʻshing'
      return
    case 'portfolio': {
      const v = values.portfolio.trim()
      if (!v) return 'Nima qurgan boʻlsangiz — shuni yozing'
      if (v.length < PORTFOLIO_MIN)
        return `Kamida ${PORTFOLIO_MIN} belgi — hozir ${v.length}`
      return
    }
    case 'commitment':
      if (!values.commitment) return 'Bandligingizni tanlang'
      return
    case 'motivation': {
      const v = values.motivation.trim()
      if (!v) return 'Bu savolga javob bering'
      if (v.length < MOTIVATION_MIN)
        return `Kamida ${MOTIVATION_MIN} belgi — hozir ${v.length}`
      return
    }
  }
}

/** Fields that are actually on screen for the current answers. */
export function activeFields(values: FormValues): FieldName[] {
  const fields: FieldName[] = [
    'fullName',
    'phone',
    'username',
    'bio',
    'statuses',
  ]
  if (values.statuses.includes('study')) fields.push('faculty')
  if (values.statuses.includes('work')) fields.push('workplace')
  return [...fields, 'city', 'skills', 'portfolio', 'commitment', 'motivation']
}

export function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  for (const name of activeFields(values)) {
    const error = validateField(name, values)
    if (error) errors[name] = error
  }
  return errors
}

/**
 * Application deadline. The countdown next to the submit button runs to this
 * moment; change it per cohort. Stored in Tashkent time (UTC+5).
 */
export const DEADLINE = new Date('2026-09-01T23:59:59+05:00')

export const DEADLINE_LABEL = '1-sentabr, 23:59'

/** Hours the team commits to answering in, shown on the success screen. */
export const RESPONSE_HOURS = 48
