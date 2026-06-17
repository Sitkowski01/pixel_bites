export default function Hero() {
  return (
    <header className="hero">
      <video className="hero-video" src="/scene-01-hero.mp4" autoPlay loop muted playsInline></video>
      <div className="hero-gradient"></div>

      <div className="hero-content">
        <h1 className="hero-title text-glow-orange">Pixelowa restauracja.<br />Prawdziwy smak.</h1>
        <p className="hero-desc">Wejdź do świata neonów, burgerów-power-upów i klimatu retro arcade.</p>
        <div className="magnetic-wrap interactive">
          <a href="#story" className="pixel-btn">START GAME</a>
        </div>
      </div>
    </header>
  )
}
