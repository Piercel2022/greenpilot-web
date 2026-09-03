import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    const [customersData, sitesData] = await Promise.all([
      getCustomers(),
      getSites(),
    ])

    if (!active) return

    setCustomers(Array.isArray(customersData) ? customersData : [])
    setSites(Array.isArray(sitesData) ? sitesData : [])
  } catch {
    if (active) {
      setError('Impossible de charger les données nécessaires au devis.')
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
setSubmitting(true)
setError('')


try {
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
return <p>Chargement...</p>
}

return ( <div> <h1>Nouveau devis</h1>


  {error && <p>{error}</p>}

  <QuoteForm
    customers={customers}
    sites={sites}
    onSubmit={handleCreate}
    onCancel={() => navigate('/quotes')}
    submitting={submitting}
    submitLabel="Créer le devis"
  />
</div>


)
}
