import { useEffect, useState } from 'react'

const STORAGE_KEY = 'pb-cookie-consent'

/**
 * Minimalny baner zgody (RODO). Zapamiętuje wybór w localStorage.
 * Analytics (jeśli dojdą) powinny startować dopiero po akceptacji.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      // localStorage niedostępne (np. tryb prywatny) — nie pokazuj banera.
    }
  }, [])

  const decide = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Zgoda na pliki cookie">
      <p>
        Używamy plików cookie, aby strona działała poprawnie i była lepsza.{' '}
        <a href="#" className="interactive">Polityka prywatności</a>.
      </p>
      <div className="cookie-actions">
        <button type="button" className="pixel-btn cookie-accept" onClick={() => decide('accepted')}>
          AKCEPTUJ
        </button>
        <button type="button" className="cookie-decline interactive" onClick={() => decide('declined')}>
          Tylko niezbędne
        </button>
      </div>
    </div>
  )
}
