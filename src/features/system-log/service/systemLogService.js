
import api from '../../../api/client'

export const getSystemLogs = async (signal) => {
    const response = await api.get('/logs', { signal })
    return response.data
}
