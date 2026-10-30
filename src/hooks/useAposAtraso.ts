import { useEffect, useState } from 'react'

/** Fica verdadeiro quando `ativo` dura mais que `atrasoMs` seguidos; volta a falso com `ativo`. */
export function useAposAtraso(ativo: boolean, atrasoMs = 3000): boolean {
  const [passou, setPassou] = useState(false)

  useEffect(() => {
    if (!ativo) return
    const id = window.setTimeout(() => setPassou(true), atrasoMs)
    return () => {
      window.clearTimeout(id)
      setPassou(false)
    }
  }, [ativo, atrasoMs])

  return ativo && passou
}
