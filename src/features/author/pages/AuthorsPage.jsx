
import { useMemo, useState } from 'react'

import AdminLayout from '../../../components/layouts/AdminLayout'
import Button from '../../../components/Button'
import Spinner from '../../../components/Spinner'
import EmptyState from '../../../components/EmptyState'
import ConfirmModal from '../../../components/ConfirmModal'

import { useAuthorsList } from '../hooks/useAuthorsList.js'

import AuthorHeader from '../components/AuthorHeader'
import AuthorFilters from '../components/AuthorFilters'
import AuthorTable from '../components/AuthorTable'
import AuthorModal from '../components/AuthorModal'

export default function AuthorsPage() {
  const {
    authors,
    loading,
    error,
    saving,
    modalTarget,
    setModalTarget,
    deleteTarget,
    setDeleteTarget,
    handleSave,
    handleDelete,
  } = useAuthorsList()

  // Estados de los filtros
  const [searchName, setSearchName] = useState('')
  const [nationality, setNationality] = useState('')

  // Obtener nacionalidades únicas de los autores registrados
  const nationalities = useMemo(() => {
    const uniqueNationalities = new Set()

    for (const author of authors) {
      if (author.nacionalidad?.trim()) {
        uniqueNationalities.add(author.nacionalidad.trim())
      }
    }

    return [...uniqueNationalities].sort((a, b) =>
      a.localeCompare(b)
    )
  }, [authors])

  // Filtrar autores por nombre y nacionalidad
  const filteredAuthors = useMemo(() => {
    return authors.filter((author) => {
      const matchesName = author.name
        .toLowerCase()
        .includes(searchName.trim().toLowerCase())

      const matchesNationality =
        nationality === '' ||
        author.nacionalidad?.trim().toLowerCase() ===
        nationality.toLowerCase()

      return matchesName && matchesNationality
    })
  }, [authors, searchName, nationality])

  // Restablecer los filtros
  const handleClearFilters = () => {
    setSearchName('')
    setNationality('')
  }

  return (
    <AdminLayout title="Autores">
      <AuthorHeader
        onAdd={() => setModalTarget(false)}
      />

      {/* Filtros de búsqueda */}
      <AuthorFilters
        searchName={searchName}
        onSearchNameChange={setSearchName}
        nationality={nationality}
        onNationalityChange={setNationality}
        nationalities={nationalities}
        onClear={handleClearFilters}
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
            Cargando autores...
          </span>
        </div>
      ) : filteredAuthors.length === 0 ? (
        <EmptyState
          title={
            authors.length === 0
              ? 'No hay autores registrados'
              : 'No se encontraron autores'
          }
          description={
            authors.length === 0
              ? 'Comenzá registrando el primer autor con el botón superior para asociarlo a tus libros.'
              : 'No hay autores que coincidan con los filtros seleccionados. Probá modificarlos o limpiarlos.'
          }
          action={
            authors.length === 0 ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => setModalTarget(false)}
              >
                Agregar nuevo autor
              </Button>
            ) : null
          }
        />
      ) : (
        <AuthorTable
          authors={filteredAuthors}
          onEdit={setModalTarget}
          onDelete={setDeleteTarget}
        />
      )}

      {/* Modal de creación y edición */}
      {modalTarget !== null && (
        <AuthorModal
          author={modalTarget || null}
          onSave={handleSave}
          onClose={() => !saving && setModalTarget(null)}
          saving={saving}
        />
      )}

      {/* Modal global de confirmación */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Eliminar autor"
        message={`¿Estás seguro de que querés eliminar al autor "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        onConfirm={handleDelete}
        onCancel={() => !saving && setDeleteTarget(null)}
      />
    </AdminLayout>
  )
}
