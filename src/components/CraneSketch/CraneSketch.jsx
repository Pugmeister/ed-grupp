import { useEffect, useRef, useState } from 'react'

const CYCLE = '11s'

export default function CraneSketch() {
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
        animation: `crane-draw ${CYCLE} cubic-bezier(0.16, 1, 0.3, 1) infinite`,
        animationDelay: delay,
      }
      : { strokeDashoffset: 1, opacity: 0.2 }

  const sway = active
    ? {
      transformOrigin: '400px 58px',
      animation: 'crane-sway 4s ease-in-out infinite alternate',
    }
    : undefined

  const line = (d, delay, props = {}) => (
    <path
      className="ck-line"
      pathLength="1"
      d={d}
      stroke="#F4F4F0"
      strokeWidth="1.1"
      strokeDasharray="1"
      style={sk(delay)}
      {...props}
    />
  )

  return (
    <section
      ref={ref}
      className="mt-20 sm:mt-28 pt-16 sm:pt-20 border-t border-white/10"
      aria-hidden
    >
      <style>{`
        @keyframes crane-draw {
          0%   { stroke-dashoffset: 1; opacity: 0.2; }
          8%   { opacity: 1; }
          42%  { stroke-dashoffset: 0; opacity: 1; }
          68%  { stroke-dashoffset: 0; opacity: 1; }
          88%  { stroke-dashoffset: 1; opacity: 0.15; }
          100% { stroke-dashoffset: 1; opacity: 0.15; }
        }
        @keyframes crane-sway {
          from { transform: rotate(-1.6deg); }
          to   { transform: rotate(1.6deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ck-line {
            animation: none !important;
            stroke-dashoffset: 0 !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      <p className="text-xs tracking-[0.25em] uppercase text-accent mb-4">
        Первый шаг
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-10 max-w-xl">
        Любой объект начинается с разговора
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

        <svg
          viewBox="0 0 560 260"
          className="relative w-full h-full max-h-[300px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* земля */}
          {line('M 24 220 H 536', '0s')}

          {/* основание башни */}
          {line('M 190 220 V 212 H 234 V 220', '0.4s')}

          {/* мачта */}
          {line('M 200 212 V 50', '0.8s', { strokeWidth: 1.15 })}
          {line('M 224 212 V 50', '1s', { strokeWidth: 1.15 })}

          {/* решётка мачты */}
          {line(
            'M 200 212 L 224 188 L 200 164 L 224 140 L 200 116 L 224 92 L 200 68 L 224 50',
            '1.4s',
            { strokeWidth: 0.9, opacity: 0.8 }
          )}

          {/* оголовок + растяжки (accent) */}
          {line('M 212 50 V 20', '2s', { stroke: '#FF3B30', strokeWidth: 1.3 })}
          {line('M 212 20 L 92 50', '2.3s', { stroke: '#FF3B30', strokeWidth: 1.2 })}
          {line('M 212 20 L 440 50', '2.6s', { stroke: '#FF3B30', strokeWidth: 1.2 })}

          {/* стрела и контрстрела */}
          {line('M 92 50 H 470', '3s', { strokeWidth: 1.2 })}
          {line('M 224 58 H 470', '3.3s', { strokeWidth: 1 })}
          {line(
            'M 224 58 L 252 50 L 280 58 L 308 50 L 336 58 L 364 50 L 392 58 L 420 50 L 448 58 L 470 50',
            '3.6s',
            { strokeWidth: 0.9, opacity: 0.8 }
          )}

          {/* противовес */}
          {line('M 94 50 V 74 H 130 V 50', '4s')}

          {/* тележка, трос, крюк, груз — покачиваются */}
          <g style={sway}>
            {line('M 392 58 H 408 V 64 H 392 Z', '4.3s', { strokeWidth: 1 })}
            {line('M 400 64 V 150', '4.5s', { strokeWidth: 0.9 })}
            {line('M 400 150 L 378 170 M 400 150 L 422 170', '4.8s', {
              strokeWidth: 0.9,
            })}
            {line('M 376 170 H 424 V 200 H 376 Z', '5s', {
              stroke: '#FF3B30',
              strokeWidth: 1.35,
            })}
          </g>

          {/* строящееся здание справа */}
          {line('M 456 220 V 150', '5.4s', { strokeWidth: 1 })}
          {line('M 488 220 V 150', '5.6s', { strokeWidth: 1 })}
          {line('M 520 220 V 150', '5.8s', { strokeWidth: 1 })}
          {line('M 448 190 H 528', '6.1s', { strokeWidth: 1 })}
          {line('M 448 160 H 528', '6.4s', { strokeWidth: 1 })}
        </svg>
      </div>
    </section>
  )
}