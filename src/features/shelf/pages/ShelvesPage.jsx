import { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import Button from '../../../components/Button'
import Spinner from '../../../components/Spinner'
import EmptyState from '../../../components/EmptyState'
import ConfirmModal from '../../../components/ConfirmModal'
import { getShelves, createShelf, updateShelf, deleteShelf } from '../service/shelves.api.js'
import { shelfSchema } from '../schemas/shelfSchema.js'

const inputCls =
  'w-full h-11 min-h-[44px] px-3.5 text-[15px] rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors shadow-2xs'

function ShelfModal({ shelf, onSave, onClose, saving }) {
  const [code, setCode] = useState(shelf?.code ?? '')
  const [description, setDescription] = useState(shelf?.description ?? '')
  const [fieldError, setFieldError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const validData = await shelfSchema.validate(
        {
          code: code.trim(),
          description: description.trim(),
        },
        { abortEarly: false }
      )
      setFieldError('')
      onSave({
        code: validData.code,
        ...(validData.description ? { description: validData.description } : { description: '' }),
      })
    } catch (err) {
      if (err.name === 'ValidationError') {
        const codeErr = err.inner.find((i) => i.path === 'code') || err.inner[0]
        setFieldError(codeErr?.message || err.message)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-7 border border-slate-200 transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {shelf ? 'Editar estante' : 'Nuevo estante'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="flex flex-col">
            <label className="text-[14px] font-semibold text-slate-700 flex items-center justify-between mb-1.5">
              <span>Código de identificación</span>
              <span className="text-blue-600 text-xs font-normal">Requerido</span>
            </label>
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setFieldError('')
              }}
              className={inputCls}
              placeholder="Ej: EST-A1, EST-04"
              autoFocus
            />
            {fieldError && <span className="mt-1 text-xs text-red-600 font-medium">{fieldError}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-semibold text-slate-700 mb-1.5">
              Descripción o ubicación física (opcional)
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputCls}
              placeholder="Ej: Pasillo A - Literatura Latinoamericana"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Button variant="secondary" size="md" onClick={onClose} disabled={saving}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={saving}>
              {shelf ? 'Guardar cambios' : 'Crear estante'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ShelvesPage() {
  const [shelves, setShelves] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalTarget, setModalTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await getShelves()
      setShelves(Array.isArray(data) ? data : [])
    } catch {
      setError('No se pudieron cargar los estantes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSave(data) {
    setSaving(true)
    try {
      if (modalTarget && modalTarget.id) {
        const updated = await updateShelf(modalTarget.id, data)
        setShelves((prev) => prev.map((s) => (s.id === modalTarget.id ? { ...s, ...updated } : s)))
      } else {
        const created = await createShelf(data)
        const newShelf = created.shelf || created
        setShelves((prev) => [...prev, newShelf])
      }
      setModalTarget(null)
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo guardar el estante.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setSaving(true)
    try {
      await deleteShelf(deleteTarget.id)
      setShelves((prev) => prev.filter((s) => s.id !== deleteTarget.id))
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo eliminar el estante.')
    } finally {
      setSaving(false)
      setDeleteTarget(null)
    }
  }

  return (
    <AdminLayout title="Estantes">
      {/* Header section with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Estanterías y Ubicaciones
          </h2>
          <p className="text-slate-500 text-sm sm:text-[15px] mt-1">
            Administrá los sectores físicos donde se ubican los ejemplares de la biblioteca
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setModalTarget(false)}
          className="shadow-sm shrink-0"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Agregar estante</span>
        </Button>
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
          <span className="mt-4 text-sm font-medium text-slate-500">Cargando estantes...</span>
        </div>
      ) : shelves.length === 0 ? (
        <EmptyState
          title="No hay estantes registrados"
          description="Creá el primer estante o ubicación para organizar físicamente los libros de tu colección."
          action={
            <Button variant="primary" size="md" onClick={() => setModalTarget(false)}>
              Agregar nuevo estante
            </Button>
          }
        />
      ) : (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-100/75">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Código</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Descripción / Ubicación</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shelves.map((shelf) => (
                  <tr key={shelf.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4.5">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {shelf.code}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-[14.5px] text-slate-700 font-medium">
                      {shelf.description || <span className="text-slate-400 italic">Sin descripción</span>}
                    </td>
                    <td className="px-6 py-4.5 text-[14px] text-slate-500 font-mono">
                      #{shelf.id}
                    </td>
                    <td className="px-6 py-4.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2.5">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setModalTarget(shelf)}
                        >
                          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                          <span>Editar</span>
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setDeleteTarget(shelf)}
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

      {/* Modal formulario */}
      {modalTarget !== null && (
        <ShelfModal
          shelf={modalTarget || null}
          onSave={handleSave}
          onClose={() => !saving && setModalTarget(null)}
          saving={saving}
        />
      )}

      {/* Modal confirmación de borrado */}
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
