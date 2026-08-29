# Pixel Bites — strona restauracji w konwencji pixel-artowego automatu

Landing page, który ma zapaść w pamięć w trzy sekundy: pixel-artowa oprawa, płynne
przewijanie, własny kursor i animowane tło 3D w WebGL.

**Na żywo:** [pixel-bites-tawny.vercel.app](https://pixel-bites-tawny.vercel.app)

Projekt zaczął się jako **jeden plik `pixelbites3.html`** z bibliotekami z CDN.
Ta wersja to przepisanie go na **React 18 + Vite + TypeScript** z zależnościami
z npm — przy zachowaniu wyglądu i zachowania jeden do jednego.

## Po co było przepisywać

Jednoplikowy HTML działał, ale każda zmiana oznaczała skakanie po kilkuset liniach
przemieszanego znacznika, stylu i skryptu. Po podziale każda sekcja strony jest
osobnym komponentem, a **cała logika imperatywna siedzi w jednym hooku**
(`useExperience`) — zamiast być rozsypana po pliku. Biblioteki z npm zamiast CDN
oznaczają też przypięte wersje i brak zależności od cudzego serwera przy wczytywaniu.

## Decyzje projektowe

**Efekty są warunkowe, nie bezwarunkowe.** Hook sprawdza możliwości i preferencje
urządzenia, zanim cokolwiek uruchomi:

```ts
const reducedMotion  = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const hasFinePointer = window.matchMedia('(pointer: fine)').matches
const isSmallScreen  = window.innerWidth <= 768

const enableWebGL  = !reducedMotion && hasFinePointer && !isSmallScreen
const enableCursor = hasFinePointer
```

- **Tło WebGL tylko na desktopie z myszką.** Na telefonie kosztowałoby baterię
  i klatki, a i tak nie ma tam kursora, na który reaguje.
- **`prefers-reduced-motion` wyłącza płynne przewijanie i magnetyczne przyciski.**
  Ktoś, kto ustawił w systemie ograniczenie ruchu, dostaje natywny scroll — to nie
  jest ustawienie kosmetyczne, dla części osób animacje wywołują mdłości.
- **Własny kursor tylko przy „fine pointer".** Na dotyku nie ma czego zastępować.

**Jeden nasłuch `mousemove` obsługuje i kursor, i parallaks tła.** Dwa osobne
liczyłyby pozycję dwa razy na każdy ruch myszy.

**Wszystkie nasłuchy zdejmuje jeden `AbortController`.** Przy odmontowaniu wystarczy
`ac.abort()` — nie ma listy `removeEventListener`, z której łatwo coś pominąć.

**Świadomie bez `<StrictMode>`.** GSAP/ScrollTrigger, Lenis i Three.js są imperatywne
i trzymają stan poza Reactem; podwójne montowanie w trybie deweloperskim potrafiłoby
zdublować ich inicjalizację. Sprzątanie jest zrobione w hooku — komentarz
z uzasadnieniem stoi w `src/main.tsx`, żeby nikt tego nie „naprawił" przez przypadek.

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
  components/        każda sekcja strony jako osobny komponent
    Navbar.tsx  Hero.tsx  StorySection.tsx  BurgerSection.tsx
    PowerupMenu.tsx  Reviews.tsx  Events.tsx  Location.tsx
    PixelPass.tsx  Faq.tsx  Cta.tsx  Footer.tsx
  hooks/
    useExperience.ts   407 linii: Lenis, GSAP/ScrollTrigger, Three.js,
                       własny kursor, magnetyczne przyciski, menu i FAQ
                       — wraz z pełnym sprzątaniem
  index.css            style przeniesione jeden do jednego z oryginału
  App.tsx              składa wszystkie sekcje
  main.tsx             punkt wejścia
public/                materiały (mp4 / png) serwowane spod „/"
```

## Stack

| Warstwa | Technologie |
|---|---|
| Framework | React 18, Vite, TypeScript |
| Animacje | GSAP + ScrollTrigger |
| Przewijanie | Lenis |
| Tło 3D | Three.js |

## Czego tu nie ma

- **Brak testów** — to strona prezentacyjna bez logiki biznesowej; ryzyko regresji
  dotyczy wyglądu, którego test jednostkowy i tak nie złapie. Sensowne byłyby tu
  raczej zrzuty porównawcze niż asercje.
- **Style zostały przeniesione bez zmian** z oryginalnego pliku, razem z jego
  konwencjami nazewniczymi — celem było przepisanie jeden do jednego, nie porządki
  w CSS przy okazji.
- Treść jest wpisana w komponenty; strona nie ma źródła danych ani panelu.
