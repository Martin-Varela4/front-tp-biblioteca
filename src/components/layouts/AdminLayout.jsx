import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AdminLayout({ title = 'Biblioteca', children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">
      {/* Sidebar fijo en desktop / drawer en mobile */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar
          title={title}
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Scrollable content area con espaciado generoso */}
        <main className="flex-1 overflow-y-auto px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
          <div className="w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
