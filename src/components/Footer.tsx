import { site, navLinks, socials, legalLinks } from '../data/site'

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="footer-logo text-glow-pink">PIXEL BITES</span>
          <span className="footer-tagline">{site.tagline}</span>
          <ul className="footer-socials">
            {socials.map((s) => (
              <li key={s.label}>
                <a className="interactive" href={s.href} aria-label={s.label}>
                  {s.short}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer-col" aria-label="Nawigacja w stopce">
          <h4>MENU</h4>
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="interactive">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h4>KONTAKT</h4>
          <address>
            <p>{site.address}</p>
            <p>
              <a href={`tel:${site.phone}`} className="interactive">{site.phoneDisplay}</a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="interactive">{site.email}</a>
            </p>
          </address>
        </div>

        <div className="footer-col">
          <h4>GODZINY</h4>
          <ul className="footer-hours">
            {site.hours.map((h) => (
              <li key={h.days}>
                <span>{h.days}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <ul className="footer-legal">
          {legalLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="interactive">{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
