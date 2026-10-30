
import { useMemo, useState } from 'react'

import AdminLayout from '../../../components/layouts/AdminLayout'
import Spinner from '../../../components/Spinner'
import EmptyState from '../../../components/EmptyState'

import { useSystemLogs } from '../hooks/useSystemLogs'

import SystemLogHeader from '../components/SystemLogHeader'
import SystemLogFilters from '../components/SystemLogFilters'
import SystemLogTable from '../components/SystemLogTable'

export default function SystemLogsPage() {
    const { logs, loading, error } = useSystemLogs()

    const [level, setLevel] = useState('ALL')

    const filteredLogs = useMemo(() => {
        if (level === 'ALL') return logs

        return logs.filter(
            (log) => log.level?.toUpperCase() === level
        )
    }, [logs, level])

    return (
        <AdminLayout title="Registros del sistema">
            <SystemLogHeader total={filteredLogs.length} />

            <SystemLogFilters
                level={level}
                onLevelChange={setLevel}
            />

            {error && (
                <div
                    role="alert"
                    className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3"
                >
                    <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>

                    <span>{error}</span>
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-slate-200">
                    <Spinner size="lg" className="text-blue-600" />

                    <span className="mt-4 text-sm font-medium text-slate-500">
                        Cargando registros del sistema...
                    </span>
                </div>
            ) : filteredLogs.length === 0 ? (
                <EmptyState
                    title={
                        logs.length === 0
                            ? 'No hay registros disponibles'
                            : 'No hay registros para este nivel'
                    }
                    description={
                        logs.length === 0
                            ? 'Los eventos del sistema aparecerán aquí cuando se registren.'
                            : 'No se encontraron registros que coincidan con el filtro seleccionado.'
                    }
                />
            ) : (
                <SystemLogTable logs={filteredLogs} />
            )}
        </AdminLayout>
    )
}
