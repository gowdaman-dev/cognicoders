import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, EnvelopeSimple, Clock, PaperPlaneTilt } from '@phosphor-icons/react'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'
import { Footer } from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

const CONTACT_ITEMS = [
  { icon: MapPin, label: 'Bengaluru Office', value: 'Bengaluru, Karnataka, India' },
  { icon: MapPin, label: 'Tirunelveli Office', value: 'Tirunelveli, Tamil Nadu, India' },
  { icon: EnvelopeSimple, label: 'Email', value: 'info@cognicoders.in', href: 'mailto:info@cognicoders.in' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri, 9:00 AM – 6:00 PM' },
]

const INTERESTS = [
  'Request a Demo',
  'Face Recognition System',
  'Visitor Management System',
  'Time & Attendance System',
  'Hospital Management System',
  'HRMS',
  'ERP',
  'Custom Project',
  'Support',
  'Partnership',
]

interface FormState {
  name: string
  company: string
  email: string
  phone: string
  interest: string
  message: string
  consent: boolean
}

const EMPTY: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  interest: '',
  message: '',
  consent: false,
}

export function ContactPage() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.to('.ct-hero .line > span', {
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.1,
      })
      gsap.fromTo(
        '.ct-hero .ih-eyebrow, .ct-hero .ih-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.35 },
      )

      gsap.fromTo(
        '.ct-info-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.ct-info', start: 'top 80%' },
        },
      )

      gsap.fromTo(
        '.apply-reveal',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.apply-section', start: 'top 78%' },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  const set = (k: keyof FormState) => (v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }))
    setError('')
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please complete the required fields and your message.')
      return
    }
    if (!form.consent) {
      setError('Please agree to be contacted by Cognicoders.')
      return
    }
    const body = [
      `Name: ${form.name}`,
      `Company / Organization: ${form.company}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Area of interest: ${form.interest || 'General'}`,
      '',
      `Message:\n${form.message}`,
    ].join('\n')
    window.location.href = `mailto:info@cognicoders.in?subject=${encodeURIComponent(
      `Enquiry — ${form.interest || 'General'}`,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div ref={root}>
      <section className="ct-hero ind-hero">
        <div className="ind-hero-bg" aria-hidden="true" />
        <div className="container ind-hero-inner">
          <p className="ih-eyebrow mono">
            <span className="dot" aria-hidden="true" />
            Contact
          </p>
          <h1 className="ih-title">
            <span className="line">
              <span>Let's talk about</span>
            </span>
            <span className="line">
              <span>
                what you want to <em>build.</em>
              </span>
            </span>
          </h1>
          <p className="ih-sub">
            Ready for a demo, exploring a custom project, or just have a
            question? We'll respond promptly.
          </p>
        </div>
      </section>

      <section className="ct-info-section">
        <div className="container">
          <div className="ct-head">
            <p className="solutions-index mono" aria-hidden="true">
              Get in touch / 04
            </p>
            <h2 className="about-section-title">
              Whether you need a single solution or a full platform, our team
              is here to <em>help.</em>
            </h2>
          </div>
          <div className="ct-info">
            {CONTACT_ITEMS.map((c) => {
              const Icon = c.icon
              return (
                <div key={c.label} className="ct-info-item">
                  <span className="ct-info-icon" aria-hidden="true">
                    <Icon size={22} weight="regular" />
                  </span>
                  <span className="mono ct-info-label">{c.label}</span>
                  {c.href ? (
                    <a href={c.href} className="ct-info-value">
                      {c.value}
                    </a>
                  ) : (
                    <span className="ct-info-value">{c.value}</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="apply-section" id="contact-form">
        <div className="container apply-grid">
          <div className="apply-head apply-reveal">
            <p className="solutions-index mono" aria-hidden="true">
              Send a message / 05
            </p>
            <h2 className="about-section-title">
              Drop us a <em>line.</em>
            </h2>
            <p className="apply-lede">
              Tell us what you're building or what you'd like to learn about —
              we'll get back to you within one business day.
            </p>
          </div>

          <form className="apply-form apply-reveal" onSubmit={onSubmit} noValidate>
            <div className="apply-field">
              <label className="apply-label mono" htmlFor="ct-name">
                Full name <span className="req">*</span>
              </label>
              <input
                id="ct-name"
                className="apply-input"
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) => set('name')(e.target.value)}
              />
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="ct-company">
                Company / Organization
              </label>
              <input
                id="ct-company"
                className="apply-input"
                type="text"
                placeholder="Acme Corp"
                value={form.company}
                onChange={(e) => set('company')(e.target.value)}
              />
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="ct-email">
                Email address <span className="req">*</span>
              </label>
              <input
                id="ct-email"
                className="apply-input"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => set('email')(e.target.value)}
              />
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="ct-phone">
                Phone number
              </label>
              <input
                id="ct-phone"
                className="apply-input"
                type="tel"
                placeholder="+91 …"
                value={form.phone}
                onChange={(e) => set('phone')(e.target.value)}
              />
            </div>

            <div className="apply-field apply-span2">
              <label className="apply-label mono" htmlFor="ct-interest">
                Area of interest
              </label>
              <select
                id="ct-interest"
                className="apply-input"
                value={form.interest}
                onChange={(e) => set('interest')(e.target.value)}
              >
                <option value="" disabled>
                  What are you interested in?
                </option>
                {INTERESTS.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            <div className="apply-field apply-span2">
              <label className="apply-label mono" htmlFor="ct-message">
                Message <span className="req">*</span>
              </label>
              <textarea
                id="ct-message"
                className="apply-input apply-textarea"
                rows={5}
                placeholder="Tell us about your project…"
                value={form.message}
                onChange={(e) => set('message')(e.target.value)}
              />
            </div>

            <label className="apply-consent apply-span2">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set('consent')(e.target.checked)}
              />
              <span>I agree to be contacted by Cognicoders regarding my enquiry.</span>
            </label>

            {error && <p className="apply-error apply-span2">{error}</p>}

            <div className="apply-submit apply-span2">
              {sent ? (
                <p className="apply-sent mono">
                  Opening your email client… If it doesn't open, write to{' '}
                  <a href="mailto:info@cognicoders.in">info@cognicoders.in</a>.
                </p>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Send message
                  <PaperPlaneTilt size={18} weight="bold" aria-hidden="true" />
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}