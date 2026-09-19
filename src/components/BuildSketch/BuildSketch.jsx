import { useEffect, useRef, useState } from 'react'

/** Медленный цикл: рисуем → держим → стираем */
const CYCLE = '11s'

export default function BuildSketch() {
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
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const sk = (delay) =>
    active
      ? {
        animation: `sketch-draw ${CYCLE} cubic-bezier(0.16, 1, 0.3, 1) infinite`,
        animationDelay: delay,
      }
      : { strokeDashoffset: 1, opacity: 0.2 }

  return (
    <section
      ref={ref}
      className="mt-20 sm:mt-28 pt-16 sm:pt-20 border-t border-white/10"
      aria-hidden
    >
      <style>{`
        @keyframes sketch-draw {
          0%   { stroke-dashoffset: 1; opacity: 0.2; }
          8%   { opacity: 1; }
          42%  { stroke-dashoffset: 0; opacity: 1; }
          68%  { stroke-dashoffset: 0; opacity: 1; }
          88%  { stroke-dashoffset: 1; opacity: 0.15; }
          100% { stroke-dashoffset: 1; opacity: 0.15; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sk-line {
            animation: none !important;
            stroke-dashoffset: 0 !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      <p className="text-xs tracking-[0.25em] uppercase text-accent mb-4">
        От линии к объекту
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-10 max-w-xl">
        Сначала чертёж — потом объём
      </h2>

      <div className="relative w-full border border-white/10 bg-[#0c0c0c] aspect-[2/1] sm:aspect-[21/9] flex items-center justify-center p-6 sm:p-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/*
          Фасад склада + лёгкий правый торец (объём).
          Мало линий, крупные пропорции, без каши.
        */}
        <svg
          viewBox="0 0 560 260"
          className="relative w-full h-full max-h-[300px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. Земля */}
          <path
            className="sk-line"
            pathLength="1"
            d="M 24 220 H 536"
            stroke="#F4F4F0"
            strokeWidth="1.1"
            strokeLinecap="square"
            strokeDasharray="1"
            style={sk('0s')}
          />

          {/* 2. Плита / цоколь фасада */}
          <path
            className="sk-line"
            pathLength="1"
            d="M 48 220 V 208 H 420 V 220"
            stroke="#F4F4F0"
            strokeWidth="1.1"
            strokeDasharray="1"
            style={sk('0.4s')}
          />

          {/* 3. Левая и правая стойки фасада */}
          <path
            className="sk-line"
            pathLength="1"
            d="M 56 208 V 88"
            stroke="#F4F4F0"
            strokeWidth="1.15"
            strokeDasharray="1"
            style={sk('0.9s')}
          />
          <path
            className="sk-line"
            pathLength="1"
            d="M 412 208 V 88"
            stroke="#F4F4F0"
            strokeWidth="1.15"
            strokeDasharray="1"
            style={sk('1.2s')}
          />

          {/* 4. Две колонны внутри */}
          <path
            className="sk-line"
            pathLength="1"
            d="M 174 208 V 88"
            stroke="#F4F4F0"
            strokeWidth="1"
            strokeDasharray="1"
            style={sk('1.5s')}
          />
          <path
            className="sk-line"
            pathLength="1"
            d="M 294 208 V 88"
            stroke="#F4F4F0"
            strokeWidth="1"
            strokeDasharray="1"
            style={sk('1.7s')}
          />

          {/* 5. Верх фасада */}
          <path
            className="sk-line"
            pathLength="1"
            d="M 56 88 H 412"
            stroke="#F4F4F0"
            strokeWidth="1.15"
            strokeDasharray="1"
            style={sk('2s')}
          />

          {/* 6. Боковой объём (торец уходит вправо-вглубь) */}
          <path
            className="sk-line"
            pathLength="1"
            d="M 412 88 L 500 72 L 500 192 L 412 208"
            stroke="#F4F4F0"
            strokeWidth="1.05"
            strokeDasharray="1"
            strokeLinejoin="miter"
            style={sk('2.4s')}
          />
          <path
            className="sk-line"
            pathLength="1"
            d="M 412 88 L 500 72"
            stroke="#F4F4F0"
            strokeWidth="1"
            strokeDasharray="1"
            style={sk('2.6s')}
          />

          {/* 7. Крыша фасада + скат торца (accent) */}
          <path
            className="sk-line"
            pathLength="1"
            d="M 48 88 L 234 48 L 412 88"
            stroke="#FF3B30"
            strokeWidth="1.35"
            strokeDasharray="1"
            strokeLinejoin="miter"
            style={sk('3s')}
          />
          <path
            className="sk-line"
            pathLength="1"
            d="M 412 88 L 500 72"
            stroke="#FF3B30"
            strokeWidth="1.2"
            strokeDasharray="1"
            style={sk('3.3s')}
          />
          <path
            className="sk-line"
            pathLength="1"
            d="M 234 48 L 322 36"
            stroke="#FF3B30"
            strokeWidth="1.1"
            strokeDasharray="1"
            style={sk('3.5s')}
          />
          <path
            className="sk-line"
            pathLength="1"
            d="M 500 72 L 322 36"
            stroke="#FF3B30"
            strokeWidth="1.1"
            strokeDasharray="1"
            style={sk('3.7s')}
          />

          {/* 8. Доки — простые П-проёмы на фасаде */}
          {[78, 158, 238, 318].map((x, i) => (
            <path
              key={x}
              className="sk-line"
              pathLength="1"
              d={`M ${x} 208 V 168 H ${x + 48} V 208`}
              stroke="#F4F4F0"
              strokeWidth="1.05"
              strokeDasharray="1"
              style={sk(`${4.1 + i * 0.25}s`)}
            />
          ))}

          {/* 9. Одна лента остекления */}
          <path
            className="sk-line"
            pathLength="1"
            d="M 72 120 H 396"
            stroke="#F4F4F0"
            strokeWidth="1"
            strokeDasharray="1"
            opacity="0.9"
            style={sk('5.2s')}
          />
        </svg>
      </div>

      <p className="mt-6 text-sm text-gray-500 max-w-md">
        Каркас логистического объёма: плита, пролёты, кровля, доки.
      </p>
    </section>
  )
}