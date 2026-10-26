import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './features/auth/store/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
import RegisterForm from './features/auth/pages/RegisterForm'
import LoginForm from './features/auth/pages/LoginForm'
import { ROUTES } from './routes/index'
import Home from './features/book/pages/Home'
import BookFormPage from './features/book/pages/BookFormPage'
import AuthorsPage from './features/author/pages/AuthorsPage'
import GenresPage from './features/genre/pages/GenresPage'
import ShelvesPage from './features/shelf/pages/ShelvesPage'
import SagasPage from './features/saga/pages/SagasPage'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <p className="text-xl font-semibold text-gray-700 mb-2">Página no encontrada</p>
      <p className="text-gray-500 mb-6">La ruta que buscás no existe.</p>
      <a href="/" className="text-blue-600 hover:underline text-sm">Volver al inicio</a>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.REGISTER}
            element={
              <PublicRoute>
                <RegisterForm />
              </PublicRoute>
            }
          />

          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />

          <Route
            path={ROUTES.HOME}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.BOOK_NEW}
            element={
              <ProtectedRoute>
                <BookFormPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/libros/:id/editar"
            element={
              <ProtectedRoute>
                <BookFormPage />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.AUTHORS}
            element={
              <ProtectedRoute>
                <AuthorsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.GENRES}
            element={
              <ProtectedRoute>
                <GenresPage />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.SHELVES}
            element={
              <ProtectedRoute>
                <ShelvesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.SAGAS}
            element={
              <ProtectedRoute>
                <SagasPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
