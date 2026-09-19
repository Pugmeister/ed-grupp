import { useEffect, useRef, useState } from 'react'

const CYCLE = '12s'

const STAGES = [
  { n: '01', title: 'Концепция', sub: 'Участок, ТЗ, экономика' },
  { n: '02', title: 'Проект', sub: 'Документация и инженерия' },
  { n: '03', title: 'Стройка', sub: 'Каркас, сети, контроль' },
  { n: '04', title: 'Сдача', sub: 'Ввод «под ключ»' },
]

export default function ServiceSketch() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting),
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const lineStyle = active
    ? {
      animation: `svc-line ${CYCLE} cubic-bezier(0.16, 1, 0.3, 1) infinite`,
    }
    : { strokeDashoffset: 1, opacity: 0.25 }

  const nodeStyle = (i) =>
    active
      ? {
        animation: `svc-node ${CYCLE} cubic-bezier(0.16, 1, 0.3, 1) infinite`,
        animationDelay: `${0.35 + i * 0.55}s`,
      }
      : { opacity: 0.25, transform: 'scale(0.6)' }

  const labelStyle = (i) =>
    active
      ? {
        animation: `svc-label ${CYCLE} cubic-bezier(0.16, 1, 0.3, 1) infinite`,
        animationDelay: `${0.45 + i * 0.55}s`,
      }
      : { opacity: 0.3 }

  return (
    <section ref={ref} className="mt-20 sm:mt-28 pt-16 sm:pt-20 border-t border-white/10">
      <style>{`
        @keyframes svc-line {
          0%   { stroke-dashoffset: 1; opacity: 0.3; }
          12%  { opacity: 1; }
          48%  { stroke-dashoffset: 0; opacity: 1; }
          72%  { stroke-dashoffset: 0; opacity: 1; }
          90%  { stroke-dashoffset: 1; opacity: 0.2; }
          100% { stroke-dashoffset: 1; opacity: 0.2; }
        }
        @keyframes svc-node {
          0%, 8%     { opacity: 0.2; transform: scale(0.5); }
          18%, 72%   { opacity: 1; transform: scale(1); }
          88%, 100%  { opacity: 0.2; transform: scale(0.5); }
        }
        @keyframes svc-label {
          0%, 10%    { opacity: 0.25; }
          22%, 72%   { opacity: 1; }
          88%, 100%  { opacity: 0.25; }
        }
        @keyframes svc-dot {
          0%   { offset-distance: 0%; opacity: 0; }
          10%  { opacity: 1; }
          48%  { offset-distance: 100%; opacity: 1; }
          55%  { opacity: 0; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-anim { animation: none !important; opacity: 1 !important; stroke-dashoffset: 0 !important; transform: none !important; }
        }
      `}</style>

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
        {/* фон-сетка */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* линия + узлы */}
        <div className="relative max-w-4xl mx-auto">
          <svg
            viewBox="0 0 800 120"
            className="w-full h-auto mb-2"
            fill="none"
            aria-hidden
          >
            {/* базовая направляющая */}
            <line
              x1="40"
              y1="60"
              x2="760"
              y2="60"
              stroke="#F4F4F0"
              strokeWidth="0.5"
              opacity="0.12"
            />

            {/* рисующаяся линия */}
            <path
              className="svc-anim"
              pathLength="1"
              d="M 40 60 H 760"
              stroke="#F4F4F0"
              strokeWidth="1.25"
              strokeLinecap="square"
              strokeDasharray="1"
              style={lineStyle}
            />

            {/* бегущая точка accent */}
            {active && (
              <circle r="4" fill="#FF3B30" className="svc-anim">
                <animateMotion
                  dur="12s"
                  repeatCount="indefinite"
                  path="M 40 60 H 760"
                  keyPoints="0;0.08;0.48;0.55;1"
                  keyTimes="0;0.1;0.48;0.55;1"
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0;0"
                  keyTimes="0;0.1;0.48;0.55;1"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* узлы на 4 позициях */}
            {[40, 280, 520, 760].map((x, i) => (
              <g key={x} className="svc-anim" style={nodeStyle(i)}>
                <circle
                  cx={x}
                  cy="60"
                  r={i === 3 ? 7 : 5}
                  fill={i === 3 ? '#FF3B30' : '#0c0c0c'}
                  stroke={i === 3 ? '#FF3B30' : '#F4F4F0'}
                  strokeWidth="1.25"
                />
                {i === 3 && (
                  <circle cx={x} cy="60" r="12" fill="none" stroke="#FF3B30" strokeWidth="1" opacity="0.35" />
                )}
              </g>
            ))}
          </svg>

          {/* подписи */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
            {STAGES.map((s, i) => (
              <div
                key={s.n}
                className="svc-anim text-left sm:text-center"
                style={labelStyle(i)}
              >
                <div
                  className={`font-display text-xs tracking-[0.2em] mb-2 ${
                    i === 3 ? 'text-accent' : 'text-gray-500'
                  }`}
                >
                  {s.n}
                </div>
                <div className="font-display text-lg sm:text-xl font-bold text-paper">
                  {s.title}
                </div>
                <p className="mt-1 text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}