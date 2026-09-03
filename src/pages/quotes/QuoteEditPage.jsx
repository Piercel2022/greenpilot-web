import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import QuoteForm from './QuoteForm'
import { getQuote, updateQuote } from '../../services/quotes'
import { getCustomers } from '../../services/customers'
import { getSites } from '../../services/sites'

export default function QuoteEditPage() {
const { id } = useParams()
const navigate = useNavigate()

const [quote, setQuote] = useState(null)
const [customers, setCustomers] = useState([])
const [sites, setSites] = useState([])
const [loading, setLoading] = useState(true)
const [submitting, setSubmitting] = useState(false)
const [error, setError] = useState('')

useEffect(() => {
let active = true

async function loadData() {
  try {
    setLoading(true)
    setError('')

    const [quoteData, customersData, sitesData] = await Promise.all([
      getQuote(id),
      getCustomers(),
      getSites(),
    ])

    if (!active) return

    setQuote(quoteData)
    setCustomers(
      Array.isArray(customersData) ? customersData : [],
    )
    setSites(Array.isArray(sitesData) ? sitesData : [])
  } catch {
    if (active) {
      setError('Impossible de charger le devis.')
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

const handleUpdate = async (updatedQuote) => {
setSubmitting(true)
setError('')

try {
  await updateQuote(id, updatedQuote)
  navigate('/quotes')
} catch (requestError) {
  const messages = requestError.response?.data?.messages

  if (Array.isArray(messages) && messages.length > 0) {
    setError(messages.join(', '))
  } else {
    setError('Impossible de modifier le devis.')
  }
} finally {
  setSubmitting(false)
}

}

if (loading) {
return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-7xl"> <p className="text-sm text-slate-500">
Chargement du devis... </p> </div> </div>
)
}

if (!quote) {
return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-7xl space-y-4"> <h1 className="text-2xl font-bold text-slate-900">
Devis introuvable </h1>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={() => navigate('/quotes')}
        className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white"
      >
        Retour aux devis
      </button>
    </div>
  </div>
)

}

return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-7xl space-y-6"> <div> <p className="text-sm font-medium text-slate-500">
Gestion commerciale </p>

      <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        Modifier le devis
      </h1>

      <p className="mt-2 text-sm text-slate-600">
        Modifiez les informations du devis puis enregistrez les changements.
      </p>
    </div>

    {error && (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-medium text-red-700">
          {error}
        </p>
      </div>
    )}

    <QuoteForm
      customers={customers}
      sites={sites}
      initialValues={quote}
      onSubmit={handleUpdate}
      onCancel={() => navigate('/quotes')}
      submitting={submitting}
      submitLabel="Enregistrer les modifications"
    />
  </div>
</div>

)
}
