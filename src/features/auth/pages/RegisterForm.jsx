import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { InputField } from '../../../components/InputField'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { SubmitButton } from '../../../components/SubmitButton'
import { registerSchema } from '../schemas/registerSchema'
import { register } from '../service/auth.api.js'
import { getErrorMessage } from '../../../api/errors'
import { ROUTES } from '../../../routes/index'

export default function RegisterForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const values = await registerSchema.validate(form)
      const user = await register({
        username: values.username,
        email: values.email,
        password: values.password,
      })
      navigate(ROUTES.LOGIN, { replace: true, state: { registeredEmail: user?.email || values.email } })
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo completar el registro'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 w-full max-w-[460px] p-8 sm:p-10">
        {/* Brand identity header */}
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3.5 shadow-xs">
            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Crear cuenta</h2>
          <p className="text-slate-500 text-[14px] mt-1">
            Registrá un nuevo usuario administrador para la biblioteca
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4.5">
          <InputField
            label="Nombre de usuario"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
            placeholder="Ej: admin2"
          />

          <InputField
            label="Correo electrónico"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="usuario@ejemplo.com"
          />

          <InputField
            label="Contraseña"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
          />

          <InputField
            label="Confirmar contraseña"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            placeholder="Repetí tu contraseña"
          />

          <ErrorMessage message={error} />

          <div className="pt-2">
            <SubmitButton isLoading={loading} text="Crear cuenta" loadingText="Registrando..." />
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[14px] text-slate-500">
            ¿Ya tenés una cuenta?{' '}
            <Link to={ROUTES.LOGIN} className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Iniciá sesión acá
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
