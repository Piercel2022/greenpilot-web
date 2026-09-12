import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
AlertCircle,
ArrowLeft,
CheckCircle2,
UserPlus,
Users,
} from 'lucide-react'
import CustomerForm from './CustomerForm'
import { createCustomer } from '../../services/customers'

export default function CustomerFormPage() {
const navigate = useNavigate()

const [error, setError] = useState('')
const [submitting, setSubmitting] = useState(false)

async function handleCreate(customer) {
try {
setSubmitting(true)
setError('')

  const createdCustomer = await createCustomer(customer)

  navigate(`/customers/${createdCustomer.id}`)
} catch (requestError) {
  const messages = requestError.response?.data?.messages

  if (Array.isArray(messages) && messages.length > 0) {
    setError(messages.join(' '))
  } else {
    setError('Impossible de créer le client.')
  }
} finally {
  setSubmitting(false)
}

}

return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <div>
<button
type="button"
onClick={() => navigate('/customers')}
className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
> <ArrowLeft className="h-4 w-4" />
Retour aux clients </button>

      <div className="mt-6 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
          <UserPlus className="h-5 w-5" />
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
            <Users className="h-4 w-4" />
            Gestion commerciale
          </div>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Nouveau client
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Enregistrez un nouveau client afin de centraliser ses
            informations et préparer vos prochaines opérations.
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
              Création impossible
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
          <UserPlus className="h-4 w-4" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Informations du client
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Renseignez les informations nécessaires pour créer la fiche
            client.
          </p>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <CustomerForm
          onSubmit={handleCreate}
          onCancel={() => navigate('/customers')}
          submitting={submitting}
        />
      </div>
    </div>

    <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

      <div>
        <p className="text-sm font-medium text-emerald-900">
          Une fiche client centralisée
        </p>

        <p className="mt-1 text-xs leading-5 text-emerald-700">
          Le client pourra ensuite être associé à ses sites, devis,
          chantiers, factures et rapports dans GreenPilot.
        </p>
      </div>
    </div>
  </div>
</div>

)
}
