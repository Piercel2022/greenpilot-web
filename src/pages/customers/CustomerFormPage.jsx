import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <div> <p className="text-sm font-medium text-slate-500">
Gestion commerciale </p>

      <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        Nouveau client
      </h1>

      <p className="mt-2 text-sm text-slate-600">
        Enregistrez un nouveau client dans votre organisation.
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
      onSubmit={handleCreate}
      onCancel={() => navigate('/customers')}
      submitting={submitting}
    />
  </div>
</div>

)
}
