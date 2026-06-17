import { motion } from 'framer-motion'
import { revealLeft, revealRight, staggerContainer, viewportOnce, springSnappy, cardSlide, tapShrink } from './motion'

export default function PixelPass() {
  return (
    <section id="pixel-pass" className="rewards-section">
      <div className="burger-header">
        <h2 className="text-glow-orange">PIXEL PASS</h2>
        <p>Zbieraj punkty. Odblokowuj bonusy. Odbieraj darmowe dodatki.</p>
      </div>
      <div className="rewards-container">
        {/* Left Side: Visual */}
        <motion.div className="pixel-pass-panel" variants={revealLeft} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <img src="/pixel-pass-card.png" alt="Karta lojalnościowa Pixel Pass" className="pixel-pass-card" width={1376} height={768} loading="lazy" decoding="async" />
          <div className="pass-details">
            <div>STATUS: <span className="text-glow-pink">ACTIVE</span></div>
            <div>RANK: <span>BURGER HUNTER</span></div>
            <div>MEMBER ID: <span style={{ color: '#888' }}>PB-1987</span></div>
          </div>
          <div className="xp-status">
            <div className="xp-info">
              <span>XP:</span>
              <span>740 / 1000</span>
            </div>
            <div className="xp-bar-container">
              {/* GSAP animuje width */}
              <div className="xp-bar-fill"></div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Reward Track */}
        <motion.div
          className="reward-track"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div className="reward-card unlocked interactive" variants={revealRight} whileHover={cardSlide} whileTap={tapShrink} transition={springSnappy}>
            <div className="reward-icon-wrap">
              <img src="/reward-coin.png" alt="Unlocked Reward" className="reward-coin" width={1024} height={1024} loading="lazy" decoding="async" />
            </div>
            <div className="reward-info">
              <span className="reward-lvl">LEVEL 1 • UNLOCKED</span>
              <h3 className="reward-title">FREE SAUCE</h3>
              <p className="reward-desc">Odbierz darmowy Pixel Sauce do zamówienia.</p>
            </div>
          </motion.div>

          <motion.div className="reward-card next interactive" variants={revealRight} whileHover={cardSlide} whileTap={tapShrink} transition={springSnappy}>
            <div className="reward-icon-wrap">
              <img src="/reward-coin.png" alt="Next Reward" className="reward-coin" width={1024} height={1024} loading="lazy" decoding="async" />
            </div>
            <div className="reward-info">
              <span className="reward-lvl">LEVEL 2 • NEXT REWARD</span>
              <h3 className="reward-title">FREE FRIES</h3>
              <p className="reward-desc">Zdobądź darmowe Arcade Fries po kolejnym levelu.</p>
            </div>
          </motion.div>

          <motion.div className="reward-card locked interactive" variants={revealRight} whileHover={cardSlide} whileTap={tapShrink} transition={springSnappy}>
            <div className="reward-icon-wrap">
              <img src="/reward-coin.png" alt="Locked Reward" className="reward-coin" width={1024} height={1024} loading="lazy" decoding="async" />
            </div>
            <div className="reward-info">
              <span className="reward-lvl">LEVEL 3 • LOCKED</span>
              <h3 className="reward-title">SECRET BURGER</h3>
              <p className="reward-desc">Odblokuj ukryty burger dostępny tylko dla graczy Pixel Pass.</p>
            </div>
          </motion.div>

          <motion.div className="reward-card locked interactive" variants={revealRight} whileHover={cardSlide} whileTap={tapShrink} transition={springSnappy}>
            <div className="reward-icon-wrap">
              <img src="/reward-coin.png" alt="Locked Reward" className="reward-coin" width={1024} height={1024} loading="lazy" decoding="async" />
            </div>
            <div className="reward-info">
              <span className="reward-lvl">LEVEL 4 • LOCKED</span>
              <h3 className="reward-title">VIP ARCADE NIGHT</h3>
              <p className="reward-desc">Wejściówka na specjalny event dla stałych graczy.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
