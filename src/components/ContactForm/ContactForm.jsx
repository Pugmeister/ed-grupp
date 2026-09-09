import { useState } from 'react'

/**
 * Универсальная форма обратной связи.
 * Endpoint берётся из VITE_FORM_ENDPOINT (env).
 * Пока без реального API — только UI и console log.
 */
export default function ContactForm({ title = 'Обсудить проект', className = '' }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    const endpoint = import.meta.env.VITE_FORM_ENDPOINT

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Network error')
      } else {
        // Placeholder — имитация
        await new Promise((r) => setTimeout(r, 800))
        console.log('Form data (endpoint not set):', form)
      }
      setStatus('success')
      setForm({ name: '', phone: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-5 ${className}`}
      noValidate
    >
      {title && (
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-paper mb-6">
          {title}
        </h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs tracking-wider uppercase text-gray-400 mb-2">
            Имя *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-white/20 py-3 text-paper placeholder-gray-600 focus:border-accent outline-none transition-colors"
            placeholder="Ваше имя"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs tracking-wider uppercase text-gray-400 mb-2">
            Телефон *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-white/20 py-3 text-paper placeholder-gray-600 focus:border-accent outline-none transition-colors"
            placeholder="+7 (___) ___-__-__"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-xs tracking-wider uppercase text-gray-400 mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-white/20 py-3 text-paper placeholder-gray-600 focus:border-accent outline-none transition-colors"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs tracking-wider uppercase text-gray-400 mb-2">
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-white/20 py-3 text-paper placeholder-gray-600 focus:border-accent outline-none transition-colors resize-none"
          placeholder="Кратко опишите проект"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-3.5 bg-accent text-paper font-medium tracking-wide hover:bg-paper hover:text-ink transition-all duration-300 disabled:opacity-60 interactive-hover"
        >
          {status === 'loading' ? 'Отправка…' : 'Отправить заявку'}
        </button>
      </div>

      {status === 'success' && (
        <p className="text-sm text-green-400">Заявка отправлена. Мы свяжемся с вами.</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-accent">Ошибка отправки. Попробуйте позже или позвоните нам.</p>
      )}
    </form>
  )
}
