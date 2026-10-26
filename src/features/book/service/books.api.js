
import api from '../../../api/client.js'

export const getBooks = async (filters = {}) => {
    const response = await api.get('/books', {
        params: filters,
    })

    return response.data
}

export const getBookById = async (id) => {
    const response = await api.get(`/books/${id}`)
    return response.data
}

export const createBook = async (bookData) => {
    const response = await api.post('/books', bookData)
    return response.data
}

export const updateBook = async (id, bookData) => {
    const response = await api.put(`/books/${id}`, bookData)
    return response.data
}

export const deleteBook = async (id) => {
    const response = await api.delete(`/books/${id}`)
    return response.data
}
