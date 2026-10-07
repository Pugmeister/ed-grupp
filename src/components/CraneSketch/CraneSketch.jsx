import { useEffect, useRef, useState } from 'react'

/** Длинный цикл: успевает нарисоваться целиком, потом стирается */
const CYCLE = '24s'

const RED = '#FF3B30'

export default function NegotiationSketch() {
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
        animation: `talk-draw ${CYCLE} cubic-bezier(0.16, 1, 0.3, 1) infinite`,
        animationDelay: delay,
      }
      : { strokeDashoffset: 1, opacity: 0.2 }

  const line = (d, delay, props = {}) => (
    <path
      className="tk-line"
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
        @keyframes talk-draw {
          0%    { stroke-dashoffset: 1; opacity: 0.2; }
          2%    { opacity: 1; }
          12.5% { stroke-dashoffset: 0; opacity: 1; }
          71%   { stroke-dashoffset: 0; opacity: 1; }
          83%   { stroke-dashoffset: 1; opacity: 0.15; }
          100%  { stroke-dashoffset: 1; opacity: 0.15; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tk-line {
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
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* пол */}
          {line('M 24 220 H 536', '0s')}

          {/* стол: столешница + ножки */}
          {line('M 180 150 H 380 V 158 H 180 Z', '0.4s', { strokeWidth: 1.2 })}
          {line('M 206 158 V 220 M 354 158 V 220', '0.7s')}

          {/* стулья */}
          {line('M 132 170 H 168 M 132 170 V 120 M 138 170 V 220 M 164 170 V 220', '1s', {
            strokeWidth: 1,
            opacity: 0.7,
          })}
          {line('M 428 170 H 392 M 428 170 V 120 M 422 170 V 220 M 396 170 V 220', '1.2s', {
            strokeWidth: 1,
            opacity: 0.7,
          })}

          {/* окно со стройкой города */}
          {line('M 200 36 H 360 V 112 H 200 Z M 280 36 V 112', '1.5s', {
            strokeWidth: 1.2,
          })}
          {line(
            'M 208 112 V 90 H 228 V 112 M 236 112 V 66 H 258 V 112 M 300 112 V 80 H 326 V 112 M 334 112 V 96 H 352 V 112',
            '1.9s',
            { strokeWidth: 0.9, opacity: 0.7 }
          )}

          {/* левый участник: тело, руки, ноги */}
          {line(
            'M 150 116 V 170 H 185 V 220 H 200 M 150 128 L 172 150 L 196 147',
            '2.4s',
            { strokeWidth: 1.2 }
          )}
          {/* голова */}
          {line('M 134 100 a 16 16 0 1 0 32 0 a 16 16 0 1 0 -32 0', '2.8s', {
            strokeWidth: 1.2,
          })}
          {/* каска (accent) */}
          {line('M 134 98 A 16 16 0 0 1 166 98 M 129 98 H 171', '3.1s', {
            stroke: RED,
            strokeWidth: 1.4,
          })}

          {/* правый участник */}
          {line(
            'M 410 116 V 170 H 375 V 220 H 360 M 410 128 L 388 150 L 364 147',
            '3.4s',
            { strokeWidth: 1.2 }
          )}
          {line('M 394 100 a 16 16 0 1 0 32 0 a 16 16 0 1 0 -32 0', '3.8s', {
            strokeWidth: 1.2,
          })}

          {/* чертёж на столе (accent) */}
          {line('M 226 150 L 246 138 H 334 L 314 150', '4.4s', {
            stroke: RED,
            strokeWidth: 1.35,
          })}
          {line('M 256 146 H 304 M 268 142 H 316', '4.8s', {
            stroke: RED,
            strokeWidth: 0.8,
            opacity: 0.7,
          })}

          {/* чашки */}
          {line('M 212 150 V 142 H 222 V 150', '5.1s', { strokeWidth: 1 })}
          {line('M 338 150 V 142 H 348 V 150', '5.3s', { strokeWidth: 1 })}

          {/* реплика слева */}
          {line(
            'M 108 38 H 152 Q 160 38 160 46 V 58 Q 160 66 152 66 H 144 L 138 76 L 134 66 H 108 Q 100 66 100 58 V 46 Q 100 38 108 38 Z',
            '5.7s',
            { strokeWidth: 1 }
          )}
          {line('M 118 52 h0.1 M 130 52 h0.1 M 142 52 h0.1', '6.2s', {
            strokeWidth: 3,
          })}

          {/* ответ справа (accent) */}
          {line(
            'M 452 38 H 408 Q 400 38 400 46 V 58 Q 400 66 408 66 H 416 L 422 76 L 426 66 H 452 Q 460 66 460 58 V 46 Q 460 38 452 38 Z',
            '6.7s',
            { stroke: RED, strokeWidth: 1.1 }
          )}
          {line('M 418 52 h0.1 M 430 52 h0.1 M 442 52 h0.1', '7.2s', {
            stroke: RED,
            strokeWidth: 3,
          })}
        </svg>
      </div>
    </section>
  )
}