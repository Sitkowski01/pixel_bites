import { motion } from 'framer-motion'
import { staggerContainer, revealUp, viewportOnce, springSnappy, cardLift, tapShrink } from './motion'

export default function Reviews() {
  return (
    <section id="reviews" className="reviews-section">
      <div className="reviews-header">
        <h2 className="text-glow-orange">PLAYER FEEDBACK</h2>
      </div>

      <motion.div
        className="reviews-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >

        <motion.div className="review-card interactive" variants={revealUp} whileHover={cardLift} whileTap={tapShrink} transition={springSnappy}>
          <div className="review-header">
            <img src="/Avatar_brodaty.png" alt="Awatar gracza Kacper" className="review-avatar" width={1024} height={1024} loading="lazy" decoding="async" />
            <div className="review-info">
              <h4>Kacper</h4>
              <span className="review-lvl">LVL 24 / Burger Hunter</span>
            </div>
          </div>
          <div className="review-stars" role="img" aria-label="Ocena 5 na 5 gwiazdek">★★★★★</div>
          <p className="review-text">“Burger jak legendary drop. Klimat totalnie arcade, a Pixel Sauce to cheat code.”</p>
        </motion.div>

        <motion.div className="review-card interactive" variants={revealUp} whileHover={cardLift} whileTap={tapShrink} transition={springSnappy}>
          <div className="review-header">
            <img src="/Avatar_zenski.png" alt="Awatar graczki Ola" className="review-avatar" width={1024} height={1024} loading="lazy" decoding="async" />
            <div className="review-info">
              <h4>Ola</h4>
              <span className="review-lvl">LVL 18 / Shake Mage</span>
            </div>
          </div>
          <div className="review-stars" role="img" aria-label="Ocena 5 na 5 gwiazdek">★★★★★</div>
          <p className="review-text">“Neon Shake wygląda jak power-up i dokładnie tak smakuje. Totalnie wracam.”</p>
        </motion.div>

        <motion.div className="review-card interactive" variants={revealUp} whileHover={cardLift} whileTap={tapShrink} transition={springSnappy}>
          <div className="review-header">
            <img src="/Avatar_brodaty.png" alt="Awatar gracza Michał" className="review-avatar hue-shift" width={1024} height={1024} loading="lazy" decoding="async" />
            <div className="review-info">
              <h4>Michał</h4>
              <span className="review-lvl">LVL 31 / Combo Main</span>
            </div>
          </div>
          <div className="review-stars" role="img" aria-label="Ocena 5 na 5 gwiazdek">★★★★★</div>
          <p className="review-text">“Combo Level-Up to najlepszy build na wieczór ze znajomymi.”</p>
        </motion.div>

      </motion.div>
    </section>
  )
}
