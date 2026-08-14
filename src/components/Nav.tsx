import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrandLogo } from './BrandLogo'
import { lockScroll } from '../hooks/useSmoothScroll'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { to: '/about', label: 'About' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/industries', label: 'Industries' },
  { to: '/services', label: 'Services' },
  { to: '/careers', label: 'Careers' },
  { to: '/internships', label: 'Internships' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 60,
      end: 'max',
      onUpdate: (self) => setScrolled(self.progress > 0),
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    lockScroll(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      lockScroll(false)
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="CogniCoders home" onClick={() => setOpen(false)}>
          <BrandLogo />
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/contact" className="btn btn-primary nav-cta">
          Book a demo
        </Link>

        <button
          type="button"
          className={`nav-burger${open ? ' open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {createPortal(
        <div className={`nav-menu${open ? ' open' : ''}`} id="nav-menu" aria-hidden={!open}>
          <nav aria-label="Mobile">
            <ul className="nav-menu-list">
              {LINKS.map((l, i) => (
                <li key={l.to} style={{ '--i': i } as React.CSSProperties}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                    tabIndex={open ? 0 : -1}
                  >
                    <span className="nav-menu-index mono">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn-primary nav-menu-cta" tabIndex={open ? 0 : -1}>
              Book a demo
            </Link>
          </nav>
          <p className="nav-menu-foot mono">info@cognicoders.in</p>
        </div>,
        document.body,
      )}
    </header>
  )
}
