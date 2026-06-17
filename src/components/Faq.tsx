import { motion } from 'framer-motion'
import { revealLeft, revealUp, staggerContainer, viewportOnce } from './motion'

export default function Faq() {
  return (
    <section id="faq" className="faq-section">
      <div className="burger-header">
        <h2 className="text-glow-yellow">NPC QUESTIONS</h2>
        <p>Najczęstsze pytania od graczy przed wejściem do Pixel Bites.</p>
      </div>

      <div className="faq-container">
        <motion.div className="npc-panel" variants={revealLeft} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <img src="/npc-avatar.png" alt="Awatar przewodnika NPC Support" className="npc-avatar" width={1024} height={1024} loading="lazy" decoding="async" />
          <h3 className="npc-title">NPC SUPPORT</h3>
          <p className="npc-desc">"Masz pytanie przed questem?<br />Wybierz dialog po prawej."</p>
        </motion.div>

        <motion.div
          className="faq-list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div className="faq-item" variants={revealUp}>
            <button className="faq-btn interactive" aria-expanded="false" aria-controls="faq1">
              <span>Czy można rezerwować stolik?</span>
              <span className="faq-prompt">&gt;</span>
            </button>
            <div id="faq1" className="faq-content">
              <div className="faq-content-inner">
                Tak, możesz zarezerwować stolik online albo telefonicznie. W weekendy polecamy rezerwację wcześniej.
              </div>
            </div>
          </motion.div>

          <motion.div className="faq-item" variants={revealUp}>
            <button className="faq-btn interactive" aria-expanded="false" aria-controls="faq2">
              <span>Czy macie opcje vege?</span>
              <span className="faq-prompt">&gt;</span>
            </button>
            <div id="faq2" className="faq-content">
              <div className="faq-content-inner">
                Tak, w menu możesz dodać opcje vege i sezonowe składniki. Zapytaj obsługę o aktualny vege build.
              </div>
            </div>
          </motion.div>

          <motion.div className="faq-item" variants={revealUp}>
            <button className="faq-btn interactive" aria-expanded="false" aria-controls="faq3">
              <span>Czy można zamówić na wynos?</span>
              <span className="faq-prompt">&gt;</span>
            </button>
            <div id="faq3" className="faq-content">
              <div className="faq-content-inner">
                Tak, możesz zamówić jedzenie na wynos albo odebrać je bezpośrednio w lokalu.
              </div>
            </div>
          </motion.div>

          <motion.div className="faq-item" variants={revealUp}>
            <button className="faq-btn interactive" aria-expanded="false" aria-controls="faq4">
              <span>Czy organizujecie urodziny lub eventy?</span>
              <span className="faq-prompt">&gt;</span>
            </button>
            <div id="faq4" className="faq-content">
              <div className="faq-content-inner">
                Tak, organizujemy małe eventy, urodziny i arcade nights. Skontaktuj się z nami, żeby ustalić szczegóły.
              </div>
            </div>
          </motion.div>

          <motion.div className="faq-item" variants={revealUp}>
            <button className="faq-btn interactive" aria-expanded="false" aria-controls="faq5">
              <span>Czy lokal jest przyjazny dzieciom?</span>
              <span className="faq-prompt">&gt;</span>
            </button>
            <div id="faq5" className="faq-content">
              <div className="faq-content-inner">
                Tak, Pixel Bites jest miejscem dla rodzin, znajomych i fanów retro klimatu. Dzieciaki też mogą wejść do gry.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
