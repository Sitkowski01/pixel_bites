import { MotionConfig } from 'framer-motion'
import { useExperience } from './hooks/useExperience'
import ErrorBoundary from './components/ErrorBoundary'
import CookieBanner from './components/CookieBanner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StorySection from './components/StorySection'
import BurgerSection from './components/BurgerSection'
import PowerupMenu from './components/PowerupMenu'
import Reviews from './components/Reviews'
import Events from './components/Events'
import Location from './components/Location'
import PixelPass from './components/PixelPass'
import Faq from './components/Faq'
import Cta from './components/Cta'
import Footer from './components/Footer'

export default function App() {
  // Cała imperatywna logika (Lenis, GSAP, Three.js, custom cursor,
  // magnetic buttons, menu power-up, akordeon FAQ) odpalana po zamontowaniu DOM.
  useExperience()

  return (
    // reducedMotion="user" — gdy system ma włączone "ogranicz ruch",
    // framer-motion automatycznie wycisza animacje (zostają tylko opacity).
    <MotionConfig reducedMotion="user">
      {/* Skip link — pierwszy w kolejności fokusu, dla nawigacji klawiaturą. */}
      <a href="#main" className="skip-link">Przejdź do treści</a>

      {/* WebGL Background & CRT Overlay */}
      <canvas id="webgl-canvas" aria-hidden="true"></canvas>
      <div className="scanlines" aria-hidden="true"></div>
      <div className="custom-cursor" id="cursor" aria-hidden="true"></div>
      <div className="scroll-progress" id="scroll-progress" aria-hidden="true"></div>

      <Navbar />

      <main id="main" tabIndex={-1}>
        <ErrorBoundary>
          <Hero />
          <StorySection />
          <BurgerSection />
          <PowerupMenu />
          <Reviews />
          <Events />
          <Location />
          <PixelPass />
          <Faq />
          <Cta />
        </ErrorBoundary>
      </main>

      <Footer />
      <CookieBanner />
    </MotionConfig>
  )
}
