import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from '@phosphor-icons/react'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

gsap.registerPlugin(ScrollTrigger)

const REASONS = [
  {
    title: 'Domain expertise',
    desc: 'Deep specialization in security, healthcare and HR systems.',
  },
  {
    title: 'Integrated ecosystem',
    desc: 'Products that talk to each other, reducing data silos.',
  },
  {
    title: 'Security-first engineering',
    desc: 'Protection and compliance built into every layer.',
  },
  {
    title: 'Scalable architecture',
    desc: 'Cloud-ready platforms that grow with you.',
  },
  {
    title: 'Dedicated support',
    desc: 'A responsive team that stays with you long after go-live.',
  },
]

export function WhyUs() {
  const root = useRef<HTMLElement>(null)
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-row',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        },
      )
      gsap.fromTo(
        '.why-head',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 75%' },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} className="why" id="why">
      <div className="container why-grid">
        <div className="why-head">
          <p className="solutions-index mono" aria-hidden="true">
            Why Cognicoders / 05
          </p>
          <h2 className="why-title">
            Why teams choose <em>Cognicoders.</em>
          </h2>
          <p className="why-lede">
            Deep domain expertise paired with engineering you can rely on — and
            a team that stays with you long after go-live.
          </p>
        </div>

        <ul className="why-list">
          {REASONS.map((r, i) => (
            <li key={r.title} className="why-row">
              <span className="why-num mono">{String(i + 1).padStart(2, '0')}</span>
              <div className="why-body">
                <h3 className="why-row-title">{r.title}</h3>
                <p className="why-row-desc">{r.desc}</p>
              </div>
              <ArrowUpRight className="why-arrow" size={20} weight="bold" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}