import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
AlertCircle,
Eye,
FileText,
Loader2,
Pencil,
Plus,
ReceiptText,
Trash2,
Users,
} from 'lucide-react'
import { deleteQuote, getQuotes } from '../../services/quotes'

function getStatusClasses(status) {
const normalizedStatus = String(status || '').toLowerCase()

if (
['accepted', 'accepted_quote', 'approved', 'validé', 'accepte'].includes(
normalizedStatus,
)
) {
return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
}

if (
['rejected', 'rejected_quote', 'refused', 'refusé', 'refuse'].includes(
normalizedStatus,
)
) {
return 'bg-red-50 text-red-700 ring-1 ring-red-100'
}

if (
['sent', 'sent_quote', 'envoyé', 'envoye', 'pending'].includes(
normalizedStatus,
)
) {
return 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'
}

if (
['expired', 'expiré', 'expire', 'cancelled', 'annulé', 'annule'].includes(
normalizedStatus,
)
) {
return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
}

if (['draft', 'brouillon'].includes(normalizedStatus)) {
return 'bg-violet-50 text-violet-700 ring-1 ring-violet-100'
}

return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
}

function formatStatus(status) {
if (!status) return 'Non défini'

const labels = {
accepted: 'Accepté',
accepted_quote: 'Accepté',
approved: 'Validé',
rejected: 'Refusé',
rejected_quote: 'Refusé',
refused: 'Refusé',
sent: 'Envoyé',
sent_quote: 'Envoyé',
pending: 'En attente',
expired: 'Expiré',
cancelled: 'Annulé',
draft: 'Brouillon',
brouillon: 'Brouillon',
validé: 'Validé',
accepte: 'Accepté',
accepté: 'Accepté',
refuse: 'Refusé',
refusé: 'Refusé',
envoyé: 'Envoyé',
envoye: 'Envoyé',
expiré: 'Expiré',
expire: 'Expiré',
annulé: 'Annulé',
annule: 'Annulé',
}

return labels[String(status).toLowerCase()] || status
}

export default function QuotesPage() {
const [quotes, setQuotes] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [deletingId, setDeletingId] = useState(null)

useEffect(() => {
let active = true

async function fetchQuotes() {
  try {
    setLoading(true)
    setError('')

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
return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-7xl"> <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"> <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12"> <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600"> <Loader2 className="h-6 w-6 animate-spin" /> </div>

          <p className="mt-4 text-sm font-medium text-slate-700">
            Chargement des devis...
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Préparation de votre espace commercial
          </p>
        </div>
      </div>
    </div>
  </div>
)

}

return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-7xl space-y-6"> <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"> <div className="flex items-start gap-4"> <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100"> <FileText className="h-5 w-5" /> </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-violet-600">
            <ReceiptText className="h-4 w-4" />
            Gestion commerciale
          </div>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Devis
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Créez, suivez et gérez les propositions commerciales de votre
            organisation.
          </p>
        </div>
      </div>

      <Link
        to="/quotes/new"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-100"
      >
        <Plus className="h-4 w-4" />
        Nouveau devis
      </Link>
    </div>

    {error && (
      <div className="overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
        <div className="flex items-start gap-3 border-l-4 border-red-500 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="text-sm font-semibold text-red-800">
              Opération impossible
            </p>

            <p className="mt-1 text-sm leading-5 text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    )}

    {quotes.length === 0 && !error && (
      <div className="overflow-hidden rounded-2xl border border-dashed border-violet-200 bg-white shadow-sm">
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
            <FileText className="h-6 w-6" />
          </div>

          <h2 className="mt-5 text-base font-semibold text-slate-900">
            Aucun devis
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Aucun devis n&apos;est actuellement enregistré dans votre
            organisation. Créez votre premier devis pour commencer à
            suivre vos opportunités commerciales.
          </p>

          <Link
            to="/quotes/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-100"
          >
            <Plus className="h-4 w-4" />
            Créer un devis
          </Link>
        </div>
      </div>
    )}

    {quotes.length > 0 && (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <FileText className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Liste des devis
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                {quotes.length}{' '}
                {quotes.length > 1
                  ? 'devis enregistrés'
                  : 'devis enregistré'}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-slate-200 bg-slate-50/50">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Devis
                </th>

                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Client
                </th>

                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Statut
                </th>

                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Total
                </th>

                <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {quotes.map((quote) => (
                <tr
                  key={quote.id}
                  className="group transition hover:bg-violet-50/30"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 transition group-hover:bg-violet-100">
                        <FileText className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {quote.number || 'Sans numéro'}
                        </p>

                        <p className="mt-0.5 text-sm text-slate-500">
                          {quote.title || 'Sans titre'}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Users className="h-4 w-4" />
                      </div>

                      <span className="text-sm text-slate-600">
                        {quote.customer_id
                          ? `Client #${quote.customer_id}`
                          : '—'}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                        quote.status,
                      )}`}
                    >
                      {formatStatus(quote.status)}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                    {quote.issue_date || '—'}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-slate-900">
                      {quote.total_amount ?? 0} €
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/quotes/${quote.id}`}
                        aria-label={`Voir le devis ${
                          quote.number || quote.title || quote.id
                        }`}
                        title="Voir le devis"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>

                      <Link
                        to={`/quotes/${quote.id}/edit`}
                        aria-label={`Modifier le devis ${
                          quote.number || quote.title || quote.id
                        }`}
                        title="Modifier le devis"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(quote)}
                        disabled={deletingId === quote.id}
                        aria-label={`Supprimer le devis ${
                          quote.number || quote.title || quote.id
                        }`}
                        title="Supprimer le devis"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === quote.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
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
