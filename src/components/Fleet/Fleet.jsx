const fleet = [
  {
    value: 14,
    label: 'Самосвалов',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
  },
  {
    value: 2,
    label: 'Седельных тягача',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&q=80',
  },
  {
    value: 6,
    label: 'Автокранов',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=600&q=80',
  },
  {
    value: 1,
    label: 'Манипулятор',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
  },
  {
    value: 4,
    label: 'Бульдозера',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
  },
  {
    value: 9,
    label: 'Экскаваторов',
    image: 'https://images.unsplash.com/photo-1599700403969-f77b0c4f0a0e?w=600&q=80',
  },
  {
    value: 2,
    label: 'Автогрейдера',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
  },
  {
    value: 5,
    label: 'Катков',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356fd0?w=600&q=80',
  },
  {
    value: 17,
    label: 'Погрузчиков',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
  },
]

export default function Fleet() {
  const total = fleet.reduce((sum, item) => sum + item.value, 0)

  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6 md:px-12 bg-paper text-ink">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              ПАРК ТЕХНИКИ
            </h2>
            <p className="mt-4 text-gray-600 text-lg max-w-md">
              Собственный автопарк для полного цикла строительных работ
            </p>
          </div>
          <div className="text-left md:text-right">
            <div className="font-display text-5xl sm:text-6xl font-bold text-accent">
              {total}
            </div>
            <div className="text-xs tracking-[0.2em] uppercase text-gray-500 mt-1">
              единиц техники
            </div>
          </div>
        </div>

        {/* Сетка с фото */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {fleet.map((item) => (
            <div
              key={item.label}
              className="group relative overflow-hidden border border-ink/10 hover:border-accent/40 transition-all duration-500"
            >
              {/* Фото */}
              <div className="aspect-[16/10] overflow-hidden bg-ink/5">
                <img
                  src={item.image}
                  alt={item.label}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              </div>

              {/* Текст поверх */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <div className="font-display text-4xl sm:text-5xl font-bold text-accent">
                  {item.value}
                </div>
                <div className="mt-1 text-sm sm:text-base text-paper/90 font-medium">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}