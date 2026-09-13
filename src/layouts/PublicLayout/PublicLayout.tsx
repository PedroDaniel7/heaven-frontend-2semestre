import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { Outlet } from 'react-router-dom'

import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'

/** Destino do skip link: o conteúdo principal de cada página pública. */
const MAIN_CONTENT_ID = 'main-content'

/**
 * Estrutura das páginas públicas herdadas da Sprint 2
 * (03-architecture.md §5 e §6.1).
 *
 * Concentra o header e o rodapé que no legado eram repetidos em cada
 * arquivo HTML, além do skip link que permite pular a navegação.
 */
export function PublicLayout() {
  const mainRef = useRef<HTMLElement>(null)

  // O header é sticky: a rolagem nativa da âncora deixaria o início do
  // conteúdo escondido sob ele, então apenas movemos o foco.
  const handleSkipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    mainRef.current?.focus({ preventScroll: true })
  }

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <a
        href={`#${MAIN_CONTENT_ID}`}
        onClick={handleSkipToContent}
        className={[
          'sr-only outline-none',
          'focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60',
          'focus:rounded-md focus:bg-primary focus:px-4 focus:py-3',
          'focus:text-sm focus:font-medium focus:text-canvas',
          'focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        ].join(' ')}
      >
        Pular para o conteúdo principal
      </a>

      <Navbar />

      <main
        id={MAIN_CONTENT_ID}
        ref={mainRef}
        tabIndex={-1}
        className="flex-1 outline-none"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
