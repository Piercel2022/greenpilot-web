import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getServiceCategories } from '../../services/service_categories'
import {
deleteServiceItem,
getServiceItems,
} from '../../services/service_items'

function ServiceItemsPage() {
const [items, setItems] = useState([])
const [categories, setCategories] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [deletingId, setDeletingId] = useState(null)

useEffect(() => {
let cancelled = false


const fetchData = async () => {
  try {
    const [itemsData, categoriesData] = await Promise.all([
      getServiceItems(),
      getServiceCategories(),
    ])

    if (!cancelled) {
      setItems(Array.isArray(itemsData) ? itemsData : [])
      setCategories(Array.isArray(categoriesData) ? categoriesData : [])
    }
  } catch {
    if (!cancelled) {
      setError('Impossible de charger les services.')
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


}, [])

const categoryById = categories.reduce((result, category) => {
result[category.id] = category
return result
}, {})

const handleDelete = async (id) => {
if (!window.confirm('Voulez-vous vraiment supprimer ce service ?')) {
return
}


setDeletingId(id)
setError('')

try {
  await deleteServiceItem(id)
  setItems((current) => current.filter((item) => item.id !== id))
} catch (deleteError) {
  setError(
    deleteError.response?.data?.error ||
      'Impossible de supprimer le service.',
  )
} finally {
  setDeletingId(null)
}


}

const formatPrice = (value) => {
if (value === null || value === undefined || value === '') {
return '—'
}


return `${Number(value).toFixed(2)} €`

}

const formatDuration = (minutes) => {
if (minutes === null || minutes === undefined || minutes === '') {
return '—'
}

const value = Number(minutes)

if (value < 60) {
  return `${value} min`
}

const hours = Math.floor(value / 60)
const remainingMinutes = value % 60

return remainingMinutes
  ? `${hours} h ${remainingMinutes} min`
  : `${hours} h`

}

if (loading) {
return ( <div className="p-6"> <p className="text-gray-600">Chargement...</p> </div>
)
}

return ( <div className="p-6"> <div className="mb-6 flex items-center justify-between gap-4"> <div> <h1 className="text-2xl font-bold text-gray-900">
Services </h1> <p className="mt-1 text-sm text-gray-600">
Gérez votre catalogue de services. </p> </div>

    <Link
      to="/service-items/new"
      className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white"
    >
      Nouveau service
    </Link>
  </div>

  {error && (
    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {error}
    </div>
  )}

  {items.length === 0 ? (
    <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
      <p className="text-gray-600">Aucun service enregistré.</p>
      <Link
        to="/service-items/new"
        className="mt-4 inline-block font-medium text-green-600"
      >
        Créer le premier service
      </Link>
    </div>
  ) : (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
              Code
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
              Nom
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
              Catégorie
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
              Prix
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
              Durée
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
              Unité
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
              Statut
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {items.map((item) => {
            const category = categoryById[item.service_category_id]

            return (
              <tr key={item.id}>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                  {item.code}
                </td>

                <td className="px-4 py-3">
                  <Link
                    to={`/service-items/${item.id}`}
                    className="font-medium text-green-600 hover:underline"
                  >
                    {item.name}
                  </Link>
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {category
                    ? `${category.code} — ${category.name}`
                    : '—'}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-right text-gray-700">
                  {formatPrice(item.default_unit_price)}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-right text-gray-700">
                  {formatDuration(item.estimated_duration_minutes)}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {item.unit || '—'}
                </td>

                <td className="whitespace-nowrap px-4 py-3">
                  {item.active ? (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Actif
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      Inactif
                    </span>
                  )}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      to={`/service-items/${item.id}`}
                      className="text-sm font-medium text-gray-700 hover:underline"
                    >
                      Voir
                    </Link>

                    <Link
                      to={`/service-items/${item.id}/edit`}
                      className="text-sm font-medium text-green-600 hover:underline"
                    >
                      Modifier
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
                    >
                      {deletingId === item.id
                        ? 'Suppression...'
                        : 'Supprimer'}
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )}
</div>

)
}

export default ServiceItemsPage
