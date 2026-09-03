import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getServiceCategory } from '../../services/service_categories'

export default function ServiceCategoryShowPage() {
const { id } = useParams()
const [category, setCategory] = useState(null)
const [loading, setLoading] = useState(true)
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

if (loading) {
return ( <div className="p-6"> <p className="text-gray-600">Chargement de la catégorie...</p> </div>
)
}

if (error || !category) {
return ( <div className="mx-auto max-w-4xl p-6"> <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
{error || 'Catégorie de service introuvable.'} </div>

    <Link
      to="/service-categories"
      className="font-medium text-blue-600 hover:text-blue-800"
    >
      Retour aux catégories
    </Link>
  </div>
)


}

return ( <div className="mx-auto max-w-4xl p-6"> <div className="mb-6 flex items-start justify-between gap-4"> <div> <p className="text-sm font-medium text-gray-500">
{category.code} </p>

      <h1 className="mt-1 text-2xl font-bold text-gray-900">
        {category.name}
      </h1>
    </div>

    <div className="flex gap-3">
      <Link
        to="/service-categories"
        className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
      >
        Retour
      </Link>

      <Link
        to={`/service-categories/${category.id}/edit`}
        className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
      >
        Modifier
      </Link>
    </div>
  </div>

  <div className="rounded-lg border border-gray-200 bg-white">
    <dl className="divide-y divide-gray-200">
      <div className="grid gap-2 px-6 py-4 md:grid-cols-3">
        <dt className="text-sm font-medium text-gray-500">Code</dt>
        <dd className="text-sm text-gray-900 md:col-span-2">
          {category.code}
        </dd>
      </div>

      <div className="grid gap-2 px-6 py-4 md:grid-cols-3">
        <dt className="text-sm font-medium text-gray-500">Nom</dt>
        <dd className="text-sm text-gray-900 md:col-span-2">
          {category.name}
        </dd>
      </div>

      <div className="grid gap-2 px-6 py-4 md:grid-cols-3">
        <dt className="text-sm font-medium text-gray-500">
          Description
        </dt>
        <dd className="whitespace-pre-wrap text-sm text-gray-900 md:col-span-2">
          {category.description || '—'}
        </dd>
      </div>

      <div className="grid gap-2 px-6 py-4 md:grid-cols-3">
        <dt className="text-sm font-medium text-gray-500">
          Type de catégorie
        </dt>
        <dd className="text-sm text-gray-900 md:col-span-2">
          {category.category_type || '—'}
        </dd>
      </div>

      <div className="grid gap-2 px-6 py-4 md:grid-cols-3">
        <dt className="text-sm font-medium text-gray-500">Position</dt>
        <dd className="text-sm text-gray-900 md:col-span-2">
          {category.position ?? '—'}
        </dd>
      </div>

      <div className="grid gap-2 px-6 py-4 md:grid-cols-3">
        <dt className="text-sm font-medium text-gray-500">Statut</dt>
        <dd className="text-sm md:col-span-2">
          {category.active ? (
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
              Active
            </span>
          ) : (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
              Inactive
            </span>
          )}
        </dd>
      </div>
    </dl>
  </div>
</div>


)
}
