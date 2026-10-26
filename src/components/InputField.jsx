export function InputField({
  label,
  type,
  name,
  value,
  onChange,
  autoComplete,
  required = true,
  placeholder,
  error,
}) {
  return (
    <label className="flex flex-col text-[14px] font-semibold text-slate-700">
      <span className="mb-1.5 flex items-center justify-between">
        {label}
        {required && <span className="text-blue-600 text-xs font-normal">Requerido</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className={`w-full h-11 px-3.5 text-[15px] rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors shadow-2xs focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
            : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/20'
        }`}
      />
      {error && <span className="mt-1 text-xs text-red-600 font-medium">{error}</span>}
    </label>
  )
}
