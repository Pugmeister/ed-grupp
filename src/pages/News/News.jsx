import { Link } from 'react-router-dom'
import { news, formatNewsDate } from '../../data/news'

export default function News() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 px-5 sm:px-6 md:px-12 min-h-screen bg-ink">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14 sm:mb-20 max-w-3xl">
          <p className="text-xs tracking-[0.25em] uppercase text-accent mb-4">
            Пресс-центр
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
            НОВОСТИ
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            События, направления и факты о работе ED GRUPP. Логистика, география,
            коммерция и полный цикл строительства.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {news.map((item, i) => (
            <article
              key={item.id}
              className={`group border border-white/10 overflow-hidden hover:border-accent/40 transition-colors ${
                i === 0 ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
              }`}
            >
              <Link to={`/news/${item.slug}`} className="block interactive-hover">
                <div
                  className={`overflow-hidden bg-white/5 ${
                    i === 0 ? 'aspect-[16/10] md:aspect-auto md:min-h-full' : 'aspect-[16/10]'
                  }`}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                    loading="lazy"
                  />
                </div>
              </Link>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <time className="text-xs tracking-wider uppercase text-gray-500">
                  {formatNewsDate(item.date)}
                </time>
                <h2 className="font-display text-2xl sm:text-3xl font-bold mt-3 mb-3 leading-tight group-hover:text-accent transition-colors">
                  <Link to={`/news/${item.slug}`}>{item.title}</Link>
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                  {item.excerpt}
                </p>
                <Link
                  to={`/news/${item.slug}`}
                  className="text-sm border-b border-paper pb-0.5 self-start hover:text-accent hover:border-accent transition-colors"
                >
                  Читать →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}