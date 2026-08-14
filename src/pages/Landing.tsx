import { Hero } from '../components/Hero'
import { SolutionMarquee } from '../components/SolutionMarquee'
import { Manifesto } from '../components/Manifesto'
import { Solutions } from '../components/Solutions'
import { Industries } from '../components/Industries'
import { Stats } from '../components/Stats'
import { WhyUs } from '../components/WhyUs'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export function Landing() {
  return (
    <>
      <Hero />
      <SolutionMarquee />
      <Manifesto />
      <Solutions />
      <Industries />
      <Stats />
      <WhyUs />
      <CTA />
      <Footer />
    </>
  )
}