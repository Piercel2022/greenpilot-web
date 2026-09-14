
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  UsersRound,
} from 'lucide-react'
import { getCustomers } from '../../services/customers'

function CustomersPage() {
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

  return (
    <div className="min-h-full bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <section className="animate-fade-up flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-200 hover:scale-105">
              <UsersRound size={21} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-sm font-medium text-blue-600">
                Gestion commerciale
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Clients
              </h1>

              <p className="mt-2 text-sm text-slate-600">
                Consultez et gérez les clients de votre organisation.
              </p>
            </div>
          </div>

          <Link
            to="/customers/new"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
          >
            Nouveau client

            <ArrowRight
              size={16}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </section>

        {/* Error */}
        {error && (
          <div className="animate-slide-in flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-6">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <AlertCircle size={17} strokeWidth={1.9} />
            </div>

            <div>
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>

              <p className="mt-1 text-xs text-red-600">
                Vérifiez votre connexion et réessayez.
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="animate-fade-up rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UsersRound
                size={19}
                strokeWidth={1.8}
                className="animate-pulse"
              />
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Chargement des clients...
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && customers.length === 0 && (
          <div className="animate-fade-up rounded-xl border border-dashed border-blue-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-200 hover:scale-105">
              <UsersRound size={22} strokeWidth={1.8} />
            </div>

            <h2 className="mt-4 text-base font-semibold text-slate-900">
              Aucun client
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Aucun client n&apos;est actuellement enregistré dans votre
              organisation.
            </p>

            <Link
              to="/customers/new"
              className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
            >
              Ajouter un client

              <ArrowRight
                size={16}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}

        {/* Customers table */}
        {!loading && !error && customers.length > 0 && (
          <div className="animate-fade-up overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Table header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600 transition duration-200 hover:scale-105">
                  <UsersRound size={17} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Clients
                  </p>

                  <p className="text-xs text-slate-500">
                    {customers.length} client
                    {customers.length > 1 ? 's' : ''} enregistré
                    {customers.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

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

                <tbody className="animate-stagger divide-y divide-slate-200">
                  {customers.map((customer) => {
                    const name = [
                      customer.first_name,
                      customer.last_name,
                    ]
                      .filter(Boolean)
                      .join(' ')

                    return (
                      <tr
                        key={customer.id}
                        className="group transition duration-200 hover:bg-blue-50/30"
                      >
                        {/* Client */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition duration-200 group-hover:scale-105 group-hover:bg-blue-100">
                              <UsersRound
                                size={16}
                                strokeWidth={1.8}
                              />
                            </div>

                            <div>
                              <p className="text-sm font-medium text-slate-900">
                                {name ||
                                  customer.company_name ||
                                  'Client'}
                              </p>

                              {customer.company_name && name && (
                                <p className="mt-0.5 text-xs text-slate-500">
                                  {customer.company_name}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 transition duration-200 group-hover:bg-blue-100">
                            {customer.customer_type || '—'}
                          </span>
                        </td>

                        {/* Email */}
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                          {customer.email || '—'}
                        </td>

                        {/* Action */}
                        <td className="whitespace-nowrap px-6 py-4 text-right">
                          <Link
                            to={`/customers/${customer.id}`}
                            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition duration-200 hover:text-blue-800"
                          >
                            Voir

                            <ArrowRight
                              size={15}
                              strokeWidth={1.8}
                              className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                            />
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
export default CustomersPage;