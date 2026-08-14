import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ShieldCheck,
  LockKey,
  Sparkle,
  Handshake,
  LightbulbFilament,
  Headset,
  Target,
  Eye,
  Compass,
  PencilSimple,
  Cube,
  RocketLaunch,
  Lifebuoy,
  ArrowRight,
} from '@phosphor-icons/react'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'
import { Footer } from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  { icon: ShieldCheck, title: 'Reliability', desc: 'Our systems run mission-critical operations, so dependability is non-negotiable.' },
  { icon: LockKey, title: 'Security', desc: 'We protect the data and people our software touches at every level.' },
  { icon: Sparkle, title: 'Simplicity', desc: 'Powerful technology should feel effortless to the people who use it.' },
  { icon: Handshake, title: 'Partnership', desc: 'We measure our success by the outcomes our clients achieve.' },
  { icon: LightbulbFilament, title: 'Innovation', desc: 'We continually adopt AI and modern engineering to stay ahead.' },
  { icon: Headset, title: 'Support', desc: 'We stay on as a long-term partner well beyond go-live.' },
]

const STEPS = [
  { icon: Compass, title: 'Discover', desc: 'We listen first, mapping your processes, pain points and goals.' },
  { icon: PencilSimple, title: 'Design', desc: 'We architect a solution and prototype the experience with you.' },
  { icon: Cube, title: 'Develop', desc: 'We build in iterative sprints with regular, visible progress.' },
  { icon: RocketLaunch, title: 'Deploy', desc: 'We roll out smoothly with training, data migration and testing.' },
  { icon: Lifebuoy, title: 'Support', desc: 'We stay on as a long-term partner for maintenance and growth.' },
]

export function About() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.to('.about-hero .line > span', {
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.1,
      })

      gsap.fromTo(
        '.about-hero .about-eyebrow',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.35 },
      )
      gsap.fromTo(
        '.about-hero .about-sub',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.45 },
      )

      gsap.utils.toArray<HTMLElement>('.about-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={root}>
      <section className="about-hero">
        <div className="about-bg" aria-hidden="true" />
        <div className="container about-hero-inner">
          <p className="about-eyebrow mono">
            <span className="dot" aria-hidden="true" />
            About Cognicoders
          </p>
          <h1 className="about-title">
            <span className="line">
              <span>We write the code</span>
            </span>
            <span className="line">
              <span>
                behind <em>smarter</em> operations.
              </span>
            </span>
          </h1>
          <p className="about-sub">
            A software company specializing in solutions for the security &
            identification, healthcare, and enterprise sectors.
          </p>
        </div>
      </section>

      <section className="about-ethos">
        <div className="container">
          <p className="about-quote about-reveal">
            We help organizations replace manual processes and disconnected tools
            with intelligent, integrated platforms that are reliable, secure and
            easy to use.
          </p>
          <p className="about-quote-sub about-reveal">
            Our name reflects who we are: a team of coders who think — engineers
            who pair technical depth with a genuine understanding of how
            businesses operate on the ground.
          </p>
        </div>
      </section>

      <section className="about-mv">
        <div className="container about-mv-grid">
          <article className="mv-card about-reveal">
            <div className="mv-top">
              <span className="mv-icon" aria-hidden="true">
                <Target size={26} weight="regular" />
              </span>
              <span className="mono mv-k">01</span>
            </div>
            <h3 className="mv-title">Our Mission</h3>
            <p className="mv-desc">
              To engineer software that makes everyday operations safer, faster
              and more intelligent — empowering organizations to focus on what
              they do best.
            </p>
          </article>

          <article className="mv-card about-reveal">
            <div className="mv-top">
              <span className="mv-icon" aria-hidden="true">
                <Eye size={26} weight="regular" />
              </span>
              <span className="mono mv-k">02</span>
            </div>
            <h3 className="mv-title">Our Vision</h3>
            <p className="mv-desc">
              To be the trusted technology partner of choice for security,
              healthcare and enterprise organizations seeking dependable,
              future-ready software.
            </p>
          </article>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <p className="solutions-index mono" aria-hidden="true">
            What drives us / 06
          </p>
          <h2 className="about-section-title">
            Our <em>values.</em>
          </h2>
          <div className="values-grid">
            {VALUES.map((v, i) => {
              const Icon = v.icon
              return (
                <article key={v.title} className="value-card about-reveal">
                  <div className="value-top">
                    <span className="value-icon" aria-hidden="true">
                      <Icon size={24} weight="regular" />
                    </span>
                    <span className="mono value-num">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="value-title">{v.title}</h3>
                  <p className="value-desc">{v.desc}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="about-process">
        <div className="container about-process-grid">
          <div className="process-head">
            <p className="solutions-index mono" aria-hidden="true">
              How we work / 05
            </p>
            <h2 className="about-section-title">
              From first conversation to <em>long-term partnership.</em>
            </h2>
            <p className="process-lede">
              A proven path from understanding your operations to supporting
              them for years to come.
            </p>
          </div>

          <ol className="process-list">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              return (
                <li key={s.title} className="process-row about-reveal">
                  <span className="process-num mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="process-icon" aria-hidden="true">
                    <Icon size={20} weight="regular" />
                  </span>
                  <div className="process-body">
                    <h3 className="process-title">{s.title}</h3>
                    <p className="process-desc">{s.desc}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="cta about-cta">
        <div className="cta-glow" aria-hidden="true" />
        <span className="cta-scan" aria-hidden="true" />
        <div className="container cta-inner">
          <p className="cta-eyebrow mono">
            <span className="dot" aria-hidden="true" />
            Let's build together
          </p>
          <h2 className="cta-title">
            Want to build <em>something together?</em>
          </h2>
          <p className="cta-sub">
            Let's talk about how the right software can transform your
            operations.
          </p>
          <div className="cta-actions">
            <Link to="/#contact" className="btn btn-primary">
              Get in touch
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}