export default function StorySection() {
  return (
    <section id="story" className="story-section">

      {/* Pinned by GSAP */}
      <div className="video-stage">
        <div className="video-overlay"></div>
        <video id="scene-02" className="story-video active" src="/scene-02-entrance.mp4" preload="none" loop muted playsInline></video>
        <video id="scene-03" className="story-video" src="/scene-03-interior.mp4" preload="none" loop muted playsInline></video>
        <video id="scene-04" className="story-video" src="/scene-04-kitchen.mp4" preload="none" loop muted playsInline></video>
        <video id="scene-05" className="story-video" src="/scene-05-burger.mp4" preload="none" loop muted playsInline></video>
        <video id="scene-06" className="story-video" src="/scene-06-cta.mp4" preload="none" loop muted playsInline></video>
      </div>

      <div className="steps-container">
        <div className="step" data-scene="scene-02">
          <div className="dialog-box">
            <span className="dialog-level">SCENE 01 / LEVEL 01</span>
            <h2>Drzwi do świata Pixel Bites</h2>
            <p>Ciepłe światło, deszcz za oknem i zapach świeżego jedzenia. Scrollujesz dalej — jakbyś wchodził do gry.</p>
          </div>
        </div>

        <div className="step right-align" data-scene="scene-03">
          <div className="dialog-box">
            <span className="dialog-level">SCENE 02 / LEVEL 02</span>
            <h2>Wnętrze pełne retro klimatu</h2>
            <p>Arcade machine, pixelowe światła i goście, którzy właśnie odblokowali najlepszy posiłek dnia.</p>
          </div>
        </div>

        <div className="step" data-scene="scene-04">
          <div className="dialog-box">
            <span className="dialog-level">SCENE 03 / LEVEL 03</span>
            <h2>Kuchnia działa jak game engine</h2>
            <p>Każdy burger składany jest jak idealny build: świeże składniki, ogień, para i zero przypadkowych ruchów.</p>
          </div>
        </div>

        <div className="step right-align" data-scene="scene-05">
          <div className="dialog-box">
            <span className="dialog-level">SCENE 04 / POWER-UP</span>
            <h2>Burger, który wygląda jak loot legendarny</h2>
            <p>Soczysty, świecący, absurdalnie apetyczny. To moment, w którym użytkownik ma poczuć: chcę to zjeść.</p>
          </div>
        </div>

        <div className="step" data-scene="scene-06">
          <div className="dialog-box">
            <span className="dialog-level">SCENE 05 / FINAL LEVEL</span>
            <h2>Gotowy na rezerwację?</h2>
            <p>Pixel Bites to restauracja dla ludzi, którzy lubią klimat, smak i doświadczenia, które zapamiętuje się po wyjściu.</p>
            <div className="magnetic-wrap interactive">
              <a href="#menu" className="pixel-btn">ZOBACZ MENU</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
