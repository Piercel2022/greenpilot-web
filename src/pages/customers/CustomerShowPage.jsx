import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
ArrowLeft,
Building2,
CircleCheck,
Mail,
Pencil,
Phone,
StickyNote,
Smartphone,
User,
UsersRound,
} from 'lucide-react'
import { getCustomer } from '../../services/customers'

export default function CustomerShowPage() {
const { id } = useParams()

const [customer, setCustomer] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

useEffect(() => {
let active = true

async function loadCustomer() {
  try {
    setError('')

    const data = await getCustomer(id)

    if (active) {
      setCustomer(data)
    }
  } catch {
    if (active) {
      setError('Impossible de charger le client.')
    }
  } finally {
    if (active) {
      setLoading(false)
    }
  }
}

loadCustomer()

return () => {
  active = false
}

}, [id])

// ---------------------------------------------------------------------------
// Chargement
// ---------------------------------------------------------------------------
if (loading) {
return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl"> <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm"> <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"> <UsersRound
             size={21}
             strokeWidth={1.8}
             className="animate-pulse"
           /> </div>

        <p className="mt-3 text-sm text-slate-500">
          Chargement de la fiche client...
        </p>
      </div>
    </div>
  </div>
)

}

// ---------------------------------------------------------------------------
// Erreur
// ---------------------------------------------------------------------------
if (error) {
return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <Link
         to="/customers"
         className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
       > <ArrowLeft size={16} strokeWidth={1.8} />
Retour aux clients </Link>

      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <span className="text-sm font-bold">!</span>
          </div>

          <div>
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>

            <p className="mt-1 text-xs text-red-600">
              Vérifiez votre connexion et réessayez.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

}

if (!customer) {
return null
}

const name = [
customer.first_name,
customer.last_name,
]
.filter(Boolean)
.join(' ')

const displayName =
name || customer.company_name || 'Client'

const isCompany = customer.customer_type === 'company'

return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6">
{/* ----------------------------------------------------------------- */}
{/* Navigation */}
{/* ----------------------------------------------------------------- */} <Link
       to="/customers"
       className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
     > <ArrowLeft size={16} strokeWidth={1.8} />
Retour aux clients </Link>

    {/* ----------------------------------------------------------------- */}
    {/* Header client */}
    {/* ----------------------------------------------------------------- */}
    <section className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <UsersRound size={25} strokeWidth={1.8} />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium text-blue-600">
              Gestion commerciale
            </p>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                customer.active
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  customer.active
                    ? 'bg-emerald-500'
                    : 'bg-slate-400'
                }`}
              />
              {customer.active ? 'Actif' : 'Inactif'}
            </span>
          </div>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {displayName}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {isCompany ? 'Entreprise' : 'Particulier'}
            {customer.company_name && name
              ? ` · ${customer.company_name}`
              : ''}
          </p>
        </div>
      </div>

      <Link
        to={`/customers/${id}/edit`}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      >
        <Pencil size={16} strokeWidth={1.8} />
        Modifier
      </Link>
    </section>

    {/* ----------------------------------------------------------------- */}
    {/* Informations principales */}
    {/* ----------------------------------------------------------------- */}
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <UsersRound size={17} strokeWidth={1.8} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Informations du client
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Coordonnées et informations commerciales
          </p>
        </div>
      </div>

      <div className="grid gap-px bg-slate-200 md:grid-cols-2">
        {/* Type */}
        <div className="bg-white p-6 transition hover:bg-blue-50/30">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              {isCompany ? (
                <Building2 size={17} strokeWidth={1.8} />
              ) : (
                <User size={17} strokeWidth={1.8} />
              )}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Type
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {isCompany ? 'Entreprise' : 'Particulier'}
              </p>
            </div>
          </div>
        </div>

        {/* Société */}
        <div className="bg-white p-6 transition hover:bg-blue-50/30">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Building2 size={17} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Société
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {customer.company_name || '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Prénom */}
        <div className="bg-white p-6 transition hover:bg-blue-50/30">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <User size={17} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Prénom
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {customer.first_name || '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Nom */}
        <div className="bg-white p-6 transition hover:bg-blue-50/30">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <User size={17} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Nom
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {customer.last_name || '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white p-6 transition hover:bg-blue-50/30">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Mail size={17} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Email
              </p>

              <p className="mt-1 break-all text-sm font-medium text-slate-900">
                {customer.email || '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Téléphone */}
        <div className="bg-white p-6 transition hover:bg-blue-50/30">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Phone size={17} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Téléphone
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {customer.phone || '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="bg-white p-6 transition hover:bg-blue-50/30">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Smartphone size={17} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Mobile
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {customer.mobile || '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Statut */}
        <div className="bg-white p-6 transition hover:bg-blue-50/30">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                customer.active
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              <CircleCheck size={17} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Statut
              </p>

              <p
                className={`mt-1 text-sm font-medium ${
                  customer.active
                    ? 'text-emerald-700'
                    : 'text-slate-600'
                }`}
              >
                {customer.active ? 'Client actif' : 'Client inactif'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ----------------------------------------------------------------- */}
    {/* Notes */}
    {/* ----------------------------------------------------------------- */}
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <StickyNote size={17} strokeWidth={1.8} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Notes
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Informations complémentaires sur le client
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-5">
          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {customer.notes || 'Aucune note enregistrée pour ce client.'}
          </p>
        </div>
      </div>
    </section>

    {/* ----------------------------------------------------------------- */}
    {/* Actions */}
    {/* ----------------------------------------------------------------- */}
    <div className="flex flex-col gap-3 border-t border-slate-200 pt-2 sm:flex-row sm:items-center sm:justify-between">
      <Link
        to="/customers"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
      >
        <ArrowLeft size={16} strokeWidth={1.8} />
        Retour à la liste des clients
      </Link>

      <Link
        to={`/customers/${id}/edit`}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
      >
        <Pencil size={16} strokeWidth={1.8} />
        Modifier le client
      </Link>
    </div>
  </div>
</div>

)
}
