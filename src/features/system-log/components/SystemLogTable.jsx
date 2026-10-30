
function getLevelStyle(level) {
    switch (level?.toUpperCase()) {
        case 'INFO':
            return 'bg-blue-50 text-blue-700 border-blue-200'

        case 'WARN':
            return 'bg-amber-50 text-amber-700 border-amber-200'

        case 'ERROR':
            return 'bg-red-50 text-red-700 border-red-200'

        default:
            return 'bg-slate-100 text-slate-700 border-slate-200'
    }
}

export default function SystemLogTable({ logs }) {
    return (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left">
                    <thead className="bg-slate-100/75">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Nivel
                            </th>

                            <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Mensaje
                            </th>

                            <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Fecha y hora
                            </th>

                            <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                ID
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {logs.map((log) => (
                            <tr
                                key={log.id}
                                className="hover:bg-blue-50/30 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold border ${getLevelStyle(log.level)}`}
                                    >
                                        {log.level?.toUpperCase() || 'UNKNOWN'}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-sm text-slate-700 font-medium max-w-xl break-words">
                                    {log.message}
                                </td>

                                <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                                    {new Date(log.createdAt).toLocaleString('es-AR')}
                                </td>

                                <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                                    #{log.id}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
