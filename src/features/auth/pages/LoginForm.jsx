import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { InputField } from '../../../components/InputField'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { SubmitButton } from '../../../components/SubmitButton'
import { loginSchema } from '../schemas/loginSchema'
import { useAuth } from '../store/AuthContext'
import { getErrorMessage } from '../../../api/errors'
import { ROUTES } from '../../../routes/index'

export default function LoginForm() {
  const location = useLocation()
  const registeredEmail = location.state?.registeredEmail

  const [form, setForm] = useState({ email: registeredEmail || '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { login } = useAuth()

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const values = await loginSchema.validate(form)
      await login(values.email, values.password)
    } catch (err) {
      setError(getErrorMessage(err, 'Ocurrió un error al iniciar sesión'))
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 w-full max-w-[440px] p-8 sm:p-10">
        {/* Brand identity header */}
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3.5 shadow-xs">
            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Iniciar sesión</h2>
          <p className="text-slate-500 text-[14px] mt-1">
            Ingresá a tu panel administrativo de biblioteca
          </p>
        </div>

        {registeredEmail && (
          <div className="mb-5 p-3.5 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5 font-medium">
            <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Cuenta creada exitosamente. Ya podés ingresar.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <InputField
            label="Correo electrónico o usuario"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="admin@biblioteca.com"
          />

          <InputField
            label="Contraseña"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            placeholder="••••••••"
          />

          <ErrorMessage message={error} />

          <div className="pt-2">
            <SubmitButton isLoading={loading} text="Ingresar al panel" loadingText="Iniciando sesión..." />
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[14px] text-slate-500">
            ¿No tenés una cuenta registrada?{' '}
            <Link to={ROUTES.REGISTER} className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Registrate acá
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
