import { useEffect, useState } from 'react'
import { getGenres, createGenre, updateGenre, deleteGenre } from '../service/genres.api.js'

/**

 * @returns {{
 *   genres,
 *   loading, error,
 *   saving,
 *   modalTarget, setModalTarget,
 *   deleteTarget, setDeleteTarget,
 *   handleSave, handleDelete
 * }}
 */
export function useGenresList() {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalTarget, setModalTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await getGenres()
      setGenres(Array.isArray(data) ? data : [])
    } catch {
      setError('No se pudieron cargar los géneros literarios.')
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
        const updated = await updateGenre(modalTarget.id, data)
        setGenres((prev) => prev.map((g) => (g.id === modalTarget.id ? { ...g, ...updated } : g)))
      } else {
        const created = await createGenre(data)
        const newGenre = created.genre || created
        setGenres((prev) => [...prev, newGenre])
      }
      setModalTarget(null)
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo guardar el género.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setSaving(true)
    try {
      await deleteGenre(deleteTarget.id)
      setGenres((prev) => prev.filter((g) => g.id !== deleteTarget.id))
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo eliminar el género.')
    } finally {
      setSaving(false)
      setDeleteTarget(null)
    }
  }

  return {
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
  }
}
