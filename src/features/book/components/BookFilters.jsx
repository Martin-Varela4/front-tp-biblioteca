export default function BookFilters({
    search, setSearch,
    selectedGenreId, setSelectedGenreId,
    genres,
    selectedYear, setSelectedYear
}) {
    return (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 mb-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-4 items-center">
                {/* Input Buscador */}
                <div className="lg:col-span-6 relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        placeholder="Buscar por título..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-11 pl-10.5 pr-4 text-[15px] rounded-lg border border-slate-300 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors placeholder:text-slate-400"
                    />
                </div>

                {/* Selector de Género */}
                <div className="lg:col-span-4">
                    <select
                        value={selectedGenreId}
                        onChange={(e) => setSelectedGenreId(e.target.value)}
                        className="w-full h-11 px-3.5 text-[15px] rounded-lg border border-slate-300 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors text-slate-800"
                    >
                        <option value="">Todos los géneros</option>
                        {genres.map((g) => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>
                </div>

                {/* Input Año */}
                <div className="lg:col-span-2">
                    <input
                        type="number"
                        placeholder="Año..."
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full h-11 px-3.5 text-[15px] rounded-lg border border-slate-300 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors placeholder:text-slate-400"
                    />
                </div>
            </div>
        </div>
    )
}
