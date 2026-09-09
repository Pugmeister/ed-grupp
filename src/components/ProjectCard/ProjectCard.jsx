import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block relative overflow-hidden interactive-hover"
    >
      <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-ink">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2 mb-2 text-xs tracking-wider uppercase text-gray-300">
          <span>{project.type}</span>
          <span className="opacity-50">·</span>
          <span>{project.status}</span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-paper leading-tight group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-gray-400">{project.location}</p>
        <p className="mt-1 text-sm text-gray-500">{project.area}</p>
      </div>
    </Link>
  )
}
