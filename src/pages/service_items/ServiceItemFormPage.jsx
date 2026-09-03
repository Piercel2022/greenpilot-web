import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getServiceCategories } from '../../services/service_categories'
import { createServiceItem } from '../../services/service_items'
import ServiceItemForm from './ServiceItemForm'

function ServiceItemFormPage() {
const navigate = useNavigate()
const [categories, setCategories] = useState([])
const [loading, setLoading] = useState(true)
const [submitting, setSubmitting] = useState(false)
const [error, setError] = useState('')

useEffect(() => {
let cancelled = false


const fetchCategories = async () => {
  try {
    const data = await getServiceCategories()

    if (!cancelled) {
      setCategories(Array.isArray(data) ? data : [])
    }
  } catch {
    if (!cancelled) {
      setError('Impossible de charger les catégories de services.')
    }
  } finally {
    if (!cancelled) {
      setLoading(false)
    }
  }
}

fetchCategories()

return () => {
  cancelled = true
}


}, [])

const handleSubmit = async (serviceItem) => {
setSubmitting(true)
setError('')


try {
  await createServiceItem(serviceItem)
  navigate('/service-items')
} catch (submitError) {
  setError(
    submitError.response?.data?.errors?.join(', ') ||
      submitError.response?.data?.error ||
      'Impossible de créer le service.',
  )
  throw submitError
} finally {
  setSubmitting(false)
}


}

if (loading) {
return ( <div className="p-6"> <p className="text-gray-600">Chargement...</p> </div>
)
}

return ( <div className="mx-auto max-w-5xl p-6"> <div className="mb-6"> <h1 className="text-2xl font-bold text-gray-900">
Nouveau service </h1> <p className="mt-1 text-sm text-gray-600">
Créez un service utilisable dans vos devis et factures. </p> </div>

  {error && (
    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {error}
    </div>
  )}

  <ServiceItemForm
    categories={categories}
    onSubmit={handleSubmit}
    onCancel={() => navigate('/service-items')}
    submitting={submitting}
    submitLabel="Créer le service"
  />
</div>

)
}

export default ServiceItemFormPage
