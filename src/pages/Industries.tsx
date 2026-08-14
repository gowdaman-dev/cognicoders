import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Lock, Hospital, Factory, BuildingOffice, ArrowUpRight, ArrowRight } from '@phosphor-icons/react'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'
import { SOLUTIONS } from '../data/solutions'
import { Footer } from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

const INDUSTRIES = [
  {
    icon: Lock,
    title: 'Security & Identification',
    desc: 'Protect your people, premises and data with intelligent identity and access solutions. We help security teams control who enters, verify identities in real time, and maintain complete, audit-ready records.',
    sols: [0, 1, 2, 3],
  },
  {
    icon: Hospital,
    title: 'Healthcare',
    desc: 'Help your facility run smoothly so your teams can focus on patients. Our healthcare solutions streamline administration, clinical workflows and patient flow from the front desk to the ward.',
    sols: [9, 5, 1],
  },
  {
    icon: Factory,
    title: 'Manufacturing & Industrial',
    desc: 'Keep your sites safe, compliant and efficient. We digitize safety onboarding, workforce tracking and on-site services for industrial environments.',
    sols: [3, 2, 4],
  },
  {
    icon: BuildingOffice,
    title: 'Corporate & HR',
    desc: 'Modernize the way your organization runs. From HR and projects to enterprise-wide operations, we connect your teams and processes on platforms built to scale.',
    sols: [8, 7, 6, 1],
  },
]

export function IndustriesPage() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.to('.ind-hero .line > span', {
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.1,
      })
      gsap.fromTo(
        '.ind-hero .ih-eyebrow, .ind-hero .ih-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.35 },
      )
      gsap.fromTo(
        '.ind-hero .ih-chip',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05, delay: 0.6 },
      )

      gsap.utils.toArray<HTMLElement>('.ind-module').forEach((el) => {
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
          el.querySelector('.ind-mod-ghost'),
          { y: 80 },
          {
            y: -80,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={root}>
      <section className="ind-hero">
        <div className="ind-hero-bg" aria-hidden="true" />
        <div className="container ind-hero-inner">
          <p className="ih-eyebrow mono">
            <span className="dot" aria-hidden="true" />
            Industries we serve / {String(INDUSTRIES.length).padStart(2, '0')}
          </p>
          <h1 className="ih-title">
            <span className="line">
              <span>Solutions tailored</span>
            </span>
            <span className="line">
              <span>
                to your <em>sector.</em>
              </span>
            </span>
          </h1>
          <p className="ih-sub">
            Deep expertise where it matters most — find the platforms built for
            your industry.
          </p>
          <div className="ih-chips" aria-hidden="true">
            {INDUSTRIES.map((ind, i) => (
              <span key={ind.title} className="ih-chip mono">
                {String(i + 1).padStart(2, '0')}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="ind-modules">
        {INDUSTRIES.map((ind, i) => {
          const Icon = ind.icon
          return (
            <article
              key={ind.title}
              id={`ind-${i + 1}`}
              className={`ind-module${i % 2 === 1 ? ' flip' : ''}`}
            >
              <span className="ind-mod-ghost mono" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="ind-mod-glow" aria-hidden="true" />

              <div className="container ind-mod-inner">
                <div className="ind-mod-head">
                  <span className="ind-mod-icon" aria-hidden="true">
                    <Icon size={26} weight="regular" />
                  </span>
                  <h2 className="ind-mod-title">{ind.title}</h2>
                  <p className="ind-mod-desc">{ind.desc}</p>
                  <Link to="/solutions" className="ind-mod-link">
                    Explore related solutions
                    <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                  </Link>
                </div>

                <div className="ind-mod-sols">
                  {ind.sols.map((si) => {
                    const s = SOLUTIONS[si]
                    const SIcon = s.icon
                    return (
                      <Link
                        key={s.name}
                        to={`/solutions/${s.slug}`}
                        className="sol-chip"
                      >
                        <span className="sol-chip-icon" aria-hidden="true">
                          <SIcon size={22} weight="regular" />
                        </span>
                        <span className="sol-chip-name">{s.name}</span>
                        <ArrowUpRight className="sol-chip-arrow" size={18} weight="bold" aria-hidden="true" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="cta industries-cta">
        <div className="cta-glow" aria-hidden="true" />
        <span className="cta-scan" aria-hidden="true" />
        <div className="container cta-inner">
          <p className="cta-eyebrow mono">
            <span className="dot" aria-hidden="true" />
            Let's build together
          </p>
          <h2 className="cta-title">
            Don't see your <em>industry?</em>
          </h2>
          <p className="cta-sub">
            Our platforms adapt across sectors, and we build custom solutions
            too. Let's talk.
          </p>
          <div className="cta-actions">
            <Link to="/#contact" className="btn btn-primary">
              Contact us
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}