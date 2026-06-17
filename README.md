# Pixel Bites — React + Vite + TypeScript

Wersja strony `pixelbites3.html` przepisana 1:1 na nowoczesny stack:
**React 18 + Vite + TypeScript**, z bibliotekami zainstalowanymi przez npm
(zamiast CDN): **GSAP + ScrollTrigger**, **Lenis** (smooth scroll) i **Three.js**
(tło WebGL).

## Uruchomienie

```bash
npm install
npm run dev      # serwer deweloperski (http://localhost:5173)
npm run build    # produkcyjny build do ./dist
npm run preview  # podgląd builda produkcyjnego
```

## Struktura

```
src/
  components/        # każda sekcja strony jako osobny komponent
    Navbar.tsx  Hero.tsx  StorySection.tsx  BurgerSection.tsx
    PowerupMenu.tsx  Reviews.tsx  Events.tsx  Location.tsx
    PixelPass.tsx  Faq.tsx  Cta.tsx  Footer.tsx
  hooks/
    useExperience.ts # cała logika imperatywna: Lenis, GSAP/ScrollTrigger,
                     # Three.js, custom cursor, magnetic buttons,
                     # menu power-up i akordeon FAQ (z pełnym cleanupem)
  index.css          # style 1:1 z oryginału
  App.tsx            # składa wszystkie sekcje
  main.tsx           # punkt wejścia (bez StrictMode — patrz komentarz w pliku)
public/              # wszystkie materiały (mp4 / png) serwowane spod "/"
```

Wygląd, animacje i zachowanie są identyczne z oryginalnym jednoplikowym HTML-em.
