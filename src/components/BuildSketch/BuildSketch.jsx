import { useEffect, useRef, useState } from 'react'

/** Медленный цикл: рисуем → держим → стираем */
const CYCLE = '24s'

const f = (n) => Math.round(n * 10) / 10

/** Перспектива: кровля уходит вниз вправо, цоколь — вверх вправо */
const roofY = (x) => 300 + (x - 315) * 0.0372
const baseY = (x) => (x <= 660 ? 650 : 650 - (x - 660) * 0.136)
const dockTopY = (x) => 537 - (x - 745) * 0.064

/** Вертикальные швы панелей фасада (шаг сужается с глубиной) */
const SEAMS = [
  752, 838, 915, 988, 1052, 1113, 1172, 1228, 1280, 1324, 1368, 1408, 1448,
  1485, 1520, 1550, 1578,
]
const SEAMS_PATH = SEAMS.map(
  (x) => `M ${x} ${f(roofY(x))} V ${f(dockTopY(x))}`
).join(' ')

/** Лента окон: две линии + вертикальные переплёты */
function ribbon(yAt) {
  let d = `M 665 ${f(yAt(665))} L 1560 ${f(yAt(1560))} M 665 ${f(
    yAt(665) + 14
  )} L 1560 ${f(yAt(1560) + 14)}`
  let x = 680
  while (x < 1560) {
    d += ` M ${f(x)} ${f(yAt(x))} V ${f(yAt(x) + 14)}`
    x += 32 - (x - 680) * 0.0085
  }
  return d
}
const RIBBON_1 = ribbon(() => 389)
const RIBBON_2 = ribbon((x) => 482 - (x - 665) * 0.0268)

