import { useEffect, useState } from 'react'
import { DEADLINE } from '../lib/form'

function remaining(to: Date) {
  const ms = Math.max(0, to.getTime() - Date.now())
  return {
    expired: ms === 0,
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Live countdown to the application deadline, shown under the submit button. */
export function Countdown() {
  const [time, setTime] = useState(() => remaining(DEADLINE))

  useEffect(() => {
    const id = setInterval(() => setTime(remaining(DEADLINE)), 1000)
    return () => clearInterval(id)
  }, [])

  if (time.expired) {
    return (
      <p className="countdown-closed">Bu oqim uchun ariza qabuli yakunlandi.</p>
    )
  }

  const units = [
    { value: time.days, label: 'kun' },
    { value: time.hours, label: 'soat' },
    { value: time.minutes, label: 'daqiqa' },
    { value: time.seconds, label: 'soniya' },
  ]

  return (
    <div className="countdown">
      <span className="countdown-label">Ariza qabuli yopilishiga</span>
      <div
        className="countdown-units"
        role="timer"
        aria-live="off"
        aria-label={`Ariza qabuli yopilishiga ${time.days} kun ${time.hours} soat qoldi`}
      >
        {units.map((unit) => (
          <div className="countdown-unit" key={unit.label}>
            <span className="countdown-value">{pad(unit.value)}</span>
            <span className="countdown-unit-label">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
