
import { useNavigate, useParams } from 'react-router'
import { ROUTES } from '../../../routes/index'
import { useBookFormData } from '../hooks/useBookFormData.js'
import { useBookForm } from '../hooks/useBookForm.js'
import AdminLayout from '../../../components/layouts/AdminLayout'
import Button from '../../../components/Button'
import Spinner from '../../../components/Spinner'
import FormField from '../../../components/FormField'

const inputCls =
  'w-full h-11 min-h-[44px] px-3.5 text-[15px] rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors shadow-2xs'

export default function BookFormPage() {
  const { id } = useParams()
  const isEditing = !!id
  const navigate = useNavigate()

  const {
    authors,
    genres,
    shelves,
    sagas,
    form,
    setForm,
    loadingData,
    error: dataError,
  } = useBookFormData(id, isEditing)

  const {
    fieldErrors,
    loading,
    error,
    handleChange,
    handleSubmit,
  } = useBookForm({
    form,
    setForm,
    isEditing,
    id,
    navigate,
  })

  if (loadingData) {
    return (
      <AdminLayout title={isEditing ? 'Editar libro' : 'Nuevo libro'}>
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-slate-200">
          <Spinner size="lg" className="text-blue-600" />
          <span className="mt-4 text-sm font-medium text-slate-500">
            Cargando datos del libro...
          </span>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={isEditing ? 'Editar libro' : 'Nuevo libro'}>
      <div className="max-w-4xl">
        <div className="mb-7">
          <button
            type="button"
            onClick={() => navigate(ROUTES.HOME)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-3 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver al catálogo
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {isEditing ? 'Editar libro' : 'Registrar nuevo libro'}
          </h2>

          <p className="text-slate-500 text-sm sm:text-[15px] mt-1">
            Completá la información bibliográfica y la ubicación física del ejemplar
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-7 sm:p-9">
          {(dataError || error) && (
            <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span>{dataError || error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <FormField label="Título de la obra" required error={fieldErrors.title}>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className={inputCls}
                placeholder="Ej: Cien años de soledad"
                autoFocus
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField label="Año de publicación" required error={fieldErrors.publicationYear}>
                <input
                  name="publicationYear"
                  type="number"
                  value={form.publicationYear}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="Ej: 1967"
                  min="1000"
                  max="2100"
                />
              </FormField>

              <FormField label="Autor" required error={fieldErrors.authorId}>
                <select name="authorId" value={form.authorId} onChange={handleChange} className={inputCls}>
                  <option value="">Seleccionar autor...</option>
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField label="Género" required error={fieldErrors.genreId}>
                <select name="genreId" value={form.genreId} onChange={handleChange} className={inputCls}>
                  <option value="">Seleccionar género...</option>
                  {genres.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Estante de ubicación" required error={fieldErrors.shelfId}>
                <select name="shelfId" value={form.shelfId} onChange={handleChange} className={inputCls}>
                  <option value="">Seleccionar estante...</option>
                  {shelves.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code ? `${s.code}${s.description ? ` - ${s.description}` : ''}` : (s.name || s.id)}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField label="Saga (opcional)">
                <select name="sagaId" value={form.sagaId} onChange={handleChange} className={inputCls}>
                  <option value="">Sin saga asociada</option>
                  {sagas.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Orden dentro de la saga">
                <input
                  name="sagaOrder"
                  type="number"
                  value={form.sagaOrder}
                  onChange={handleChange}
                  disabled={!form.sagaId}
                  className={`${inputCls} ${!form.sagaId ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''}`}
                  placeholder={form.sagaId ? 'Ej: 1, 2, 3...' : 'Seleccioná una saga primero'}
                  min="1"
                />
              </FormField>
            </div>

            <FormField label="Código ISBN (opcional)">
              <input
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                className={inputCls}
                placeholder="Ej: 978-0307474728"
              />
            </FormField>

            <FormField label="Sinopsis o notas del libro (opcional)">
              <textarea
                name="synopsis"
                value={form.synopsis}
                onChange={handleChange}
                rows={4}
                className="w-full p-3.5 text-[15px] rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors shadow-2xs resize-none"
                placeholder="Escribe un breve resumen de la obra..."
              />
            </FormField>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(ROUTES.HOME)}
                disabled={loading}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading
                  ? 'Guardando...'
                  : isEditing
                    ? 'Guardar cambios'
                    : 'Registrar libro'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
