
export default function AuthorFilters({
    searchName,
    onSearchNameChange,
    nationality,
    onNationalityChange,
    nationalities,
    onClear,
}) {
    const hasFilters = searchName !== '' || nationality !== ''

    return (
        <div className="mb-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Buscar por nombre */}
                <div>
                    <label
                        htmlFor="author-search"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                        Buscar autor
                    </label>

                    <div className="relative">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-4.34-4.34m1.34-5.16a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>

                        <input
                            id="author-search"
                            type="text"
                            value={searchName}
                            onChange={(e) => onSearchNameChange(e.target.value)}
                            placeholder="Buscar por nombre..."
                            className="w-full h-11 pl-10 pr-3.5 text-[15px] rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                        />
                    </div>
                </div>

                {/* Filtrar por nacionalidad */}
                <div>
                    <label
                        htmlFor="author-nationality"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                        Nacionalidad
                    </label>

                    <select
                        id="author-nationality"
                        value={nationality}
                        onChange={(e) => onNationalityChange(e.target.value)}
                        className="w-full h-11 px-3.5 text-[15px] rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                    >
                        <option value="">Todas las nacionalidades</option>

                        {nationalities.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Limpiar filtros */}
            {hasFilters && (
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={onClear}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}
        </div>
    )
}
