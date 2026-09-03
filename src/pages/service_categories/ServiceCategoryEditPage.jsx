import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
getServiceCategory,
updateServiceCategory,
} from '../../services/service_categories'
import ServiceCategoryForm from './ServiceCategoryForm'

export default function ServiceCategoryEditPage() {
const { id } = useParams()
const navigate = useNavigate()

const [category, setCategory] = useState(null)
const [loading, setLoading] = useState(true)
const [submitting, setSubmitting] = useState(false)
const [error, setError] = useState('')

useEffect(() => {
let cancelled = false


async function fetchCategory() {
  try {
    const data = await getServiceCategory(id)

    if (cancelled) {
      return
    }

    setCategory(data)
    setError('')
  } catch (err) {
    console.error(err)

    if (!cancelled) {
      setError('Impossible de charger cette catégorie de service.')
    }
  } finally {
    if (!cancelled) {
      setLoading(false)
    }
  }
}

fetchCategory()

return () => {
  cancelled = true
}

}, [id])

async function handleSubmit(serviceCategory) {
try {
setSubmitting(true)
setError('')

  const updatedCategory = await updateServiceCategory(id, serviceCategory)

  navigate(`/service-categories/${updatedCategory.id}`)
} catch (err) {
  console.error(err)
  setError('Impossible de modifier cette catégorie de service.')
  setSubmitting(false)
}

}

function handleCancel() {
navigate(`/service-categories/${id}`)
}

if (loading) {
return ( <div className="p-6"> <p className="text-gray-600">Chargement de la catégorie...</p> </div>
)
}

if (!category) {
return ( <div className="mx-auto max-w-4xl p-6"> <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
{error || 'Catégorie de service introuvable.'} </div>


    <button
      type="button"
      onClick={() => navigate('/service-categories')}
      className="font-medium text-blue-600 hover:text-blue-800"
    >
      Retour aux catégories
    </button>
  </div>
)


}

return ( <div className="mx-auto max-w-4xl p-6"> <div className="mb-6"> <h1 className="text-2xl font-bold text-gray-900">
Modifier la catégorie </h1>


    <p className="mt-1 text-sm text-gray-600">
      Modifiez les informations de {category.name}.
    </p>
  </div>

  {error && (
    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {error}
    </div>
  )}

  <ServiceCategoryForm
    initialValues={category}
    onSubmit={handleSubmit}
    onCancel={handleCancel}
    submitting={submitting}
    submitLabel="Enregistrer les modifications"
  />
</div>

)
}
