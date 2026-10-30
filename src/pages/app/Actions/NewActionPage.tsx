import { ResultadoApi, AvisoVazio } from '../../../components/EstadoApi'
import { NewActionForm } from '../../../features/actions'
import { useApi } from '../../../hooks/useApi'
import { listarTiposAcao } from '../../../services/tiposAcao'

/** Nova ação — /app/acoes/nova. Os tipos vêm de GET /tipos-acao. */
export function NewActionPage() {
  const { estado, recarregar } = useApi(listarTiposAcao)

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="font-serif text-4xl text-ink">
        Registrar Nova Ação Sustentável
      </h1>
      <p className="mt-3 leading-relaxed text-body">
        Sua ação passará pela validação descentralizada da comunidade antes de
        computar os pontos.
      </p>

      <section className="mt-8 rounded-lg border border-border p-6 sm:p-8">
        <ResultadoApi
          estado={estado}
          onTentarNovamente={recarregar}
          rotuloCarregando="Carregando os tipos de ação…"
          vazio={
            <AvisoVazio
              titulo="Nenhum tipo de ação disponível"
              texto="Não há tipos de ação ativos no momento. Tente novamente mais tarde."
            />
          }
        >
          {(tipos) => <NewActionForm tipos={tipos} />}
        </ResultadoApi>
      </section>
    </div>
  )
}
