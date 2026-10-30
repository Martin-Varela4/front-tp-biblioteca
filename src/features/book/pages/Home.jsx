
import { useNavigate } from 'react-router'
import { useBookList } from '../hooks/useBookList.js'
import { ROUTES } from '../../../routes/index'

import AdminLayout from '../../../components/layouts/AdminLayout'
import Button from '../../../components/Button'
import Spinner from '../../../components/Spinner'
import EmptyState from '../../../components/EmptyState'
import ConfirmModal from '../../../components/ConfirmModal'

import BookFilters from '../components/BookFilters'
import BookTable from '../components/BookTable'

function Home() {
  const navigate = useNavigate()
  const list = useBookList()

  const handleEdit = (id) => {
    navigate(ROUTES.BOOK_EDIT(id))
  }

  return (
    <AdminLayout title="Biblioteca">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Catálogo de Libros
          </h2>

          <p className="text-slate-500 text-sm sm:text-[15px] mt-1">
            Gestioná y consultá todos los libros registrados en la biblioteca
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate(ROUTES.BOOK_NEW)}
          className="shadow-sm shrink-0"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Agregar libro</span>
        </Button>
      </div>

      <BookFilters
        search={list.search}
        setSearch={list.setSearch}
        selectedGenreId={list.selectedGenreId}
        setSelectedGenreId={list.setSelectedGenreId}
        selectedYear={list.selectedYear}
        setSelectedYear={list.setSelectedYear}
        genres={list.genres}
      />

      {list.error && (
        <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3">
          <span>{list.error}</span>
        </div>
      )}

      {list.loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-slate-200">
          <Spinner size="lg" className="text-blue-600" />
          <span className="mt-4 text-sm font-medium text-slate-500">
            Cargando catálogo de libros...
          </span>
        </div>
      ) : list.filteredBooks.length === 0 ? (
        <EmptyState
          title="No se encontraron libros"
          description="Intentá modificar los filtros de búsqueda o registrá un nuevo ejemplar en el catálogo."
          action={
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(ROUTES.BOOK_NEW)}
            >
              Agregar nuevo libro
            </Button>
          }
        />
      ) : (
        <BookTable
          books={list.filteredBooks}
          onEdit={handleEdit}
          onDeleteTarget={list.setDeleteTarget}
        />
      )}

      <ConfirmModal
        isOpen={!!list.deleteTarget}
        title="Eliminar libro"
        message={`¿Estás seguro de que querés eliminar "${list.deleteTarget?.title}"? Esta acción no se puede deshacer.`}
        onConfirm={list.handleDelete}
        onCancel={() => list.setDeleteTarget(null)}
        isLoading={list.deleting}
      />
    </AdminLayout>
  )
}

export default Home
