export const projects = [
  {
    id: 1,
    slug: 'logistics-complex-a',
    title: 'Складской комплекс класса А',
    location: '[ЛОКАЦИЯ]',
    type: 'Логистика',
    area: '[ПЛОЩАДЬ] м²',
    status: 'Реализован',
    year: '[ГОД]',
    description: '[ОПИСАНИЕ] Крупный логистический комплекс с современной инфраструктурой и удобной транспортной доступностью.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356fd0?w=800&q=80',
    ],
    features: [
      { label: 'Площадь', value: '[ПЛОЩАДЬ] м²' },
      { label: 'Класс', value: 'A' },
      { label: 'Статус', value: 'Реализован' },
      { label: 'Год', value: '[ГОД]' },
    ],
    stages: [
      { title: 'Концепция', description: 'Анализ участка и финансовая модель' },
      { title: 'Проектирование', description: 'BIM-модели и инженерные системы' },
      { title: 'Строительство', description: 'Контроль качества и сроков' },
      { title: 'Сдача', description: 'Ввод в эксплуатацию' },
    ],
  },
  {
    id: 2,
    slug: 'commercial-center',
    title: 'Коммерческий центр',
    location: '[ЛОКАЦИЯ]',
    type: 'Коммерция',
    area: '[ПЛОЩАДЬ] м²',
    status: 'В строительстве',
    year: '[ГОД]',
    description: '[ОПИСАНИЕ] Офисно-торговый комплекс, генерирующий стабильный денежный поток.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    ],
    features: [
      { label: 'Площадь', value: '[ПЛОЩАДЬ] м²' },
      { label: 'Тип', value: 'Офисно-торговый' },
      { label: 'Статус', value: 'В строительстве' },
      { label: 'Год', value: '[ГОД]' },
    ],
    stages: [
      { title: 'Концепция', description: 'Анализ рынка и концепция' },
      { title: 'Проектирование', description: 'Архитектурные решения' },
      { title: 'Строительство', description: 'Активная фаза работ' },
    ],
  },
  {
    id: 3,
    slug: 'residential-complex',
    title: 'Жилой комплекс',
    location: '[ЛОКАЦИЯ]',
    type: 'Жильё',
    area: '[ПЛОЩАДЬ] м²',
    status: 'Реализован',
    year: '[ГОД]',
    description: '[ОПИСАНИЕ] Современный жилой комплекс с развитой инфраструктурой.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    ],
    features: [
      { label: 'Площадь', value: '[ПЛОЩАДЬ] м²' },
      { label: 'Тип', value: 'Жилой' },
      { label: 'Статус', value: 'Реализован' },
      { label: 'Год', value: '[ГОД]' },
    ],
    stages: [
      { title: 'Концепция', description: 'Градостроительный анализ' },
      { title: 'Проектирование', description: 'Архитектура и инженерия' },
      { title: 'Строительство', description: 'Возведение и отделка' },
      { title: 'Сдача', description: 'Передача ключей' },
    ],
  },
  {
    id: 4,
    slug: 'industrial-park',
    title: 'Индустриальный парк',
    location: '[ЛОКАЦИЯ]',
    type: 'Логистика',
    area: '[ПЛОЩАДЬ] м²',
    status: 'Проектирование',
    year: '[ГОД]',
    description: '[ОПИСАНИЕ] Инфраструктура, которая двигает экономику. Индустриальный парк нового поколения.',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80',
    ],
    features: [
      { label: 'Площадь', value: '[ПЛОЩАДЬ] м²' },
      { label: 'Тип', value: 'Индустриальный' },
      { label: 'Статус', value: 'Проектирование' },
      { label: 'Год', value: '[ГОД]' },
    ],
    stages: [
      { title: 'Концепция', description: 'Мастер-план территории' },
      { title: 'Проектирование', description: 'Инженерная подготовка' },
    ],
  },
]

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug)

export const projectTypes = ['Все', 'Логистика', 'Коммерция', 'Жильё']
export const projectStatuses = ['Все', 'Реализован', 'В строительстве', 'Проектирование']
