import api from '../../../api/client.js'

export const getShelves = async () => {
    const response = await api.get('/shelves')
    return response.data
}

export const getShelfById = async (id) => {
    const response = await api.get(`/shelves/${id}`)
    return response.data
}

export const createShelf = async (data) => {
    const response = await api.post('/shelves', data)
    return response.data
}

export const updateShelf = async (id, data) => {
    const response = await api.put(`/shelves/${id}`, data)
    return response.data
}

export const deleteShelf = async (id) => {
    const response = await api.delete(`/shelves/${id}`)
    return response.data
}
