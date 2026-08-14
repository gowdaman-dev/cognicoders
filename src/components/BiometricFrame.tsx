import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

export function BiometricFrame() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !ref.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.85 })

      tl.fromTo('.bio-frame', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(
          '.bio-corner',
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out' },
          0.2,
        )
        .fromTo(
          '.bio-ring',
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.9, stagger: 0.09, ease: 'power3.out' },
          0.35,
        )
        .fromTo('.bio-cross', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.9)
        .fromTo('.bio-core', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1)
        .fromTo(
          '.bio-meta-row',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          1.05,
        )
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={ref} className="biometric" aria-label="Biometric identity scan preview">
      <div className="bio-frame">
        <span className="bio-corner tl" aria-hidden="true" />
        <span className="bio-corner tr" aria-hidden="true" />
        <span className="bio-corner bl" aria-hidden="true" />
        <span className="bio-corner br" aria-hidden="true" />

        <div className="bio-iris" aria-hidden="true">
          <span className="bio-ring r1" />
          <span className="bio-ring r2" />
          <span className="bio-ring r3" />
          <span className="bio-cross hv" />
          <span className="bio-cross vv" />
          <span className="bio-core" />
          <span className="bio-scan" />
        </div>

        <div className="bio-meta">
          <div className="bio-meta-row">
            <span className="k">Scan</span>
            <span className="v">0x7F3A-91</span>
          </div>
          <div className="bio-meta-row">
            <span className="k">Sensor</span>
            <span className="v">Iris · Multi</span>
          </div>
          <div className="bio-meta-row">
            <span className="k">Match</span>
            <span className="v">98.7%</span>
          </div>
          <div className="bio-meta-row bio-status">
            <span className="dot" aria-hidden="true" />
            <span className="v">Verified</span>
          </div>
        </div>
      </div>
    </div>
  )
}