
import AdminLayout from '../../../components/layouts/AdminLayout'
import Button from '../../../components/Button'
import Spinner from '../../../components/Spinner'
import EmptyState from '../../../components/EmptyState'
import ConfirmModal from '../../../components/ConfirmModal'

import { useGenresList } from '../hooks/useGenresList.js'

import GenreHeader from '../components/GenreHeader'
import GenreTable from '../components/GenreTable'
import GenreModal from '../components/GenreModal'

export default function GenresPage() {
  const {
    genres,
    loading,
    error,
    saving,
    modalTarget,
    setModalTarget,
    deleteTarget,
    setDeleteTarget,
    handleSave,
    handleDelete,
  } = useGenresList()

  return (
    <AdminLayout title="Géneros">
      <GenreHeader
        onAdd={() => setModalTarget(false)}
      />

      {error && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3"
        >
          <svg
            className="w-5 h-5 shrink-0 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>

          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-slate-200">
          <Spinner size="lg" className="text-blue-600" />

          <span className="mt-4 text-sm font-medium text-slate-500">
            Cargando géneros...
          </span>
        </div>
      ) : genres.length === 0 ? (
        <EmptyState
          title="No hay géneros registrados"
          description="Agregá el primer género literario para clasificar los libros de tu colección."
          action={
            <Button
              variant="primary"
              size="md"
              onClick={() => setModalTarget(false)}
            >
              Agregar nuevo género
            </Button>
          }
        />
      ) : (
        <GenreTable
          genres={genres}
          onEdit={setModalTarget}
          onDelete={setDeleteTarget}
        />
      )}

      {modalTarget !== null && (
        <GenreModal
          genre={modalTarget || null}
          onSave={handleSave}
          onClose={() => !saving && setModalTarget(null)}
          saving={saving}
        />
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Eliminar género"
        message={`¿Estás seguro de que querés eliminar el género "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        onConfirm={handleDelete}
        onCancel={() => !saving && setDeleteTarget(null)}
      />
    </AdminLayout>
  )
}
