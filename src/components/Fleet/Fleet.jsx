const fleet = [
  { value: 14, label: 'Самосвалов' },
  { value: 2,  label: 'Седельных тягача' },
  { value: 6,  label: 'Автокранов' },
  { value: 1,  label: 'Манипулятор' },
  { value: 4,  label: 'Бульдозера' },
  { value: 9,  label: 'Экскаваторов' },
  { value: 2,  label: 'Автогрейдера' },
  { value: 5,  label: 'Катков' },
  { value: 17, label: 'Погрузчиков' },
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

        {/* Сетка */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {fleet.map((item) => (
            <div
              key={item.label}
              className="group border border-ink/10 p-5 sm:p-6 hover:border-accent/40 hover:bg-ink hover:text-paper transition-all duration-300"
            >
              <div className="font-display text-4xl sm:text-5xl font-bold text-accent group-hover:text-accent transition-colors">
                {item.value}
              </div>
              <div className="mt-2 text-sm sm:text-base text-gray-600 group-hover:text-gray-300 transition-colors leading-snug">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}