import ContactForm from '../../components/ContactForm/ContactForm'

const vacancies = [
  {
    id: 1,
    title: '[ДОЛЖНОСТЬ]',
    location: '[ЛОКАЦИЯ]',
    type: 'Полная занятость',
    description: '[ОПИСАНИЕ ВАКАНСИИ] Требования, обязанности, условия.',
  },
  {
    id: 2,
    title: '[ДОЛЖНОСТЬ]',
    location: '[ЛОКАЦИЯ]',
    type: 'Полная занятость',
    description: '[ОПИСАНИЕ ВАКАНСИИ]',
  },
]

export default function Career() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 px-5 sm:px-6 md:px-12 min-h-screen bg-ink">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14 max-w-2xl">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
            КАРЬЕРА
          </h1>
          <p className="text-gray-400 text-lg">
            Присоединяйтесь к команде, которая строит будущее. Открытые позиции и форма для резюме.
          </p>
        </header>

        <section className="mb-20 space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">Открытые позиции</h2>
          {vacancies.map((v) => (
            <div
              key={v.id}
              className="border border-white/10 p-6 sm:p-8 hover:border-accent/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold">{v.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {v.location} · {v.type}
                  </p>
                </div>
                <a
                  href="#resume"
                  className="text-sm border-b border-paper pb-0.5 hover:text-accent hover:border-accent transition-colors shrink-0"
                >
                  Откликнуться
                </a>
              </div>
              <p className="text-gray-400 mt-4 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </section>

        <section id="resume" className="max-w-xl">
          <ContactForm title="Отправить резюме" />
          <p className="text-xs text-gray-500 mt-4">
            Или напишите на{' '}
            <a href="mailto:hr@edgrupp.ru" className="text-accent hover:underline">
              hr@edgrupp.ru
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
