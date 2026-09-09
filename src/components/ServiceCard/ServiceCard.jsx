import { Link } from 'react-router-dom'

export default function ServiceCard({ service, index }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group relative block overflow-hidden interactive-hover"
    >
      <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/50 group-hover:bg-ink/30 transition-colors" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <span className="font-display text-4xl sm:text-5xl font-bold text-accent/40 mb-2">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-paper group-hover:text-accent transition-colors">
          {service.title}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-md line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {service.shortDescription}
        </p>
        <span className="mt-4 inline-block text-sm border-b border-paper pb-0.5 group-hover:border-accent group-hover:text-accent transition-colors">
          Подробнее →
        </span>
      </div>
    </Link>
  )
}
