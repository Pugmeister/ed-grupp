import { Link, useParams, Navigate } from 'react-router-dom'
import { getNewsBySlug, formatNewsDate } from '../../data/news'

export default function NewsDetail() {
  const { slug } = useParams()
  const item = getNewsBySlug(slug)

  if (!item) return <Navigate to="/news" replace />

  return (
    <article className="pt-28 sm:pt-32 pb-20 px-5 sm:px-6 md:px-12 min-h-screen bg-ink">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/news"
          className="text-sm text-gray-500 hover:text-accent transition-colors interactive-hover"
        >
          ← Все новости
        </Link>

        <header className="mt-8 mb-10">
          <time className="text-xs tracking-wider uppercase text-gray-500">
            {formatNewsDate(item.date)}
          </time>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mt-4 leading-[1.05]">
            {item.title}
          </h1>
        </header>

        <div className="aspect-[16/9] overflow-hidden border border-white/10 mb-12">
          <img
            src={item.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
          {item.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
          <Link
            to="/news"
            className="text-sm hover:text-accent transition-colors"
          >
            ← К списку новостей
          </Link>
          <Link
            to="/contacts"
            className="text-sm border-b border-paper pb-0.5 hover:text-accent hover:border-accent transition-colors self-start"
          >
            Обсудить проект →
          </Link>
        </div>
      </div>
    </article>
  )
}