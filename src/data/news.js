export const news = [
  {
    id: 1,
    slug: 'new-logistics-project',
    title: 'Запущен новый логистический проект',
    date: '2026-03-15',
    excerpt: '[КРАТКОЕ ОПИСАНИЕ] Компания приступила к реализации крупного складского комплекса.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    content: '[ПОЛНЫЙ ТЕКСТ НОВОСТИ] Placeholder для полного текста новости. Здесь будет размещён детальный материал о событии, с фотографиями и фактами.',
  },
  {
    id: 2,
    slug: 'company-growth',
    title: 'ED GRUPP расширяет географию',
    date: '2026-02-01',
    excerpt: '[КРАТКОЕ ОПИСАНИЕ] Новые регионы присутствия и планы развития.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    content: '[ПОЛНЫЙ ТЕКСТ НОВОСТИ] Placeholder.',
  },
  {
    id: 3,
    slug: 'quality-standards',
    title: 'Внедрение новых стандартов качества',
    date: '2025-12-10',
    excerpt: '[КРАТКОЕ ОПИСАНИЕ] Обновлённые процессы контроля на всех этапах строительства.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356fd0?w=800&q=80',
    content: '[ПОЛНЫЙ ТЕКСТ НОВОСТИ] Placeholder.',
  },
]

export const getNewsBySlug = (slug) => news.find((n) => n.slug === slug)
