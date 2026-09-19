import { services } from '../../data/services'
import ServiceCard from '../../components/ServiceCard/ServiceCard'
import Seo from "../../components/Seo/Seo.jsx";
import ServiceSketch from "../../components/ServiceSketch/ServiceSketch.jsx";

export default function Services() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 px-5 sm:px-6 md:px-12 min-h-screen bg-ink">
      <Seo
        title="Услуги — логистика, коммерция, жильё, промышленность"
        description="Четыре направления ED GRUPP: склады класса А, торговые центры, жилые комплексы и промышленные корпуса. Полный цикл «под ключ»."
      />
      <div className="max-w-7xl mx-auto">
        <header className="mb-14 sm:mb-20 max-w-3xl">
          <p className="text-xs tracking-[0.25em] uppercase text-accent mb-4">
            Направления
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
            УСЛУГИ
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
            Четыре направления — один стандарт работы. Логистические парки класса&nbsp;А,
            коммерция, жилищное и промышленное строительство: полный цикл от концепции
            и проектирования до ввода объекта «под ключ».
          </p>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            Заказчик работает с одной командой на всём пути: участок, каркас, инженерия,
            сроки и сдача. Ниже — каждое направление подробнее, с процессом работ и
            примерами реализованных объектов.
          </p>
        </header>

        <div className="space-y-8 sm:space-y-12">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
      <ServiceSketch />
    </div>
  )
}
