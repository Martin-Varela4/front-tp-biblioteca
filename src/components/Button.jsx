import Spinner from './Spinner'

const BASE =
  'inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none'

const VARIANTS = {
  primary:
    'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-xs hover:shadow-sm focus:ring-blue-500 border border-blue-600 hover:border-blue-700',
  secondary:
    'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300 shadow-xs hover:border-slate-400 focus:ring-slate-300',
  danger:
    'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-xs hover:shadow-sm focus:ring-red-500 border border-red-600 hover:border-red-700',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-[13px] min-h-[34px] rounded-md leading-tight',
  md: 'px-4.5 py-2.5 text-[14.5px] min-h-[42px] rounded-lg leading-normal',
  lg: 'px-6 py-3 text-[15px] min-h-[46px] rounded-lg leading-normal',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  children,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${BASE} ${VARIANTS[variant] ?? VARIANTS.primary} ${SIZES[size] ?? SIZES.md} ${className}`}
    >
      {isLoading && <Spinner size={size === 'sm' ? 'sm' : 'md'} className="text-current" />}
      {children}
    </button>
  )
}
