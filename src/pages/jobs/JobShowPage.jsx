import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Flag,
  Loader2,
  MapPin,
  Pencil,
  RefreshCw,
  UserRound,
  UsersRound,
  Wrench,
} from 'lucide-react'

import { getJob } from '../../services/jobs'

const statusLabels = {
  planned: 'Planifiée',
  in_progress: 'En cours',
  completed: 'Terminée',
  cancelled: 'Annulée',
}

const statusStyles = {
  planned: 'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
  in_progress: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
  completed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  cancelled: 'bg-red-50 text-red-700 ring-1 ring-red-100',
}

const priorityLabels = {
  low: 'Faible',
  normal: 'Normale',
  high: 'Haute',
  urgent: 'Urgente',
}

const priorityStyles = {
  low: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
  normal: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
  high: 'bg-orange-50 text-orange-700 ring-1 ring-orange-100',
  urgent: 'bg-red-50 text-red-700 ring-1 ring-red-100',
}

const weatherRiskLabels = {
  unknown: 'Inconnu',
  low: 'Faible',
  medium: 'Moyen',
  high: 'Élevé',
}

function formatDate(date) {
  if (!date) return '—'

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

function formatDateTime(date) {
  if (!date) return '—'

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

function formatTime(date) {
  if (!date) return null

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsedDate)
}

function formatDuration(minutes) {
  if (minutes === null || minutes === undefined || minutes === '') {
    return '—'
  }

  const numericMinutes = Number(minutes)

  if (Number.isNaN(numericMinutes)) {
    return '—'
  }

  const hours = Math.floor(numericMinutes / 60)
  const remainingMinutes = numericMinutes % 60

  if (hours === 0) return `${remainingMinutes} min`
  if (remainingMinutes === 0) return `${hours} h`

  return `${hours} h ${remainingMinutes} min`
}

function getCustomerName(job) {
  return (
    job.customer?.name ||
    job.customer_name ||
    'Client non renseigné'
  )
}

function getSiteName(job) {
  return (
    job.site?.name ||
    job.site_name ||
    'Site non renseigné'
  )
}

function getErrorMessage(error) {
  const errors = error?.response?.data?.errors

  if (Array.isArray(errors)) {
    return errors.join(', ')
  }

  if (typeof errors === 'string') {
    return errors
  }

  if (error?.response?.data?.error) {
    return error.response.data.error
  }

  return (
    error?.message ||
    'Impossible de charger l’intervention.'
  )
}

function DetailItem({ label, value, children }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>

      <dd className="mt-1.5 text-sm font-medium text-slate-900">
        {children || value || '—'}
      </dd>
    </div>
  )
}

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h2 className="text-base font-semibold text-slate-900">
          {title}
        </h2>

        {description && (
          <p className="mt-0.5 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

function JobShowPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let mounted = true

    const loadJob = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await getJob(id)

        if (!mounted) return

        setJob(data?.job || data)
      } catch (loadError) {
        if (!mounted) return

        setError(getErrorMessage(loadError))
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadJob()

    return () => {
      mounted = false
    }
  }, [id, reloadKey])

  if (loading) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate('/jobs')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-amber-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au planning
        </button>

        <section className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm">
          <div className="flex flex-col items-center justify-center gap-3 text-sm text-slate-500">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>

            Chargement de l’intervention...
          </div>
        </section>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate('/jobs')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-amber-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au planning
        </button>

        <section className="rounded-2xl border border-red-200 border-l-4 border-l-red-500 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertCircle className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Intervention introuvable
              </h2>

              <p className="mt-1 text-sm text-red-700">
                {error || 'Intervention introuvable.'}
              </p>

              <button
                type="button"
                onClick={() =>
                  setReloadKey((current) => current + 1)
                }
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-50"
              >
                <RefreshCw className="h-4 w-4" />
                Réessayer
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const status = job.status
  const priority = job.priority

  const startTime = formatTime(job.scheduled_start_at)
  const endTime = formatTime(job.scheduled_end_at)

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('/jobs')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-amber-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au planning
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setReloadKey((current) => current + 1)
            }
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </button>

          <button
            type="button"
            onClick={() => navigate(`/jobs/${id}/edit`)}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-100"
          >
            <Pencil className="h-4 w-4" />
            Modifier
          </button>
        </div>
      </div>

      {/* Header */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                Planning
              </p>

              <p className="text-xs text-slate-500">
                Détail de l’intervention
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                    statusStyles[status] ||
                    'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
                  }`}
                >
                  {statusLabels[status] || status || '—'}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    priorityStyles[priority] ||
                    'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
                  }`}
                >
                  <Flag className="h-3.5 w-3.5" />
                  Priorité {priorityLabels[priority] || priority || '—'}
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
                {job.title || 'Intervention sans titre'}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {job.job_type ||
                  'Type d’intervention non renseigné'}
              </p>
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3 lg:min-w-52">
              <p className="text-xs font-medium uppercase tracking-wide text-amber-700">
                Date planifiée
              </p>

              <div className="mt-1 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-amber-600" />

                <p className="text-sm font-semibold text-slate-900">
                  {formatDate(job.scheduled_date)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client / Site */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            icon={UserRound}
            title="Client"
            description="Client associé à l’intervention"
          />

          <dl className="grid gap-5 sm:grid-cols-2">
            <DetailItem
              label="Nom"
              value={getCustomerName(job)}
            />

            <DetailItem
              label="Identifiant"
              value={job.customer?.id || job.customer_id}
            />
          </dl>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            icon={MapPin}
            title="Site"
            description="Lieu de l’intervention"
          />

          <dl className="space-y-5">
            <DetailItem
              label="Nom"
              value={getSiteName(job)}
            />

            <DetailItem label="Adresse">
              {job.address ||
                job.site?.address ||
                'Adresse non renseignée'}
            </DetailItem>
          </dl>
        </section>
      </div>

      {/* Planning */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          icon={CalendarDays}
          title="Planification"
          description="Date et durée prévues"
        />

        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <DetailItem
            label="Date"
            value={formatDate(job.scheduled_date)}
          />

          <DetailItem label="Horaires">
            {startTime && endTime
              ? `${startTime} → ${endTime}`
              : startTime || endTime || '—'}
          </DetailItem>

          <DetailItem
            label="Durée estimée"
            value={formatDuration(
              job.estimated_duration_minutes,
            )}
          />

          <DetailItem
            label="Durée réelle"
            value={formatDuration(
              job.actual_duration_minutes,
            )}
          />
        </dl>
      </section>

      {/* Team / Resources */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            icon={UsersRound}
            title="Équipe"
            description="Ressources affectées"
          />

          <dl>
            <DetailItem
              label="Équipe"
              value={job.team?.name || 'Non affectée'}
            />
          </dl>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            icon={Wrench}
            title="Ressources"
            description="Véhicule et autres ressources"
          />

          <dl className="grid gap-5 sm:grid-cols-2">
            <DetailItem
              label="Véhicule"
              value={job.vehicle?.name || 'Non affecté'}
            />

            <DetailItem
              label="Devis"
              value={
                job.quote_id || 'Aucun devis associé'
              }
            />
          </dl>
        </section>
      </div>

      {/* Execution */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          icon={Clock3}
          title="Exécution"
          description="Suivi temporel de l’intervention"
        />

        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem
            label="Début réel"
            value={formatDateTime(job.started_at)}
          />

          <DetailItem
            label="Fin réelle"
            value={formatDateTime(job.completed_at)}
          />

          <DetailItem
            label="Annulation"
            value={formatDateTime(job.cancelled_at)}
          />
        </dl>
      </section>

      {/* Weather */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          icon={AlertCircle}
          title="Météo"
          description="Conditions et risque météo associés à l’intervention"
        />

        <dl className="grid gap-6 sm:grid-cols-2">
          <DetailItem label="Risque">
            <span className="inline-flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  job.weather_risk === 'high'
                    ? 'bg-red-500'
                    : job.weather_risk === 'medium'
                      ? 'bg-amber-500'
                      : job.weather_risk === 'low'
                        ? 'bg-emerald-500'
                        : 'bg-slate-400'
                }`}
              />

              {weatherRiskLabels[job.weather_risk] ||
                job.weather_risk ||
                '—'}
            </span>
          </DetailItem>

          <DetailItem
            label="Notes météo"
            value={job.weather_notes}
          />
        </dl>
      </section>

      {/* Notes */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            icon={UserRound}
            title="Notes client"
            description="Informations utiles liées au client"
          />

          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {job.customer_notes || 'Aucune note client.'}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            icon={FileText}
            title="Notes internes"
            description="Informations réservées au suivi interne"
          />

          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {job.internal_notes || 'Aucune note interne.'}
          </p>
        </section>
      </div>

      {/* Description */}
      {job.description && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            icon={FileText}
            title="Description"
            description="Détails de la prestation à réaliser"
          />

          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {job.description}
          </p>
        </section>
      )}

      {/* Footer status */}
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-5 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 ring-1 ring-emerald-100">
          <CheckCircle2 className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">
            Intervention suivie dans GreenPilot
          </p>

          <p className="mt-0.5 text-xs text-slate-600">
            Les informations de planning, d’équipe et d’exécution sont
            centralisées sur cette fiche.
          </p>
        </div>
      </div>
    </div>
  )
}

export default JobShowPage