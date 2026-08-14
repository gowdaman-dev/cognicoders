import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, ChalkboardTeacher, TrendUp, Certificate, ArrowFatLineUp, UsersThree, CheckCircle, PaperPlaneTilt, Paperclip } from '@phosphor-icons/react'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'
import { Footer } from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

const GAINS = [
  { icon: Code, title: 'Hands-on projects', desc: 'Contribute to real products used by real clients.' },
  { icon: ChalkboardTeacher, title: 'Mentorship', desc: 'Learn directly from senior engineers and designers.' },
  { icon: TrendUp, title: 'Skill development', desc: 'Grow in modern technologies and professional practices.' },
  { icon: Certificate, title: 'Certificate & recognition', desc: 'Receive a completion certificate and reference.' },
  { icon: ArrowFatLineUp, title: 'Pathway to full-time', desc: 'Top performers may be offered permanent roles.' },
  { icon: UsersThree, title: 'Real team experience', desc: 'Work within agile teams and modern workflows.' },
]

const TRACKS = [
  'Software Development',
  'AI & Computer Vision',
  'QA & Testing',
  'UI/UX Design',
  'Business & Implementation',
]

const ELIGIBILITY = [
  'Students in their final years of study or recent graduates.',
  'Candidates eager to learn and contribute in a fast-paced team.',
  'Basic foundational knowledge relevant to the chosen track.',
]

interface FormState {
  name: string
  email: string
  phone: string
  college: string
  course: string
  track: string
  startDate: string
  duration: string
  portfolio: string
  cv: string
  why: string
  consent: boolean
}

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  college: '',
  course: '',
  track: '',
  startDate: '',
  duration: '',
  portfolio: '',
  cv: '',
  why: '',
  consent: false,
}

