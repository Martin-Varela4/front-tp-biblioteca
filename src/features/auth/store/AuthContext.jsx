
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'

import {
  tokenStorage,
  setUnauthorizedHandler,
} from '../../../api/client'

import * as authApi from '../service/auth.api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => tokenStorage.get())
  const [user, setUser] = useState(null)
  const [isInitializing, setIsInitializing] = useState(
    () => !!tokenStorage.get(),
  )

  const logout = useCallback(() => {
    tokenStorage.remove()
    setToken(null)
    setUser(null)
    setIsInitializing(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const result = await authApi.login(email, password)

    if (!result) {
      throw new Error('El servidor no devolvió datos válidos de sesión')
    }

    const newToken = result.token || result.accessToken
    const loggedUser = result.user || result.admin || { email }

    if (!newToken) {
      throw new Error('No se encontró el token de acceso en la respuesta')
    }

    tokenStorage.set(newToken)
    setToken(newToken)
    setUser(loggedUser)
    setIsInitializing(false)
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(logout)

    return () => setUnauthorizedHandler(null)
  }, [logout])

  useEffect(() => {
    if (tokenStorage.get()) {
      setUser((currentUser) => currentUser || { email: '' })
    }

    setIsInitializing(false)
  }, [])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token && !!user,
      isInitializing,
      login,
      logout,
    }),
    [token, user, isInitializing, login, logout],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }

  return ctx
}
