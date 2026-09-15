import { Link } from 'react-router-dom'
import Seo from '../../components/Seo/Seo'

export default function Privacy() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 px-5 sm:px-6 md:px-12 min-h-screen bg-ink">
      <Seo
        title="Политика конфиденциальности"
        description="Политика конфиденциальности ED GRUPP: обработка персональных данных, заявки с сайта, права пользователя."
      />

      <article className="max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.25em] uppercase text-accent mb-4">
          Документы
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Политика конфиденциальности
        </h1>
        <p className="text-sm text-gray-500 mb-12">
          Редакция от 16 сентября 2026 г. · ED GRUPP
        </p>

        <div className="space-y-10 text-gray-300 text-base leading-relaxed">
          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-paper mb-3">
              1. Общие положения
            </h2>
            <p>
              Настоящая Политика определяет порядок обработки персональных данных
              пользователей сайта ED GRUPP (далее — Сайт) и меры по их защите.
              Используя Сайт и отправляя заявку через форму, вы подтверждаете
              согласие с условиями Политики.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-paper mb-3">
              2. Оператор данных
            </h2>
            <p>
              Оператором персональных данных является компания ED GRUPP.
              Контакты: г. Краснодар, ул. МОПР, д. 18; тел.{' '}
              <a href="tel:+78612054480" className="text-paper underline hover:text-accent">
                +7 (861) 205-44-80
              </a>
              ; e-mail:{' '}
              <a href="mailto:info@edgrupp.ru" className="text-paper underline hover:text-accent">
                info@edgrupp.ru
              </a>
              .
            </p>
            <p className="mt-3 text-gray-400 text-sm">
              Юридические реквизиты (ИНН, ОГРН, полное наименование) указываются
              после предоставления заказчиком и могут быть дополнены в этой редакции.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-paper mb-3">
              3. Какие данные мы получаем
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>имя и контактный телефон (обязательные поля заявки);</li>
              <li>адрес электронной почты — если вы его указали;</li>
              <li>текст сообщения и сведения о проекте;</li>
              <li>
                файлы, прикреплённые к заявке (ТЗ, планировки, PDF и др.) — по вашей
                инициативе;
              </li>
              <li>
                технические данные: IP-адрес, тип браузера, дата и время обращения
                (могут фиксироваться сервером при отправке формы).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-paper mb-3">
              4. Цели обработки
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>обработка входящих заявок и обратная связь;</li>
              <li>подготовка коммерческих предложений и обсуждение проектов;</li>
              <li>исполнение договорённостей при дальнейшем сотрудничестве;</li>
              <li>улучшение работы Сайта и защита от злоупотреблений.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-paper mb-3">
              5. Правовые основания
            </h2>
            <p>
              Обработка осуществляется на основании согласия субъекта персональных
              данных (отправка формы на Сайте) и в случаях, предусмотренных
              законодательством РФ, в том числе Федеральным законом № 152-ФЗ
              «О персональных данных».
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-paper mb-3">
              6. Передача третьим лицам
            </h2>
            <p>
              Мы не продаём персональные данные. Передача возможна только:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>по требованию закона или уполномоченных органов;</li>
              <li>
                подрядчикам, обеспечивающим работу инфраструктуры (хостинг, почта),
                в объёме, необходимом для оказания услуг, с соблюдением
                конфиденциальности.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-paper mb-3">
              7. Срок хранения
            </h2>
            <p>
              Данные заявки хранятся в течение срока, необходимого для обработки
              обращения и дальнейшего взаимодействия, либо до отзыва согласия,
              если иное не требуется законодательством.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-paper mb-3">
              8. Ваши права
            </h2>
            <p>
              Вы можете запросить уточнение, блокирование или удаление своих
              персональных данных, а также отозвать согласие на обработку,
              направив обращение на{' '}
              <a href="mailto:info@edgrupp.ru" className="text-paper underline hover:text-accent">
                info@edgrupp.ru
              </a>{' '}
              или по телефону компании.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-paper mb-3">
              9. Cookies и аналитика
            </h2>
            <p>
              Сайт может использовать технические cookie, необходимые для
              корректной работы. При подключении систем аналитики (например,
              Яндекс.Метрика) обработка обезличенных данных осуществляется
              согласно их политикам; об этом может быть дополнительно указано
              на Сайте.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-paper mb-3">
              10. Изменения Политики
            </h2>
            <p>
              Мы можем обновлять текст Политики. Актуальная версия всегда
              доступна на этой странице. Дата редакции указана в начале документа.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-10 border-t border-white/10">
          <Link
            to="/contacts"
            className="text-sm border-b border-paper pb-0.5 hover:text-accent hover:border-accent transition-colors"
          >
            Связаться с нами →
          </Link>
        </div>
      </article>
    </div>
  )
}