import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, SlidersHorizontal, PlugsConnected, DeviceMobile, Wrench, Strategy, ArrowUpRight, ArrowRight } from '@phosphor-icons/react'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'
import { Footer } from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon: Code,
    title: 'Custom Software Development',
    desc: 'Bespoke applications engineered around your unique processes, built on modern, scalable technology.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Product Implementation & Customization',
    desc: 'Tailoring and deploying our platforms to fit your workflows, branding and integration needs.',
  },
  {
    icon: PlugsConnected,
    title: 'System Integration',
    desc: 'Connecting our solutions with your existing tools — payroll, access control, ERP, biometric hardware and more.',
  },
  {
    icon: DeviceMobile,
    title: 'Cloud & Mobile Development',
    desc: 'Cloud-ready architectures and mobile apps that put your operations in everyone\u2019s pocket.',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    desc: 'Reliable ongoing support, updates and enhancements that keep your systems performing at their best.',
  },
  {
    icon: Strategy,
    title: 'Consulting & Digital Transformation',
    desc: 'Advisory services to help you map, prioritize and execute your technology roadmap.',
  },
]

export function ServicesPage() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  const pointerFine =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.to('.svc-hero .line > span', {
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.1,
      })
      gsap.fromTo(
        '.svc-hero .ih-eyebrow, .svc-hero .ih-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.35 },
      )
      gsap.fromTo(
        '.svc-hero .ih-chip',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05, delay: 0.6 },
      )

      gsap.fromTo(
        '.svc-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.svc-grid', start: 'top 75%' },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={root}>
      <section className="svc-hero ind-hero">
        <div className="ind-hero-bg" aria-hidden="true" />
        <div className="container ind-hero-inner">
          <p className="ih-eyebrow mono">
            <span className="dot" aria-hidden="true" />
            Services / {String(SERVICES.length).padStart(2, '0')}
          </p>
          <h1 className="ih-title">
            <span className="line">
              <span>Beyond products —</span>
            </span>
            <span className="line">
              <span>
                a complete <em>software partner.</em>
              </span>
            </span>
          </h1>
          <p className="ih-sub">
            From custom builds to integrations and ongoing support, our team
            works as an extension of yours.
          </p>
          <div className="ih-chips" aria-hidden="true">
            {SERVICES.map((s, i) => (
              <span key={s.title} className="ih-chip mono">
                {String(i + 1).padStart(2, '0')}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="svc">
        <div className="container">
          <div className="svc-grid">
            {SERVICES.map((s, i) => {
              const Icon = s.icon
              return (
                <article
                  key={s.title}
                  className="svc-card"
                  onMouseMove={pointerFine ? onMove : undefined}
                >
                  <div className="svc-top">
                    <span className="svc-num mono">{String(i + 1).padStart(2, '0')}</span>
                    <span className="svc-icon" aria-hidden="true">
                      <Icon size={26} weight="regular" />
                    </span>
                  </div>
                  <div className="svc-body">
                    <h2 className="svc-title">{s.title}</h2>
                    <p className="svc-desc">{s.desc}</p>
                  </div>
                  <Link to="/#contact" className="svc-link">
                    Start a conversation
                    <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="cta services-cta">
        <div className="cta-glow" aria-hidden="true" />
        <span className="cta-scan" aria-hidden="true" />
        <div className="container cta-inner">
          <p className="cta-eyebrow mono">
            <span className="dot" aria-hidden="true" />
            Let's build together
          </p>
          <h2 className="cta-title">
            Have a project <em>in mind?</em>
          </h2>
          <p className="cta-sub">
            Tell us what you're trying to build and we'll map out how to get
            there.
          </p>
          <div className="cta-actions">
            <Link to="/#contact" className="btn btn-primary">
              Start a conversation
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}