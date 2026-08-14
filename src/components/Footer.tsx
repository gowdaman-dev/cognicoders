import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, EnvelopeSimple } from '@phosphor-icons/react'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

gsap.registerPlugin(ScrollTrigger)

const SOLUTIONS = [
  { slug: 'face-recognition-system', name: 'Face Recognition System' },
  { slug: 'visitor-management-system', name: 'Visitor Management System' },
  { slug: 'time-and-attendance-system', name: 'Time & Attendance System' },
  { slug: 'safety-induction-system', name: 'Safety Induction System' },
  { slug: 'meal-management-system', name: 'Meal Management System' },
  { slug: 'queue-management-system', name: 'Queue Management System' },
]

export function Footer() {
  const root = useRef<HTMLElement>(null)
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.foot-col, .foot-brand',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: 'top 85%' },
        },
      )
      gsap.fromTo(
        '.foot-wordmark',
        { yPercent: 35 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <footer ref={root} className="footer">
      <div className="container">
        <div className="foot-top">
          <div className="foot-brand foot-col">
            <Link to="/" className="brand" aria-label="CogniCoders home">
              <span className="brand-mark" aria-hidden="true" />
              <span>
                Cogni<em>Coders</em>
              </span>
            </Link>
            <p className="foot-tag">
              Engineering intelligent software for the security & identification,
              healthcare, and enterprise sectors.
            </p>
          </div>

          <nav className="foot-col" aria-label="Solutions">
            <h4 className="foot-label mono">Solutions</h4>
            <ul className="foot-list">
              {SOLUTIONS.map((s) => (
                <li key={s.slug}>
                  <Link to={`/solutions/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="foot-col" aria-label="Company">
            <h4 className="foot-label mono">Company</h4>
            <ul className="foot-list">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/internships">Internships</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          <div className="foot-col foot-contact">
            <h4 className="foot-label mono">Contact</h4>
            <p className="foot-line">
              <MapPin size={15} weight="regular" aria-hidden="true" />
              Bengaluru, Karnataka
            </p>
            <p className="foot-line">
              <MapPin size={15} weight="regular" aria-hidden="true" />
              Tirunelveli, Tamil Nadu
            </p>
            <a className="foot-line" href="mailto:info@cognicoders.in">
              <EnvelopeSimple size={15} weight="regular" aria-hidden="true" />
              info@cognicoders.in
            </a>
            <p className="foot-hours mono">Mon–Fri · 9:00 AM – 6:00 PM</p>
          </div>
        </div>

        <div className="foot-wordmark" aria-hidden="true">
          CogniCoders
        </div>

        <div className="foot-bottom">
          <p className="mono">© 2026 Cognicoders Pvt Ltd. All rights reserved.</p>
          <div className="foot-legal">
            <Link to="/" className="mono">
              Privacy Policy
            </Link>
            <Link to="/" className="mono">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}