
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../features/auth/store/AuthContext'
import { ROUTES } from './index'

export default function PublicRoute({ children }) {
  const { isAuthenticated, isInitializing } = useAuth()
  const location = useLocation()

  if (isInitializing) {
    return <p>Cargando sesión...</p>
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to={location.state?.from?.pathname || ROUTES.HOME}
        replace
      />
    )
  }

  return children
}
