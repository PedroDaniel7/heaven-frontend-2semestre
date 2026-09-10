import { CLASS_NAME } from '../../data/members'

/** Rodapé institucional, idêntico nas 7 páginas da Sprint 2. */
export function Footer() {
  return (
    <footer className="mt-auto bg-forest">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <p className="text-center text-xs text-on-forest/80">
          © 2026 Heaven Project — Turma {CLASS_NAME}. FIAP. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  )
}
