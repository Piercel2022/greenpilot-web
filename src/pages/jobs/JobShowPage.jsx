import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  RefreshCw,
  UserRound,
  UsersRound,
  Wrench,
} from "lucide-react";

import { getJob } from "../../services/jobs";

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

const weatherRiskLabels = {
  unknown: "Inconnu",
  low: "Faible",
  medium: "Moyen",
  high: "Élevé",
};

function formatDate(date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateTime(date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatTime(date) {
  if (!date) return null;

  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatDuration(minutes) {
  if (minutes === null || minutes === undefined || minutes === "") {
    return "—";
  }

  const numericMinutes = Number(minutes);

  if (Number.isNaN(numericMinutes)) {
    return "—";
  }

  const hours = Math.floor(numericMinutes / 60);
  const remainingMinutes = numericMinutes % 60;

  if (hours === 0) return `${remainingMinutes} min`;
  if (remainingMinutes === 0) return `${hours} h`;

  return `${hours} h ${remainingMinutes} min`;
}

function getCustomerName(job) {
  return job.customer?.name || job.customer_name || "Client non renseigné";
}

function getSiteName(job) {
  return job.site?.name || job.site_name || "Site non renseigné";
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

  return error?.message || "Impossible de charger l’intervention.";
}

function DetailItem({ label, value, children }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-slate-900">
        {children || value || "—"}
      </dd>
    </div>
  );
}

function JobShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let mounted = true;

    const loadJob = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getJob(id);

        if (!mounted) return;

        setJob(data?.job || data);
      } catch (loadError) {
        if (!mounted) return;

        setError(getErrorMessage(loadError));
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadJob();

    return () => {
      mounted = false;
    };
  }, [id, reloadKey]);

  if (loading) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate("/jobs")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au planning
        </button>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-center text-sm text-slate-500">
            Chargement de l’intervention...
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate("/jobs")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au planning
        </button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm text-red-700">
            {error || "Intervention introuvable."}
          </p>

          <button
            type="button"
            onClick={() => setReloadKey((current) => current + 1)}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-50"
          >
            <RefreshCw className="h-4 w-4" />
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const status = job.status;
  const priority = job.priority;

  const startTime = formatTime(job.scheduled_start_at);
  const endTime = formatTime(job.scheduled_end_at);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate("/jobs")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au planning
        </button>

        <button
          type="button"
          onClick={() => setReloadKey((current) => current + 1)}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw className="h-4 w-4" />
          Actualiser
        </button>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  statusStyles[status] || "bg-slate-100 text-slate-700"
                }`}
              >
                {statusLabels[status] || status || "—"}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  priorityStyles[priority] || "bg-slate-100 text-slate-700"
                }`}
              >
                Priorité {priorityLabels[priority] || priority || "—"}
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
              {job.title}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {job.job_type || "Type d’intervention non renseigné"}
            </p>
          </div>

          <button type="button" onClick={() => navigate(`/jobs/${id}/edit`)} className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
          Modifier
         </button>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-slate-100 p-2">
              <UserRound className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Client
              </h2>
              <p className="text-sm text-slate-500">
                Client associé à l’intervention
              </p>
            </div>
          </div>

          <dl className="grid gap-5 sm:grid-cols-2">
            <DetailItem label="Nom" value={getCustomerName(job)} />

            <DetailItem
              label="Identifiant"
              value={job.customer?.id || job.customer_id}
            />
          </dl>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-slate-100 p-2">
              <MapPin className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Site
              </h2>
              <p className="text-sm text-slate-500">
                Lieu de l’intervention
              </p>
            </div>
          </div>

          <dl className="space-y-5">
            <DetailItem label="Nom" value={getSiteName(job)} />

            <DetailItem label="Adresse">
              {job.address || job.site?.address || "Adresse non renseignée"}
            </DetailItem>
          </dl>
        </section>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-slate-100 p-2">
            <CalendarDays className="h-5 w-5 text-slate-700" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Planification
            </h2>
            <p className="text-sm text-slate-500">
              Date et durée prévues
            </p>
          </div>
        </div>

        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DetailItem
            label="Date"
            value={formatDate(job.scheduled_date)}
          />

          <DetailItem label="Horaires">
            {startTime && endTime
              ? `${startTime} → ${endTime}`
              : startTime || endTime || "—"}
          </DetailItem>

          <DetailItem
            label="Durée estimée"
            value={formatDuration(job.estimated_duration_minutes)}
          />

          <DetailItem
            label="Durée réelle"
            value={formatDuration(job.actual_duration_minutes)}
          />
        </dl>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-slate-100 p-2">
              <UsersRound className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Équipe
              </h2>
              <p className="text-sm text-slate-500">
                Ressources affectées
              </p>
            </div>
          </div>

          <DetailItem
            label="Équipe"
            value={job.team?.name || "Non affectée"}
          />
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-slate-100 p-2">
              <Wrench className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Ressources
              </h2>
              <p className="text-sm text-slate-500">
                Véhicule et autres ressources
              </p>
            </div>
          </div>

          <dl className="grid gap-5 sm:grid-cols-2">
            <DetailItem
              label="Véhicule"
              value={job.vehicle?.name || "Non affecté"}
            />

            <DetailItem
              label="Devis"
              value={job.quote_id || "Aucun devis associé"}
            />
          </dl>
        </section>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-slate-100 p-2">
            <Clock3 className="h-5 w-5 text-slate-700" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Exécution
            </h2>
            <p className="text-sm text-slate-500">
              Suivi temporel de l’intervention
            </p>
          </div>
        </div>

        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">
            Météo
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Conditions et risque météo associés à l’intervention.
          </p>
        </div>

        <dl className="grid gap-5 sm:grid-cols-2">
          <DetailItem
            label="Risque"
            value={
              weatherRiskLabels[job.weather_risk] ||
              job.weather_risk ||
              "—"
            }
          />

          <DetailItem
            label="Notes météo"
            value={job.weather_notes}
          />
        </dl>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Notes client
          </h2>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {job.customer_notes || "Aucune note client."}
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Notes internes
          </h2>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {job.internal_notes || "Aucune note interne."}
          </p>
        </section>
      </div>

      {job.description && (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Description
          </h2>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {job.description}
          </p>
        </section>
      )}
    </div>
  );
}

export default JobShowPage;