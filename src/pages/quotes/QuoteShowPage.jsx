import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
AlertCircle,
ArrowLeft,
CalendarDays,
CheckCircle2,
CircleDollarSign,
ClipboardList,
FileText,
Loader2,
MapPin,
Pencil,
ReceiptText,
UserRound,
} from 'lucide-react'
import { getQuote } from '../../services/quotes'

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

function formatAmount(value) {
const amount = Number(value ?? 0)

if (Number.isNaN(amount)) {
return '0,00 €'
}

return `${amount.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`
}

function formatDate(value) {
if (!value) return '—'

const date = new Date(value)

if (Number.isNaN(date.getTime())) {
return value
}

return date.toLocaleDateString('fr-FR', {
day: '2-digit',
month: 'long',
year: 'numeric',
})
}

export default function QuoteShowPage() {
const { id } = useParams()
const navigate = useNavigate()

const [quote, setQuote] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

useEffect(() => {
let active = true

const loadQuote = async () => {
  try {
    setLoading(true)
    setError('')

    const data = await getQuote(id)

    if (!active) return

    setQuote(data)
  } catch {
    if (active) {
      setQuote(null)
      setError('Impossible de charger le devis.')
    }
  } finally {
    if (active) {
      setLoading(false)
    }
  }
}

loadQuote()

return () => {
  active = false
}

}, [id])

if (loading) {
return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl"> <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"> <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12"> <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600"> <Loader2 className="h-6 w-6 animate-spin" /> </div>

          <p className="mt-4 text-sm font-medium text-slate-700">
            Chargement du devis...
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Préparation de la fiche commerciale
          </p>
        </div>
      </div>
    </div>
  </div>
)

}

if (error) {
return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <Link
         to="/quotes"
         className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-violet-600"
       > <ArrowLeft className="h-4 w-4" />
Retour aux devis </Link>

      <div className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm">
        <div className="flex items-start gap-4 border-l-4 border-red-500 bg-red-50 p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <AlertCircle className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-red-900">
              Devis indisponible
            </h2>

            <p className="mt-1 text-sm leading-6 text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={() => navigate('/quotes')}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-sm font-medium text-red-700 ring-1 ring-red-200 transition hover:bg-red-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux devis
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

}

if (!quote) {
return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <Link
         to="/quotes"
         className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-violet-600"
       > <ArrowLeft className="h-4 w-4" />
Retour aux devis </Link>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
            <FileText className="h-6 w-6" />
          </div>

          <h2 className="mt-5 text-base font-semibold text-slate-900">
            Devis introuvable
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Le devis demandé n&apos;existe pas ou n&apos;est plus
            disponible.
          </p>

          <Link
            to="/quotes"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux devis
          </Link>
        </div>
      </div>
    </div>
  </div>
)

}

return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"> <div> <Link
           to="/quotes"
           className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-violet-600"
         > <ArrowLeft className="h-4 w-4" />
Retour aux devis </Link>

        <div className="mt-6 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-violet-600">
              <ReceiptText className="h-4 w-4" />
              Gestion commerciale
            </div>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {quote.number || 'Devis sans numéro'}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {quote.title || 'Sans titre'}
            </p>
          </div>
        </div>
      </div>

      <Link
        to={`/quotes/${quote.id}/edit`}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-100"
      >
        <Pencil className="h-4 w-4" />
        Modifier
      </Link>
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <ClipboardList className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Informations du devis
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Références et informations commerciales
            </p>
          </div>
        </div>

        <dl className="grid gap-x-8 gap-y-6 p-6 sm:grid-cols-2 lg:p-8">
          <div>
            <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              <UserRound className="h-4 w-4 text-violet-500" />
              Client
            </dt>

            <dd className="mt-2 text-sm font-medium text-slate-900">
              {quote.customer_id ? `Client #${quote.customer_id}` : '—'}
            </dd>
          </div>

          <div>
            <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              <MapPin className="h-4 w-4 text-violet-500" />
              Site
            </dt>

            <dd className="mt-2 text-sm font-medium text-slate-900">
              {quote.site_id ? `Site #${quote.site_id}` : '—'}
            </dd>
          </div>

          <div>
            <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-violet-500" />
              Statut
            </dt>

            <dd className="mt-2">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                  quote.status,
                )}`}
              >
                {formatStatus(quote.status)}
              </span>
            </dd>
          </div>

          <div>
            <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              <CalendarDays className="h-4 w-4 text-violet-500" />
              Date du devis
            </dt>

            <dd className="mt-2 text-sm font-medium text-slate-900">
              {formatDate(quote.issue_date)}
            </dd>
          </div>

          <div>
            <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              <CalendarDays className="h-4 w-4 text-violet-500" />
              Validité
            </dt>

            <dd className="mt-2 text-sm font-medium text-slate-900">
              {formatDate(quote.valid_until)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
        <div className="border-b border-violet-100 bg-violet-50/60 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
              <CircleDollarSign className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Montants
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Synthèse financière du devis
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-500">Sous-total</span>
            <span className="font-medium text-slate-900">
              {formatAmount(quote.subtotal)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-500">Remise</span>
            <span className="font-medium text-slate-900">
              {formatAmount(quote.discount_amount)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-500">TVA</span>
            <span className="font-medium text-slate-900">
              {formatAmount(quote.tax_amount)}
            </span>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Total
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Montant du devis
                </p>
              </div>

              <span className="text-xl font-bold tracking-tight text-violet-600">
                {formatAmount(quote.total_amount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {(quote.description || quote.notes) && (
      <div className="grid gap-6 lg:grid-cols-2">
        {quote.description && (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-6 py-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <FileText className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Description
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Présentation de la proposition commerciale
                </p>
              </div>
            </div>

            <div className="p-6">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {quote.description}
              </p>
            </div>
          </section>
        )}

        {quote.notes && (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-6 py-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <FileText className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Notes
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Informations complémentaires
                </p>
              </div>
            </div>

            <div className="p-6">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {quote.notes}
              </p>
            </div>
          </section>
        )}
      </div>
    )}

    <div className="flex items-start gap-3 rounded-xl border border-violet-100 bg-violet-50/60 p-4">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />

      <div>
        <p className="text-sm font-medium text-violet-900">
          Suivi commercial
        </p>

        <p className="mt-1 text-xs leading-5 text-violet-700">
          Ce devis centralise les informations nécessaires au suivi de la
          proposition commerciale et à sa transformation en opération.
        </p>
      </div>
    </div>
  </div>
</div>

)
}
