import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../../components/Button'
import { Checkbox } from '../../../components/Checkbox'
import { Input } from '../../../components/Input'
import { PasswordInput } from '../../../components/PasswordInput'
import { ArrowRightIcon, LockIcon, MailIcon, UserIcon } from '../../../components/icons'
import { APP_ROUTES } from '../../../routes'
import type { RegisterFormData } from '../types'

/** Tamanho mínimo da senha exibido como texto auxiliar na referência. */
const MIN_PASSWORD_LENGTH = 8

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Formulário de cadastro (07-forms.md §20).
 *
 * Não existe autenticação real nesta Sprint (04-screen-specs.md §6):
 * o submit valida e navega, sem camada HTTP (07-forms.md §33 e §34).
 */
export function RegisterForm() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
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

  function onSubmit() {
    navigate(APP_ROUTES.root)
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

      <Button type="submit" disabled={isSubmitting} className="mt-5">
        Criar minha conta
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
    </form>
  )
}
