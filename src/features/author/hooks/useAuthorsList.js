import { useEffect, useState } from 'react'
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from '../service/authors.api.js'

/**

 * @returns {{
 *   authors,
 *   loading, error,
 *   saving,
 *   modalTarget, setModalTarget,
 *   deleteTarget, setDeleteTarget,
 *   handleSave, handleDelete
 * }}
 */
export function useAuthorsList() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalTarget, setModalTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await getAuthors()
      setAuthors(Array.isArray(data) ? data : [])
    } catch {
      setError('No se pudieron cargar los autores.')
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
        const updated = await updateAuthor(modalTarget.id, data)
        const updatedAuthor = updated.author || updated
        setAuthors((prev) => prev.map((a) => (a.id === modalTarget.id ? { ...a, ...updatedAuthor } : a)))
      } else {
        const created = await createAuthor(data)
        const newAuthor = created.author || created
        setAuthors((prev) => [...prev, newAuthor])
      }
      setModalTarget(null)
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo guardar el autor.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setSaving(true)
    try {
      await deleteAuthor(deleteTarget.id)
      setAuthors((prev) => prev.filter((a) => a.id !== deleteTarget.id))
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo eliminar el autor.')
    } finally {
      setSaving(false)
      setDeleteTarget(null)
    }
  }

  return {
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
  }
}
