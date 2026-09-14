import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
AlertCircle,
ArrowLeft,
FilePlus2,
FileText,
Loader2,
ReceiptText,
Users,
} from 'lucide-react'
import QuoteForm from './QuoteForm'
import { createQuote } from '../../services/quotes'
import { getCustomers } from '../../services/customers'
import { getSites } from '../../services/sites'

export default function QuoteFormPage() {
const navigate = useNavigate()

const [customers, setCustomers] = useState([])
const [sites, setSites] = useState([])
const [loading, setLoading] = useState(true)
const [submitting, setSubmitting] = useState(false)
const [error, setError] = useState('')

useEffect(() => {
let active = true

const loadData = async () => {
  try {
    setLoading(true)
    setError('')

    const [customersData, sitesData] = await Promise.all([
      getCustomers(),
      getSites(),
    ])

    if (!active) return

    setCustomers(Array.isArray(customersData) ? customersData : [])
    setSites(Array.isArray(sitesData) ? sitesData : [])
  } catch {
    if (active) {
      setError(
        'Impossible de charger les données nécessaires au devis.',
      )
    }
  } finally {
    if (active) {
      setLoading(false)
    }
  }
}

loadData()

return () => {
  active = false
}

}, [])

const handleCreate = async (quote) => {
try {
setSubmitting(true)
setError('')

  const createdQuote = await createQuote(quote)

  navigate(`/quotes/${createdQuote.id}`)
} catch (requestError) {
  const messages = requestError.response?.data?.messages

  if (Array.isArray(messages) && messages.length > 0) {
    setError(messages.join(', '))
  } else {
    setError('Impossible de créer le devis.')
  }
} finally {
  setSubmitting(false)
}

}

if (loading) {
return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl"> <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"> <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12"> <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600"> <Loader2 className="h-6 w-6 animate-spin" /> </div>

          <p className="mt-4 text-sm font-medium text-slate-700">
            Chargement...
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Préparation des données nécessaires au devis
          </p>
        </div>
      </div>
    </div>
  </div>
)

}

return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <div>
<button
type="button"
onClick={() => navigate('/quotes')}
className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-violet-600"
> <ArrowLeft className="h-4 w-4" />
Retour aux devis </button>
      <div className="mt-6 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
          <FilePlus2 className="h-5 w-5" />
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-violet-600">
            <ReceiptText className="h-4 w-4" />
            Gestion commerciale
          </div>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Nouveau devis
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Créez une nouvelle proposition commerciale en associant un
            client et un site d&apos;intervention.
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
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
          <FileText className="h-4 w-4" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Informations du devis
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Renseignez les éléments commerciaux et financiers de votre
            proposition.
          </p>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <QuoteForm
          customers={customers}
          sites={sites}
          onSubmit={handleCreate}
          onCancel={() => navigate('/quotes')}
          submitting={submitting}
          submitLabel="Créer le devis"
        />
      </div>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex items-start gap-3 rounded-xl border border-violet-100 bg-violet-50/60 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
          <Users className="h-4 w-4" />
        </div>

        <div>
          <p className="text-sm font-medium text-violet-900">
            Client et site
          </p>

          <p className="mt-1 text-xs leading-5 text-violet-700">
            Associez le devis au bon client et au lieu d&apos;intervention
            pour conserver un historique commercial cohérent.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          <ReceiptText className="h-4 w-4" />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">
            Suivi commercial
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Le devis créé sera immédiatement disponible pour être
            consulté, modifié et suivi depuis votre espace commercial.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

)
}
