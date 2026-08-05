import { useEffect, useRef, useState } from 'react'
import { DEADLINE_LABEL } from '../lib/form'

/** §5.2 — the founder selection funnel. */
const STEPS = [
  { title: 'Ariza', text: `${DEADLINE_LABEL}gacha ochiq` },
  { title: 'Asoschi sinovi', text: '7 kunlik amaliy topshiriq' },
  { title: 'Suhbat', text: 'Motivatsiya, halollik, oʻrganish' },
  { title: 'Baholash', text: '100 balldan minimal 75' },
  { title: 'Majburiyat', text: 'Shartnoma va kogortaga qoʻshilish' },
]

const DWELL_MS = 1900

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * The timeline walks itself stage by stage once it scrolls into view, so the
 * order of the process reads at a glance. Purely decorative — the animation
 * carries no state a screen reader needs.
 */
export function Steps() {
  // With reduced motion the timeline simply renders fully walked.
  const [active, setActive] = useState(() =>
    prefersReducedMotion() ? STEPS.length - 1 : -1,
  )
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const node = ref.current
    if (!node) return

    let timer: number | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || timer) return
        setActive(0)
        timer = window.setInterval(
          () => setActive((index) => (index + 1) % STEPS.length),
          DWELL_MS,
        )
      },
      { threshold: 0.35 },
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      if (timer) clearInterval(timer)
    }
  }, [])

  return (
    <section className="steps" id="jarayon" aria-label="Qabul jarayoni" ref={ref}>
      <div className="steps-head">
        <span className="steps-eyebrow">Qabul jarayoni</span>
        <h2 className="steps-title">
          Biz avval <span className="accent">asoschini</span> tanlaymiz
        </h2>
        <p className="steps-lead">
          Startup Garage startapni baholashdan oldin asoschini baholaydi.
          Taqdimot sifati emas — harakat sinovdan oʻtadi.
        </p>
      </div>
      <ol className="steps-list">
        {STEPS.map((step, index) => {
          const state =
            index < active ? ' is-done' : index === active ? ' is-active' : ''
          return (
            <li className={`step${state}`} key={step.title}>
              <span className="step-dot" aria-hidden="true">
                {index + 1}
              </span>
              <span className="step-title">{step.title}</span>
              <span className="step-text">{step.text}</span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
