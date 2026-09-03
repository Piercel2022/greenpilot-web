import { useNavigate } from 'react-router-dom'
import { createServiceCategory } from '../../services/service_categories'
import ServiceCategoryForm from './ServiceCategoryForm'

export default function ServiceCategoryFormPage() {
const navigate = useNavigate()

async function handleSubmit(serviceCategory) {
try {
const createdCategory = await createServiceCategory(serviceCategory)
navigate(`/service-categories/${createdCategory.id}`)
} catch (error) {
console.error(error)
}
}

function handleCancel() {
navigate('/service-categories')
}

return ( <div className="mx-auto max-w-4xl p-6"> <div className="mb-6"> <h1 className="text-2xl font-bold text-gray-900">
Nouvelle catégorie de service </h1> <p className="mt-1 text-sm text-gray-600">
Créez une nouvelle catégorie de services. </p> </div>

  <ServiceCategoryForm
    onSubmit={handleSubmit}
    onCancel={handleCancel}
    submitLabel="Créer la catégorie"
  />
</div>

)
}
