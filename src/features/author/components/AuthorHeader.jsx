
import Button from '../../../components/Button'

export default function AuthorHeader({ onAdd }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Autores Registrados
                </h2>

                <p className="text-slate-500 text-sm sm:text-[15px] mt-1">
                    Administrá los autores asociados a las obras bibliográficas del catálogo
                </p>
            </div>

            <Button
                variant="primary"
                size="md"
                onClick={onAdd}
                className="shadow-sm shrink-0"
            >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>Agregar autor</span>
            </Button>
        </div>
    )
}
