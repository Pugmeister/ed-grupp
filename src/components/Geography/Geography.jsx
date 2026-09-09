import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { regions } from '../../data/regions'
import { getProjectBySlug } from '../../data/projects'

export default function Geography() {
  const [activeId, setActiveId] = useState(regions[0].id)
  const mapGroupRef = useRef(null)
  const active = regions.find((r) => r.id === activeId)
  const activeProject = active ? getProjectBySlug(active.projectSlug) : null

  // Анимация «перелёта» камеры
  useEffect(() => {
    if (!mapGroupRef.current || !active) return

    const { x, y } = active.coords
    // Центр viewBox 500, 300. Сдвигаем так, чтобы точка оказалась ближе к центру + лёгкий zoom
    const targetX = 500 - x
    const targetY = 300 - y
    const scale = 1.35

    mapGroupRef.current.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
    mapGroupRef.current.style.transformOrigin = 'center center'
    mapGroupRef.current.style.transform = `translate(${targetX * 0.25}px, ${targetY * 0.25}px) scale(${scale})`
  }, [activeId, active])

  const handleSelect = (id) => {
    setActiveId(id)
  }

  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6 md:px-12 bg-ink overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-12 sm:mb-16">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            ГЕОГРАФИЯ
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl">
            Наши проекты находятся в 7 регионах России
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ===== Левая колонка — плитки ===== */}
          <div className="lg:col-span-5 space-y-3">
            {regions.map((region) => {
              const isActive = region.id === activeId
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => handleSelect(region.id)}
                  className={`w-full text-left p-5 sm:p-6 border transition-all duration-300 interactive-hover ${
                    isActive
                      ? 'border-accent bg-accent/10'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="font-display text-xl sm:text-2xl font-bold text-paper block">
                        {region.name}
                      </span>
                      {isActive && (
                        <p className="mt-2 text-sm text-gray-400">
                          {region.description}
                        </p>
                      )}
                    </div>
                    <span
                      className={`text-2xl shrink-0 transition-colors duration-300 ${
                        isActive ? 'text-accent' : 'text-white/20'
                      }`}
                    >
                      →
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* ===== Правая колонка — SVG карта ===== */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#0d0d0d] border border-white/10 overflow-hidden rounded-sm">
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="mapFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a1a1a" />
                    <stop offset="100%" stopColor="#111" />
                  </linearGradient>
                </defs>

                {/* Группа, которую двигаем (камера) */}
                <g ref={mapGroupRef}>
                  {/* Упрощённый контур России (стилизованный) */}
                  <path
                    d="M180,220
                       C220,180 280,160 340,155
                       C400,150 460,145 520,150
                       C580,155 640,160 700,170
                       C760,180 820,200 860,230
                       C900,260 920,300 910,340
                       C900,380 860,410 810,430
                       C760,450 700,460 640,455
                       C580,450 520,445 460,450
                       C400,455 340,470 290,490
                       C250,505 220,520 200,500
                       C180,480 170,450 165,410
                       C160,370 165,330 170,290
                       C175,260 170,240 180,220 Z"
                    fill="url(#mapFill)"
                    stroke="#2a2a2a"
                    strokeWidth="2"
                  />

                  {/* Дополнительный силуэт Дальнего Востока (упрощённо) */}
                  <path
                    d="M860,230
                       C900,210 940,220 960,260
                       C970,290 965,330 950,360
                       C930,390 890,400 860,390
                       C840,380 830,350 835,320
                       C840,290 850,250 860,230 Z"
                    fill="url(#mapFill)"
                    stroke="#2a2a2a"
                    strokeWidth="2"
                  />

                  {/* Точки регионов */}
                  {regions.map((region) => {
                    const isActive = region.id === activeId
                    return (
                      <g
                        key={region.id}
                        onClick={() => handleSelect(region.id)}
                        style={{ cursor: 'pointer' }}
                        className="interactive-hover"
                      >
                        {/* Пульсация */}
                        {isActive && (
                          <circle
                            cx={region.coords.x}
                            cy={region.coords.y}
                            r="18"
                            fill="#FF3B30"
                            opacity="0.25"
                          >
                            <animate
                              attributeName="r"
                              from="12"
                              to="28"
                              dur="1.6s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              from="0.35"
                              to="0"
                              dur="1.6s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}

                        {/* Основная точка */}
                        <circle
                          cx={region.coords.x}
                          cy={region.coords.y}
                          r={isActive ? 8 : 5}
                          fill={isActive ? '#FF3B30' : '#F4F4F0'}
                          stroke={isActive ? '#FF3B30' : '#F4F4F0'}
                          strokeWidth={isActive ? 2 : 1}
                          filter={isActive ? 'url(#glow)' : undefined}
                          className="transition-all duration-300"
                        />

                        {/* Подпись при активном состоянии */}
                        {isActive && (
                          <text
                            x={region.coords.x}
                            y={region.coords.y - 18}
                            textAnchor="middle"
                            fill="#F4F4F0"
                            fontSize="11"
                            fontFamily="Manrope, sans-serif"
                            fontWeight="600"
                          >
                            {region.short}
                          </text>
                        )}
                      </g>
                    )
                  })}
                </g>
              </svg>

              {/* Карточка активного региона поверх карты */}
              {active && (
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs bg-ink/95 border border-white/10 p-5 backdrop-blur-md transition-all duration-500">
                  <div className="text-xs tracking-wider uppercase text-accent mb-1">
                    Регион
                  </div>
                  <div className="font-display text-xl font-bold text-paper mb-1">
                    {active.name}
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{active.description}</p>

                  {activeProject ? (
                    <Link
                      to={`/projects/${active.projectSlug}`}
                      className="inline-flex items-center gap-2 text-sm border-b border-paper pb-0.5 hover:text-accent hover:border-accent transition-colors"
                    >
                      {activeProject.title} →
                    </Link>
                  ) : (
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-2 text-sm border-b border-paper pb-0.5 hover:text-accent hover:border-accent transition-colors"
                    >
                      Смотреть проекты →
                    </Link>
                  )}
                </div>
              )}
            </div>

            <p className="mt-4 text-xs text-gray-500 text-center sm:text-left">
              Нажмите на регион слева или на точку на карте
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
