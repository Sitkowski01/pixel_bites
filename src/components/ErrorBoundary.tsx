import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

/**
 * Łapie błędy renderowania, żeby imperatywna logika (GSAP/Three.js/DOM)
 * nie wywaliła całej strony na biały ekran. Pokazuje prosty fallback.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Pixel Bites — błąd renderowania:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h1 className="text-glow-pink">GAME OVER</h1>
          <p>Coś poszło nie tak. Odśwież stronę, aby wczytać level od nowa.</p>
          <button type="button" className="pixel-btn" onClick={() => window.location.reload()}>
            CONTINUE?
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
