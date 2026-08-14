import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 60,
      end: 'max',
      onUpdate: (self) => setScrolled(self.progress > 0),
    })
    return () => st.kill()
  }, [])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="CogniCoders home">
          <span className="brand-mark" aria-hidden="true" />
          <span>
            Cogni<em>Coders</em>
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-links">
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/solutions"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Solutions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/industries"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Industries
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/careers"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Careers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/internships"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Internships
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <Link to="/contact" className="btn btn-primary nav-cta">
          Book a demo
        </Link>
      </div>
    </header>
  )
}