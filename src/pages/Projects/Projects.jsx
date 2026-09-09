import { useState, useMemo } from 'react'
import { projects, projectTypes, projectStatuses } from '../../data/projects'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import ProjectFilter from '../../components/ProjectFilter/ProjectFilter'

export default function Projects() {
  const [type, setType] = useState('Все')
  const [status, setStatus] = useState('Все')

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const typeMatch = type === 'Все' || p.type === type
      const statusMatch = status === 'Все' || p.status === status
      return typeMatch && statusMatch
    })
  }, [type, status])

  return (
    <div className="pt-28 sm:pt-32 pb-20 px-5 sm:px-6 md:px-12 min-h-screen bg-ink">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 sm:mb-16">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
            ПРОЕКТЫ
          </h1>
          <p className="text-gray-400 max-w-xl text-base sm:text-lg">
            Реализованные и текущие объекты. Фильтруйте по типу и статусу.
          </p>
        </header>

        <ProjectFilter
          types={projectTypes}
          statuses={projectStatuses}
          activeType={type}
          activeStatus={status}
          onTypeChange={setType}
          onStatusChange={setStatus}
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
