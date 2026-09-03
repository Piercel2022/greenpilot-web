import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCustomers } from '../../services/customers'

export default function CustomersPage() {
const [customers, setCustomers] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

useEffect(() => {
let active = true

async function load() {
  try {
    setError('')

    const data = await getCustomers()

    if (active) {
      setCustomers(Array.isArray(data) ? data : [])
    }
  } catch {
    if (active) {
      setError('Impossible de charger les clients.')
    }
  } finally {
    if (active) {
      setLoading(false)
    }
  }
}

load()

return () => {
  active = false
}

}, [])

return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-7xl space-y-6"> <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <p className="text-sm font-medium text-slate-500">
Gestion commerciale </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Clients
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Consultez et gérez les clients de votre organisation.
        </p>
      </div>

      <Link
        to="/customers/new"
        className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Nouveau client
      </Link>
    </div>

    {error && (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-medium text-red-700">
          {error}
        </p>
      </div>
    )}

    {loading && (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-slate-500">
          Chargement des clients...
        </p>
      </div>
    )}

    {!loading && !error && customers.length === 0 && (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h2 className="text-base font-semibold text-slate-900">
          Aucun client
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Aucun client n&apos;est actuellement enregistré dans votre
          organisation.
        </p>
      </div>
    )}

    {!loading && !error && customers.length > 0 && (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Client
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </th>

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {customers.map((customer) => {
                const name = [
                  customer.first_name,
                  customer.last_name,
                ]
                  .filter(Boolean)
                  .join(' ')

                return (
                  <tr key={customer.id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <p className="text-sm font-medium text-slate-900">
                        {name || customer.company_name || 'Client'}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                      {customer.customer_type || '—'}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                      {customer.email || '—'}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <Link
                        to={`/customers/${customer.id}`}
                        className="text-sm font-medium text-slate-700 hover:text-slate-900"
                      >
                        Voir
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
</div>

)
}
