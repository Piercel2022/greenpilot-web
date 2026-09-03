import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
deleteServiceCategory,
getServiceCategories,
} from '../../services/service_categories'

export default function ServiceCategoriesPage() {
const [categories, setCategories] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

useEffect(() => {
let cancelled = false

async function fetchCategories() {
  try {
    const data = await getServiceCategories()

    if (cancelled) {
      return
    }

    setCategories(data)
    setError('')
  } catch (err) {
    console.error(err)

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

async function handleDelete(id) {
if (!window.confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
return
}

try {
  await deleteServiceCategory(id)

  setCategories((current) =>
    current.filter((category) => category.id !== id),
  )
} catch (err) {
  console.error(err)
  setError('Impossible de supprimer cette catégorie.')
}

}

if (loading) {
return ( <div className="p-6"> <p className="text-gray-600">Chargement des catégories...</p> </div>
)
}

return ( <div className="mx-auto max-w-6xl p-6"> <div className="mb-6 flex items-center justify-between"> <div> <h1 className="text-2xl font-bold text-gray-900">
Catégories de services </h1> <p className="mt-1 text-sm text-gray-600">
Gérez les catégories utilisées pour organiser vos services. </p> </div>

    <Link
      to="/service-categories/new"
      className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
    >
      Nouvelle catégorie
    </Link>
  </div>

  {error && (
    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {error}
    </div>
  )}

  {categories.length === 0 ? (
    <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
      <p className="text-gray-600">
        Aucune catégorie de service pour le moment.
      </p>
    </div>
  ) : (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Position
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Nom
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Statut
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                  {category.position ?? '—'}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                  {category.code}
                </td>

                <td className="px-4 py-3 text-sm text-gray-900">
                  {category.name}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {category.category_type || '—'}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  {category.active ? (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                  <div className="flex justify-end gap-3">
                    <Link
                      to={`/service-categories/${category.id}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      Voir
                    </Link>

                    <Link
                      to={`/service-categories/${category.id}/edit`}
                      className="font-medium text-green-600 hover:text-green-800"
                    >
                      Modifier
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(category.id)}
                      className="font-medium text-red-600 hover:text-red-800"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>

)
}
