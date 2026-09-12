// География присутствия ED GRUPP
// coords — координаты в viewBox карты 0 0 1200 700
// Считаются в единой проекции с картой (см. Geography.jsx)
// group: 'ru' — регионы России, 'intl' — международные проекты

export const regions = [
  {
    id: 1,
    name: 'Московская область',
    short: 'Московская обл.',
    coords: { x: 306, y: 324 },
    projectSlug: 'logistics-complex-a',
    description: 'Складские и логистические комплексы класса А',
    group: 'ru',
  },
  {
    id: 2,
    name: 'Краснодарский край',
    short: 'Краснодарский край',
    coords: { x: 316, y: 466 },
    projectSlug: 'commercial-center',
    description: 'Коммерческая недвижимость и торговые объекты',
    group: 'ru',
  },
  {
    id: 3,
    name: 'Ростовская область',
    short: 'Ростовская обл.',
    coords: { x: 321, y: 437 },
    projectSlug: 'residential-complex',
    description: 'Жилищное строительство',
    group: 'ru',
  },
  {
    id: 4,
    name: 'Ставропольский край',
    short: 'Ставропольский край',
    coords: { x: 337, y: 466 },
    projectSlug: 'industrial-park',
    description: 'Промышленные и инфраструктурные объекты',
    group: 'ru',
  },
  {
    id: 5,
    name: 'Волгоградская область',
    short: 'Волгоградская обл.',
    coords: { x: 355, y: 418 },
    projectSlug: 'logistics-complex-a',
    description: 'Логистические комплексы',
    group: 'ru',
  },
  {
    id: 6,
    name: 'Свердловская область',
    short: 'Свердловская обл.',
    coords: { x: 467, y: 310 },
    projectSlug: 'commercial-center',
    description: 'Коммерческие объекты',
    group: 'ru',
  },
  {
    id: 7,
    name: 'Тюменская область',
    short: 'Тюменская обл.',
    coords: { x: 502, y: 306 },
    projectSlug: 'industrial-park',
    description: 'Промышленное строительство',
    group: 'ru',
  },
  {
    id: 8,
    name: 'Азербайджан',
    short: 'Азербайджан',
    coords: { x: 392, y: 527 }, // Баку — совпадает с нарисованной страной на карте
    projectSlug: null,
    description: 'Международный опыт реализации проектов',
    group: 'intl',
  },
]