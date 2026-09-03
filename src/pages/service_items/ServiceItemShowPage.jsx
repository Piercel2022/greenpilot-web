import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getServiceCategories } from '../../services/service_categories'
import { getServiceItem } from '../../services/service_items'

function ServiceItemShowPage() {
const { id } = useParams()

const [item, setItem] = useState(null)
const [category, setCategory] = useState(null)
const [loading, setLoading] = useState(true)
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

      const categories = Array.isArray(categoriesData)
        ? categoriesData
        : []

      const matchingCategory = categories.find(
        (currentCategory) =>
          currentCategory.id === itemData.service_category_id,
      )

      setCategory(matchingCategory || null)
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

const formatValue = (value, suffix = '') => {
if (value === null || value === undefined || value === '') {
return '—'
}


return `${value}${suffix}`


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

if (error && !item) {
return ( <div className="p-6"> <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
{error} </div>


    <Link
      to="/service-items"
      className="font-medium text-green-600 hover:underline"
    >
      Retour aux services
    </Link>
  </div>
)


}

if (!item) {
return null
}

return ( <div className="mx-auto max-w-5xl p-6"> <div className="mb-6 flex items-start justify-between gap-4"> <div> <p className="text-sm font-medium text-gray-500">
{item.code} </p>

      <h1 className="mt-1 text-2xl font-bold text-gray-900">
        {item.name}
      </h1>

      <p className="mt-1 text-sm text-gray-600">
        {category
          ? `${category.code} — ${category.name}`
          : 'Catégorie inconnue'}
      </p>
    </div>

    <Link
      to={`/service-items/${item.id}/edit`}
      className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white"
    >
      Modifier
    </Link>
  </div>

  {error && (
    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {error}
    </div>
  )}

  <div className="space-y-6">
    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Informations générales
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Code</p>
          <p className="mt-1 font-medium text-gray-900">
            {item.code}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Catégorie</p>
          <p className="mt-1 text-gray-900">
            {category
              ? `${category.code} — ${category.name}`
              : '—'}
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm text-gray-500">Description</p>
          <p className="mt-1 whitespace-pre-wrap text-gray-900">
            {item.description || '—'}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Unité</p>
          <p className="mt-1 text-gray-900">
            {item.unit || '—'}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Position</p>
          <p className="mt-1 text-gray-900">
            {formatValue(item.position)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Statut</p>
          <p className="mt-1">
            {item.active ? (
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                Actif
              </span>
            ) : (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                Inactif
              </span>
            )}
          </p>
        </div>
      </div>
    </section>

    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Tarification
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-gray-500">
            Quantité par défaut
          </p>
          <p className="mt-1 text-gray-900">
            {formatValue(item.default_quantity)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Prix unitaire par défaut
          </p>
          <p className="mt-1 text-gray-900">
            {formatValue(item.default_unit_price, ' €')}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Marge par défaut
          </p>
          <p className="mt-1 text-gray-900">
            {formatValue(item.default_margin_percentage, ' %')}
          </p>
        </div>
      </div>
    </section>

    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Structure des coûts
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm text-gray-500">Main-d'œuvre</p>
          <p className="mt-1 text-gray-900">
            {formatValue(item.labor_cost, ' €')}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Matériaux</p>
          <p className="mt-1 text-gray-900">
            {formatValue(item.material_cost, ' €')}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Équipement</p>
          <p className="mt-1 text-gray-900">
            {formatValue(item.equipment_cost, ' €')}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Frais généraux</p>
          <p className="mt-1 text-gray-900">
            {formatValue(item.overhead_cost, ' €')}
          </p>
        </div>
      </div>
    </section>

    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Planification
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">
            Durée estimée
          </p>
          <p className="mt-1 text-gray-900">
            {formatDuration(item.estimated_duration_minutes)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Position</p>
          <p className="mt-1 text-gray-900">
            {formatValue(item.position)}
          </p>
        </div>
      </div>
    </section>
  </div>

  <div className="mt-6">
    <Link
      to="/service-items"
      className="font-medium text-green-600 hover:underline"
    >
      ← Retour aux services
    </Link>
  </div>
</div>

)
}

export default ServiceItemShowPage
