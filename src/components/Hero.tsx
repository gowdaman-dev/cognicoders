import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BiometricFrame } from './BiometricFrame'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.to('.hero-title .line > span', { y: 0, duration: 1.2, stagger: 0.14 }, 0.15)
        .fromTo('.hero-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9 }, 0.3)
        .fromTo(
          '.hero-sub',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          0.62,
        )
        .fromTo(
          '.hero-cta .btn',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
          0.78,
        )
        .fromTo('.scroll-cue', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.05)
        .fromTo('.hero-meta', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 1.1)

      gsap.to('.hero-inner', {
        y: -160,
        opacity: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.biometric', {
        y: -120,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} id="top" className="hero">
      <div className="hero-bg" aria-hidden="true" />

      <div className="container hero-inner">
        <p className="hero-eyebrow mono">
          <span className="dot" aria-hidden="true" />
          Workforce intelligence
        </p>

        <h1 className="hero-title">
          <span className="line">
            <span>The pulse of</span>
          </span>
          <span className="line">
            <span>
              your <em className="accent">workforce.</em>
            </span>
          </span>
        </h1>

        <p className="hero-sub">
          Time attendance, visitor management and queue orchestration — unified
          through biometrics and RFID, on one platform.
        </p>

        <div className="hero-cta">
          <Link to="/#contact" className="btn btn-primary">
            Book a demo
          </Link>
          <Link to="/#solutions" className="btn btn-ghost">
            Explore solutions
          </Link>
        </div>
      </div>

      <BiometricFrame />

      <p className="hero-meta mono" aria-hidden="true">
        <span>09.24°N</span>
        <span className="v-line" />
        <span>77.58°E</span>
      </p>

      <div className="hero-hud" aria-hidden="true">
        <span>CC</span>
        <span className="seg active">01</span>
        <span className="seg">/ 05</span>
      </div>

      <div className="scroll-cue mono" aria-hidden="true">
        <span className="track" />
        <span>Scroll</span>
      </div>
    </section>
  )
}