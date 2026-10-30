import { useEffect, useState } from 'react'
import { getBookById } from '../service/books.api.js'
import { getAuthors } from '../../author/service/authors.api.js'
import { getGenres } from '../../genre/service/genres.api.js'
import { getShelves } from '../../shelf/service/shelves.api.js'
import { getSagas } from '../../saga/service/sagas.api.js'

const EMPTY_FORM = {
  title: '',
  publicationYear: '',
  authorId: '',
  genreId: '',
  shelfId: '',
  sagaId: '',
  isbn: '',
  synopsis: '',
  sagaOrder: '',
}


export function useBookFormData(id, isEditing) {
  const [authors, setAuthors] = useState([])
  const [genres, setGenres] = useState([])
  const [shelves, setShelves] = useState([])
  const [sagas, setSagas] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoadingData(true)
      try {
        const [authorsData, genresData, shelvesData, sagasData] = await Promise.all([
          getAuthors(),
          getGenres(),
          getShelves(),
          getSagas(),
        ])
        setAuthors(Array.isArray(authorsData) ? authorsData : [])
        setGenres(Array.isArray(genresData) ? genresData : [])
        setShelves(Array.isArray(shelvesData) ? shelvesData : [])
        setSagas(Array.isArray(sagasData) ? sagasData : [])

        if (isEditing) {
          const book = await getBookById(id)
          setForm({
            title: book.title ?? '',
            publicationYear: book.publicationYear ?? '',
            authorId: book.author?.id ?? '',
            genreId: book.genre?.id ?? '',
            shelfId: book.shelf?.id ?? '',
            sagaId: book.saga?.id ?? '',
            isbn: book.isbn ?? '',
            synopsis: book.synopsis ?? '',
            sagaOrder: book.sagaOrder ?? '',
          })
        }
      } catch {
        setError('No se pudieron cargar los datos necesarios para el formulario.')
      } finally {
        setLoadingData(false)
      }
    }
    load()
  }, [id, isEditing])

  return { authors, genres, shelves, sagas, form, setForm, loadingData, error }
}
