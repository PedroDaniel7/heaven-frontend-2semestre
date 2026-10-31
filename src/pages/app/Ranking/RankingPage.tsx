import { AvisoVazio, ResultadoApi } from '../../../components/EstadoApi'
import { useApi } from '../../../hooks/useApi'
import { listarRanking } from '../../../services/ranking'
import { obterMeuUsuario } from '../../../services/usuarios'
import { formatarNumero } from '../../../utils/formatar'

const LIMITE = 20

function carregarRanking() {
  return listarRanking(LIMITE)
}

const celula = 'px-4 py-3'

/**
 * Ranking — /app/ranking. Tabela a partir de 768 px e lista de cartões
 * abaixo disso. A linha do usuário é destacada pelo NOME: a API do
 * ranking não traz id, então nomes iguais se confundem.
 */
export function RankingPage() {
  const ranking = useApi(carregarRanking)
  const perfil = useApi(obterMeuUsuario)
  // Se o perfil falhar, o ranking segue sem destaque.
  const meuNome = perfil.estado.status === 'sucesso' ? perfil.estado.dados.nome : null

  return (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="font-serif text-4xl text-ink">Ranking</h1>
      <p className="mt-3 leading-relaxed text-body">
        Os {LIMITE} usuários com mais pontos na comunidade Heaven.
      </p>

      <div className="mt-8">
        <ResultadoApi
          estado={ranking.estado}
          onTentarNovamente={ranking.recarregar}
          rotuloCarregando="Carregando o ranking…"
          vazio={
            <AvisoVazio
              titulo="O ranking ainda está vazio"
              texto="Quando os usuários começarem a pontuar, eles aparecem aqui."
            />
          }
        >
          {(lista) => (
            <>
              <table className="hidden w-full text-left text-sm md:table">
                <caption className="sr-only">Ranking de usuários</caption>
                <thead className="border-b border-border text-xs tracking-wide text-muted uppercase">
                  <tr>
                    <th scope="col" className={celula}>Posição</th>
                    <th scope="col" className={celula}>Nome</th>
                    <th scope="col" className={`${celula} text-right`}>Pontos</th>
                    <th scope="col" className={celula}>Nível</th>
                    <th scope="col" className={`${celula} text-right`}>Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((item) => {
                    const eu = item.nome === meuNome
                    return (
                      <tr
                        key={item.posicao}
                        aria-current={eu ? 'true' : undefined}
                        className={`border-b border-border ${eu ? 'bg-primary/8 font-medium text-primary' : 'text-body'}`}
                      >
                        <td className={`${celula} font-serif text-lg`}>{item.posicao}º</td>
                        <td className={`${celula} break-words`}>
                          {item.nome}
                          {eu ? <span className="ml-2 text-xs">(você)</span> : null}
                        </td>
                        <td className={`${celula} text-right`}>{formatarNumero(item.pontos)}</td>
                        <td className={celula}>{item.nivel}</td>
                        <td className={`${celula} text-right`}>🔥 {item.streak}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <ol className="space-y-3 md:hidden">
                {lista.map((item) => {
                  const eu = item.nome === meuNome
                  return (
                    <li
                      key={item.posicao}
                      aria-current={eu ? 'true' : undefined}
                      className={`flex items-center gap-4 rounded-lg border p-4 ${eu ? 'border-primary bg-primary/8' : 'border-border bg-surface'}`}
                    >
                      <span className="w-10 shrink-0 font-serif text-2xl text-primary">
                        {item.posicao}º
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium break-words text-ink">
                          {item.nome}
                          {eu ? <span className="ml-2 text-xs text-primary">(você)</span> : null}
                        </p>
                        <p className="mt-0.5 text-xs text-muted">
                          {item.nivel} · 🔥 {item.streak}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-medium text-ink">
                        {formatarNumero(item.pontos)} pts
                      </p>
                    </li>
                  )
                })}
              </ol>
            </>
          )}
        </ResultadoApi>
      </div>
    </div>
  )
}
