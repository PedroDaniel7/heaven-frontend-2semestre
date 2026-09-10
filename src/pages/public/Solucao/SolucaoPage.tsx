import { useState } from 'react'

import { DashboardPanel } from './Dashboard'
import { ValidarPanel } from './Validar'

type SolucaoTab = 'dashboard' | 'validar'

const TABS: { id: SolucaoTab; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'validar', label: 'Validar Ações' },
]

/**
 * Solução do Projeto — página pública obrigatória da Sprint 2
 * (04-screen-specs.md §5).
 *
 * As duas interfaces do legado (`solucao-dashboard.html` e
 * `solucao-validar.html`) convivem aqui em abas, sem virar rotas
 * próprias (03-architecture.md §15).
 */
export function SolucaoPage() {
  const [activeTab, setActiveTab] = useState<SolucaoTab>('dashboard')

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <header className="max-w-3xl">
        <h1 className="font-serif text-4xl text-ink">Solução do Projeto</h1>
        <p className="mt-3 leading-relaxed text-body">
          A solução do Heaven combina o registro de ações sustentáveis com a
          auditoria distribuída da própria comunidade.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Interfaces da solução"
        className="mt-10 inline-flex rounded-md border border-border bg-surface p-1"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`painel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={[
                'rounded px-5 py-2 text-sm transition-colors outline-none',
                'focus-visible:ring-2 focus-visible:ring-primary/30',
                isActive
                  ? 'bg-primary font-medium text-canvas'
                  : 'text-body hover:text-primary',
              ].join(' ')}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`painel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="mt-10"
      >
        {activeTab === 'dashboard' ? <DashboardPanel /> : <ValidarPanel />}
      </div>
    </div>
  )
}
