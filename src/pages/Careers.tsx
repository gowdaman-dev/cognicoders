import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RocketLaunch, TrendUp, Cpu, UsersThree, Sun, ArrowUpRight, PaperPlaneTilt, Paperclip } from '@phosphor-icons/react'
import { prefersReducedMotion, scrollToSection } from '../hooks/useSmoothScroll'
import { Footer } from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

const REASONS = [
  {
    icon: RocketLaunch,
    title: 'Meaningful work',
    desc: 'Your code runs real, mission-critical operations — the software that keeps facilities secure and hospitals running.',
    wide: true,
  },
  {
    icon: TrendUp,
    title: 'Growth',
    desc: 'Continuous learning, mentorship and clear career paths.',
  },
  {
    icon: Cpu,
    title: 'Modern tech',
    desc: 'Work with AI, cloud and contemporary engineering practices.',
  },
  {
    icon: UsersThree,
    title: 'Collaborative culture',
    desc: 'Supportive teams, flat communication and shared wins.',
  },
  {
    icon: Sun,
    title: 'Work-life balance',
    desc: 'We respect your time and wellbeing.',
  },
]

const POSITIONS = [
  'Software Engineer — Backend',
  'Frontend Developer — React',
  'AI / Computer Vision Engineer',
  'QA Engineer',
  'UI/UX Designer',
  'Implementation & Support Specialist',
  'General Application',
]

interface FormState {
  name: string
  email: string
  phone: string
  position: string
  location: string
  experience: string
  linkedin: string
  cv: string
  message: string
  consent: boolean
}

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  position: '',
  location: '',
  experience: '',
  linkedin: '',
  cv: '',
  message: '',
  consent: false,
}

