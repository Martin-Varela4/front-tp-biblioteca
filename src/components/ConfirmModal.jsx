import Button from './Button'

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title = '¿Estás seguro?',
  message = 'Esta acción no se puede deshacer.',
}) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-7 border border-slate-200 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
            <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="mt-7 flex justify-end gap-3 pt-2">
          <Button variant="secondary" size="md" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="danger" size="md" onClick={onConfirm}>
            Confirmar eliminación
          </Button>
        </div>
      </div>
    </div>
  )
}
