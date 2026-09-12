import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
AlertCircle,
ArrowLeft,
Building2,
CircleCheck,
CircleX,
FileText,
MapPin,
MapPinned,
Pencil,
Ruler,
Trash2,
} from 'lucide-react'
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
return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl"> <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"> <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12"> <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600"> <MapPin className="h-6 w-6" /> </div>

          <p className="mt-4 text-sm font-medium text-slate-700">
            Chargement du site...
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Préparation de la fiche terrain
          </p>
        </div>
      </div>
    </div>
  </div>
)

}

if (!site) {
return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <Link
         to="/sites"
         className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-sky-600"
       > <ArrowLeft className="h-4 w-4" />
Retour aux sites </Link>

      <div className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm">
        <div className="flex items-start gap-3 border-l-4 border-red-500 bg-red-50 p-5">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="text-sm font-semibold text-red-800">
              Site indisponible
            </p>

            <p className="mt-1 text-sm leading-5 text-red-700">
              {error || 'Site introuvable.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

}

return ( <div className="min-h-full bg-slate-50 p-6 lg:p-8"> <div className="mx-auto max-w-5xl space-y-6"> <div> <Link
         to="/sites"
         className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-sky-600"
       > <ArrowLeft className="h-4 w-4" />
Retour aux sites </Link>

      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
            <MapPin className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-sky-600">
              <MapPinned className="h-4 w-4" />
              Gestion des sites
            </div>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {site.name}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fiche détaillée du lieu d'intervention.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={`/sites/${id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            <Pencil className="h-4 w-4" />
            Modifier
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            {deleting ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>

    {error && (
      <div className="overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
        <div className="flex items-start gap-3 border-l-4 border-red-500 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="text-sm font-semibold text-red-800">
              Opération impossible
            </p>

            <p className="mt-1 text-sm leading-5 text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    )}

    <div className="grid gap-6 md:grid-cols-2">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
            <Building2 className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Informations générales
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Informations principales du site
            </p>
          </div>
        </div>

        <dl className="divide-y divide-slate-100">
          <div className="px-6 py-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Client
            </dt>

            <dd className="mt-1.5 text-sm font-medium text-slate-900">
              {site.customer_id
                ? `Client #${site.customer_id}`
                : 'Aucun client associé'}
            </dd>
          </div>

          <div className="px-6 py-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Type de site
            </dt>

            <dd className="mt-1.5 flex items-center gap-2 text-sm font-medium text-slate-900">
              <Building2 className="h-4 w-4 text-slate-400" />
              {site.site_type || '—'}
            </dd>
          </div>

          <div className="px-6 py-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Statut
            </dt>

            <dd className="mt-1.5">
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
            </dd>
          </div>

          <div className="px-6 py-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Surface
            </dt>

            <dd className="mt-1.5 flex items-center gap-2 text-sm font-medium text-slate-900">
              <Ruler className="h-4 w-4 text-slate-400" />
              {site.surface_area != null
                ? `${site.surface_area} m²`
                : 'Non renseignée'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
            <MapPinned className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Adresse
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Localisation du lieu d'intervention
            </p>
          </div>
        </div>

        <dl className="divide-y divide-slate-100">
          <div className="px-6 py-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Adresse
            </dt>

            <dd className="mt-1.5 text-sm font-medium text-slate-900">
              {site.address_line1 || '—'}
            </dd>
          </div>

          {site.address_line2 && (
            <div className="px-6 py-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Complément
              </dt>

              <dd className="mt-1.5 text-sm text-slate-900">
                {site.address_line2}
              </dd>
            </div>
          )}

          <div className="px-6 py-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Localisation
            </dt>

            <dd className="mt-1.5 flex items-start gap-2 text-sm font-medium text-slate-900">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
              {[site.postal_code, site.city, site.country]
                .filter(Boolean)
                .join(' ') || '—'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:col-span-2">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
            <MapPin className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Coordonnées GPS
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Position géographique du site
            </p>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Latitude
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-900">
              {site.latitude ?? '—'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Longitude
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-900">
              {site.longitude ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:col-span-2">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
            <FileText className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Notes
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Informations utiles pour les équipes terrain
            </p>
          </div>
        </div>

        <div className="p-6">
          {site.notes ? (
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
              {site.notes}
            </p>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4">
              <FileText className="h-5 w-5 text-slate-400" />

              <p className="text-sm text-slate-500">
                Aucune note renseignée pour ce site.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  </div>
</div>

)
}
