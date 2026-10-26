export default function EmptyState({ title = 'Sin resultados', description = '', action = null }) {
  return (
    <div className="flex flex-col items-center justify-center py-18 px-6 text-center bg-white rounded-xl border border-dashed border-slate-300 shadow-2xs">
      <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
      {description && <p className="mt-1.5 text-[15px] text-slate-500 max-w-md leading-relaxed">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
