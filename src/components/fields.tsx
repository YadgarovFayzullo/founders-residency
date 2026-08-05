import { useId, useRef, type ReactNode } from 'react'
import { AlertIcon, CheckIcon, CloseIcon } from './icons'

/* ── Shared shell: label, control, hint, validation message ─────────── */

type FieldShellProps = {
  id: string
  label: string
  hint?: string
  error?: string
  children: ReactNode
  footer?: ReactNode
}

function FieldShell({ id, label, hint, error, children, footer }: FieldShellProps) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      {hint && !error && (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {children}
      <div className="field-foot">
        {error ? (
          <p className="field-error" id={`${id}-error`} role="alert">
            <AlertIcon className="msg-icon" />
            {error}
          </p>
        ) : (
          <span />
        )}
        {footer}
      </div>
    </div>
  )
}

function state(error?: string, valid?: boolean) {
  return ['control', error && 'is-error', !error && valid && 'is-valid']
    .filter(Boolean)
    .join(' ')
}

function describedBy(id: string, hint?: string, error?: string) {
  if (error) return `${id}-error`
  return hint ? `${id}-hint` : undefined
}

/* ── Single-line text input ─────────────────────────────────────────── */

type TextFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  error?: string
  valid?: boolean
  hint?: string
  placeholder?: string
  icon?: ReactNode
  type?: 'text' | 'tel'
  inputMode?: 'text' | 'tel'
  autoComplete?: string
  prefix?: string
}

export function TextField({
  label,
  value,
  onChange,
  onBlur,
  error,
  valid,
  hint,
  placeholder,
  icon,
  type = 'text',
  inputMode,
  autoComplete,
  prefix,
}: TextFieldProps) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <div className={state(error, valid)}>
        {icon && <span className="control-icon">{icon}</span>}
        {prefix && <span className="control-prefix">{prefix}</span>}
        <input
          id={id}
          className="control-input"
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
        />
        {!error && valid && <CheckIcon className="control-check" />}
      </div>
    </FieldShell>
  )
}

/* ── Multi-line text input with character counter ───────────────────── */

type TextAreaFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  error?: string
  valid?: boolean
  hint?: string
  placeholder?: string
  rows?: number
  min: number
  max: number
}

export function TextAreaField({
  label,
  value,
  onChange,
  onBlur,
  error,
  valid,
  hint,
  placeholder,
  rows = 4,
  min,
  max,
}: TextAreaFieldProps) {
  const id = useId()
  const length = value.trim().length
  const reached = length >= min
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      footer={
        <span className={`field-counter${reached ? ' is-reached' : ''}`}>
          {length} / {min} belgi
        </span>
      }
    >
      <div className={`${state(error, valid)} control-area`}>
        <textarea
          id={id}
          className="control-input"
          rows={rows}
          maxLength={max}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
        />
      </div>
    </FieldShell>
  )
}

/* ── Radio group ────────────────────────────────────────────────────── */

type RadioOption<T extends string> = { value: T; label: string; note: string }

type RadioGroupProps<T extends string> = {
  label: string
  name: string
  value: T | ''
  options: readonly RadioOption<T>[]
  onChange: (value: T) => void
  error?: string
}

