/**
 * Jedno źródło prawdy dla danych biznesowych.
 * Wszystkie komponenty (Navbar, Footer, Location, Cta) czerpią stąd,
 * dzięki czemu podmiana numeru / adresu / linków to jedna zmiana w tym pliku.
 *
 * UWAGA: poniższe dane to placeholdery — podmień na prawdziwe przed publikacją.
 */

export const site = {
  name: 'Pixel Bites',
  tagline: 'Eat. Play. Repeat.',
  url: 'https://pixelbites.pl',
  // Telefon w formacie do tel: (bez spacji) oraz wersja do wyświetlenia.
  phone: '+48530082882',
  phoneDisplay: '+48 530 082 882',
  email: 'mjgweb@kontakt.pl',
  address: 'ul. Maksymiliana Golisza 6G, Szczecin',
  mapsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=ul.%20Maksymiliana%20Golisza%206G%2C%20Szczecin',
  hours: [
    { days: 'Pon–Czw', time: '12:00–22:00' },
    { days: 'Pt–Sob', time: '12:00–00:00' },
    { days: 'Niedz', time: '12:00–21:00' },
  ],
} as const

export const navLinks = [
  { href: '#story', label: 'STORY' },
  { href: '#menu', label: 'MENU' },
  { href: '#events', label: 'EVENTS' },
  { href: '#location', label: 'MAP' },
  { href: '#pixel-pass', label: 'PASS' },
  { href: '#faq', label: 'FAQ' },
] as const

// Linki social na razie kierują na stronę główną (brak realnych profili).
export const socials = [
  { label: 'Instagram', href: '/', short: 'IG' },
  { label: 'Facebook', href: '/', short: 'FB' },
  { label: 'TikTok', href: '/', short: 'TT' },
] as const

export const legalLinks = [
  { href: '#', label: 'Polityka prywatności' },
  { href: '#', label: 'Regulamin' },
] as const
