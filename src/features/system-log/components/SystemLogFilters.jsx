
export default function SystemLogFilters({ level, onLevelChange }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <label
                htmlFor="log-level"
                className="text-sm font-semibold text-slate-700"
            >
                Filtrar por nivel:
            </label>

            <select
                id="log-level"
                value={level}
                onChange={(e) => onLevelChange(e.target.value)}
                className="h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            >
                <option value="ALL">Todos los niveles</option>
                <option value="INFO">Información (INFO)</option>
                <option value="WARN">Advertencias (WARN)</option>
                <option value="ERROR">Errores (ERROR)</option>
            </select>
        </div>
    )
}