export function RadioGroup<T extends string>({
  label,
  name,
  value,
  options,
  onChange,
  error,
}: RadioGroupProps<T>) {
  const id = useId()
  return (
    <fieldset className="field" aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="field-label">{label}</legend>
      <div className="radio-row">
        {options.map((option) => {
          const checked = value === option.value
          return (
            <label
              key={option.value}
              className={`radio${checked ? ' is-checked' : ''}${error ? ' is-error' : ''}`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
              />
              <span className="radio-mark" aria-hidden="true" />
              <span className="radio-text">
                <span className="radio-title">{option.label}</span>
                <span className="radio-note">{option.note}</span>
              </span>
            </label>
          )
        })}
      </div>
      <div className="field-foot">
        {error && (
          <p className="field-error" id={`${id}-error`} role="alert">
            <AlertIcon className="msg-icon" />
            {error}
          </p>
        )}
      </div>
    </fieldset>
  )
}

/* ── Checkbox group ─────────────────────────────────────────────────── */

type CheckboxGroupProps<T extends string> = {
  label: string
  hint?: string
  value: readonly T[]
  options: readonly RadioOption<T>[]
  onChange: (value: T) => void
  error?: string
}

export function CheckboxGroup<T extends string>({
  label,
  hint,
  value,
  options,
  onChange,
  error,
}: CheckboxGroupProps<T>) {
  const id = useId()
  return (
    <fieldset
      className="field"
      aria-describedby={error ? `${id}-error` : undefined}
    >
      <legend className="field-label">{label}</legend>
      {hint && !error && <p className="field-hint">{hint}</p>}
      <div className="radio-row">
        {options.map((option) => {
          const checked = value.includes(option.value)
          return (
            <label
              key={option.value}
              className={`radio radio-check${checked ? ' is-checked' : ''}${
                error ? ' is-error' : ''
              }`}
            >
              <input
                type="checkbox"
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
              />
              <span className="radio-mark" aria-hidden="true">
                <CheckIcon className="radio-mark-icon" />
              </span>
              <span className="radio-text">
                <span className="radio-title">{option.label}</span>
                <span className="radio-note">{option.note}</span>
              </span>
            </label>
          )
        })}
      </div>
      <div className="field-foot">
        {error && (
          <p className="field-error" id={`${id}-error`} role="alert">
            <AlertIcon className="msg-icon" />
            {error}
          </p>
        )}
      </div>
    </fieldset>
  )
}

/* ── Tag input for hard skills ──────────────────────────────────────── */

type TagInputProps = {
  label: string
  hint?: string
  value: string[]
  draft: string
  onDraftChange: (draft: string) => void
  onChange: (value: string[]) => void
  onBlur: () => void
  error?: string
  valid?: boolean
  suggestions: readonly string[]
  max?: number
}

export function TagInput({
  label,
  hint,
  value,
  draft,
  onDraftChange,
  onChange,
  onBlur,
  error,
  valid,
  suggestions,
  max = 12,
}: TagInputProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const add = (raw: string) => {
    const tag = raw.trim().replace(/,+$/, '').slice(0, 28)
    if (!tag || value.length >= max) return
    const exists = value.some((t) => t.toLowerCase() === tag.toLowerCase())
    if (!exists) onChange([...value, tag])
    onDraftChange('')
  }

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      add(draft)
    } else if (e.key === 'Backspace' && !draft && value.length) {
      remove(value.length - 1)
    }
  }

  const unused = suggestions.filter(
    (s) => !value.some((t) => t.toLowerCase() === s.toLowerCase()),
  )

  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <div
        className={`${state(error, valid)} control-tags`}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag, index) => (
          <span className="tag" key={tag}>
            {tag}
            <button
              type="button"
              className="tag-remove"
              onClick={() => remove(index)}
              aria-label={`${tag} — oʻchirish`}
            >
              <CloseIcon className="tag-remove-icon" />
            </button>
          </span>
        ))}
        <input
          id={id}
          ref={inputRef}
          className="control-input tag-field"
          value={draft}
          placeholder={value.length ? '' : 'Figma, React, sotuv…'}
          onChange={(e) => {
            const next = e.target.value
            if (next.includes(',')) add(next)
            else onDraftChange(next)
          }}
          onKeyDown={onKeyDown}
          onBlur={() => {
            add(draft)
            onBlur()
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
        />
      </div>
      {unused.length > 0 && value.length < max && (
        <div className="suggestions">
          {unused.slice(0, 8).map((s) => (
            <button
              key={s}
              type="button"
              className="suggestion"
              onClick={() => add(s)}
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </FieldShell>
  )
}
