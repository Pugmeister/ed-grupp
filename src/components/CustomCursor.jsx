import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine) and (min-width: 901px)').matches
    if (!isFine) return

    const onMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onHoverStart = () => setHovered(true)
    const onHoverEnd = () => setHovered(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const interactives = document.querySelectorAll('a, button, .interactive-hover')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onHoverStart)
      el.addEventListener('mouseleave', onHoverEnd)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverStart)
        el.removeEventListener('mouseleave', onHoverEnd)
      })
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`custom-cursor ${hovered ? 'hovered' : ''}`}
      style={{ left: position.x, top: position.y }}
    />
  )
}
