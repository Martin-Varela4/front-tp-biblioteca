import { useNavigate } from 'react-router'
import { useBookList } from '../hooks/useBookList.js'
import AdminLayout from '../../../components/layouts/AdminLayout'
import Button from '../../../components/Button'
import Spinner from '../../../components/Spinner'
import EmptyState from '../../../components/EmptyState'
import ConfirmModal from '../../../components/ConfirmModal'
import { ROUTES } from '../../../routes/index'

function Home() {
  const navigate = useNavigate()

  const {
    genres,
    filteredBooks,
    search,
    setSearch,
    selectedGenreId,
    setSelectedGenreId,
    selectedYear,
    setSelectedYear,
    loading,
    error,
    deleteTarget,
    setDeleteTarget,
    deleting,
    handleDelete,
  } = useBookList()

  return (
    <AdminLayout title="Biblioteca">
      {/* Header section with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Catálogo de Libros
          </h2>
          <p className="text-slate-500 text-sm sm:text-[15px] mt-1">
            Gestioná y consultá todos los libros físicos registrados en la biblioteca
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

      {/* Filters card */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 mb-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-4 items-center">
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Buscar por título..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10.5 pr-4 text-[15px] rounded-lg border border-slate-300 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors placeholder:text-slate-400"
            />
          </div>

          <div className="lg:col-span-4">
            <select
              value={selectedGenreId}
              onChange={(e) => setSelectedGenreId(e.target.value)}
              className="w-full h-11 px-3.5 text-[15px] rounded-lg border border-slate-300 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors text-slate-800"
            >
              <option value="">Todos los géneros</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <input
              type="number"
              placeholder="Año..."
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full h-11 px-3.5 text-[15px] rounded-lg border border-slate-300 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Main Table or State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-slate-200">
          <Spinner size="lg" className="text-blue-600" />
          <span className="mt-4 text-sm font-medium text-slate-500">Cargando catálogo de libros...</span>
        </div>
      ) : filteredBooks.length === 0 ? (
        <EmptyState
          title="No se encontraron libros"
          description="Intentá modificar los filtros de búsqueda o registrá un nuevo ejemplar en el catálogo."
          action={
            <Button variant="primary" size="md" onClick={() => navigate(ROUTES.BOOK_NEW)}>
              Agregar nuevo libro
            </Button>
          }
        />
      ) : (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-100/75">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Autor</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Género</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Estante</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Año</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Saga</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-blue-50/30 transition-colors">
                    {/* Título */}
                    <td className="px-6 py-4.5">
                      <div className="font-semibold text-slate-900 text-[15px] leading-snug">
                        {book.title}
                      </div>
                      {book.isbn && (
                        <span className="text-xs text-slate-400 font-mono block mt-0.5">
                          ISBN: {book.isbn}
                        </span>
                      )}
                    </td>

                    {/* Autor */}
                    <td className="px-6 py-4.5 text-[14.5px] font-medium text-slate-700">
                      {book.author?.name ?? '—'}
                    </td>

                    {/* Género */}
                    <td className="px-6 py-4.5 text-[14.5px]">
                      {book.genre?.name ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80">
                          {book.genre.name}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Estante */}
                    <td className="px-6 py-4.5 text-[14.5px]">
                      {book.shelf?.code ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                          {book.shelf.code}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Año */}
                    <td className="px-6 py-4.5 text-[14.5px] text-slate-600 font-mono">
                      {book.publicationYear}
                    </td>

                    {/* Saga */}
                    <td className="px-6 py-4.5 text-[14.5px] text-slate-600">
                      {book.saga ? (
                        <span>
                          {book.saga.name}
                          {book.sagaOrder ? (
                            <span className="ml-1 text-xs font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                              #{book.sagaOrder}
                            </span>
                          ) : null}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2.5">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigate(ROUTES.BOOK_EDIT(book.id))}
                        >
                          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                          <span>Editar</span>
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setDeleteTarget({ id: book.id, title: book.title })}
                        >
                          <svg className="w-3.5 h-3.5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                          <span>Eliminar</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Eliminar libro"
        message={`¿Estás seguro de que querés eliminar el libro "${deleteTarget?.title}"? Esta acción borrará el registro de forma permanente.`}
        onConfirm={handleDelete}
        onCancel={() => !deleting && setDeleteTarget(null)}
      />
    </AdminLayout>
  )
}

export default Home
