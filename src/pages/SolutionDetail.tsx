import { useLayoutEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  CheckCircle,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Sparkle,
} from '@phosphor-icons/react'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'
import { SOLUTIONS } from '../data/solutions'
import { Footer } from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

export function SolutionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const idx = SOLUTIONS.findIndex((s) => s.slug === id)
  const root = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current || idx === -1) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.to('.sd-hero .line > span', {
        y: 0,
        duration: 1.2,
        stagger: 0.09,
        delay: 0.05,
      })
        .fromTo(
          '.sd-hero .ih-eyebrow, .sd-hero .ih-sub',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 },
          '-=0.6',
        )
        .fromTo(
          '.sd-hero-visual',
          { opacity: 0, scale: 0.8, rotate: -6 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: 'back.out(1.4)' },
          '-=0.5',
        )
        .fromTo(
          '.sd-hero-cta .btn',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          '-=0.5',
        )

      gsap.to('.sd-hero-visual', {
        y: 20,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1,
      })

      gsap.fromTo(
        '.sd-ghost',
        { y: 120, rotateX: 18 },
        {
          y: -120,
          rotateX: -14,
          ease: 'none',
          scrollTrigger: { trigger: '.sd-overview', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )

      gsap.fromTo(
        '.sd-ov-head',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.sd-ov-head', start: 'top 85%' },
        },
      )
      gsap.fromTo(
        '.sd-spec',
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.sd-spec', start: 'top 85%' },
        },
      )

      gsap.fromTo(
        '.sd-spec-row',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: '.sd-spec-list', start: 'top 85%' },
        },
      )

      gsap.fromTo(
        '.sd-benefit',
        { opacity: 0, y: 46 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.sd-benefits-grid', start: 'top 82%' },
        },
      )

      gsap.fromTo(
        '.sd-feature',
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: '.sd-features-grid', start: 'top 82%' },
        },
      )

      gsap.fromTo(
        '.sd-more-link',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.sd-more-inner', start: 'top 85%' },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced, idx])

  if (idx === -1) return <Navigate to="/solutions" replace />

  const s = SOLUTIONS[idx]
  const prev = SOLUTIONS[(idx - 1 + SOLUTIONS.length) % SOLUTIONS.length]
  const next = SOLUTIONS[(idx + 1) % SOLUTIONS.length]
  const Icon = s.icon

  return (
    <div ref={root}>
      <section className="sd-hero ind-hero">
        <div className="ind-hero-bg" aria-hidden="true" />
        <div className="sd-hero-visual" aria-hidden="true">
          <div className="sd-ring sd-ring-outer">
            <span className="sd-blip" />
          </div>
          <div className="sd-ring sd-ring-inner">
            <span className="sd-blip sd-blip-2" />
          </div>
          <div className="sd-reticle">
            <span className="c c-tl" />
            <span className="c c-tr" />
            <span className="c c-bl" />
            <span className="c c-br" />
            <span className="sd-scan" />
            <span className="sd-core" />
          </div>
          <div className="sd-status mono">
            <span className="sd-status-line">INITIALIZING</span>
            <span className="sd-status-line">SCANNING</span>
            <span className="sd-status-line">IDENTITY MATCH</span>
            <span className="sd-caret" />
          </div>
        </div>
        <div className="container ind-hero-inner">
          <p className="ih-eyebrow mono">
            <span className="dot" aria-hidden="true" />
            Solution {String(idx + 1).padStart(2, '0')} / {String(SOLUTIONS.length).padStart(2, '0')}
          </p>
          <h1 className="ih-title">
            <span className="line">
              <span>{s.name}</span>
            </span>
          </h1>
          <p className="ih-sub">{s.tagline}</p>
          <div className="sd-hero-cta">
            <Link to="/contact" className="btn btn-primary">
              Request a demo
              <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
            </Link>
            <Link to="/solutions" className="btn btn-ghost">
              Explore the suite
            </Link>
          </div>
        </div>
      </section>

      <section className="sd-overview">
        <span className="sd-ghost mono" aria-hidden="true">
          {String(idx + 1).padStart(2, '0')}
        </span>
        <div className="container sd-overview-grid">
          <div className="sd-ov-head">
            <p className="solutions-index mono" aria-hidden="true">
              Overview / 01
            </p>
            <h2 className="about-section-title">
              What it <em>does.</em>
            </h2>
            <p className="sd-desc">{s.desc}</p>
          </div>

          <aside className="sd-spec">
            <div className="sd-spec-head">
              <span className="sd-spec-icon" aria-hidden="true">
                <Icon size={24} weight="regular" />
              </span>
              <span>
                <span className="mono sd-spec-k">At a glance</span>
                <span className="sd-spec-title">{s.name}</span>
              </span>
            </div>
            <dl className="sd-spec-list">
              <div className="sd-spec-row">
                <dt>Ideal for</dt>
                <dd>{s.idealFor}</dd>
              </div>
              <div className="sd-spec-row">
                <dt>Capabilities</dt>
                <dd>{s.features.length} core features</dd>
              </div>
              <div className="sd-spec-row">
                <dt>Key wins</dt>
                <dd>{s.benefits.length} clear outcomes</dd>
              </div>
              <div className="sd-spec-row">
                <dt>Deployment</dt>
                <dd>Standalone or integrated</dd>
              </div>
            </dl>
            <Link to="/contact" className="btn btn-primary sd-spec-cta">
              Request a demo
              <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="sd-benefits">
        <div className="container">
          <p className="solutions-index mono" aria-hidden="true">
            Why it matters / 03
          </p>
          <div className="sd-benefits-grid">
            {s.benefits.map((b, i) => (
              <div key={b} className="sd-benefit">
                <div className="sd-benefit-top">
                  <span className="mono sd-benefit-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <CheckCircle size={20} weight="bold" aria-hidden="true" />
                </div>
                <p className="sd-benefit-text">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sd-features">
        <div className="container">
          <div className="sd-features-head">
            <p className="solutions-index mono" aria-hidden="true">
              Capabilities / 05
            </p>
            <h2 className="about-section-title">
              Everything you <em>get.</em>
            </h2>
            <p className="sd-features-sub">
              A focused toolkit designed around the way your team actually works.
            </p>
          </div>
          <ul className="sd-features-grid">
            {s.features.map((f, fi) => (
              <li key={f.title} className="sd-feature">
                <span className="mono sd-feature-num">
                  {String(fi + 1).padStart(2, '0')}
                </span>
                <h3 className="sd-feature-title">{f.title}</h3>
                <p className="sd-feature-desc">{f.desc}</p>
              </li>
            ))}
            <li className="sd-feature sd-feature-cta">
              <Sparkle size={22} weight="regular" aria-hidden="true" />
              <h3 className="sd-feature-title">Need it tailored?</h3>
              <p className="sd-feature-desc">
                Every deployment is configured to your processes. Let's scope what
                you need.
              </p>
              <Link to="/contact" className="sd-feature-link">
                Talk to our team
                <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <nav className="sd-more" aria-label="More solutions">
        <div className="container sd-more-inner">
          <Link to={`/solutions/${prev.slug}`} className="sd-more-link">
            <ArrowLeft size={20} weight="bold" aria-hidden="true" />
            <span>
              <span className="mono sd-more-k">Previous</span>
              <span className="sd-more-name">{prev.name}</span>
            </span>
          </Link>
          <Link to="/solutions" className="sd-more-link sd-more-all">
            <span>
              <span className="mono sd-more-k">View all</span>
              <span className="sd-more-name">All {SOLUTIONS.length} solutions</span>
            </span>
            <ArrowUpRight size={20} weight="bold" aria-hidden="true" />
          </Link>
          <Link to={`/solutions/${next.slug}`} className="sd-more-link sd-more-next">
            <span>
              <span className="mono sd-more-k">Next</span>
              <span className="sd-more-name">{next.name}</span>
            </span>
            <ArrowRight size={20} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </nav>

      <section className="cta">
        <div className="cta-glow" aria-hidden="true" />
        <span className="cta-scan" aria-hidden="true" />
        <div className="container cta-inner">
          <p className="cta-eyebrow mono">
            <span className="dot" aria-hidden="true" />
            Let's build together
          </p>
          <h2 className="cta-title">
            See <em>{s.name}</em> in action.
          </h2>
          <p className="cta-sub">
            Book a live demo with our team and see how it fits your operation.
          </p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary">
              Request a demo
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}