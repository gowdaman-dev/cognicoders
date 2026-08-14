import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Lock, Heart, Factory, BuildingOffice, ArrowUpRight } from '@phosphor-icons/react'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

gsap.registerPlugin(ScrollTrigger)

const INDUSTRIES = [
  {
    icon: Lock,
    title: 'Security & Identification',
    desc: 'Access control, biometric identity and visitor flow.',
    wide: true,
  },
  {
    icon: Heart,
    title: 'Healthcare',
    desc: 'Hospital operations, patient management and queue control.',
  },
  {
    icon: Factory,
    title: 'Manufacturing & Industrial',
    desc: 'Safety induction, attendance and meal management.',
  },
  {
    icon: BuildingOffice,
    title: 'Corporate & HR',
    desc: 'HRMS, ERP and project management for growing teams.',
  },
]

export function Industries() {
  const root = useRef<HTMLElement>(null)
  const reduced = prefersReducedMotion()

  const pointerFine =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ind-card',
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: 'top 75%' },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!pointerFine || reduced) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    gsap.to(el, {
      rotateY: px * 8,
      rotateX: -py * 8,
      transformPerspective: 900,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 900,
      duration: 0.8,
      ease: 'power3.out',
    })
  }

  return (
    <section ref={root} className="industries" id="industries">
      <div className="container">
        <p className="solutions-index mono" aria-hidden="true">
          Industries / 04
        </p>
        <h2 className="industries-title">
          Built for the industries <em>we know best.</em>
        </h2>

        <div className="ind-grid">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon
            return (
              <article
                key={ind.title}
                className={`ind-card${ind.wide ? ' wide' : ''}`}
                onMouseMove={pointerFine ? onMove : undefined}
                onMouseLeave={onLeave}
              >
                <div className="ind-top">
                  <span className="ind-icon" aria-hidden="true">
                    <Icon size={26} weight="regular" />
                  </span>
                  <span className="ind-num mono">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="ind-bottom">
                  <h3 className="ind-title">{ind.title}</h3>
                  <p className="ind-desc">{ind.desc}</p>
                  <span className="ind-link">
                    Explore
                    <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}