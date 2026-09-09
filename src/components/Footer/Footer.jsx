import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/projects', label: 'Проекты' },
  { to: '/services', label: 'Услуги' },
  { to: '/about', label: 'О компании' },
  { to: '/news', label: 'Новости' },
  { to: '/contacts', label: 'Контакты' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-gray-500 py-12 sm:py-16 px-5 sm:px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Logo & short */}
          <div className="md:col-span-4 space-y-4">
            <Link
              to="/"
              className="font-display text-2xl font-bold text-paper tracking-widest interactive-hover inline-block"
            >
              ED GRUPP
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-gray-400">
              Мы строим больше, чем здания. Современная строительная компания полного цикла.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h4 className="text-paper text-xs tracking-[0.2em] uppercase mb-4">Навигация</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-paper transition-colors interactive-hover"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="md:col-span-3">
            <h4 className="text-paper text-xs tracking-[0.2em] uppercase mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="tel:+78612054480"
                  className="hover:text-paper transition-colors interactive-hover"
                >
                  +7 (861) 205-44-80
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@edgrupp.ru"
                  className="hover:text-paper transition-colors interactive-hover"
                >
                  info@edgrupp.ru
                </a>
              </li>
              <li className="text-gray-500 pt-1">РФ, 350042, г. Краснодар, ул. МОПР, д. 18, этаж 3, пом. 6</li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h4 className="text-paper text-xs tracking-[0.2em] uppercase mb-4">Соцсети</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-paper transition-colors interactive-hover">
                  Telegram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-paper transition-colors interactive-hover">
                  Max
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs opacity-70">
          <div>© {new Date().getFullYear()} ED GRUPP. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/contacts" className="hover:text-paper transition-colors">
              Политика конфиденциальности
            </Link>
            <span>[РЕКВИЗИТЫ]</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
