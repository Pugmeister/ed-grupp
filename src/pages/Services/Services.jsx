import { services } from '../../data/services'
import ServiceCard from '../../components/ServiceCard/ServiceCard'

export default function Services() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 px-5 sm:px-6 md:px-12 min-h-screen bg-ink">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14 sm:mb-20">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
            УСЛУГИ
          </h1>
          <p className="text-gray-400 max-w-xl text-base sm:text-lg">
            Направления деятельности компании. Полный цикл от концепции до сдачи.
          </p>
        </header>

        <div className="space-y-8 sm:space-y-12">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
