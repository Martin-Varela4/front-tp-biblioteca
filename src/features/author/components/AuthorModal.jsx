
import { useState } from 'react'
import Button from '../../../components/Button'
import { authorSchema } from '../schemas/authorSchema.js'

const inputCls = 'w-full h-11 min-h-[44px] px-3.5 text-[15px] rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors shadow-2xs'

export default function AuthorModal({
    author,
    onSave,
    onClose,
    saving,
}) {
    const [name, setName] = useState(author?.name ?? '')
    const [nacionalidad, setNacionalidad] = useState(author?.nacionalidad ?? '')
    const [biografia, setBiografia] = useState(author?.biografia ?? '')
    const [fieldErrors, setFieldErrors] = useState({})

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const validData = await authorSchema.validate(
                {
                    name: name.trim(),
                    nacionalidad: nacionalidad.trim(),
                    biografia: biografia.trim(),
                },
                { abortEarly: false }
            )

            setFieldErrors({})

            onSave({
                name: validData.name,
                nacionalidad: validData.nacionalidad,
                biografia: validData.biografia,
            })
        } catch (err) {
            if (err.name === 'ValidationError') {
                const errors = {}

                err.inner.forEach((issue) => {
                    if (issue.path && !errors[issue.path]) {
                        errors[issue.path] = issue.message
                    }
                })

                setFieldErrors(errors)
            }
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-7 border border-slate-200 transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                        {author ? 'Editar autor' : 'Nuevo autor'}
                    </h3>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
                        aria-label="Cerrar modal"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-[14px] font-semibold text-slate-700 flex items-center justify-between mb-1.5">
                            <span>Nombre completo</span>
                            <span className="text-blue-600 text-xs font-normal">Requerido</span>
                        </label>

                        <input
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                setFieldErrors((prev) => ({ ...prev, name: '' }))
                            }}
                            className={inputCls}
                            placeholder="Ej: Gabriel García Márquez"
                            autoFocus
                        />

                        {fieldErrors.name && (
                            <span className="mt-1 text-xs text-red-600 font-medium">
                                {fieldErrors.name}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[14px] font-semibold text-slate-700 flex items-center justify-between mb-1.5">
                            <span>Nacionalidad</span>
                            <span className="text-blue-600 text-xs font-normal">Requerido</span>
                        </label>

                        <input
                            value={nacionalidad}
                            onChange={(e) => {
                                setNacionalidad(e.target.value)
                                setFieldErrors((prev) => ({ ...prev, nacionalidad: '' }))
                            }}
                            className={inputCls}
                            placeholder="Ej: Colombiana, Argentina, Uruguaya"
                        />

                        {fieldErrors.nacionalidad && (
                            <span className="mt-1 text-xs text-red-600 font-medium">
                                {fieldErrors.nacionalidad}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[14px] font-semibold text-slate-700 flex items-center justify-between mb-1.5">
                            <span>Biografía breve</span>
                            <span className="text-blue-600 text-xs font-normal">Requerido</span>
                        </label>

                        <textarea
                            rows={3}
                            value={biografia}
                            onChange={(e) => {
                                setBiografia(e.target.value)
                                setFieldErrors((prev) => ({ ...prev, biografia: '' }))
                            }}
                            className="w-full p-3.5 text-[15px] rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors shadow-2xs resize-y"
                            placeholder="Breve reseña sobre su vida y trayectoria literaria..."
                        />

                        {fieldErrors.biografia && (
                            <span className="mt-1 text-xs text-red-600 font-medium">
                                {fieldErrors.biografia}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                        <Button
                            variant="secondary"
                            size="md"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            variant="primary"
                            size="md"
                            isLoading={saving}
                        >
                            {author ? 'Guardar cambios' : 'Crear autor'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
