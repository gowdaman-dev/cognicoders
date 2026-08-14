import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'
import { SOLUTIONS } from '../data/solutions'
import { Footer } from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

export function SolutionsPage() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()
  const [active, setActive] = useState(0)
  const fill = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.to('.solutions-hero .line > span', {
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.1,
      })
      gsap.fromTo(
        '.solutions-hero .sh-eyebrow, .solutions-hero .sh-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.35 },
      )
      gsap.fromTo(
        '.solutions-hero .sh-chip',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05, delay: 0.6 },
      )

      gsap.utils.toArray<HTMLElement>('.sol-detail').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        )
        gsap.fromTo(
          el.querySelector('.sol-ghost'),
          { y: 90, rotateX: 18 },
          {
            y: -90,
            rotateX: -12,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    if (reduced || !root.current) return
    const triggers = SOLUTIONS.map((_, i) =>
      ScrollTrigger.create({
        trigger: `#sol-${i + 1}`,
        start: 'top 55%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) setActive(i)
        },
      }),
    )
    return () => triggers.forEach((t) => t.kill())
  }, [reduced])

  useEffect(() => {
    if (fill.current) {
      fill.current.style.transform = `scaleY(${(active + 1) / SOLUTIONS.length})`
    }
  }, [active])

  return (
    <div ref={root}>
      <section className="solutions-hero">
        <div className="solutions-hero-bg" aria-hidden="true" />
        <div className="container solutions-hero-inner">
          <p className="sh-eyebrow mono">
            <span className="dot" aria-hidden="true" />
            Our software suite / {String(SOLUTIONS.length).padStart(2, '0')}
          </p>
          <h1 className="sh-title">
            <span className="line">
              <span>Solutions that</span>
            </span>
            <span className="line">
              <span>
                run your <em>operations.</em>
              </span>
            </span>
          </h1>
          <p className="sh-sub">
            Ten purpose-built platforms for security, healthcare and enterprise —
            deployable standalone or as one connected ecosystem.
          </p>
          <div className="sh-chips" aria-hidden="true">
            {SOLUTIONS.map((s, i) => (
              <span key={s.name} className="sh-chip mono">
                {String(i + 1).padStart(2, '0')}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="sol-explore">
        <aside className="sol-index" aria-label="Solutions index">
          <div className="sol-index-inner">
            <span className="idx-track" aria-hidden="true">
              <span ref={fill} className="idx-fill" />
            </span>
            <nav className="idx-list">
              {SOLUTIONS.map((s, i) => (
                <Link
                  key={s.name}
                  to={`/solutions#sol-${i + 1}`}
                  className={`idx-item${active === i ? ' active' : ''}`}
                >
                  <span className="idx-num mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="idx-name">{s.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <div className="sol-content">
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon
            return (
              <article key={s.name} id={`sol-${i + 1}`} className="sol-detail">
                <span className="sol-ghost mono" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="sol-head">
                  <span className="sol-head-icon" aria-hidden="true">
                    <Icon size={30} weight="regular" />
                  </span>
                  <p className="sol-tagline mono">{s.tagline}</p>
                  <h2 className="sol-name">{s.name}</h2>
                </div>

                <p className="sol-desc">{s.desc}</p>

                <p className="sol-ideal">
                  <span className="mono sol-ideal-k">Ideal for</span>
                  {s.idealFor}
                </p>

                <ul className="sol-benefits">
                  {s.benefits.map((b) => (
                    <li key={b} className="sol-benefit">
                      <CheckCircle size={16} weight="bold" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="sol-features">
                  <h3 className="sol-features-k mono">Key features</h3>
                  <ul className="sol-features-grid">
                    {s.features.map((f, fi) => (
                      <li key={f.title} className="sol-feature">
                        <span className="mono sol-feature-num">
                          {String(fi + 1).padStart(2, '0')}
                        </span>
                        <h4 className="sol-feature-title">{f.title}</h4>
                        <p className="sol-feature-desc">{f.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to={`/solutions/${s.slug}`} className="sol-detail-link">
                  View details
                  <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                </Link>

                <Link to="/contact" className="btn btn-primary sol-detail-cta">
                  Request a demo
                  <ArrowRight size={18} weight="bold" aria-hidden="true" />
                </Link>
              </article>
            )
          })}
        </div>
      </div>

      <section className="cta solutions-cta">
        <div className="cta-glow" aria-hidden="true" />
        <span className="cta-scan" aria-hidden="true" />
        <div className="container cta-inner">
          <p className="cta-eyebrow mono">
            <span className="dot" aria-hidden="true" />
            Let's build together
          </p>
          <h2 className="cta-title">
            Not sure which <em>fits best?</em>
          </h2>
          <p className="cta-sub">
            Tell us about your operation and we'll recommend the right solution —
            or build a custom one.
          </p>
          <div className="cta-actions">
            <Link to="/#contact" className="btn btn-primary">
              Talk to our team
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}