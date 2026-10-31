import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../../components/Button'
import { AvisoServidor } from '../../components/EstadoApi'
import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'
import { LockIcon, MailIcon, UserIcon } from '../../components/icons'
import { atualizarMeuUsuario } from '../../services/usuarios'
import type { Usuario } from '../../types/api'
import { aplicarCamposDoErro } from '../../utils/camposErro'
import { comoApiError, mensagemPadrao } from '../../utils/mensagemErro'

type ProfileFormData = {
  name: string
  email: string
  newPassword: string
}

const MIN_PASSWORD_LENGTH = 8
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Props = {
  usuario: Usuario
  onSalvo: (usuario: Usuario) => void
}

/** Edição de nome, e-mail e nova senha opcional (PUT /usuarios/me). */
export function ProfileForm({ usuario, onSalvo }: Props) {
  const [erroGeral, setErroGeral] = useState<string | null>(null)
  const [salvo, setSalvo] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    mode: 'onTouched',
    defaultValues: { name: usuario.nome, email: usuario.email, newPassword: '' },
  })

  async function onSubmit(dados: ProfileFormData) {
    setErroGeral(null)
    setSalvo(false)
    try {
      const atualizado = await atualizarMeuUsuario({
        nome: dados.name.trim(),
        email: dados.email.trim(),
        ...(dados.newPassword ? { novaSenha: dados.newPassword } : {}),
      })
      reset({ name: atualizado.nome, email: atualizado.email, newPassword: '' })
      onSalvo(atualizado)
      setSalvo(true)
    } catch (e) {
      const erro = comoApiError(e)
      if (erro.codigo === 'CONFLITO') {
        setError('email', { type: 'server', message: 'E-mail já cadastrado.' })
      } else if (
        !(
          erro.codigo === 'VALIDACAO' &&
          aplicarCamposDoErro(erro, setError, {
            nome: 'name',
            email: 'email',
            novaSenha: 'newPassword',
          })
        )
      ) {
        setErroGeral(mensagemPadrao(erro))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Input
        label="Nome"
        autoComplete="name"
        icon={<UserIcon className="h-full w-full" />}
        error={errors.name?.message}
        {...register('name', {
          validate: (v) => v.trim().length > 0 || 'Informe seu nome.',
        })}
      />

      <Input
        label="E-mail"
        type="email"
        autoComplete="email"
        icon={<MailIcon className="h-full w-full" />}
        error={errors.email?.message}
        {...register('email', {
          required: 'Informe seu e-mail.',
          pattern: { value: EMAIL_PATTERN, message: 'Digite um e-mail válido.' },
        })}
      />

      <PasswordInput
        label="Nova senha (opcional)"
        autoComplete="new-password"
        placeholder="Deixe em branco para manter a atual"
        icon={<LockIcon className="h-full w-full" />}
        helperText={`Mínimo de ${MIN_PASSWORD_LENGTH} caracteres.`}
        error={errors.newPassword?.message}
        {...register('newPassword', {
          validate: (v) =>
            v === '' ||
            v.length >= MIN_PASSWORD_LENGTH ||
            `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`,
        })}
      />

      {erroGeral ? (
        <p
          role="alert"
          className="rounded-md border border-danger/40 bg-surface px-4 py-3 text-sm text-danger"
        >
          {erroGeral}
        </p>
      ) : null}

      <div role="status" aria-live="polite" aria-atomic="true">
        {salvo ? (
          <p className="rounded-md bg-primary/8 px-4 py-3 text-sm font-medium text-primary">
            Perfil atualizado.
          </p>
        ) : null}
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting} fullWidth={false}>
          {isSubmitting ? 'Salvando…' : 'Salvar alterações'}
        </Button>
        <AvisoServidor ativo={isSubmitting} />
      </div>
    </form>
  )
}
