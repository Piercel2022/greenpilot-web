import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SiteForm from './SiteForm'
import { getSite, updateSite } from '../../services/sites'
import { getCustomers } from '../../services/customers'

export default function SiteEditPage() {
const { id } = useParams()
const navigate = useNavigate()

const [site, setSite] = useState(null)
const [customers, setCustomers] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [submitting, setSubmitting] = useState(false)

useEffect(() => {
let active = true


async function loadData() {
  try {
    setLoading(true)
    setError('')

    const [siteData, customersData] = await Promise.all([
      getSite(id),
      getCustomers(),
    ])

    if (active) {
      setSite(siteData)
      setCustomers(customersData)
    }
  } catch {
    if (active) {
      setSite(null)
      setCustomers([])
      setError('Impossible de charger le site.')
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

}, [id])

async function handleUpdate(updatedSite) {
try {
setSubmitting(true)
setError('')

  await updateSite(id, updatedSite)

  navigate(`/sites/${id}`)
} catch (requestError) {
  const messages = requestError.response?.data?.messages

  if (Array.isArray(messages) && messages.length > 0) {
    setError(messages.join(' '))
  } else {
    setError('Impossible de modifier le site.')
  }
} finally {
  setSubmitting(false)
}

}

if (loading) {
return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-5xl"> <p className="text-sm text-slate-500">
Chargement du site... </p> </div> </div>
)
}

if (!site) {
return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-4"> <Link
         to="/sites"
         className="text-sm font-medium text-slate-600 hover:text-slate-900"
       >
← Retour aux sites </Link>

      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error || 'Site introuvable.'}
      </div>
    </div>
  </div>
)


}

return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <div>
<Link
to={`/sites/${id}`}
className="text-sm font-medium text-slate-600 hover:text-slate-900"
>
← Retour à la fiche du site </Link>

      <p className="mt-4 text-sm font-medium text-slate-500">
        Gestion commerciale
      </p>

      <h1 className="mt-1 text-2xl font-semibold text-slate-900">
        Modifier le site
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Modifiez les informations du site.
      </p>
    </div>

    {error && (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    )}

    <SiteForm
      key={id}
      customers={customers}
      initialValues={site}
      onSubmit={handleUpdate}
      onCancel={() => navigate(`/sites/${id}`)}
      submitting={submitting}
      submitLabel="Enregistrer les modifications"
    />
  </div>
</div>


)
}
