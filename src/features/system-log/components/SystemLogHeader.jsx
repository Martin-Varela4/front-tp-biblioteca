
export default function SystemLogHeader({ total }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Registros del sistema
                </h2>

                <p className="text-slate-500 text-sm sm:text-[15px] mt-1">
                    Consultá los eventos, advertencias y errores registrados por el sistema
                </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 border border-blue-100 self-start sm:self-auto">
                <span className="text-sm font-semibold text-blue-700">
                    {total} registros
                </span>
            </div>
        </div>
    )
}
