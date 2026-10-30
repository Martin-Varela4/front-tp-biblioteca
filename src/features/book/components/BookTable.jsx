
import { useNavigate } from 'react-router'
import { ROUTES } from '../../../routes/index'
import Button from '../../../components/Button'

export default function BookTable({
    books,
    onDeleteTarget,
    isDeleting = false,
}) {
    const navigate = useNavigate()

    return (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left">
                    <thead className="bg-slate-100/75">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Título
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Autor
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Género
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Estante
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Año
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Saga
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {books.map((book) => (
                            <tr
                                key={book.id}
                                className="hover:bg-blue-50/30 transition-colors"
                            >
                                <td className="px-6 py-4.5">
                                    <div className="font-semibold text-slate-900 text-[15px] leading-snug">
                                        {book.title}
                                    </div>

                                    {book.isbn && (
                                        <span className="text-xs text-slate-400 font-mono block mt-0.5">
                                            ISBN: {book.isbn}
                                        </span>
                                    )}
                                </td>

                                <td className="px-6 py-4.5 text-[14.5px] font-medium text-slate-700">
                                    {book.author?.name ?? '—'}
                                </td>

                                <td className="px-6 py-4.5 text-[14.5px]">
                                    {book.genre?.name ? (
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80">
                                            {book.genre.name}
                                        </span>
                                    ) : (
                                        <span className="text-slate-400">—</span>
                                    )}
                                </td>

                                <td className="px-6 py-4.5 text-[14.5px]">
                                    {book.shelf?.code ? (
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                                            {book.shelf.code}
                                        </span>
                                    ) : (
                                        <span className="text-slate-400">—</span>
                                    )}
                                </td>

                                <td className="px-6 py-4.5 text-[14.5px] text-slate-600">
                                    {book.publicationYear ?? '—'}
                                </td>

                                <td className="px-6 py-4.5 text-[14.5px] text-slate-600">
                                    {book.saga?.name ?? '—'}
                                </td>

                                <td className="px-6 py-4.5 text-right">
                                    <div className="flex items-center justify-end gap-2.5">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => navigate(ROUTES.BOOK_EDIT(book.id))}
                                        >
                                            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            <span>Editar</span>
                                        </Button>

                                        <Button
                                            variant="danger"
                                            size="sm"
                                            isLoading={isDeleting}
                                            disabled={!onDeleteTarget}
                                            onClick={() => onDeleteTarget(book)}
                                        >
                                            <svg className="w-3.5 h-3.5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                            <span>Eliminar</span>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
