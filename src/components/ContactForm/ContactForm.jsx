import { useState, useRef } from 'react'

const ACCEPT =
  '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar,application/pdf'
const MAX_MB = 15

/** Маска РФ: +7 (999) 999-99-99; 8 → 7 */
function formatPhone(input) {
  let digits = String(input).replace(/\D/g, '')

  if (digits.startsWith('8')) digits = '7' + digits.slice(1)
  if (digits.startsWith('9')) digits = '7' + digits
  if (!digits.startsWith('7') && digits.length > 0) digits = '7' + digits
  digits = digits.slice(0, 11)

  if (digits.length === 0) return ''
  if (digits.length === 1) return '+7'
  if (digits.length <= 4) return `+7 (${digits.slice(1)}`
  if (digits.length <= 7)
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
  if (digits.length <= 9)
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
}

function isValidEmail(value) {
  if (!value.trim()) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/**
 * Отправка на свой PHP (VITE_FORM_ENDPOINT → .../send.php)
 * Файл уходит полем upload (multipart).
 */
export default function ContactForm({
                                      title = 'Есть техзадание?',
                                      className = '',
                                    }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    company: '',
  })
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [errorDetail, setErrorDetail] = useState('')
  const fileRef = useRef(null)

  const clearError = (name) => {
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      setForm((prev) => ({ ...prev, phone: formatPhone(value) }))
      clearError('phone')
      return
    }
    setForm((prev) => ({ ...prev, [name]: value }))
    clearError(name)
  }

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) {
      setFile(null)
      clearError('file')
      return
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        file: `Файл больше ${MAX_MB} МБ — сожмите или отправьте архивом`,
      }))
      setFile(null)
      e.target.value = ''
      return
    }
    setFile(f)
    clearError('file')
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Укажите имя'

    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 11) {
      next.phone = 'Введите телефон полностью: +7 (999) 999-99-99'
    }

    if (!isValidEmail(form.email)) {
      next.email = 'Некорректный email. Пример: name@company.ru'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.company) return

    if (!validate()) {
      setStatus('idle')
      setErrorDetail('')
      return
    }

    setStatus('loading')
    setErrorDetail('')
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT

    if (!endpoint) {
      setStatus('error')
      setErrorDetail('Не задан VITE_FORM_ENDPOINT')
      return
    }

    try {
      const body = new FormData()
      body.append('name', form.name.trim())
      body.append('phone', form.phone.trim())
      body.append('email', form.email.trim())
      body.append('message', form.message.trim())
      if (file) {
        body.append('upload', file, file.name)
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(
          data.error || data.message || `Ошибка сервера ${res.status}`
        )
      }

      setStatus('success')
      setForm({ name: '', phone: '', email: '', message: '', company: '' })
      setFile(null)
      setErrors({})
      if (fileRef.current) fileRef.current.value = ''
    } catch (err) {
      setStatus('error')
      setErrorDetail(err.message || 'Не удалось отправить')
    }
  }

  const inputCls = (name) =>
    `w-full bg-transparent border-b py-3 text-paper placeholder-gray-600 outline-none transition-colors ${
      errors[name] ? 'border-accent' : 'border-white/20 focus:border-accent'
    }`

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-5 ${className}`}
      noValidate
    >
      {title && (
        <div className="mb-6">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-paper">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Сделаем проект и построим «под ключ». Можно прикрепить ТЗ или планировку.
          </p>
        </div>
      )}

      <input
        type="text"
        name="company"
        value={form.company}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-xs tracking-wider uppercase text-gray-400 mb-2"
          >
            Имя *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={inputCls('name')}
            placeholder="Как к вам обращаться"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-accent">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-xs tracking-wider uppercase text-gray-400 mb-2"
          >
            Телефон *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className={inputCls('phone')}
            placeholder="+7 (999) 999-99-99"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-accent">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs tracking-wider uppercase text-gray-400 mb-2"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={inputCls('email')}
          placeholder="email@example.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-accent">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs tracking-wider uppercase text-gray-400 mb-2"
        >
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-white/20 py-3 text-paper placeholder-gray-600 focus:border-accent outline-none transition-colors resize-none"
          placeholder="Регион, тип объекта, сроки — кратко о задаче"
        />
      </div>

      <div>
        <label
          htmlFor="attachment"
          className="block text-xs tracking-wider uppercase text-gray-400 mb-2"
        >
          Файл (ТЗ, планировка, PDF)
        </label>
        <input
          ref={fileRef}
          id="attachment"
          name="upload"
          type="file"
          accept={ACCEPT}
          onChange={handleFile}
          className="block w-full text-sm text-gray-400
            file:mr-4 file:py-2 file:px-4
            file:border-0 file:bg-white/10 file:text-paper
            file:text-xs file:tracking-wider file:uppercase
            hover:file:bg-accent hover:file:text-paper
            file:transition-colors file:cursor-pointer
            cursor-pointer"
        />
        <p className="mt-2 text-xs text-gray-500">
          PDF, Word, Excel, JPG, PNG, ZIP — до {MAX_MB} МБ
        </p>
        {file && !errors.file && (
          <p className="mt-1 text-xs text-gray-300">
            Выбрано: {file.name} ({(file.size / 1024 / 1024).toFixed(1)} МБ)
          </p>
        )}
        {errors.file && (
          <p className="mt-1.5 text-xs text-accent">{errors.file}</p>
        )}
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
        <p className="text-sm text-green-400">
          Заявка отправлена. Мы свяжемся с вами в рабочее время.
        </p>
      )}
      {status === 'error' && (
        <div className="text-sm text-accent space-y-1">
          <p>
            Не удалось отправить.{' '}
            <a href="tel:+78612054480" className="underline hover:text-paper">
              +7 (861) 205-44-80
            </a>
          </p>
          {errorDetail && (
            <p className="text-xs text-gray-500">{errorDetail}</p>
          )}
        </div>
      )}
    </form>
  )
}