
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../features/auth/store/AuthContext'
import { ROUTES } from './index'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isInitializing } = useAuth()
  const location = useLocation()

  if (isInitializing) {
    return <p>Cargando sesión...</p>
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{ from: location }}
      />
    )
  }

  return children
}