export function CareersPage() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.to('.cr-hero .line > span', {
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.1,
      })
      gsap.fromTo(
        '.cr-hero .ih-eyebrow, .cr-hero .ih-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.35 },
      )

      gsap.fromTo(
        '.cr-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.cr-grid', start: 'top 78%' },
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

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    setForm((prev) => ({ ...prev, cv: f ? f.name : '' }))
    setError('')
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.position || !form.cv) {
      setError('Please complete the required fields, including your CV.')
      return
    }
    if (!form.consent) {
      setError('Please accept the data-processing consent to apply.')
      return
    }
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Position: ${form.position}`,
      `Location: ${form.location}`,
      `Years of experience: ${form.experience}`,
      `LinkedIn / Portfolio: ${form.linkedin}`,
      `CV: ${form.cv} (please attach)`,
      '',
      `Message:\n${form.message}`,
      '',
      'Consent: granted for storage and processing for recruitment purposes.',
    ].join('\n')
    window.location.href = `mailto:info@cognicoders.in?subject=${encodeURIComponent(
      `Application — ${form.name}`,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div ref={root}>
      <section className="cr-hero ind-hero">
        <div className="ind-hero-bg" aria-hidden="true" />
        <div className="container ind-hero-inner">
          <p className="ih-eyebrow mono">
            <span className="dot" aria-hidden="true" />
            Careers
          </p>
          <h1 className="ih-title">
            <span className="line">
              <span>Build software</span>
            </span>
            <span className="line">
              <span>
                that <em>matters.</em>
              </span>
            </span>
          </h1>
          <p className="ih-sub">
            Work on products that keep facilities secure, hospitals running and
            businesses moving — with the ownership and support to do your best
            work.
          </p>
        </div>
      </section>

      <section className="cr-why">
        <div className="container">
          <p className="solutions-index mono" aria-hidden="true">
            Why work with us / 05
          </p>
          <h2 className="about-section-title">
            A place <em>to grow.</em>
          </h2>
          <div className="cr-grid">
            {REASONS.map((r, i) => {
              const Icon = r.icon
              return (
                <article key={r.title} className={`cr-card${r.wide ? ' wide' : ''}`}>
                  <div className="cr-top">
                    <span className="cr-icon" aria-hidden="true">
                      <Icon size={24} weight="regular" />
                    </span>
                    <span className="mono cr-num">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="cr-title">{r.title}</h3>
                  <p className="cr-desc">{r.desc}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="cr-open">
        <div className="container cr-open-inner">
          <div className="cr-open-head">
            <p className="solutions-index mono" aria-hidden="true">
              Open positions / 02
            </p>
            <h2 className="cr-open-title">Current openings</h2>
          </div>
          <p className="cr-open-note">
            There are no current openings listed. We still welcome general
            applications — use the form below.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => scrollToSection('apply')}
          >
            Apply now
            <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="apply-section" id="apply">
        <div className="container apply-grid">
          <div className="apply-head apply-reveal">
            <p className="solutions-index mono" aria-hidden="true">
              Apply / 03
            </p>
            <h2 className="about-section-title">
              Submit your <em>application.</em>
            </h2>
            <p className="apply-lede">
              Attach your CV and tell us a little about yourself. No role fits?
              Send a general application — we'd still love to hear from you.
            </p>
          </div>

          <form className="apply-form apply-reveal" onSubmit={onSubmit} noValidate>
            <div className="apply-field">
              <label className="apply-label mono" htmlFor="cr-name">
                Full name <span className="req">*</span>
              </label>
              <input
                id="cr-name"
                className="apply-input"
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) => set('name')(e.target.value)}
              />
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="cr-email">
                Email address <span className="req">*</span>
              </label>
              <input
                id="cr-email"
                className="apply-input"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => set('email')(e.target.value)}
              />
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="cr-phone">
                Phone number <span className="req">*</span>
              </label>
              <input
                id="cr-phone"
                className="apply-input"
                type="tel"
                placeholder="+91 …"
                value={form.phone}
                onChange={(e) => set('phone')(e.target.value)}
              />
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="cr-position">
                Position applying for <span className="req">*</span>
              </label>
              <select
                id="cr-position"
                className="apply-input"
                value={form.position}
                onChange={(e) => set('position')(e.target.value)}
              >
                <option value="" disabled>
                  Select a role
                </option>
                {POSITIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="cr-location">
                Current location
              </label>
              <input
                id="cr-location"
                className="apply-input"
                type="text"
                placeholder="City, Country"
                value={form.location}
                onChange={(e) => set('location')(e.target.value)}
              />
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="cr-exp">
                Years of experience
              </label>
              <input
                id="cr-exp"
                className="apply-input"
                type="text"
                placeholder="e.g. 3 years"
                value={form.experience}
                onChange={(e) => set('experience')(e.target.value)}
              />
            </div>

            <div className="apply-field apply-span2">
              <label className="apply-label mono" htmlFor="cr-linkedin">
                LinkedIn / Portfolio URL
              </label>
              <input
                id="cr-linkedin"
                className="apply-input"
                type="url"
                placeholder="https://"
                value={form.linkedin}
                onChange={(e) => set('linkedin')(e.target.value)}
              />
            </div>

            <div className="apply-field apply-span2">
              <label className="apply-label mono" htmlFor="cr-cv">
                Upload CV / Resume <span className="req">*</span>
              </label>
              <label className="apply-file" htmlFor="cr-cv">
                <Paperclip size={16} weight="regular" aria-hidden="true" />
                <span className={form.cv ? 'apply-file-name' : ''}>
                  {form.cv || 'Choose a PDF, DOC or DOCX — max 5 MB'}
                </span>
              </label>
              <input
                id="cr-cv"
                className="apply-file-input"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={onFile}
              />
            </div>

            <div className="apply-field apply-span2">
              <label className="apply-label mono" htmlFor="cr-msg">
                Cover letter / Message
              </label>
              <textarea
                id="cr-msg"
                className="apply-input apply-textarea"
                rows={5}
                placeholder="Tell us a little about yourself…"
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
              <span>
                I consent to Cognicoders storing and processing my data for
                recruitment purposes.
              </span>
            </label>

            {error && <p className="apply-error apply-span2">{error}</p>}

            <div className="apply-submit apply-span2">
              {sent ? (
                <p className="apply-sent mono">
                  Opening your email client… If it doesn't open, write to{' '}
                  <a href="mailto:info@cognicoders.in">info@cognicoders.in</a> and
                  attach your CV.
                </p>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Submit application
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