import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  Clock3,
  Eye,
  Filter,
  Flag,
  Loader2,
  MapPin,
  Plus,
  RefreshCw,
  RotateCcw,
  UserRound,
} from 'lucide-react'

import { getJobs } from '../../services/jobs'
import JobWeekCalendar from '../../components/jobs/JobWeekCalendar'

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

function startOfWeek(date) {
  const result = new Date(date)
  const day = result.getDay()
  const diff = day === 0 ? -6 : 1 - day

  result.setDate(result.getDate() + diff)
  result.setHours(0, 0, 0, 0)

  return result
}

function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)

  return result
}

function formatDate(date) {
  if (!date) return '—'

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
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

function formatSchedule(job) {
  const startTime = formatTime(job.scheduled_start_at)
  const endTime = formatTime(job.scheduled_end_at)

  if (startTime && endTime) {
    return `${startTime} → ${endTime}`
  }

  return startTime || endTime || '—'
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
    'Impossible de charger les interventions.'
  )
}

function JobsPage() {
  const navigate = useNavigate()

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  const [view, setView] = useState('list')

  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date()),
  )

  const [filters, setFilters] = useState({
    date: '',
    status: '',
    priority: '',
  })

  useEffect(() => {
    let mounted = true

    const loadJobs = async () => {
      setLoading(true)
      setError('')

      try {
        const params = Object.fromEntries(
          Object.entries(filters).filter(([, value]) => value),
        )

        const data = await getJobs(params)

        if (!mounted) return

        setJobs(
          Array.isArray(data)
            ? data
            : data?.jobs || [],
        )
      } catch (loadError) {
        if (!mounted) return

        setError(getErrorMessage(loadError))
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadJobs()

    return () => {
      mounted = false
    }
  }, [filters])

  const handleFilterChange = (event) => {
    const { name, value } = event.target

    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleResetFilters = () => {
    setFilters({
      date: '',
      status: '',
      priority: '',
    })
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    setError('')

    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value),
      )

      const data = await getJobs(params)

      setJobs(
        Array.isArray(data)
          ? data
          : data?.jobs || [],
      )
    } catch (refreshError) {
      setError(getErrorMessage(refreshError))
    } finally {
      setRefreshing(false)
    }
  }

  const goToPreviousWeek = () => {
    setWeekStart((current) => addDays(current, -7))
  }

  const goToNextWeek = () => {
    setWeekStart((current) => addDays(current, 7))
  }

  const goToCurrentWeek = () => {
    setWeekStart(startOfWeek(new Date()))
  }

  const hasFilters =
    filters.date ||
    filters.status ||
    filters.priority

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
            <CalendarRange className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Planning
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Planifiez et suivez les interventions de vos équipes.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* View switcher */}
          <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setView('list')}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                view === 'list'
                  ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-100'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Liste
            </button>

            <button
              type="button"
              onClick={() => setView('calendar')}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                view === 'calendar'
                  ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-100'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Calendrier
            </button>
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                refreshing ? 'animate-spin' : ''
              }`}
            />

            Actualiser
          </button>

          {/* New job */}
          <button
            type="button"
            onClick={() => navigate('/jobs/new')}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-100"
          >
            <Plus className="h-4 w-4" />

            Nouvelle intervention
          </button>
        </div>
      </div>

      {/* Filters */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50/70 px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 ring-1 ring-amber-100">
            <Filter className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Filtrer les interventions
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Affinez la liste selon la date, le statut ou la priorité.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-5 lg:grid-cols-4">
            {/* Date */}
            <div>
              <label
                htmlFor="filter-date"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <CalendarDays className="h-4 w-4 text-amber-500" />
                Date
              </label>

              <input
                id="filter-date"
                name="date"
                type="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-50"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="filter-status"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <CheckCircle2 className="h-4 w-4 text-amber-500" />
                Statut
              </label>

              <select
                id="filter-status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-50"
              >
                <option value="">Tous les statuts</option>
                <option value="planned">Planifiée</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="filter-priority"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Flag className="h-4 w-4 text-amber-500" />
                Priorité
              </label>

              <select
                id="filter-priority"
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-50"
              >
                <option value="">
                  Toutes les priorités
                </option>
                <option value="low">Faible</option>
                <option value="normal">Normale</option>
                <option value="high">Haute</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleResetFilters}
                disabled={!hasFilters}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RotateCcw className="h-4 w-4" />
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 border-l-4 border-l-red-500 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <AlertCircle className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Impossible de charger les interventions
              </p>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Calendar / List */}
      {view === 'calendar' ? (
        loading ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
            <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
              Chargement des interventions...
            </div>
          </section>
        ) : (
          <JobWeekCalendar
            jobs={jobs}
            weekStart={weekStart}
            onPreviousWeek={goToPreviousWeek}
            onNextWeek={goToNextWeek}
            onToday={goToCurrentWeek}
            onJobClick={(job) =>
              navigate(`/jobs/${job.id}`)
            }
          />
        )
      ) : (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* List header */}
          <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                  <CalendarDays className="h-4 w-4" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Interventions
                  </h2>

                  <p className="mt-0.5 text-sm text-slate-500">
                    {loading
                      ? 'Chargement...'
                      : `${jobs.length} intervention${
                          jobs.length > 1 ? 's' : ''
                        }`}
                  </p>
                </div>
              </div>

              {!loading && jobs.length > 0 && (
                <span className="hidden rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100 sm:inline-flex">
                  Planning actif
                </span>
              )}
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center px-6 py-14">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
                Chargement des interventions...
              </div>
            </div>
          ) : jobs.length === 0 ? (
            /* Empty state */
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                <CalendarRange className="h-7 w-7" />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-900">
                Aucune intervention trouvée
              </p>

              <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                Modifiez vos filtres ou créez une nouvelle intervention pour
                commencer à organiser votre planning.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {hasFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Réinitialiser les filtres
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => navigate('/jobs/new')}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
                >
                  <Plus className="h-4 w-4" />
                  Nouvelle intervention
                </button>
              </div>
            </div>
          ) : (
            /* Table */
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Intervention
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Client
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Site
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Date
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Horaires
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Statut
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Priorité
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {jobs.map((job) => {
                    const status = job.status
                    const priority = job.priority

                    return (
                      <tr
                        key={job.id}
                        className="group transition hover:bg-amber-50/30"
                      >
                        {/* Intervention */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                              <CalendarDays className="h-4 w-4" />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {job.title ||
                                  'Intervention sans titre'}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {job.job_type ||
                                  'Type non renseigné'}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Client */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <UserRound className="h-4 w-4 shrink-0 text-slate-400" />

                            <span className="text-sm text-slate-700">
                              {getCustomerName(job)}
                            </span>
                          </div>
                        </td>

                        {/* Site */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 shrink-0 text-slate-400" />

                            <span className="text-sm text-slate-700">
                              {getSiteName(job)}
                            </span>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" />

                            <span className="text-sm text-slate-700">
                              {formatDate(job.scheduled_date)}
                            </span>
                          </div>
                        </td>

                        {/* Horaires */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Clock3 className="h-4 w-4 shrink-0 text-slate-400" />

                            <span className="text-sm text-slate-700">
                              {formatSchedule(job)}
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                              statusStyles[status] ||
                              'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
                            }`}
                          >
                            {statusLabels[status] ||
                              status ||
                              '—'}
                          </span>
                        </td>

                        {/* Priority */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                              priorityStyles[priority] ||
                              'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
                            }`}
                          >
                            {priorityLabels[priority] ||
                              priority ||
                              '—'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/jobs/${job.id}`)
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                            aria-label={`Voir l’intervention ${
                              job.title || ''
                            }`}
                          >
                            <Eye className="h-4 w-4" />
                            Voir
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default JobsPage