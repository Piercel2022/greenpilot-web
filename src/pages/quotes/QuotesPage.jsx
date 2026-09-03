import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteQuote, getQuotes } from '../../services/quotes'

export default function QuotesPage() {
const [quotes, setQuotes] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [deletingId, setDeletingId] = useState(null)

useEffect(() => {
let active = true


async function fetchQuotes() {
  try {
    const data = await getQuotes()

    if (active) {
      setQuotes(Array.isArray(data) ? data : [])
    }
  } catch {
    if (active) {
      setQuotes([])
      setError('Impossible de charger les devis.')
    }
  } finally {
    if (active) {
      setLoading(false)
    }
  }
}

fetchQuotes()

return () => {
  active = false
}


}, [])

const handleDelete = async (quote) => {
const label = quote.number || quote.title || 'ce devis'


const confirmed = window.confirm(
  `Voulez-vous vraiment supprimer le devis ${label} ?`,
)

if (!confirmed) return

try {
  setDeletingId(quote.id)
  setError('')

  await deleteQuote(quote.id)

  setQuotes((currentQuotes) =>
    currentQuotes.filter(
      (currentQuote) => currentQuote.id !== quote.id,
    ),
  )
} catch (requestError) {
  const messages = requestError.response?.data?.messages

  if (Array.isArray(messages) && messages.length > 0) {
    setError(messages.join(', '))
  } else {
    setError('Impossible de supprimer le devis.')
  }
} finally {
  setDeletingId(null)
}

}

if (loading) {
return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-7xl"> <p className="text-sm text-slate-500">
Chargement des devis... </p> </div> </div>
)
}

return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-7xl space-y-6"> <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <p className="text-sm font-medium text-slate-500">
Gestion commerciale </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Devis
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Consultez, modifiez et gérez les devis de votre organisation.
        </p>
      </div>

      <Link
        to="/quotes/new"
        className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Nouveau devis
      </Link>
    </div>

    {error && (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-medium text-red-700">
          {error}
        </p>
      </div>
    )}

    {quotes.length === 0 && !error && (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h2 className="text-base font-semibold text-slate-900">
          Aucun devis
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Aucun devis n&apos;est actuellement enregistré dans votre
          organisation.
        </p>

        <Link
          to="/quotes/new"
          className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Créer un devis
        </Link>
      </div>
    )}

    {quotes.length > 0 && (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Devis
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Client
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Statut
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Total
                </th>

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {quotes.map((quote) => (
                <tr
                  key={quote.id}
                  className="hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {quote.number || 'Sans numéro'}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {quote.title || 'Sans titre'}
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                    {quote.customer_id
                      ? `Client #${quote.customer_id}`
                      : '—'}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {quote.status || '—'}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                    {quote.issue_date || '—'}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-slate-900">
                    {quote.total_amount ?? 0} €
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/quotes/${quote.id}/edit`}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Modifier
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(quote)}
                        disabled={deletingId === quote.id}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === quote.id
                          ? 'Suppression...'
                          : 'Supprimer'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
</div>

)
}
