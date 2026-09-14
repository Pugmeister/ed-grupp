import { useEffect } from 'react'

const SITE = 'ED GRUPP'
const DEFAULT_DESC =
  'Строительная компания полного цикла: логистика класса А, коммерция, жильё и промышленность. От техзадания до объекта «под ключ».'

/**
 * title — без «| ED GRUPP», суффикс добавится сам
 * description — до ~160 символов
 */
export default function Seo({
                              title,
                              description = DEFAULT_DESC,
                              noIndex = false,
                            }) {
  useEffect(() => {
    const full = title ? `${title} | ${SITE}` : SITE
    document.title = full

    const setMeta = (name, content, attr = 'name') => {
      if (!content) return
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('og:title', full, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow')
  }, [title, description, noIndex])

  return null
}