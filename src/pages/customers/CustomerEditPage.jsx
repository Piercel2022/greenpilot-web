import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-5xl"> <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm"> <p className="text-sm text-slate-500">
Chargement du client... </p> </div> </div> </div>
)
}

if (!customer) {
return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <Link
         to="/customers"
         className="text-sm font-medium text-slate-700 hover:text-slate-900"
       >
← Retour aux clients </Link>

      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-medium text-red-700">
          {error || 'Client introuvable.'}
        </p>
      </div>
    </div>
  </div>
)

}

return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <div>
<Link
to={`/customers/${id}`}
className="text-sm font-medium text-slate-700 hover:text-slate-900"
>
← Retour à la fiche client </Link>

      <p className="mt-6 text-sm font-medium text-slate-500">
        Gestion commerciale
      </p>

      <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        Modifier le client
      </h1>

      <p className="mt-2 text-sm text-slate-600">
        Modifiez les informations du client.
      </p>
    </div>

    {error && (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-medium text-red-700">
          {error}
        </p>
      </div>
    )}

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
)
}
