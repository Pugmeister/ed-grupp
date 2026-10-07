import { useEffect, useRef, useState } from 'react'

/** Длинный цикл: успевает нарисоваться целиком, потом стирается */
const CYCLE = '24s'

const RED = '#FF3B30'
const BG = '#0c0c0c'

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
        // пока идёт задержка — линия скрыта, а не показана целиком
        animationFillMode: 'backwards',
      }
      : { strokeDashoffset: 1, opacity: 0.2 }

  const line = (d, delay, props = {}) => (
    <path
      className="tk-line"
      pathLength="1"
      d={d}
      stroke="#F4F4F0"
      strokeWidth="1.6"
      strokeDasharray="1"
      fill="none"
      style={sk(delay)}
      {...props}
    />
  )

  /**
   * Человек, сидящий лицом вправо. Рисуется в «левой» системе координат;
   * правого участника получаем зеркалированием группы.
   * kind: 'builder' (каска, жилет) | 'client' (причёска, очки)
   */
  const person = (kind, t0) => {
    const d = (n) => `${(t0 + n).toFixed(1)}s`
    return (
      <>
        {/* стул */}
        {line(
          'M 192 304 L 184 192 H 198 M 190 304 H 276 V 310 H 190 Z M 198 310 V 360 M 268 310 V 360',
          d(0),
          { strokeWidth: 1.2, opacity: 0.7 }
        )}

        {/* ноги и ботинок */}
        {line(
          'M 214 302 H 336 Q 348 302 348 314 V 346 H 322 V 326 H 214',
          d(0.3),
          { fill: BG }
        )}
        {line('M 318 346 H 352 Q 364 348 364 356 V 360 H 318 Z', d(0.45), {
          fill: BG,
        })}

        {/* корпус */}
        {line(
          'M 214 304 L 218 224 Q 220 200 246 198 Q 272 198 274 226 L 272 304',
          d(0.7),
          { fill: BG }
        )}

        {/* детали одежды */}
        {line('M 234 199 L 246 212 L 260 199', d(1), { strokeWidth: 1.2 })}
        {kind === 'builder'
          ? line('M 217 262 H 273 M 216 278 H 274', d(1.1), {
            stroke: RED,
            strokeWidth: 1.8,
          })
          : line('M 215 298 H 272 M 262 272 h0.1 M 262 286 h0.1', d(1.1), {
            strokeWidth: 1.4,
          })}

        {/* шея */}
        {line('M 238 174 V 199 M 256 174 V 199', d(1.2), { strokeWidth: 1.3 })}

        {/* голова в профиль */}
        {line(
          'M 224 150 C 224 128 238 120 250 120 C 266 120 274 132 274 146 L 280 156 L 274 158 L 274 166 C 272 176 262 182 250 182 C 234 182 224 170 224 150 Z',
          d(1.4),
          { fill: BG, strokeWidth: 1.7 }
        )}
        {line('M 262 141 H 271 M 266 169 H 273 M 238 148 Q 232 155 238 162', d(1.7), {
          strokeWidth: 1.2,
        })}
        {line('M 266 149 h0.1', d(1.8), { strokeWidth: 3.2 })}

        {/* каска / причёска + очки */}
        {kind === 'builder'
          ? line(
            'M 220 138 C 220 106 242 96 252 96 C 270 96 282 108 282 138 Z M 252 96 V 138 M 212 138 H 296',
            d(2),
            { stroke: RED, strokeWidth: 2, fill: BG }
          )
          : (
            <>
              {line(
                'M 222 144 C 216 116 236 106 252 108 C 268 108 280 120 274 138 C 266 126 250 124 240 126 C 232 128 228 136 226 148 Z',
                d(2),
                { fill: BG }
              )}
              {line('M 258 144 H 272 V 154 H 258 Z M 258 148 L 240 146', d(2.2), {
                strokeWidth: 1.1,
              })}
            </>
          )}

        {/* рука в рукаве */}
        {line('M 253 205 L 310 237 L 370 223 L 374 241 L 306 255 L 243 223 Z', d(2.4), {
          fill: BG,
          strokeWidth: 1.7,
        })}
        {line('M 361 225 L 365 243', d(2.8), { strokeWidth: 1.3 })}
      </>
    )
  }

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

      <div className="relative w-full border border-white/10 bg-[#0c0c0c] aspect-[2/1] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <svg
          viewBox="0 0 800 400"
          className="relative w-full h-full p-2 sm:p-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* пол */}
          {line('M 60 360 H 740', '0s')}
          {line('M 150 374 H 650', '0.2s', { strokeWidth: 1.1, opacity: 0.3 })}

          {/* окно со стройкой */}
          {line('M 310 44 H 490 V 204 H 310 Z M 300 204 H 500', '0.4s', {
            strokeWidth: 1.7,
          })}
          {line(
            'M 316 204 V 148 H 352 V 204 M 400 204 V 132 H 440 V 204 M 452 204 V 164 H 484 V 204 M 322 160 H 346 M 322 172 H 346 M 322 184 H 346 M 410 144 H 430 M 410 156 H 430 M 410 168 H 430 M 410 180 H 430 M 460 176 H 478 M 460 188 H 478',
            '0.8s',
            { strokeWidth: 1.1, opacity: 0.6 }
          )}
          {/* башенный кран за окном (accent) */}
          {line(
            'M 372 204 V 72 M 380 204 V 72 M 372 204 L 380 192 L 372 180 L 380 168 L 372 156 L 380 144 L 372 132 L 380 120 L 372 108 L 380 96 L 372 84 L 380 72',
            '1.1s',
            { stroke: RED, strokeWidth: 1.2 }
          )}
          {line(
            'M 322 72 H 470 M 376 72 V 56 M 376 56 L 330 72 M 376 56 L 460 72 M 324 72 V 84 H 340 V 72 M 450 72 V 118 M 442 118 H 458 V 126 H 442 Z',
            '1.4s',
            { stroke: RED, strokeWidth: 1.4 }
          )}

          {/* левый участник — подрядчик */}
          {person('builder', 1.8)}

          {/* правый участник — заказчик (зеркало) */}
          <g transform="translate(800 0) scale(-1 1)">{person('client', 3.6)}</g>

          {/* стол: столешница и тумба */}
          {line('M 270 262 H 530 V 274 H 270 Z', '5.6s', {
            fill: BG,
            strokeWidth: 1.8,
          })}
          {line('M 296 274 V 358 H 504 V 274', '5.9s', { fill: BG })}
          {line('M 318 292 H 482 V 340 H 318 Z', '6.2s', {
            strokeWidth: 1.1,
            opacity: 0.3,
          })}

          {/* чашки */}
          {line('M 278 262 V 249 H 290 V 262 M 290 252 q 6 0 0 8', '6.4s', {
            strokeWidth: 1.2,
          })}
          {line('M 522 262 V 249 H 510 V 262 M 510 252 q -6 0 0 8', '6.5s', {
            strokeWidth: 1.2,
          })}

          {/* чертёж на столе (accent) */}
          {line('M 326 262 L 346 250 H 454 L 474 262', '6.8s', {
            stroke: RED,
            strokeWidth: 1.9,
          })}
          {line(
            'M 346 256 H 454 M 360 262 L 368 250 M 400 262 V 250 M 440 262 L 432 250',
            '7.1s',
            { stroke: RED, strokeWidth: 1, opacity: 0.6 }
          )}

          {/* рукопожатие */}
          {line(
            'M 370 223 C 380 215 392 213 400 216 C 408 213 420 215 430 223 M 374 241 C 386 251 394 251 400 248 C 408 251 416 251 426 241',
            '7.6s',
            { strokeWidth: 1.8 }
          )}
          {line(
            'M 405 219 V 238 M 411 218 V 240 M 417 219 V 239 M 384 224 Q 398 236 410 228',
            '8.2s',
            { strokeWidth: 1.2 }
          )}
        </svg>
      </div>
    </section>
  )
}