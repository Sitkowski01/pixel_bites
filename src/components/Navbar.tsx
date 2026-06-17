import { useEffect, useState } from 'react'
import { navLinks } from '../data/site'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Blokuj scroll tła, gdy menu mobilne jest otwarte.
  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  // Zamknij menu klawiszem Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav className="site-nav" aria-label="Główna nawigacja">
        <a href="#" className="logo interactive">PIXEL BITES</a>

        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link interactive">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="nav-toggle interactive"
          aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`nav-toggle-bars ${open ? 'is-open' : ''}`} aria-hidden="true"></span>
        </button>
      </nav>

      {/* Menu mobilne RENDEROWANE POZA <nav> — navbar ma backdrop-filter, który
          tworzyłby containing block dla position:fixed i psuł pełnoekranowe menu. */}
      <div id="mobile-menu" className={`mobile-menu ${open ? 'open' : ''}`} hidden={!open}>
        <ul>
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link interactive" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