export function InternshipsPage() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.to('.in-hero .line > span', {
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.1,
      })
      gsap.fromTo(
        '.in-hero .ih-eyebrow, .in-hero .ih-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.35 },
      )

      gsap.fromTo(
        '.in-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: '.in-grid', start: 'top 78%' },
        },
      )

      gsap.fromTo(
        '.in-track',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.05,
          scrollTrigger: { trigger: '.in-tracks-row', start: 'top 80%' },
        },
      )

      gsap.fromTo(
        '.in-elig-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.in-elig-list', start: 'top 80%' },
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

  const pickTrack = (t: string) => set('track')(t)

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    setForm((prev) => ({ ...prev, cv: f ? f.name : '' }))
    setError('')
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.track || !form.cv || !form.why) {
      setError('Please complete the required fields, including your CV and your motivation.')
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
      `College / University: ${form.college}`,
      `Course & year: ${form.course}`,
      `Track: ${form.track}`,
      `Preferred start: ${form.startDate}`,
      `Preferred duration: ${form.duration}`,
      `Portfolio / GitHub: ${form.portfolio}`,
      `CV: ${form.cv} (please attach)`,
      '',
      `Why intern with us:\n${form.why}`,
      '',
      'Consent: granted for storage and processing for recruitment purposes.',
    ].join('\n')
    window.location.href = `mailto:info@cognicoders.in?subject=${encodeURIComponent(
      `Internship Application — ${form.name}`,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div ref={root}>
      <section className="in-hero ind-hero">
        <div className="ind-hero-bg" aria-hidden="true" />
        <div className="container ind-hero-inner">
          <p className="ih-eyebrow mono">
            <span className="dot" aria-hidden="true" />
            Internships
          </p>
          <h1 className="ih-title">
            <span className="line">
              <span>Start your career</span>
            </span>
            <span className="line">
              <span>
                with <em>real-world</em> experience.
              </span>
            </span>
          </h1>
          <p className="ih-sub">
            Work alongside experienced engineers on live projects, gain
            mentorship, and build a portfolio that sets you apart — not just
            fetch coffee.
          </p>
        </div>
      </section>

      <section className="cr-why">
        <div className="container">
          <p className="solutions-index mono" aria-hidden="true">
            What you'll gain / 06
          </p>
          <h2 className="about-section-title">
            More than <em>an internship.</em>
          </h2>
          <div className="in-grid">
            {GAINS.map((g, i) => {
              const Icon = g.icon
              return (
                <article key={g.title} className="in-card">
                  <div className="in-top">
                    <span className="in-icon" aria-hidden="true">
                      <Icon size={22} weight="regular" />
                    </span>
                    <span className="mono in-num">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="in-title">{g.title}</h3>
                  <p className="in-desc">{g.desc}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="in-tracks">
        <div className="container">
          <p className="solutions-index mono" aria-hidden="true">
            Tracks / 05
          </p>
          <h2 className="about-section-title">
            Internship <em>tracks.</em>
          </h2>
          <div className="in-tracks-row">
            {TRACKS.map((t, i) => (
              <button
                key={t}
                type="button"
                className={`in-track${form.track === t ? ' active' : ''}`}
                onClick={() => pickTrack(t)}
              >
                <span className="t-num">{String(i + 1).padStart(2, '0')}</span>
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="in-elig">
        <div className="container in-elig-grid">
          <div>
            <p className="solutions-index mono" aria-hidden="true">
              Eligibility / 03
            </p>
            <h2 className="about-section-title">
              Who can <em>apply.</em>
            </h2>
          </div>
          <ul className="in-elig-list">
            {ELIGIBILITY.map((e) => (
              <li key={e} className="in-elig-item">
                <CheckCircle size={20} weight="bold" aria-hidden="true" />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="apply-section" id="apply">
        <div className="container apply-grid">
          <div className="apply-head apply-reveal">
            <p className="solutions-index mono" aria-hidden="true">
              Apply / 04
            </p>
            <h2 className="about-section-title">
              Apply for <em>an internship.</em>
            </h2>
            <p className="apply-lede">
              Tell us your track, attach your CV, and share why you'd like to
              intern with us.
            </p>
          </div>

          <form className="apply-form apply-reveal" onSubmit={onSubmit} noValidate>
            <div className="apply-field">
              <label className="apply-label mono" htmlFor="in-name">
                Full name <span className="req">*</span>
              </label>
              <input
                id="in-name"
                className="apply-input"
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) => set('name')(e.target.value)}
              />
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="in-email">
                Email address <span className="req">*</span>
              </label>
              <input
                id="in-email"
                className="apply-input"
                type="email"
                placeholder="you@university.edu"
                value={form.email}
                onChange={(e) => set('email')(e.target.value)}
              />
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="in-phone">
                Phone number <span className="req">*</span>
              </label>
              <input
                id="in-phone"
                className="apply-input"
                type="tel"
                placeholder="+91 …"
                value={form.phone}
                onChange={(e) => set('phone')(e.target.value)}
              />
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="in-college">
                College / University
              </label>
              <input
                id="in-college"
                className="apply-input"
                type="text"
                placeholder="Institution name"
                value={form.college}
                onChange={(e) => set('college')(e.target.value)}
              />
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="in-course">
                Course & year of study
              </label>
              <input
                id="in-course"
                className="apply-input"
                type="text"
                placeholder="B.Tech CSE, 3rd year"
                value={form.course}
                onChange={(e) => set('course')(e.target.value)}
              />
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="in-track">
                Preferred track <span className="req">*</span>
              </label>
              <select
                id="in-track"
                className="apply-input"
                value={form.track}
                onChange={(e) => set('track')(e.target.value)}
              >
                <option value="" disabled>
                  Select a track
                </option>
                {TRACKS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="in-start">
                Preferred start date
              </label>
              <input
                id="in-start"
                className="apply-input"
                type="text"
                placeholder="e.g. Jan 2026"
                value={form.startDate}
                onChange={(e) => set('startDate')(e.target.value)}
              />
            </div>

            <div className="apply-field">
              <label className="apply-label mono" htmlFor="in-duration">
                Preferred duration
              </label>
              <input
                id="in-duration"
                className="apply-input"
                type="text"
                placeholder="e.g. 3 months"
                value={form.duration}
                onChange={(e) => set('duration')(e.target.value)}
              />
            </div>

            <div className="apply-field apply-span2">
              <label className="apply-label mono" htmlFor="in-portfolio">
                Portfolio / GitHub URL
              </label>
              <input
                id="in-portfolio"
                className="apply-input"
                type="url"
                placeholder="https://github.com/…"
                value={form.portfolio}
                onChange={(e) => set('portfolio')(e.target.value)}
              />
            </div>

            <div className="apply-field apply-span2">
              <label className="apply-label mono" htmlFor="in-cv">
                Upload CV / Resume <span className="req">*</span>
              </label>
              <label className="apply-file" htmlFor="in-cv">
                <Paperclip size={16} weight="regular" aria-hidden="true" />
                <span className={form.cv ? 'apply-file-name' : ''}>
                  {form.cv || 'Choose a PDF, DOC or DOCX — max 5 MB'}
                </span>
              </label>
              <input
                id="in-cv"
                className="apply-file-input"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={onFile}
              />
            </div>

            <div className="apply-field apply-span2">
              <label className="apply-label mono" htmlFor="in-why">
                Why do you want to intern with us? <span className="req">*</span>
              </label>
              <textarea
                id="in-why"
                className="apply-input apply-textarea"
                rows={5}
                placeholder="Tell us why…"
                value={form.why}
                onChange={(e) => set('why')(e.target.value)}
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