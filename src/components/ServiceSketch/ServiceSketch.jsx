import { useEffect, useRef, useState } from 'react'

const STAGES = [
  { n: '01', title: 'Концепция', sub: 'Участок, ТЗ, экономика' },
  { n: '02', title: 'Проект', sub: 'Документация и инженерия' },
  { n: '03', title: 'Стройка', sub: 'Каркас, сети, контроль' },
  { n: '04', title: 'Сдача', sub: 'Ввод «под ключ»' },
]

/** доли пути, где стоят узлы (0…1) */
const STOPS = [0, 1 / 3, 2 / 3, 1]

const CYCLE_MS = 11000
const DRAW_MS = 7500   // линия идёт
const HOLD_MS = 2000   // пауза на финише
// остаток — сброс / пауза перед повтором

export default function ServiceSketch() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [progress, setProgress] = useState(0) // 0…1 линия
  const [activeStage, setActiveStage] = useState(0)
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
      setActiveStage(3)
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
        // ease-out линия
        const x = t / DRAW_MS
        p = 1 - (1 - x) * (1 - x)
      } else if (t < DRAW_MS + HOLD_MS) {
        p = 1
      } else {
        p = 0
      }

      setProgress(p)

      // активный этап = последний достигнутый стоп
      let stage = 0
      for (let i = 0; i < STOPS.length; i++) {
        if (p + 0.001 >= STOPS[i]) stage = i
      }
      // на сбросе — ничего не подсвечиваем ярко
      if (t >= DRAW_MS + HOLD_MS) stage = -1
      setActiveStage(stage)

      rafRef.current = requestAnimationFrame(tick)
    }

    startRef.current = 0
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, reduced])

  const xAt = (p) => 40 + p * 720

  return (
    <section
      ref={ref}
      className="mt-20 sm:mt-28 pt-16 sm:pt-20 border-t border-white/10"
    >
      <p className="text-xs tracking-[0.25em] uppercase text-accent mb-4">
        Полный цикл
      </p>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
        От техзадания — до ключей
      </h2>
      <p className="text-gray-400 text-sm sm:text-base max-w-lg mb-12 leading-relaxed">
        Четыре этапа, одна команда. Линия не обрывается на стыке подрядчиков.
      </p>

      <div className="relative border border-white/10 bg-[#0c0c0c] px-4 sm:px-10 py-12 sm:py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          <svg
            viewBox="0 0 800 120"
            className="w-full h-auto mb-2"
            fill="none"
            aria-hidden
          >
            {/* серая база */}
            <line
              x1="40"
              y1="60"
              x2="760"
              y2="60"
              stroke="#F4F4F0"
              strokeWidth="1.25"
              opacity="0.15"
            />

            {/* красный прогресс */}
            <line
              x1="40"
              y1="60"
              x2={xAt(progress)}
              y2="60"
              stroke="#FF3B30"
              strokeWidth="1.5"
              strokeLinecap="square"
            />

            {/* точка на конце */}
            {progress > 0.01 && progress < 0.995 && (
              <circle
                cx={xAt(progress)}
                cy="60"
                r="4"
                fill="#FF3B30"
              />
            )}

            {/* узлы */}
            {STOPS.map((stop, i) => {
              const reached = progress >= stop - 0.001
              const isActive = activeStage === i
              return (
                <g key={i}>
                  <circle
                    cx={xAt(stop)}
                    cy="60"
                    r={isActive ? 7 : 5}
                    fill={reached ? '#FF3B30' : '#0c0c0c'}
                    stroke={reached ? '#FF3B30' : '#F4F4F0'}
                    strokeWidth="1.25"
                    className="transition-[r,fill,stroke] duration-300"
                  />
                  {isActive && (
                    <circle
                      cx={xAt(stop)}
                      cy="60"
                      r="14"
                      fill="none"
                      stroke="#FF3B30"
                      strokeWidth="1"
                      opacity="0.4"
                    />
                  )}
                </g>
              )
            })}
          </svg>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
            {STAGES.map((stage, i) => {
              const on = activeStage === i
              const done = activeStage > i || (reduced && true)
              return (
                <div
                  key={stage.n}
                  className={`text-left sm:text-center transition-all duration-300 ${
                    on
                      ? 'opacity-100 translate-y-0'
                      : done
                        ? 'opacity-70'
                        : 'opacity-35'
                  }`}
                >
                  <div
                    className={`font-display text-xs tracking-[0.2em] mb-2 ${
                      on || done ? 'text-accent' : 'text-gray-500'
                    }`}
                  >
                    {stage.n}
                  </div>
                  <div
                    className={`font-display text-lg sm:text-xl font-bold ${
                      on ? 'text-paper' : 'text-gray-400'
                    }`}
                  >
                    {stage.title}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {stage.sub}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}