import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 10, suffix: '+', label: 'Integrated platforms' },
  { value: 4, suffix: '', label: 'Industries served' },
  { value: 24, suffix: '/7', label: 'Dedicated support' },
  { value: 100, suffix: '%', label: 'Security-first engineering' },
]

function Stat({ stat }: { stat: (typeof STATS)[number] }) {
  const num = useRef<HTMLSpanElement>(null)
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !num.current) return
    const el = num.current
    const obj = { v: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: stat.value,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString()
          },
        })
      },
    })
    return () => st.kill()
  }, [stat.value, reduced])

  return (
    <div className="stat">
      <span className="stat-num">
        <span ref={num}>{stat.value}</span>
        <span className="stat-suffix">{stat.suffix}</span>
      </span>
      <span className="stat-label">{stat.label}</span>
    </div>
  )
}

export function Stats() {
  const root = useRef<HTMLElement>(null)
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: 'top 80%' },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} className="stats">
      <div className="container stats-grid">
        {STATS.map((s) => (
          <Stat key={s.label} stat={s} />
        ))}
      </div>
    </section>
  )
}