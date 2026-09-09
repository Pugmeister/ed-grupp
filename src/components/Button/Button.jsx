import { Link } from 'react-router-dom'

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center gap-2 font-medium tracking-wide transition-all duration-300 interactive-hover'

  const variants = {
    primary:
      'px-6 py-3 border border-paper text-paper hover:bg-paper hover:text-ink',
    accent:
      'px-6 py-3 bg-accent text-paper border border-accent hover:bg-transparent hover:text-accent',
    ghost:
      'border-b border-current pb-1 hover:text-accent hover:border-accent',
    dark:
      'px-6 py-3 border border-ink text-ink hover:bg-ink hover:text-paper',
  }

  const classes = `${base} ${variants[variant] || variants.primary} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  )
}
