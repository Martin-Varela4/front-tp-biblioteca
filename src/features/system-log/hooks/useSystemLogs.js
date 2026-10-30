
import { useEffect, useState } from 'react'
import { getSystemLogs } from '../service/systemLogService.js'

export function useSystemLogs() {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const controller = new AbortController()

        async function fetchLogs() {
            try {
                setLoading(true)
                setError('')

                const data = await getSystemLogs(controller.signal)

                setLogs(data)
            } catch (err) {
                if (err.code === 'ERR_CANCELED') return

                setError(
                    err.response?.data?.message ||
                    'No se pudieron cargar los registros del sistema.'
                )
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        fetchLogs()

        return () => controller.abort()
    }, [])

    return {
        logs,
        loading,
        error,
    }
}
