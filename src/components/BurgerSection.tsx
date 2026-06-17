import { motion } from 'framer-motion'
import { staggerContainer, revealUp, viewportOnce } from './motion'

type Layer = {
  z: number
  src: string
  alt: string
  side: 'right' | 'left'
  level: string
  title: string
  desc: string
}

const layers: Layer[] = [
  { z: 7, src: '/top-bun.png', alt: 'Top Bun', side: 'right', level: 'LEVEL 7', title: 'TOP BUN', desc: 'Miękka, lekko chrupiąca bułka wypiekana codziennie.' },
  { z: 6, src: '/lettuce.png', alt: 'Lettuce', side: 'left', level: 'LEVEL 6', title: 'LETTUCE', desc: 'Świeża sałata, chrupiąca i lekka.' },
  { z: 5, src: '/tomato.png', alt: 'Tomato', side: 'right', level: 'LEVEL 5', title: 'TOMATO', desc: 'Soczysty pomidor pełen smaku.' },
  { z: 4, src: '/cheese.png', alt: 'Cheese', side: 'left', level: 'LEVEL 4', title: 'CHEDDAR', desc: 'Roztopiony cheddar z kremowym finiszem.' },
  { z: 3, src: '/beef-patty.png', alt: 'Beef Patty', side: 'right', level: 'LEVEL 3', title: 'BEEF PATTY', desc: 'Wołowina premium, soczysta i grillowana.' },
  { z: 2, src: '/pixel-sauce.png', alt: 'Pixel Sauce', side: 'left', level: 'LEVEL 2', title: 'PIXEL SAUCE', desc: 'Autorski sos Pixel Bites.' },
  { z: 1, src: '/bottom-bun.png', alt: 'Bottom Bun', side: 'right', level: 'LEVEL 1', title: 'BOTTOM BUN', desc: 'Podstawa, która trzyma cały build razem.' },
]

export default function BurgerSection() {
  return (
    <section id="build-burger" className="burger-section">
      <div className="burger-header">
        <h2 className="text-glow-orange">Build Your Burger</h2>
        <p>Każdy składnik to osobny power-up. Razem tworzą legendarny smak Pixel Bites.</p>
      </div>

      <div className="burger-stage">
        <div className="burger-container">
          {layers.map((l) => (
            <div className="burger-layer" style={{ zIndex: l.z }} key={l.title}>
              <img src={l.src} alt={l.alt} width={2816} height={1536} loading="lazy" decoding="async" />
              <div className={`layer-label ${l.side}`}>
                <span className="dialog-level">{l.level}</span>
                <h4>{l.title}</h4>
                <p>{l.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lista składników — widoczna tylko na telefonach (≤768px), gdzie boczne
          etykiety przy burgerze się nie mieszczą. Na desktopie ukryta (CSS). */}
      <motion.ul
        className="burger-mobile-list"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {layers.map((l) => (
          <motion.li key={l.title} className={`burger-mobile-item ${l.side}`} variants={revealUp}>
            <div className="burger-mobile-thumb">
              <img src={l.src} alt={l.alt} width={2816} height={1536} loading="lazy" decoding="async" />
            </div>
            <div className="burger-mobile-text">
              <span className="dialog-level">{l.level}</span>
              <h4>{l.title}</h4>
              <p>{l.desc}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
