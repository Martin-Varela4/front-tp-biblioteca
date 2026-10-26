import api from '../../../api/client.js'

export const getSagas = async () => {
    const response = await api.get('/sagas')
    return response.data
}

export const getSagaById = async (id) => {
    const response = await api.get(`/sagas/${id}`)
    return response.data
}

export const createSaga = async (data) => {
    const response = await api.post('/sagas', data)
    return response.data
}

export const updateSaga = async (id, data) => {
    const response = await api.put(`/sagas/${id}`, data)
    return response.data
}

export const deleteSaga = async (id) => {
    const response = await api.delete(`/sagas/${id}`)
    return response.data
}
