import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import { services } from '../../data/services'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import Button from '../../components/Button/Button'

export default function Home() {
  const horizontalTrackRef = useRef(null)
  const processSectionRef = useRef(null)

  useEffect(() => {
    // Parallax
    let ticking = false
    const updateParallax = () => {
      if (window.innerWidth < 480) {
        document.querySelectorAll('.parallax-img').forEach((img) => {
          img.style.transform = 'none'
        })
        ticking = false
        return
      }
      document.querySelectorAll('.parallax-img').forEach((img) => {
        const rect = img.getBoundingClientRect()
        const speed = parseFloat(img.dataset.speed) || 0.1
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = (window.innerHeight - rect.top) * speed
          img.style.transform = `translate3d(0, ${yPos}px, 0) scale(1.05)`
        }
      })
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
      updateHorizontal()
    }

    // Horizontal process
    const updateHorizontal = () => {
      const section = processSectionRef.current
      const track = horizontalTrackRef.current
      if (!section || !track) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight
      const maxScroll = sectionHeight - windowHeight
      if (maxScroll <= 0) return

      let progress = 0
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        progress = Math.min(1, Math.max(0, -rect.top / maxScroll))
      } else if (rect.bottom < windowHeight) {
        progress = 1
      }

      const trackWidth = track.scrollWidth - window.innerWidth
      const translateX = progress * Math.max(0, trackWidth)
      track.style.transform = `translate3d(-${translateX}px, 0, 0)`
    }

    // Reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => {
      updateHorizontal()
      updateParallax()
    })
    updateHorizontal()

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const featuredProjects = projects.slice(0, 3)

  return (
    <>
      {/* 1. HERO */}
      <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356fd0?w=1600&q=80"
            className="absolute inset-0 w-full h-full object-cover animate-fade-1"
            alt="Object 1"
          />
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            className="absolute inset-0 w-full h-full object-cover animate-fade-2"
            alt="Object 2"
          />
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80"
            className="absolute inset-0 w-full h-full object-cover animate-fade-3"
            alt="Object 3"
          />
          <div className="absolute inset-0 bg-ink/40" />
        </div>

        <h1 className="hero-title relative z-10 font-display font-bold text-paper tracking-tighter text-center mix-blend-difference px-4 sm:px-6">
          МЫ
          <br />
          СТРОИМ
          <br />
          БОЛЬШЕ,
          <br />
          <span className="italic font-light">ЧЕМ ЗДАНИЯ.</span>
        </h1>

        <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
          <div className="w-[1px] h-12 sm:h-16 bg-paper animate-pulse" />
        </div>
      </section>

      {/* 2. EDITORIAL — Логистика */}
      <section className="relative min-h-[100svh] w-full flex items-center py-16 sm:py-20 md:py-24 px-5 sm:px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-10 pointer-events-none">
          <span className="section-num-bg font-display font-bold leading-none">01</span>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          <div className="md:col-span-1 flex md:justify-center order-1">
            <span className="block-num vertical-text font-display font-bold text-accent">01</span>
          </div>

          <div className="md:col-span-5 space-y-4 sm:space-y-6 reveal order-2">
            <h2 className="block-title font-display font-bold">ЛОГИСТИКА</h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-md leading-relaxed">
              Инфраструктура, которая двигает экономику. Складские комплексы класса А и индустриальные парки.
            </p>
            <Link
              to="/services/logistics"
              className="inline-block border-b border-paper pb-1 text-sm sm:text-base hover:text-accent hover:border-accent transition-colors interactive-hover"
            >
              Смотреть объекты →
            </Link>
          </div>

          <div className="md:col-span-6 relative mt-8 md:mt-0 order-3">
            <div className="parallax-img relative overflow-hidden aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5]" data-speed="0.12">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                alt="Логистика"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-24 h-24 sm:w-40 sm:h-40 border border-accent z-[-1]" />
          </div>
        </div>
      </section>

      {/* 02 Коммерция */}
      <section className="relative min-h-[100svh] w-full flex items-center py-16 sm:py-20 md:py-24 px-5 sm:px-6 md:px-12 overflow-hidden bg-paper text-ink">
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          <div className="md:col-span-7 relative order-2 md:order-1">
            <div className="parallax-img relative overflow-hidden aspect-[16/11] sm:aspect-[16/10]" data-speed="-0.08">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                className="w-full h-full object-cover"
                alt="Коммерция"
              />
            </div>
            <div className="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 w-40 h-40 sm:w-60 sm:h-60 bg-accent/10 z-[-1] rounded-full blur-3xl" />
          </div>

          <div className="md:col-span-5 space-y-4 sm:space-y-6 order-1 md:order-2 flex flex-col items-start md:items-end text-left md:text-right">
            <span className="block-num vertical-text font-display font-bold text-accent md:self-start">02</span>
            <h2 className="block-title font-display font-bold">КОММЕРЦИЯ</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-md leading-relaxed">
              Точки притяжения. Офисные и торговые пространства, генерирующие стабильный денежный поток.
            </p>
            <Link
              to="/services/commercial"
              className="inline-block border-b border-ink pb-1 text-sm sm:text-base hover:text-accent hover:border-accent transition-colors interactive-hover"
            >
              Смотреть объекты →
            </Link>
          </div>
        </div>
      </section>

      {/* 03 Жильё */}
      <section className="relative h-[100svh] min-h-[520px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
            className="w-full h-full object-cover opacity-50 parallax-img"
            data-speed="0.05"
            alt="Жильё"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
        </div>

        <div className="relative z-10 text-center flex flex-col items-center gap-4 sm:gap-6 px-5">
          <span className="font-display text-[18vw] sm:text-[20vw] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-b from-paper to-gray-600">
            03
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
            ЖИЛИЩНОЕ
            <br />
            СТРОИТЕЛЬСТВО
          </h2>

          <Link
            to="/services/residential"
            className="group flex flex-col items-center gap-3 sm:gap-4 mt-6 sm:mt-8 interactive-hover"
          >
            <div className="w-[1px] h-12 sm:h-16 bg-paper group-hover:bg-accent transition-colors" />
            <span className="font-body text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase group-hover:text-accent transition-colors">
              смотреть проекты
            </span>
          </Link>
        </div>
      </section>

      {/* 3. FROM IDEA → TO REALITY */}
      <section className="horizontal-wrapper bg-ink text-paper" id="process-section" ref={processSectionRef}>
        <div className="horizontal-sticky">
          <div className="absolute top-6 left-5 sm:top-10 sm:left-8 md:left-20 z-20 max-w-[min(90vw,28rem)]">
            <h3 className="process-heading font-display font-bold leading-tight">
              FROM IDEA <span className="text-accent">→</span> TO REALITY
            </h3>
            <p className="text-gray-400 mt-2 max-w-xs text-xs sm:text-sm leading-relaxed">
              Полный цикл девелопмента: от первой эскизной линии до передачи ключей.
            </p>
          </div>

          <div className="horizontal-track" id="horizontal-track" ref={horizontalTrackRef}>
            {[
              {
                num: '01',
                title: 'КОНЦЕПЦИЯ',
                text: 'Анализ участка, финансовая модель и архитектурное видение.',
                img: 'https://images.unsplash.com/photo-1504307651254-35680f356fd0?w=800&q=80',
              },
              {
                num: '02',
                title: 'ПРОЕКТИРОВАНИЕ',
                text: 'Детальная проработка BIM-моделей и инженерных систем.',
                img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
              },
              {
                num: '03',
                title: 'СТРОИТЕЛЬСТВО',
                text: 'Контроль качества, соблюдение сроков и бюджетная дисциплина.',
                img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
              },
              {
                num: '04',
                title: 'СДАЧА',
                text: 'Ввод в эксплуатацию и передача готового актива инвестору.',
                img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
              },
            ].map((card) => (
              <div key={card.num} className="process-card relative group interactive-hover overflow-hidden">
                <img
                  src={card.img}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  alt={card.title}
                />
                <div className="absolute bottom-0 left-0 p-5 sm:p-6 md:p-8 w-full bg-gradient-to-t from-black via-black/70 to-transparent">
                  <span className="process-num font-display font-bold text-accent/50 absolute -top-12 sm:-top-16 md:-top-20 left-5 sm:left-6 md:left-8">
                    {card.num}
                  </span>
                  <h4 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold relative z-10">
                    {card.title}
                  </h4>
                  <p className="text-gray-300 mt-1.5 sm:mt-2 text-xs sm:text-sm max-w-xs leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-20 sm:py-28 px-5 sm:px-6 md:px-12 bg-ink">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              КЛЮЧЕВЫЕ
              <br />
              ПРОЕКТЫ
            </h2>
            <Link
              to="/projects"
              className="text-sm border-b border-paper pb-1 hover:text-accent hover:border-accent transition-colors interactive-hover"
            >
              Все проекты →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* MEGA CTA */}
      <section className="min-h-[100svh] w-full flex flex-col items-center justify-center bg-paper text-ink mega-cta relative overflow-hidden group py-20 px-5 sm:px-6">
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356fd0?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover grayscale"
            alt="Background"
          />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h2 className="cta-title font-display font-bold tracking-tighter">
            ЕСТЬ ПРОЕКТ?
            <br />
            <span className="italic font-light text-accent group-hover:text-ink transition-colors">
              ДАВАЙТЕ ПОСТРОИМ ЕГО.
            </span>
          </h2>

          <Link
            to="/contacts"
            className="inline-flex items-center gap-3 sm:gap-4 mt-10 sm:mt-12 text-lg sm:text-xl md:text-2xl font-bold border-b-2 border-current pb-2 interactive-hover"
          >
            Обсудить проект
            <svg
              className="cta-arrow w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
