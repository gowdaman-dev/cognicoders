import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  useSmoothScroll,
  prefersReducedMotion,
  scrollToSection,
} from './hooks/useSmoothScroll'
import { SeoManager } from './hooks/useSeo'

const Landing = lazy(() => import('./pages/Landing').then((m) => ({ default: m.Landing })))
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const SolutionsPage = lazy(() =>
  import('./pages/Solutions').then((m) => ({ default: m.SolutionsPage })),
)
const SolutionDetailPage = lazy(() =>
  import('./pages/SolutionDetail').then((m) => ({ default: m.SolutionDetailPage })),
)
const IndustriesPage = lazy(() =>
  import('./pages/Industries').then((m) => ({ default: m.IndustriesPage })),
)
const ServicesPage = lazy(() =>
  import('./pages/Services').then((m) => ({ default: m.ServicesPage })),
)
const CareersPage = lazy(() =>
  import('./pages/Careers').then((m) => ({ default: m.CareersPage })),
)
const InternshipsPage = lazy(() =>
  import('./pages/Internships').then((m) => ({ default: m.InternshipsPage })),
)
const ContactPage = lazy(() =>
  import('./pages/Contact').then((m) => ({ default: m.ContactPage })),
)

function ScrollManager() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
      if (hash) {
        scrollToSection(hash.slice(1))
      } else {
        window.scrollTo(0, 0)
      }
    }, 60)
    return () => clearTimeout(t)
  }, [hash, pathname])

  return null
}

function Shell() {
  const reduced = prefersReducedMotion()
  useSmoothScroll(!reduced)

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <ScrollManager />
      <SeoManager />
      <ScrollProgress />
      <Nav />
      <main>
        <Suspense fallback={<div className="route-fallback" />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/:id" element={<SolutionDetailPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/internships" element={<InternshipsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App