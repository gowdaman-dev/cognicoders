import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

gsap.registerPlugin(ScrollTrigger)

const WORDS = 'Smarter software for a safer, more connected world.'.split(' ')

export function Manifesto() {
  const root = useRef<HTMLElement>(null)
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mword',
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.35,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        '.manifesto-sub',
        { y: 70, opacity: 0.4 },
        {
          y: -70,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 60%',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} className="manifesto" id="manifesto">
      <div className="manifesto-glow" aria-hidden="true" />
      <div className="container manifesto-inner">
        <h2 className="manifesto-title">
          {WORDS.map((w, i) => (
            <span key={i} className="mword">
              {w}
              {i < WORDS.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h2>
        <p className="manifesto-sub">
          Cognicoders builds intelligent platforms that secure facilities,
          streamline healthcare, and power the modern workplace — turning complex
          operations into seamless digital experiences.
        </p>
      </div>
    </section>
  )
}