import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../../../components/Button'
import { AvisoServidor } from '../../../components/EstadoApi'
import { Input } from '../../../components/Input'
import { PasswordInput } from '../../../components/PasswordInput'
import { ArrowRightIcon, LockIcon, MailIcon } from '../../../components/icons'
import { useAuth } from '../../../hooks/useAuth'
import { comoApiError, mensagemPadrao } from '../../../utils/mensagemErro'
import type { LoginFormData } from '../types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Texto único para credencial inválida: não revela se o e-mail existe. */
const CREDENCIAL_INVALIDA = 'E-mail ou senha incorretos.'

/**
 * Formulário de login. Em caso de sucesso a sessão é criada no AuthContext
 * e a página de login encaminha o usuário para a tela de destino.
 */
export function LoginForm() {
  const { entrar } = useAuth()
  const [erroGeral, setErroGeral] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(dados: LoginFormData) {
    setErroGeral(null)
    try {
      await entrar({ email: dados.email.trim(), senha: dados.password })
    } catch (e) {
      const erro = comoApiError(e)
      switch (erro.codigo) {
        case 'NAO_AUTENTICADO':
          setErroGeral(CREDENCIAL_INVALIDA)
          break
        case 'PROIBIDO':
          // Conta desativada: a API informa o motivo.
          setErroGeral(erro.message)
          break
        default:
          setErroGeral(mensagemPadrao(erro))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <div className="flex flex-col gap-4">
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          icon={<MailIcon className="h-full w-full" />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Informe seu e-mail.',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Digite um e-mail válido.',
            },
          })}
        />

        <PasswordInput
          label="Senha"
          placeholder="••••••••"
          autoComplete="current-password"
          icon={<LockIcon className="h-full w-full" />}
          error={errors.password?.message}
          {...register('password', { required: 'Informe sua senha.' })}
        />
      </div>

      {erroGeral ? (
        <p
          role="alert"
          className="mt-5 rounded-md border border-danger/40 bg-surface px-4 py-3 text-sm text-danger"
        >
          {erroGeral}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="mt-5">
        {isSubmitting ? 'Entrando…' : 'Entrar'}
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
      <AvisoServidor ativo={isSubmitting} />
    </form>
  )
}
