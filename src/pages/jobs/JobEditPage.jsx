import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  CalendarClock,
  FilePenLine,
  Loader2,
  RefreshCw,
  Wrench,
} from "lucide-react";

import JobForm from "./JobForm";
import { getCustomers } from "../../services/customers";
import { getSites } from "../../services/sites";
import { getJob, updateJob } from "../../services/jobs";

function extractCollection(data, key) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
  return [];
}

function getErrorMessage(error, fallback) {
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

  return error?.message || fallback;
}

function extractDate(dateTime) {
  if (!dateTime) return "";

  return String(dateTime).slice(0, 10);
}

function extractTime(dateTime) {
  if (!dateTime) return "";

  const value = String(dateTime);
  const timePart = value.includes("T")
    ? value.split("T")[1]
    : value.split(" ")[1];

  return timePart ? timePart.slice(0, 5) : "";
}

function buildInitialValues(job) {
  return {
    customer_id: job.customer_id || "",
    site_id: job.site_id || "",
    title: job.title || "",
    description: job.description || "",
    job_type: job.job_type || "",
    status: job.status || "planned",
    priority: job.priority || "normal",
    scheduled_date: extractDate(job.scheduled_date),
    scheduled_start_at: extractTime(job.scheduled_start_at),
    scheduled_end_at: extractTime(job.scheduled_end_at),
    estimated_duration_minutes:
      job.estimated_duration_minutes ?? "",
    address: job.address || "",
    latitude: job.latitude ?? "",
    longitude: job.longitude ?? "",
    customer_notes: job.customer_notes || "",
    internal_notes: job.internal_notes || "",
    weather_notes: job.weather_notes || "",
    weather_risk: job.weather_risk || "unknown",
  };
}

function JobEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadFormData = async () => {
      setLoading(true);
      setError("");

      try {
        const [jobData, customersData, sitesData] = await Promise.all([
          getJob(id),
          getCustomers(),
          getSites(),
        ]);

        if (!mounted) return;

        setJob(jobData?.job || jobData);
        setCustomers(extractCollection(customersData, "customers"));
        setSites(extractCollection(sitesData, "sites"));
      } catch (loadError) {
        if (!mounted) return;

        setError(
          getErrorMessage(
            loadError,
            "Impossible de charger l’intervention.",
          ),
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadFormData();

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleSubmit = async (jobData) => {
    setSubmitting(true);
    setError("");

    try {
      await updateJob(id, jobData);
      navigate(`/jobs/${id}`);
    } catch (submitError) {
      const message = getErrorMessage(
        submitError,
        "Impossible de modifier l’intervention.",
      );

      setError(message);
      throw submitError;
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/jobs/${id}`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate(`/jobs/${id}`)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-amber-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l’intervention
        </button>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                <FilePenLine className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-lg font-semibold text-slate-900">
                  Modifier l’intervention
                </h1>
                <p className="text-sm text-slate-500">
                  Préparation du formulaire...
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-h-64 items-center justify-center p-8">
            <div className="text-center">
              <Loader2 className="mx-auto h-7 w-7 animate-spin text-amber-500" />

              <p className="mt-3 text-sm font-medium text-slate-600">
                Chargement de l’intervention...
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Récupération des informations nécessaires
              </p>
            </div>
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
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-amber-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au planning
        </button>

        <div className="overflow-hidden rounded-2xl border border-slate-200 border-l-4 border-l-red-500 bg-white shadow-sm">
          <div className="flex items-start gap-4 p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100">
              <AlertCircle className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2 className="font-semibold text-slate-900">
                Impossible de charger l’intervention
              </h2>

              <p className="mt-1 text-sm leading-6 text-red-700">
                {error || "Intervention introuvable."}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
              >
                <RefreshCw className="h-4 w-4" />
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate(`/jobs/${id}`)}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-amber-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l’intervention
          </button>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
              <FilePenLine className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                Planning
              </p>

              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Modifier l’intervention
              </h1>
            </div>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Modifiez les informations de l’intervention puis enregistrez les
            changements.
          </p>
        </div>

        <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 ring-1 ring-slate-200 sm:flex">
          <Wrench className="h-5 w-5" />
        </div>
      </div>

      {error && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 border-l-4 border-l-red-500 bg-white shadow-sm">
          <div className="flex items-start gap-3 px-5 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <AlertCircle className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Enregistrement impossible
              </p>

              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
              <CalendarClock className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Informations de l’intervention
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Client, site, planification et paramètres d’exécution
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <JobForm
            customers={customers}
            sites={sites}
            initialValues={buildInitialValues(job)}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitting={submitting}
            submitLabel="Enregistrer les modifications"
          />
        </div>
      </div>
    </div>
  );
}

export default JobEditPage;