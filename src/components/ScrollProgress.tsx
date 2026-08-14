import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const fill = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !fill.current) return
    const st = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => {
        if (fill.current) fill.current.style.transform = `scaleY(${self.progress})`
      },
    })
    return () => st.kill()
  }, [reduced])

  if (reduced) return null
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={fill} className="sp-fill" />
    </div>
  )
}