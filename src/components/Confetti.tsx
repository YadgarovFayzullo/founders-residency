import { useEffect, useRef } from 'react'

/** Palette only: primary at two weights, plus the two grays. */
const COLORS = [
  'rgb(84, 88, 255)',
  'rgb(84, 88, 255)',
  'rgba(84, 88, 255, 0.5)',
  '#9a9ca4',
  '#e4e5e9',
]

const COUNT = 190
/** Three waves, so the burst keeps replenishing instead of ending at once. */
const WAVE_DELAYS = [0, 34, 74]
const GRAVITY = 0.16
const DRAG = 0.992
/** Frames a piece stays fully opaque before it starts fading out. */
const OPAQUE_FRAMES = 420
const FADE_FRAMES = 200
const MAX_FRAMES = 900

/**
 * One-shot confetti burst, fired when the application is accepted. Draws to a
 * fixed full-screen canvas, then clears itself once every piece has fallen
 * past the bottom edge. Skipped entirely under reduced-motion.
 */
export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = canvas.clientWidth
    let height = canvas.clientHeight

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const originX = width / 2
    const originY = height * 0.36

    const pieces = Array.from({ length: COUNT }, (_, index) => {
      const angle = Math.random() * Math.PI * 2
      const speed = 4 + Math.random() * 9
      return {
        delay: WAVE_DELAYS[index % WAVE_DELAYS.length],
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        // Biased upward so the burst rises before it rains down.
        vy: Math.sin(angle) * speed - 6,
        size: 5 + Math.random() * 7,
        ratio: 0.3 + Math.random() * 0.7,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.26,
        // Each piece drifts on its own phase, so the fall never looks uniform.
        wobble: Math.random() * Math.PI * 2,
        wobbleRate: 0.02 + Math.random() * 0.03,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }
    })

    let frame = 0
    let raf = requestAnimationFrame(function tick() {
      frame += 1
      ctx.clearRect(0, 0, width, height)

      let alive = false
      for (const piece of pieces) {
        if (frame < piece.delay) {
          alive = true
          continue
        }

        const life = frame - piece.delay

        piece.vy += GRAVITY
        piece.vx *= DRAG
        piece.vy *= DRAG
        piece.wobble += piece.wobbleRate
        piece.x += piece.vx + Math.sin(piece.wobble) * 0.7
        piece.y += piece.vy
        piece.rotation += piece.spin

        const alpha =
          life <= OPAQUE_FRAMES
            ? 1
            : Math.max(0, 1 - (life - OPAQUE_FRAMES) / FADE_FRAMES)

        if (piece.y > height + 40 || alpha === 0) continue
        alive = true

        ctx.save()
        ctx.translate(piece.x, piece.y)
        ctx.rotate(piece.rotation)
        ctx.globalAlpha = alpha
        ctx.fillStyle = piece.color
        ctx.fillRect(
          -piece.size / 2,
          (-piece.size * piece.ratio) / 2,
          piece.size,
          piece.size * piece.ratio,
        )
        ctx.restore()
      }

      if (alive && frame < MAX_FRAMES) {
        raf = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, width, height)
      }
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="confetti" aria-hidden="true" />
}
