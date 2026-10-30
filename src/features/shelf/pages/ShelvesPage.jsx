import AdminLayout from '../../../components/layouts/AdminLayout'
import Spinner from '../../../components/Spinner'
import EmptyState from '../../../components/EmptyState'
import ConfirmModal from '../../../components/ConfirmModal'

import { useShelvesList } from '../hooks/useShelvesList.js'

import ShelfHeader from '../components/ShelfHeader'
import ShelfTable from '../components/ShelfTable'
import ShelfModal from '../components/ShelfModal'

export default function ShelvesPage() {
  const {
    shelves,
    loading,
    error,
    saving,
    modalTarget,
    setModalTarget,
    deleteTarget,
    setDeleteTarget,
    handleSave,
    handleDelete,
  } = useShelvesList()

  return (
    <AdminLayout title="Estantes">

      <ShelfHeader
        onAdd={() => setModalTarget(false)}
      />

      {error && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3"
        >
          <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>

          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-slate-200">
          <Spinner size="lg" className="text-blue-600" />

          <span className="mt-4 text-sm font-medium text-slate-500">
            Cargando estantes...
          </span>
        </div>
      ) : shelves.length === 0 ? (
        <EmptyState
          title="No hay estantes registrados"
          description="Creá el primer estante o ubicación para organizar físicamente los libros de tu colección."
          action={
            <button
              type="button"
              onClick={() => setModalTarget(false)}
              className="hidden"
            />
          }
        />
      ) : (
        <ShelfTable
          shelves={shelves}
          onEdit={(shelf) => setModalTarget(shelf)}
          onDelete={(shelf) => setDeleteTarget(shelf)}
        />
      )}

      {modalTarget !== null && (
        <ShelfModal
          shelf={modalTarget || null}
          onSave={handleSave}
          onClose={() => !saving && setModalTarget(null)}
          saving={saving}
        />
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Eliminar estante"
        message={`¿Estás seguro de que querés eliminar el estante "${deleteTarget?.code || deleteTarget?.id}"? Esta acción no se puede deshacer.`}
        onConfirm={handleDelete}
        onCancel={() => !saving && setDeleteTarget(null)}
      />

    </AdminLayout>
  )
}
