
import { useState } from 'react'
import Button from '../../../components/Button'
import { shelfSchema } from '../schemas/shelfSchema.js'

const inputCls =
    'w-full h-11 min-h-[44px] px-3.5 text-[15px] rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors shadow-2xs'

export default function ShelfModal({ shelf, onSave, onClose, saving }) {
    const [code, setCode] = useState(shelf?.code ?? '')
    const [description, setDescription] = useState(shelf?.description ?? '')
    const [fieldError, setFieldError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const validData = await shelfSchema.validate(
                {
                    code: code.trim(),
                    description: description.trim(),
                },
                { abortEarly: false }
            )

            setFieldError('')

            onSave({
                code: validData.code,
                ...(validData.description
                    ? { description: validData.description }
                    : { description: '' }),
            })
        } catch (err) {
            if (err.name === 'ValidationError') {
                const codeErr = err.inner.find((i) => i.path === 'code') || err.inner[0]
                setFieldError(codeErr?.message || err.message)
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
                        {shelf ? 'Editar estante' : 'Nuevo estante'}
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

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="flex flex-col">
                        <label className="text-[14px] font-semibold text-slate-700 flex items-center justify-between mb-1.5">
                            <span>Código de identificación</span>
                            <span className="text-blue-600 text-xs font-normal">Requerido</span>
                        </label>

                        <input
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value)
                                setFieldError('')
                            }}
                            className={inputCls}
                            placeholder="Ej: EST-A1, EST-04"
                            autoFocus
                        />

                        {fieldError && (
                            <span className="mt-1 text-xs text-red-600 font-medium">
                                {fieldError}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[14px] font-semibold text-slate-700 mb-1.5">
                            Descripción o ubicación física (opcional)
                        </label>

                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={inputCls}
                            placeholder="Ej: Pasillo A - Literatura Latinoamericana"
                        />
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
                            {shelf ? 'Guardar cambios' : 'Crear estante'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
