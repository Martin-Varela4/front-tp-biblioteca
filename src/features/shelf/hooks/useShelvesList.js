import { useEffect, useState } from 'react'
import { getShelves, createShelf, updateShelf, deleteShelf } from '../service/shelves.api.js'

/**
 * Gestiona el estado de la lista de estantes y las operaciones CRUD.
 * Carga los estantes al montarse y actualiza el estado local tras cada operación.
 *
 * @returns {{
 *   shelves,
 *   loading, error,
 *   saving,
 *   modalTarget, setModalTarget,
 *   deleteTarget, setDeleteTarget,
 *   handleSave, handleDelete
 * }}
 */
export function useShelvesList() {
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

  return {
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
  }
}
