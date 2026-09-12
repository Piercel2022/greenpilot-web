import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
AlertCircle,
ArrowLeft,
CheckCircle2,
Loader2,
MapPin,
MapPinPlus,
Users,
} from 'lucide-react'
import SiteForm from './SiteForm'
import { createSite } from '../../services/sites'
import { getCustomers } from '../../services/customers'

export default function SiteFormPage() {
const navigate = useNavigate()

const [customers, setCustomers] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [submitting, setSubmitting] = useState(false)

useEffect(() => {
let active = true

async function loadCustomers() {
  try {
    setLoading(true)
    setError('')

    const data = await getCustomers()

    if (active) {
      setCustomers(data)
    }
  } catch {
    if (active) {
      setCustomers([])
      setError('Impossible de charger les clients.')
    }
  } finally {
    if (active) {
      setLoading(false)
    }
  }
}

loadCustomers()

return () => {
  active = false
}

}, [])

async function handleCreate(site) {
try {
setSubmitting(true)
setError('')

  const createdSite = await createSite(site)

  navigate(`/sites/${createdSite.id}`)
} catch (requestError) {
  const messages = requestError.response?.data?.messages

  if (Array.isArray(messages) && messages.length > 0) {
    setError(messages.join(' '))
  } else {
    setError('Impossible de créer le site.')
  }
} finally {
  setSubmitting(false)
}

}

if (loading) {
return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl"> <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"> <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12"> <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600"> <Loader2 className="h-6 w-6 animate-spin" /> </div>

          <p className="mt-4 text-sm font-medium text-slate-700">
            Chargement des clients...
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Préparation du formulaire de création
          </p>
        </div>
      </div>
    </div>
  </div>
)

}

return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <div> <Link
         to="/sites"
         className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-sky-600"
       > <ArrowLeft className="h-4 w-4" />
Retour aux sites </Link>

      <div className="mt-6 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
          <MapPinPlus className="h-5 w-5" />
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-sky-600">
            <MapPin className="h-4 w-4" />
            Gestion des sites
          </div>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Nouveau site
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Créez un nouveau lieu d'intervention et rattachez-le à l'un
            de vos clients.
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
              Opération impossible
            </p>

            <p className="mt-1 text-sm leading-5 text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    )}

    {customers.length === 0 && !error && (
      <div className="overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm">
        <div className="flex items-start gap-3 border-l-4 border-amber-400 bg-amber-50 p-4">
          <Users className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

          <div>
            <p className="text-sm font-semibold text-amber-900">
              Aucun client disponible
            </p>

            <p className="mt-1 text-sm leading-5 text-amber-800">
              Créez d'abord un client avant de pouvoir lui rattacher un
              site.
            </p>

            <Link
              to="/customers/new"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-900 transition hover:text-amber-700"
            >
              <Users className="h-4 w-4" />
              Créer un client
            </Link>
          </div>
        </div>
      </div>
    )}

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
          <MapPinPlus className="h-4 w-4" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Informations du site
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Renseignez les informations du lieu d'intervention.
          </p>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <SiteForm
          customers={customers}
          onSubmit={handleCreate}
          onCancel={() => navigate('/sites')}
          submitting={submitting}
        />
      </div>
    </div>

    <div className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/60 p-4">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />

      <div>
        <p className="text-sm font-medium text-sky-900">
          Un site au cœur de GreenPilot
        </p>

        <p className="mt-1 text-xs leading-5 text-sky-700">
          Une fois créé, ce site pourra être utilisé dans les devis,
          chantiers, interventions, rapports et opérations terrain du
          client.
        </p>
      </div>
    </div>
  </div>
</div>

)
}
