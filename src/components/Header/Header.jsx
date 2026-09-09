import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/projects', label: 'Проекты' },
  { to: '/services', label: 'Услуги' },
  { to: '/about', label: 'О компании' },
  { to: '/news', label: 'Новости' },
  { to: '/career', label: 'Карьера' },
  { to: '/contacts', label: 'Контакты' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-5 sm:px-6 md:px-10 py-5 md:py-6 flex justify-between items-center transition-all duration-300 ${
          scrolled || menuOpen ? 'bg-ink/90 backdrop-blur-md' : 'mix-blend-difference'
        } text-paper`}
      >
        <Link
          to="/"
          className="font-display text-xl sm:text-2xl font-bold tracking-widest interactive-hover"
        >
          ED GRUPP
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm tracking-wide hover:text-accent transition-colors interactive-hover ${
                  isActive ? 'text-accent' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contacts"
            className="ml-4 px-5 py-2.5 border border-paper text-sm font-medium tracking-wide hover:bg-paper hover:text-ink transition-all duration-300 interactive-hover"
          >
            Обсудить проект
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 interactive-hover"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={`block w-6 h-[1.5px] bg-paper transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-paper transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-paper transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 bg-ink flex flex-col justify-center px-8 lg:hidden mobile-menu ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ transform: menuOpen ? 'translateY(0)' : 'translateY(-10px)' }}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `font-display text-3xl sm:text-4xl font-bold tracking-tight hover:text-accent transition-colors ${
                  isActive ? 'text-accent' : 'text-paper'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contacts"
            className="mt-8 inline-block w-fit px-6 py-3 border border-paper text-base font-medium tracking-wide hover:bg-paper hover:text-ink transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Обсудить проект
          </Link>
        </nav>
      </div>
    </>
  )
}
