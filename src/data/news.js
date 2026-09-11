import { img } from '../utils/asset'

export const news = [
  {
    id: 1,
    slug: 'new-logistics-project',
    title: 'Запущен новый логистический проект',
    date: '2026-03-15',
    excerpt: '[КРАТКОЕ ОПИСАНИЕ] Компания приступила к реализации крупного складского комплекса.',
    image: img('images/logistics.jpg'),
    content: '[ПОЛНЫЙ ТЕКСТ НОВОСТИ] Placeholder для полного текста новости. Здесь будет размещён детальный материал о событии, с фотографиями и фактами.',
  },
  {
    id: 2,
    slug: 'company-growth',
    title: 'ED GRUPP расширяет географию',
    date: '2026-02-01',
    excerpt: '[КРАТКОЕ ОПИСАНИЕ] Новые регионы присутствия и планы развития.',
    image: img('images/commercial.jpg'),
    content: '[ПОЛНЫЙ ТЕКСТ НОВОСТИ] Placeholder.',
  },
  {
    id: 3,
    slug: 'quality-standards',
    title: 'Внедрение новых стандартов качества',
    date: '2025-12-10',
    excerpt: '[КРАТКОЕ ОПИСАНИЕ] Обновлённые процессы контроля на всех этапах строительства.',
    image: img('images/office.jpg'),
    content: '[ПОЛНЫЙ ТЕКСТ НОВОСТИ] Placeholder.',
  },
]

export const getNewsBySlug = (slug) => news.find((n) => n.slug === slug)