import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, revealRight, revealScale, viewportOnce, springSnappy, cardSlide, tapShrink } from './motion'

export default function Events() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Wideo (kilka MB) ładuje i odtwarza się dopiero, gdy sekcja wchodzi w viewport
  // — zamiast pobierać je eagerly przy montażu strony.
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) vid.play().catch(() => {})
          else vid.pause()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(vid)
    return () => io.disconnect()
  }, [])

  return (
    <section id="events" className="events-section">
      <div className="events-container">
        <div className="events-visuals">
          <motion.div
            className="events-video-container"
            variants={revealScale}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <video ref={videoRef} className="events-video" src="/arcade-night.mp4" preload="none" loop muted playsInline></video>
          </motion.div>
        </div>

        <div className="events-content">
          <div className="events-header">
            <h2 className="text-glow-yellow">ARCADE NIGHTS</h2>
            <p>Nie tylko jedzenie. Co tydzień nowy level klimatu.</p>
          </div>

          <motion.div
            className="events-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.div className="event-card interactive" variants={revealRight} whileHover={cardSlide} whileTap={tapShrink} transition={springSnappy}>
              <span className="event-tag">EVERY FRIDAY</span>
              <h3>Friday — RETRO GAMING NIGHT</h3>
              <p>Turnieje arcade, klasyczne gry i specjalne combo dla graczy.</p>
            </motion.div>

            <motion.div className="event-card interactive" variants={revealRight} whileHover={cardSlide} whileTap={tapShrink} transition={springSnappy}>
              <span className="event-tag">WEEKEND QUEST</span>
              <h3>Saturday — BURGER COMBO CHALLENGE</h3>
              <p>Zbierz ekipę, zamów zestaw i odblokuj weekendowy bonus.</p>
            </motion.div>

            <motion.div className="event-card interactive" variants={revealRight} whileHover={cardSlide} whileTap={tapShrink} transition={springSnappy}>
              <span className="event-tag">SUNDAY BUFF</span>
              <h3>Sunday — CHILL & SHAKE</h3>
              <p>Luźny wieczór, neonowe shake’i i spokojny klimat po całym tygodniu.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
