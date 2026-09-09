/**
 * Путь к файлу из public/ с учётом base (local / GitHub Pages / продакшн)
 * @example img('images/logistics.jpg') → '/ed-grupp/images/logistics.jpg' на Pages
 */
export function img(path) {
  const base = import.meta.env.BASE_URL || '/'
  const clean = String(path).replace(/^\//, '')
  return `${base}${clean}`
}