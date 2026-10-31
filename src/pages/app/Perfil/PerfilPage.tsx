import { ResultadoApi } from '../../../components/EstadoApi'
import { StatBox } from '../../../components/StatBox'
import { DeactivateAccount, ProfileForm } from '../../../features/profile'
import { useApi } from '../../../hooks/useApi'
import { useAuth } from '../../../hooks/useAuth'
import { obterMeuUsuario } from '../../../services/usuarios'
import { formatarNumero } from '../../../utils/formatar'

const dataCadastro = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' })

/** Perfil — /app/perfil: dados da conta, edição e desativação. */
export function PerfilPage() {
  const { estado, recarregar } = useApi(obterMeuUsuario)
  const { atualizarUsuario } = useAuth()

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="font-serif text-4xl text-ink">Perfil</h1>

      <div className="mt-8">
        <ResultadoApi
          estado={estado}
          onTentarNovamente={recarregar}
          rotuloCarregando="Carregando seu perfil…"
          vazio={null}
        >
          {(usuario) => (
            <div className="space-y-8">
              <p className="text-sm text-muted">
                Nível {usuario.nivel} · membro desde{' '}
                {dataCadastro.format(new Date(usuario.dataCadastro))}
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <StatBox label="Pontos" value={formatarNumero(usuario.pontos)} />
                <StatBox label="Reputação" value={`${formatarNumero(usuario.reputacao)}%`} />
                <StatBox label="Streak" value={`🔥 ${usuario.streak}`} />
                <StatBox label="Maior streak" value={`🔥 ${usuario.maiorStreak}`} />
              </div>

              <section className="rounded-lg border border-border p-6 sm:p-8">
                <h2 className="font-serif text-2xl font-medium text-ink">
                  Seus dados
                </h2>
                <div className="mt-5">
                  <ProfileForm usuario={usuario} onSalvo={atualizarUsuario} />
                </div>
              </section>

              <DeactivateAccount />
            </div>
          )}
        </ResultadoApi>
      </div>
    </div>
  )
}
