import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Fingerprint,
  IdentificationBadge,
  Clock,
  ShieldCheck,
  ForkKnife,
  Queue,
  ArrowUpRight,
} from '@phosphor-icons/react'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

gsap.registerPlugin(ScrollTrigger)

const SOLUTIONS = [
  {
    icon: Fingerprint,
    slug: 'face-recognition-system',
    title: 'Face Recognition System',
    desc: 'AI-powered identity verification you can trust.',
  },
  {
    icon: IdentificationBadge,
    slug: 'visitor-management-system',
    title: 'Visitor Management System',
    desc: 'A professional, secure first impression for every guest.',
  },
  {
    icon: Clock,
    slug: 'time-and-attendance-system',
    title: 'Time & Attendance System',
    desc: 'Accurate workforce tracking, without the guesswork.',
  },
  {
    icon: ShieldCheck,
    slug: 'safety-induction-system',
    title: 'Safety Induction System',
    desc: 'Digital safety onboarding for every worker and visitor.',
  },
  {
    icon: ForkKnife,
    slug: 'meal-management-system',
    title: 'Meal Management System',
    desc: 'Effortless cafeteria and meal operations.',
  },
  {
    icon: Queue,
    slug: 'queue-management-system',
    title: 'Queue Management System',
    desc: 'Turn waiting lines into smooth, organized flows.',
  },
]

export function Solutions() {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !wrap.current || !track.current) return

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.sol-panel')
      const dist = () => track.current!.scrollWidth - window.innerWidth

      gsap.to(track.current, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top top',
          end: () => '+=' + dist(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const vw = window.innerWidth
          panels.forEach((p) => {
            const r = p.getBoundingClientRect()
            const center = r.left + r.width / 2
            const off = Math.max(-1.2, Math.min(1.2, (center - vw / 2) / (vw / 2)))
            const a = Math.abs(off)
            gsap.set(p, {
              rotateY: off * 14,
              scale: 1 - a * 0.05,
              zIndex: Math.round(100 - a * 100),
            })
            const inner = p.querySelector('.sol-inner')
            if (inner) gsap.set(inner, { opacity: 1 - a * 0.5 })
          })
        },
      })
    }, wrap)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="solutions" id="solutions">
      <div className="container solutions-head">
        <p className="solutions-index mono" aria-hidden="true">
          Solutions / 01–06
        </p>
        <h2 className="solutions-title">
          One partner.
          <br />
          A full suite of <em>operational</em> software.
        </h2>
        <p className="solutions-sub">
          Enterprise-grade applications that work together or stand alone —
          sharing a common design language, robust security, and a focus on
          real-world usability.
        </p>
      </div>

      <div
        className={reduced ? 'solutions-wrap is-reduced' : 'solutions-wrap'}
        ref={wrap}
      >
        <div className="solutions-track" ref={track}>
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon
            return (
              <article key={s.title} className="sol-panel">
                <div className="sol-inner">
                  <div className="sol-top">
                    <span className="sol-num mono">{String(i + 1).padStart(2, '0')}</span>
                    <span className="sol-icon" aria-hidden="true">
                      <Icon size={30} weight="regular" />
                    </span>
                  </div>
                  <h3 className="sol-title">{s.title}</h3>
                  <p className="sol-desc">{s.desc}</p>
                  <Link to={`/solutions/${s.slug}`} className="sol-link">
                    Learn more
                    <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            )
          })}

          <article className="sol-panel sol-cta" aria-hidden="false">
            <div className="sol-inner">
              <p className="sol-num mono">View all</p>
              <h3 className="sol-title">Need the full picture?</h3>
              <p className="sol-desc">
                Explore every platform and how they integrate into one ecosystem.
              </p>
              <Link to="/solutions" className="btn btn-primary">
                Request a demo
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}