/** Доки: ворота с обрамлением, размер уменьшается с глубиной */
const DOCK_X = [795, 870, 945, 1018, 1083, 1145, 1203, 1255, 1303, 1346, 1388]
const DOCKS = DOCK_X.map((x) => {
  const w = 56 - (x - 795) * 0.052
  const h = 58 - (x - 795) * 0.045
  const yb = baseY(x) - 14
  const yt = yb - h
  return `M ${f(x)} ${f(yb)} V ${f(yt)} H ${f(x + w)} V ${f(yb)} M ${f(
    x - 6
  )} ${f(yb + 8)} V ${f(yt - 8)} H ${f(x + w + 6)} V ${f(yb + 8)}`
})

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

  const line = (key, d, delay, props = {}) => (
    <path
      key={key}
      className="sk-line"
      pathLength="1"
      d={d}
      stroke="#F4F4F0"
      strokeWidth="2.2"
      strokeDasharray="1"
      style={sk(delay)}
      {...props}
    />
  )

  const RED = '#FF3B30'

  return (
    <section
      ref={ref}
      className="mt-20 sm:mt-28 pt-16 sm:pt-20 border-t border-white/10"
      aria-hidden
    >
      <style>{`
        @keyframes sketch-draw {
          0%    { stroke-dashoffset: 1; opacity: 0.2; }
          2%    { opacity: 1; }
          12.5% { stroke-dashoffset: 0; opacity: 1; }
          71%   { stroke-dashoffset: 0; opacity: 1; }
          83%   { stroke-dashoffset: 1; opacity: 0.15; }
          100%  { stroke-dashoffset: 1; opacity: 0.15; }
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

      <div className="relative w-full border border-white/10 bg-[#0c0c0c] aspect-[1650/773] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/*
          Координаты — в системе исходного эскиза (1650×773),
          поэтому пропорции совпадают с картинкой клиента.
        */}
        <svg
          viewBox="0 0 1650 773"
          className="relative w-full h-full p-2 sm:p-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. Земля: цоколь, бордюр */}
          {line('base', 'M 275 652 H 660 L 1410 548', '0s')}
          {line('curb', 'M 312 682 L 356 718', '0.2s', { strokeWidth: 1.6 })}

          {/* 2. Торец слева */}
          {line('end', 'M 315 300 L 75 358 V 480', '0.4s')}

          {/* 3. Башня лестничной клетки (accent) */}
          {line('tower', 'M 492 300 V 249 L 556 237 H 662 V 316', '0.8s', {
            stroke: RED,
            strokeWidth: 2.4,
          })}
          {line('tower-v', 'M 556 237 V 650 M 660 242 V 650', '1s', {
            strokeWidth: 1.9,
          })}

          {/* 4. Кровельная линия фасада (accent) + правый торец */}
          {line('roof', 'M 315 300 L 1580 347', '1.2s', {
            stroke: RED,
            strokeWidth: 2.6,
          })}
          {line('right-edge', 'M 1580 347 V 472', '1.6s')}

          {/* 5. Стеклянный офисный блок (accent) */}
          {line('glass', 'M 240 360 H 560 V 548 H 240 Z', '1.6s', {
            stroke: RED,
            strokeWidth: 2.4,
          })}
          {line(
            'glass-grid',
            'M 240 430 H 560 M 318 360 V 548 M 440 360 V 548 M 240 392 H 560 M 240 470 H 560',
            '2s',
            { strokeWidth: 1.4, opacity: 0.6 }
          )}

          {/* 6. Швы панелей и стены офисного крыла */}
          {line(
            'wing',
            'M 315 300 V 360 M 442 306 V 360 M 315 548 V 650 M 440 548 V 650',
            '2.2s',
            { strokeWidth: 1.6 }
          )}
          {line('seams', SEAMS_PATH, '2.5s', { strokeWidth: 1.3, opacity: 0.55 })}

          {/* 7. Две ленты окон */}
          {line('ribbon-1', RIBBON_1, '3s', { strokeWidth: 1.5 })}
          {line('ribbon-2', RIBBON_2, '3.4s', { strokeWidth: 1.5 })}

          {/* 8. Цокольная полоса под доками */}
          {line('dock-band', 'M 745 537 L 1410 494 M 745 537 V 640', '3.8s', {
            strokeWidth: 1.8,
          })}

          {/* 9. Доки */}
          {DOCKS.map((d, i) =>
            line(`dock-${i}`, d, `${4.1 + i * 0.2}s`, { strokeWidth: 1.7 })
          )}

          {/* 10. Навес справа (accent) */}
          {line('canopy-r', 'M 1405 488 L 1632 474 V 487 L 1410 502 Z', '6.2s', {
            stroke: RED,
            strokeWidth: 2.2,
          })}
          {line(
            'canopy-r-posts',
            'M 1414 502 V 550 M 1628 487 V 534 M 1410 550 L 1630 536 M 1500 500 V 536 H 1530 V 497',
            '6.5s',
            { strokeWidth: 1.6 }
          )}

          {/* 11. Навес и ступени слева */}
          {line('canopy-l', 'M 115 506 L 152 492 H 240 V 508 H 118 Z', '6.7s', {
            strokeWidth: 1.8,
          })}
          {line(
            'canopy-l-posts',
            'M 125 512 V 632 M 180 512 V 640 M 192 632 H 240 V 656 H 192 Z M 192 640 H 240 M 192 648 H 240',
            '7s',
            { strokeWidth: 1.5 }
          )}

          {/* 12. Входная группа и мелкие окна */}
          {line(
            'entry',
            'M 620 385 V 580 M 646 385 V 580 M 668 640 V 578 H 696 V 640 M 612 612 H 716 V 645 M 570 628 L 606 665 H 640',
            '7.3s',
            { strokeWidth: 1.5 }
          )}
          {line(
            'small-windows',
            'M 569 388 H 592 V 404 H 569 Z M 569 485 H 592 V 501 H 569 Z M 335 603 H 358 V 618 H 335 Z M 398 600 H 422 V 616 H 398 Z M 457 597 H 480 V 613 H 457 Z M 514 595 H 538 V 611 H 514 Z',
            '7.6s',
            { strokeWidth: 1.4 }
          )}
        </svg>
      </div>

      <p className="mt-6 text-sm text-gray-500 max-w-md">
        Логистический комплекс класса А: офисный блок, остекление, ряд доков.
      </p>
    </section>
  )
}