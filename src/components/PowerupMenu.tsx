import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, revealFade, viewportOnce, springSnappy } from './motion'

type Tag = { label: string; rarity?: 'legendary' | 'epic' | 'rare' }
type Item = {
  id: string
  video: string
  name: string
  price: string
  desc: string
  tags: Tag[]
}

const items: Item[] = [
  {
    id: 'vid-burger',
    video: '/menu-pixel-burger.mp4',
    name: 'Pixel Burger',
    price: '32 zł',
    desc: 'Soczysta wołowina premium, cheddar, świeża sałata, pomidor i autorski Pixel Sauce.',
    tags: [{ label: 'LEGENDARY', rarity: 'legendary' }, { label: 'HP +80' }, { label: 'BESTSELLER' }],
  },
  {
    id: 'vid-fries',
    video: '/menu-arcade-fries.mp4',
    name: 'Arcade Fries',
    price: '16 zł',
    desc: 'Chrupiące frytki z intensywną przyprawą i sosem neon mayo.',
    tags: [{ label: 'RARE', rarity: 'rare' }, { label: 'CRUNCH HIGH' }, { label: 'SIDE QUEST' }],
  },
  {
    id: 'vid-combo',
    video: '/menu-combo-level-up.mp4',
    name: 'Combo Level-Up',
    price: '44 zł',
    desc: 'Burger, frytki i napój w pełnym zestawie gracza.',
    tags: [{ label: 'EPIC', rarity: 'epic' }, { label: 'FULL LOADOUT' }, { label: 'DUO MODE' }],
  },
  {
    id: 'vid-shake',
    video: '/menu-neon-shake.mp4',
    name: 'Neon Shake',
    price: '18 zł',
    desc: 'Kremowy shake o intensywnym smaku i neonowym charakterze.',
    tags: [{ label: 'EPIC', rarity: 'epic' }, { label: 'SWEET BUFF' }, { label: 'COOL DOWN' }],
  },
  {
    id: 'vid-boss-burger',
    video: '/menu-boss-burger.mp4',
    name: 'Boss Burger',
    price: '48 zł',
    desc: 'Podwójna wołowina, topiony cheddar, bekon i chrupiąca cebula — finałowy boss każdego głodu.',
    tags: [{ label: 'LEGENDARY', rarity: 'legendary' }, { label: 'HP +120' }, { label: 'BOSS FIGHT' }],
  },
  {
    id: 'vid-vege-burger',
    video: '/menu-vege-burger.mp4',
    name: 'Vege Burger',
    price: '34 zł',
    desc: 'Soczysty kotlet roślinny, awokado, świeże warzywa i wegański Pixel Sauce.',
    tags: [{ label: 'RARE', rarity: 'rare' }, { label: 'PLANT POWER' }, { label: 'GREEN BUFF' }],
  },
  {
    id: 'vid-pixel-nuggets',
    video: '/menu-pixel-nuggets.mp4',
    name: 'Pixel Nuggets',
    price: '22 zł',
    desc: 'Chrupiące nuggetsy z kurczaka w panierce i dwa sosy do wyboru.',
    tags: [{ label: 'RARE', rarity: 'rare' }, { label: 'CRUNCH HIGH' }, { label: 'SIDE QUEST' }],
  },
]

export default function PowerupMenu() {
  const [activeId, setActiveId] = useState(items[0].id)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const autoTimer = useRef<number | null>(null)
  const active = items.find((i) => i.id === activeId)!

  const stopAuto = () => {
    if (autoTimer.current !== null) {
      clearInterval(autoTimer.current)
      autoTimer.current = null
    }
  }

  // Wybór dania: na telefonie przez tap (onClick), na desktopie przez najechanie.
  // Tap zatrzymuje auto-przełączanie, żeby wybór gracza został (nie uciekał dalej).
  const select = (id: string) => {
    stopAuto()
    setActiveId(id)
  }

  // Odtwarzaj tylko aktywny film, resztę pauzuj.
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, vid]) => {
      if (!vid) return
      if (id === activeId) vid.play().catch(() => {})
      else vid.pause()
    })
  }, [activeId])

  // Na urządzeniach dotykowych (brak hovera) sam przełączam pozycje co kilka
  // sekund — animacja (zmiana filmu) działa jak hover na desktopie. Zatrzymuje
  // się po pierwszym tapnięciu (wtedy steruje użytkownik). Pomijane przy
  // prefers-reduced-motion.
  useEffect(() => {
    const noHover = window.matchMedia('(hover: none)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!noHover || reduced) return
    autoTimer.current = window.setInterval(() => {
      setActiveId((cur) => {
        const i = items.findIndex((it) => it.id === cur)
        return items[(i + 1) % items.length].id
      })
    }, 3500)
    return () => stopAuto()
  }, [])

  return (
    <section id="menu" className="powerup-section">

      {/* Lewy Panel - Sticky Visuals */}
      <div className="powerup-visuals">
        <div className="powerup-visual-overlay"></div>

        {items.map((it) => (
          <video
            key={it.id}
            ref={(el) => {
              videoRefs.current[it.id] = el
            }}
            className={`menu-vid ${it.id === activeId ? 'active' : ''}`}
            src={it.video}
            preload="none"
            loop
            muted
            playsInline
          />
        ))}

        {/* Karta szczegółów aktywnego dania */}
        <AnimatePresence>
          <motion.div
            key={active.id}
            className="menu-detail-card"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0, transition: springSnappy }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.2 } }}
          >
            <div className="menu-detail-header">
              <h3>{active.name}</h3>
              <span className="price">{active.price}</span>
            </div>
            <p>{active.desc}</p>
            <div className="powerup-tags">
              {active.tags.map((t) => (
                <span key={t.label} className={`powerup-tag ${t.rarity ?? ''}`}>{t.label}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prawy Panel - Lista Opcji */}
      <motion.div
        className="powerup-list"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <div className="powerup-list-header">
          <h2 className="text-glow-orange">CHOOSE YOUR POWER-UP</h2>
        </div>

        {items.map((it) => (
          <motion.div
            key={it.id}
            className={`powerup-item interactive ${it.id === activeId ? 'active' : ''}`}
            variants={revealFade}
            onMouseEnter={() => setActiveId(it.id)}
            onClick={() => select(it.id)}
          >
            <div className="powerup-item-header">
              <h3>{it.name}</h3>
              <span className="price">{it.price}</span>
            </div>
            <p>{it.desc}</p>
            <div className="powerup-tags">
              {it.tags.map((t) => (
                <span key={t.label} className={`powerup-tag ${t.rarity ?? ''}`}>{t.label}</span>
              ))}
            </div>
          </motion.div>
        ))}

      </motion.div>
    </section>
  )
}
