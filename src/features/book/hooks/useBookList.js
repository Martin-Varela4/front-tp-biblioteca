import { useEffect, useMemo, useState } from 'react'
import { getBooks, deleteBook } from '../service/books.api.js'
import { getGenres } from '../../genre/service/genres.api.js'

/**
 * Gestiona el estado del catálogo de libros: carga desde la API con filtro
 * de género (server-side), filtros locales de título y año (client-side),
 * lista de géneros para el selector, y operación de eliminación.
 *
 * @returns {{
 *   books, genres, filteredBooks,
 *   search, setSearch,
 *   selectedGenreId, setSelectedGenreId,
 *   selectedYear, setSelectedYear,
 *   loading, error,
 *   deleteTarget, setDeleteTarget,
 *   deleting, handleDelete
 * }}
 */
export function useBookList() {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [search, setSearch] = useState('')
  const [selectedGenreId, setSelectedGenreId] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // Carga libros desde el servidor; re-ejecuta cuando cambia el filtro de género
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true)
        setError('')
        const filters = {}
        if (selectedGenreId) filters.genreId = selectedGenreId
        const data = await getBooks(filters)
        setBooks(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.response?.data?.message || 'No se pudieron cargar los libros.')
      } finally {
        setLoading(false)
      }
    }
    loadBooks()
  }, [selectedGenreId])

  // Carga géneros una sola vez para poblar el selector de filtro
  useEffect(() => {
    getGenres()
      .then((data) => setGenres(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  // Filtrado client-side por título y año; se recalcula solo cuando cambia books, search o selectedYear
  const filteredBooks = useMemo(
    () =>
      books.filter((book) => {
        const matchesTitle = (book.title || '').toLowerCase().includes(search.toLowerCase())
        const matchesYear = selectedYear ? String(book.publicationYear) === selectedYear : true
        return matchesTitle && matchesYear
      }),
    [books, search, selectedYear]
  )

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteBook(deleteTarget.id)
      setBooks((prev) => prev.filter((b) => b.id !== deleteTarget.id))
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo eliminar el libro.')
    } finally {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  return {
    books,
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
  }
}
