import type { Variants, Transition } from 'framer-motion'

/**
 * Wspólny język ruchu (spójność = "taste").
 * Sprężyny zamiast linowych easingów dają naturalne, fizyczne odczucie
 * w duchu prac Emila Kowalskiego. Wszystkie komponenty czerpią z tych presetów,
 * dzięki czemu cała strona ma jeden rytm.
 */

// Bazowa, miękka sprężyna do reveali sekcji.
export const spring: Transition = { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 }

// Szybsza, sprężysta sprężyna do mikrointerakcji (hover / tap).
export const springSnappy: Transition = { type: 'spring', stiffness: 420, damping: 32 }

// Jeden próg wejścia w viewport dla całej strony.
export const viewportOnce = { once: true, amount: 0.25 } as const

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: spring },
}

export const revealLeft: Variants = {
  hidden: { opacity: 0, x: -56 },
  show: { opacity: 1, x: 0, transition: spring },
}

export const revealRight: Variants = {
  hidden: { opacity: 0, x: 56 },
  show: { opacity: 1, x: 0, transition: spring },
}

export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: spring },
}

// Reveal tylko na opacity — używany tam, gdzie transform musi zostać dla CSS
// (np. pozycje menu, które przy hover/aktywności przesuwają się w CSS).
export const revealFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Lekki "pop" z delikatnym overshootem do finałowego CTA.
export const popIn: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 17 } },
}

// Kontener kaskadujący wejście dzieci (stagger 70ms — w zakresie zaleceń 30–50/70ms).
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

// Mikrointerakcje: subtelne uniesienie + scale-feedback, oraz "shrink" przy nacisku.
export const cardLift = { y: -10, scale: 1.02 }
export const cardSlide = { x: 10, scale: 1.01 }
export const tapShrink = { scale: 0.97 }
