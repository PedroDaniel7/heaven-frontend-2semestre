import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../../components/Button'
import { Checkbox } from '../../../components/Checkbox'
import { AvisoServidor } from '../../../components/EstadoApi'
import { Input } from '../../../components/Input'
import { PasswordInput } from '../../../components/PasswordInput'
import { ArrowRightIcon, LockIcon, MailIcon, UserIcon } from '../../../components/icons'
import { useAuth } from '../../../hooks/useAuth'
import { APP_ROUTES, AUTH_ROUTES } from '../../../routes'
import { cadastrarUsuario } from '../../../services/usuarios'
import { aplicarCamposDoErro } from '../../../utils/camposErro'
import { comoApiError, mensagemPadrao } from '../../../utils/mensagemErro'
import type { RegisterFormData } from '../types'

/** Tamanho mínimo da senha exibido como texto auxiliar na referência. */
const MIN_PASSWORD_LENGTH = 8

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Formulário de cadastro (07-forms.md §20).
 *
 * O submit cria a conta (POST /usuarios), entra com as mesmas credenciais
 * e leva o usuário ao painel.
 */
export function RegisterForm() {
  const navigate = useNavigate()
  const { entrar } = useAuth()
  const [erroGeral, setErroGeral] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    },
  })

  async function onSubmit(dados: RegisterFormData) {
    setErroGeral(null)
    const email = dados.email.trim()

    try {
      await cadastrarUsuario({
        nome: dados.name.trim(),
        email,
        senha: dados.password,
      })
    } catch (e) {
      const erro = comoApiError(e)
      if (erro.codigo === 'CONFLITO') {
        setError('email', { type: 'server', message: 'E-mail já cadastrado.' })
      } else if (
        erro.codigo === 'VALIDACAO' &&
        aplicarCamposDoErro(erro, setError, {
          nome: 'name',
          email: 'email',
          senha: 'password',
        })
      ) {
        // Cada mensagem já está no campo correspondente.
      } else {
        setErroGeral(mensagemPadrao(erro))
      }
      return
    }

    try {
      await entrar({ email, senha: dados.password })
    } catch {
      // A conta existe, mas o login automático falhou: o usuário entra à mão.
      navigate(AUTH_ROUTES.login, { replace: true })
      return
    }
    navigate(APP_ROUTES.root, { replace: true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <div className="flex flex-col gap-4">
        <Input
          label="Nome"
          placeholder="Seu nome"
          autoComplete="name"
          icon={<UserIcon className="h-full w-full" />}
          error={errors.name?.message}
          {...register('name', { required: 'Informe seu nome.' })}
        />

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
          autoComplete="new-password"
          icon={<LockIcon className="h-full w-full" />}
          helperText={`Mínimo de ${MIN_PASSWORD_LENGTH} caracteres.`}
          error={errors.password?.message}
          {...register('password', {
            required: 'Informe sua senha.',
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`,
            },
          })}
        />

        <PasswordInput
          label="Confirmar senha"
          placeholder="••••••••"
          autoComplete="new-password"
          icon={<LockIcon className="h-full w-full" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Confirme sua senha.',
            validate: (value) =>
              value === getValues('password') || 'As senhas não coincidem.',
          })}
        />
      </div>

      <div className="mt-5">
        <Checkbox
          label={
            <>
              Concordo com os{' '}
              <span className="text-link underline underline-offset-2">
                termos de uso
              </span>{' '}
              e a{' '}
              <span className="text-link underline underline-offset-2">
                política de privacidade.
              </span>
            </>
          }
          error={errors.acceptedTerms?.message}
          {...register('acceptedTerms', {
            required: 'É necessário aceitar os termos para criar sua conta.',
          })}
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
        {isSubmitting ? 'Criando conta…' : 'Criar minha conta'}
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
      <AvisoServidor ativo={isSubmitting} />
    </form>
  )
}
