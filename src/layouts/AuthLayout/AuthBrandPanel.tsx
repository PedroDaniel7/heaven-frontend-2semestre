/**
 * Composição de marca das telas de autenticação.
 *
 * É a coluna direita do layout `form | brand composition`
 * (06-responsive.md §21). Puramente decorativa: não contém interação
 * nem informação necessária para concluir o formulário, e por isso é
 * ocultada no mobile.
 */
export function AuthBrandPanel() {
  return (
    <aside
      aria-hidden="true"
      className="relative hidden overflow-hidden bg-forest lg:block lg:w-[52%]"
    >
      {/* Profundidade sutil do painel (02-design-system.md §14). */}
      <div className="absolute inset-0 bg-[radial-gradient(115%_85%_at_50%_30%,var(--color-forest)_0%,var(--color-forest-deep)_100%)]" />

      {/* Arco da marca. */}
      <svg
        viewBox="0 0 600 600"
        className="absolute top-[42%] left-1/2 w-[71%] -translate-x-1/2 -translate-y-1/2"
        fill="none"
      >
        <defs>
          <linearGradient id="heaven-arc" x1="300" y1="12" x2="300" y2="588">
            <stop offset="0" stopColor="var(--color-sage)" stopOpacity="0.95" />
            <stop
              offset="0.3"
              stopColor="var(--color-sage)"
              stopOpacity="0.42"
            />
            <stop
              offset="0.62"
              stopColor="var(--color-sage)"
              stopOpacity="0.16"
            />
            <stop
              offset="0.86"
              stopColor="var(--color-sage)"
              stopOpacity="0.04"
            />
            <stop offset="1" stopColor="var(--color-sage)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle
          cx="300"
          cy="300"
          r="294"
          stroke="url(#heaven-arc)"
          strokeWidth="3"
        />
      </svg>

      <div className="relative flex h-full items-center justify-center px-12">
        <p className="text-center font-serif text-[2.125rem] leading-[1.28] text-on-forest">
          Toda jornada
          <br />
          começa com uma escolha.
        </p>
      </div>

      {/* Divisor discreto abaixo da frase. */}
      <div className="absolute top-[calc(50%+4.25rem)] left-1/2 h-px w-10 -translate-x-1/2 bg-on-forest/25" />
    </aside>
  )
}
