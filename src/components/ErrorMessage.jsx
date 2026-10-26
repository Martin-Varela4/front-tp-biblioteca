export function ErrorMessage({ message }) {
  if (!message) return null
  return (
    <div
      role="alert"
      className="bg-red-50 border border-red-200 text-red-700 text-sm px-3.5 py-2.5 rounded-lg flex items-start gap-2.5 font-medium animate-in fade-in duration-150"
    >
      <svg
        className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <span>{message}</span>
    </div>
  )
}
