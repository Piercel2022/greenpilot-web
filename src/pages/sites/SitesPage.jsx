import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSites } from '../../services/sites'

export default function SitesPage() {
const [sites, setSites] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

useEffect(() => {
let active = true


async function loadSites() {
  try {
    setLoading(true)
    setError('')

    const data = await getSites()

    if (active) {
      setSites(data)
    }
  } catch {
    if (active) {
      setSites([])
      setError('Impossible de charger les sites.')
    }
  } finally {
    if (active) {
      setLoading(false)
    }
  }
}

loadSites()

return () => {
  active = false
}

}, [])

if (loading) {
return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-6xl"> <p className="text-sm text-slate-500">
Chargement des sites... </p> </div> </div>
)
}

return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-6xl space-y-6"> <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"> <div> <p className="text-sm font-medium text-slate-500">
Gestion commerciale </p>

        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
          Sites
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Gérez les sites et lieux d'intervention de vos clients.
        </p>
      </div>

      <Link
        to="/sites/new"
        className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Nouveau site
      </Link>
    </div>

    {error && (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    )}

    {sites.length === 0 && !error ? (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Aucun site
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Commencez par créer un site pour un client.
        </p>

        <Link
          to="/sites/new"
          className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Créer un site
        </Link>
      </div>
    ) : (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Site
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Type
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Adresse
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Statut
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {sites.map((site) => (
                <tr key={site.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">
                        {site.name}
                      </p>

                      {site.customer_id && (
                        <p className="mt-1 text-xs text-slate-500">
                          Client #{site.customer_id}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                    {site.site_type || '—'}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div>
                      {site.address_line1 && (
                        <p>{site.address_line1}</p>
                      )}

                      {(site.postal_code || site.city) && (
                        <p>
                          {[site.postal_code, site.city]
                            .filter(Boolean)
                            .join(' ')}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        site.active
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {site.active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <Link
                      to={`/sites/${site.id}`}
                      className="text-sm font-medium text-slate-700 hover:text-slate-900"
                    >
                      Voir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
</div>


)
}
