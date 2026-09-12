import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
AlertCircle,
Building2,
CircleCheck,
CircleX,
Eye,
Loader2,
MapPin,
MapPinPlus,
MapPinned,
Plus,
} from 'lucide-react'
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
return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-6xl"> <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"> <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12"> <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600"> <Loader2 className="h-6 w-6 animate-spin" /> </div>

          <p className="mt-4 text-sm font-medium text-slate-700">
            Chargement des sites...
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Récupération des lieux d'intervention
          </p>
        </div>
      </div>
    </div>
  </div>
)

}

return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-6xl space-y-6"> <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"> <div className="flex items-start gap-4"> <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100"> <MapPin className="h-5 w-5" /> </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-sky-600">
            <Building2 className="h-4 w-4" />
            Gestion des sites
          </div>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Sites
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Centralisez les lieux d'intervention de vos clients et
            retrouvez rapidement les informations utiles sur le terrain.
          </p>
        </div>
      </div>

      <Link
        to="/sites/new"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      >
        <Plus className="h-4 w-4" />
        Nouveau site
      </Link>
    </div>

    {error && (
      <div className="overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
        <div className="flex items-start gap-3 border-l-4 border-red-500 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="text-sm font-semibold text-red-800">
              Chargement impossible
            </p>

            <p className="mt-1 text-sm leading-5 text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    )}

    {sites.length === 0 && !error ? (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col items-center px-6 py-14 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
            <MapPinned className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-900">
            Aucun site enregistré
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Créez votre premier site pour associer un lieu d'intervention
            à l'un de vos clients.
          </p>

          <Link
            to="/sites/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            <MapPinPlus className="h-4 w-4" />
            Créer un site
          </Link>
        </div>
      </div>
    ) : (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <MapPinned className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Lieux d'intervention
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                {sites.length}{' '}
                {sites.length > 1 ? 'sites enregistrés' : 'site enregistré'}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-sky-500" />
                    Site
                  </span>
                </th>

                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  <span className="inline-flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-sky-500" />
                    Type
                  </span>
                </th>

                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  <span className="inline-flex items-center gap-2">
                    <MapPinned className="h-3.5 w-3.5 text-sky-500" />
                    Adresse
                  </span>
                </th>

                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Statut
                </th>

                <th
                  scope="col"
                  className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {sites.map((site) => (
                <tr
                  key={site.id}
                  className="group transition hover:bg-sky-50/40"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 transition group-hover:bg-sky-100">
                        <MapPin className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {site.name}
                        </p>

                        {site.customer_id && (
                          <p className="mt-1 text-xs text-slate-500">
                            Client associé
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex items-center gap-2 text-sm text-slate-600">
                      <Building2 className="h-4 w-4 text-slate-400" />
                      {site.site_type || '—'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                      <div>
                        {site.address_line1 && (
                          <p className="font-medium text-slate-700">
                            {site.address_line1}
                          </p>
                        )}

                        {(site.postal_code || site.city) && (
                          <p className="mt-1 text-xs text-slate-500">
                            {[site.postal_code, site.city]
                              .filter(Boolean)
                              .join(' ')}
                          </p>
                        )}

                        {!site.address_line1 &&
                          !site.postal_code &&
                          !site.city && (
                            <span className="text-slate-400">—</span>
                          )}
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    {site.active ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                        <CircleCheck className="h-3.5 w-3.5" />
                        Actif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                        <CircleX className="h-3.5 w-3.5" />
                        Inactif
                      </span>
                    )}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <Link
                      to={`/sites/${site.id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                    >
                      <Eye className="h-4 w-4" />
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
