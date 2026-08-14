import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from '@phosphor-icons/react'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

gsap.registerPlugin(ScrollTrigger)

export function CTA() {
  const root = useRef<HTMLElement>(null)
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-title, .cta-sub, .cta .btn',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        },
      )
      gsap.fromTo(
        '.cta-glow',
        { scale: 0.7 },
        {
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} className="cta" id="contact">
      <div className="cta-glow" aria-hidden="true" />
      <span className="cta-scan" aria-hidden="true" />
      <div className="container cta-inner">
        <p className="cta-eyebrow mono">
          <span className="dot" aria-hidden="true" />
          Let's build together
        </p>
        <h2 className="cta-title">
          Ready to see it <em>in action?</em>
        </h2>
        <p className="cta-sub">
          Tell us about your challenge and we'll show you exactly how
          Cognicoders can help. Schedule a personalized demo today.
        </p>
        <div className="cta-actions">
          <a href="mailto:info@cognicoders.in" className="btn btn-primary">
            Request a demo
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
          <a href="mailto:info@cognicoders.in" className="btn btn-ghost">
            info@cognicoders.in
          </a>
        </div>
      </div>
    </section>
  )
}