import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

/**
 * Cała imperatywna logika strony: Lenis (smooth scroll), custom cursor +
 * magnetic buttons, tło WebGL (Three.js — ładowane leniwie), animacje
 * GSAP/ScrollTrigger, pasek postępu scrolla, podświetlanie aktywnej sekcji
 * oraz akordeon FAQ. Wszystko sprzątane przy odmontowaniu / HMR.
 *
 * Respektuje `prefers-reduced-motion`: wyłącza ciągłe i duże animacje
 * (cząsteczki WebGL, parallax, magnetyczne przyciski, smooth scroll, intro),
 * a treść ustawia od razu w stanie docelowym (czytelna bez ruchu).
 */
export function useExperience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Preferencje / możliwości urządzenia.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const isSmallScreen = window.innerWidth <= 768
    // WebGL tylko na desktopie z myszką i bez "ogranicz ruch" (bateria + a11y).
    const enableWebGL = !reducedMotion && hasFinePointer && !isSmallScreen
    const enableCursor = hasFinePointer

    // Wspólny AbortController do zdejmowania wszystkich listenerów naraz.
    const ac = new AbortController()
    const { signal } = ac

    // 1. INIT LENIS (Smooth Scroll) — pomijany przy reduced-motion (natywny scroll).
    let lenis: Lenis | null = null
    let lenisRaf: ((time: number) => void) | null = null
    if (!reducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1,
      })
      lenis.on('scroll', ScrollTrigger.update)
      lenisRaf = (time: number) => lenis!.raf(time * 1000)
      gsap.ticker.add(lenisRaf)
      gsap.ticker.lagSmoothing(0)
    }

    // Pomocnik: płynne / natywne przewinięcie do celu.
    const scrollToTarget = (target: string | number) => {
      if (lenis) lenis.scrollTo(target, { duration: 1.4 })
      else if (typeof target === 'number') window.scrollTo({ top: target })
      else document.querySelector(target)?.scrollIntoView({ behavior: 'auto' })
    }

    // 2. CUSTOM CURSOR & MAGNETIC BUTTONS (tylko fine pointer).
    const cursor = document.getElementById('cursor')
    let cursorRaf: (() => void) | null = null
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    // Parallax tła reaguje na te wartości (ustawiane w jednym listenerze niżej).
    let parallaxX = 0
    let parallaxY = 0

    // Jeden listener mousemove obsługuje i kursor, i parallax WebGL.
    document.addEventListener(
      'mousemove',
      (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
        parallaxX = (e.clientX / window.innerWidth) * 2 - 1
        parallaxY = -(e.clientY / window.innerHeight) * 2 + 1
      },
      { signal },
    )

    if (enableCursor && cursor) {
      cursorRaf = () => {
        cursorX += (mouseX - cursorX) * 0.2
        cursorY += (mouseY - cursorY) * 0.2
        gsap.set(cursor, { x: cursorX, y: cursorY })
      }
      gsap.ticker.add(cursorRaf)

      document.querySelectorAll('.interactive, a, button').forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'), { signal })
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'), { signal })
      })
    }

    // Magnetyczne przyciski — pomijane przy reduced-motion.
    if (!reducedMotion && hasFinePointer) {
      document.querySelectorAll<HTMLElement>('.magnetic-wrap').forEach((wrap) => {
        const btn = wrap.querySelector('.pixel-btn')
        if (!btn) return
        wrap.addEventListener(
          'mousemove',
          (e) => {
            const rect = wrap.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2
            gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: 'power2.out' })
          },
          { signal },
        )
        wrap.addEventListener(
          'mouseleave',
          () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' }),
          { signal },
        )
      })
    }

    // 2b. PŁYNNE PRZEWIJANIE DO KOTWIC (#) + podświetlenie aktywnej sekcji.
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
      link.addEventListener(
        'click',
        (e) => {
          const href = link.getAttribute('href') || ''
          e.preventDefault()
          if (href === '#' || href === '') {
            scrollToTarget(0)
            return
          }
          if (document.querySelector(href)) scrollToTarget(href)
        },
        { signal },
      )
    })

    // Aktywna sekcja → klasa .active na pasujących linkach nawigacji.
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = entry.target.id
          document.querySelectorAll('.nav-link').forEach((l) =>
            l.classList.toggle('active', l.getAttribute('href') === `#${id}`),
          )
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sections.forEach((s) => sectionObserver.observe(s))

    // Pasek postępu scrolla.
    const progressBar = document.getElementById('scroll-progress')
    const updateProgress = () => {
      if (!progressBar) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? window.scrollY / max : 0
      progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`
    }
    updateProgress()
    if (lenis) lenis.on('scroll', updateProgress)
    else window.addEventListener('scroll', updateProgress, { signal, passive: true })

    // 3. THREE.JS WEBGL BACKGROUND — ładowane leniwie (code-split) i tylko gdy włączone.
    let disposed = false
    let threeCleanup: (() => void) | null = null
    const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement | null

    if (enableWebGL && canvas) {
      import('three').then((THREE) => {
        if (disposed) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        const particlesGroup = new THREE.Group()
        scene.add(particlesGroup)

        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
        const materialOrange = new THREE.MeshBasicMaterial({ color: 0xff8c00, transparent: true, opacity: 0.6 })
        const materialPink = new THREE.MeshBasicMaterial({ color: 0xff007f, transparent: true, opacity: 0.6 })

        for (let i = 0; i < 150; i++) {
          const mesh = new THREE.Mesh(geometry, Math.random() > 0.5 ? materialOrange : materialPink)
          mesh.position.x = (Math.random() - 0.5) * 20
          mesh.position.y = (Math.random() - 0.5) * 20
          mesh.position.z = (Math.random() - 0.5) * 10 - 5
          mesh.rotation.x = Math.random() * Math.PI
          mesh.rotation.y = Math.random() * Math.PI
          particlesGroup.add(mesh)
        }
        camera.position.z = 5

        let rafId = 0
        const animate = () => {
          particlesGroup.rotation.x += 0.001
          particlesGroup.rotation.y += 0.002
          particlesGroup.position.x += (parallaxX * 0.5 - particlesGroup.position.x) * 0.05
          particlesGroup.position.y += (parallaxY * 0.5 - particlesGroup.position.y) * 0.05
          particlesGroup.children.forEach((child) => {
            child.position.y += 0.01
            child.rotation.x += 0.01
            if (child.position.y > 10) child.position.y = -10
          })
          renderer.render(scene, camera)
          rafId = requestAnimationFrame(animate)
        }
        animate()

        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', onResize, { signal })

        threeCleanup = () => {
          cancelAnimationFrame(rafId)
          geometry.dispose()
          materialOrange.dispose()
          materialPink.dispose()
          renderer.dispose()
        }
      })
    }

    // 4. GSAP ANIMATIONS & SCROLL TRIGGER (objęte kontekstem dla łatwego revert).
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        // Reduced-motion: pokaż treść od razu, bez wjazdów.
        gsap.set('.hero-title, .hero-desc, .hero .magnetic-wrap', { opacity: 1, y: 0, scale: 1 })
        gsap.set('.dialog-box', { opacity: 1, y: 0 })
        gsap.set('.layer-label', { opacity: 1, x: 0 })
        gsap.set('.xp-bar-fill', { width: '74%' })
      } else {
        // Intro
        gsap.from('.hero-title', { y: 100, opacity: 0, duration: 1.5, ease: 'power4.out', delay: 0.2 })
        gsap.from('.hero-desc', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.6 })
        gsap.from('.hero .magnetic-wrap', { scale: 0, opacity: 0, duration: 1, ease: 'back.out(1.7)', delay: 1 })

        // Pasek XP wypełniany scrollem.
        gsap.to('.xp-bar-fill', {
          width: '74%',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.rewards-section', start: 'top 65%' },
        })
      }

      // Przypinanie tła Video (potrzebne dla layoutu również przy reduced-motion).
      ScrollTrigger.create({
        trigger: '.story-section',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.video-stage',
      })

      const steps = document.querySelectorAll<HTMLElement>('.step')
      const videos = document.querySelectorAll<HTMLVideoElement>('.story-video')

      const switchVideo = (targetId: string) => {
        videos.forEach((video) => {
          if (video.id === targetId) {
            video.classList.add('active')
            video.play().catch(() => {})
          } else {
            video.classList.remove('active')
            video.pause()
          }
        })
      }

      steps.forEach((step) => {
        const dialogBox = step.querySelector('.dialog-box')
        const targetScene = step.getAttribute('data-scene')
        if (!targetScene) return

        if (!reducedMotion && dialogBox) {
          gsap.to(dialogBox, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 60%', toggleActions: 'play none none reverse' },
          })
        }

        ScrollTrigger.create({
          trigger: step,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => switchVideo(targetScene),
          onEnterBack: () => switchVideo(targetScene),
        })
      })

      // 5. BUILD YOUR BURGER
      // Desktop (≥769px): warstwy rozjeżdżają się przy scrollu, etykiety obok.
      // Mobile (≤768px): NIE pinujemy/scrubujemy — przy małej szerokości warstwy
      //   i boczne etykiety wyjeżdżały poza ekran ("znikały"). Tam burger to
      //   statyczny stos (ułożony w CSS), a opisy składników są listą pod nim.
      const mm = gsap.matchMedia()
      const desktopStack = [-90, -60, -30, 0, 30, 60, 90]
      const desktopSpread = [
        { y: -260, x: -80, rot: -6 },
        { y: -175, x: 80, rot: 5 },
        { y: -90, x: -70, rot: -3 },
        { y: -5, x: 70, rot: 2 },
        { y: 80, x: -80, rot: -4 },
        { y: 165, x: 80, rot: 4 },
        { y: 250, x: -70, rot: -5 },
      ]

      mm.add('(min-width: 769px)', () => {
        const layers = document.querySelectorAll<HTMLElement>('.burger-layer')

        // Rozrzut skalujemy do wysokości sceny, żeby na niższych ekranach (laptopy)
        // skrajne warstwy i etykiety nie wchodziły na nagłówek ani nie uciekały pod
        // ekran. baseHalf = maksymalne |y| w projekcie referencyjnym (260px).
        const stageEl = document.querySelector<HTMLElement>('.burger-stage')
        const stageH = stageEl?.clientHeight || window.innerHeight * 0.75
        const baseHalf = 260
        const maxHalf = Math.max(120, stageH / 2 - 95) // ~95px zapasu na połowę warstwy + etykietę
        const scale = Math.min(1, maxHalf / baseHalf)
        const spread = desktopSpread.map((s) => ({ x: s.x, rot: s.rot, y: s.y * scale }))

        if (reducedMotion) {
          // Bez ruchu: pokaż docelowy rozkład + etykiety od razu (bez scrubu/pinu).
          layers.forEach((layer, index) => {
            gsap.set(layer, { y: spread[index].y, x: spread[index].x, rotation: spread[index].rot })
            const label = layer.querySelector('.layer-label')
            if (label) gsap.set(label, { opacity: 1, x: 0 })
          })
          return
        }
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '#build-burger', start: 'top top', end: '+=150%', pin: true, scrub: 1 },
        })
        layers.forEach((layer, index) => {
          gsap.set(layer, { y: desktopStack[index], x: 0, rotation: 0 })
          tl.to(
            layer,
            { y: spread[index].y, x: spread[index].x, rotation: spread[index].rot, ease: 'power1.inOut' },
            0,
          )
          const label = layer.querySelector('.layer-label')
          if (label) tl.to(label, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 0.3)
        })
      })
      // Mobile (≤768px): bez JS — statyczny stos warstw ustawia CSS (nth-child).
    })

    // FAQ Accordion Logic.
    const faqItems = document.querySelectorAll<HTMLElement>('.faq-item')
    faqItems.forEach((item) => {
      const btn = item.querySelector('.faq-btn')
      const content = item.querySelector<HTMLElement>('.faq-content')
      if (!btn || !content) return

      btn.addEventListener(
        'click',
        () => {
          const isActive = item.classList.contains('active')
          faqItems.forEach((other) => {
            other.classList.remove('active')
            other.querySelector('.faq-btn')?.setAttribute('aria-expanded', 'false')
            const c = other.querySelector<HTMLElement>('.faq-content')
            if (c) c.style.maxHeight = ''
          })
          if (!isActive) {
            item.classList.add('active')
            btn.setAttribute('aria-expanded', 'true')
            content.style.maxHeight = content.scrollHeight + 'px'
          }
        },
        { signal },
      )
    })

    // Odświeżenie pozycji ScrollTriggera po pełnym zbudowaniu layoutu.
    // WAŻNE: pinowane sekcje (.video-stage, #build-burger) tworzą pin-spacery,
    // których wysokość zależy od ostatecznego layoutu. Jeśli refresh wykona się
    // zanim załadują się fonty/obrazy, ScrollTrigger źle policzy wysokości i
    // sekcje potrafią się "zapaść" (footer wjeżdża na hero). Dlatego odświeżamy
    // po dwóch klatkach oraz dodatkowo po load i gotowości fontów.
    const refresh = () => {
      if (!disposed) ScrollTrigger.refresh()
    }
    requestAnimationFrame(() => requestAnimationFrame(refresh))
    window.addEventListener('load', refresh, { signal })
    if (document.fonts?.ready) document.fonts.ready.then(refresh)

    // ====== CLEANUP (odmontowanie / HMR) ======
    return () => {
      disposed = true
      ac.abort()
      sectionObserver.disconnect()
      if (cursorRaf) gsap.ticker.remove(cursorRaf)
      if (lenisRaf) gsap.ticker.remove(lenisRaf)
      threeCleanup?.()
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      lenis?.destroy()
    }
  }, [])
}
