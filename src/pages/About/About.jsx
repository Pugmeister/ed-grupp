import Button from '../../components/Button/Button'
import { img } from '../../utils/asset'
import Seo from '../../components/Seo/Seo'

const principles = [
  {
    title: 'Полный цикл',
    text: 'От техзадания и анализа участка до ввода объекта «под ключ» — одна команда и одна ответственность.',
  },
  {
    title: 'Сроки',
    text: 'Дисциплина графика без потери качества. Планируем реалистично и держим договорённости.',
  },
  {
    title: 'Гибкость',
    text: 'Нестандартные площадки, сжатые окна работ, изменения ТЗ — ищем рабочее решение, а не отговорки.',
  },
  {
    title: 'Гарантия',
    text: 'Сопровождаем объект после сдачи. Гарантийные обязательства выполняем в понятные сроки.',
  },
]

const licenses = [
  { src: img('images/licenses/Vypiska-4.png'), alt: 'Лицензия / допуск 1' },
  { src: img('images/licenses/Vypiska-5.png'), alt: 'Лицензия / допуск 2' },
  { src: img('images/licenses/Vypiska-6.png'), alt: 'Лицензия / допуск 3' },
  { src: img('images/licenses/Vypiska-7.png'), alt: 'Лицензия / допуск 4' },
  { src: img('images/licenses/Vypiska-8.png'), alt: 'Лицензия / допуск 5' },
  { src: img('images/licenses/Vypiska-9.png'), alt: 'Лицензия / допуск 6' },
  { src: img('images/licenses/Vypiska-10.png'), alt: 'Лицензия / допуск 7' },
]

/** Кадры: public/images/about/workdays/01.jpg … 14.jpg */
const workdays = Array.from({ length: 28 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    src: img(`images/about/workdays/${n}.jpg`),
    alt: `Рабочие будни ED GRUPP — кадр ${n}`,
  }
})

export default function About() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 px-5 sm:px-6 md:px-12 min-h-screen bg-ink">
      <Seo
        title="О компании ED GRUPP — 20 лет и 1,5 млн м²"
        description="Строительная компания полного цикла: 20+ лет на рынке, свыше 1,5 млн м². Логистика класса А, коммерция, жильё и промышленность. 7 регионов России и Азербайджан."
      />
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <header className="mb-16 sm:mb-24 max-w-4xl">
          <p className="text-xs tracking-[0.25em] uppercase text-accent mb-4">
            О компании
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[0.95]">
            СТРОИМ ОБЪЕКТЫ,
            <br />
            КОТОРЫЕ РАБОТАЮТ
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-2xl">
            ED GRUPP — строительная компания полного цикла с более чем 20-летним
            опытом и международными проектами. За это время реализовано свыше
            1.5&nbsp;млн+&nbsp;м²: логистические парки класса&nbsp;А, коммерция, жильё и
            промышленность. От техзадания до ввода «под ключ» — с контролем
            сроков и качества.
          </p>
        </header>

        {/* Цифры */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-12 border-y border-white/10">
          {[
            { value: '20+', label: 'Лет на рынке' },
            { value: '1.5 млн+', label: 'м² построено' },
            { value: '8', label: 'География присутствия' },
            { value: '100%', label: 'Под ключ' },
          ].map((item) => (
            <div key={item.label} className="text-center md:text-left">
              <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-accent">
                {item.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm tracking-wider uppercase text-gray-500">
                {item.label}
              </div>
            </div>
          ))}
        </section>

        {/* Специализация */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
              Специализация
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Основной фокус — складские комплексы класса&nbsp;А и коммерческая
              недвижимость. Строим также жилые и промышленные объекты. Один
              подрядчик на весь цикл: земля, каркас, инженерия, сдача.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Среди реализованных площадок — логопарки для резидентов вроде Ozon,
              AliExpress, X5, «Ленты» и Яндекса, а также жилые комплексы в
              Краснодаре и Волгограде.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                t: 'Логистические парки',
                d: 'Склады класса А, логопарки, транспортные узлы',
              },
              {
                t: 'Коммерция',
                d: 'Торговые и многофункциональные центры',
              },
              {
                t: 'Жильё',
                d: 'Жилые комплексы с инженерией и паркингом',
              },
              {
                t: 'Промышленность',
                d: 'Производственные корпуса и инфраструктура',
              },
            ].map((card) => (
              <div
                key={card.t}
                className="border border-white/10 p-6 hover:border-accent/40 transition-colors"
              >
                <div className="font-display text-xl font-bold text-paper mb-2">
                  {card.t}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{card.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Рабочие будни */}
        <section className="mb-24 -mx-5 sm:-mx-6 md:-mx-12">
          <div className="px-5 sm:px-6 md:px-12 mb-8 sm:mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Рабочие будни
            </h2>
            <p className="mt-3 text-gray-400 max-w-xl">
              Площадки, техника и процесс — кадры с объектов, без постановочных
              стоков.
            </p>
          </div>

          <div
            className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-5 sm:px-6 md:px-12
              [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {workdays.map((shot) => (
              <figure
                key={shot.src}
                className="relative shrink-0 snap-center w-[85vw] sm:w-[55vw] md:w-[38vw] lg:w-[28vw]
                  aspect-[4/5] sm:aspect-[3/4] overflow-hidden border border-white/10 bg-white/5"
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </figure>
            ))}
          </div>
        </section>

        {/* Принципы */}
        <section className="mb-24">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-10 tracking-tight">
            Как мы работаем
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="border border-white/10 p-6 sm:p-8 flex gap-5"
              >
                <span className="font-display text-2xl text-accent/80 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* География */}
        <section className="mb-24 max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
            География
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Более 20 лет строим в ключевых регионах России: Московская,
            Ростовская, Свердловская, Волгоградская, Тюменская области,
            Краснодарский и Ставропольский края.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Есть и международный опыт — проекты в Азербайджане. Суммарно по
            компании — свыше 1.5&nbsp;млн+&nbsp;м² введённых площадей.
          </p>
        </section>

        {/* Лицензии */}
        <section className="mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                Лицензии и допуски
              </h2>
              <p className="mt-3 text-gray-400 max-w-xl">
                Документы, подтверждающие право выполнять строительные работы и
                обязательства перед заказчиком.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {licenses.map((item) => (
              <a
                key={item.src}
                href={item.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-white/10 overflow-hidden bg-white/5 aspect-[3/4] interactive-hover"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement.classList.add(
                      'flex',
                      'items-center',
                      'justify-center'
                    )
                    e.currentTarget.parentElement.innerHTML =
                      '<span class="text-xs text-gray-500 p-4 text-center">Добавьте скан в public/images/licenses/</span>'
                  }}
                />
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8 border-t border-white/10">
          <p className="text-gray-500 mb-2 text-xs tracking-[0.2em] uppercase">
            Следующий шаг
          </p>
          <p className="text-paper text-xl sm:text-2xl font-display font-bold mb-8 max-w-lg mx-auto leading-snug">
            Есть техзадание?
            <br />
            <span className="text-gray-400 font-body text-base sm:text-lg font-normal">
              Сделаем проект и построим «под ключ»
            </span>
          </p>
          <Button to="/contacts" variant="accent">
            Обсудить проект
          </Button>
        </section>
      </div>
    </div>
  )
}