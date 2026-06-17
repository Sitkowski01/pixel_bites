import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Brak <StrictMode> celowo: ten projekt opiera się na imperatywnych bibliotekach
// (GSAP/ScrollTrigger, Lenis, Three.js), które podwójna inicjalizacja w trybie
// dev StrictMode mogłaby zdublować. Logika jest sprzątana w hooku useExperience.
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
