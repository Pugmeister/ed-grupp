import { useParams, Link } from 'react-router-dom'
import { getNewsBySlug } from '../../data/news'

export default function Article() {
  const { slug } = useParams()
  const article = getNewsBySlug(slug)

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink pt-28">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Новость не найдена</h1>
          <Link to="/news" className="text-accent hover:underline">
            ← Все новости
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="pt-28 sm:pt-32 pb-20 px-5 sm:px-6 md:px-12 min-h-screen bg-ink">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/news"
          className="text-sm text-gray-500 hover:text-accent transition-colors mb-8 inline-block"
        >
          ← Новости
        </Link>

        <time className="block text-xs tracking-wider uppercase text-gray-500 mb-4">
          {new Date(article.date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>

        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-8">
          {article.title}
        </h1>

        <div className="aspect-[16/9] overflow-hidden mb-10">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg">
          <p>{article.content}</p>
        </div>
      </div>
    </article>
  )
}
