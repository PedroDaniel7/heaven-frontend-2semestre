type LogoProps = {
  /** Classe do bloco da marca, para ajustar a cor por contexto. */
  className?: string
}

/**
 * Marca Heaven: símbolo circular + wordmark em serif
 * (02-design-system.md §6 e §42).
 */
export function Logo({ className }: LogoProps) {
  return (
    <div className={`flex flex-col items-center ${className ?? ''}`}>
      <svg
        viewBox="0 0 48 48"
        className="h-12 w-12"
        aria-hidden="true"
        fill="none"
      >
        <defs>
          <linearGradient id="heaven-mark" x1="24" y1="3" x2="24" y2="45">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <circle
          cx="24"
          cy="24"
          r="21"
          stroke="url(#heaven-mark)"
          strokeWidth="1.3"
        />
      </svg>
      <span className="-mt-2.5 font-serif text-[2.5rem] leading-none tracking-[0.015em]">
        Heaven
      </span>
    </div>
  )
}
