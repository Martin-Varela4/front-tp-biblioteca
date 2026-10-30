export default function FormField({ label, required, error, children, className = '' }) {
    return (
        <div className={`flex flex-col ${className}`}>
            <label className="text-[14px] font-semibold text-slate-700 flex items-center justify-between mb-1.5">
                <span>{label}</span>
                {required && <span className="text-blue-600 text-xs font-normal">Requerido</span>}
            </label>
            {children}
            {error && <span className="mt-1 text-xs text-red-600 font-medium">{error}</span>}
        </div>
    )
}
