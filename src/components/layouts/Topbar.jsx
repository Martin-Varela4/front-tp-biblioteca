import { useAuth } from '../../features/auth/store/AuthContext'
import Button from '../Button'

export default function Topbar({ title, onMenuToggle }) {
  const { logout, user } = useAuth()

  const email = user?.email || 'admin@biblioteca.com'
  const initial = email.charAt(0).toUpperCase()

  return (
    <header className="bg-white border-b border-slate-200/80 shadow-xs h-[72px] flex items-center px-6 lg:px-8 gap-4 shrink-0 z-10">
      {/* Hamburger button (mobile/tablet) */}
      <button
        type="button"
        className="lg:hidden p-2.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
        onClick={onMenuToggle}
        aria-label="Abrir menú de navegación"
      >
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Page Title Context */}
      <div className="flex-1 min-w-0">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight truncate">
          {title}
        </h1>
      </div>

      {/* User profile & actions */}
      <div className="flex items-center gap-3.5 sm:gap-4 shrink-0">
        <div className="hidden sm:flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-full bg-slate-50 border border-slate-200/80">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {initial}
          </div>
          <div className="flex flex-col text-left pr-2">
            <span className="text-[13px] font-semibold text-slate-800 leading-tight truncate max-w-[170px]">
              {email}
            </span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
              Administrador
            </span>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={logout}
          className="border-slate-300 text-slate-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          <span className="hidden sm:inline">Cerrar sesión</span>
        </Button>
      </div>
    </header>
  )
}
