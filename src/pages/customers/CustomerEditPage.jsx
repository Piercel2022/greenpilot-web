import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
AlertCircle,
ArrowLeft,
CheckCircle2,
Loader2,
Pencil,
Users,
} from 'lucide-react'
import CustomerForm from './CustomerForm'
import { getCustomer, updateCustomer } from '../../services/customers'

export default function CustomerEditPage() {
const { id } = useParams()
const navigate = useNavigate()

const [customer, setCustomer] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [submitting, setSubmitting] = useState(false)

useEffect(() => {
let active = true

async function loadCustomer() {
  try {
    setLoading(true)
    setError('')

    const data = await getCustomer(id)

    if (active) {
      setCustomer(data)
    }
  } catch {
    if (active) {
      setCustomer(null)
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

async function handleUpdate(updatedCustomer) {
try {
setSubmitting(true)
setError('')

  await updateCustomer(id, updatedCustomer)

  navigate(`/customers/${id}`)
} catch (requestError) {
  const messages = requestError.response?.data?.messages

  if (Array.isArray(messages) && messages.length > 0) {
    setError(messages.join(' '))
  } else {
    setError('Impossible de modifier le client.')
  }
} finally {
  setSubmitting(false)
}

}

if (loading) {
return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl"> <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"> <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12"> <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"> <Loader2 className="h-6 w-6 animate-spin" /> </div>

          <p className="mt-4 text-sm font-medium text-slate-700">
            Chargement du client...
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Préparation de la fiche de modification
          </p>
        </div>
      </div>
    </div>
  </div>
)

}

if (!customer) {
return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <Link
         to="/customers"
         className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
       > <ArrowLeft className="h-4 w-4" />
Retour aux clients </Link>

      <div className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm">
        <div className="flex items-start gap-4 border-l-4 border-red-500 bg-red-50 p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <AlertCircle className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-red-900">
              Client indisponible
            </h2>

            <p className="mt-1 text-sm leading-6 text-red-700">
              {error || 'Client introuvable.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

}

return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <div>
<Link
to={`/customers/${id}`}
className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
> <ArrowLeft className="h-4 w-4" />
Retour à la fiche client </Link>

      <div className="mt-6 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
          <Pencil className="h-5 w-5" />
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
            <Users className="h-4 w-4" />
            Gestion commerciale
          </div>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Modifier le client
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Mettez à jour les informations de ce client afin de conserver
            une fiche commerciale complète et fiable.
          </p>
        </div>
      </div>
    </div>

    {error && (
      <div className="overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
        <div className="flex items-start gap-3 border-l-4 border-red-500 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="text-sm font-semibold text-red-800">
              Modification impossible
            </p>

            <p className="mt-1 text-sm leading-5 text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    )}

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Pencil className="h-4 w-4" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Informations du client
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Modifiez les informations nécessaires puis enregistrez vos
            changements.
          </p>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <CustomerForm
          key={id}
          initialValues={customer}
          onSubmit={handleUpdate}
          onCancel={() => navigate(`/customers/${id}`)}
          submitting={submitting}
          submitLabel="Enregistrer les modifications"
        />
      </div>
    </div>

    <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

      <div>
        <p className="text-sm font-medium text-emerald-900">
          Données commerciales
        </p>

        <p className="mt-1 text-xs leading-5 text-emerald-700">
          Les informations enregistrées seront utilisées dans les devis,
          chantiers, factures et autres opérations liées à ce client.
        </p>
      </div>
    </div>
  </div>
</div>

)
}
