import axios from 'axios'

export const TOKEN_KEY = 'token'

export const tokenStorage = {
  get() {
    try { return localStorage.getItem(TOKEN_KEY) } catch { return null }
  },
  set(token) {
    try { localStorage.setItem(TOKEN_KEY, token) } catch { /* sin almacenamiento */ }
  },
  remove() {
    try { localStorage.removeItem(TOKEN_KEY) } catch { /* sin almacenamiento */ }
  },
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let unauthorizedHandler = null
export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url === '/auth/login'
    if (error.response?.status === 401 && !isLoginRequest && tokenStorage.get()) {
      unauthorizedHandler?.()
    }
    return Promise.reject(error)
  },
)

export default api
