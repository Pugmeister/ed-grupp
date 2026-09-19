import { useState, useMemo } from 'react'
import { projects, projectTypes } from '../../data/projects'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import ProjectFilter from '../../components/ProjectFilter/ProjectFilter'
import Seo from "../../components/Seo/Seo.jsx";

export default function Projects() {
  const [type, setType] = useState('Все')

  const filtered = useMemo(() => {
    return projects.filter((p) => type === 'Все' || p.type === type)
  }, [type])

  const counts = useMemo(() => {
    const map = { 'Все': projects.length }
    projectTypes.forEach((t) => {
      if (t !== 'Все') map[t] = projects.filter((p) => p.type === t).length
    })
    return map
  }, [])

  return (
    <div className="pt-28 sm:pt-32 pb-20 px-5 sm:px-6 md:px-12 min-h-screen bg-ink">
      <Seo
        title="Проекты ED GRUPP — логистика, жильё, коммерция и промышленность"
        description="Реализованные объекты: склады класса А, ТЦ «Сказка», ЖК в Краснодаре и Волгограде. Фильтр по типу. Полный цикл строительства."
      />
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 sm:mb-16 max-w-3xl">
          <p className="text-xs tracking-[0.25em] uppercase text-accent mb-4">
            Портфолио
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
            ПРОЕКТЫ
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
            Реализованные объекты полного цикла: логистические комплексы класса&nbsp;А,
            коммерция, жильё и промышленность. От мастер-плана до ввода в эксплуатацию —
            с одной командой и понятной зоной ответственности.
          </p>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            В каталоге — склады в Московской области, Екатеринбурге, Ростове и Краснодаре,
            ТЦ «Сказка», жилые комплексы в Краснодаре и Волгограде, а также международный
            опыт. Фильтр по типу объекта поможет быстро найти нужное направление.
          </p>
        </header>

        <ProjectFilter
          types={projectTypes}
          activeType={type}
          onTypeChange={setType}
          counts={counts}
        />

        {filtered.length === 0 ? (
          <p className="text-gray-500 py-20 text-center">Проекты не найдены</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}