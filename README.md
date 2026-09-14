# ED GRUPP — Corporate Website

Современный корпоративный сайт строительной компании ED GRUPP.

## Стек

- React 19
- Vite 6
- React Router 7
- Tailwind CSS 3
- JavaScript (ES modules)

## Быстрый старт

```bash
npm install
npm run dev
```

Сайт откроется на http://localhost:5173

## Сборка

```bash
npm run build
npm run preview
```

## Структура

```
src/
├── components/     # UI-компоненты (Header, Footer, ProjectCard, ContactForm...)
├── pages/          # Страницы (Home, Projects, Project, Services...)
├── data/           # Данные (projects, services, news) — не хардкод в JSX
├── assets/
├── App.jsx
├── main.jsx
└── index.css
```

## Маршруты

| Путь | Страница |
|------|----------|
| `/` | Главная |
| `/projects` | Каталог проектов + фильтры |
| `/projects/:slug` | Карточка проекта |
| `/services` | Услуги |
| `/services/:slug` | Страница услуги |
| `/about` | О компании |
| `/news` | Новости |
| `/news/:slug` | Статья |
| `/career` | Карьера / вакансии |
| `/contacts` | Контакты + форма |

## Данные

Все проекты, услуги и новости лежат в `src/data/`.  
Используются placeholder-значения `[ПЛОЩАДЬ]`, `[ЛОКАЦИЯ]` и т.д. — замените на реальные.

## Форма

`ContactForm` готов к подключению существующего endpoint:

```env
VITE_FORM_ENDPOINT=https://your-form-endpoint
```

## Дизайн

Основан на editorial-стиле:

- Тёмная тема (ink `#0A0A0A`, paper `#F4F4F0`, accent `#FF3B30`)
- Шрифты: Oswald (display) + Manrope (body)
- Крупная типографика, горизонтальный скролл процесса, parallax, custom cursor (desktop)

## Деплой

После сборки (`dist/`) можно разместить на REG.RU / любом static-хостинге.  
WordPress на edgrupp.ru будет заменён после готовности.

## Дальнейшие шаги

1. Заполнить реальные данные в `src/data/`
2. Подключить endpoint формы
3. Добавить реальные изображения объектов
4. SEO: sitemap, Open Graph изображения, structured data
5. Тестовый поддомен → продакшн
