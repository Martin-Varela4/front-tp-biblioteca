import api from '../../../api/client'

// POST /api/auth/register -> { message, admin }
export async function register({ nombre, email, password, username }) {
  const payload = {
    username: username || nombre,
    email,
    password,
  }

  const setupKey = import.meta.env.VITE_ADMIN_SETUP_KEY || 'InicializarBiblioteca_2026'

  const { data } = await api.post('/auth/register', payload, {
    headers: {
      'x-admin-setup-key': setupKey,
    },
  })
  return data?.admin || data
}

// POST /api/auth/login -> { token, admin }
export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}
