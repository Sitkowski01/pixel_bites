import { motion } from 'framer-motion'
import { popIn, viewportOnce } from './motion'
import { site } from '../data/site'

export default function Cta() {
  return (
    <section id="cta" className="cta-section">
      <motion.div className="cta-content" variants={popIn} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <h2 className="cta-title">READY PLAYER?</h2>
        <p className="cta-desc">Wybierz swój następny ruch. Rezerwacja stolika, szybkie zamówienie albo wieczór z ekipą — Pixel Bites czeka.</p>

        <div className="status-panel">
          <div className="status-line">STATUS: <span>OPEN</span></div>
          <div className="status-line">NEXT QUEST: <span>ORDER YOUR POWER-UP</span></div>
          <div className="status-line bonus">BONUS: <span>+10 TASTE XP</span></div>
        </div>

        <div className="cta-buttons">
          <div className="magnetic-wrap interactive">
            <a href={`tel:${site.phone}`} className="pixel-btn">ZAREZERWUJ STOLIK</a>
          </div>
          <div className="magnetic-wrap interactive">
            <a href="#menu" className="pixel-btn">ZAMÓW ONLINE</a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
