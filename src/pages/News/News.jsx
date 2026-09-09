import { Link } from 'react-router-dom'
import { news } from '../../data/news'

export default function News() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 px-5 sm:px-6 md:px-12 min-h-screen bg-ink">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            НОВОСТИ
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.slug}`}
              className="group block interactive-hover"
            >
              <div className="aspect-[16/10] overflow-hidden mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <time className="text-xs tracking-wider uppercase text-gray-500">
                {new Date(item.date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h2 className="font-display text-xl sm:text-2xl font-bold mt-2 group-hover:text-accent transition-colors">
                {item.title}
              </h2>
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">{item.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
