import { useParams, Link } from 'react-router-dom'
import { getServiceBySlug } from '../../data/services'
import { getProjectBySlug } from '../../data/projects'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import Button from '../../components/Button/Button'

export default function Service() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink pt-28">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Услуга не найдена</h1>
          <Link to="/services" className="text-accent hover:underline">
            ← Все услуги
          </Link>
        </div>
      </div>
    )
  }

  const related = (service.relatedProjects || [])
    .map((s) => getProjectBySlug(s))
    .filter(Boolean)

  return (
    <div className="bg-ink min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[380px] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-16 max-w-7xl mx-auto">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            {service.title}
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">{service.shortDescription}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-16 sm:py-24 space-y-20">
        {/* Description */}
        <section className="max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">О направлении</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{service.description}</p>
        </section>

        {/* Advantages */}
        {service.advantages?.length > 0 && (
          <section>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">Преимущества</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.advantages.map((adv, i) => (
                <div
                  key={i}
                  className="border border-white/10 p-6 hover:border-accent/50 transition-colors"
                >
                  <span className="font-display text-3xl text-accent font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-3 text-paper font-medium">{adv}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Process */}
        {service.process?.length > 0 && (
          <section>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-10">Процесс работы</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((step) => (
                <div key={step.step}>
                  <span className="font-display text-4xl text-accent/50 font-bold">{step.step}</span>
                  <h3 className="font-display text-xl font-bold mt-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Facts */}
        {service.facts?.length > 0 && (
          <section className="bg-paper text-ink py-16 px-8 sm:px-12 -mx-5 sm:-mx-6 md:-mx-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
              {service.facts.map((f, i) => (
                <div key={i}>
                  <div className="font-display text-5xl sm:text-6xl font-bold text-accent">
                    {f.value}
                  </div>
                  <div className="mt-2 text-sm tracking-wider uppercase text-gray-600">{f.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related projects */}
        {related.length > 0 && (
          <section>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">Связанные проекты</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center py-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
            Готовы обсудить проект?
          </h2>
          <Button to="/contacts" variant="accent">
            Оставить заявку
          </Button>
        </section>
      </div>
    </div>
  )
}
