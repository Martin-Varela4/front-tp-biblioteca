import { useEffect, useState } from 'react'
import { getSagas, createSaga, updateSaga, deleteSaga } from '../service/sagas.api.js'

/**

 * @returns {{
 *   sagas,
 *   loading, error,
 *   saving,
 *   modalTarget, setModalTarget,
 *   deleteTarget, setDeleteTarget,
 *   handleSave, handleDelete
 * }}
 */
export function useSagasList() {
  const [sagas, setSagas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalTarget, setModalTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await getSagas()
      setSagas(Array.isArray(data) ? data : [])
    } catch {
      setError('No se pudieron cargar las sagas literarias.')
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
        const updated = await updateSaga(modalTarget.id, data)
        setSagas((prev) => prev.map((s) => (s.id === modalTarget.id ? { ...s, ...updated } : s)))
      } else {
        const created = await createSaga(data)
        const newSaga = created.saga || created
        setSagas((prev) => [...prev, newSaga])
      }
      setModalTarget(null)
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo guardar la saga.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setSaving(true)
    try {
      await deleteSaga(deleteTarget.id)
      setSagas((prev) => prev.filter((s) => s.id !== deleteTarget.id))
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo eliminar la saga.')
    } finally {
      setSaving(false)
      setDeleteTarget(null)
    }
  }

  return {
    sagas,
    loading,
    error,
    saving,
    modalTarget,
    setModalTarget,
    deleteTarget,
    setDeleteTarget,
    handleSave,
    handleDelete,
  }
}
