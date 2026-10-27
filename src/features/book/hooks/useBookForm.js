import { useState } from 'react'
import { createBook, updateBook } from '../service/books.api.js'
import { bookSchema } from '../schemas/bookSchema.js'
import { ROUTES } from '../../../routes/index'

/**
 * Gestiona el ciclo de vida interactivo del formulario de libro:
 * estado de los campos, limpieza de errores por campo, validación Yup,
 * construcción del payload y envío a la API (crear o actualizar).
 *
 * @param {{ form, setForm, isEditing, id, navigate }} params
 *   - form      : objeto de estado actual del formulario
 *   - setForm   : setter del estado del formulario (proveniente de useBookFormData)
 *   - isEditing : indica si se está editando un libro existente
 *   - id        : ID del libro en modo edición
 *   - navigate  : función de navegación de React Router
 *
 * @returns {{ fieldErrors, loading, error, handleChange, handleSubmit }}
 */
export function useBookForm({ form, setForm, isEditing, id, navigate }) {
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    let validData
    try {
      validData = await bookSchema.validate(
        {
          title: form.title.trim(),
          publicationYear: form.publicationYear,
          authorId: form.authorId,
          genreId: form.genreId,
          shelfId: form.shelfId,
          sagaId: form.sagaId,
          isbn: form.isbn,
          synopsis: form.synopsis,
          sagaOrder: form.sagaOrder,
        },
        { abortEarly: false }
      )
      setFieldErrors({})
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = {}
        err.inner.forEach((issue) => {
          if (issue.path && !errors[issue.path]) {
            errors[issue.path] = issue.message
          }
        })
        setFieldErrors(errors)
      }
      return
    }

    setLoading(true)
    setError('')

    const payload = {
      title: validData.title,
      publicationYear: validData.publicationYear,
      authorId: validData.authorId,
      genreId: validData.genreId,
      shelfId: validData.shelfId,
      ...(validData.sagaId ? { sagaId: validData.sagaId } : {}),
      ...(validData.isbn ? { isbn: validData.isbn } : {}),
      ...(validData.synopsis ? { synopsis: validData.synopsis } : {}),
      ...(validData.sagaOrder !== null && validData.sagaOrder !== undefined ? { sagaOrder: validData.sagaOrder } : {}),
    }

    try {
      if (isEditing) {
        await updateBook(id, payload)
      } else {
        await createBook(payload)
      }
      navigate(ROUTES.HOME)
    } catch (err) {
      setError(err.response?.data?.message || 'Ocurrió un error al guardar el libro.')
    } finally {
      setLoading(false)
    }
  }

  return { fieldErrors, loading, error, handleChange, handleSubmit }
}
