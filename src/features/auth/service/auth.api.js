import api from '../../../api/client'


export async function register({ nombre, email, password, username, adminSetupKey }) {
  const payload = {
    username: username || nombre,
    email,
    password
  }

  const { data } = await api.post('/auth/register', payload, {
    headers: {
      'x-admin-setup-key': adminSetupKey
    }
  })
  return data?.admin || data
}

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}
