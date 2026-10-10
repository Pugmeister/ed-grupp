import { useEffect, useRef, useState } from 'react'

const CYCLE_MS = 11000
const DRAW_MS = 7500
const HOLD_MS = 2000

const TARGET_AREA = 2 // млн м²

const N = 20
const BASE_Y = 200
const BAR_W = 22
const GAP = 12
const X0 = 60

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

const bars = Array.from({ length: N }, (_, i) => ({
  x: X0 + i * (BAR_W + GAP),
  max: 22 + 150 * Math.pow(i / (N - 1), 1.7),
}))

export default function GrowthSketch() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(0)
  const startRef = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMq = () => setReduced(mq.matches)
    syncMq()
    mq.addEventListener?.('change', syncMq)

    const el = ref.current
    if (!el) return () => mq.removeEventListener?.('change', syncMq)

    if (mq.matches) {
      setInView(true)
      setProgress(1)
      return () => mq.removeEventListener?.('change', syncMq)
    }

    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      mq.removeEventListener?.('change', syncMq)
    }
  }, [])

  useEffect(() => {
    if (!inView || reduced) return

    const tick = (now) => {
      if (!startRef.current) startRef.current = now
      const t = (now - startRef.current) % CYCLE_MS

      let p = 0
      if (t < DRAW_MS) {
        const x = t / DRAW_MS
        p = 1 - (1 - x) * (1 - x)
      } else if (t < DRAW_MS + HOLD_MS) {
        p = 1
      }
      setProgress(p)
      rafRef.current = requestAnimationFrame(tick)
    }

    startRef.current = 0
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, reduced])

  const done = progress >= 0.995
  const years = Math.round(20 * progress)
  const area = (done ? TARGET_AREA : TARGET_AREA * progress).toFixed(1)

  return (
    <section
      ref={ref}
      className="mt-20 sm:mt-28 pt-16 sm:pt-20 border-t border-white/10"
      aria-hidden
    >
      <p className="text-xs tracking-[0.25em] uppercase text-accent mb-4">
        Год за годом
      </p>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
        Опыт, который можно посчитать
      </h2>
      <p className="text-gray-400 text-sm sm:text-base max-w-lg mb-12 leading-relaxed">
        Каждый год — новые площадки. Вместе они складываются в миллионы
        квадратных метров.
      </p>

      <div className="relative border border-white/10 bg-[#0c0c0c] px-4 sm:px-10 py-10 sm:py-14 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="flex justify-between sm:justify-start sm:gap-16 mb-6">
            <div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-accent tabular-nums">
                {years}
                {done ? '+' : ''}
              </div>
              <div className="mt-1 text-xs tracking-wider uppercase text-gray-500">
                лет на рынке
              </div>
            </div>
            <div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-paper tabular-nums">
                {area}
                {done ? '+' : ''}
              </div>
              <div className="mt-1 text-xs tracking-wider uppercase text-gray-500">
                млн м² построено
              </div>
            </div>
          </div>

          <svg viewBox="0 0 800 220" className="w-full h-auto" fill="none">
            <line
              x1="40"
              y1={BASE_Y}
              x2="760"
              y2={BASE_Y}
              stroke="#F4F4F0"
              strokeWidth="1.25"
              opacity="0.25"
            />

            {bars.map((b, i) => {
              const q = clamp((progress - i * 0.035) / 0.25)
              const h = b.max * q
              if (h < 0.5) return null
              const hot = i >= N - 3
              return (
                <g key={i}>
                  <rect
                    x={b.x}
                    y={BASE_Y - h}
                    width={BAR_W}
                    height={h}
                    stroke={hot ? '#FF3B30' : '#F4F4F0'}
                    strokeWidth="1.1"
                    opacity={hot ? 1 : 0.55}
                    fill={hot ? 'rgba(255,59,48,0.08)' : 'none'}
                  />
                  {/* «этажи» */}
                  {h > 50 &&
                    [0.33, 0.66].map((k) => (
                      <line
                        key={k}
                        x1={b.x}
                        x2={b.x + BAR_W}
                        y1={BASE_Y - h * k}
                        y2={BASE_Y - h * k}
                        stroke={hot ? '#FF3B30' : '#F4F4F0'}
                        strokeWidth="0.8"
                        opacity="0.25"
                      />
                    ))}
                </g>
              )
            })}
          </svg>

          <div className="mt-3 flex justify-between text-xs tracking-wider uppercase text-gray-500">
            <span>Начало</span>
            <span>10 лет</span>
            <span>Сегодня</span>
          </div>
        </div>
      </div>
    </section>
  )
}