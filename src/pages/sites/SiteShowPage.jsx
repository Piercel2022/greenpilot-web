import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteSite, getSite } from '../../services/sites'

export default function SiteShowPage() {
const { id } = useParams()
const navigate = useNavigate()

const [site, setSite] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [deleting, setDeleting] = useState(false)

useEffect(() => {
let active = true


async function loadSite() {
  try {
    setLoading(true)
    setError('')

    const data = await getSite(id)

    if (active) {
      setSite(data)
    }
  } catch {
    if (active) {
      setSite(null)
      setError('Impossible de charger le site.')
    }
  } finally {
    if (active) {
      setLoading(false)
    }
  }
}

loadSite()

return () => {
  active = false
}


}, [id])

async function handleDelete() {
const confirmed = window.confirm(
'Voulez-vous vraiment supprimer ce site ?'
)

if (!confirmed) {
  return
}

try {
  setDeleting(true)
  setError('')

  await deleteSite(id)

  navigate('/sites')
} catch {
  setError('Impossible de supprimer le site.')
  setDeleting(false)
}
}

if (loading) {
return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-5xl"> <p className="text-sm text-slate-500">
Chargement du site... </p> </div> </div>
)
}

if (!site) {
return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-4"> <Link
         to="/sites"
         className="text-sm font-medium text-slate-600 hover:text-slate-900"
       >
← Retour aux sites </Link>

      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error || 'Site introuvable.'}
      </div>
    </div>
  </div>
)
}

return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"> <div> <Link
           to="/sites"
           className="text-sm font-medium text-slate-600 hover:text-slate-900"
         >
← Retour aux sites </Link>

        <p className="mt-4 text-sm font-medium text-slate-500">
          Gestion commerciale
        </p>

        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
          {site.name}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Fiche détaillée du site.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          to={`/sites/${id}/edit`}
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Modifier
        </Link>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center justify-center rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleting ? 'Suppression...' : 'Supprimer'}
        </button>
      </div>
    </div>

    {error && (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    )}

    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Informations générales
        </h2>

        <dl className="mt-5 space-y-4">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Client
            </dt>
            <dd className="mt-1 text-sm text-slate-900">
              {site.customer_id
                ? `Client #${site.customer_id}`
                : '—'}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Type de site
            </dt>
            <dd className="mt-1 text-sm text-slate-900">
              {site.site_type || '—'}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Statut
            </dt>
            <dd className="mt-1 text-sm text-slate-900">
              {site.active ? 'Actif' : 'Inactif'}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Surface
            </dt>
            <dd className="mt-1 text-sm text-slate-900">
              {site.surface_area != null
                ? `${site.surface_area} m²`
                : '—'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Adresse
        </h2>

        <dl className="mt-5 space-y-4">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Adresse
            </dt>
            <dd className="mt-1 text-sm text-slate-900">
              {site.address_line1 || '—'}
            </dd>
          </div>

          {site.address_line2 && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Complément
              </dt>
              <dd className="mt-1 text-sm text-slate-900">
                {site.address_line2}
              </dd>
            </div>
          )}

          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Localisation
            </dt>
            <dd className="mt-1 text-sm text-slate-900">
              {[site.postal_code, site.city, site.country]
                .filter(Boolean)
                .join(' ') || '—'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
        <h2 className="text-base font-semibold text-slate-900">
          Coordonnées GPS
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Latitude
            </p>
            <p className="mt-1 text-sm text-slate-900">
              {site.latitude ?? '—'}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Longitude
            </p>
            <p className="mt-1 text-sm text-slate-900">
              {site.longitude ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
        <h2 className="text-base font-semibold text-slate-900">
          Notes
        </h2>

        <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-600">
          {site.notes || 'Aucune note.'}
        </p>
      </section>
    </div>
  </div>
</div>

)
}
