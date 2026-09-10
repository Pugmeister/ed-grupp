import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'

export default function NotFound() {
  return (
    <div className="min-h-[100svh] bg-ink text-paper flex flex-col items-center justify-center px-5 text-center">
      <span className="font-display text-[20vw] sm:text-[12rem] font-bold leading-none text-white/10 select-none">
        404
      </span>
      <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight -mt-8 sm:-mt-12 mb-4">
        Страница не найдена
      </h1>
      <p className="text-gray-400 max-w-md mb-10">
        Такого адреса нет. Возможно, объект переименовали или ссылка устарела.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button to="/" variant="accent">
          На главную
        </Button>
        <Link
          to="/projects"
          className="inline-flex items-center border border-white/20 px-6 py-3 text-sm hover:border-accent hover:text-accent transition-colors"
        >
          К проектам →
        </Link>
      </div>
    </div>
  )
}