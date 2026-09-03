import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getServiceCategories } from '../../services/service_categories'
import {
getServiceItem,
updateServiceItem,
} from '../../services/service_items'
import ServiceItemForm from './ServiceItemForm'

function ServiceItemEditPage() {
const { id } = useParams()
const navigate = useNavigate()

const [item, setItem] = useState(null)
const [categories, setCategories] = useState([])
const [loading, setLoading] = useState(true)
const [submitting, setSubmitting] = useState(false)
const [error, setError] = useState('')

useEffect(() => {
let cancelled = false


const fetchData = async () => {
  try {
    const [itemData, categoriesData] = await Promise.all([
      getServiceItem(id),
      getServiceCategories(),
    ])

    if (!cancelled) {
      setItem(itemData)
      setCategories(
        Array.isArray(categoriesData) ? categoriesData : [],
      )
    }
  } catch (loadError) {
    if (!cancelled) {
      setError(
        loadError.response?.data?.error ||
          'Impossible de charger le service.',
      )
    }
  } finally {
    if (!cancelled) {
      setLoading(false)
    }
  }
}

fetchData()

return () => {
  cancelled = true
}


}, [id])

const handleSubmit = async (serviceItem) => {
setSubmitting(true)
setError('')

try {
  await updateServiceItem(id, serviceItem)
  navigate(`/service-items/${id}`)
} catch (submitError) {
  setError(
    submitError.response?.data?.errors?.join(', ') ||
      submitError.response?.data?.error ||
      'Impossible de modifier le service.',
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

if (error && !item) {
return ( <div className="p-6"> <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
{error} </div> </div>
)
}

if (!item) {
return null
}

return ( <div className="mx-auto max-w-5xl p-6"> <div className="mb-6"> <h1 className="text-2xl font-bold text-gray-900">
Modifier le service </h1>


    <p className="mt-1 text-sm text-gray-600">
      Modifiez les informations de {item.code} — {item.name}.
    </p>
  </div>

  {error && (
    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {error}
    </div>
  )}

  <ServiceItemForm
    initialValues={item}
    categories={categories}
    onSubmit={handleSubmit}
    onCancel={() => navigate(`/service-items/${id}`)}
    submitting={submitting}
    submitLabel="Enregistrer les modifications"
  />
</div>

)
}

export default ServiceItemEditPage
