import Button from '../../components/Button/Button'

export default function About() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 px-5 sm:px-6 md:px-12 min-h-screen bg-ink">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 sm:mb-24 max-w-3xl">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
            О КОМПАНИИ
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
            [ОПИСАНИЕ] ED GRUPP — строительная компания полного цикла. Мы реализуем проекты любой сложности с акцентом на качество, сроки и технологичность.
          </p>
        </header>

        {/* Key numbers placeholder */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-12 border-y border-white/10">
          {[
            { value: '20+', label: 'Лет на рынке' },
            { value: '1млн+', label: 'м² построено' },
            { value: '20+', label: 'Объектов' },
            { value: '7', label: 'Регионов' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-accent">
                {item.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm tracking-wider uppercase text-gray-500">
                {item.label}
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="font-display text-3xl font-bold mb-4">Специализация</h2>
            <p className="text-gray-400 leading-relaxed">
              [ОПИСАНИЕ] Логистические комплексы класса А, коммерческая недвижимость, жилищное строительство. Полный цикл: от концепции до ввода в эксплуатацию.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold mb-4">Принципы</h2>
            <ul className="space-y-3 text-gray-400">
              <li className="flex gap-3">
                <span className="text-accent">→</span> Соблюдение сроков и обязательств
              </li>
              <li className="flex gap-3">
                <span className="text-accent">→</span> Качество на каждом этапе
              </li>
              <li className="flex gap-3">
                <span className="text-accent">→</span> Технологичность и BIM
              </li>
              <li className="flex gap-3">
                <span className="text-accent">→</span> Прозрачность для клиента
              </li>
            </ul>
          </div>
        </section>

        <section className="text-center py-10">
          <Button to="/contacts" variant="accent">
            Обсудить сотрудничество
          </Button>
        </section>
      </div>
    </div>
  )
}
