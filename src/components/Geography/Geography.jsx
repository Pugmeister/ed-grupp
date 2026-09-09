import { useState } from 'react'
import { Link } from 'react-router-dom'
import { regions } from '../../data/regions'

export default function Geography() {
  const [activeId, setActiveId] = useState(regions[0].id)
  const active = regions.find((r) => r.id === activeId)

  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6 md:px-12 bg-ink">
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
          {/* Левая колонка — плитки */}
          <div className="lg:col-span-5 space-y-3">
            {regions.map((region) => {
              const isActive = region.id === activeId
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setActiveId(region.id)}
                  className={`w-full text-left p-5 sm:p-6 border transition-all duration-300 interactive-hover ${
                    isActive
                      ? 'border-accent bg-accent/10'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="font-display text-xl sm:text-2xl font-bold text-paper">
                        {region.name}
                      </span>
                      {isActive && (
                        <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                          {region.description}
                        </p>
                      )}
                    </div>
                    <span
                      className={`text-2xl transition-colors ${
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

          {/* Правая колонка — карта */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#111] border border-white/10 overflow-hidden">
              {/* Фон карты (упрощённый силуэт России) */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Russia_%28orthographic_projection%29.svg/800px-Russia_%28orthographic_projection%29.svg.png"
                alt="Карта России"
                className="absolute inset-0 w-full h-full object-contain opacity-40 p-6 sm:p-10 pointer-events-none"
              />

              {/* Точки регионов */}
              {regions.map((region) => {
                const isActive = region.id === activeId
                return (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => setActiveId(region.id)}
                    className="absolute z-10 group"
                    style={{
                      left: `${region.coords.x}%`,
                      top: `${region.coords.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {/* Пульсирующий круг */}
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-500 ${
                        isActive
                          ? 'w-8 h-8 -left-2 -top-2 bg-accent/30 animate-ping'
                          : 'w-0 h-0'
                      }`}
                    />
                    {/* Сама точка */}
                    <span
                      className={`block rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? 'w-4 h-4 bg-accent border-accent scale-125'
                          : 'w-3 h-3 bg-paper/80 border-paper/50 group-hover:scale-125 group-hover:bg-accent group-hover:border-accent'
                      }`}
                    />
                  </button>
                )
              })}

              {/* Карточка активного региона */}
              {active && (
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs bg-ink/95 border border-white/10 p-5 backdrop-blur-sm">
                  <div className="text-xs tracking-wider uppercase text-accent mb-1">
                    Регион
                  </div>
                  <div className="font-display text-xl font-bold text-paper mb-3">
                    {active.name}
                  </div>
                  <Link
                    to={`/projects/${active.projectSlug}`}
                    className="inline-flex items-center gap-2 text-sm border-b border-paper pb-0.5 hover:text-accent hover:border-accent transition-colors"
                  >
                    Смотреть проект →
                  </Link>
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