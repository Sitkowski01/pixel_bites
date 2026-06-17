import { motion } from 'framer-motion'
import { revealLeft, revealRight, viewportOnce } from './motion'
import { site } from '../data/site'

export default function Location() {
  return (
    <section id="location" className="location-section">
      <motion.div className="location-visual" variants={revealLeft} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <img
          src="/pixel-map.png"
          alt="Mapa z lokalizacją Pixel Bites w Szczecinie"
          className="location-map"
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      <motion.div className="location-info" variants={revealRight} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <h2 className="text-glow-orange">WORLD MAP</h2>
        <p>Znajdź Pixel Bites i rozpocznij kolejny quest.</p>

        <div className="loc-block">
          <h4>Address:</h4>
          <p>{site.address}</p>
        </div>

        <div className="loc-block">
          <h4>Opening Hours:</h4>
          <p>
            {site.hours.map((h) => (
              <span key={h.days} style={{ display: 'block' }}>{h.days}: {h.time}</span>
            ))}
          </p>
        </div>

        <div className="loc-block">
          <h4>Contact:</h4>
          <p>
            <a href={`tel:${site.phone}`} className="interactive">{site.phoneDisplay}</a>
            <br />
            <a href={`mailto:${site.email}`} className="interactive">{site.email}</a>
          </p>
        </div>

        <div className="loc-buttons">
          <div className="magnetic-wrap interactive">
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="pixel-btn">
              POKAŻ TRASĘ
            </a>
          </div>
          <div className="magnetic-wrap interactive">
            <a href={`tel:${site.phone}`} className="pixel-btn">ZADZWOŃ</a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
