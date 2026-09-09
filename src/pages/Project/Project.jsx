import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug, projects } from '../../data/projects'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import Button from '../../components/Button/Button'

export default function Project() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink pt-28">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Проект не найден</h1>
          <Link to="/projects" className="text-accent hover:underline">
            ← Все проекты
          </Link>
        </div>
      </div>
    )
  }

  const similar = projects.filter((p) => p.slug !== slug && p.type === project.type).slice(0, 3)

  return (
    <div className="bg-ink min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-16 max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 text-xs tracking-wider uppercase text-gray-300 mb-3">
            <span>{project.type}</span>
            <span>·</span>
            <span>{project.status}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-gray-300">{project.location}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main content */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">О проекте</h2>
              <p className="text-gray-300 leading-relaxed text-base sm:text-lg">{project.description}</p>
            </div>

            {project.stages?.length > 0 && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">Этапы реализации</h2>
                <div className="space-y-6">
                  {project.stages.map((stage, i) => (
                    <div key={i} className="flex gap-5">
                      <span className="font-display text-2xl text-accent font-bold shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-medium text-paper text-lg">{stage.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{stage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.gallery?.length > 0 && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">Галерея</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((src, i) => (
                    <div key={i} className="aspect-[4/3] overflow-hidden">
                      <img
                        src={src}
                        alt={`${project.title} — фото ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-8">
              <div className="border border-white/10 p-6 sm:p-8 space-y-5">
                <h3 className="text-xs tracking-[0.2em] uppercase text-gray-500">Характеристики</h3>
                {project.features?.map((f) => (
                  <div key={f.label} className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400 text-sm">{f.label}</span>
                    <span className="text-paper font-medium">{f.value}</span>
                  </div>
                ))}
              </div>

              <Button to="/contacts" variant="accent" className="w-full justify-center">
                Обсудить похожий проект
              </Button>
            </div>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-24 pt-16 border-t border-white/10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-10">Похожие проекты</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
