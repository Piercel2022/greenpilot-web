import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-5xl"> <p className="text-sm text-slate-500">
Chargement des clients... </p> </div> </div>
)
}

return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <div> <Link
         to="/sites"
         className="text-sm font-medium text-slate-600 hover:text-slate-900"
       >
← Retour aux sites </Link>


      <p className="mt-4 text-sm font-medium text-slate-500">
        Gestion commerciale
      </p>

      <h1 className="mt-1 text-2xl font-semibold text-slate-900">
        Nouveau site
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Créez un nouveau site rattaché à un client.
      </p>
    </div>

    {error && (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    )}

    {customers.length === 0 && !error && (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Aucun client disponible. Créez d'abord un client avant de créer un site.
      </div>
    )}

    <SiteForm
      customers={customers}
      onSubmit={handleCreate}
      onCancel={() => navigate('/sites')}
      submitting={submitting}
    />
  </div>
</div>

)
}
