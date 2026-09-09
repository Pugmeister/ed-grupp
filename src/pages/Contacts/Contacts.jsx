import ContactForm from '../../components/ContactForm/ContactForm'

export default function Contacts() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 px-5 sm:px-6 md:px-12 min-h-screen bg-ink">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            КОНТАКТЫ
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Info */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">Телефон</h2>
              <a
                href="tel:+78612054480"
                className="font-display text-2xl sm:text-3xl font-bold hover:text-accent transition-colors interactive-hover"
              >
                +7 (861) 205-44-80
              </a>
            </div>

            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">Email</h2>
              <a
                href="mailto:info@edgrupp.ru"
                className="text-xl hover:text-accent transition-colors interactive-hover"
              >
                info@edgrupp.ru
              </a>
            </div>

            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">Адрес</h2>
              <p className="text-gray-300 leading-relaxed">[АДРЕС КОМПАНИИ]</p>
            </div>

            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">Реквизиты</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                [ИНН] · [ОГРН]
                <br />
                [ЮРИДИЧЕСКОЕ НАЗВАНИЕ]
              </p>
            </div>

            {/* Map placeholder */}
            <div className="aspect-[16/10] bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 text-sm">
              [КАРТА — подключить Яндекс/Google Maps]
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="border border-white/10 p-6 sm:p-10">
              <ContactForm title="Напишите нам" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
