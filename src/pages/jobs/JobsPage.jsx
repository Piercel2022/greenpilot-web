import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Eye,
  Plus,
  RefreshCw,
} from "lucide-react";

import { getJobs } from "../../services/jobs";
import JobWeekCalendar from "../../components/jobs/JobWeekCalendar";

const statusLabels = {
  planned: "Planifiée",
  in_progress: "En cours",
  completed: "Terminée",
  cancelled: "Annulée",
};

const statusStyles = {
  planned: "bg-blue-50 text-blue-700",
  in_progress: "bg-amber-50 text-amber-700",
  completed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
};

const priorityLabels = {
  low: "Faible",
  normal: "Normale",
  high: "Haute",
  urgent: "Urgente",
};

const priorityStyles = {
  low: "bg-slate-100 text-slate-700",
  normal: "bg-slate-100 text-slate-700",
  high: "bg-orange-50 text-orange-700",
  urgent: "bg-red-50 text-red-700",
};

function startOfWeek(date) {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);

  return result;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
}

function formatDate(date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

function formatTime(date) {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
}

function formatSchedule(job) {
  const startTime = formatTime(job.scheduled_start_at);
  const endTime = formatTime(job.scheduled_end_at);

  if (startTime && endTime) {
    return `${startTime} → ${endTime}`;
  }

  return startTime || endTime || "—";
}

function getCustomerName(job) {
  return (
    job.customer?.name ||
    job.customer_name ||
    "Client non renseigné"
  );
}

function getSiteName(job) {
  return (
    job.site?.name ||
    job.site_name ||
    "Site non renseigné"
  );
}

function getErrorMessage(error) {
  const errors = error?.response?.data?.errors;

  if (Array.isArray(errors)) {
    return errors.join(", ");
  }

  if (typeof errors === "string") {
    return errors;
  }

  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  return (
    error?.message ||
    "Impossible de charger les interventions."
  );
}

 function JobsPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [view, setView] = useState("list");

  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date())
  );

  const [filters, setFilters] = useState({
    date: "",
    status: "",
    priority: "",
  });

  useEffect(() => {
    let mounted = true;

    const loadJobs = async () => {
      setLoading(true);
      setError("");

      try {
        const params = Object.fromEntries(
          Object.entries(filters).filter(([, value]) => value)
        );

        const data = await getJobs(params);

        if (!mounted) return;

        setJobs(
          Array.isArray(data)
            ? data
            : data?.jobs || []
        );
      } catch (loadError) {
        if (!mounted) return;

        setError(getErrorMessage(loadError));
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      mounted = false;
    };
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      date: "",
      status: "",
      priority: "",
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setError("");

    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value)
      );

      const data = await getJobs(params);

      setJobs(
        Array.isArray(data)
          ? data
          : data?.jobs || []
      );
    } catch (refreshError) {
      setError(getErrorMessage(refreshError));
    } finally {
      setRefreshing(false);
    }
  };

  const goToPreviousWeek = () => {
    setWeekStart((current) => addDays(current, -7));
  };

  const goToNextWeek = () => {
    setWeekStart((current) => addDays(current, 7));
  };

  const goToCurrentWeek = () => {
    setWeekStart(startOfWeek(new Date()));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Planning
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Planifiez et suivez les interventions de vos équipes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* View switcher */}
          <div className="flex rounded-lg border border-slate-300 bg-white p-1">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                view === "list"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Liste
            </button>

            <button
              type="button"
              onClick={() => setView("calendar")}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                view === "calendar"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
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
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                refreshing ? "animate-spin" : ""
              }`}
            />

            Actualiser
          </button>

          {/* New job */}
          <button
            type="button"
            onClick={() => navigate("/jobs/new")}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />

            Nouvelle intervention
          </button>
        </div>
      </div>

      {/* Filters */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-slate-600" />

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Filtrer les interventions
            </h2>

            <p className="text-xs text-slate-500">
              Affinez la liste selon la date, le statut ou la priorité.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {/* Date */}
          <div>
            <label
              htmlFor="filter-date"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              📅 Date
            </label>

            <input
              id="filter-date"
              name="date"
              type="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="filter-status"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              📌 Statut
            </label>

            <select
              id="filter-status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              ⚡ Priorité
            </label>

            <select
              id="filter-priority"
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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
              disabled={
                !filters.date &&
                !filters.status &&
                !filters.priority
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Calendar / List */}
      {view === "calendar" ? (
        loading ? (
          <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
              <RefreshCw className="h-5 w-5 animate-spin" />
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
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* List header */}
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Interventions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {loading
                    ? "Chargement..."
                    : `${jobs.length} intervention${
                        jobs.length > 1 ? "s" : ""
                      }`}
                </p>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center px-6 py-12">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <RefreshCw className="h-5 w-5 animate-spin" />
                Chargement des interventions...
              </div>
            </div>
          ) : jobs.length === 0 ? (
            /* Empty state */
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium text-slate-900">
                Aucune intervention trouvée.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Modifiez vos filtres ou créez une nouvelle
                intervention.
              </p>

              {(filters.date ||
                filters.status ||
                filters.priority) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          ) : (
            /* Table */
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Intervention
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Client
                    </th>

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
                      Date
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Horaires
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Statut
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Priorité
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {jobs.map((job) => {
                    const status = job.status;
                    const priority = job.priority;

                    return (
                      <tr
                        key={job.id}
                        className="transition hover:bg-slate-50"
                      >
                        {/* Intervention */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {job.title ||
                                "Intervention sans titre"}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {job.job_type ||
                                "Type non renseigné"}
                            </p>
                          </div>
                        </td>

                        {/* Client */}
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-700">
                            {getCustomerName(job)}
                          </span>
                        </td>

                        {/* Site */}
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-700">
                            {getSiteName(job)}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-700">
                            {formatDate(job.scheduled_date)}
                          </span>
                        </td>

                        {/* Horaires */}
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-700">
                            {formatSchedule(job)}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                              statusStyles[status] ||
                              "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {statusLabels[status] ||
                              status ||
                              "—"}
                          </span>
                        </td>

                        {/* Priority */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                              priorityStyles[priority] ||
                              "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {priorityLabels[priority] ||
                              priority ||
                              "—"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/jobs/${job.id}`)
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            aria-label={`Voir l’intervention ${
                              job.title || ""
                            }`}
                          >
                            <Eye className="h-4 w-4" />
                            Voir
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
export default JobsPage;